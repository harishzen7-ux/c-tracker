import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { TopicPage } from './pages/TopicPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { WhereYouBeginPage } from './pages/WhereYouBeginPage';
import { storageService } from './services/storageService';
import { AuthProvider, useAuth } from './services/AuthContext';
import { ProtectedRoute } from './services/ProtectedRoute';

function MainApp() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => storageService.getTheme());
  const { currentUser, profile } = useAuth();

  // Initialize storage for current authenticated user
  useEffect(() => {
    const uid = currentUser?.uid || null;
    let active = true;
    void storageService.initForUser(uid).then(() => {
      if (!active) return;
      setTheme(storageService.getTheme());
      if (uid) storageService.recordLogin();
    });

    return () => {
      active = false;
    };
  }, [currentUser?.uid]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  const handleThemeChange = (nextTheme: 'dark' | 'light') => {
    if (nextTheme === theme) return;
    setTheme(nextTheme);
    storageService.setTheme(nextTheme);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--neu-base)] text-[var(--neu-text-primary)] transition-colors duration-200">
      <Routes>
        {/* PUBLIC ROUTE 1: Landing page */}
        <Route
          path="/"
          element={<LandingPage theme={theme} onThemeChange={handleThemeChange} />}
        />

        {/* PUBLIC ROUTES: Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/getting-started"
          element={
            <ProtectedRoute>
              <WhereYouBeginPage theme={theme} onThemeChange={handleThemeChange} />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED ROUTES: Dashboard & Topics */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  theme={theme}
                  onThemeChange={handleThemeChange}
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
                  onThemeChange={handleThemeChange}
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
