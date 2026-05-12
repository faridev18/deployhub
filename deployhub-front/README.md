# DeployHub - Frontend

Plateforme moderne de déploiement automatisé pour applications conteneurisées.

## Technologies

- **React 19** - Framework frontend
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Framework CSS utility-first
- **React Router** - Navigation
- **Lucide React** - Bibliothèque d'icônes


## Démarrage Rapide

### Installation

```bash
# Installer les dépendances
yarn install
```

### Développement

```bash
# Lancer le serveur de développement
yarn dev
```

L'application sera accessible sur http://localhost:5173

### Build de Production

```bash
# Créer un build optimisé
yarn build

# Prévisualiser le build
yarn preview
```

## Composants Disponibles

- **Button** - Bouton avec 5 variantes (primary, secondary, outline, danger, ghost)
- **Card** - Carte avec 3 styles (default, gradient, ghost)
- **Badge** - Badge de statut avec 8 variantes



## Structure du Projet

```
src/
├── components/       # Composants réutilisables
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Badge.jsx
│   └── README.md
├── pages/           # Pages de l'application
│   └── Home.jsx
├── assets/          # Images et ressources
├── App.jsx          # Composant principal
└── main.jsx         # Point d'entrée
```

## Conventions de Code

### Classes Tailwind
Ordre recommandé :
1. Layout (flex, grid)
2. Position (relative, absolute)
3. Espacement (p-, m-)
4. Taille (w-, h-)
5. Couleurs (bg-, text-)
6. Typographie (font-, text-)
7. Effets (shadow-, rounded-)
8. Transitions

### Exemple
```jsx
<div className="
  flex items-center gap-4
  px-6 py-3
  bg-emerald-500 text-white
  font-medium text-lg
  rounded-lg shadow-md
  transition-all duration-200
">
```

## Palette de Couleurs

- **Primary** : Vert Emeraude (emerald-500, emerald-600)
- **Secondary** : Noir/Gris Foncé (gray-900, slate-900)
- **Success** : Vert (green-500, green-100)
- **Warning** : Jaune (yellow-500, yellow-100)
- **Error** : Rouge (red-500, red-100)
- **Neutral** : Gris (gray-50 à gray-900)
- **Error** : Red (red-500, red-100)
- **Neutral** : Gray (gray-50 à gray-900)

## Responsive

Le projet utilise les breakpoints Tailwind :
- Mobile : < 640px
- Tablet : ≥ 640px (sm:)
- Desktop : ≥ 1024px (lg:)
- Large : ≥ 1280px (xl:)

## Ressources

- [Documentation Vite](https://vite.dev)
- [Documentation React](https://react.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## Configuration

### ESLint

```bash
yarn lint
```

### Tailwind CSS

La configuration Tailwind se trouve dans le fichier de configuration Vite (`vite.config.js`).

## Licence

© 2026 DeployHub. Tous droits réservés.

---

**Version** : 1.0  
**Dernière mise à jour** : Février 2026
