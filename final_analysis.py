#!/usr/bin/env python3
"""
Análisis final: patrones encontrados y utility classes creadas
"""

import re

# Patrones más frecuentes encontrados (del análisis inicial)
patterns = [
    ("display: flex; align-items: center; gap: var(--space-2);", 12),
    ("display: flex; align-items: flex-start; gap: var(--space-5);", 7),
    ("display: flex; align-items: start; gap: var(--space-3);", 6),
    ("display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;", 6),
    ("display: flex; align-items: center; gap: var(--space-4);", 5),
    ("display: flex; justify-content: space-between; margin-bottom: var(--space-2);", 4),
    ("display: flex; flex-direction: column; gap: var(--space-5);", 2),
    ("display: flex; flex-direction: column; gap: var(--space-4);", 2),
    ("display: flex; flex-direction: column; gap: var(--space-3);", 2),
]

# Leer base.css para contar utility classes creadas
with open('css/base.css', 'r', encoding='utf-8') as f:
    base_css = f.read()

# Buscar sección de utility classes
utilities_section = re.search(r'/\*\s*===\s*Flex Layout Utilities\s*===\s*\*/(.+?)(?:/\*|$)', base_css, re.DOTALL)

if utilities_section:
    utilities_text = utilities_section.group(1)
    # Contar clases definidas
    utility_classes = re.findall(r'\.([\w-]+)\s*\{', utilities_text)
    unique_classes = set(utility_classes)

print("=" * 70)
print("  ANÁLISIS DE PATRONES Y UTILITY CLASSES CREADAS")
print("=" * 70)
print()

print("🔍 TOP 9 PATRONES MÁS FRECUENTES ENCONTRADOS")
print("-" * 70)
for i, (pattern, count) in enumerate(patterns, 1):
    print(f"{i}. [{count:2}x] {pattern[:60]}...")
print()

print("🎨 UTILITY CLASSES CREADAS EN base.css")
print("-" * 70)
print(f"Total de utility classes nuevas: {len(unique_classes)}")
print()
print("Clases creadas:")
for cls in sorted(unique_classes):
    print(f"  • .{cls}")
print()

# Calcular líneas agregadas a base.css
base_css_lines_before = 498  # Líneas antes del refactor (aprox)
base_css_lines = len(base_css.split('\n'))
new_lines = base_css_lines - base_css_lines_before

print("📈 IMPACTO EN base.css")
print("-" * 70)
print(f"  • Líneas agregadas:          ~{new_lines} líneas")
print(f"  • Utility classes creadas:   {len(unique_classes)} clases")
print(f"  • Tamaño del archivo:        {len(base_css):,} bytes")
print()

print("=" * 70)
