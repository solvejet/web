// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/mongodb';
import { Newsletter } from '@/models/newsletter';
import { rateLimit } from '@/lib/rate-limit';
import { validateCsrfToken } from '@/middleware/security';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitResult = await rateLimit(request, 'default');
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, message: 'Too many requests, please try again later' },
        { status: 429 }
      );
    }

    // CSRF validation
    const csrfError = await validateCsrfToken(request);
    if (csrfError) {
      console.error('CSRF validation failed');
      return NextResponse.json({ success: false, message: 'Invalid CSRF token' }, { status: 403 });
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input
    const validationResult = newsletterSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.errors);
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address',
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Connect to database
    try {
      await connectToDatabase();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Check existing subscription
    const existing = await Newsletter.findByEmail(email);
    if (existing) {
      if (existing.subscribed) {
        // Return 200 for already subscribed users
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter',
          alreadySubscribed: true,
        });
      }

      // Resubscribe user
      try {
        existing.subscribed = true;
        existing.subscribedAt = new Date();
        await existing.save();

        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been successfully resubscribed to our newsletter',
        });
      } catch (error) {
        console.error('Error updating subscription:', error);
        return NextResponse.json(
          { success: false, message: 'Failed to update subscription' },
          { status: 500 }
        );
      }
    }

    // Create new subscription
    try {
      await Newsletter.create({
        email,
        subscribed: true,
        subscribedAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
      });
    } catch (error) {
      console.error('Error creating subscription:', error);

      // Check for duplicate key error (race condition)
      if (error instanceof Error && error.message.includes('duplicate key')) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter',
          alreadySubscribed: true,
        });
      }

      return NextResponse.json(
        { success: false, message: 'Failed to create subscription' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
