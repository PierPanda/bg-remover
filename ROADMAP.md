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

### 1.2 - `feature/routing-setup` ✅ COMPLÉTÉE

**Objectif** : Configurer React Router v7 comme framework

- [x] Créer `routes.ts` avec configuration des routes
- [x] Définir les routes principales :
  - `GET /` → `home.tsx` (page unique - landing + editor)
  - ~~`GET /editor`~~ (fusionné avec home)
  - ~~`*` → `notfound.tsx`~~ (non nécessaire pour MVP)
- [x] Créer `layout.tsx` (layout racine avec `Outlet`)
- [x] Créer `root.tsx` (racine de l'app)
- [x] Créer composant Footer (shareable via `layout.tsx`)
- [x] Ajouter transitions/animations Tailwind

**Fichiers créés/modifiés:**

- `app/routes.ts`
- `app/root.tsx`
- `app/routes/layout.tsx`
- `app/routes/home.tsx`
- `app/components/Footer.tsx`

---

### 1.3 - `feature/api-routes-setup` ✅ COMPLÉTÉE

**Objectif** : Créer structure des routes API avec RRv7

- [x] Créer dossier `app/routes/api/`
- [x] Route `GET /api/health` → test de santé du serveur
- [x] Route `POST /api/remove-background` → avec remove.bg API
- [x] Route `GET /api/status` → infos serveur
- [x] Configurer actions pour accepter FormData (multipart)
- [x] Response JSON standardisée pour toutes les routes
- [x] Error handling avec codes HTTP appropriés
- [x] Validation des requêtes

**Fichiers créés:**

- `app/routes/api/health.ts`
- `app/routes/api/remove-background.ts`
- `app/routes/api/status.ts`
- `app/server/utils/utils.ts`
- `app/server/utils/env.ts`
- `app/types/index.ts`

---

## Phase 2: Frontend - Landing Page ✅ COMPLÉTÉE

### 2.1 - `feature/landing-page-hero` ✅

**Objectif** : Créer la section hero attractive

- [x] Implémenter Hero section dans `routes/home.tsx`
- [x] Titre, sous-titre, description du service
- [x] ~~Bouton CTA~~ (intégration directe avec dropzone)
- [x] Styling Tailwind responsive (mobile-first)
- [x] Animations Tailwind (fade-in-up, blob)
- [x] Dropzone intégrée dans la section hero (min-h-screen)

**Fichiers créés:**

- `app/routes/home.tsx` (hero section complète)
- `app/constants.ts` (contenu centralisé)

---

### 2.2 - `feature/landing-page-features` ✅

**Objectif** : Ajouter section des features/avantages

- [x] Créer composant `FeatureCard.tsx`
- [x] Section avec features principales
- [x] Icônes Iconify pour chaque feature
- [x] Layout en grille responsive
- [x] Design cohérent avec Hero

**Fichiers créés:**

- `app/components/FeatureCard.tsx`
- Features intégrées dans `app/routes/home.tsx`

---

### 2.3 - `feature/landing-page-footer` ✅

**Objectif** : Footer réutilisable dans toutes les pages

- [x] Implémenter Footer dans `components/Footer.tsx`
- [x] Liens réseaux sociaux (GitHub, LinkedIn avec icônes Lucide)
- [x] Copyright avec année dynamique
- [x] Layout en colonne (centré verticalement)
- [x] Responsive et cohérent
- [x] Importé dans `layout.tsx`

**Fichiers créés:**

- `app/components/Footer.tsx`
- Intégré dans `app/routes/layout.tsx`

---

## Phase 3: Frontend - Editor Page ✅ COMPLÉTÉE (fusionné avec home)

### 3.1 - `feature/drag-drop-zone` ✅

**Objectif** : Créer zone de drag & drop pour images

- [x] Composant `DragDropZone.tsx` avec TypeScript strict
- [x] Support drag & drop avec react-dropzone
- [x] Support clic pour sélectionner fichier
- [x] Validation des fichiers (PNG/JPG/JPEG/WebP, max 10MB)
- [x] Messages d'erreur clairs
- [x] Styling Tailwind attractive avec animations
- [x] États visuels (hover, active, error, disabled)
- [x] Fix: pointer-events pour click behavior
- [x] Fix: resizing avec max-w-4xl

**Fichiers créés:**

- `app/components/DragDropZone.tsx`
- Intégré dans `app/routes/home.tsx` (hero section)

---

### 3.2 - `feature/image-preview` ✅

**Objectif** : Afficher aperçu de l'image uploadée

- [x] Composant `ImagePreview.tsx`
- [x] Layout : image original + image traitée (side-by-side responsive)
- [x] Boutons actions (télécharger, nouvel upload)
- [x] Loading states avec LoadingSpinner
- [x] Error states avec retry
- [x] Success states
- [x] Responsive design (stacked sur mobile)
- [x] Background quadrillé pour transparence

**Fichiers créés:**

- `app/components/ImagePreview.tsx`
- `app/components/LoadingSpinner.tsx`

---

### 3.3 - `feature/editor-layout` ✅

**Objectif** : Créer layout complet de la page éditeur

- [x] Intégrer `DragDropZone` + `ImagePreview` dans `routes/home.tsx`
- [x] Layout responsif (mobile : vertical, desktop : grid)
- [x] États de l'app :
  - [x] Initial (drop zone vide)
  - [x] Processing (spinner, disabled UI)
  - [x] Done (image traitée affichée)
  - [x] Error (message + retry)
- [x] State management avec useState
- [x] Styling cohérent avec landing
- [x] Intégration avec layout racine

**Fichiers modifiés:**

- `app/routes/home.tsx` (page unique avec tout intégré)

---

### 4 - `feature/image-state-management` ✅ COMPLÉTÉE

**Objectif** : Gérer state des images dans l'app

- [x] State dans `routes/home.tsx` :
  - [x] `currentImage` (image upload)
  - [x] `processedImage` (image sans fond)
  - [x] `processingState` (idle | processing | success | error)
  - [x] `error` (string | null)
- [x] State management simple avec useState
- ~~localStorage~~ → Pas implémenté (décision MVP)

**Fichiers modifiés:**

- `app/routes/home.tsx` (state management)

---

## Phase 5: API Routes Implementation ✅ COMPLÉTÉE

### 5.1 - `feature/api-remove-background-integration` ✅

**Objectif** : Intégrer service de suppression du fond dans route API

**Option A - API remove.bg (CHOISIE) ✅**

- [x] Route handler `POST /api/remove-background`
  - [x] Récupère image du FormData
  - [x] Envoie à remove.bg API
  - [x] Retourne image en base64 PNG
- [x] Gestion erreurs complète
- [x] Response JSON standardisée
- [x] Types TypeScript

**Fichiers créés:**

- `app/routes/api/remove-background.ts`
- `.env` (BG_REMOVER_API_KEY)

---

### 5.2 - `feature/api-file-handling` ✅

**Objectif** : Gestion robuste des uploads

- [x] Validation stricte (PNG/JPG/JPEG/WebP, max 10MB)
- [x] Erreurs appropriées
- [x] Conversion base64 PNG

**Fichiers modifiés:**

- `app/routes/api/remove-background.ts`
- `app/server/utils/utils.ts`

---

### 5.3 - `feature/api-error-handling` ✅

**Objectif** : Standardiser gestion des erreurs API

- [x] Format standard de response
- [x] Proper HTTP status codes
- [x] Messages d'erreur clairs

---

## Phase 6: Frontend-API Routes Connection ✅ COMPLÉTÉE

### 6.1 - `feature/api-service` ✅

**Objectif** : Créer service pour appels aux routes API internes

- [x] Créer `app/services/apiClient.ts`
- [x] Fonction `removeBackground(imageFile: File): Promise<string>`
  - [x] Crée FormData avec l'image
  - [x] POST vers `/api/remove-background`
  - [x] Retourne image en base64 PNG
  - [x] Gère les erreurs (network, timeout, API, validation)

**Fichiers créés:**

- `app/services/apiClient.ts`

---

### 6.2 - `feature/connect-editor-to-api` ✅

**Objectif** : Connecter page éditeur aux routes API internes

- [x] Dans `routes/home.tsx` :
  - [x] Set `processingState = "processing"`
  - [x] Appeler `removeBackground(file)` via apiClient
  - [x] Set `processedImage` avec résultat
  - [x] Set `processingState = "success"`
- [x] Gestion erreurs avec messages clairs
- [x] Gestion succès avec affichage ImagePreview
- [x] Prévention double-click (disable dropzone pendant processing)

**Fichiers modifiés:**

- `app/routes/home.tsx` (logique complète)

---

## Phase 7: Download & Export ✅ PARTIELLEMENT COMPLÉTÉE

### 7.1 - `feature/image-download` ✅

**Objectif** : Implémenter téléchargement d'image

- [x] Créer `app/services/fileDownload.ts`
- [x] Fonction `downloadImage(base64: string, filename: string)` :
  - [x] Convertit base64 en Blob
  - [x] Crée lien de téléchargement
  - [x] Trigger download avec filename horodaté
- [x] Bouton "Télécharger PNG" sur `ImagePreview`
- ~~Toast feedback~~ (non implémenté pour MVP)

**Fichiers créés:**

- `app/services/fileDownload.ts`
- Bouton intégré dans `app/components/ImagePreview.tsx`

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
