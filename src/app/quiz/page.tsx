'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Quiz {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'React Hooks Mastery',
    description: 'Learn the ins and outs of React Hooks.',
    icon: '⚛️',
    progress: 65,
  },
  {
    id: 2,
    title: 'JavaScript Promises',
    description: 'Master asynchronous programming with JavaScript Promises.',
    icon: '⚡',
    progress: 40,
  },
  {
    id: 3,
    title: 'TypeScript Basics',
    description: 'Get started with TypeScript and its features.',
    icon: '📘',
    progress: 85,
  },
];

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="border-2 hover:shadow-lg transition-all hover:border-primary overflow-hidden flex flex-col">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{quiz.icon}</div>
                  <CardTitle className="text-lg sm:text-xl">{quiz.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground">{quiz.description}</p>

                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm font-semibold">{quiz.progress}% Complete</div>
                    <Progress value={quiz.progress} className="h-2" />
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full text-xs sm:text-sm"
                    >
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Roadmap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;