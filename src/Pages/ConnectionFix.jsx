import React from 'react';
import { Link } from 'react-router-dom';

const ConnectionFix = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#6a5acd', marginBottom: '30px', textAlign: 'center' }}>
        Résoudre l'erreur "Failed to fetch"
      </h1>
      
      <div style={{ 
        background: '#f9f9f9', 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
          L'erreur <code style={{ background: '#f0f0f0', padding: '3px 6px', borderRadius: '4px' }}>Failed to fetch</code> 
          se produit lorsque votre application ne peut pas communiquer avec le serveur Supabase. 
          Voici un guide étape par étape pour résoudre ce problème.
        </p>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '20px' }}>1. Vérifiez votre fichier .env</h2>
        
        <div style={{ 
          background: 'white', 
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Étapes:</h3>
          
          <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Créez un fichier <code>.env</code> à la racine de votre projet s'il n'existe pas déjà</li>
            <li>Ajoutez les lignes suivantes (remplacez par vos vraies valeurs Supabase):</li>
          </ol>
          
          <pre style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            marginTop: '15px'
          }}>
{`REACT_APP_SUPABASE_URL=https://votre-projet.supabase.co
REACT_APP_SUPABASE_ANON_KEY=votre-clé-anon`}
          </pre>
          
          <p style={{ marginTop: '15px' }}>
            <strong>Important:</strong> Après avoir modifié le fichier <code>.env</code>, vous devez redémarrer votre serveur de développement.
          </p>
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '20px' }}>2. Vérifiez les paramètres CORS dans Supabase</h2>
        
        <div style={{ 
          background: 'white', 
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Étapes:</h3>
          
          <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Connectez-vous à votre dashboard Supabase</li>
            <li>Dans le menu de gauche, allez à <strong>Authentication</strong> → <strong>URL Configuration</strong></li>
            <li>Dans la section "Site URL", assurez-vous que votre URL de développement est présente</li>
            <li>Si vous développez en local, ajoutez <code>http://localhost:3000</code> (ou votre port local)</li>
            <li>Si nécessaire, ajoutez également votre URL de production</li>
            <li>Cliquez sur <strong>Save</strong></li>
          </ol>
          
          <div style={{ 
            background: '#fffbea', 
            border: '1px solid #ffe58f',
            borderRadius: '4px',
            padding: '15px',
            marginTop: '15px'
          }}>
            <p><strong>Note:</strong> Les changements CORS peuvent prendre quelques minutes pour se propager.</p>
          </div>
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '20px' }}>3. Vérifiez votre connexion Internet</h2>
        
        <div style={{ 
          background: 'white', 
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <p style={{ marginBottom: '15px' }}>Assurez-vous que:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Votre connexion Internet fonctionne correctement</li>
            <li>Vous pouvez accéder à d'autres sites web</li>
            <li>Vous pouvez accéder à <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6a5acd' }}>supabase.com</a></li>
            <li>Aucun pare-feu ou proxy ne bloque les connexions à Supabase</li>
            <li>Si vous utilisez un VPN, essayez de le désactiver temporairement</li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '20px' }}>4. Vérifiez l'état du service Supabase</h2>
        
        <div style={{ 
          background: 'white', 
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <p style={{ marginBottom: '15px' }}>Parfois, le problème peut être du côté de Supabase:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Consultez <a href="https://status.supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6a5acd' }}>status.supabase.com</a> pour vérifier l'état du service</li>
            <li>Vérifiez si votre projet est en pause (les projets gratuits se mettent en pause après une période d'inactivité)</li>
            <li>Assurez-vous que vous n'avez pas dépassé les limites de votre plan</li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '20px' }}>5. Désactivez les extensions de navigateur</h2>
        
        <div style={{ 
          background: 'white', 
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <p style={{ marginBottom: '15px' }}>Certaines extensions de navigateur peuvent interférer avec les requêtes réseau:</p>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Désactivez temporairement les bloqueurs de publicités (comme uBlock Origin, AdBlock)</li>
            <li>Désactivez les extensions de confidentialité (Privacy Badger, etc.)</li>
            <li>Essayez une fenêtre de navigation privée/incognito</li>
          </ul>
        </div>
      </div>
      
      <div style={{ background: '#f0f0ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#6a5acd', marginBottom: '15px' }}>Toujours des problèmes?</h2>
        <p style={{ marginBottom: '10px' }}>Si vous avez suivi toutes ces étapes et que vous rencontrez toujours des problèmes:</p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Utilisez l'outil de diagnostic pour obtenir plus d'informations: <Link to="/connection-test" style={{ color: '#6a5acd' }}>Test de connexion</Link></li>
          <li>Vérifiez les logs de la console de votre navigateur (F12 → Console) pour des messages d'erreur plus détaillés</li>
          <li>Consultez la <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: '#6a5acd' }}>documentation Supabase</a> pour des informations supplémentaires</li>
        </ul>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <Link to="/" style={{ 
          display: 'inline-block',
          background: '#6a5acd',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default ConnectionFix; 