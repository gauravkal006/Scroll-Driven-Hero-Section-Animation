# Scroll-Driven Hero Section Animation

A hero section where a car drives across the screen as you scroll. It paints the road behind it, turns the **WELCOME ITZFIZZ** headline solid, and fills each statistic card with colour.

**Live demo:** https://gauravkal006.github.io/Scroll-Driven-Hero-Section-Animation/

## Features

- The headline and statistics animate in one by one when the page loads.
- The car's movement is tied to scroll progress, not to a timer.
- Smooth scrolling and eased motion.
- Animations use only `transform` and `opacity` to keep scrolling smooth.
- Responsive layout for mobile and desktop.

## Built with

- Next.js and React
- GSAP + ScrollTrigger
- Tailwind CSS
- Lenis (smooth scroll)

## Run locally

```bash
git clone https://github.com/gauravkal006/Scroll-Driven-Hero-Section-Animation.git
cd Scroll-Driven-Hero-Section-Animation
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
├── app/            page, layout and global styles
├── components/     Hero, Car (SVG), StatCard, SmoothScroll
└── data/stats.js   statistics shown in the hero
```
