# 📈 TradingVault v2.0 — Gold Focus

TradingVault is a premium, high-performance trading journal and operational dashboard built with **React** and **Vite**. Featuring a sleek dark Bloomberg-inspired aesthetic, it helps traders log, track, and optimize their trading performance with a strong focus on risk management and discipline.

![TradingVault Dashboard](https://raw.githubusercontent.com/radoi5873-commits/journal_trading/main/screenshot.png) *(Remplacez par votre lien d'image après publication)*

---

## ✨ Caractéristiques principales

* **📊 Tableau de Bord Intuitif** : Visualisez votre capital actuel, votre PnL global, votre Win Rate, le Profit Factor et votre courbe d'équité (Sparkline interactive).
* **📓 Journal de Trading Complet** : Enregistrez et modifiez vos positions (Date, Direction, Prix d'entrée/sortie, SL/TP, émotion, respect des règles, notes détaillées) avec filtrage dynamique et tri intelligent.
* **📋 Plan de Trading Personnalisable** : Définissez vos limites de pertes journalières, vos configurations (setups), vos créneaux horaires optimaux (sessions) et vos règles de gestion psychologique.
* **🔬 Module d'Analyse Avancé** : Suivez vos performances par instrument, étudiez l'impact de vos émotions sur vos gains et analysez vos statistiques Long vs Short.
* **🧮 Calculateur de Position Précis** : Entrez votre capital, votre risque (%) et vos niveaux de prix (Entrée/SL/TP) pour obtenir instantanément le nombre de lots optimal selon les spécificités de chaque instrument (GOLD, Forex, NAS100, BTC).
* **✅ Checklist Pré-Trade Intégrée** : Validez chaque étape essentielle de votre plan avant d'entrer en position afin d'éviter le FOMO et le Revenge Trading.

---

## 🎨 Design & Ergonomie

* **Bloomberg-like Dark Mode** : Palette de couleurs optimisée pour la concentration à base de tons foncés profonds (`--bg: #060809`), de vert émeraude (`#00C896`), de rouge corail (`#E8455A`) et d'accents dorés prestigieux (`#C9A84C`).
* **Typographie Monospace** : Utilisation combinée de **IBM Plex Mono** (pour les chiffres et valeurs) et **Inter** (pour les textes) assurant une lisibilité maximale des données financières.
* **Interface Fluide** : Micro-animations, transitions douces et mise en page responsive conçue pour s'adapter à toutes les résolutions d'écran.

---

## 🚀 Démarrage Rapide

### Prérequis

* **Node.js** (v18 ou supérieur recommandé)
* **npm** (v9 ou supérieur)

### Installation

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone <url-de-votre-repo>
   cd journal_trading
   ```

2. Installez les dépendances du projet :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement local :
   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur et accédez à l'adresse suivante :
   * **`http://localhost:5173`**

---

## 🛠 Technologies utilisées

* **Vite** — Module bundler rapide pour le développement web moderne.
* **React** (v18) — Bibliothèque JavaScript pour concevoir des interfaces réactives.
* **CSS Variables & Flexbox/Grid** — Pour une mise en page fluide sans frameworks lourds.
* **SVG** — Utilisé pour le rendu de la courbe d'équité (Sparkline) dynamique.
