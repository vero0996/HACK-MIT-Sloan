// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage'; // Cambiamos a un solo componente de autenticación
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Recordings from './pages/Recording';
import Settings from './pages/Settings';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('User data from localStorage:', userData);
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (userData: any) => {
    setUser(userData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/authPage" 
            element={
              !user ? <AuthPage onLogin={updateUser} /> : <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/authPage" replace />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/authPage" replace />} 
          />
          <Route 
            path="/contacts" 
            element={user ? <Contacts /> : <Navigate to="/authPage" replace />} 
          />
          <Route 
            path="/recordings" 
            element={user ? <Recordings /> : <Navigate to="/authPage" replace />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings /> : <Navigate to="/authPage" replace />} 
          />
          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to={"/authPage"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;