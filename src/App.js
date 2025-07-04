import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./Pages/home";
import Condition from "./Pages/condition";
import Politique from "./Pages/politique";
import Aide from "./Pages/aide";
import Contact from "./Pages/contact";
import FAQ from "./Pages/faq";
import Guide from "./Pages/guide";
import Inscription from "./components/inscription/inscription";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuth } from './context/AuthContext';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from './components/common/LoadingSpinner';
// Import debugger for development purposes
import './utils/supabaseDebugger';
// Import connection checker
import checkSupabaseConnection from './utils/connectionChecker';
// Import connection test page
import ConnectionTest from './Pages/ConnectionTest';
import ConnectionFix from './Pages/ConnectionFix';
import TranslationExample from './components/TranslationExample';
import AdminLogin from './Pages/admin/admin';
import AdminDashboard from './Pages/admin/dashboard';
import ClientsPage from './Pages/admin/client/clients';
import ClientDetail from './Pages/admin/client/client-detail';
import CoachesPage from './Pages/admin/coaches/coaches';
import CoachDetail from './Pages/admin/coaches/coach-detail';
import PlansPage from './Pages/admin/plans/plan';
import PlanDetailPage from './Pages/admin/plans/plan-detail';
import Shop from './Pages/admin/shop/shop';
import SupportPage from './Pages/admin/support/support';

// A simple unauthorized page
const Unauthorized = () => {
  const { t } = useTranslation();
  
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>{t('unauthorized.title', 'Accès non autorisé')}</h1>
      <p>{t('unauthorized.message', 'Vous n\'avez pas les autorisations nécessaires pour accéder à cette page.')}</p>
      <a href="/" style={{ color: '#6a5acd', textDecoration: 'none', fontWeight: 'bold' }}>
        {t('unauthorized.backHome', 'Retour à l\'accueil')}
      </a>
    </div>
  );
};

// Enhanced error display component with diagnostics
const AuthError = ({ message }) => {
  const { t } = useTranslation();
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [isRunningCheck, setIsRunningCheck] = useState(false);

  const runDiagnostics = async () => {
    setIsRunningCheck(true);
    try {
      const result = await checkSupabaseConnection();
      setDiagnosticResult(result);
    } catch (err) {
      setDiagnosticResult({
        success: false,
        error: `Failed to run diagnostics: ${err.message}`
      });
    } finally {
      setIsRunningCheck(false);
    }
  };

  useEffect(() => {
    // Auto-run diagnostics if the error mentions connection
    if (message && (message.includes('fetch') || message.includes('connect'))) {
      runDiagnostics();
    }
  }, [message]);

  return (
    <div style={{ 
      padding: '100px 20px', 
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#ff4949' }}>{t('authError.title', 'Erreur d\'authentification')}</h1>
      <p style={{ marginBottom: '20px' }}>{message}</p>
      
      {!diagnosticResult && !isRunningCheck && (
        <button 
          onClick={runDiagnostics}
          style={{
            background: '#6a5acd',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            margin: '15px 0'
          }}
        >
          {t('authError.runDiagnostics', 'Exécuter les diagnostics de connexion')}
        </button>
      )}
      
      {isRunningCheck && <LoadingSpinner />}
      
      {diagnosticResult && (
        <div style={{ 
          background: diagnosticResult.success ? '#e6ffe6' : '#fff0f0',
          border: `1px solid ${diagnosticResult.success ? '#99cc99' : '#ffcccc'}`,
          borderRadius: '4px',
          padding: '15px',
          margin: '15px 0',
          textAlign: 'left'
        }}>
          <h3>{diagnosticResult.success ? t('authError.connectionSuccess', '✅ Connexion réussie') : t('authError.problemDetected', '❌ Problème détecté')}</h3>
          {diagnosticResult.error && <p><strong>{t('authError.error', 'Erreur')}:</strong> {diagnosticResult.error}</p>}
          {diagnosticResult.fix && <p><strong>{t('authError.solution', 'Solution')}:</strong> {diagnosticResult.fix}</p>}
          {diagnosticResult.details && (
            <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
              {diagnosticResult.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      <p>
        {t('authError.checkCredentials', 'Veuillez vérifier vos informations d\'identification Supabase dans votre fichier .env ou contacter l\'administrateur du site.')}
      </p>
      <div style={{ marginTop: '30px' }}>
        <a href="/" style={{ color: '#6a5acd', textDecoration: 'none', fontWeight: 'bold' }}>
          {t('authError.backHome', 'Retour à l\'accueil')}
        </a>
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated, loading, authError } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (authError) {
    return <AuthError message={authError} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/politique" element={<Politique />} />
          <Route path="/aide" element={<Aide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/i18n-example" element={<TranslationExample />} />
          <Route path="/peakform-admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<ClientsPage />} />
          <Route path="/admin/client-details/:id" element={<ClientDetail />} />
          <Route path="/admin/coaches" element={<CoachesPage />} />
          <Route path="/admin/coach-detail/:id" element={<CoachDetail />} />
          <Route path="/admin/plans" element={<PlansPage />} />
          <Route path="/admin/plans/:planId" element={<PlanDetailPage />} />
          <Route path="/admin/shop" element={<Shop />} />
          <Route path="/admin/support" element={<SupportPage />} />
          
          {/* Diagnostic page */}
          <Route path="/connection-test" element={<ConnectionTest />} />
          <Route path="/fix-connection" element={<ConnectionFix />} />
          
          {/* Authentication routes */}
          <Route 
            path="/inscription" 
            element={isAuthenticated ? <Navigate to="/profile" /> : <Inscription />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} 
          />
          
          {/* Protected routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Coach-specific routes (can add more later) */}
          <Route 
            path="/coach-dashboard" 
            element={
              <ProtectedRoute requiresCoach={true}>
                <div>Coach Dashboard (to be implemented)</div>
              </ProtectedRoute>
            } 
          />
          
          {/* Unauthorized access page */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;