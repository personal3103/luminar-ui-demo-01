import base64
import re

file_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the base64 string
b64_match = re.search(r'const htmlBase64 = "([^"]+)";', content)
if b64_match:
    b64_str = b64_match.group(1)
    html = base64.b64decode(b64_str).decode('utf-8')
    
    # Replace the logo URL
    html = re.sub(r'https://lh3\.googleusercontent\.com/aida/[^"]+', '/logo.png', html)
    
    new_b64 = base64.b64encode(html.encode('utf-8')).decode('utf-8')
    new_content = content.replace(b64_str, new_b64)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated logo in LandingPage")
else:
    print("Base64 string not found")
