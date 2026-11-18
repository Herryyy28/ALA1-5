import json
import re
import os

with open('reference_site.html', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'var D=(\[.*?\]);', content)
if match:
    data = json.loads(match.group(1))
    print(f'Parsed {len(data)} student records')
    
    os.makedirs('database/migrations', exist_ok=True)
    with open('database/students_dataset.json', 'w', encoding='utf-8') as jf:
        json.dump(data, jf, indent=2)
        
    sql_lines = ['-- Seed GMIU IT Students from official university registry\nINSERT INTO public.profiles (enrollment_number, full_name, role, department, university, academic_year) VALUES']
    entries = []
    for s in data:
        name = s['n'].replace("'", "''")
        en = s['id']
        entries.append(f"('{en}', '{name}', 'student', 'Information Technology', 'Gyanmanjari Institute of Technology (GMIU)', '2026-2027')")
    sql_lines.append(',\n'.join(entries))
    sql_lines.append('ON CONFLICT (enrollment_number) DO NOTHING;\n')
    
    with open('database/migrations/02_seed_students.sql', 'w', encoding='utf-8') as sf:
        sf.write('\n'.join(sql_lines))
    print('Generated database/students_dataset.json and database/migrations/02_seed_students.sql')
else:
    print('Could not find D array in reference_site.html')
