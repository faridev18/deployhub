# DeployHub - Guide de Style

## Principes de Design

### Vision
DeployHub adopte un design **moderne, professionnel et accessible** qui inspire la confiance tout en restant convivial pour les développeurs et les équipes.

### Valeurs de Design
- **Clarté** : Interface intuitive et épurée
- **Performance** : Animations fluides et légères
- **Accessibilité** : Contraste suffisant, navigation au clavier
- **Modernité** : Design tendance orienté DevOps/Cloud

---

## Palette de Couleurs

### Couleurs Principales

```css
/* Primary - Vert Emeraude */
--primary-50:  #ecfdf5   /* Très clair */
--primary-100: #d1fae5
--primary-200: #a7f3d0
--primary-300: #6ee7b7
--primary-400: #34d399
--primary-500: #10b981   /* Principal */
--primary-600: #059669   /* Hover */
--primary-700: #047857
--primary-800: #065f46
--primary-900: #064e3b   /* Très foncé */

/* Secondary - Noir/Gris Foncé */
--secondary-800: #1e293b
--secondary-900: #0f172a

/* Accent - Vert Clair */
--accent-400: #4ade80
--accent-500: #22c55e
```

### Couleurs Sémantiques

```css
/* Success - Vert */
--success-500: #10b981
--success-600: #059669
--success-100: #d1fae5

/* Warning - Orange */
--warning-500: #f59e0b
--warning-600: #d97706
--warning-100: #fef3c7

/* Error - Rouge */
--error-500: #ef4444
--error-600: #dc2626
--error-100: #fee2e2

/* Info - Bleu clair */
--info-500: #3b82f6
--info-100: #dbeafe
```

### Couleurs Neutres

```css
/* Gris */
--gray-50:  #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827

/* Dark Mode */
--dark-bg: #0f172a      /* Slate 900 */
--dark-surface: #1e293b /* Slate 800 */
--dark-border: #334155  /* Slate 700 */
```

### Utilisation Tailwind

```jsx
// Bouton primaire
<button className="bg-emerald-500 hover:bg-emerald-600 text-white">
  Déployer
</button>

// Badge de succès
<span className="bg-green-100 text-green-600 px-2 py-1 rounded">
  Running
</span>

// Carte avec bordure
<div className="bg-white border border-gray-200 rounded-lg shadow-sm">
  Contenu
</div>
```

---

## Typographie

### Police de Caractères

```css
/* Système de polices modernes */
font-family: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  'Roboto', 
  sans-serif;

/* Pour le code */
font-family: 
  'Fira Code', 
  'JetBrains Mono', 
  'Courier New', 
  monospace;
```

### Échelle Typographique

| Élément | Taille | Poids | Tailwind |
|---------|--------|-------|----------|
| H1 - Titre Principal | 48px / 3rem | Bold (700) | `text-5xl font-bold` |
| H2 - Titre Section | 36px / 2.25rem | Bold (700) | `text-4xl font-bold` |
| H3 - Sous-titre | 30px / 1.875rem | Semibold (600) | `text-3xl font-semibold` |
| H4 - Titre Carte | 24px / 1.5rem | Semibold (600) | `text-2xl font-semibold` |
| Body Large | 18px / 1.125rem | Normal (400) | `text-lg` |
| Body Regular | 16px / 1rem | Normal (400) | `text-base` |
| Body Small | 14px / 0.875rem | Normal (400) | `text-sm` |
| Caption | 12px / 0.75rem | Medium (500) | `text-xs font-medium` |
| Code | 14px / 0.875rem | Normal (400) | `font-mono text-sm` |

### Exemples d'Usage

```jsx
// Hero Title
<h1 className="text-5xl font-bold text-gray-900 leading-tight">
  Déployez vos applications en quelques minutes
</h1>

// Section Title
<h2 className="text-4xl font-bold text-gray-900 mb-6">
  Fonctionnalités
</h2>

// Description
<p className="text-lg text-gray-600 leading-relaxed">
  Plateforme de déploiement automatisé pour développeurs
</p>

// Code snippet
<code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
  docker build -t myapp .
</code>
```

---

## Espacement

### Système d'Espacement (Tailwind)

```
0    → 0px
px   → 1px
0.5  → 2px    (spacing-0.5)
1    → 4px    (spacing-1)
2    → 8px    (spacing-2)
3    → 12px   (spacing-3)
4    → 16px   (spacing-4)
5    → 20px   (spacing-5)
6    → 24px   (spacing-6)
8    → 32px   (spacing-8)
10   → 40px   (spacing-10)
12   → 48px   (spacing-12)
16   → 64px   (spacing-16)
20   → 80px   (spacing-20)
24   → 96px   (spacing-24)
```

### Règles d'Espacement

- **Entre sections** : `py-16` ou `py-20` (64-80px)
- **Entre éléments d'une section** : `mb-6` ou `mb-8` (24-32px)
- **Entre paragraphes** : `mb-4` (16px)
- **Padding de cartes** : `p-6` ou `p-8` (24-32px)
- **Padding de boutons** : `px-6 py-3` (24px × 12px)

---

## Composants UI

### Boutons

#### Bouton Primaire
```jsx
<button className="
  bg-emerald-500 hover:bg-emerald-600 
  text-white font-medium 
  px-6 py-3 rounded-lg 
  transition-colors duration-200
  shadow-sm hover:shadow-md
">
  Démarrer gratuitement
</button>
```

#### Bouton Secondaire
```jsx
<button className="
  bg-white hover:bg-gray-50 
  text-gray-900 font-medium 
  px-6 py-3 rounded-lg 
  border border-gray-800
  transition-colors duration-200
">
  En savoir plus
</button>
```

#### Bouton Outline
```jsx
<button className="
  bg-transparent hover:bg-emerald-50 
  text-emerald-600 font-medium 
  px-6 py-3 rounded-lg 
  border-2 border-emerald-500
  transition-colors duration-200
">
  Documentation
</button>
```

#### Bouton Danger
```jsx
<button className="
  bg-red-500 hover:bg-red-600 
  text-white font-medium 
  px-4 py-2 rounded-lg 
  transition-colors duration-200
">
  Supprimer
</button>
```

### Cartes

#### Carte Standard
```jsx
<div className="
  bg-white rounded-lg 
  border border-gray-200 
  shadow-sm hover:shadow-md 
  transition-shadow duration-200
  p-6
">
  {/* Contenu */}
</div>
```

#### Carte avec Gradient
```jsx
<div className="
  bg-linear-to-br from-emerald-500 to-emerald-600
  rounded-lg shadow-lg
  text-white p-8
">
  {/* Contenu */}
</div>
```

### Badges

#### Badge de Statut
```jsx
// Running
<span className="
  inline-flex items-center gap-1.5
  bg-green-100 text-green-700 
  px-3 py-1 rounded-full 
  text-xs font-medium
">
  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
  Running
</span>

// Stopped
<span className="
  inline-flex items-center gap-1.5
  bg-gray-100 text-gray-700 
  px-3 py-1 rounded-full 
  text-xs font-medium
">
  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
  Stopped
</span>

// Building
<span className="
  inline-flex items-center gap-1.5
  bg-emerald-100 text-emerald-700 
  px-3 py-1 rounded-full 
  text-xs font-medium
">
  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
  Building
</span>

// Error
<span className="
  inline-flex items-center gap-1.5
  bg-red-100 text-red-700 
  px-3 py-1 rounded-full 
  text-xs font-medium
">
  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
  Error
</span>
```

### Inputs

#### Input Standard
```jsx
<input 
  type="text"
  className="
    w-full px-4 py-3 
    border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-shadow duration-200
  "
  placeholder="Nom du projet"
/>
```

#### Textarea
```jsx
<textarea 
  className="
    w-full px-4 py-3 
    border border-gray-300 rounded-lg
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    min-h-32
  "
  placeholder="Description"
/>
```

---

## Animations

### Transitions Standard

```css
/* Courte - Boutons, liens */
transition-all duration-200

/* Moyenne - Cartes, modales */
transition-all duration-300

/* Longue - Slides, fades */
transition-all duration-500
```

### Animations Utiles

```jsx
// Fade In
<div className="animate-fade-in">

// Slide Up
<div className="animate-slide-up">

// Pulse (pour badges)
<span className="animate-pulse">

// Spin (pour loaders)
<div className="animate-spin">
```

### Ajout dans `tailwind.config.js`

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
}
```

---

## Responsive Design

### Breakpoints (Tailwind)

```
sm:  640px  → Téléphones en paysage
md:  768px  → Tablettes
lg:  1024px → Petits écrans
xl:  1280px → Écrans standard
2xl: 1536px → Grands écrans
```

### Exemples d'Usage

```jsx
// Grille responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Texte responsive
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">

// Padding responsive
<section className="px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">

// Masquer sur mobile
<div className="hidden md:block">

// Afficher uniquement sur mobile
<div className="block md:hidden">
```

---

## Iconographie

### Bibliothèque Recommandée

**Lucide React** (moderne et légère)

```bash
npm install lucide-react
```

### Exemples d'Usage

```jsx
import { Rocket, Github, Zap, Shield } from 'lucide-react'

// Taille standard
<Rocket className="w-6 h-6 text-emerald-500" />

// Grande icône
<Github className="w-12 h-12 text-gray-900" />

// Avec animation
<Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
```

### Icônes Principales du Projet

- **Déploiement** : Rocket, Upload, GitBranch
- **Statuts** : CheckCircle, XCircle, Clock, AlertCircle
- **Actions** : Play, Pause, RotateCcw, Trash2
- **Navigation** : Home, Settings, User, LogOut
- **Code** : Code, Terminal, FileText, Folder

---

## Mode Sombre (Optionnel)

```jsx
// Configuration dans tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}

// Utilisation
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Contenu
</div>
```

---

## Checklist de Cohérence

Avant chaque livraison, vérifier :

- [ ] Couleurs cohérentes avec la palette définie
- [ ] Espacement uniforme entre sections (16-20)
- [ ] Boutons avec hover states
- [ ] Transitions fluides (200-300ms)
- [ ] Responsive sur mobile, tablette, desktop
- [ ] Contrastes accessibles (WCAG AA minimum)
- [ ] États de chargement et erreurs gérés
- [ ] Feedback visuel pour chaque action utilisateur

---

## Ressources

### Inspiration
- [Vercel](https://vercel.com) - Design épuré
- [Railway](https://railway.app) - Couleurs et animations
- [Render](https://render.com) - Structure claire

### Outils
- [Tailwind UI](https://tailwindui.com) - Composants premium
- [Heroicons](https://heroicons.com) - Icônes officielles
- [Coolors](https://coolors.co) - Palettes de couleurs

---

**Version** : 1.0  
**Dernière mise à jour** : Février 2026
