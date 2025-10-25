#!/usr/bin/env python3
"""
Corrige atributos class duplicados fusionándolos en uno solo
"""

import re

def fix_duplicate_classes(content):
    """Fusiona atributos class duplicados en un solo atributo"""

    # Patrón para encontrar class="..." class="..."
    pattern = r'class="([^"]*?)" class="([^"]*?)"'

    def merge_classes(match):
        class1 = match.group(1).strip()
        class2 = match.group(2).strip()
        # Fusionar las clases
        merged = f"{class1} {class2}".strip()
        return f'class="{merged}"'

    # Aplicar reemplazo
    fixed_content = re.sub(pattern, merge_classes, content)

    # Contar cuántos se corrigieron
    count = len(re.findall(pattern, content))

    return fixed_content, count

def main():
    input_file = '/Users/macbooklab/Desktop/HealthPixel/CitoScan/CitoScan_Presentation/index.html'

    # Leer contenido
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Corregir duplicados
    fixed_content, count = fix_duplicate_classes(content)

    # Escribir resultado
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    print(f"✅ Corregidos {count} casos de atributos class duplicados")

if __name__ == '__main__':
    main()
