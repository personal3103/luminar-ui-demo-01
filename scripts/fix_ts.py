import os

base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages'

# Fix EngineerProfile.tsx
with open(os.path.join(base_dir, 'EngineerProfile.tsx'), 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('const { id } = useParams();', 'useParams(); // id unused in mock')
with open(os.path.join(base_dir, 'EngineerProfile.tsx'), 'w', encoding='utf-8') as f:
    f.write(content)

# Fix FlashcardDetail.tsx
with open(os.path.join(base_dir, 'FlashcardDetail.tsx'), 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('const { id } = useParams();', 'useParams(); // id unused in mock')
with open(os.path.join(base_dir, 'FlashcardDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(content)

# Fix ScenarioDetail.tsx
with open(os.path.join(base_dir, 'ScenarioDetail.tsx'), 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('const { id } = useParams();', 'useParams(); // id unused in mock')
content = content.replace('import { motion } from "framer-motion";\n', '')
content = content.replace('ArrowLeft, Server, AlertCircle, Clock, Zap', 'ArrowLeft, Server, Clock, Zap')
with open(os.path.join(base_dir, 'ScenarioDetail.tsx'), 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TS errors")
