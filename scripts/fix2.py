import os

filepath = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages\Roleplay.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Mic, PhoneOff, Settings2, Activity', 'Mic, PhoneOff, Activity')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
