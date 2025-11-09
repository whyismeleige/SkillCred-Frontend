"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Github,
  Mail,
  Lock,
  User,
  GraduationCap,
  UserCircle,
  Sparkles,
} from "lucide-react";

const SignInForm: React.FC<{
  userType: "user" | "mentor";
  onUserTypeChange: (type: "user" | "mentor") => void;
}> = ({ userType, onUserTypeChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", { userType, email, password });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email
          </Label>
          <Select
            value={userType}
            onValueChange={(v) => onUserTypeChange(v as "user" | "mentor")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Student
                </div>
              </SelectItem>
              <SelectItem value="mentor">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Mentor
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          id="signin-email"
          type="email"
          placeholder="name@skillcred.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password" className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Password
          </Label>
          <Button
            variant="link"
            className="px-0 font-normal hover:text-primary transition-colors"
            type="button"
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="signin-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button type="submit" className="w-full relative overflow-hidden group">
          <span className="relative z-10 flex items-center justify-center gap-2">
            {userType === "mentor" ? (
              <GraduationCap className="h-4 w-4" />
            ) : (
              <UserCircle className="h-4 w-4" />
            )}
            Sign In as {userType === "mentor" ? "Mentor" : "Student"}
          </span>
          <motion.div
            className="absolute inset-0 bg-primary-foreground/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            className="w-full px-2 py-2 text-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="hidden sm:inline ml-1">Google</span>
          </Button>
        </motion.div>
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            className="w-full px-2 py-2 text-sm"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Github</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

const SignUpForm: React.FC<{
  userType: "user" | "mentor";
  onUserTypeChange: (type: "user" | "mentor") => void;
}> = ({ userType, onUserTypeChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Sign up:", { userType, ...formData });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.id.replace("signup-", "");
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Label htmlFor="signup-name" className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Full Name
        </Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="Skill Cred"
          value={formData.name}
          onChange={handleChange}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="signup-email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Email
          </Label>
          <Select
            value={userType}
            onValueChange={(v) => onUserTypeChange(v as "user" | "mentor")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Student
                </div>
              </SelectItem>
              <SelectItem value="mentor">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Mentor
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          id="signup-email"
          type="email"
          placeholder="name@skillcred.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Label htmlFor="signup-password" className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          Password
        </Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Label htmlFor="signup-confirmPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          Confirm Password
        </Label>
        <Input
          id="signup-confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="transition-all duration-200 focus:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button type="submit" className="w-full relative overflow-hidden group">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Create Account
          </span>
          <motion.div
            className="absolute inset-0 bg-primary-foreground/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-background text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            className="w-full px-2 py-2 text-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="hidden sm:inline ml-1">Google</span>
          </Button>
        </motion.div>
        <motion.div
          className="flex-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            className="w-full px-2 py-2 text-sm"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Github</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};

const AuthPage = () => {
  const [userType, setUserType] = useState<"user" | "mentor">("user");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Welcome
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center">
                {authMode === "signin" ? "Sign In" : "Sign Up"}
              </CardTitle>
              <CardDescription className="text-center text-xs sm:text-sm">
                {authMode === "signin"
                  ? `Enter your credentials to access your account`
                  : `Create a new account to get started`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={authMode}
                onValueChange={(v) => setAuthMode(v as "signin" | "signup")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin" className="text-xs sm:text-sm">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-xs sm:text-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="signin" key="signin">
                    <SignInForm userType={userType} onUserTypeChange={setUserType} />
                  </TabsContent>

                  <TabsContent value="signup" key="signup">
                    <SignUpForm userType={userType} onUserTypeChange={setUserType} />
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;