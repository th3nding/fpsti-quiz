import csv
import sys

# 读取 CSV 文件
csv_path = r'C:\Users\SHENYU~1\AppData\Local\Temp\lobsterai\attachments\owmod_maps-1775726229804-3fc7cs.csv'
xlsx_path = r'C:\Users\shenyue05\lobsterai\project\owmod_maps.xlsx'

# 使用内置 csv 模块读取
data = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    for row in reader:
        data.append(row)

# 创建 HTML 格式的 Excel 文件（Excel 可以打开）
html_content = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
table { border-collapse: collapse; }
td, th { border: 1px solid #000; padding: 5px; }
th { background-color: #f0f0f0; font-weight: bold; }
</style>
</head>
<body>
<table>
<tr>
'''

# 添加表头
for h in headers:
    html_content += f'<th>{h}</th>\n'

html_content += '</tr>\n'

# 添加数据行
for row in data:
    html_content += '<tr>'
    for cell in row:
        html_content += f'<td>{cell}</td>'
    html_content += '</tr>\n'

html_content += '''</table>
</body>
</html>
'''

# 保存为 .xls 格式（Excel 可以打开）
with open(xlsx_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f'已创建 Excel 文件：{xlsx_path}')
print(f'共 {len(data)} 行数据')
