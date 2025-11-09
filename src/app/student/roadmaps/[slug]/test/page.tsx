'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type QuestionType = 'mcq' | 'true-false';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the primary purpose of the useEffect hook in React?',
    options: [
      'To manage component state',
      'To perform side effects after render',
      'To handle form submissions',
      'To create context providers',
    ],
    correctAnswer: 1,
    explanation: 'useEffect is used to perform side effects after the component renders, such as API calls or subscriptions.',
  },
  {
    id: 2,
    type: 'true-false',
    question: 'Dependencies in useEffect determine when the effect runs.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'Correct! The dependency array in useEffect controls when the effect is executed.',
  },
  {
    id: 3,
    type: 'mcq',
    question: 'What does an empty dependency array [] in useEffect mean?',
    options: [
      'Run on every render',
      'Run only on mount and unmount',
      'Never run',
      'Run on dependency change',
    ],
    correctAnswer: 1,
    explanation: 'An empty dependency array means the effect runs only once after the initial render.',
  },
  {
    id: 4,
    type: 'true-false',
    question: 'You can have multiple useEffect hooks in a single component.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'True! React allows multiple useEffect hooks in a component for better organization.',
  },
  {
    id: 5,
    type: 'mcq',
    question: 'How do you clean up side effects in useEffect?',
    options: [
      'By returning null',
      'By returning undefined',
      'By returning a cleanup function',
      'Side effects cannot be cleaned up',
    ],
    correctAnswer: 2,
    explanation: 'You can return a cleanup function from useEffect to handle cleanup operations.',
  },
  {
    id: 6,
    type: 'true-false',
    question: 'useEffect runs before the component renders.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'False! useEffect runs after the component renders, not before.',
  },
];

const QuizAssessmentPage = () => {
  const [mounted, setMounted] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  // Hydration fix: Initialize mounted state
  useEffect(() => {
    setMounted(true);
    setShowStartDialog(true);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || !mounted || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQuizStarted(false);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, mounted, timeLeft]);

  const handleStartQuiz = () => {
    setShowStartDialog(false);
    setQuizStarted(true);
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setQuizStarted(false);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const isTimeUp = timeLeft === 0;
  const score = showResults ? calculateScore() : { correct: 0, total: 0, percentage: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Start Quiz Dialog */}
      <AlertDialog open={showStartDialog && !showResults} onOpenChange={setShowStartDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Ready to Take the Quiz?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900 dark:text-blue-100">Time Limit</p>
                    <p className="text-sm text-blue-700 dark:text-blue-200">20 minutes</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quiz Details:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• {questions.length} questions total</li>
                    <li>• Mix of MCQ and True/False</li>
                    <li>• Timer starts when you begin</li>
                    <li>• Submit manually or time runs out</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartQuiz} className="flex-1">
              Start Quiz
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      {quizStarted && (
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quiz Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Question {answers.filter((a) => a !== null).length} / {questions.length} answered
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isTimeUp
                ? 'bg-red-100 dark:bg-red-950'
                : timeLeft < 300
                ? 'bg-yellow-100 dark:bg-yellow-950'
                : 'bg-green-100 dark:bg-green-950'
            }`}>
              <Clock className={`h-5 w-5 ${
                isTimeUp
                  ? 'text-red-600'
                  : timeLeft < 300
                  ? 'text-yellow-600'
                  : 'text-green-600'
              }`} />
              <span className="font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {quizStarted && (
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          <span className="text-primary mr-3">Q{index + 1}.</span>
                          {question.question}
                        </CardTitle>
                        <Badge className="mt-3" variant="outline">
                          {question.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
                        </Badge>
                      </div>
                      {answers[index] !== null && (
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers[index] !== null ? answers[index]!.toString() : ''}
                      onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
                    >
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-3">
                            <RadioGroupItem
                              value={optionIndex.toString()}
                              id={`q${question.id}-opt${optionIndex}`}
                            />
                            <Label
                              htmlFor={`q${question.id}-opt${optionIndex}`}
                              className="flex-1 cursor-pointer p-3 rounded-lg border border-transparent hover:bg-accent transition-colors"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full"
                disabled={answers.includes(null)}
              >
                Submit Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Results View */}
        {showResults && (
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
            <Link href="/roadmap">
              <Button variant="outline" size="sm" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Roadmap
              </Button>
            </Link>

            <Card className="border-2 mb-8">
              <CardContent className="pt-8 text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {score.percentage}%
                </div>
                <div className="text-2xl font-bold mb-2">
                  {score.percentage >= 70 ? '🎉 Passed!' : '❌ Failed'}
                </div>
                <p className="text-muted-foreground mb-6">
                  You got {score.correct} out of {score.total} questions correct
                </p>
              </CardContent>
            </Card>

            {/* Answer Review */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Answer Review</h2>
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <Card
                    key={question.id}
                    className={`border-2 ${isCorrect ? 'border-green-500/50' : 'border-red-500/50'}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`text-2xl flex-shrink-0 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold mb-2">
                            Q{index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your answer: {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-sm italic text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizAssessmentPage;