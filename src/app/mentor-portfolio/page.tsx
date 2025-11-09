'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, MapPin, Calendar, Clock, CheckCircle, Star } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Find and connect with expert mentors</p>
          </div>
          <Link href="/landing">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name, title, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Skill Filter */}
          <div className="space-y-3">
            <p className="text-sm font-semibold">Filter by Skill:</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedSkill === '' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedSkill('')}
              >
                All Skills
              </Badge>
              {allSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Found {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="border-2 hover:shadow-lg transition-all hover:border-primary overflow-hidden flex flex-col">
              {/* Header with Avatar */}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{mentor.image}</div>
                  {mentor.isVerified && (
                    <CheckCircle className="h-6 w-6 text-green-500 fill-green-500" />
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
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(mentor.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
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
                    {mentor.activeDays.map((day) => (
                      <span key={day} className="text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200 px-2 py-1 rounded">
                        {day.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Last Login */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last active: {mentor.lastLogin}</span>
                </div>
              </CardContent>

              {/* Footer Button */}
              <div className="px-6 pb-6 pt-2">
                <Link href={`/portfolio/${mentor.id}`}>
                  <Button className="w-full">
                    View Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No mentors found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PortfolioPage;
