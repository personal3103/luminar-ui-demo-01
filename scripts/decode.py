import re
import base64

file_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

b64_match = re.search(r'const htmlBase64 = "([^"]+)";', content)
if b64_match:
    b64_str = b64_match.group(1)
    html = base64.b64decode(b64_str).decode('utf-8')
    with open('landing_body.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Decoded to landing_body.html")
