import os
import re

dest_path = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\LandingPage.tsx'
with open(dest_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix types
content = content.replace("querySelector('#tact-kinetic-container')", "querySelector('#tact-kinetic-container') as HTMLElement")
content = content.replace("querySelector('.max-w-3xl.mx-auto.flex.flex-col.items-center.text-center')", "querySelector('.max-w-3xl.mx-auto.flex.flex-col.items-center.text-center') as HTMLElement")

# Fix unused loginBtn
content = re.sub(r'const loginBtn = containerRef\.current\.querySelector\("a\[href=\'/login\'\]"\) \|\| containerRef\.current\.querySelector\("a\[href=\'#\'\]"\);', '', content)

with open(dest_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed TS errors in LandingPage")
