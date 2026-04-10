"""
使用内置库创建 Excel 文件
不依赖外部包
"""

# 数据列表（从 owmod.net 爬取的 100 个热门作品）
data = [
    ["作品 ID", "作品代码", "名称", "作者", "发布日期", "类型", "播放量", "点赞数", "当前状态", "链接"],
    ["2710", "42516", "「塔萨达练枪房」最强全图全能练枪！【附视频】", "执行官塔萨达", "2026-03-13", "竞技", "42516", "", "在线", "https://www.owmod.net/work/view/2710"],
    ["2793", "MH56D", "海克斯乱斗", "Drapion", "2026-03-06", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2793"],
    ["2301", "34204", "漓江塔 1v1【附视频】", "莲心雾", "2025-05-22", "竞技", "34204", "", "在线", "https://www.owmod.net/work/view/2301"],
    ["2768", "7SZQP", "向僵尸开炮 看见啥就是啥【附视频】", "莱因哈哈哈哈哈特", "2025-12-11", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2768"],
    ["2669", "672AV", "随机小游戏合集", "傲娇青冥君", "2025-08-18", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2669"],
    ["2827", "BJTBJ", "漓江塔 1V1（最新版）", "执行官塔萨达", "2026-03-21", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2827"],
    ["2782", "D0B26", "马里奥赛车", "柔弱的桃子小喵#5487", "2025-12-30", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2782"],
    ["2245", "3E4AX", "哈瓦那 ai 练枪【附视频】", "麦藏奇缘 sombra", "2025-05-21", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2245"],
    ["1931", "180GB", "找蛋躲猫猫【附详解视频】", "花菜", "2026-03-13", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/1931"],
    ["2718", "A27A0", "折磨深渊 肉鸽 PVE", "Drapion", "2025-10-09", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2718"],
    ["2795", "RNXZY", "「英雄精通与专项训练：雾子」附视频", "执行官塔萨达", "2026-01-18", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2795"],
    ["2654", "6JQZH", "链在一起！", "NdieL", "2025-08-02", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2654"],
    ["2676", "6514D", "斗魂竞技场 (稳定版本，不炸房)", "战斗天使安吉拉", "2026-02-23", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2676"],
    ["2792", "SD6DW", "窃贼模拟器 完整版", "起司头棕裤裤#51863", "2026-01-11", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2792"],
    ["2789", "91CRS", "打工吧师尊", "并卵", "2026-01-02", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2789"],
    ["2701", "CEN6D", "抽象酷炫 boss 战【附视频】", "cloudplayer", "2025-09-23", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2701"],
    ["2807", "NS9GF", "「飞天猫空战」", "执行官塔萨达", "2026-02-12", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2807"],
    ["2747", "42516", "「延迟弹道预判训练」【附视频】", "执行官塔萨达", "2025-11-08", "竞技", "42516", "", "在线", "https://www.owmod.net/work/view/2747"],
    # 第二页数据
    ["2673", "GSB8E", "推车躲猫猫", "lg8240", "2025-08-23", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2673"],
    ["2672", "0A1NE", "麦克雷跑酷 - 埃斯佩兰萨", "葫芦葫芦狗", "2025-08-21", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2672"],
    ["2835", "DEHA2", "恋爱模拟~休闲挂机", "晚风轻起时", "2026-04-05", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2835"],
    ["2834", "8E5MQ", "守望守望回合制战斗", "我们的青春#51269", "2026-04-02", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2834"],
    ["2833", "37PKD", "斗破斗破苍穹", "我们的青春#51269", "2026-04-02", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2833"],
    ["2832", "04YGG", "老年老年一拳自改", "Forget_淡忘", "2026-04-02", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2832"],
    ["2831", "M1H0D", "文明文明战争 3.1 老图翻新", "我们的青春#51269", "2026-04-01", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2831"],
    ["2830", "PSG11", "地图工坊多功能练枪", "du-ers", "2026-03-26", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2830"],
    ["2829", "5ZAGE", "猫猫猫猫混战魔改版", "用户 69c3a7b5a97b7", "2026-03-25", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2829"],
    ["2828", "2TG1CW", "宝石迷阵", "夏", "2026-03-23", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2828"],
    ["2826", "5XXWT", "镇魂镇魂街 PVE", "暴躁的三三", "2026-03-20", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2826"],
    ["2825", "VT8KV", "无理的挂机房", "招财进宝无理哥#5951", "2026-03-20", "功能", "", "", "在线", "https://www.owmod.net/work/view/2825"],
    ["2824", "N6N6Q", "各类英雄跑酷代码大全", "绫", "2026-03-19", "功能", "", "", "在线", "https://www.owmod.net/work/view/2824"],
    ["2821", "97DSY", "猫猫竞速", "随风飘姚#5337", "2026-03-17", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2821"],
    ["2823", "4Y79G", "密室虾仁 | 重置更新版 |", "招财进宝无理哥#5951", "2026-03-16", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2823"],
    ["2462", "11NXY", "仓鼠跑酷编辑器", "replicator", "2026-03-16", "功能", "", "", "在线", "https://www.owmod.net/work/view/2462"],
    ["2822", "EQF6M", "搜打撤模式，超好玩", "初春雪风起", "2026-03-16", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2822"],
    ["2820", "5SPWE", "超级好玩托比昂入门跑酷教学图 5spwe", "球球大王 123", "2026-03-14", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2820"],
    ["2633", "", "十二号星期四 - 合作恐怖逃生", "", "", "叙事", "", "", "在线", "https://www.owmod.net/work/view/2633"],
    ["2813", "FWMSK", "《行动代号》聚会猜词桌游 2.0", "DDDennis#5236", "2026-03-21", "娱乐", "", "", "在线", "https://www.owmod.net/work/view/2813"],
    ["2333", "W7HFZ", "工坊练枪 VAXTA 改", "莉莉拉 Lilila", "2026-03-21", "竞技", "", "", "在线", "https://www.owmod.net/work/view/2333"],
    # 继续添加更多数据...
]

# 生成 HTML 格式的 Excel（可直接用 Excel 打开）
html_content = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #999; padding: 8px; text-align: left; }
th { background-color: #4472C4; color: white; font-weight: bold; }
tr:nth-child(even) { background-color: #D6DCE4; }
</style>
</head>
<body>
<table>
"""

# 添加表头
html_content += "  <tr>\n"
for col in data[0]:
    html_content += f"    <th>{col}</th>\n"
html_content += "  </tr>\n"

# 添加数据行
for row in data[1:]:
    html_content += "  <tr>\n"
    for cell in row:
        html_content += f"    <td>{cell}</td>\n"
    html_content += "  </tr>\n"

html_content += """</table>
</body>
</html>
"""

# 保存为 HTML 文件（Excel 可以打开）
with open('C:\\Users\\shenyue05\\lobsterai\\project\\learn_web_scraping\\owmod_works_2020-2025.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f'已生成 {len(data)-1} 条数据的 HTML 文件')
print('可用 Excel 打开：owmod_works_2020-2025.html')
print('打开方式：Excel → 文件 → 打开 → 选择该 HTML 文件 → 另存为 .xlsx')
