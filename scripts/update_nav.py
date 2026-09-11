import re
import base64
import os

html_path = 'landing_body.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the nav block
nav_pattern = re.compile(r'<nav[^>]*>.*?</nav>', re.DOTALL)
new_nav = '''<nav class="hidden lg:flex items-center gap-2" data-active-classes="bg-purple-900/30 text-white font-semibold rounded-lg border border-purple-500/30">
  <a href="/app/dashboard" class="px-3 py-1.5 transition-all bg-purple-900/40 text-white font-semibold rounded-lg border border-purple-500/40 text-xs tracking-wide">Simulator</a>
  <a href="/app/pricing" class="px-3 py-1.5 text-xs text-on-surface-variant hover:text-white hover:bg-white/5 rounded-lg transition-all">Pricing</a>
  <a href="/login" class="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg transition-all hover:scale-105 shadow-[0_0_15px_rgba(124,58,237,0.4)] border border-purple-400/30">Login</a>
</nav>'''

html = nav_pattern.sub(new_nav, html)

# Re-encode to base64
new_b64 = base64.b64encode(html.encode('utf-8')).decode('utf-8')

# Write back to LandingPage.tsx
tsx_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(tsx_path, 'r', encoding='utf-8') as f:
    tsx_content = f.read()

tsx_content = re.sub(r'const htmlBase64 = "([^"]+)";', f'const htmlBase64 = "{new_b64}";', tsx_content)

with open(tsx_path, 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("Updated LandingPage with new nav")
