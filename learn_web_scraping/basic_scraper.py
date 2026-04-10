"""
网站爬虫入门示例 - 将网页数据整理为 Excel
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd

# 示例 1: 爬取简单网页表格
def scrape_simple_table(url):
    """爬取网页中的表格数据"""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 查找表格
    table = soup.find('table')
    rows = table.find_all('tr')
    
    data = []
    for row in rows:
        cols = row.find_all(['td', 'th'])
        data.append([col.text.strip() for col in cols])
    
    # 转为 DataFrame 并保存 Excel
    df = pd.DataFrame(data[1:], columns=data[0])  # 第一行为表头
    df.to_excel('output.xlsx', index=False)
    print(f'已保存 {len(df)} 条数据到 output.xlsx')
    return df

# 示例 2: 爬取列表页（多页）
def scrape_multiple_pages(base_url, total_pages):
    """爬取多个页面的数据"""
    all_data = []
    
    for page in range(1, total_pages + 1):
        url = f"{base_url}?page={page}"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 根据实际网页结构调整选择器
        items = soup.select('.item-class')  # 替换为实际 CSS 选择器
        
        for item in items:
            data = {
                '标题': item.select_one('.title').text.strip() if item.select_one('.title') else '',
                '价格': item.select_one('.price').text.strip() if item.select_one('.price') else '',
                '链接': item.select_one('a')['href'] if item.select_one('a') else '',
            }
            all_data.append(data)
        
        print(f'第 {page} 页完成，累计 {len(all_data)} 条')
    
    df = pd.DataFrame(all_data)
    df.to_excel('multi_page_output.xlsx', index=False)
    return df

# 示例 3: 处理动态网页（需要 Selenium）
def scrape_dynamic_page(url):
    """处理 JavaScript 渲染的网页"""
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.chrome.options import Options
    import time
    
    # 配置 Chrome 选项
    options = Options()
    options.add_argument('--headless')  # 无头模式
    driver = webdriver.Chrome(options=options)
    
    driver.get(url)
    time.sleep(3)  # 等待页面加载
    
    # 等待特定元素加载
    driver.implicitly_wait(10)
    elements = driver.find_elements(By.CLASS_NAME, 'target-class')
    
    data = []
    for elem in elements:
        data.append({
            '文本': elem.text,
            # 添加其他字段
        })
    
    driver.quit()
    
    df = pd.DataFrame(data)
    df.to_excel('dynamic_output.xlsx', index=False)
    return df

# 示例 4: 带反爬处理的爬虫
def scrape_with_anti_blocking(url):
    """处理反爬机制"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Referer': url,
    }
    
    session = requests.Session()
    session.headers.update(headers)
    
    # 添加延迟
    import time
    time.sleep(2)
    
    response = session.get(url)
    # 继续处理...
    return response

# 使用示例
if __name__ == '__main__':
    # 替换为目标网站 URL
    target_url = 'https://example.com/data'
    
    # 根据网站类型选择函数
    # scrape_simple_table(target_url)
    # scrape_multiple_pages(target_url, total_pages=10)
    # scrape_dynamic_page(target_url)
    
    print('选择适合的爬虫函数并修改 CSS 选择器')
