// src/Story.tsx
import React, { useRef, useEffect } from 'react';

interface StoryProps {
  content: {
    id: number;
    title: string;
    description: string;
    likeCount: number;
  };
  onTopReach: () => void;
  onBottomReach: () => void;
  onNoOverflow: () => void;
}

const Story: React.FC<StoryProps> = ({ content, onTopReach, onBottomReach, onNoOverflow }) => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { scrollHeight, clientHeight } = storyRef.current!;
    if (scrollHeight <= clientHeight) {
      onNoOverflow();
    } else {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = storyRef.current!;
        if (scrollTop === 0) {
          onTopReach();
        } else if (scrollTop + clientHeight >= scrollHeight) {
          onBottomReach();
        }
      };

      const storyElement = storyRef.current!;
      storyElement.addEventListener('scroll', handleScroll);
      return () => {
        storyElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [onTopReach, onBottomReach, onNoOverflow]);

  return (
    <div ref={storyRef} className="h-full overflow-y-auto p-4 bg-black">
      <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
      <span>{content.description}</span>
    </div>
  );
};

export default Story;
