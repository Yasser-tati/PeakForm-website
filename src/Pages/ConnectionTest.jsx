import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import checkSupabaseConnection from '../utils/connectionChecker';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ConnectionTest = () => {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [envVariables, setEnvVariables] = useState({
    supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
    hasAnonKey: !!process.env.REACT_APP_SUPABASE_ANON_KEY
  });

  useEffect(() => {
    runTests();
  }, []);

  const runTests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await checkSupabaseConnection();
      setTestResults(results);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue pendant le test');
      console.error('Test error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#6a5acd',
        marginBottom: '30px'
      }}>
        Test de Connexion Supabase
      </h1>

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>
          Configuration de l'environnement
        </h2>
        
        <div style={{ marginBottom: '15px' }}>
          <p><strong>REACT_APP_SUPABASE_URL:</strong> {
            envVariables.supabaseUrl 
              ? envVariables.supabaseUrl.substring(0, 15) + '...' 
              : <span style={{ color: 'red' }}>Non défini</span>
          }</p>
          <p><strong>REACT_APP_SUPABASE_ANON_KEY:</strong> {
            envVariables.hasAnonKey 
              ? <span style={{ color: 'green' }}>Défini</span> 
              : <span style={{ color: 'red' }}>Non défini</span>
          }</p>
        </div>
        
        <button
          onClick={runTests}
          style={{
            background: '#6a5acd',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Test en cours...' : 'Exécuter le test de connexion'}
        </button>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '15px' }}>Test de connexion en cours...</p>
        </div>
      )}

      {error && (
        <div style={{
          background: '#fff0f0',
          border: '1px solid #ffcccc',
          borderRadius: '4px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#d9534f', marginBottom: '10px' }}>Erreur lors du test</h3>
          <p>{error}</p>
        </div>
      )}

      {testResults && !isLoading && (
        <div style={{
          background: testResults.success ? '#e6ffe6' : '#fff0f0',
          border: `1px solid ${testResults.success ? '#99cc99' : '#ffcccc'}`,
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            color: testResults.success ? '#4CAF50' : '#d9534f',
            marginBottom: '15px' 
          }}>
            {testResults.success ? '✅ Connexion réussie' : '❌ Problème détecté'}
          </h2>
          
          {testResults.message && (
            <p style={{ fontSize: '1.1rem', marginBottom: '15px' }}>{testResults.message}</p>
          )}
          
          {testResults.error && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Problème:</h3>
              <p style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
                {testResults.error}
              </p>
              {testResults.error.includes('Failed to fetch') && (
                <p style={{ marginTop: '10px' }}>
                  <Link to="/fix-connection" style={{ 
                    color: '#6a5acd', 
                    fontWeight: 'bold' 
                  }}>
                    Guide spécifique pour résoudre "Failed to fetch" →
                  </Link>
                </p>
              )}
            </div>
          )}
          
          {testResults.fix && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Solution suggérée:</h3>
              <p style={{ 
                padding: '10px', 
                background: '#f8f9fa', 
                borderRadius: '4px',
                fontWeight: testResults.success ? 'normal' : 'bold' 
              }}>
                {testResults.fix}
              </p>
            </div>
          )}
          
          {testResults.details && (
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Détails:</h3>
              <ul style={{ 
                listStyleType: 'none', 
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '4px'
              }}>
                {testResults.details.map((detail, index) => (
                  <li key={index} style={{ 
                    padding: '8px 0',
                    borderBottom: index < testResults.details.length - 1 ? '1px solid #eee' : 'none' 
                  }}>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ 
        background: '#f0f0ff', 
        border: '1px solid #d8d8ff',
        borderRadius: '8px',
        padding: '20px' 
      }}>
        <h3 style={{ marginBottom: '15px' }}>Guide de résolution</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ fontSize: '1.1rem', color: '#6a5acd' }}>1. Vérifiez votre fichier .env</h4>
          <p>Assurez-vous que votre fichier .env à la racine du projet contient:</p>
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`REACT_APP_SUPABASE_URL=https://votre-projet.supabase.co
REACT_APP_SUPABASE_ANON_KEY=votre-clé-anon`}
          </pre>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ fontSize: '1.1rem', color: '#6a5acd' }}>2. Redémarrez votre serveur</h4>
          <p>Après avoir modifié le fichier .env, redémarrez votre serveur de développement.</p>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ fontSize: '1.1rem', color: '#6a5acd' }}>3. Vérifiez les paramètres CORS</h4>
          <p>Dans votre dashboard Supabase, allez dans Authentication &gt; URL Configuration et ajoutez votre URL de développement (ex: http://localhost:3000).</p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', color: '#6a5acd' }}>4. Vérifiez l'état du service Supabase</h4>
          <p>Consultez <a href="https://status.supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6a5acd' }}>status.supabase.com</a> pour voir si le service rencontre des problèmes.</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/" style={{ 
          color: '#6a5acd', 
          textDecoration: 'none', 
          fontWeight: 'bold' 
        }}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ConnectionTest; 