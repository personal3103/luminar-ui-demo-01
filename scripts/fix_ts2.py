import os
base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages'

# Fix Dashboard.tsx unused vars
dash_path = os.path.join(base_dir, 'Dashboard.tsx')
with open(dash_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('import { motion } from "framer-motion";\n', '')
content = content.replace('Activity, Server, Users, AlertCircle, ArrowUpRight, Zap, Target', 'Activity, AlertCircle, ArrowUpRight, Target')
with open(dash_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix Pricing.tsx missing Link
pricing_path = os.path.join(base_dir, 'Pricing.tsx')
with open(pricing_path, 'r', encoding='utf-8') as f:
    content = f.read()
if 'import { Link }' not in content:
    content = content.replace('import { motion } from "framer-motion";', 'import { motion } from "framer-motion";\nimport { Link } from "react-router-dom";')
with open(pricing_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix ReviewDetail.tsx unused vars
rd_path = os.path.join(base_dir, 'ReviewDetail.tsx')
with open(rd_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('ArrowLeft, PlayCircle, BarChart3, Clock, AlertTriangle', 'ArrowLeft, BarChart3, Clock, AlertTriangle')
content = content.replace('const { id } = useParams();', 'useParams(); // id unused')
with open(rd_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Fix Settings.tsx unused vars
settings_path = os.path.join(base_dir, 'Settings.tsx')
with open(settings_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('Settings, Bell, Mic, Globe, CheckCircle2, ShieldAlert', 'Settings, Bell, Mic, Globe')
with open(settings_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TS errors part 2")
