// src/components/ServiceDetails/MobileDevelopment/HeroSection/SocialAppUI.tsx
import { motion, AnimatePresence, type AnimationControls } from 'framer-motion';
import { Search, Heart, MessageCircle, Share2, Home, PlusSquare, User, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface PostData {
  id: number;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  username: string;
  timeAgo: string;
  isLiked?: boolean;
}

interface SocialAppUIProps {
  controls: AnimationControls;
}

const mockPosts: PostData[] = [
  {
    id: 1,
    username: '@sarah_design',
    timeAgo: '2m ago',
    image: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    likes: 234,
    comments: 18,
    shares: 5,
  },
  {
    id: 2,
    username: '@mike_photo',
    timeAgo: '5m ago',
    image: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
    likes: 187,
    comments: 12,
    shares: 3,
  },
  {
    id: 3,
    username: '@travel_alex',
    timeAgo: '15m ago',
    image: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
    likes: 342,
    comments: 24,
    shares: 8,
  },
];

const SocialAppUI = ({ controls }: SocialAppUIProps) => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % posts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const handleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  return (
    <div className="h-full p-4">
      {/* Search Bar */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
          interact1: { scale: 1.05 },
        }}
        className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 backdrop-blur-sm"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Search posts...</span>
      </motion.div>

      {/* Posts Feed */}
      <div className="mt-4 space-y-4">
        <AnimatePresence mode="wait">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: index === activeIndex ? 1.02 : 1,
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/10" />
                  <div>
                    <p className="text-sm font-medium">{post.username}</p>
                    <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                  </div>
                </div>
                <button className="text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Post Image */}
              <div className={cn('aspect-square w-full', post.image)} />

              {/* Post Actions */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1"
                  >
                    <Heart
                      className={cn('h-4 w-4', post.isLiked ? 'fill-red-500 text-red-500' : '')}
                    />
                    <span className="text-xs">{post.likes}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-xs">{post.comments}</span>
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{post.shares}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-border/50 bg-background/80 p-4 backdrop-blur-sm"
      >
        {[Home, Search, PlusSquare, Bell, User].map((Icon, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-muted-foreground transition-colors hover:text-purple-500"
          >
            <Icon className="h-5 w-5" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialAppUI;
