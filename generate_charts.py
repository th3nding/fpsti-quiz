import json
import subprocess
import os

# 一致率数据
agreement_data = {
    "tool": "generate_bar_chart",
    "args": {
        "data": [
            {"category": "技能修改程度", "value": 91.00},
            {"category": "地图物件来源", "value": 94.00},
            {"category": "机制创新", "value": 93.00},
            {"category": "视觉创新", "value": 94.00},
            {"category": "叙事创新", "value": 97.00}
        ],
        "title": "编码员一致性分析 - 各维度一致率",
        "theme": "default",
        "width": 800,
        "height": 500,
        "axisXTitle": "维度",
        "axisYTitle": "一致率 (%)"
    }
}

# Kappa 系数数据
kappa_data = {
    "tool": "generate_bar_chart",
    "args": {
        "data": [
            {"category": "技能修改程度", "value": 0.8806},
            {"category": "地图物件来源", "value": 0.9152},
            {"category": "机制创新", "value": 0.9091},
            {"category": "视觉创新", "value": 0.9206},
            {"category": "叙事创新", "value": 0.9600}
        ],
        "title": "编码员一致性分析 - Cohen's Kappa 系数",
        "theme": "default",
        "width": 800,
        "height": 500,
        "axisXTitle": "维度",
        "axisYTitle": "Kappa 系数"
    }
}

skill_dir = r"C:\Users\shenyue05\AppData\Roaming\LobsterAI\SKILLs\chart-visualization"
script_path = os.path.join(skill_dir, "scripts", "generate.js")

# 生成一致率图表
print("生成一致率图表...")
spec_json = json.dumps(agreement_data, ensure_ascii=False)
result = subprocess.run(
    ["node", script_path, spec_json],
    capture_output=True,
    text=True,
    cwd=skill_dir
)
print("一致率图表输出:", result.stdout)
if result.stderr:
    print("错误:", result.stderr)

# 生成 Kappa 系数图表
print("\n生成 Kappa 系数图表...")
spec_json = json.dumps(kappa_data, ensure_ascii=False)
result = subprocess.run(
    ["node", script_path, spec_json],
    capture_output=True,
    text=True,
    cwd=skill_dir
)
print("Kappa 系数图表输出:", result.stdout)
if result.stderr:
    print("错误:", result.stderr)
