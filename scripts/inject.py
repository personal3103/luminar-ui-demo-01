import os

file_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to add an event listener to the CTA buttons in useEffect
injection = '''
    // Attach click listeners to CTAs
    setTimeout(() => {
      const ctas = document.querySelectorAll('button');
      ctas.forEach(btn => {
         if (btn.innerText.includes('Launch Simulator') || btn.innerText.includes('Explore Scenarios')) {
            btn.onclick = () => window.location.href = '/app/dashboard';
         }
      });
    }, 500);
'''

# insert it before return () => {
new_content = content.replace('return () => {', injection + '\n    return () => {')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
