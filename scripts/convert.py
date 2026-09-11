import re
import os
import base64

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client'
html_path = r'c:\Users\trand\Downloads\Lumina\Document\UI\landing\code.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

head_content_match = re.search(r'<head>(.*?)</head>', html, re.DOTALL)
head_content = head_content_match.group(1) if head_content_match else ''
body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
body_inner = body_match.group(1) if body_match else ''
body_attrs_match = re.search(r'<body([^>]*)>', html)
body_attrs = body_attrs_match.group(1) if body_attrs_match else ''

scripts = []
def script_repl(m):
    scripts.append(m.group(1))
    return ''
body_no_scripts = re.sub(r'<script\b[^>]*>(.*?)</script>', script_repl, body_inner, flags=re.DOTALL)

body_b64 = base64.b64encode(body_no_scripts.encode('utf-8')).decode('utf-8')
scripts_joined = '\n'.join(scripts)

# Save scripts to public/landing-scripts.js
os.makedirs(os.path.join(base_dir, 'public'), exist_ok=True)
with open(os.path.join(base_dir, 'public', 'landing-scripts.js'), 'w', encoding='utf-8') as f:
    f.write(scripts_joined)

landing_page_code = f'''import React, {{ useEffect, useRef }} from "react";

const htmlBase64 = "{body_b64}";

export default function LandingPage() {{
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    const script = document.createElement('script');
    script.src = '/landing-scripts.js';
    document.body.appendChild(script);

    return () => {{
      if (document.body.contains(script)) {{
        document.body.removeChild(script);
      }}
    }};
  }}, []);

  return (
    <div ref={{containerRef}} dangerouslySetInnerHTML={{{{ __html: atob(htmlBase64) }}}} />
  );
}}
'''

os.makedirs(os.path.join(base_dir, 'src', 'pages'), exist_ok=True)
with open(os.path.join(base_dir, 'src', 'pages', 'LandingPage.tsx'), 'w', encoding='utf-8') as f:
    f.write(landing_page_code)

app_tsx = '''import LandingPage from "./pages/LandingPage";\n\nfunction App() {\n  return <LandingPage />;\n}\n\nexport default App;\n'''
with open(os.path.join(base_dir, 'src', 'App.tsx'), 'w', encoding='utf-8') as f:
    f.write(app_tsx)

index_html_path = os.path.join(base_dir, 'index.html')
with open(index_html_path, 'r', encoding='utf-8') as f:
    index_html = f.read()

index_html = index_html.replace('</head>', head_content + '\n</head>')
index_html = re.sub(r'<body[^>]*>', '<body ' + body_attrs.strip() + '>', index_html)

with open(index_html_path, 'w', encoding='utf-8') as f:
    f.write(index_html)

print('Successfully created LandingPage.tsx and updated index.html')
