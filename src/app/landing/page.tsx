'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Menu,
  X,
  Sparkles,
  Users,
  BookOpen,
  MessageSquare,
  Calendar,
  ArrowRight,
  CheckCircle,
  Quote,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'testimonials', 'faq', 'blog', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-card/95 backdrop-blur-md border-2 border-border rounded-full shadow-lg px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MentorHub</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'features', 'testimonials', 'faq', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === item
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <Link href="/auth">
                <Button size="sm" className="rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-2">
                {['home', 'features', 'testimonials', 'faq', 'blog', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-4 py-2 rounded-full text-sm font-medium text-left ${
                      activeSection === item
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
                <Link href="/auth" className="mt-2">
                  <Button size="sm" className="w-full rounded-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm">
              🚀 Connect with Expert Mentors
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Grow Your Career with
            <span className="text-primary"> Expert Guidance</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals connecting with mentors who can help you
            achieve your goals and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="rounded-full">
                Find Your Mentor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => scrollToSection('features')}
            >
              Learn More
            </Button>
          </div>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="h-8 w-8 mx-auto text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose MentorHub?</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to accelerate your professional growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">
              Real stories from real people who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <CardDescription className="text-base">
                    {testimonial.quote}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Got questions? We've got answers
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="ml-7">{faq.answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-muted-foreground text-lg">
              Tips, insights, and stories to help you grow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {post.icon}
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="px-0">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Email</CardTitle>
                      <CardDescription>support@mentorhub.com</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Phone</CardTitle>
                      <CardDescription>+1 (555) 123-4567</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Office</CardTitle>
                      <CardDescription>
                        123 Mentor Street, SF, CA 94102
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-foreground">MentorHub</span>
          </div>
          <p className="mb-4">
            © 2025 MentorHub. All rights reserved. Built with ❤️ for growth.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="hover:text-primary transition-colors">Privacy</button>
            <button className="hover:text-primary transition-colors">Terms</button>
            <button className="hover:text-primary transition-colors">About</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data
const features = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Expert Mentors',
    description: 'Connect with industry professionals who have walked the path you want to take.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Personalized Learning',
    description: 'Get customized guidance tailored to your unique goals and challenges.',
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: '1-on-1 Sessions',
    description: 'Book private sessions with mentors and get dedicated attention.',
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: 'Flexible Scheduling',
    description: 'Find mentors available when you are, with easy scheduling tools.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Progress Tracking',
    description: 'Monitor your growth and celebrate milestones along your journey.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: 'Community Support',
    description: 'Join a vibrant community of learners and mentors supporting each other.',
  },
];

const testimonials = [
  {
    quote: "MentorHub helped me land my dream job! My mentor's guidance was invaluable in preparing for interviews and negotiating my offer.",
    name: 'Sarah Johnson',
    role: 'Software Engineer',
  },
  {
    quote: 'As a mentor, I love giving back to the community. The platform makes it easy to connect with motivated learners.',
    name: 'Michael Chen',
    role: 'Senior Product Manager',
  },
  {
    quote: 'The personalized advice I received helped me transition careers successfully. I cannot recommend this enough!',
    name: 'Emily Davis',
    role: 'Data Scientist',
  },
];

const faqs = [
  {
    question: 'How does MentorHub work?',
    answer: 'Simply sign up, browse our mentor profiles, and book a session with someone who matches your goals. You can meet via video call at a time that works for both of you.',
  },
  {
    question: 'How much does it cost?',
    answer: 'We offer flexible pricing plans. Many mentors offer a free first session, and paid sessions typically range from $50-$200 per hour depending on the mentor\'s expertise.',
  },
  {
    question: 'Can I become a mentor?',
    answer: 'Absolutely! If you have professional experience and want to help others grow, you can apply to become a mentor. We review all applications to ensure quality.',
  },
  {
    question: 'What if I\'m not satisfied with my session?',
    answer: 'We offer a satisfaction guarantee. If you\'re not happy with your session, contact our support team within 24 hours and we\'ll work to make it right.',
  },
  {
    question: 'How do I prepare for my first session?',
    answer: 'Come with specific questions or goals. Review your mentor\'s profile beforehand, and be ready to share your background and what you hope to achieve.',
  },
];

const blogPosts = [
  {
    icon: <BookOpen className="h-16 w-16 text-primary" />,
    title: '5 Tips for Making the Most of Your Mentorship',
    excerpt: 'Learn how to maximize the value of every mentoring session and accelerate your growth.',
    date: 'Nov 5, 2025',
  },
  {
    icon: <Users className="h-16 w-16 text-primary" />,
    title: 'How to Choose the Right Mentor for Your Career',
    excerpt: 'A comprehensive guide to finding a mentor who aligns with your professional goals.',
    date: 'Nov 2, 2025',
  },
  {
    icon: <Sparkles className="h-16 w-16 text-primary" />,
    title: 'The Power of Reverse Mentoring',
    excerpt: 'Discover how junior professionals can provide valuable insights to senior leaders.',
    date: 'Oct 28, 2025',
  },
];

export default LandingPage;