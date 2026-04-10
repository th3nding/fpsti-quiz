import pandas as pd

# 读取 CSV
df = pd.read_csv('C:\\Users\\shenyue05\\lobsterai\\project\\learn_web_scraping\\owmod_100_works.csv')

# 统计类型分布
type_dist = df['类型'].value_counts()
print("类型分布统计：")
for t, c in type_dist.items():
    print(f"  {t}: {c} 个")

# 统计年份分布
df['年份'] = df['发布日期'].str[:4]
year_dist = df['年份'].value_counts().sort_index()
print("\n年份分布统计：")
for y, c in year_dist.items():
    print(f"  {y}: {c} 个")

# 统计作者作品数
author_dist = df['作者'].value_counts().head(10)
print("\n热门作者 TOP10：")
for a, c in author_dist.items():
    print(f"  {a}: {c} 个作品")

# 保存为 Excel
df.to_excel('C:\\Users\\shenyue05\\lobsterai\\project\\learn_web_scraping\\owmod_100_works.xlsx', index=False, engine='openpyxl')
print(f"\n✓ 已保存 Excel 文件：owmod_100_works.xlsx")
print(f"✓ 共 {len(df)} 条数据")
