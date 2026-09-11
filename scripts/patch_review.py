import os
base_dir = r'c:\Users\trand\Downloads\Lumina\resrouces\client\src\pages'

review_path = os.path.join(base_dir, 'Review.tsx')
with open(review_path, 'r', encoding='utf-8') as f:
    review = f.read()

# Make the original box clickable or add a link
if 'import { Link }' not in review:
    review = review.replace('import { ArrowRight, BarChart3 } from "lucide-react";', 'import { ArrowRight, BarChart3 } from "lucide-react";\nimport { Link } from "react-router-dom";')

review = review.replace('<h1 className="text-4xl font-bold text-white tracking-tight">Post-Mortem Review</h1>', '<div className="flex justify-between items-end"><h1 className="text-4xl font-bold text-white tracking-tight">Post-Mortem Review</h1><Link to="/app/review/1" className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors">View Timeline Detail</Link></div>')

with open(review_path, 'w', encoding='utf-8') as f:
    f.write(review)
