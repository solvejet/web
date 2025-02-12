// src/components/ui/MobileDevice.tsx
import { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileDeviceProps extends PropsWithChildren {
  className?: string;
  floatingEffect?: boolean;
  variant?: 'iphone' | 'android';
  color?: 'black' | 'white' | 'gray';
}

const MobileDevice = ({
  children,
  className,
  floatingEffect = true,
  variant = 'iphone',
  color = 'black',
}: MobileDeviceProps) => {
  // Color configurations
  const colorConfig = {
    black: {
      device: 'bg-zinc-900',
      border: 'border-zinc-800',
      button: 'bg-zinc-800',
      camera: 'bg-zinc-800',
      shine: 'from-white/10 to-transparent',
      speaker: 'bg-zinc-200',
    },
    white: {
      device: 'bg-zinc-100',
      border: 'border-zinc-200',
      button: 'bg-zinc-200',
      camera: 'bg-zinc-300',
      shine: 'from-black/5 to-transparent',
      speaker: 'bg-zinc-200',
    },
    gray: {
      device: 'bg-zinc-700',
      border: 'border-zinc-600',
      button: 'bg-zinc-600',
      camera: 'bg-zinc-600',
      shine: 'from-white/10 to-transparent',
      speaker: 'bg-zinc-600',
    },
  };

  const renderContent = () => (
    <>
      {/* Device Shadow */}
      <div className="absolute inset-0 translate-y-24 scale-[0.85] rounded-[3rem] bg-gradient-to-r from-black/20 to-black/30 opacity-20 blur-2xl" />

      {/* Device Frame */}
      <div
        className={cn(
          'relative aspect-[9/16] overflow-hidden',
          'rounded-[3rem] border-[10px]',
          colorConfig[color].device,
          colorConfig[color].border,
          'shadow-2xl backdrop-blur-sm',
          'transition-transform duration-300'
        )}
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 z-50 rounded-[2.5rem] bg-gradient-to-br from-white/5 via-transparent to-black/5" />

        {/* Side Buttons */}
        <div className="absolute -left-[10px] top-24 z-50 flex flex-col gap-4">
          {/* Volume Up */}
          <div className={cn('h-12 w-[3px] rounded-r-lg', colorConfig[color].button)}>
            <div className="absolute -left-[2px] h-12 w-1 rounded-l-lg bg-gradient-to-r from-black/10 to-transparent" />
          </div>
          {/* Volume Down */}
          <div className={cn('h-12 w-[3px] rounded-r-lg', colorConfig[color].button)}>
            <div className="absolute -left-[2px] h-12 w-1 rounded-l-lg bg-gradient-to-r from-black/10 to-transparent" />
          </div>
        </div>

        {/* Power Button */}
        <div className="absolute -right-[10px] top-32 z-50">
          <div className={cn('h-16 w-[3px] rounded-l-lg', colorConfig[color].button)}>
            <div className="absolute -right-[2px] h-16 w-1 rounded-r-lg bg-gradient-to-l from-black/10 to-transparent" />
          </div>
        </div>

        {/* Dynamic Island / Notch Area */}
        {variant === 'iphone' ? (
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
            <div
              className={cn(
                'mt-2 flex h-[25px] w-[120px] items-center justify-center rounded-full bg-black p-2'
              )}
            >
              {/* Front Camera */}
              <div className="absolute right-6 flex items-center justify-center">
                <div className={cn('h-3 w-3 rounded-full', colorConfig[color].camera)} />
                <div className="absolute h-2 w-2 rounded-full bg-black" />
                <div className="absolute h-1 w-1 rounded-full bg-blue-400/40" />
              </div>
              {/* Speaker */}
              <div className={cn('ml-2 h-1 w-12 rounded-full', colorConfig[color].speaker)} />
            </div>
          </div>
        ) : (
          <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2">
            <div className="flex items-center justify-center">
              {/* Front Camera */}
              <div className="relative h-3 w-3">
                <div className={cn('absolute h-3 w-3 rounded-full', colorConfig[color].camera)} />
                <div className="absolute h-2 w-2 rounded-full bg-black" />
                <div className="absolute h-1 w-1 rounded-full bg-blue-400/40" />
              </div>
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-background to-background/95">
          {children}
        </div>

        {/* Bottom Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2">
          <div className={cn('h-1 w-32 rounded-full', colorConfig[color].button)} />
        </div>
      </div>
    </>
  );

  return (
    <div className={cn('relative mx-auto w-full max-w-[280px] lg:max-w-[320px]', className)}>
      {floatingEffect ? (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3,
            ease: 'easeInOut',
          }}
          className="relative w-full"
        >
          {renderContent()}
        </motion.div>
      ) : (
        <div className="relative w-full">{renderContent()}</div>
      )}
    </div>
  );
};

export default MobileDevice;
