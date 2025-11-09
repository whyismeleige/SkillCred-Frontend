'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Filter,
  Users,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

interface Mentor {
  id: number;
  name: string;
  title: string;
  image: string;
  skills: string[];
  isVerified: boolean;
  activeDays: string[];
  lastLogin: string;
  rating: number;
  reviews: number;
  bio: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    image: '👩‍💻',
    skills: ['React', 'Node.js', 'TypeScript', 'System Design'],
    isVerified: true,
    activeDays: ['Monday', 'Wednesday', 'Friday'],
    lastLogin: '2 hours ago',
    rating: 4.9,
    reviews: 127,
    bio: '10+ years in full-stack development. Specialize in helping junior devs level up.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Product Manager',
    image: '👨‍💼',
    skills: ['Product Strategy', 'User Research', 'Analytics', 'Leadership'],
    isVerified: true,
    activeDays: ['Tuesday', 'Thursday', 'Saturday'],
    lastLogin: '30 minutes ago',
    rating: 4.8,
    reviews: 98,
    bio: 'Led products at 3 startups. Now helping aspiring PMs break into the field.',
  },
  {
    id: 3,
    name: 'Emily Davis',
    title: 'Data Scientist',
    image: '👩‍🔬',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
    isVerified: true,
    activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    lastLogin: '5 hours ago',
    rating: 4.7,
    reviews: 85,
    bio: 'PhD in Statistics. Passionate about mentoring the next generation of data scientists.',
  },
  {
    id: 4,
    name: 'James Wilson',
    title: 'UX/UI Designer',
    image: '👨‍🎨',
    skills: ['Figma', 'User Experience', 'Web Design', 'Prototyping'],
    isVerified: false,
    activeDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
    lastLogin: '1 day ago',
    rating: 4.6,
    reviews: 62,
    bio: 'Award-winning designer with experience at top tech companies.',
  },
  {
    id: 5,
    name: 'Priya Patel',
    title: 'DevOps Engineer',
    image: '👩‍💻',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    isVerified: true,
    activeDays: ['Monday', 'Thursday', 'Friday', 'Sunday'],
    lastLogin: '3 hours ago',
    rating: 4.8,
    reviews: 74,
    bio: 'Specialized in cloud infrastructure and scaling systems.',
  },
  {
    id: 6,
    name: 'Alex Rodriguez',
    title: 'Marketing Manager',
    image: '👨‍💼',
    skills: ['Content Marketing', 'Growth Strategy', 'Social Media', 'Analytics'],
    isVerified: true,
    activeDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    lastLogin: '1 hour ago',
    rating: 4.7,
    reviews: 91,
    bio: 'Helped 5 startups achieve 7-figure ARR through strategic marketing.',
  },
];

const PortfolioPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const allSkills = Array.from(new Set(mentors.flatMap((m) => m.skills)));

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkill = !selectedSkill || mentor.skills.includes(selectedSkill);

    return matchesSearch && matchesSkill;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -100, 0],
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
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Users className="h-8 w-8 text-primary" />
              </motion.div>
              Mentor Portfolio
            </h1>
            <p className="text-muted-foreground">Find and connect with expert mentors</p>
          </motion.div>
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">← Back</Button>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Search and Filter Section */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Stats Banner */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: 'Total Mentors', value: mentors.length, icon: Users, color: 'text-blue-600' },
              { label: 'Verified', value: mentors.filter(m => m.isVerified).length, icon: CheckCircle, color: 'text-green-600' },
              { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
              { label: 'Active Now', value: mentors.filter(m => m.lastLogin.includes('hour')).length, icon: Zap, color: 'text-purple-600' },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-2 hover:shadow-md transition-all">
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

          {/* Search Bar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute left-3 top-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </motion.div>
            <Input
              placeholder="Search mentors by name, title, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-all focus:scale-[1.01]"
            />
          </motion.div>

          {/* Skill Filter */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm font-semibold flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              Filter by Skill:
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge
                  variant={selectedSkill === '' ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setSelectedSkill('')}
                >
                  All Skills
                </Badge>
              </motion.div>
              {allSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Badge
                    variant={selectedSkill === skill ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <TrendingUp className="h-4 w-4" />
            Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
          </motion.p>
        </motion.div>

        {/* Mentors Grid */}
        <AnimatePresence mode="wait">
          {filteredMentors.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key="mentors-grid"
            >
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  layout
                >
                  <Card className="border-2 hover:shadow-xl transition-all hover:border-primary overflow-hidden flex flex-col h-full">
                    {/* Header with Avatar */}
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          className="text-5xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {mentor.image}
                        </motion.div>
                        {mentor.isVerified && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1, type: 'spring' }}
                          >
                            <CheckCircle className="h-6 w-6 text-green-500 fill-green-500" />
                          </motion.div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{mentor.name}</CardTitle>
                      <CardDescription className="text-sm">{mentor.title}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-grow space-y-4">
                      {/* Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  i < Math.floor(mentor.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm font-semibold">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Active Days */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Active Days
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.activeDays.map((day, dayIndex) => (
                            <motion.span
                              key={day}
                              className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200 px-2 py-1 rounded"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + dayIndex * 0.03 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              {day.slice(0, 3)}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Last Login */}
                      <motion.div
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Clock className="h-3 w-3" />
                        <span>Last active: {mentor.lastLogin}</span>
                      </motion.div>
                    </CardContent>

                    {/* Footer Button */}
                    <div className="px-6 pb-6 pt-2">
                      <Link href={`/portfolio/${mentor.id}`}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full group relative overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center">
                              View Portfolio
                              <motion.div
                                className="ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowRight className="h-4 w-4" />
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
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key="empty-state"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Search className="h-16 w-16 text-muted-foreground" />
              </motion.div>
              <p className="text-lg text-muted-foreground mb-4">
                No mentors found matching your criteria.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSkill('');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PortfolioPage;