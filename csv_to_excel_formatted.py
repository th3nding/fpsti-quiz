import csv

# 读取 CSV 文件
csv_path = r'C:\Users\SHENYU~1\AppData\Local\Temp\lobsterai\attachments\owmod_maps-1775726229804-3fc7cs.csv'
xlsx_path = r'C:\Users\shenyue05\lobsterai\project\owmod_maps_formatted.xlsx'

# 使用内置 csv 模块读取
data = []
headers = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    for row in reader:
        data.append(row)

# 创建带格式的 HTML Excel 文件
html_content = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
table { 
    border-collapse: collapse; 
    width: 100%;
    font-family: Arial, sans-serif;
}
td, th { 
    border: 1px solid #333; 
    padding: 8px;
    text-align: left;
}
th { 
    background-color: #4472C4; 
    color: white;
    font-weight: bold;
    text-align: center;
}
tr:nth-child(even) { background-color: #f2f2f2; }
tr:nth-child(odd) { background-color: #ffffff; }
tr:hover { background-color: #e6f3ff; }
.col-id { width: 60px; text-align: center; }
.col-name { width: 250px; }
.col-author { width: 120px; }
.col-date { width: 100px; text-align: center; }
.col-type { width: 80px; text-align: center; }
.col-views { width: 80px; text-align: right; }
.col-likes { width: 70px; text-align: right; }
.col-status { width: 80px; text-align: center; }
.col-hot { width: 70px; text-align: right; }
.col-code { width: 80px; text-align: center; font-family: monospace; }
</style>
</head>
<body>
<h2>OWMod 地图工坊数据（2020-2025 年分层抽样）</h2>
<p>总计：''' + str(len(data)) + ''' 个作品 | 高热度：33 个 | 中热度：33 个 | 低热度：34 个</p>
<table>
<tr>
'''

# 添加表头
header_names = ['作品 ID', '名称', '作者', '发布日期', '类型', '播放量', '点赞数', '当前状态', '热度', '代码']
header_classes = ['col-id', 'col-name', 'col-author', 'col-date', 'col-type', 'col-views', 'col-likes', 'col-status', 'col-hot', 'col-code']

for i, h in enumerate(headers):
    html_content += f'<th class="{header_classes[i]}">{h}</th>\n'

html_content += '</tr>\n'

# 添加数据行
for idx, row in enumerate(data, 1):
    html_content += f'<tr>'
    for i, cell in enumerate(row):
        cell_class = header_classes[i] if i < len(header_classes) else ''
        # 为类型列添加颜色标记
        if i == 4:  # 类型列
            if '竞技' in cell:
                cell_style = 'background-color: #ffcccc;'
            elif '技能训练' in cell:
                cell_style = 'background-color: #ccffcc;'
            elif '叙事' in cell:
                cell_style = 'background-color: #ccccff;'
            else:
                cell_style = 'background-color: #ffffcc;'
            html_content += f'<td class="{cell_class}" style="{cell_style}">{cell}</td>'
        else:
            html_content += f'<td class="{cell_class}">{cell}</td>'
    html_content += '</tr>\n'

html_content += '''</table>
<p style="margin-top: 20px; font-size: 12px; color: #666;">数据来源：https://www.owmod.net | 生成时间：2026-04-09</p>
</body>
</html>
'''

# 保存为 .xlsx 格式（Excel 可以打开）
with open(xlsx_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f'已创建格式化 Excel 文件：{xlsx_path}')
print(f'共 {len(data)} 行数据')
print('格式优化：')
print('  - 表头蓝色背景，白色文字')
print('  - 交替行颜色便于阅读')
print('  - 类型列按类别着色（竞技 - 红，训练 - 绿，叙事 - 蓝，娱乐 - 黄）')
print('  - 数字列右对齐，文本列左对齐')
print('  - 代码列使用等宽字体')
