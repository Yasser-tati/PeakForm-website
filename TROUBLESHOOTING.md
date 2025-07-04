# Guide de dépannage pour l'inscription Supabase

## Erreurs communes et solutions

### 1. Erreur "Failed to fetch"

Ce problème peut survenir lorsque:
- La connexion à Supabase ne peut pas être établie
- Les identifiants Supabase sont incorrects
- Des problèmes CORS empêchent la connexion

**Solutions:**

1. Vérifiez que les URL et clés Supabase dans `.env` sont correctes
2. Redémarrez votre serveur de développement après avoir modifié `.env`
3. Utilisez les outils de débogage dans la console du navigateur:
   ```js
   // Dans la console du navigateur
   supabaseDebugger.testConnection().then(console.log)
   ```

### 2. Erreur "Auth session missing!"

Cette erreur est normale pour les utilisateurs non connectés. Elle ne devrait pas bloquer l'inscription.

**Solutions:**
- Ignorez cette erreur si elle n'empêche pas l'inscription
- Vérifiez qu'il n'y a pas d'erreurs plus critiques dans la console

### 3. Erreur "permission denied for table user"

Si vous voyez "permission denied" lors de l'insertion dans la table "user", c'est un problème avec les politiques RLS (Row Level Security) de Supabase.

**Solutions:**

1. Exécutez le script SQL de politiques RLS dans l'éditeur SQL de Supabase:
   - Ouvrez `supabase-rls-policies.sql`
   - Copiez et exécutez le code dans l'éditeur SQL de Supabase

2. Vérifiez les politiques existantes:
   ```sql
   SELECT * FROM pg_policies WHERE schemaname = 'public';
   ```

3. Si nécessaire, supprimez et recréez les politiques:
   ```sql
   DROP POLICY IF EXISTS insert_own_user ON "user";
   CREATE POLICY insert_own_user ON "user" 
   FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

### 4. Utilisation des outils de débogage

Vous pouvez utiliser les outils de débogage intégrés dans la console du navigateur:

```js
// Test de connexion général
supabaseDebugger.testConnection()

// Vérification du schéma de la table utilisateur
supabaseDebugger.rawApi.getTableColumns('user')

// Vérification des politiques RLS
supabaseDebugger.checkRlsPolicies()
```

### 5. Problèmes avec la version de Supabase

Si vous utilisez une ancienne version de `@supabase/supabase-js`, certaines fonctionnalités peuvent ne pas fonctionner correctement.

**Solution:**
Mettez à jour la bibliothèque Supabase:
```bash
npm install @supabase/supabase-js@latest
```

### 6. Différence entre le schéma de votre table et les données insérées

Vérifiez que les noms et types de champs correspondent exactement à votre schéma Supabase.

Pour vérifier, exécutez dans la console:
```js
supabaseDebugger.rawApi.getTableColumns('user').then(console.log)
```

Assurez-vous que votre code d'insertion correspond exactement aux noms des colonnes de votre base de données.

## Diagnostics pas à pas

1. Ouvrez les outils de développement du navigateur (F12)
2. Allez dans l'onglet Console
3. Exécutez ces commandes pour diagnostiquer pas à pas:

```js
// 1. Test de connexion
await supabaseDebugger.testConnection()

// 2. Vérification du schéma
await supabaseDebugger.rawApi.getTableColumns('user')

// 3. Test de session
await supabaseDebugger.rawApi.getSession()

// 4. Test des politiques RLS
await supabaseDebugger.checkRlsPolicies()
```

Examinez les résultats pour identifier le problème spécifique.

## Besoin d'aide supplémentaire?

Si vous continuez à rencontrer des problèmes après avoir suivi ce guide, vérifiez:
1. Les journaux côté serveur dans Supabase (section "Logs" du tableau de bord)
2. Assurez-vous que votre projet Supabase est en ligne (pas en pause)
3. Vérifiez que vous n'avez pas atteint les limites de votre plan Supabase 