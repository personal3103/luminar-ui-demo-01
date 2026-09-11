import os
import re

landing_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(landing_path, 'r', encoding='utf-8') as f:
    landing = f.read()

# Add a useEffect to handle the auth switch and scroll animations
if 'IntersectionObserver' not in landing:
    new_use_effect = '''  useEffect(() => {
    if (containerRef.current && !mounted.current) {
      containerRef.current.innerHTML = atob(htmlBase64);
      
      // Inject scroll-animate classes to elements
      const sections = containerRef.current.querySelectorAll("section, h1, h2, h3, .grid > div, p");
      sections.forEach((el, i) => {
         if (!el.classList.contains("scroll-animate")) {
            el.classList.add("scroll-animate");
            el.classList.add(`scroll-delay-${(i % 3) + 1}`);
         }
      });

      // Setup IntersectionObserver for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      containerRef.current.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

      // Auth state toggle for Navbar
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const loginBtn = containerRef.current.querySelector("a[href='/login']");
      if (loginBtn) {
         if (isLoggedIn) {
            loginBtn.textContent = "Dashboard";
            loginBtn.setAttribute("href", "/app/dashboard");
            
            // Add logout button next to it
            const logoutBtn = document.createElement("button");
            logoutBtn.textContent = "Logout";
            logoutBtn.className = "px-4 py-1.5 text-xs font-bold text-status-danger bg-status-danger/10 rounded-lg transition-all hover:bg-status-danger/20 border border-status-danger/30 ml-2";
            logoutBtn.onclick = () => {
               localStorage.removeItem("isLoggedIn");
               window.location.reload();
            };
            loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
         }
      }

      // Existing script logic
      const script = document.createElement("script");
      script.src = "/landing-scripts.js";
      script.async = true;
      document.body.appendChild(script);

      const ctas = containerRef.current.querySelectorAll('button');
      ctas.forEach(btn => {
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios')) {
            btn.onclick = () => window.location.href = '/app/dashboard';
         }
      });

      mounted.current = true;
    }
  }, []);'''
    
    # Replace the old useEffect
    landing = re.sub(r'useEffect\(\(\) => \{.*mounted\.current = true;\n    \}\n  \}, \[\]\);', new_use_effect, landing, flags=re.DOTALL)
    
    with open(landing_path, 'w', encoding='utf-8') as f:
        f.write(landing)
    print("Updated LandingPage.tsx with Auth Toggle and Scroll Animations")
else:
    print("LandingPage already updated")
