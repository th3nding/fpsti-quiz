# 网站爬虫学习指南

## 第一步：环境准备

```bash
# 安装必要库
pip install requests beautifulsoup4 pandas openpyxl lxml
pip install selenium playwright  # 动态网页需要

# Playwright 需要额外安装浏览器
playwright install
```

## 第二步：分析目标网站

### 1. 查看网页结构
- 按 F12 打开开发者工具
- 使用选择工具（箭头图标）点击目标元素
- 记录 CSS 选择器或 XPath

### 2. 检查网络请求
- 切换到 Network 标签
- 刷新页面，查看 XHR/Fetch 请求
- 有些数据直接从 API 获取（比解析 HTML 更简单）

### 3. 检查 robots.txt
访问 `https://网站域名/robots.txt` 查看爬取规则

## 第三步：编写爬虫

### 关键步骤

1. **发送请求**
```python
import requests
response = requests.get('https://example.com')
```

2. **解析 HTML**
```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')
```

3. **提取数据**
```python
# CSS 选择器
items = soup.select('.product-item')
titles = soup.select('.title')

# 或 XPath（需要 lxml）
from lxml import etree
tree = etree.HTML(response.text)
items = tree.xpath('//div[@class="item"]')
```

4. **保存 Excel**
```python
import pandas as pd
df = pd.DataFrame(data_list)
df.to_excel('output.xlsx', index=False)
```

## 第四步：处理常见问题

### 反爬机制应对

| 问题 | 解决方案 |
|------|---------|
| User-Agent 检测 | 设置 headers 中的 User-Agent |
| IP 封禁 | 使用代理 IP、降低请求频率 |
| Cookie 验证 | 使用 Session 维持登录状态 |
| JavaScript 渲染 | 使用 Selenium/Playwright |
| 验证码 | 打码平台或人工识别 |

### 代码示例：添加请求头

```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}
response = requests.get(url, headers=headers)
```

## 第五步：实战练习

### 练习 1：爬取豆瓣电影 Top250
- 目标：https://movie.douban.com/top250
- 字段：电影名、评分、评价人数、简介
- 难度：★☆☆（简单，无登录）

### 练习 2：爬取京东商品
- 目标：京东商品搜索页
- 字段：商品名、价格、店铺、评论数
- 难度：★★☆（需要处理动态加载）

### 练习 3：爬取微博热搜
- 目标：https://s.weibo.com/top/summary
- 字段：排名、热搜词、热度
- 难度：★☆☆（简单表格）

## 法律与道德规范

⚠️ **必须遵守**

1. 遵守 robots.txt 规则
2. 控制请求频率（建议间隔 2-5 秒）
3. 不爬取需要登录的私密数据
4. 不用于商业目的（除非获得授权）
5. 遵守《网络安全法》相关规定

## 推荐学习资源

- **书籍**：《Python 3 网络爬虫开发实战》（崔庆才）
- **网站**：
  - 崔庆才博客：https://cuiqingcai.com
  -  scrapy 官方文档：https://docs.scrapy.org
- **练习网站**：
  - 爬虫练习场：https://spiderbuf.cn
  - Quotes to Scrape：https://quotes.toscrape.com

## 下一步

告诉我你想爬取的具体网站，我可以帮你：
1. 分析网页结构
2. 编写针对性爬虫代码
3. 设计 Excel 输出格式
