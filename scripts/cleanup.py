import os
import glob

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src'
files = glob.glob(os.path.join(base_dir, '**', '*.tsx'), recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove unused React import
    content = content.replace('import React from "react";\n', '')
    content = content.replace('import React from \'react\';\n', '')
    content = content.replace('import React, { useEffect } from "react";', 'import { useEffect } from "react";')
    content = content.replace('import React, { useEffect, useRef } from "react";', 'import { useEffect, useRef } from "react";')
    content = content.replace('import React, { useEffect } from \'react\';', 'import { useEffect } from "react";')
    
    # Remove unused Settings2 in Roleplay.tsx
    if 'Roleplay.tsx' in file:
        content = content.replace(', Settings2', '')
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Cleaned up unused imports")
