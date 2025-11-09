'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
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
  Users,
  BookOpen,
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
  Star,
  Clock,
  MessageSquare,
  Send,
  ThumbsUp,
  Sparkles,
  Zap,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface MentorProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  avatarType: 'emoji' | 'image';
  title: string;
  yearsOfExperience: number;
  hourlyRate: number;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  certificates: Certificate[];
  reviews: Review[];
  mentees: Mentee[];
  qnas: QandA[];
  stats: {
    totalMentees: number;
    totalSessions: number;
    responseTime: string;
    rating: number;
  };
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  verified: boolean;
}

interface Review {
  id: number;
  menteeeName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface Mentee {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  sessionsCompleted: number;
  avatar: string;
}

interface QandA {
  id: number;
  studentName: string;
  studentAvatar: string;
  question: string;
  answer?: string;
  isAnswered: boolean;
  askedDate: string;
  answeredDate?: string;
  likes: number;
}

type TabType = 'overview' | 'mentees' | 'certificates' | 'qna';
type EditMode = 'profile' | 'skills' | 'socials' | null;

const MentorDashboardPage = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [scrolled, setScrolled] = useState(false);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [newSkill, setNewSkill] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [selectedQnaId, setSelectedQnaId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Hydration fix - Mount component on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener - only attach after mount
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const [mentorProfile, setMentorProfile] = useState<MentorProfile>({
    name: 'Piyush Bobby',
    email: 'skillcred@email.com',
    title: 'Senior Full-Stack Developer & Mentor',
    bio: 'Experienced full-stack developer with 10+ years in the industry. Passionate about mentoring junior developers and helping them grow their careers. Specialized in React, Node.js, and scalable system design.',
    avatar: '👩‍💼',
    avatarType: 'emoji',
    yearsOfExperience: 10,
    hourlyRate: 75,
    skills: [
      'React',
      'Node.js',
      'TypeScript',
      'System Design',
      'MongoDB',
      'AWS',
      'GraphQL',
      'Docker',
    ],
    socialLinks: {
      github: 'https://github.com/noturbob',
      linkedin: 'https://linkedin.com/in/piyush-jain',
      website: 'https://sarahjohnson.dev',
    },
    certificates: [
      {
        id: 1,
        title: 'AWS Solutions Architect Professional',
        issuer: 'Amazon Web Services',
        date: 'Nov 2023',
        image: '☁️',
        verified: true,
      },
      {
        id: 2,
        title: 'Certified Kubernetes Administrator',
        issuer: 'Linux Foundation',
        date: 'Aug 2023',
        image: '⚙️',
        verified: true,
      },
      {
        id: 3,
        title: 'Advanced React Patterns Instructor',
        issuer: 'React Training Academy',
        date: 'May 2023',
        image: '⚛️',
        verified: true,
      },
    ],
    reviews: [
      {
        id: 1,
        menteeeName: 'Alex Chen',
        rating: 5,
        comment: 'Sarah was incredibly helpful in understanding system design concepts. Highly recommended!',
        date: 'Nov 2024',
        avatar: '👨‍💻',
      },
      {
        id: 2,
        menteeeName: 'Maria Garcia',
        rating: 5,
        comment: 'Great mentor with real-world experience. Helped me land my dream job!',
        date: 'Oct 2024',
        avatar: '👩‍💻',
      },
      {
        id: 3,
        menteeeName: 'James Wilson',
        rating: 4,
        comment: 'Very knowledgeable and patient. Would recommend for anyone wanting to learn React.',
        date: 'Sep 2024',
        avatar: '👨‍💼',
      },
    ],
    mentees: [
      {
        id: 1,
        name: 'Alex Chen',
        email: 'alex.chen@email.com',
        joinDate: 'Aug 2024',
        sessionsCompleted: 12,
        avatar: '👨‍💻',
      },
      {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        joinDate: 'Jul 2024',
        sessionsCompleted: 18,
        avatar: '👩‍💻',
      },
      {
        id: 3,
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        joinDate: 'Jun 2024',
        sessionsCompleted: 25,
        avatar: '👨‍💼',
      },
      {
        id: 4,
        name: 'Lisa Chen',
        email: 'lisa.chen@email.com',
        joinDate: 'Oct 2024',
        sessionsCompleted: 8,
        avatar: '👩‍💼',
      },
    ],
    qnas: [
      {
        id: 1,
        studentName: 'Alex Chen',
        studentAvatar: '👨‍💻',
        question: 'What are the best practices for implementing authentication in Node.js?',
        answer: 'For Node.js authentication, I recommend using JWT (JSON Web Tokens) with secure libraries like jsonwebtoken. Always hash passwords with bcrypt, validate input, and use HTTPS. Consider using passport.js for OAuth integration.',
        isAnswered: true,
        askedDate: 'Nov 18, 2024',
        answeredDate: 'Nov 19, 2024',
        likes: 12,
      },
      {
        id: 2,
        studentName: 'Maria Garcia',
        studentAvatar: '👩‍💻',
        question: 'How do I optimize database queries for better performance?',
        answer: 'Key optimization techniques: use indexes on frequently queried columns, avoid N+1 queries with proper joins, implement caching strategies, and profile your queries. Consider using query analyzers to identify bottlenecks.',
        isAnswered: true,
        askedDate: 'Nov 17, 2024',
        answeredDate: 'Nov 17, 2024',
        likes: 8,
      },
      {
        id: 3,
        studentName: 'James Wilson',
        studentAvatar: '👨‍💼',
        question: 'What\'s the difference between microservices and monolithic architecture?',
        answer: '',
        isAnswered: false,
        askedDate: 'Nov 20, 2024',
        likes: 3,
      },
      {
        id: 4,
        studentName: 'Lisa Chen',
        studentAvatar: '👩‍💼',
        question: 'How can I improve my system design interview skills?',
        answer: 'Practice with real-world scenarios, focus on scalability and trade-offs, and communicate your thinking clearly. Study distributed systems concepts, practice time management, and review popular system design patterns.',
        isAnswered: true,
        askedDate: 'Nov 15, 2024',
        answeredDate: 'Nov 16, 2024',
        likes: 15,
      },
    ],
    stats: {
      totalMentees: 4,
      totalSessions: 63,
      responseTime: '< 2 hours',
      rating: 4.8,
    },
  });

  const [editedProfile, setEditedProfile] = useState<MentorProfile | null>(null);

  const handleOpenEdit = (mode: EditMode) => {
    setEditedProfile({ ...mentorProfile });
    setEditMode(mode);
  };

  const handleSaveEdit = () => {
    if (editedProfile) {
      setMentorProfile(editedProfile);
    }
    setEditMode(null);
    setEditedProfile(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedProfile(null);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && editedProfile) {
      const updatedProfile = {
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill.trim()],
      };
      setEditedProfile(updatedProfile);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        skills: editedProfile.skills.filter((skill) => skill !== skillToRemove),
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedProfile) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

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
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        avatar: '👤',
        avatarType: 'emoji',
      });
    }
  };

  const renderAvatar = (profile: MentorProfile, size: 'small' | 'large' = 'large') => {
    const sizeClasses = size === 'large' ? 'w-32 h-32 text-7xl' : 'w-16 h-16 text-3xl';

    if (profile.avatarType === 'image') {
      return (
        <motion.div
          className={`${sizeClasses} rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-primary/20`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={size === 'large' ? 128 : 64}
            height={size === 'large' ? 128 : 64}
            className="object-cover w-full h-full"
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        className={`${sizeClasses} rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border-4 border-primary/20`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-center">{profile.avatar}</span>
      </motion.div>
    );
  };

  // FIXED: Generate date safely after mount
  const handleAnswerQuestion = (qnaId: number) => {
    if (!answerText.trim() || !mounted) return;

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const answeredDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    setMentorProfile(prev => ({
      ...prev,
      qnas: prev.qnas.map(q =>
        q.id === qnaId
          ? {
              ...q,
              answer: answerText,
              isAnswered: true,
              answeredDate: answeredDate,
            }
          : q
      ),
    }));
    setAnswerText('');
    setSelectedQnaId(null);
  };

  const handleLikeAnswer = (qnaId: number) => {
    setMentorProfile(prev => ({
      ...prev,
      qnas: prev.qnas.map(q =>
        q.id === qnaId ? { ...q, likes: q.likes + 1 } : q
      ),
    }));
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

  // Prevent hydration mismatch - return loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

      {/* Floating Navigation Bar */}
      <motion.nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          scrolled ? 'w-[95%] max-w-4xl' : 'w-[95%] max-w-5xl'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.div
          className={`bg-card/95 backdrop-blur-md border-2 border-border rounded-full shadow-lg transition-all duration-300 ${
            scrolled ? 'py-2 px-4' : 'py-3 px-6'
          }`}
          whileHover={{ boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </motion.div>
            </Link>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 mx-4">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'mentees', label: 'Mentees', icon: Users },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'qna', label: 'Q&A', icon: MessageSquare },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-2 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className={`h-4 w-4 ${scrolled ? 'sm:h-3 sm:w-3' : ''}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="rounded-full hidden sm:flex"
                  onClick={() => handleOpenEdit('profile')}
                >
                  <Edit className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 sm:p-12 relative">
                      <motion.div
                        className="absolute top-4 right-4"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => handleOpenEdit('profile')}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </motion.div>
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {renderAvatar(mentorProfile)}
                        <motion.div
                          className="flex-1 text-center md:text-left"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                            {mentorProfile.name}
                          </h1>
                          <p className="text-lg text-primary font-semibold mb-3 flex items-center justify-center md:justify-start gap-2">
                            <Sparkles className="h-5 w-5" />
                            {mentorProfile.title}
                          </p>
                          <p className="text-muted-foreground mb-4 max-w-2xl">
                            {mentorProfile.bio}
                          </p>
                          <motion.div
                            className="flex flex-wrap gap-4 justify-center md:justify-start mb-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.div variants={itemVariants}>
                              <p className="text-sm text-muted-foreground">Experience</p>
                              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                                <Zap className="h-5 w-5" />
                                {mentorProfile.yearsOfExperience}+ yrs
                              </p>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                              <p className="text-sm text-muted-foreground">Hourly Rate</p>
                              <p className="text-2xl font-bold text-primary">
                                ${mentorProfile.hourlyRate}
                              </p>
                            </motion.div>
                          </motion.div>
                          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {mentorProfile.socialLinks.github && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm" asChild className="rounded-full">
                                  <a
                                    href={mentorProfile.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Github className="h-4 w-4 mr-2" />
                                    GitHub
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                            {mentorProfile.socialLinks.linkedin && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm" asChild className="rounded-full">
                                  <a
                                    href={mentorProfile.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Linkedin className="h-4 w-4 mr-2" />
                                    LinkedIn
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full"
                                onClick={() => handleOpenEdit('socials')}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Links
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { icon: Users, label: 'Active Mentees', value: mentorProfile.stats.totalMentees, color: 'text-primary' },
                    { icon: Clock, label: 'Total Sessions', value: mentorProfile.stats.totalSessions, color: 'text-green-600' },
                    { icon: MessageSquare, label: 'Response Time', value: mentorProfile.stats.responseTime, color: 'text-blue-600' },
                    { icon: Star, label: 'Average Rating', value: mentorProfile.stats.rating, color: 'text-yellow-500' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            </motion.div>
                            <span className="text-3xl font-bold">{stat.value}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-primary" />
                            Expertise
                          </CardTitle>
                          <CardDescription>Technical skills and specializations</CardDescription>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full"
                            onClick={() => handleOpenEdit('skills')}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Skills
                          </Button>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {mentorProfile.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant="secondary"
                              className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  className="grid lg:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Recent Mentees */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Recent Mentees
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {mentorProfile.mentees.slice(0, 3).map((mentee, index) => (
                          <motion.div
                            key={mentee.id}
                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center gap-3">
                              <motion.span
                                className="text-2xl"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                              >
                                {mentee.avatar}
                              </motion.span>
                              <div>
                                <p className="font-medium text-sm">{mentee.name}</p>
                                <p className="text-xs text-muted-foreground">Joined {mentee.joinDate}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-primary">{mentee.sessionsCompleted}</p>
                              <p className="text-xs text-muted-foreground">sessions</p>
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Top Reviews */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-2">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          Recent Reviews
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {mentorProfile.reviews.slice(0, 3).map((review, index) => (
                          <motion.div
                            key={review.id}
                            className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: -5 }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <motion.span
                                  className="text-lg"
                                  whileHover={{ scale: 1.2, rotate: -10 }}
                                >
                                  {review.avatar}
                                </motion.span>
                                <div>
                                  <p className="font-medium text-sm">{review.menteeeName}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                  >
                                    <Star
                                      className={`h-3 w-3 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {review.comment}
                            </p>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Mentees Tab */}
            {activeTab === 'mentees' && (
              <motion.div
                key="mentees"
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="h-8 w-8 text-primary" />
                    Your Mentees
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    All active mentoring relationships
                  </p>
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-2 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {mentorProfile.mentees.map((mentee, index) => (
                    <motion.div
                      key={mentee.id}
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <motion.span
                                className="text-5xl"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                {mentee.avatar}
                              </motion.span>
                              <div>
                                <h3 className="font-semibold text-lg">{mentee.name}</h3>
                                <p className="text-sm text-muted-foreground">{mentee.email}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Joined {mentee.joinDate}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 pt-4 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Sessions Completed</span>
                              <motion.span
                                className="font-bold text-primary"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                              >
                                {mentee.sessionsCompleted}
                              </motion.span>
                            </div>
                          </div>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button className="w-full mt-4">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Session
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    <Award className="h-8 w-8 text-primary" />
                    Certificates & Credentials
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Professional certifications and qualifications
                  </p>
                </motion.div>

                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {mentorProfile.certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-all group">
                        <CardContent className="pt-6">
                          <div className="relative">
                            <motion.div
                              className="text-6xl mb-4 text-center"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {cert.image}
                            </motion.div>
                            {cert.verified && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                              >
                                <Badge className="absolute top-0 right-0 bg-green-600 text-white hover:bg-green-700">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              </motion.div>
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
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button size="sm" variant="outline" className="w-full">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Credential
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Q&A Tab */}
            {activeTab === 'qna' && (
              <motion.div
                key="qna"
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    Student Questions & Answers
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Manage questions from your mentees and provide expert answers
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    {
                      value: mentorProfile.qnas.filter(q => q.isAnswered).length,
                      label: 'Answered',
                      color: 'text-primary',
                      icon: CheckCircle2,
                    },
                    {
                      value: mentorProfile.qnas.filter(q => !q.isAnswered).length,
                      label: 'Pending',
                      color: 'text-orange-500',
                      icon: Clock,
                    },
                    {
                      value: mentorProfile.qnas.reduce((acc, q) => acc + q.likes, 0),
                      label: 'Total Likes',
                      color: 'text-green-600',
                      icon: ThumbsUp,
                    },
                  ].map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="border-2">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <motion.div
                              className="flex items-center justify-center mb-2"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </motion.div>
                            <motion.p
                              className={`text-3xl font-bold ${stat.color}`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1, type: 'spring' }}
                            >
                              {stat.value}
                            </motion.p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Questions List */}
                <motion.div
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {mentorProfile.qnas.map((qna, index) => (
                    <motion.div
                      key={qna.id}
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="border-2 hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          {/* Question Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <motion.span
                              className="text-3xl"
                              whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                              {qna.studentAvatar}
                            </motion.span>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <p className="font-semibold">{qna.studentName}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Asked {qna.askedDate}
                                  </p>
                                </div>
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <Badge
                                    className={
                                      qna.isAnswered
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-100'
                                    }
                                  >
                                    {qna.isAnswered ? 'Answered' : 'Pending'}
                                  </Badge>
                                </motion.div>
                              </div>
                              <p className="font-medium text-base mb-3">{qna.question}</p>
                            </div>
                          </div>

                          {/* Answer Section */}
                          <AnimatePresence mode="wait">
                            {qna.isAnswered ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-muted/50 rounded-lg p-4 mb-4 space-y-3"
                              >
                                <div>
                                  <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    Your Answer
                                  </p>
                                  <p className="text-sm text-foreground">{qna.answer}</p>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t">
                                  <p className="text-xs text-muted-foreground">
                                    Answered {qna.answeredDate}
                                  </p>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleLikeAnswer(qna.id)}
                                      className="text-xs"
                                    >
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      {qna.likes}
                                    </Button>
                                  </motion.div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 mb-4"
                              >
                                <Textarea
                                  placeholder="Type your answer here..."
                                  value={selectedQnaId === qna.id ? answerText : ''}
                                  onChange={(e) => {
                                    setAnswerText(e.target.value);
                                    setSelectedQnaId(qna.id);
                                  }}
                                  rows={3}
                                  className="text-sm transition-all focus:scale-[1.01]"
                                />
                                <div className="flex gap-2">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1"
                                  >
                                    <Button
                                      size="sm"
                                      onClick={() => handleAnswerQuestion(qna.id)}
                                      disabled={!answerText.trim() || selectedQnaId !== qna.id}
                                      className="w-full"
                                    >
                                      <Send className="h-3 w-3 mr-2" />
                                      Post Answer
                                    </Button>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setAnswerText('');
                                        setSelectedQnaId(null);
                                      }}
                                    >
                                      Clear
                                    </Button>
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Edit Dialogs - only render when mounted and editedProfile exists */}
      {editedProfile !== null && (
        <>
          {/* Edit Profile Dialog */}
          <Dialog open={editMode === 'profile'} onOpenChange={() => handleCancelEdit()}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your mentor profile information</DialogDescription>
              </DialogHeader>
              {editedProfile && (
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
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={editedProfile.title}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={editedProfile.yearsOfExperience}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            yearsOfExperience: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate">Hourly Rate ($)</Label>
                      <Input
                        id="rate"
                        type="number"
                        value={editedProfile.hourlyRate}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            hourlyRate: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
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
              )}
              <DialogFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </motion.div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Skills Dialog */}
          <Dialog open={editMode === 'skills'} onOpenChange={() => handleCancelEdit()}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Skills</DialogTitle>
                <DialogDescription>Add or remove your expertise areas</DialogDescription>
              </DialogHeader>
              {editedProfile && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Add New Skill</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="e.g., React, System Design..."
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
              )}
              <DialogFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </motion.div>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Social Links Dialog */}
          <Dialog open={editMode === 'socials'} onOpenChange={() => handleCancelEdit()}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Social Links</DialogTitle>
                <DialogDescription>Update your social media profiles</DialogDescription>
              </DialogHeader>
              {editedProfile && (
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
              )}
              <DialogFooter>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </motion.div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default MentorDashboardPage;