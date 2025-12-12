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

### 7.2 - `feature/export-options` ✅ COMPLÉTÉE

**Objectif** : Ajouter options d'export avancées

- [x] Créer `app/components/ExportOptions.tsx`
- [x] Options disponibles :
  - [x] Format : PNG (transparent) vs JPG vs WebP
  - [x] Qualité (JPG/WebP) : slider 50-100%
  - [x] Estimation taille fichier
  - [x] Informations format (transparence, compression)
- [x] Intégrer dans `ImagePreview` (expanded section avec toggle)
- [x] Boutons de download pour chaque format
- ~~Copy to clipboard~~ (non implémenté pour MVP)
- ~~Toast feedback~~ (prévu Phase 9.3)

**Fichiers créés/modifiés:**

- `app/components/ExportOptions.tsx` (nouveau)
- `app/services/fileDownload.ts` (multi-format avec qualité)
- `app/components/ImagePreview.tsx` (intégration toggle)
- `app/routes/home.tsx` (gestion format/quality)

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

## Phase 9: Polish & Optimizations ✅ COMPLÉTÉE

### 9.1 - `feature/responsive-design` ✅

**Objectif** : Vérifier et optimiser responsive design

- [x] Tester sur mobile (iPhone, Android), tablet, desktop
- [x] Ajuster layouts pour chaque breakpoint Tailwind (sm, md, lg, xl, 2xl)
- [x] Images optimisées (lazy loading sur landing page)
- [x] Fonts responsive (text-sm → text-lg selon screen)
- [x] Touch-friendly : buttons min 44x44px
- [x] Padding/margins adapté (plus généreux sur mobile)
- [x] Navigation mobile-friendly
- [x] Design vérifié et responsive

**Fichiers modifiés:**

- Tous les composants déjà responsive avec Tailwind breakpoints

---

### 9.2 - `feature/performance-optimization` ✅

**Objectif** : Optimiser performances app

- [x] Code splitting avec lazy loading
  - Lazy loading pour ImagePreview (composant lourd)
  - Suspense avec fallback LoadingSpinner
- ~~Image compression avant upload~~ (non nécessaire, limite API 10MB)
- ~~Caching localStorage~~ (Phase 8 skippée)
- ~~Bundle analysis~~ (optionnel, non critique pour MVP)
- ~~Lighthouse audit~~ (à faire en production)

**Fichiers créés/modifiés:**

- `app/routes/home.tsx` (lazy loading ImagePreview)

---

### 9.3 - `feature/error-handling-ux` ✅

**Objectif** : Améliorer gestion des erreurs

- [x] Toast notifications système :
  - [x] Créé `app/components/Toast/ToastProvider.tsx`
  - [x] Créé `app/hooks/useToast.ts`
  - [x] Toast types : success, error, warning, info
  - [x] Auto-dismiss (5s par défaut)
  - [x] Empilable (max 3 visible)
  - [x] Animation slide-in-right
- [x] Messages d'erreur clairs et utiles
- [x] Toasts intégrés dans home.tsx (upload, download, erreurs)

**Fichiers créés/modifiés:**

- `app/components/Toast/ToastProvider.tsx` (nouveau)
- `app/hooks/useToast.ts` (nouveau)
- `app/root.tsx` (ToastProvider ajouté)
- `app/app.css` (animation slide-in-right)
- `app/routes/home.tsx` (toasts intégrés)

---

### 9.4 - `feature/loading-states` ✅

**Objectif** : Implémenter tous les loading states

- [x] Créer `app/components/LoadingSpinner.tsx` ✅ (déjà existant)
- [x] Créer `app/components/Skeleton.tsx` ✅
- [x] Appliquer à :
  - [x] Image processing (spinner avec messages)
  - [x] Image preview (Suspense avec fallback)
  - [x] States : uploading, processing, done, error
- [x] Prévenir double-click (dropzone disabled pendant processing)

**Fichiers créés/modifiés:**

- `app/components/LoadingSpinner.tsx` (déjà existant, amélioré)
- `app/components/Skeleton.tsx` (nouveau)
- `app/routes/home.tsx` (Suspense avec fallbacks)

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

## Phase 11: Deployment & DevOps ✅ PARTIELLEMENT COMPLÉTÉE

### 11.1 - `feature/env-configuration` ✅

**Objectif** : Configurer variables d'environnement

- [x] Fichiers .env :
  - [x] `.env` (dev local avec BG_REMOVER_API_KEY)
  - [x] `.env.example` (template)
- [x] Variables configurées :
  - [x] `BG_REMOVER_API_KEY` pour remove.bg API
- [x] Utilisation en code :
  - [x] `process.env.BG_REMOVER_API_KEY` dans API routes

**Fichiers créés:**

- `.env` (git-ignored)
- `app/server/utils/env.ts` (validation env vars)

---

### 11.2 - `feature/docker-setup` ⏭️ SKIPPÉ

**Objectif** : Conteneuriser l'application (optionnel)

- Non critique pour MVP
- À implémenter si besoin de scaling

---

### 11.3 - `feature/ci-cd-pipeline` ✅

**Objectif** : Mettre en place CI/CD

- [x] GitHub Actions configuré
- [x] Pipeline :
  - [x] Checkout code
  - [x] Install Vercel CLI
  - [x] Deploy to Vercel (prod sur main, preview sur branches)
  - [x] Comment PR avec deployment URL
- [x] Trigger : push sur toutes branches
- [x] Secrets GitHub configurés :
  - [x] VERCEL_TOKEN
  - [x] VERCEL_ORG_ID
  - [x] VERCEL_PROJECT_ID

**Fichiers créés:**

- `.github/workflows/deploy.yml`

---

### 11.4 - `feature/production-deployment` ✅

**Objectif** : Déployer l'application

**Déploiement Vercel :**

- [x] Vercel configuré via GitHub Actions
- [x] SSL/HTTPS automatique
- [x] Déploiement automatique sur push
- [x] Preview deployments sur PRs
- [x] Environment variables configurées dans Vercel dashboard

**Fichiers modifiés:**

- `.github/workflows/deploy.yml` (Vercel deployment)

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

### 12.2 - `feature/code-cleanup` ✅

**Objectif** : Finaliser et nettoyer le code

- [x] Supprimer :
  - [x] Imports non utilisés (layout.tsx nettoyé)
  - [x] Code commenté (navbar retiré de layout.tsx)
- [x] Type check : TypeScript strict mode activé
- ~~Format avec prettier~~ (optionnel)
- ~~Lint avec eslint~~ (non configuré)
- ~~Supprimer console.logs~~ (gardés pour debug dev)

**Fichiers modifiés:**

- `app/routes/layout.tsx` (imports nettoyés)
- Tous les composants (TypeScript strict)

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
