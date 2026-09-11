import os

filepath = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\components\Layout.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('navItems.map((item, idx) =>', 'navItems.map((item) =>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
