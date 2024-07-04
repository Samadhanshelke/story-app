// src/App.tsx
import React, { useState, useRef, TouchEvent } from 'react';
import Story from './Story';
import './index.css';

interface StoryData {
  id: number;
  title: string;
  description: string;
  likeCount: number;
}

const data: StoryData[] = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    description: 'An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms... An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...',
    likeCount: 150,
  },
  {
    id: 2,
    title: 'Advanced Python Programming',
    description: 'An advanced course on Python programming... An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...',
    likeCount: 230,
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    description: 'A foundational course covering the basics of data science...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...An introductory course on machine learning concepts and algorithms...',
    likeCount: 310,
  },
  {
    id: 4,
    title: 'Web Development with JavaScript',
    description: 'Learn how to build dynamic and interactive websites using JavaScript...',
    likeCount: 450,
  },
  {
    id: 5,
    title: 'Introduction to Cybersecurity',
    description: 'A beginner\'s guide to understanding cybersecurity principles and practices...',
    likeCount: 275,
  },
  {
    id: 6,
    title: 'Mobile App Development with Flutter',
    description: 'Create cross-platform mobile applications using the Flutter framework...',
    likeCount: 325,
  },
  {
    id: 7,
    title: 'Cloud Computing Basics',
    description: 'An overview of cloud computing concepts and services...',
    likeCount: 180,
  },
  {
    id: 8,
    title: 'Digital Marketing Strategies',
    description: 'Explore effective digital marketing strategies to enhance your online presence...',
    likeCount: 400,
  },
  {
    id: 9,
    title: 'Introduction to Blockchain',
    description: 'Understand the fundamentals of blockchain technology and its applications...',
    likeCount: 290,
  },
  {
    id: 10,
    title: 'Project Management Essentials',
    description: 'Learn the key principles and practices of effective project management...',
    likeCount: 340,
  },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartY = useRef<number | null>(null);
  const canSwipeUp = useRef(false);
  const canSwipeDown = useRef(false);
  const noOverflow = useRef(false);
  const storyKey = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY.current - touchEndY;

    if (touchDiff > 50 && (canSwipeUp.current || noOverflow.current)) {
      // Swiped up
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
        storyKey.current += 1; // Update the story key
      }
    } else if (touchDiff < -50 && (canSwipeDown.current || noOverflow.current)) {
      // Swiped down
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        storyKey.current += 1; // Update the story key
      }
    }

    touchStartY.current = null;
  };

  const handleTopReach = () => {
    canSwipeDown.current = true;
    canSwipeUp.current = false;
    noOverflow.current = false;
  };

  const handleBottomReach = () => {
    canSwipeUp.current = true;
    canSwipeDown.current = false;
    noOverflow.current = false;
  };

  const handleNoOverflow = () => {
    noOverflow.current = true;
    canSwipeUp.current = false;
    canSwipeDown.current = false;
  };

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center bg-black text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Story
        key={storyKey.current} // Use the key to force re-render
        content={data[currentIndex]}
        onTopReach={handleTopReach}
        onBottomReach={handleBottomReach}
        onNoOverflow={handleNoOverflow}
      />
    </div>
  );
};

export default App;
