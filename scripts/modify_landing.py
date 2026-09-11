from bs4 import BeautifulSoup
import base64

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# 1. Modify Navbar to be transparent initially, with a specific ID so we can script it
header = soup.find('header')
if header:
    header['id'] = 'main-navbar'
    # Remove the background classes initially to make it transparent
    classes = header.get('class', [])
    classes_to_remove = ['bg-[#0e0e14]/80', 'backdrop-blur-xl', 'border-b', 'border-purple-900/30', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]']
    header['class'] = [c for c in classes if c not in classes_to_remove]
    header['class'].append('transition-all')
    header['class'].append('duration-500')
    header['class'].append('border-transparent')

# 2. Modify Hero Section to be full screen
# The section has class starting with 'relative w-full max-w-container-max...'
hero_section = soup.find('section')
if hero_section:
    classes = hero_section.get('class', [])
    # make it h-screen
    if 'h-screen' not in classes:
        classes.append('h-screen')
        classes.append('flex')
        classes.append('flex-col')
        classes.append('justify-center')
    hero_section['class'] = classes

# 3. Modify 3D Container to be full background
tact_container = soup.find(id='tact-kinetic-container')
if tact_container:
    tact_container['class'] = 'absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center overflow-hidden select-none pointer-events-none'
    
    # Move it out of the flex container to the top level of the section
    parent = tact_container.parent
    tact_container.extract()
    hero_section.insert(0, tact_container)

    # Ensure the parent content container is z-10 so it stays above
    if parent:
        parent['class'] = [c for c in parent.get('class', []) if c != 'pointer-events-auto']
        parent['class'].extend(['relative', 'z-10', 'pointer-events-auto', 'mt-16'])

# 4. Convert back to string and encode to base64
modified_html = str(soup)
html_base64 = base64.b64encode(modified_html.encode('utf-8')).decode('utf-8')

# Now rewrite LandingPage.tsx
tsx_content = f"""import {{ useEffect, useRef }} from "react";

export default function LandingPage() {{
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  const htmlBase64 = "{html_base64}";

  useEffect(() => {{
    if (containerRef.current && !mounted.current) {{
      containerRef.current.innerHTML = atob(htmlBase64);
      
      // Scroll animation for Navbar
      const navbar = containerRef.current.querySelector('#main-navbar');
      if (navbar) {{
         window.addEventListener('scroll', () => {{
            if (window.scrollY > 100) {{
               navbar.classList.add('bg-[#0e0e14]/90', 'backdrop-blur-xl', 'border-b', 'border-purple-900/30', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
               navbar.classList.remove('border-transparent');
            }} else {{
               navbar.classList.remove('bg-[#0e0e14]/90', 'backdrop-blur-xl', 'border-b', 'border-purple-900/30', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]');
               navbar.classList.add('border-transparent');
            }}
         }});
      }}

      // Scroll animate classes
      const sections = containerRef.current.querySelectorAll("section:not(:first-of-type), h2, h3, p");
      sections.forEach((el, i) => {{
         if (!el.classList.contains("scroll-animate")) {{
            el.classList.add("scroll-animate");
            el.classList.add(`scroll-delay-${{(i % 3) + 1}}`);
         }}
      }});

      const observer = new IntersectionObserver((entries) => {{
        entries.forEach(entry => {{
          if (entry.isIntersecting) {{
            entry.target.classList.add('is-visible');
          }}
        }});
      }}, {{ threshold: 0.1 }});
      
      containerRef.current.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

      // Auth logic
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const loginBtn = containerRef.current.querySelector("a[href='/login']") || containerRef.current.querySelector("a[href='#']"); 
      // Note: original code.html has a simulator button or similar. Let's find any CTA buttons and link them.
      const ctas = containerRef.current.querySelectorAll('button');
      ctas.forEach(btn => {{
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios') || btn.innerText.includes('Try 90s Incident')) {{
            btn.onclick = () => window.location.href = isLoggedIn ? '/app/dashboard' : '/login';
         }}
      }});

      // Scripts
      const script = document.createElement("script");
      script.src = "/landing-scripts.js";
      script.async = true;
      document.body.appendChild(script);

      mounted.current = true;
    }}
  }}, []);

  return <div ref={{containerRef}} className="w-full min-h-screen" />;
}}
"""

dest_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("Modified original HTML and rewrote LandingPage.tsx!")
