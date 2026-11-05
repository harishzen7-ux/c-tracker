import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { TopicPage } from './pages/TopicPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { storageService } from './services/storageService';
import { AuthProvider, useAuth } from './services/AuthContext';
import { ProtectedRoute } from './services/ProtectedRoute';

function MainApp() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => storageService.getTheme());
  const [streak, setStreak] = useState<number>(() => storageService.getStreak());
  const { currentUser, profile } = useAuth();

  // Initialize storage for current authenticated user
  useEffect(() => {
    storageService.initForUser(currentUser?.uid || null).then(() => {
      setStreak(storageService.getStreak());
    });

    const unsubscribe = storageService.subscribe(() => {
      setStreak(storageService.getStreak());
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    storageService.setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--neu-base)] text-[var(--neu-text-primary)] transition-colors duration-200">
      <Routes>
        {/* PUBLIC ROUTE 1: Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* PUBLIC ROUTE 2 & 3: Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* PROTECTED ROUTES: Dashboard & Topics */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  theme={theme}
                  onThemeToggle={handleThemeToggle}
                  streak={streak}
                />
                <main className="flex-1">
                  <DashboardPage />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/topic/:topicId"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  theme={theme}
                  onThemeToggle={handleThemeToggle}
                  streak={streak}
                />
                <main className="flex-1">
                  <TopicPage />
                </main>
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </AuthProvider>
  );
}
