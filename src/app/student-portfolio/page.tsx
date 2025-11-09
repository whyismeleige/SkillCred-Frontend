'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Code,
  Award,
  BookOpen,
  Map,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Edit,
  ArrowLeft,
  Trophy,
  Target,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Plus,
  Trash2,
  X,
  Upload,
  Camera,
  User,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface StudentProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string; // Now stores image URL or base64
  avatarType: 'emoji' | 'image';
  title: string;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  certificates: Certificate[];
  tests: Test[];
  roadmaps: Roadmap[];
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  verified: boolean;
}

interface Test {
  id: number;
  title: string;
  score: number;
  totalScore: number;
  date: string;
  status: 'passed' | 'failed';
  category: string;
}

interface Roadmap {
  id: number;
  title: string;
  progress: number;
  topics: number;
  completed: number;
  image: string;
  timeLeft: string;
}

type TabType = 'overview' | 'tests' | 'certificates' | 'roadmaps';
type EditMode = 'profile' | 'skills' | 'socials' | null;

const StudentPortfolioPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [scrolled, setScrolled] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    title: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer specializing in React, Node.js, and cloud technologies. Always eager to build amazing products and solve complex problems.',
    avatar: '👨‍💻',
    avatarType: 'emoji',
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'MongoDB',
      'AWS',
      'Git',
      'Python',
      'SQL',
      'Docker',
      'GraphQL',
      'Next.js',
      'Tailwind CSS',
    ],
    socialLinks: {
      github: 'https://github.com/alexjohnson',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      website: 'https://alexjohnson.dev',
    },
    certificates: [
      {
        id: 1,
        title: 'React Advanced Patterns',
        issuer: 'Udemy',
        date: 'Nov 2024',
        image: '🏆',
        verified: true,
      },
      {
        id: 2,
        title: 'AWS Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Oct 2024',
        image: '☁️',
        verified: true,
      },
      {
        id: 3,
        title: 'TypeScript Deep Dive',
        issuer: 'Scrimba',
        date: 'Sep 2024',
        image: '📘',
        verified: true,
      },
      {
        id: 4,
        title: 'JavaScript ES6+ Mastery',
        issuer: 'FreeCodeCamp',
        date: 'Aug 2024',
        image: '⚡',
        verified: true,
      },
      {
        id: 5,
        title: 'Node.js Backend Developer',
        issuer: 'Udemy',
        date: 'Jul 2024',
        image: '🟢',
        verified: false,
      },
      {
        id: 6,
        title: 'MongoDB Database Design',
        issuer: 'MongoDB University',
        date: 'Jun 2024',
        image: '🍃',
        verified: true,
      },
    ],
    tests: [
      {
        id: 1,
        title: 'React Fundamentals Quiz',
        score: 92,
        totalScore: 100,
        date: 'Nov 15, 2024',
        status: 'passed',
        category: 'Frontend',
      },
      {
        id: 2,
        title: 'JavaScript Advanced Concepts',
        score: 88,
        totalScore: 100,
        date: 'Nov 10, 2024',
        status: 'passed',
        category: 'Programming',
      },
      {
        id: 3,
        title: 'System Design Basics',
        score: 75,
        totalScore: 100,
        date: 'Nov 5, 2024',
        status: 'passed',
        category: 'Architecture',
      },
      {
        id: 4,
        title: 'Node.js Backend Development',
        score: 85,
        totalScore: 100,
        date: 'Oct 28, 2024',
        status: 'passed',
        category: 'Backend',
      },
      {
        id: 5,
        title: 'TypeScript Best Practices',
        score: 95,
        totalScore: 100,
        date: 'Oct 20, 2024',
        status: 'passed',
        category: 'Programming',
      },
      {
        id: 6,
        title: 'Database Optimization',
        score: 78,
        totalScore: 100,
        date: 'Oct 15, 2024',
        status: 'passed',
        category: 'Database',
      },
    ],
    roadmaps: [
      {
        id: 1,
        title: 'Full Stack Web Development',
        progress: 65,
        topics: 25,
        completed: 16,
        image: '🌐',
        timeLeft: '2 months',
      },
      {
        id: 2,
        title: 'Cloud & DevOps Engineering',
        progress: 40,
        topics: 20,
        completed: 8,
        image: '☁️',
        timeLeft: '3 months',
      },
      {
        id: 3,
        title: 'System Design & Architecture',
        progress: 30,
        topics: 15,
        completed: 4,
        image: '🏗️',
        timeLeft: '4 months',
      },
    ],
  });

  // Temporary state for editing
  const [editedProfile, setEditedProfile] = useState(studentProfile);

  const calculateAverageScore = () => {
    const total = studentProfile.tests.reduce((acc, test) => acc + test.score, 0);
    return Math.round(total / studentProfile.tests.length);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 75) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const handleOpenEdit = (mode: EditMode) => {
    setEditedProfile({ ...studentProfile });
    setEditMode(mode);
  };

  const handleSaveEdit = () => {
    setStudentProfile(editedProfile);
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditedProfile(studentProfile);
    setEditMode(null);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({
          ...editedProfile,
          avatar: reader.result as string,
          avatarType: 'image',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setEditedProfile({
      ...editedProfile,
      avatar: '👤',
      avatarType: 'emoji',
    });
  };

  const renderAvatar = (profile: StudentProfile, size: 'small' | 'large' = 'large') => {
    const sizeClasses = size === 'large' ? 'w-32 h-32 text-7xl' : 'w-16 h-16 text-3xl';
    
    if (profile.avatarType === 'image') {
      return (
        <div className={`${sizeClasses} rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-primary/20`}>
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={size === 'large' ? 128 : 64}
            height={size === 'large' ? 128 : 64}
            className="object-cover w-full h-full"
          />
        </div>
      );
    }
    
    return (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20`}>
        <span className="text-center">{profile.avatar}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Floating Navigation Bar */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'w-[95%] max-w-4xl' : 'w-[95%] max-w-5xl'
        }`}
      >
        <div
          className={`bg-card/95 backdrop-blur-md border-2 border-border rounded-full shadow-lg transition-all duration-300 ${
            scrolled ? 'py-2 px-4' : 'py-3 px-6'
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            </Link>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 mx-4">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'tests', label: 'Tests', icon: '📝' },
                { id: 'certificates', label: 'Certificates', icon: '🏆' },
                { id: 'roadmaps', label: 'Roadmaps', icon: '🗺️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <span className={scrolled ? 'text-sm' : 'text-base'}>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="rounded-full hidden sm:flex"
                onClick={() => handleOpenEdit('profile')}
              >
                <Edit className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <Card className="border-2 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 sm:p-12 relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-4 right-4 rounded-full"
                    onClick={() => handleOpenEdit('profile')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {renderAvatar(studentProfile)}
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        {studentProfile.name}
                      </h1>
                      <p className="text-lg text-primary font-semibold mb-3">
                        {studentProfile.title}
                      </p>
                      <p className="text-muted-foreground mb-4 max-w-2xl">
                        {studentProfile.bio}
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {studentProfile.socialLinks.github && (
                          <Button variant="outline" size="sm" asChild className="rounded-full">
                            <a
                              href={studentProfile.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {studentProfile.socialLinks.linkedin && (
                          <Button variant="outline" size="sm" asChild className="rounded-full">
                            <a
                              href={studentProfile.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {studentProfile.socialLinks.website && (
                          <Button variant="outline" size="sm" asChild className="rounded-full">
                            <a
                              href={studentProfile.socialLinks.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Website
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => handleOpenEdit('socials')}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Links
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="h-8 w-8 text-primary" />
                      <span className="text-3xl font-bold">{studentProfile.certificates.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                      <span className="text-3xl font-bold">{studentProfile.tests.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tests Passed</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                      <span className="text-3xl font-bold">{calculateAverageScore()}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-8 w-8 text-purple-600" />
                      <span className="text-3xl font-bold">{studentProfile.roadmaps.length}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Active Roadmaps</p>
                  </CardContent>
                </Card>
              </div>

              {/* Skills Section */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        Skills & Technologies
                      </CardTitle>
                      <CardDescription>My technical expertise</CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => handleOpenEdit('skills')}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Skills
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {studentProfile.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Tests */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Tests</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {studentProfile.tests.slice(0, 3).map((test) => {
                      const percentage = Math.round((test.score / test.totalScore) * 100);
                      return (
                        <div
                          key={test.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <div>
                            <p className="font-medium text-sm">{test.title}</p>
                            <p className="text-xs text-muted-foreground">{test.date}</p>
                          </div>
                          <div className={`text-xl font-bold ${getScoreColor(percentage)}`}>
                            {percentage}%
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Active Roadmaps */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Active Learning Paths</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {studentProfile.roadmaps.map((roadmap) => (
                      <div key={roadmap.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{roadmap.image}</span>
                            <div>
                              <p className="font-medium text-sm">{roadmap.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {roadmap.completed}/{roadmap.topics} completed
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {roadmap.progress}%
                          </span>
                        </div>
                        <Progress value={roadmap.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Tests Tab - Keep the same */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Test Results</h2>
                  <p className="text-muted-foreground mt-1">
                    All completed assessments and quizzes
                  </p>
                </div>
                <Card className="border-2 px-6 py-3">
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-primary">{calculateAverageScore()}%</p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {studentProfile.tests.map((test) => {
                  const percentage = Math.round((test.score / test.totalScore) * 100);
                  return (
                    <Card
                      key={test.id}
                      className="border-2 hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2">
                              {test.category}
                            </Badge>
                            <h3 className="font-semibold text-lg mb-1">{test.title}</h3>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {test.date}
                            </p>
                          </div>
                          <div
                            className={`text-4xl font-bold ${getScoreColor(percentage)}`}
                          >
                            {percentage}%
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress value={percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground text-right">
                            Score: {test.score}/{test.totalScore}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certificates Tab - Keep the same */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Certificates & Achievements</h2>
                <p className="text-muted-foreground mt-1">
                  Professional certifications and course completions
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentProfile.certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="border-2 hover:shadow-lg transition-all hover:scale-[1.02] group"
                  >
                    <CardContent className="pt-6">
                      <div className="relative">
                        <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                          {cert.image}
                        </div>
                        {cert.verified && (
                          <Badge
                            className="absolute top-0 right-0 bg-green-600 text-white"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-center">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mb-1">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mb-4">
                        {cert.date}
                      </p>
                      <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Roadmaps Tab - Keep the same */}
          {activeTab === 'roadmaps' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Learning Roadmaps</h2>
                <p className="text-muted-foreground mt-1">
                  Track your progress across different learning paths
                </p>
              </div>

              <div className="space-y-6">
                {studentProfile.roadmaps.map((roadmap) => (
                  <Card
                    key={roadmap.id}
                    className="border-2 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="text-7xl text-center md:text-left">
                          {roadmap.image}
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {roadmap.completed}/{roadmap.topics} topics
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {roadmap.timeLeft} remaining
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Overall Progress</span>
                              <span className="font-bold text-primary">
                                {roadmap.progress}%
                              </span>
                            </div>
                            <Progress value={roadmap.progress} className="h-3" />
                          </div>

                          <div className="flex gap-3">
                            <Link href="/roadmap" className="flex-1">
                              <Button className="w-full">
                                <BookOpen className="h-4 w-4 mr-2" />
                                Continue Learning
                              </Button>
                            </Link>
                            <Link href="/roadmap">
                              <Button variant="outline">
                                <Map className="h-4 w-4 mr-2" />
                                View Roadmap
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={editMode === 'profile'} onOpenChange={() => handleCancelEdit()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Avatar Upload Section */}
            <div className="space-y-4">
              <Label>Profile Picture</Label>
              <div className="flex flex-col items-center gap-4">
                {renderAvatar(editedProfile, 'large')}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  {editedProfile.avatarType === 'image' && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveAvatar}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Upload a profile picture (JPG, PNG, max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={editedProfile.title}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bio: e.target.value })
                }
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Skills Dialog - Keep the same */}
      <Dialog open={editMode === 'skills'} onOpenChange={() => handleCancelEdit()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogDescription>
              Add or remove your technical skills
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Add New Skill</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., React, Python, AWS..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSkill();
                    }
                  }}
                />
                <Button onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Current Skills</Label>
              <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[100px]">
                {editedProfile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-2 text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Social Links Dialog - Keep the same */}
      <Dialog open={editMode === 'socials'} onOpenChange={() => handleCancelEdit()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Social Links</DialogTitle>
            <DialogDescription>
              Update your social media profiles
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="github">
                <Github className="h-4 w-4 inline mr-2" />
                GitHub Profile URL
              </Label>
              <Input
                id="github"
                value={editedProfile.socialLinks.github || ''}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    socialLinks: {
                      ...editedProfile.socialLinks,
                      github: e.target.value,
                    },
                  })
                }
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">
                <Linkedin className="h-4 w-4 inline mr-2" />
                LinkedIn Profile URL
              </Label>
              <Input
                id="linkedin"
                value={editedProfile.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    socialLinks: {
                      ...editedProfile.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">
                <ExternalLink className="h-4 w-4 inline mr-2" />
                Personal Website URL
              </Label>
              <Input
                id="website"
                value={editedProfile.socialLinks.website || ''}
                onChange={(e) =>
                  setEditedProfile({
                    ...editedProfile,
                    socialLinks: {
                      ...editedProfile.socialLinks,
                      website: e.target.value,
                    },
                  })
                }
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPortfolioPage;