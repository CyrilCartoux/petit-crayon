# Coloriage Magique 🎨

Transformez n'importe quelle image en coloriage à imprimer grâce à l'IA !

## Fonctionnalités

- Upload d'images (drag & drop ou sélection)
- Transformation en coloriage grâce à l'IA
- Téléchargement et impression des coloriages
- Interface utilisateur intuitive et colorée
- Animations et micro-interactions

## Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/coloriage-magique.git
cd coloriage-magique
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env.local` à la racine du projet et ajoutez votre clé API Replicate :
```
REPLICATE_API_TOKEN=votre_clé_api_replicate
```

4. Lancez l'application en mode développement :
```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Technologies utilisées

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Dropzone
- Replicate API
- Heroicons

## Structure du projet

```
src/
├── app/
│   ├── api/
│   │   └── convert/
│   │       └── route.ts
│   ├── editor/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT
