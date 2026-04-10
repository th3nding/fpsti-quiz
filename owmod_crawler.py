import requests
from bs4 import BeautifulSoup
import json
import time
import random
import pandas as pd
from datetime import datetime

class OWModCrawler:
    def __init__(self):
        self.base_url = "https://www.owmod.net"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        })
        self.maps = []
    
    def get_work_list_page(self, page_num):
        """获取作品列表页面"""
        url = f"{self.base_url}/work/list/all?page={page_num}&sort=hot"
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"获取第{page_num}页失败：{e}")
            return None
    
    def parse_work_list(self, html):
        """解析作品列表页面"""
        soup = BeautifulSoup(html, 'html.parser')
        works = []
        
        # 查找所有作品卡片
        work_cards = soup.find_all('div', class_='work-card')
        
        for card in work_cards:
            try:
                # 提取基本信息
                title_elem = card.find('div', class_='title')
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                link = title_elem.find('a')
                if not link or not link.get('href'):
                    continue
                
                work_url = link.get('href')
                work_id = work_url.split('/')[-1] if work_url else None
                
                # 作者信息
                author_elem = card.find('div', class_='author')
                author = author_elem.get_text(strip=True) if author_elem else None
                
                # 热度
                hot_elem = card.find('span', class_='hot')
                hot_value = hot_elem.get_text(strip=True) if hot_elem else None
                
                # 发布日期
                date_elem = card.find('span', class_='date')
                publish_date = date_elem.get_text(strip=True) if date_elem else None
                
                # 描述
                desc_elem = card.find('div', class_='desc')
                description = desc_elem.get_text(strip=True) if desc_elem else None
                
                # 代码
                code_elem = card.find('div', class_='code')
                code = code_elem.get_text(strip=True) if code_elem else None
                
                works.append({
                    'id': work_id,
                    'title': title,
                    'author': author,
                    'hot_value': hot_value,
                    'publish_date': publish_date,
                    'description': description,
                    'code': code,
                    'url': work_url
                })
            except Exception as e:
                print(f"解析作品卡片失败：{e}")
                continue
        
        return works
    
    def get_work_detail(self, work_id):
        """获取作品详情页面"""
        url = f"{self.base_url}/work/view/{work_id}"
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"获取作品{work_id}详情失败：{e}")
            return None
    
    def parse_work_detail(self, html):
        """解析作品详情页面"""
        soup = BeautifulSoup(html, 'html.parser')
        
        try:
            # 提取更详细的信息
            detail = {}
            
            # 播放量
            views_elem = soup.find('span', class_='views')
            detail['views'] = int(views_elem.get_text(strip=True).replace(',', '')) if views_elem else 0
            
            # 点赞数
            likes_elem = soup.find('span', class_='likes')
            detail['likes'] = int(likes_elem.get_text(strip=True).replace(',', '')) if likes_elem else 0
            
            # 类型（娱乐/竞技/叙事/技能训练）
            type_elem = soup.find('span', class_='type')
            type_map = {
                '休闲': '娱乐',
                '竞技': '竞技',
                '叙事': '叙事',
                '练习': '技能训练',
                '竞速': '娱乐',
                '其他': '娱乐'
            }
            work_type = type_elem.get_text(strip=True) if type_elem else '其他'
            detail['type'] = type_map.get(work_type, '娱乐')
            
            # 当前状态（是否可用）
            status_elem = soup.find('span', class_='status')
            detail['status'] = status_elem.get_text(strip=True) if status_elem else '正常'
            
            return detail
        except Exception as e:
            print(f"解析作品详情失败：{e}")
            return {}
    
    def crawl_all_pages(self, max_pages=144):
        """爬取所有页面"""
        print(f"开始爬取，共{max_pages}页...")
        
        for page in range(1, max_pages + 1):
            print(f"正在爬取第{page}页...")
            
            html = self.get_work_list_page(page)
            if not html:
                continue
            
            works = self.parse_work_list(html)
            self.maps.extend(works)
            
            print(f"第{page}页获取到{len(works)}个作品，累计{len(self.maps)}个")
            
            # 随机延迟，避免请求过快
            time.sleep(random.uniform(1, 3))
            
            # 每爬取一定数量保存一次
            if page % 10 == 0:
                self.save_intermediate()
        
        print(f"爬取完成，共获取{len(self.maps)}个作品")
        return self.maps
    
    def save_intermediate(self):
        """保存中间结果"""
        df = pd.DataFrame(self.maps)
        df.to_csv('owmod_maps_intermediate.csv', index=False, encoding='utf-8-sig')
        print(f"已保存中间结果到 owmod_maps_intermediate.csv")
    
    def enrich_data(self):
        """丰富数据 - 获取详情页面的播放量和点赞数"""
        print("开始获取详细信息...")
        
        for i, work in enumerate(self.maps):
            if i % 10 == 0:
                print(f"处理进度：{i}/{len(self.maps)}")
            
            if work.get('id'):
                detail_html = self.get_work_detail(work['id'])
                if detail_html:
                    detail = self.parse_work_detail(detail_html)
                    work['views'] = detail.get('views', 0)
                    work['likes'] = detail.get('likes', 0)
                    work['type'] = detail.get('type', '娱乐')
                    work['status'] = detail.get('status', '正常')
                
                time.sleep(random.uniform(0.5, 1.5))
        
        return self.maps
    
    def filter_by_date_range(self, start_year=2020, end_year=2025):
        """按年份筛选"""
        filtered = []
        for work in self.maps:
            try:
                date_str = work.get('publish_date', '')
                if date_str:
                    # 尝试解析日期
                    if '-' in date_str:
                        year = int(date_str.split('-')[0])
                    else:
                        year = None
                    
                    if year and start_year <= year <= end_year:
                        filtered.append(work)
            except:
                continue
        
        print(f"筛选后({start_year}-{end_year}年)：{len(filtered)}个作品")
        return filtered
    
    def stratified_sampling(self, n_high=33, n_mid=33, n_low=34):
        """分层抽样"""
        # 按热度排序
        sorted_maps = sorted(
            [m for m in self.maps if m.get('hot_value')],
            key=lambda x: float(x['hot_value'].replace(',', '')) if x['hot_value'] else 0,
            reverse=True
        )
        
        total = len(sorted_maps)
        
        # 分层：前 10% 高热度，中间 10%-90% 中热度，后 10% 低热度
        high_threshold = int(total * 0.1)
        low_threshold = int(total * 0.9)
        
        high_hot = sorted_maps[:high_threshold]
        mid_hot = sorted_maps[high_threshold:low_threshold]
        low_hot = sorted_maps[low_threshold:]
        
        print(f"分层结果：高热度{len(high_hot)}个，中热度{len(mid_hot)}个，低热度{len(low_hot)}个")
        
        # 随机抽样
        import random
        sampled = []
        
        if len(high_hot) >= n_high:
            sampled.extend(random.sample(high_hot, n_high))
        else:
            sampled.extend(high_hot)
        
        if len(mid_hot) >= n_mid:
            sampled.extend(random.sample(mid_hot, n_mid))
        else:
            sampled.extend(mid_hot)
        
        if len(low_hot) >= n_low:
            sampled.extend(random.sample(low_hot, n_low))
        else:
            sampled.extend(low_hot)
        
        print(f"抽样完成：共{len(sampled)}个作品")
        return sampled
    
    def save_to_excel(self, data, filename='owmod_maps_sampled.xlsx'):
        """保存到 Excel"""
        df = pd.DataFrame(data)
        
        # 整理列顺序
        columns = ['id', 'title', 'author', 'publish_date', 'type', 'views', 'likes', 'status', 'hot_value', 'code', 'description', 'url']
        df = df[[col for col in columns if col in df.columns]]
        
        # 重命名列
        column_names = {
            'id': '作品 ID',
            'title': '名称',
            'author': '作者',
            'publish_date': '发布日期',
            'type': '类型',
            'views': '播放量',
            'likes': '点赞数',
            'status': '当前状态',
            'hot_value': '热度',
            'code': '代码',
            'description': '描述',
            'url': '链接'
        }
        df = df.rename(columns=column_names)
        
        df.to_excel(filename, index=False, encoding='utf-8-sig')
        print(f"已保存到 {filename}")
        return filename


def main():
    crawler = OWModCrawler()
    
    # 爬取所有页面
    crawler.crawl_all_pages(max_pages=144)
    
    # 保存原始数据
    df = pd.DataFrame(crawler.maps)
    df.to_csv('owmod_maps_all.csv', index=False, encoding='utf-8-sig')
    print(f"原始数据已保存到 owmod_maps_all.csv ({len(crawler.maps)}个作品)")
    
    # 按年份筛选
    filtered = crawler.filter_by_date_range(2020, 2025)
    
    # 分层抽样
    sampled = crawler.stratified_sampling(n_high=33, n_mid=33, n_low=34)
    
    # 保存抽样结果
    crawler.save_to_excel(sampled, 'owmod_maps_sampled.xlsx')
    
    print("\n爬取和抽样完成！")
    print(f"最终抽样：{len(sampled)}个作品")


if __name__ == '__main__':
    main()
