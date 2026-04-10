"""
OWMod 地图工坊爬虫
爬取 2020-2025 年 100 个热门地图工坊作品
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from datetime import datetime
import re

class OWModScraper:
    def __init__(self):
        self.base_url = "https://www.owmod.net"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.all_works = []
    
    def parse_work_item(self, item_div):
        """解析单个作品信息"""
        try:
            # 作品链接和标题
            title_link = item_div.find('a', href=lambda x: x and '/work/view/' in x)
            if not title_link:
                return None
            
            title = title_link.text.strip()
            work_url = self.base_url + title_link['href']
            work_id = work_url.split('/work/view/')[-1]
            
            # 获取作品代码（通常在标题下方）
            work_code_elem = item_div.find(string=re.compile(r'^[A-Z0-9]{5}$'))
            work_code = work_code_elem.strip() if work_code_elem else ''
            
            # 热度分数
            hot_elem = item_div.find(string=re.compile(r'^\d+\.?\d*$'))
            hot_score = hot_elem.strip() if hot_elem else '0'
            
            # 发布日期
            date_elem = None
            for elem in item_div.find_all(['span', 'div']):
                text = elem.text.strip()
                # 匹配日期格式：2025-XX-XX 或 MM-DD 或相对时间
                if re.match(r'^\d{4}-\d{2}-\d{2}$', text) or \
                   re.match(r'^\d{2}-\d{2}$', text) or \
                   '天前' in text or '小时前' in text:
                    date_elem = text
                    break
            publish_date = date_elem if date_elem else ''
            
            # 描述/简介
            desc_elem = item_div.find('div', class_=lambda x: x and 'desc' in x.lower())
            if not desc_elem:
                # 尝试其他可能的描述类名
                for div in item_div.find_all('div'):
                    text = div.text.strip()
                    if len(text) > 20 and len(text) < 200 and text != title:
                        desc_elem = text
                        break
            description = desc_elem if isinstance(desc_elem, str) else (desc_elem.text.strip() if desc_elem else '')
            
            # 判断类型（根据标题和描述关键词）
            work_type = self.classify_work_type(title, description)
            
            return {
                '作品 ID': work_id,
                '作品代码': work_code,
                '名称': title,
                '作者': '',  # 需要从详情页获取
                '发布日期': publish_date,
                '类型': work_type,
                '热度分数': hot_score,
                '播放量': '',  # 需要从详情页获取
                '点赞数': '',  # 需要从详情页获取
                '当前状态': '在线',
                '链接': work_url
            }
        except Exception as e:
            print(f'解析失败：{e}')
            return None
    
    def classify_work_type(self, title, description):
        """根据标题和描述判断作品类型"""
        text = title + ' ' + description
        
        # 娱乐类关键词
        entertainment_keywords = ['躲猫猫', '跑酷', '赛车', '小游戏', '休闲', '挂机', '恋爱', '宝石', '连连看', 'boss 战', '海克斯', '乱斗']
        # 竞技类关键词
        competitive_keywords = ['1v1', '练枪', '竞技', 'pvp', '死斗', '竞技场', '单挑', '精通', '训练']
        # 叙事类关键词
        narrative_keywords = ['剧情', '故事', 'rpg', '修仙', '斗破', '镇魂', '打工', '模拟']
        
        ent_count = sum(1 for kw in entertainment_keywords if kw in text)
        comp_count = sum(1 for kw in competitive_keywords if kw in text)
        narr_count = sum(1 for kw in narrative_keywords if kw in text)
        
        if comp_count > ent_count and comp_count >= narr_count:
            return '竞技'
        elif narr_count > ent_count:
            return '叙事'
        else:
            return '娱乐'
    
    def scrape_list_page(self, page_num, sort_type='hot'):
        """爬取列表页"""
        url = f"{self.base_url}/work/list/all?page={page_num}&sort={sort_type}"
        
        try:
            response = self.session.get(url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 查找作品列表
            works = []
            
            # 尝试不同的选择器
            work_items = soup.select('div.work-item') or \
                        soup.select('div.item') or \
                        soup.select('div.custom-work') or \
                        soup.find_all('div', class_=lambda x: x and ('work' in x or 'item' in x))
            
            for item in work_items:
                work_data = self.parse_work_item(item)
                if work_data:
                    works.append(work_data)
            
            return works
            
        except Exception as e:
            print(f'爬取第{page_num}页失败：{e}')
            return []
    
    def scrape_work_detail(self, work_url):
        """爬取作品详情页获取更多信息"""
        try:
            response = self.session.get(work_url, timeout=10)
            response.encoding = 'utf-8'
            soup = BeautifulSoup(response.text, 'html.parser')
            
            data = {}
            
            # 作者信息
            author_elem = soup.find('a', href=lambda x: x and '/user/' in x) or \
                         soup.find('span', string=re.compile(r'作者|creator'))
            if author_elem:
                data['作者'] = author_elem.text.strip()
            
            # 播放量
            view_elem = soup.find(string=re.compile(r'\d+\s*次播放|\d+\s*views?|播放.*\d+'))
            if view_elem:
                match = re.search(r'\d+', view_elem)
                data['播放量'] = match.group() if match else ''
            
            # 点赞数
            like_elem = soup.find(string=re.compile(r'\d+\s*点赞|\d+\s*likes?|喜欢.*\d+'))
            if like_elem:
                match = re.search(r'\d+', like_elem)
                data['点赞数'] = match.group() if match else ''
            
            # 状态
            status_elem = soup.find(string=re.compile(r'已下架|已删除|维护中|在线'))
            if status_elem:
                if '下架' in status_elem or '删除' in status_elem:
                    data['当前状态'] = '已下架'
                elif '维护' in status_elem:
                    data['当前状态'] = '维护中'
                else:
                    data['当前状态'] = '在线'
            
            return data
            
        except Exception as e:
            print(f'爬取详情页失败 {work_url}: {e}')
            return {}
    
    def filter_by_date(self, works, start_year=2020, end_year=2025):
        """按日期筛选作品"""
        filtered = []
        for work in works:
            date_str = work.get('发布日期', '')
            if not date_str:
                continue
            
            try:
                # 处理不同日期格式
                if '天前' in date_str or '小时前' in date_str:
                    # 相对时间，视为最新
                    filtered.append(work)
                elif re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
                    year = int(date_str.split('-')[0])
                    if start_year <= year <= end_year:
                        filtered.append(work)
                elif re.match(r'^\d{2}-\d{2}$', date_str):
                    # 只有月 - 日，假设是近年
                    filtered.append(work)
            except:
                continue
        
        return filtered
    
    def run(self, target_count=100, sort_type='hot'):
        """执行爬取"""
        print(f'开始爬取 OWMod 地图工坊...')
        print(f'目标数量：{target_count} 个作品')
        print(f'排序方式：{sort_type}')
        
        page = 1
        while len(self.all_works) < target_count and page <= 20:  # 最多爬 20 页
            print(f'\n正在爬取第 {page} 页...')
            
            works = self.scrape_list_page(page, sort_type)
            
            if not works:
                print(f'第{page}页未获取到数据，可能已无更多页面')
                break
            
            # 过滤日期
            filtered_works = self.filter_by_date(works, 2020, 2025)
            self.all_works.extend(filtered_works)
            
            print(f'本页获取 {len(works)} 个作品，有效 {len(filtered_works)} 个 (2020-2025 年)，累计 {len(self.all_works)} 个')
            
            page += 1
            time.sleep(1)  # 礼貌爬取，间隔 1 秒
        
        # 如果还需要更多，爬取详情页补充信息
        if self.all_works:
            print(f'\n正在获取详细信息...')
            for i, work in enumerate(self.all_works[:target_count]):
                if work['链接']:
                    detail_info = self.scrape_work_detail(work['链接'])
                    work.update(detail_info)
                    
                    if (i + 1) % 10 == 0:
                        print(f'已更新 {i + 1}/{target_count} 个作品详情')
                    time.sleep(0.5)  # 详情页爬取间隔
        
        # 截取目标数量
        self.all_works = self.all_works[:target_count]
        
        return self.all_works
    
    def save_to_excel(self, filename='owmod_works.xlsx'):
        """保存为 Excel"""
        if not self.all_works:
            print('没有数据可保存')
            return
        
        df = pd.DataFrame(self.all_works)
        
        # 调整列顺序
        columns = ['作品 ID', '作品代码', '名称', '作者', '发布日期', '类型', '热度分数', '播放量', '点赞数', '当前状态', '链接']
        df = df[[col for col in columns if col in df.columns]]
        
        # 保存 Excel
        df.to_excel(filename, index=False, engine='openpyxl')
        print(f'\n✓ 已保存 {len(df)} 条数据到 {filename}')
        
        # 显示统计
        print(f'\n数据统计:')
        print(f'  总作品数：{len(df)}')
        type_counts = df['类型'].value_counts()
        print(f'  类型分布:')
        for t, c in type_counts.items():
            print(f'    {t}: {c} 个')
        
        return df


if __name__ == '__main__':
    scraper = OWModScraper()
    
    # 执行爬取
    works = scraper.run(target_count=100, sort_type='hot')
    
    # 保存 Excel
    if works:
        scraper.save_to_excel('owmod_works_2020-2025.xlsx')
        print(f'\n爬取完成！共 {len(works)} 个作品')
    else:
        print('\n爬取失败，未获取到数据')
