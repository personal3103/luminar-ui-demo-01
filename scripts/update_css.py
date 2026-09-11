import os

filepath = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\index.css'

new_css = """@import "tailwindcss";

@theme {
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-focus: var(--primary-focus);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-card-active: var(--card-active);
  --color-border: var(--border);
  --color-brand-glow: var(--brand-glow);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-status-success: var(--status-success);
  --color-status-danger: var(--status-danger);
  --color-status-warning: var(--status-warning);

  --font-inter: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

@layer base {
  :root {
    /* Using native Tailwind CSS color variables for the Dark Mode palette */
    --primary: var(--color-violet-600);
    --primary-hover: var(--color-violet-500);
    --primary-focus: var(--color-violet-400);
    --secondary: var(--color-cyan-500);
    
    --background: var(--color-slate-950);
    --surface: var(--color-slate-900);
    --card-active: var(--color-slate-800);
    --border: var(--color-slate-800);
    
    --brand-glow: rgba(124, 58, 237, 0.15); /* Derived from violet */
    
    --text-primary: var(--color-slate-200);
    --text-secondary: var(--color-slate-400);
    
    --status-success: var(--color-emerald-500);
    --status-danger: var(--color-rose-500);
    --status-warning: var(--color-amber-500);
  }

  html, body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    background-color: var(--background);
    color: var(--text-primary);
  }
}

/* Landing Page Scroll Animations */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.scroll-delay-1 { transition-delay: 0.1s; }
.scroll-delay-2 { transition-delay: 0.2s; }
.scroll-delay-3 { transition-delay: 0.3s; }

/* 3D Flip Card */
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_css)

print("Updated index.css with Tailwind color variables!")
