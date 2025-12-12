# 🎨 Roadmap - Background Remover App

## Avec React Router v7 comme Framework

---

## Structure du Projet (React Router v7 Framework)

```
bg-remover/
├── src/
│   ├── routes/
│   │   ├── __root.tsx                 (Layout racine - Header, Footer, Outlet)
│   │   ├── index.tsx                  (Landing page - GET /)
│   │   ├── editor.tsx                 (Editor page - GET /editor)
│   │   ├── error.tsx                  (Error boundary)
│   │   └── api/
│   │       ├── remove-background.ts   (POST /api/remove-background)
│   │       ├── health.ts              (GET /api/health)
│   ├── components/
│   │   ├── DragDropZone.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageHistory.tsx
│   │   ├── ComparisonSlider.tsx
│   │   ├── ExportOptions.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Toast.tsx
│   │   └── FeatureCard.tsx
│   ├── hooks/
│   │   └── useImageStorage.ts
│   ├── services/
│   │   ├── backgroundRemover.ts
│   │   ├── fileDownload.ts
│   │   └── analytics.ts
│   ├── types/
│   │   └── index.ts
│   ├── index.css
│   └── main.tsx                       (Bootstrap de l'app)
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── vite.config.ts
└── router.ts                          (Définition des routes)
```

---

## Phase 1: Setup & Infrastructure

### 1.1 - `feature/project-setup`

**Objectif** : Initialiser le projet avec React Router v7 comme framework

- [x] Créer le projet Vite + React 19 + TypeScript
- [x] Installer React Router v7 (`react-router`)
- [x] Installer et configurer Tailwind CSS
- [x] Installer dépendances dev (prettier, eslint optionnel)
- [x] Créer la structure des dossiers (routes/, components/, services/, types/, hooks/, context/)
- [x] Configurer tsconfig.json (mode strict)
- [x] Créer .gitignore approprié
- [x] Initialiser dépôt Git

**Spécificités RRv7:**

- [x] Installer `@remix-run/router` si nécessaire
- [x] Configurer vite pour RRv7 (ajouter plugin si nécessaire)
- [x] Vérifier la version minimale de React Router v7

**Fichiers à créer/modifier:**

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js`
- `src/index.css`
- Structure des dossiers
- `.gitignore`

---

### 1.2 - `feature/routing-setup`

**Objectif** : Configurer React Router v7 comme framework

- [ ] Créer `router.ts` avec `createBrowserRouter`
- [ ] Définir les routes principales :
  - `GET /` → `index.tsx` (landing)
  - `GET /editor` → `editor.tsx` (app)
  - `*` → `notfound.tsx` (404)
- [ ] Créer `__root.tsx` (layout racine avec `Outlet`)
- [ ] Configurer error boundary (`error.tsx`)
- [ ] Configurer `main.tsx` pour boostrap avec `RouterProvider`
- [ ] Créer composant Header/Navigation (shareable via `__root.tsx`)
- [ ] Créer composant Footer (shareable via `__root.tsx`)
- [ ] Ajouter transitions/animations entre routes

**Fichiers à créer/modifier:**

- `src/router.ts`
- `src/main.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx` (placeholder)
- `src/routes/editor.tsx` (placeholder)
- `src/routes/error.tsx`
- `src/routes/notfound.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

---

### 1.3 - `feature/api-routes-setup`

**Objectif** : Créer structure des routes API avec RRv7

- [ ] Créer dossier `src/routes/api/`
- [ ] Route `GET /api/health` → test de santé du serveur
- [ ] Route `POST /api/remove-background` → stub/mock (retourne JSON de test)
- [ ] Route `GET /api/status` (optionnel) → infos serveur
- [ ] Configurer actions pour accepter FormData (multipart)
- [ ] Response JSON standardisée pour toutes les routes
- [ ] Error handling avec codes HTTP appropriés
- [ ] Configurer CORS headers si nécessaire
- [ ] Logger les requêtes en dev

**Spécificités RRv7:**

- [ ] Utiliser `action` handler sur les routes
- [ ] Accepter `Request` et retourner `Response`
- [ ] Gérer multipart/form-data avec API standard
- [ ] Validation des requêtes

**Fichiers à créer/modifier:**

- `src/routes/api/health.ts` (GET /api/health)
- `src/routes/api/remove-background.ts` (POST /api/remove-background - stub)
- `src/routes/api/status.ts` (GET /api/status optionnel)
- `src/router.ts` (enregistrer routes API)
- `src/routes/api/utils.ts` (helpers : response formatter, error handler)

---

## Phase 2: Frontend - Landing Page

### 2.1 - `feature/landing-page-hero`

**Objectif** : Créer la section hero attractive

- [ ] Implémenter Hero section dans `routes/index.tsx`
- [ ] Titre, sous-titre, description du service
- [ ] Image/illustration de démonstration (ou mockup)
- [ ] Bouton CTA "Commencer" qui navigue vers `/editor` (utiliser `Link` de RRv7)
- [ ] Styling Tailwind responsive (mobile-first)
- [ ] Animation subtle Tailwind (fade, slide)
- [ ] Intégrer avec layout racine (`Outlet`)

**Fichiers à créer/modifier:**

- `src/routes/index.tsx`
- Optionnel: `src/index.css` pour animations custom

---

### 2.2 - `feature/landing-page-features`

**Objectif** : Ajouter section des features/avantages

- [ ] Créer composant `FeatureCard.tsx`
- [ ] Section avec 3-4 features principales dans `routes/index.tsx`
- [ ] Icônes + descriptions pour chaque feature
- [ ] Layout en grille responsive
- [ ] Design cohérent avec Hero

**Fichiers à créer/modifier:**

- `src/routes/index.tsx` (compléter)
- `src/components/FeatureCard.tsx`

---

### 2.3 - `feature/landing-page-footer`

**Objectif** : Footer réutilisable dans toutes les pages

- [ ] Implémenter Footer dans `components/Footer.tsx`
- [ ] Liens (privacy, terms, contact, etc.)
- [ ] Liens réseaux sociaux (optionnel)
- [ ] Copyright avec année dynamique
- [ ] Responsive et cohérent
- [ ] Importé dans `__root.tsx` pour être visible partout

**Fichiers à créer/modifier:**

- `src/components/Footer.tsx`
- `src/routes/__root.tsx` (intégrer Footer)

---

## Phase 3: Frontend - Editor Page

### 3.1 - `feature/drag-drop-zone`

**Objectif** : Créer zone de drag & drop pour images

- [ ] Composant `DragDropZone.tsx` avec TypeScript strict
- [ ] Support drag & drop natif
- [ ] Support clic pour sélectionner fichier (input hidden)
- [ ] Validation des fichiers (images seulement, taille max)
- [ ] Messages d'erreur clairs
- [ ] Styling Tailwind attractive
- [ ] États visuels (hover, active, error, disabled)

**Fichiers à créer/modifier:**

- `src/components/DragDropZone.tsx`
- `src/types/index.ts` (types Image, ImageData, etc.)
- `src/routes/editor.tsx` (intégrer le composant)

---

### 3.2 - `feature/image-preview`

**Objectif** : Afficher aperçu de l'image uploadée

- [ ] Composant `ImagePreview.tsx`
- [ ] Layout : image original + image traitée (side-by-side responsive)
- [ ] Boutons actions (télécharger, réinitialiser, nouvel upload, etc.)
- [ ] Loading states
- [ ] Error states avec retry
- [ ] Success states
- [ ] Responsive design (stacked sur mobile)

**Fichiers à créer/modifier:**

- `src/components/ImagePreview.tsx`
- `src/routes/editor.tsx` (layout général)
- `src/types/index.ts` (ajouter types ProcessingState)

---

### 3.3 - `feature/editor-layout`

**Objectif** : Créer layout complet de la page éditeur

- [ ] Intégrer `DragDropZone` + `ImagePreview` dans `routes/editor.tsx`
- [ ] Layout responsif (mobile : vertical, desktop : grid/flex)
- [ ] États de l'app :
  - Initial (drop zone vide)
  - Processing (spinner, disabled UI)
  - Done (image traitée affichée)
  - Error (message + retry)
- [ ] Utiliser Context ou State lifting pour gérer états
- [ ] Styling cohérent avec landing
- [ ] Intégration avec layout racine

**Fichiers à créer/modifier:**

- `src/routes/editor.tsx` (complet)
- Optionnel: `src/components/ProcessingSpinner.tsx`

---

## Phase 4: State Management & Storage

### 4.1 - `feature/localstorage-hook`

**Objectif** : Créer hook personnalisé pour gérer le localStorage

- [ ] Hook `useImageStorage` avec TypeScript
- [ ] Fonctions :
  - `saveImage(image: ImageData)` → id
  - `getImage(id: string)` → ImageData
  - `deleteImage(id: string)` → boolean
  - `getAllImages()` → ImageData[]
  - `getLatestImage()` → ImageData | null
- [ ] Gestion limites localStorage (~5MB)
- [ ] Compression/optimisation images base64
- [ ] Gestion erreurs (quota exceeded, corruption, etc.)
- [ ] Tests locaux du hook

**Fichiers à créer/modifier:**

- `src/hooks/useImageStorage.ts`
- `src/types/index.ts` (types ImageData, Storage)

---

### 4.2 - `feature/image-state-management`

**Objectif** : Gérer state des images dans l'app

- [ ] State dans `routes/editor.tsx` :
  - `currentImage` (image upload)
  - `processedImage` (image sans fond)
  - `isProcessing` (boolean)
  - `error` (string | null)
- [ ] Optionnel: Context `ImageContext` si besoin de partager entre routes
- [ ] Sauvegarder automatiquement dans localStorage après traitement
- [ ] Charger dernière image au chargement de la page (ou optionnel)
- [ ] Clear images avec action utilisateur

**Fichiers à créer/modifier:**

- `src/routes/editor.tsx` (ajouter states)
- Optionnel: `src/context/ImageContext.tsx`

---

## Phase 5: API Routes Implementation

### 5.1 - `feature/api-remove-background-integration`

**Objectif** : Intégrer service de suppression du fond dans route API

**Choisir Option A ou B :**

**Option A - API remove.bg (cloud, facile)**

- [ ] Installer axios ou fetch pour appels HTTP
- [ ] Route handler `POST /api/remove-background` :
  - Récupère image du FormData
  - Envoie à remove.bg API
  - Retourne image en base64 PNG
- [ ] Gestion erreurs :
  - 400 si pas d'image
  - 413 si trop gros
  - 429 si quota dépassé (remove.bg)
  - 500 si erreur serveur
- [ ] Response JSON : `{ success: boolean, imageBase64?: string, error?: string }`
- [ ] Types TypeScript pour responses

**Option B - rembg local (Python subprocess, gratuit)**

- [ ] Installer rembg (`pip install rembg`)
- [ ] Créer endpoint qui :
  - Reçoit image
  - Lance rembg en subprocess
  - Retourne PNG sans fond
- [ ] Plus complexe mais gratuit et illimité
- [ ] Potentiellement plus lent

**Fichiers à créer/modifier:**

- `src/routes/api/remove-background.ts` (compléter logique réelle)
- `src/types/index.ts` (types API responses)
- `.env.example` (ajouter REMOVE_BG_API_KEY si option A)
- `.env` (ne pas committer)

---

### 5.2 - `feature/api-file-handling`

**Objectif** : Gestion robuste des uploads dans les routes API

- [ ] Validation stricte des fichiers :
  - Type MIME image seulement (image/png, jpeg, webp)
  - Taille max 10MB
  - Dimensions min/max (optionnel)
- [ ] Erreurs appropriées :
  - 400 si format invalide + message clair
  - 413 si fichier trop gros + limite affichée
  - 422 si image invalide/corrompue
- [ ] Logs détaillés pour debug
- [ ] Tests locaux avec Postman/curl

**Fichiers à créer/modifier:**

- `src/routes/api/utils.ts` (helpers validation)
- `src/routes/api/remove-background.ts` (intégrer validation)
- Tests manuels

---

### 5.3 - `feature/api-error-handling`

**Objectif** : Standardiser gestion des erreurs API

- [ ] Créer classe `ApiError` customisée
- [ ] Middleware error handler global
- [ ] Tous les endpoints retournent format standard :
  ```json
  {
    "success": true/false,
    "data": {...},
    "error": { "code": "ERROR_CODE", "message": "..." }
  }
  ```
- [ ] Logging centralisé
- [ ] Proper HTTP status codes

**Fichiers à créer/modifier:**

- `src/routes/api/utils.ts` (ajouter error handler, response formatter)
- `src/routes/api/*.ts` (utiliser error handler)

---

## Phase 6: Frontend-API Routes Connection

### 6.1 - `feature/api-service`

**Objectif** : Créer service pour appels aux routes API internes

- [ ] Créer `src/services/apiClient.ts`
- [ ] Fonction `removeBackground(imageFile: File): Promise<string>` qui :
  - Crée FormData avec l'image
  - POST vers `/api/remove-background` (route relative, même domaine)
  - Retourne image en base64 PNG
  - Gère les erreurs :
    - Network errors → "Erreur réseau"
    - Timeout (30s) → "Le traitement a pris trop longtemps"
    - API errors → parse message d'erreur retourné
    - Validation errors → afficher détails
- [ ] Helpers pour :
  - `checkHealth()` → GET /api/health
  - `getStatus()` → GET /api/status (optionnel)
- [ ] Retry logic optionnel
- [ ] Logs pour debug

**Fichiers à créer/modifier:**

- `src/services/apiClient.ts`
- `src/types/index.ts` (types API responses)

---

### 6.2 - `feature/connect-editor-to-api`

**Objectif** : Connecter page éditeur aux routes API internes

- [ ] Dans `routes/editor.tsx`, au drag & drop ou clic :
  - Set `isProcessing = true`
  - Appeler `removeBackground(file)` via apiClient
  - Set `processedImage` avec résultat
  - Set `isProcessing = false`
- [ ] Gestion erreurs :
  - Afficher Toast erreur
  - Garder `currentImage` pour retry
  - Bouton "Réessayer"
- [ ] Gestion succès :
  - Afficher `processedImage` dans `ImagePreview`
  - Toast succès
  - Sauvegarder dans localStorage
- [ ] Prévenir double-click (disable button pendant processing)
- [ ] Timeout visuel si > 10s

**Fichiers à créer/modifier:**

- `src/routes/editor.tsx` (ajouter logique appel API)
- `src/components/ImagePreview.tsx` (afficher résultat)
- `src/components/Toast.tsx` (si pas encore)

---

## Phase 7: Download & Export

### 7.1 - `feature/image-download`

**Objectif** : Implémenter téléchargement d'image

- [ ] Créer `src/services/fileDownload.ts`
- [ ] Fonction `downloadImage(base64: string, filename: string, format: 'png' | 'jpg')` qui :
  - Convertit base64 en Blob
  - Crée lien de téléchargement
  - Trigger download avec filename approprié (ex: `bg-removed-2024-12-05.png`)
- [ ] Bouton "Télécharger PNG" sur `ImagePreview`
- [ ] Feedback utilisateur (Toast succès)
- [ ] Gestion erreurs (blob creation error, etc.)

**Fichiers à créer/modifier:**

- `src/services/fileDownload.ts`
- `src/components/ImagePreview.tsx` (ajouter bouton + logic)

---

### 7.2 - `feature/export-options`

**Objectif** : Ajouter options d'export avancées

- [ ] Créer `src/components/ExportOptions.tsx`
- [ ] Options disponibles :
  - Format : PNG (transparent) vs JPG vs WebP
  - Qualité (si JPG) : slider 50-100%
  - Aperçu avant téléchargement (avec options sélectionnées)
- [ ] Intégrer dans `ImagePreview` (ex: expanded section ou modal)
- [ ] Boutons de download pour chaque format
- [ ] Copy to clipboard (base64 image) optionnel
- [ ] Toast feedback pour chaque action

**Fichiers à créer/modifier:**

- `src/components/ExportOptions.tsx`
- `src/services/fileDownload.ts` (améliorer avec formats)
- `src/components/ImagePreview.tsx` (intégrer)

---

## Phase 8: User Experience & History

### 8.1 - `feature/image-history`

**Objectif** : Afficher historique des images traitées

- [ ] Créer `src/components/ImageHistory.tsx`
- [ ] Affichage :
  - Sidebar (desktop) ou bottom sheet (mobile) avec liste images
  - Miniatures thumbnail + timestamp
  - Clic pour charger une image
  - Bouton delete (+ confirm)
- [ ] Logique :
  - Limiter à 10 dernières images
  - Charger depuis localStorage via `useImageStorage`
  - Clic charge image dans editor
  - Supprimer image du localStorage et history
- [ ] Intégrer dans `routes/editor.tsx`
- [ ] Responsive design

**Fichiers à créer/modifier:**

- `src/components/ImageHistory.tsx`
- `src/routes/editor.tsx` (intégrer)
- `src/hooks/useImageStorage.ts` (améliorer si besoin)

---

### 8.2 - `feature/comparison-slider`

**Objectif** : Créer comparateur avant/après

- [ ] Créer `src/components/ComparisonSlider.tsx`
- [ ] Fonctionnalités :
  - Slider horizontal pour comparer images
  - Overlay avec label "Avant" / "Après"
  - Touch-friendly (mobile)
  - Smooth transitions
  - Optional: button pour basculer entre les deux
- [ ] Intégrer dans `ImagePreview` (afficher slider quand résultat disponible)

**Fichiers à créer/modifier:**

- `src/components/ComparisonSlider.tsx`
- `src/components/ImagePreview.tsx` (intégrer slider)

---

## Phase 9: Polish & Optimizations

### 9.1 - `feature/responsive-design`

**Objectif** : Vérifier et optimiser responsive design

- [ ] Tester sur mobile (iPhone, Android), tablet, desktop
- [ ] Ajuster layouts pour chaque breakpoint Tailwind (sm, md, lg, xl, 2xl)
- [ ] Images optimisées (lazy loading sur landing page)
- [ ] Fonts responsive (text-sm → text-lg selon screen)
- [ ] Touch-friendly : buttons min 44x44px
- [ ] Padding/margins adapté (plus généreux sur mobile)
- [ ] Navigation mobile-friendly
- [ ] Tester avec DevTools device emulation + real device

**Fichiers à modifier:**

- Tous les composants (vérifier Tailwind breakpoints)

---

### 9.2 - `feature/performance-optimization`

**Objectif** : Optimiser performances app

- [ ] Code splitting avec lazy routes (RRv7 support)
  - `lazy: () => import('./routes/editor')`
  - Lazy pour components lourds
- [ ] Image compression avant upload (utiliser library)
- [ ] Caching :
  - LocalStorage pour images historique
  - Service Worker optionnel pour offline mode
- [ ] Bundle analysis (vite analyze plugin)
- [ ] Lighthouse audit (score > 80 sur chaque métrique)
- [ ] Lazy load images sur landing page

**Fichiers à créer/modifier:**

- `src/router.ts` (lazy routes)
- `src/services/imageCompression.ts` (nouveau)
- `vite.config.ts` (ajouter plugin analyze)

---

### 9.3 - `feature/error-handling-ux`

**Objectif** : Améliorer gestion des erreurs

- [ ] Toast notifications système :
  - Créer `src/components/Toast/ToastProvider.tsx` et `useToast` hook
  - Toast types : success, error, warning, info
  - Auto-dismiss (5s par défaut)
  - Empilable (max 3 visible)
- [ ] Messages d'erreur clairs et utiles :
  - "Image invalide : format PNG, JPG, WebP acceptés"
  - "Quota gratuit dépassé : 0/50 utilisé ce mois"
  - "Erreur réseau : vérifiez votre connexion"
- [ ] Retry buttons pour erreurs temporaires
- [ ] Fallbacks gracieux pour cas edge

**Fichiers à créer/modifier:**

- `src/components/Toast/ToastProvider.tsx`
- `src/components/Toast/useToast.ts`
- Tous les composants (ajouter toasts)

---

### 9.4 - `feature/loading-states`

**Objectif** : Implémenter tous les loading states

- [ ] Créer `src/components/LoadingSpinner.tsx` (animation cool)
- [ ] Créer `src/components/Skeleton.tsx` (skeleton loaders)
- [ ] Appliquer à :
  - Image processing (spinner + progress optionnel)
  - Image preview (skeleton avant chargement)
  - Landing page images (lazy load + skeleton)
- [ ] Prévenir double-click (disable buttons pending)
- [ ] Timeout visuel (ex: "Traitement long... ça peut prendre du temps")

**Fichiers à créer/modifier:**

- `src/components/LoadingSpinner.tsx`
- `src/components/Skeleton.tsx`
- `src/routes/editor.tsx` (ajouter loaders)

---

## Phase 10: Analytics & Tracking (Optionnel)

### 10.1 - `feature/analytics-setup`

**Objectif** : Ajouter tracking basique (optionnel)

- [ ] Choisir analytics : Google Analytics, Plausible, Umami, ou simple backend logging
- [ ] Events à tracker :
  - Page views (landing, editor)
  - Image upload (success, error)
  - Image processed (success, error, quota error)
  - Image downloaded (format)
  - User flow (landing → editor → download)
- [ ] Pas de PII (no email, no image data)
- [ ] Configurable via .env

**Fichiers à créer/modifier:**

- `src/services/analytics.ts`
- Intégration dans composants clés

---

## Phase 11: Deployment & DevOps

### 11.1 - `feature/env-configuration`

**Objectif** : Configurer variables d'environnement

- [ ] Fichiers .env :
  - `.env.local` (dev local, non commité)
  - `.env.example` (template, commité)
  - `.env.production` (prod, variables sensibles en secrets)
- [ ] Variables nécessaires :
  - Frontend: `VITE_API_URL` (http://localhost:3000 ou https://api.prod.com)
  - Backend: `PORT`, `REMOVE_BG_API_KEY`, `NODE_ENV`
- [ ] Utiliser en code :
  - Frontend: `import.meta.env.VITE_API_URL`
  - Backend: `process.env.REMOVE_BG_API_KEY`
- [ ] Documentation claire

**Fichiers à créer/modifier:**

- `.env.example`
- `vite.config.ts` (charger VITE\_\* vars)
- `backend/.env.example`

---

### 11.2 - `feature/docker-setup`

**Objectif** : Conteneuriser l'application (optionnel mais recommended)

- [ ] `Dockerfile` backend (multi-stage si possible)
- [ ] `Dockerfile.frontend` optionnel (ou build en CI/CD)
- [ ] `docker-compose.yml` pour dev :
  - Service backend (port 3000)
  - Service frontend (port 5173)
  - .env dans compose
- [ ] `.dockerignore`
- [ ] Build scripts : `docker compose up`

**Fichiers à créer/modifier:**

- `Dockerfile` (backend)
- `docker-compose.yml`
- `.dockerignore`
- `backend/docker-entrypoint.sh` (optionnel)

---

### 11.3 - `feature/ci-cd-pipeline`

**Objectif** : Mettre en place CI/CD

- [ ] Choisir : GitHub Actions (recommandé si GitHub), GitLab CI, ou autre
- [ ] Pipeline :
  - Build frontend (npm run build)
  - Type check TypeScript
  - Lint (optionnel)
  - Build backend (optionnel)
  - Run tests si existants
  - Push artifacts à registry (si containerisé)
- [ ] Trigger : push à main, ou manual
- [ ] Artifacts : docker image ou zip build

**Fichiers à créer/modifier:**

- `.github/workflows/ci.yml`
- Ou `.gitlab-ci.yml`

---

### 11.4 - `feature/production-deployment`

**Objectif** : Déployer l'application

**Frontend :**

- [ ] Déployer sur :
  - Vercel (npm install -g vercel && vercel deploy)
  - Netlify (push à branch, auto deploy)
  - S3 + CloudFront
  - Ou serveur perso
- [ ] Configurer domaine custom
- [ ] SSL/HTTPS automatique (Vercel/Netlify inclus)
- [ ] Variables VITE_API_URL pointant vers API prod

**Backend :**

- [ ] Déployer sur :
  - Render (free tier possible)
  - Railway
  - Fly.io
  - AWS (EC2, ECS, Lambda)
  - Heroku (payant maintenant)
- [ ] Configurer env variables en secrets
- [ ] Database si nécessaire (optionnel)
- [ ] Monitoring (optionnel : DataDog, Sentry pour errors)
- [ ] CORS configuré pour domaine frontend prod

**Fichiers à créer/modifier:**

- Configuration selon plateforme (vercel.json, fly.toml, etc.)
- `vite.config.ts` (production build settings)

---

## Phase 12: Documentation & Finalization

### 12.1 - `feature/readme-documentation`

**Objectif** : Documenter le projet

- [ ] `README.md` complet :
  - Description rapide (1 phrase)
  - Features principales
  - Tech stack
  - Screenshots (optionnel)
  - Live demo link
  - Installation locale (npm install, npm run dev)
  - Build pour production
  - Backend setup si separate
- [ ] `CONTRIBUTING.md` (si opensource)
- [ ] `API.md` (doc endpoints backend)
- [ ] Code comments pour logique complexe

**Fichiers à créer/modifier:**

- `README.md`
- `CONTRIBUTING.md` (optionnel)
- `API.md`

---

### 12.2 - `feature/code-cleanup`

**Objectif** : Finaliser et nettoyer le code

- [ ] Supprimer :
  - Code mort/comments
  - Imports non utilisés
  - Branches git locales merged
  - Fichiers temporaires
- [ ] Format : `npx prettier --write .`
- [ ] Lint : `npm run lint` (si eslint setup)
- [ ] Type check : `npx tsc --noEmit`
- [ ] Vérifier console.logs (supprimer)
- [ ] Vérifier TODOs, FIXMEs

**Fichiers à modifier:**

- Tous les fichiers

---

### 12.3 - `feature/testing-setup` (Optionnel mais recommandé)

**Objectif** : Ajouter tests

- [ ] Setup Vitest (recommandé avec Vite) :
  - `npm install -D vitest @vitest/ui`
  - `vitest.config.ts`
- [ ] Tests unitaires (services) :
  - `src/services/__tests__/backgroundRemover.test.ts`
  - `src/hooks/__tests__/useImageStorage.test.ts`
- [ ] Tests composants (React Testing Library) :
  - `src/components/__tests__/DragDropZone.test.tsx`
- [ ] E2E tests (Playwright ou Cypress) :
  - `e2e/landing.spec.ts`
  - `e2e/editor.spec.ts`
- [ ] Coverage report : `npm run test:coverage`
- [ ] Target > 80% coverage

**Fichiers à créer/modifier:**

- `vitest.config.ts`
- `src/**/__tests__/*.test.ts(x)`
- `e2e/**/*.spec.ts`
- `package.json` (ajouter scripts test)

---

## Résumé des Branches (ordre de merge recommandé)

```bash
# Phase 1: Infrastructure
git checkout -b feature/project-setup
git checkout -b feature/routing-setup
git checkout -b feature/api-routes-setup

# Phase 2: Landing Page
git checkout -b feature/landing-page-hero
git checkout -b feature/landing-page-features
git checkout -b feature/landing-page-footer

# Phase 3: Editor Page
git checkout -b feature/drag-drop-zone
git checkout -b feature/image-preview
git checkout -b feature/editor-layout

# Phase 4: State Management
git checkout -b feature/localstorage-hook
git checkout -b feature/image-state-management

# Phase 5: API Routes
git checkout -b feature/api-remove-background-integration
git checkout -b feature/api-file-handling
git checkout -b feature/api-error-handling

# Phase 6: Frontend-API
git checkout -b feature/api-service
git checkout -b feature/connect-editor-to-api

# Phase 7: Download & Export
git checkout -b feature/image-download
git checkout -b feature/export-options

# Phase 8: UX Features
git checkout -b feature/image-history
git checkout -b feature/comparison-slider

# Phase 9: Polish
git checkout -b feature/responsive-design
git checkout -b feature/performance-optimization
git checkout -b feature/error-handling-ux
git checkout -b feature/loading-states

# Phase 10: Analytics (optionnel)
git checkout -b feature/analytics-setup

# Phase 11: DevOps
git checkout -b feature/env-configuration
git checkout -b feature/docker-setup
git checkout -b feature/ci-cd-pipeline
git checkout -b feature/production-deployment

# Phase 12: Finalization
git checkout -b feature/readme-documentation
git checkout -b feature/code-cleanup
git checkout -b feature/testing-setup
```

---

## Workflow Git Recommandé

Pour chaque branche :

```bash
# 1. Créer branche
git checkout -b feature/xxx

# 2. Développer (commits réguliers)
git add .
git commit -m "feat: description claire"

# 3. Tester localement
npm run dev
# Tester l'app manuellement

# 4. Push et Pull Request
git push origin feature/xxx

# 5. Code review (self-review si seul)
# Vérifier : tests pass, linting clean, types OK

# 6. Merge à main
git checkout main
git pull origin main
git merge feature/xxx
git push origin main

# 7. Nettoyer
git branch -d feature/xxx
```

---

## Notes Importantes - React Router v7 Framework

1. **Routing** : Utiliser le système de routes de RRv7 (createBrowserRouter)
2. **Layouts** : `__root.tsx` est le layout racine partagé par toutes les routes
3. **Navigation** : Utiliser `Link` ou `navigate()` de RRv7 (pas d'A tags)
4. **Loaders** : Optionnel pour data fetching (pas nécessaire pour cette app)
5. **ErrorBoundary** : `error.tsx` capture les erreurs automatiquement
6. **Lazy loading** : Routes lazy-loadable avec `lazy: () => import(...)`

---

## Recommandations Stack Finale

- **Frontend** : React 19 + React Router v7 + TypeScript + Tailwind CSS
- **Backend** : Node.js/Express ou Python/Flask
- **BG Removal** : remove.bg API (facile) OU rembg local (gratuit)
- **Hosting** :
  - Frontend : Vercel ou Netlify (simple, gratuit)
  - Backend : Render ou Railway (simple, quasi-gratuit)
- **Database** : Pas nécessaire (localStorage suffit pour MVP)
