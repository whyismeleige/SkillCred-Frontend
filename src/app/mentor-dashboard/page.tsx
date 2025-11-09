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

type TabType = 'overview' | 'mentees' | 'certificates' | 'reviews';
type EditMode = 'profile' | 'skills' | 'socials' | null;

const MentorDashboardPage = () => {
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

  const [mentorProfile, setMentorProfile] = useState<MentorProfile>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
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
      github: 'https://github.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
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
    stats: {
      totalMentees: 4,
      totalSessions: 63,
      responseTime: '< 2 hours',
      rating: 4.8,
    },
  });

  const [editedProfile, setEditedProfile] = useState(mentorProfile);

  const getAverageRating = () => {
    const sum = mentorProfile.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / mentorProfile.reviews.length).toFixed(1);
  };

  const handleOpenEdit = (mode: EditMode) => {
    setEditedProfile({ ...mentorProfile });
    setEditMode(mode);
  };

  const handleSaveEdit = () => {
    setMentorProfile(editedProfile);
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditedProfile(mentorProfile);
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
    setEditedProfile({
      ...editedProfile,
      avatar: '👤',
      avatarType: 'emoji',
    });
  };

  const renderAvatar = (profile: MentorProfile, size: 'small' | 'large' = 'large') => {
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
                { id: 'mentees', label: 'Mentees', icon: '👥' },
                { id: 'certificates', label: 'Certificates', icon: '🏆' },
                { id: 'reviews', label: 'Reviews', icon: '⭐' },
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
                    {renderAvatar(mentorProfile)}
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        {mentorProfile.name}
                      </h1>
                      <p className="text-lg text-primary font-semibold mb-3">
                        {mentorProfile.title}
                      </p>
                      <p className="text-muted-foreground mb-4 max-w-2xl">
                        {mentorProfile.bio}
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Experience</p>
                          <p className="text-2xl font-bold text-primary">
                            {mentorProfile.yearsOfExperience}+ yrs
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hourly Rate</p>
                          <p className="text-2xl font-bold text-primary">
                            ${mentorProfile.hourlyRate}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {mentorProfile.socialLinks.github && (
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
                        )}
                        {mentorProfile.socialLinks.linkedin && (
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
                      <Users className="h-8 w-8 text-primary" />
                      <span className="text-3xl font-bold">{mentorProfile.stats.totalMentees}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Active Mentees</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="h-8 w-8 text-green-600" />
                      <span className="text-3xl font-bold">{mentorProfile.stats.totalSessions}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <MessageSquare className="h-8 w-8 text-blue-600" />
                      <span className="text-lg font-bold">{mentorProfile.stats.responseTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                      <span className="text-3xl font-bold">{mentorProfile.stats.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
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
                        Expertise
                      </CardTitle>
                      <CardDescription>Technical skills and specializations</CardDescription>
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
                    {mentorProfile.skills.map((skill) => (
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
                {/* Recent Mentees */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Mentees</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mentorProfile.mentees.slice(0, 3).map((mentee) => (
                      <div
                        key={mentee.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{mentee.avatar}</span>
                          <div>
                            <p className="font-medium text-sm">{mentee.name}</p>
                            <p className="text-xs text-muted-foreground">Joined {mentee.joinDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{mentee.sessionsCompleted}</p>
                          <p className="text-xs text-muted-foreground">sessions</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Reviews */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mentorProfile.reviews.slice(0, 3).map((review) => (
                      <div
                        key={review.id}
                        className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{review.avatar}</span>
                            <div>
                              <p className="font-medium text-sm">{review.menteeeName}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Mentees Tab */}
          {activeTab === 'mentees' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Your Mentees</h2>
                <p className="text-muted-foreground mt-1">
                  All active mentoring relationships
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mentorProfile.mentees.map((mentee) => (
                  <Card key={mentee.id} className="border-2 hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-5xl">{mentee.avatar}</span>
                          <div>
                            <h3 className="font-semibold text-lg">{mentee.name}</h3>
                            <p className="text-sm text-muted-foreground">{mentee.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Joined {mentee.joinDate}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Sessions Completed</span>
                          <span className="font-bold text-primary">{mentee.sessionsCompleted}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Schedule Session</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">Certificates & Credentials</h2>
                <p className="text-muted-foreground mt-1">
                  Professional certifications and qualifications
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorProfile.certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className="border-2 hover:shadow-lg transition-all group"
                  >
                    <CardContent className="pt-6">
                      <div className="relative">
                        <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
                          {cert.image}
                        </div>
                        {cert.verified && (
                          <Badge className="absolute top-0 right-0 bg-green-600 text-white">
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
                      <Button size="sm" variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Credential
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Student Reviews</h2>
                  <p className="text-muted-foreground mt-1">
                    Feedback from your mentees
                  </p>
                </div>
                <Card className="border-2 px-6 py-3">
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-bold text-primary">{getAverageRating()}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(Number(getAverageRating()))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                {mentorProfile.reviews.map((review) => (
                  <Card key={review.id} className="border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">{review.avatar}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{review.menteeeName}</h3>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex gap-0.5 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
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
            <DialogDescription>Update your mentor profile information</DialogDescription>
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
                      yearsOfExperience: parseInt(e.target.value),
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
                      hourlyRate: parseInt(e.target.value),
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
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
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
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
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

export default MentorDashboardPage;
