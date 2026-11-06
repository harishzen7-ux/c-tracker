import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { storageService } from './services/storageService';
import { AuthProvider, useAuth } from './services/AuthContext';
import { ProtectedRoute } from './services/ProtectedRoute';

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
);
const TopicPage = lazy(() =>
  import('./pages/TopicPage').then((module) => ({ default: module.TopicPage })),
);
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((module) => ({ default: module.LandingPage })),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })),
);
const SignupPage = lazy(() =>
  import('./pages/SignupPage').then((module) => ({ default: module.SignupPage })),
);
const WhereYouBeginPage = lazy(() =>
  import('./pages/WhereYouBeginPage').then((module) => ({ default: module.WhereYouBeginPage })),
);

const RouteLoading: React.FC = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-sm text-[var(--neu-text-muted)]">
    Loading...
  </div>
);

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
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage theme={theme} onThemeChange={handleThemeChange} />}
          />
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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar theme={theme} onThemeChange={handleThemeChange} />
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
                  <Navbar theme={theme} onThemeChange={handleThemeChange} />
                  <main className="flex-1">
                    <TopicPage />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
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
