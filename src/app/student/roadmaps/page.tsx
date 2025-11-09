'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  Zap,
  Star,
  Award,
  TrendingUp,
  CheckCircle,
  Play,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface Quiz {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: number;
  duration: string;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'React Hooks Mastery',
    description: 'Learn the ins and outs of React Hooks.',
    icon: '⚛️',
    progress: 65,
    difficulty: 'intermediate',
    questions: 20,
    duration: '30 min',
  },
  {
    id: 2,
    title: 'JavaScript Promises',
    description: 'Master asynchronous programming with JavaScript Promises.',
    icon: '⚡',
    progress: 40,
    difficulty: 'beginner',
    questions: 15,
    duration: '20 min',
  },
  {
    id: 3,
    title: 'TypeScript Basics',
    description: 'Get started with TypeScript and its features.',
    icon: '📘',
    progress: 85,
    difficulty: 'beginner',
    questions: 25,
    duration: '35 min',
  },
  {
    id: 4,
    title: 'System Design Principles',
    description: 'Learn fundamental concepts of system architecture.',
    icon: '🏗️',
    progress: 0,
    difficulty: 'advanced',
    questions: 30,
    duration: '45 min',
  },
  {
    id: 5,
    title: 'Node.js Backend Development',
    description: 'Build robust backend applications with Node.js.',
    icon: '🟢',
    progress: 20,
    difficulty: 'intermediate',
    questions: 22,
    duration: '40 min',
  },
  {
    id: 6,
    title: 'CSS Grid & Flexbox',
    description: 'Master modern CSS layout techniques.',
    icon: '🎨',
    progress: 100,
    difficulty: 'beginner',
    questions: 18,
    duration: '25 min',
  },
];

const QuizPage = () => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (filter === 'in-progress') return quiz.progress > 0 && quiz.progress < 100;
    if (filter === 'completed') return quiz.progress === 100;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default:
        return '';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'text-muted-foreground';
    if (progress === 100) return 'text-green-600';
    return 'text-primary';
  };

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Calculate stats
  const totalQuizzes = quizzes.length;
  const completedQuizzes = quizzes.filter(q => q.progress === 100).length;
  const inProgressQuizzes = quizzes.filter(q => q.progress > 0 && q.progress < 100).length;
  const averageProgress = Math.round(quizzes.reduce((acc, q) => acc + q.progress, 0) / totalQuizzes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <motion.header
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </motion.div>
              Knowledge Quizzes
            </h1>
            <p className="text-muted-foreground mt-2">Test your skills and track your progress</p>
          </motion.div>
        </div>
      </motion.header>

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: 'Total Quizzes', value: totalQuizzes, icon: BookOpen, color: 'text-blue-600' },
              { label: 'Completed', value: completedQuizzes, icon: CheckCircle, color: 'text-green-600' },
              { label: 'In Progress', value: inProgressQuizzes, icon: Play, color: 'text-orange-600' },
              { label: 'Avg Progress', value: `${averageProgress}%`, icon: TrendingUp, color: 'text-purple-600' },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </motion.div>
                      <div className="text-right">
                        <motion.p
                          className="text-2xl font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1, type: 'spring' }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { id: 'all', label: 'All Quizzes', icon: BookOpen },
              { id: 'in-progress', label: 'In Progress', icon: Play },
              { id: 'completed', label: 'Completed', icon: CheckCircle },
            ].map((filterOption) => (
              <motion.div
                key={filterOption.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === filterOption.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.id as typeof filter)}
                  className="rounded-full"
                >
                  <filterOption.icon className="h-4 w-4 mr-2" />
                  {filterOption.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Quizzes Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={filter}
            >
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  layout
                >
                  <Card className="border-2 hover:shadow-xl transition-all hover:border-primary overflow-hidden flex flex-col h-full">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <motion.div
                          className="text-4xl sm:text-5xl"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {quiz.icon}
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1, type: 'spring' }}
                        >
                          {quiz.progress === 100 && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                            >
                              <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{quiz.title}</CardTitle>
                      <motion.div
                        className="flex items-center gap-2 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </motion.div>
                    </CardHeader>

                    <CardContent className="flex-grow space-y-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">{quiz.description}</p>

                      {/* Quiz Info */}
                      <motion.div
                        className="flex items-center justify-between text-xs text-muted-foreground"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {quiz.questions} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {quiz.duration}
                        </span>
                      </motion.div>

                      {/* Progress Section */}
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <div className={`text-xs sm:text-sm font-semibold flex items-center justify-between ${getProgressColor(quiz.progress)}`}>
                          <span>{quiz.progress}% Complete</span>
                          {quiz.progress > 0 && quiz.progress < 100 && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Zap className="h-4 w-4 text-orange-500" />
                            </motion.div>
                          )}
                        </div>
                        <Progress value={quiz.progress} className="h-2" />
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="pt-2 space-y-2">
                        <Link href={`/roadmap`}>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              className="w-full text-xs sm:text-sm group relative overflow-hidden"
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                {quiz.progress === 0 ? 'Start Quiz' : quiz.progress === 100 ? 'Retake Quiz' : 'Continue Quiz'}
                                <motion.div
                                  className="ml-2"
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                </motion.div>
                              </span>
                              <motion.div
                                className="absolute inset-0 bg-primary-foreground/20"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                              />
                            </Button>
                          </motion.div>
                        </Link>
                        <Link href={`/roadmap`}>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              variant="outline"
                              className="w-full text-xs sm:text-sm"
                            >
                              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              View Roadmap
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredQuizzes.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <BookOpen className="h-16 w-16 text-muted-foreground" />
              </motion.div>
              <p className="text-lg text-muted-foreground mb-4">
                No quizzes found in this category.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => setFilter('all')}
                >
                  View All Quizzes
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;