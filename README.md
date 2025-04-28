# Application de Coloriage

Une application web moderne permettant de colorier des images en utilisant l'IA, avec un système de crédits et de paiement.

## Fonctionnalités

- 🎨 Coloriage d'images en utilisant l'IA
- 🔐 Authentification avec Supabase
- 💳 Système de crédits avec paiement Stripe
- 🖨️ Impression des coloriages
- 📱 Interface responsive

## Prérequis

- Node.js 18+
- Compte Supabase
- Compte Stripe

## Configuration

1. Clonez le repository
2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role_supabase
OPENAI_API_KEY=votre_clé_openAI

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre_clé_publique_stripe
STRIPE_SECRET_KEY=votre_clé_secrète_stripe
STRIPE_WEBHOOK_SECRET=votre_secret_webhook_stripe
```

## Structure de la Base de Données

### Tables Supabase

1. `user_credits`
   - `user_id` (uuid, primary key)
   - `credits` (integer)

2. `credit_transactions`
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key)
   - `amount` (integer)
   - `type` (text)
   - `metadata` (jsonb)
   - `created_at` (timestamp)

## Déploiement

1. Configurez votre webhook Stripe :
   - URL : `https://votre-domaine.com/api/webhooks/stripe`
   - Événements à écouter : `checkout.session.completed`

2. Déployez sur Vercel :
```bash
vercel
```

## Développement

```bash
# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer les tests
npm run test
```

## Technologies Utilisées

- Next.js 14
- Supabase
- Stripe
- Tailwind CSS
- TypeScript

## Sécurité

- Toutes les routes API sont protégées
- Les clés d'API sont stockées de manière sécurisée
- Les webhooks Stripe sont vérifiés
- Les sessions utilisateur sont gérées par Supabase

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
