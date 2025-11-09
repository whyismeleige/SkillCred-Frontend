'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  BookOpen,
  Trophy,
  Target,
  Zap,
  Code,
  FileText,
  Circle,
  ExternalLink,
  Award,
  Clock,
  Star,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

type NodeStatus = 'not-started' | 'in-progress' | 'completed';
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  status: NodeStatus;
  estimatedTime: string;
  resources: string[];
  topics: string[];
  points: number;
  subTopics: Array<{
    title: string;
    completed: boolean;
  }>;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  totalNodes: number;
  completedNodes: number;
  totalPoints: number;
  earnedPoints: number;
  nodes: RoadmapNode[];
}

const RoadmapPage = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string>('fullstack');

  const roadmaps: Record<string, Roadmap> = {
    fullstack: {
      id: 'fullstack',
      title: 'Full-Stack Web Development',
      description: 'Complete path to becoming a full-stack developer',
      totalNodes: 14,
      completedNodes: 4,
      totalPoints: 1400,
      earnedPoints: 400,
      nodes: [
        {
          id: 'html-css',
          title: 'HTML & CSS Fundamentals',
          description:
            'Master the fundamentals of web structure and styling. Learn semantic HTML5, CSS3, Flexbox, Grid, and responsive design principles.',
          difficulty: 'beginner',
          status: 'completed',
          estimatedTime: '2 weeks',
          resources: [
            'MDN Web Docs - HTML',
            'CSS Tricks Complete Guide',
            'W3Schools Interactive Tutorials',
            'FreeCodeCamp Responsive Design',
          ],
          topics: ['HTML5 Tags', 'CSS Selectors', 'Flexbox', 'Grid', 'Responsive Design'],
          points: 100,
          subTopics: [
            { title: 'Semantic HTML Elements', completed: true },
            { title: 'CSS Box Model', completed: true },
            { title: 'Flexbox Layout', completed: true },
            { title: 'CSS Grid System', completed: true },
            { title: 'Media Queries', completed: true },
          ],
        },
        {
          id: 'javascript',
          title: 'JavaScript Fundamentals',
          description:
            'Learn core JavaScript concepts including ES6+ features, DOM manipulation, async programming, and modern JavaScript practices.',
          difficulty: 'beginner',
          status: 'completed',
          estimatedTime: '4 weeks',
          resources: [
            'JavaScript.info',
            'Eloquent JavaScript Book',
            'MDN JavaScript Guide',
            'You Don\'t Know JS Series',
          ],
          topics: ['Variables', 'Functions', 'Arrays', 'Objects', 'Promises', 'ES6+'],
          points: 100,
          subTopics: [
            { title: 'Variables & Data Types', completed: true },
            { title: 'Functions & Scope', completed: true },
            { title: 'Arrays & Objects', completed: true },
            { title: 'DOM Manipulation', completed: true },
            { title: 'Async/Await & Promises', completed: true },
            { title: 'ES6+ Features', completed: true },
          ],
        },
        {
          id: 'react',
          title: 'React Development',
          description:
            'Build modern UIs with React. Master components, hooks, state management, and React best practices.',
          difficulty: 'intermediate',
          status: 'completed',
          estimatedTime: '6 weeks',
          resources: [
            'Official React Documentation',
            'React Patterns by Kent C. Dodds',
            'Epic React Course',
            'React Router Documentation',
          ],
          topics: ['Components', 'Hooks', 'Props', 'State', 'Context API', 'React Router'],
          points: 100,
          subTopics: [
            { title: 'JSX & Components', completed: true },
            { title: 'Props & State', completed: true },
            { title: 'React Hooks (useState, useEffect)', completed: true },
            { title: 'Context API', completed: true },
            { title: 'React Router', completed: true },
            { title: 'Custom Hooks', completed: true },
          ],
        },
        {
          id: 'nodejs',
          title: 'Node.js Backend',
          description:
            'Server-side JavaScript with Node.js. Learn event loop, modules, npm, and building backend applications.',
          difficulty: 'intermediate',
          status: 'completed',
          estimatedTime: '5 weeks',
          resources: [
            'Node.js Official Docs',
            'NodeSchool Workshops',
            'Express.js Guide',
            'Node.js Best Practices',
          ],
          topics: ['Event Loop', 'Modules', 'NPM', 'File System', 'Streams'],
          points: 100,
          subTopics: [
            { title: 'Node.js Basics & Event Loop', completed: true },
            { title: 'NPM & Package Management', completed: true },
            { title: 'File System Operations', completed: true },
            { title: 'Building CLI Tools', completed: true },
            { title: 'Streams & Buffers', completed: true },
          ],
        },
        {
          id: 'nextjs',
          title: 'Next.js Framework',
          description:
            'Full-stack React framework. Learn SSR, SSG, API routes, and modern web application development.',
          difficulty: 'intermediate',
          status: 'in-progress',
          estimatedTime: '4 weeks',
          resources: [
            'Next.js Documentation',
            'Vercel Deployment Guides',
            'Next.js Tutorials',
            'App Router Deep Dive',
          ],
          topics: ['App Router', 'Server Components', 'API Routes', 'SSR', 'SSG'],
          points: 100,
          subTopics: [
            { title: 'Pages & Routing', completed: true },
            { title: 'Server Components', completed: true },
            { title: 'API Routes', completed: false },
            { title: 'SSR & SSG', completed: false },
            { title: 'Image Optimization', completed: false },
            { title: 'Middleware', completed: false },
          ],
        },
        {
          id: 'state-management',
          title: 'State Management',
          description:
            'Advanced state management with Redux, Zustand, or Recoil. Handle complex application state.',
          difficulty: 'advanced',
          status: 'not-started',
          estimatedTime: '3 weeks',
          resources: [
            'Redux Official Docs',
            'Zustand Guide',
            'State Management Patterns',
            'Redux Toolkit Tutorial',
          ],
          topics: ['Redux', 'Zustand', 'Context API', 'State Patterns'],
          points: 100,
          subTopics: [
            { title: 'Redux Fundamentals', completed: false },
            { title: 'Redux Toolkit', completed: false },
            { title: 'Zustand Basics', completed: false },
            { title: 'State Management Patterns', completed: false },
            { title: 'Performance Optimization', completed: false },
          ],
        },
        {
          id: 'express',
          title: 'Express.js Framework',
          description:
            'Build robust APIs with Express. Learn routing, middleware, error handling, and RESTful design.',
          difficulty: 'intermediate',
          status: 'not-started',
          estimatedTime: '3 weeks',
          resources: [
            'Express.js Documentation',
            'REST API Tutorial',
            'Middleware Guide',
            'Express Security Best Practices',
          ],
          topics: ['Routing', 'Middleware', 'Error Handling', 'Authentication'],
          points: 100,
          subTopics: [
            { title: 'Express Basics & Routing', completed: false },
            { title: 'Middleware Functions', completed: false },
            { title: 'Error Handling', completed: false },
            { title: 'Authentication & Authorization', completed: false },
            { title: 'RESTful API Design', completed: false },
          ],
        },
        {
          id: 'databases',
          title: 'Database Fundamentals',
          description:
            'Understanding databases, SQL vs NoSQL, data modeling, and database design principles.',
          difficulty: 'intermediate',
          status: 'not-started',
          estimatedTime: '4 weeks',
          resources: [
            'Database Design Principles',
            'SQL Tutorial',
            'NoSQL Guide',
            'Database Normalization',
          ],
          topics: ['SQL', 'NoSQL', 'Data Modeling', 'Normalization', 'Indexing'],
          points: 100,
          subTopics: [
            { title: 'SQL Basics & Queries', completed: false },
            { title: 'NoSQL Fundamentals', completed: false },
            { title: 'Data Modeling', completed: false },
            { title: 'Database Normalization', completed: false },
            { title: 'Indexing & Performance', completed: false },
          ],
        },
        {
          id: 'mongodb',
          title: 'MongoDB Database',
          description:
            'NoSQL database with MongoDB. Learn document modeling, queries, aggregation, and Mongoose ODM.',
          difficulty: 'intermediate',
          status: 'not-started',
          estimatedTime: '3 weeks',
          resources: [
            'MongoDB Official Docs',
            'Mongoose ODM Guide',
            'MongoDB University',
            'Aggregation Framework',
          ],
          topics: ['Documents', 'Collections', 'Aggregation', 'Mongoose', 'Indexing'],
          points: 100,
          subTopics: [
            { title: 'MongoDB CRUD Operations', completed: false },
            { title: 'Document Modeling', completed: false },
            { title: 'Mongoose ODM', completed: false },
            { title: 'Aggregation Pipeline', completed: false },
            { title: 'Indexing Strategies', completed: false },
          ],
        },
        {
          id: 'postgresql',
          title: 'PostgreSQL Database',
          description:
            'Advanced SQL with PostgreSQL. Master relations, joins, transactions, and complex queries.',
          difficulty: 'advanced',
          status: 'not-started',
          estimatedTime: '4 weeks',
          resources: [
            'PostgreSQL Documentation',
            'Advanced SQL Tutorial',
            'Prisma ORM Guide',
            'PostgreSQL Performance',
          ],
          topics: ['Relational Design', 'Joins', 'Transactions', 'Performance', 'Prisma'],
          points: 100,
          subTopics: [
            { title: 'Advanced SQL Queries', completed: false },
            { title: 'Table Relations & Joins', completed: false },
            { title: 'Transactions & ACID', completed: false },
            { title: 'Prisma ORM', completed: false },
            { title: 'Query Optimization', completed: false },
          ],
        },
        {
          id: 'rest-api',
          title: 'RESTful API Design',
          description:
            'Design and build RESTful APIs. Learn HTTP methods, status codes, API versioning, and best practices.',
          difficulty: 'intermediate',
          status: 'not-started',
          estimatedTime: '2 weeks',
          resources: [
            'REST API Design Guide',
            'API Best Practices',
            'Postman Documentation',
            'API Security Patterns',
          ],
          topics: ['HTTP Methods', 'Status Codes', 'Versioning', 'Documentation'],
          points: 100,
          subTopics: [
            { title: 'REST Principles', completed: false },
            { title: 'HTTP Methods & Status Codes', completed: false },
            { title: 'API Versioning', completed: false },
            { title: 'API Documentation', completed: false },
            { title: 'Error Handling', completed: false },
          ],
        },
        {
          id: 'graphql',
          title: 'GraphQL APIs',
          description:
            'Query language for APIs. Learn schemas, resolvers, queries, mutations, and Apollo.',
          difficulty: 'advanced',
          status: 'not-started',
          estimatedTime: '3 weeks',
          resources: [
            'GraphQL Official Docs',
            'Apollo Server Guide',
            'GraphQL Tutorial',
            'Apollo Client Documentation',
          ],
          topics: ['Schemas', 'Resolvers', 'Queries', 'Mutations', 'Apollo Client'],
          points: 100,
          subTopics: [
            { title: 'GraphQL Basics & Schemas', completed: false },
            { title: 'Queries & Mutations', completed: false },
            { title: 'Resolvers', completed: false },
            { title: 'Apollo Server', completed: false },
            { title: 'Apollo Client Integration', completed: false },
          ],
        },
        {
          id: 'deployment',
          title: 'Deployment & Hosting',
          description:
            'Deploy applications to production. Learn CI/CD, Docker, cloud platforms, and monitoring.',
          difficulty: 'intermediate',
          status: 'not-started',
          estimatedTime: '3 weeks',
          resources: [
            'Vercel Deployment Docs',
            'AWS Getting Started',
            'Docker Tutorial',
            'CI/CD Best Practices',
          ],
          topics: ['CI/CD', 'Docker', 'Vercel', 'AWS', 'Monitoring'],
          points: 100,
          subTopics: [
            { title: 'Vercel Deployment', completed: false },
            { title: 'Docker Basics', completed: false },
            { title: 'CI/CD Pipelines', completed: false },
            { title: 'AWS Cloud Services', completed: false },
            { title: 'Application Monitoring', completed: false },
          ],
        },
        {
          id: 'devops',
          title: 'DevOps Practices',
          description:
            'Infrastructure as code, container orchestration, monitoring, and production best practices.',
          difficulty: 'advanced',
          status: 'not-started',
          estimatedTime: '5 weeks',
          resources: [
            'DevOps Roadmap',
            'Kubernetes Documentation',
            'Terraform Guide',
            'Monitoring Best Practices',
          ],
          topics: ['Kubernetes', 'Terraform', 'Monitoring', 'CI/CD', 'Security'],
          points: 100,
          subTopics: [
            { title: 'Kubernetes Basics', completed: false },
            { title: 'Container Orchestration', completed: false },
            { title: 'Infrastructure as Code', completed: false },
            { title: 'Monitoring & Logging', completed: false },
            { title: 'Security Best Practices', completed: false },
          ],
        },
      ],
    },
  };

  const currentRoadmap = roadmaps[selectedRoadmap];
  const progressPercentage = Math.round(
    (currentRoadmap.completedNodes / currentRoadmap.totalNodes) * 100
  );
  const pointsPercentage = Math.round(
    (currentRoadmap.earnedPoints / currentRoadmap.totalPoints) * 100
  );

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
    }
  };

  const getDifficultyIcon = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'beginner':
        return <Zap className="h-4 w-4 text-green-600" />;
      case 'intermediate':
        return <Code className="h-4 w-4 text-yellow-600" />;
      case 'advanced':
        return <Trophy className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusIcon = (status: NodeStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-600" />;
      case 'not-started':
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: NodeStatus) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">
            <Play className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'not-started':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Circle className="h-3 w-3 mr-1" />
            Not Started
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Floating Header */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
        <div className="bg-card/95 backdrop-blur-md border-2 border-border rounded-full shadow-lg px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/student-portfolio">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  {currentRoadmap.earnedPoints} / {currentRoadmap.totalPoints} Points
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <Card className="border-2 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-3">{currentRoadmap.title}</h1>
                  <p className="text-muted-foreground text-lg">{currentRoadmap.description}</p>
                </div>
                <Card className="border-2 px-8 py-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                      <p className="text-4xl font-bold text-primary">{currentRoadmap.earnedPoints}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm font-bold text-primary">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Points Progress</span>
                    <span className="text-sm font-bold text-primary">{pointsPercentage}%</span>
                  </div>
                  <Progress value={pointsPercentage} className="h-3" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400">
                  <Zap className="h-3 w-3 mr-1" />
                  Beginner
                </Badge>
                <Badge variant="outline" className="border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                  <Code className="h-3 w-3 mr-1" />
                  Intermediate
                </Badge>
                <Badge variant="outline" className="border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400">
                  <Trophy className="h-3 w-3 mr-1" />
                  Advanced
                </Badge>
              </div>
            </div>
          </Card>

          {/* Roadmap Accordion */}
          <Accordion type="multiple" className="space-y-4">
            {currentRoadmap.nodes.map((node, index) => {
              const completedSubTopics = node.subTopics.filter((st) => st.completed).length;
              const subTopicsProgress = Math.round(
                (completedSubTopics / node.subTopics.length) * 100
              );

              return (
                <AccordionItem
                  key={node.id}
                  value={node.id}
                  className="border-2 rounded-xl overflow-hidden bg-card"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between w-full mr-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg">{node.title}</h3>
                            {getStatusIcon(node.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={getDifficultyColor(node.difficulty)}>
                              {getDifficultyIcon(node.difficulty)}
                              <span className="ml-1">{node.difficulty}</span>
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {node.estimatedTime}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              {node.points} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(node.status)}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6 mt-4">
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">{node.description}</p>

                      {/* Sub-topics Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Learning Checkpoints
                          </h4>
                          <span className="text-sm font-medium">
                            {completedSubTopics}/{node.subTopics.length}
                          </span>
                        </div>
                        <Progress value={subTopicsProgress} className="h-2 mb-4" />
                        <div className="grid gap-2">
                          {node.subTopics.map((subTopic, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                                subTopic.completed
                                  ? 'bg-green-500/5 border-green-500/20'
                                  : 'bg-muted/30 border-border'
                              }`}
                            >
                              {subTopic.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <span
                                className={`text-sm ${
                                  subTopic.completed
                                    ? 'text-foreground font-medium'
                                    : 'text-muted-foreground'
                                }`}
                              >
                                {subTopic.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Topics */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          Key Topics
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {node.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Learning Resources */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          Learning Resources
                        </h4>
                        <div className="grid gap-2">
                          {node.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                            >
                              <span className="text-sm">{resource}</span>
                              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button className="flex-1" size="lg">
                          <FileText className="h-4 w-4 mr-2" />
                          Take Quiz
                        </Button>
                        <Button variant="outline" className="flex-1" size="lg">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                        {node.status === 'not-started' && (
                          <Button variant="secondary" size="lg">
                            <Play className="h-4 w-4 mr-2" />
                            Begin
                          </Button>
                        )}
                        {node.status === 'in-progress' && (
                          <Button variant="default" size="lg">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;