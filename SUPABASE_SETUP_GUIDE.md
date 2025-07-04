# Guide d'installation et de configuration de Supabase

## 1. Créer un compte et un projet Supabase

1. Rendez-vous sur [supabase.com](https://supabase.com/) et créez un compte ou connectez-vous.
2. Cliquez sur "New Project" pour créer un nouveau projet.
3. Nommez votre projet et définissez un mot de passe pour la base de données.
4. Sélectionnez une région proche de votre localisation pour de meilleures performances.
5. Cliquez sur "Create new project" et attendez que le projet soit prêt.

## 2. Obtenir les identifiants Supabase

Une fois votre projet créé, vous aurez besoin de deux informations importantes :

1. Sur le tableau de bord Supabase, allez dans les paramètres du projet (cliquez sur l'icône d'engrenage).
2. Dans le menu latéral, cliquez sur "API".
3. Vous trouverez:
   - **URL du projet**: C'est votre `REACT_APP_SUPABASE_URL`
   - **clé anon/public**: C'est votre `REACT_APP_SUPABASE_ANON_KEY`

## 3. Configurer votre application

1. Dans la racine de votre projet, créez un fichier nommé `.env` (ou `.env.local`).
2. Ajoutez les lignes suivantes en remplaçant les valeurs par vos propres identifiants:

```
REACT_APP_SUPABASE_URL=votre_url_supabase_ici
REACT_APP_SUPABASE_ANON_KEY=votre_clé_anon_supabase_ici
```

3. Sauvegardez le fichier.
4. **Important**: Redémarrez votre serveur de développement pour que les variables d'environnement soient prises en compte.

## 4. Configurer l'authentification dans Supabase

1. Dans le tableau de bord Supabase, allez dans "Authentication" → "Settings".
2. Configurez les providers d'authentification que vous souhaitez utiliser:
   - Pour l'email/mot de passe, assurez-vous que "Email auth" est activé.
   - Vous pouvez activer ou désactiver la confirmation par email selon vos besoins.
3. Dans "URL Configuration", ajoutez l'URL de votre site dans les "Site URLs" (par exemple, `http://localhost:3000` pour le développement).

## 5. Exécuter le script SQL

1. Dans le tableau de bord Supabase, allez dans "SQL Editor".
2. Créez un nouveau script SQL.
3. Copiez-collez le contenu de votre fichier `dataBaseSchema.sql`.
4. Exécutez le script pour créer toutes les tables nécessaires.

## Problèmes courants et solutions

### 1. Erreur "Failed to fetch"
- Vérifiez que vos identifiants Supabase sont correctement configurés dans le fichier `.env`.
- Assurez-vous que votre serveur de développement a été redémarré après la modification du fichier `.env`.
- Vérifiez que vous n'avez pas de restrictions CORS dans Supabase.

### 2. Erreur "Auth session missing"
- Cette erreur est normale pour les utilisateurs non connectés, mais ne devrait pas bloquer l'inscription.
- Vérifiez que votre Site URL est correctement configuré dans les paramètres d'authentification Supabase.

### 3. Problèmes avec les RLS (Row Level Security) policies
- Assurez-vous que vos politiques de sécurité sont correctement configurées pour permettre l'insertion de données dans les tables.
- Vérifiez si des erreurs liées aux RLS apparaissent dans la console.

## Ressources utiles

- [Documentation Supabase sur l'authentification](https://supabase.com/docs/guides/auth)
- [Débuter avec Supabase et React](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Politiques de sécurité RLS](https://supabase.com/docs/guides/auth/row-level-security) 