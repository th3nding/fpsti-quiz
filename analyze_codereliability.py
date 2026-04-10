import pandas as pd
import numpy as np
from pathlib import Path

# 读取 Excel 文件
file_path = r'C:\Users\shenyue05\Desktop\毕业论文\模组（质性）\owmod_maps_new.xlsx'
df = pd.read_excel(file_path)

print("=== 数据概览 ===")
print(f"列名：{df.columns.tolist()}")
print(f"数据形状：{df.shape}")
print(f"\n前 5 行数据:")
print(df.head())

print("\n=== 数据类型 ===")
print(df.dtypes)

print("\n=== 唯一值统计 ===")
for col in df.columns:
    print(f"{col}: {df[col].nunique()} 个唯一值")
