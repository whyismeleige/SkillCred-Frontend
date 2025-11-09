'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/theme-toggle';
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
  Rocket,
} from 'lucide-react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
      </motion.div>

      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.div
          className="bg-card/95 backdrop-blur-md border-2 border-border rounded-full shadow-lg px-6 py-3"
          whileHover={{ boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                SkillCred
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'features', 'testimonials', 'faq', 'blog', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === item
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              <Link href="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="rounded-full">
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden mt-4 pt-4 border-t border-border"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-2">
                  {['home', 'features', 'testimonials', 'faq', 'blog', 'contact'].map((item, index) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-4 py-2 rounded-full text-sm font-medium text-left ${
                        activeSection === item
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                  <Link href="/auth" className="mt-2">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button size="sm" className="w-full rounded-full">
                        Get Started
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          style={{ opacity, scale }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <span className="text-primary font-semibold text-sm flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Connect with Expert Mentors
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Grow Your Career with
            <motion.span
              className="text-primary block"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Expert Guidance
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Join thousands of professionals connecting with mentors who can help you
            achieve your goals and unlock your potential.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link href="/auth">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="rounded-full group">
                  Find Your Mentor
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => scrollToSection('features')}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 mx-auto text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose SkillCred?</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to accelerate your professional growth
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 hover:shadow-lg transition-all h-full">
                  <CardHeader>
                    <motion.div
                      className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg">
              Real stories from real people who transformed their careers
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 hover:shadow-lg transition-all h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Quote className="h-8 w-8 text-primary mb-4" />
                    </motion.div>
                    <CardDescription className="text-base">
                      {testimonial.quote}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {testimonial.name.charAt(0)}
                      </motion.div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Got questions? We've got answers
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      </motion.div>
                      {faq.question}
                    </CardTitle>
                    <CardDescription className="ml-7">{faq.answer}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-muted-foreground text-lg">
              Tips, insights, and stories to help you grow
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="border-2 hover:shadow-lg transition-all overflow-hidden h-full">
                  <motion.div
                    className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {post.icon}
                    </motion.div>
                  </motion.div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <button className="px-0 h-auto font-normal text-primary hover:text-primary/80 flex items-center">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              {[
                { icon: Mail, title: 'Email', description: 'support@skillcred.com' },
                { icon: Phone, title: 'Phone', description: '+91 00000 00000' },
                { icon: MapPin, title: 'Office', description: '123 Hyderabad, Telangana, India' },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-2 hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <contact.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <CardTitle className="text-lg">{contact.title}</CardTitle>
                          <CardDescription>{contact.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" className="transition-all focus:scale-[1.01]" />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="transition-all focus:scale-[1.01]" />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help..."
                        rows={4}
                        className="transition-all focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-xl text-foreground">SkillCred</span>
          </motion.div>
          <p className="mb-4">
            © 2025 SkillCred. All rights reserved. Built with ❤️ for growth.
          </p>
          <div className="flex justify-center space-x-6">
            {['Privacy', 'Terms', 'About'].map((item) => (
              <motion.button
                key={item}
                className="hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.footer>
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
    question: 'How does SkillCred work?',
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