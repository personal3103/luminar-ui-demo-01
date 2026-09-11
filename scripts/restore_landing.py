import os
import base64

code_html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'
with open(code_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Encode to base64 to avoid TSX parsing errors
html_base64 = base64.b64encode(html_content.encode('utf-8')).decode('utf-8')

tsx_content = f"""import {{ useEffect, useRef }} from "react";

export default function LandingPage() {{
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Base64 encoded code.html content
  const htmlBase64 = "{html_base64}";

  useEffect(() => {{
    if (containerRef.current && !mounted.current) {{
      containerRef.current.innerHTML = atob(htmlBase64);
      
      // Inject scroll-animate classes to elements
      const sections = containerRef.current.querySelectorAll("section, h1, h2, h3, .grid > div, p");
      sections.forEach((el, i) => {{
         if (!el.classList.contains("scroll-animate")) {{
            el.classList.add("scroll-animate");
            el.classList.add(`scroll-delay-${{(i % 3) + 1}}`);
         }}
      }});

      // Setup IntersectionObserver for scroll animations
      const observer = new IntersectionObserver((entries) => {{
        entries.forEach(entry => {{
          if (entry.isIntersecting) {{
            entry.target.classList.add('is-visible');
          }}
        }});
      }}, {{ threshold: 0.1 }});
      
      containerRef.current.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

      // Auth state toggle for Navbar
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const loginBtn = containerRef.current.querySelector("a[href='/login']");
      if (loginBtn) {{
         if (isLoggedIn) {{
            loginBtn.textContent = "Dashboard";
            loginBtn.setAttribute("href", "/app/dashboard");
            
            // Add logout button next to it
            const logoutBtn = document.createElement("button");
            logoutBtn.textContent = "Logout";
            logoutBtn.className = "px-4 py-1.5 text-xs font-bold text-status-danger bg-status-danger/10 rounded-lg transition-all hover:bg-status-danger/20 border border-status-danger/30 ml-2";
            logoutBtn.onclick = () => {{
               localStorage.removeItem("isLoggedIn");
               window.location.reload();
            }};
            if (loginBtn.parentNode) {{
                loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
            }}
         }}
      }}

      // Re-run the scripts from code.html
      const script = document.createElement("script");
      script.src = "/landing-scripts.js";
      script.async = true;
      document.body.appendChild(script);

      // Make buttons route to dashboard if logged in
      const ctas = containerRef.current.querySelectorAll('button');
      ctas.forEach(btn => {{
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios')) {{
            btn.onclick = () => window.location.href = isLoggedIn ? '/app/dashboard' : '/login';
         }}
      }});

      mounted.current = true;
    }}
  }}, []);

  return <div ref={{containerRef}} className="w-full min-h-screen" />;
}}
"""

dest_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("Restored LandingPage.tsx successfully!")
