# FPSTI - FPS 人格类型指标测试

🎮 一个基于HTML/JavaScript的FPS游戏玩家人格类型测试，包含16种独特人格类型。

## 🌐 在线访问

### 主部署链接
- **GitHub Pages (推荐)**：https://th3nding.github.io/fpsti-quiz/
- **Cloudflare Pages**：https://fpsti-quiz.pages.dev/ (待部署)
- **备用链接**：https://th3nding.github.io/fpsti-quiz/fpsti_quiz_lite.html
- **Vercel部署**：https://fpsti-quiz.vercel.app/ (待重新配置)

### GitHub 仓库
- **源码仓库**：https://github.com/th3nding/fpsti-quiz

## 🎯 项目特性

- **25道原创题目**：针对FPS游戏场景设计
- **16种人格类型**：14种普通类型 + 2种隐藏类型
- **精美界面**：响应式设计，支持桌面和移动端
- **实时统计**：显示A/B/C/D选项分布比例
- **一键重测**：随时重新开始测试

## 🧪 16种人格类型

| 类型代码 | 中文名称 | 显示标题 | 获取条件 |
|----------|----------|----------|----------|
| HACKER | 转起来了 | HACKER | A≥90% |
| VWO10 | 姜太公 | OFFLINE | 均衡分布 (30%≤A<50%, 20%≤B≤40%, C≥15%, D≥15%) |
| GOAT | 山羊 | GOAT | A≥60%且D≥20% |
| BANG | 颗秒 | BANG↓BANG↓BANG↓BANG↑ | A≥60%且D<20% |
| BABABOOEY | 粑粑博弈 | BABABOOEY | B≥50%且A≥30% |
| BRIDGE | 桥梁之主 | BRIDGE-OWNER | B≥50%且D≥20%且A<30% |
| LAOLIU | 老六 | LAOLIU | B≥50%且D<20%且A<30% |
| MACARTHUR | 五星上将 | MacArthur | C/D≥40%且D≥C且A≥30% |
| KKJJHHB | 交际者 | KKJJHHB | C/D≥40%且D≥C且A<30% |
| ONESHOT | timing侠 | ONE SHOT | C/D≥40%且D<C且B≥30% |
| CALMMIND | 抗压王 | CALM MIND | C/D≥40%且D<C且B<30% |
| RUSHB | 跑男 | RUSH B | A≥40%且B≥30% |
| HORSESHOOTER | 马枪怪 | HORSE-SHOOTER | B≥30%且C≥30% |
| DANCE | 漫游者 | ↑↓↑→←→←→ | C≥30%且D≥30% |
| STRESSM | 压力怪 | STRESS-M | A≥30%且D≥30% |
| SHRIMP | 不是哥们 | SHRIMP | A≥35% |

## 📁 项目结构

```
fpsti-quiz/
├── index.html              # 主HTML文件（最新版本）
├── fpsti_quiz_lite.html    # 旧版HTML文件
├── images/                 # 16种人格类型图片
│   ├── 颗秒.png
│   ├── 老六.png
│   ├── timing 侠.png
│   ├── 粑粑博弈.png
│   ├── 五星上将.png
│   ├── 交际者.png
│   ├── 漫游者.png
│   ├── 跑男.png
│   ├── 山羊.png
│   ├── 不是哥们.png
│   ├── 桥梁之主.png
│   ├── 抗压王.png
│   ├── 压力怪.png
│   ├── 马枪怪.png
│   ├── 转起来了.png
│   └── 姜太公.png
├── _redirects              # Cloudflare Pages重定向规则
├── _headers                # Cloudflare Pages缓存头配置
├── .gitignore              # Git忽略文件
└── README.md               # 本说明文件
```

## 🔧 本地运行

1. 克隆仓库：
   ```bash
   git clone https://github.com/th3nding/fpsti-quiz.git
   ```

2. 直接在浏览器中打开 `index.html`

## 📊 部署状态

### GitHub Pages
- ✅ 自动部署：推送代码后自动更新
- ✅ 最新版本：使用 `index.html` 作为入口
- ✅ 访问正常：https://th3nding.github.io/fpsti-quiz/

### Cloudflare Pages
- ⚠️ 待部署：需要连接GitHub仓库或上传文件
- 📝 部署指南：见下方Cloudflare Pages部署说明

### Vercel
- ⚠️ 待重新配置：中文文件夹名称可能导致部署问题
- 🔄 建议：将 `人物` 文件夹重命名为 `images`（已完成）

## 🚀 Cloudflare Pages 部署

Cloudflare Pages 提供快速、全球分布的静态网站托管服务。以下是两种部署方式：

### 方式一：通过GitHub仓库自动部署（推荐）
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 **Pages** → **Create a project**
3. 选择 **Connect to Git** → 授权访问GitHub账户
4. 选择仓库：`th3nding/fpsti-quiz`
5. 配置构建设置：
   - **Framework preset**: `None`（纯静态站点）
   - **Build command**: （留空，不需要构建）
   - **Build output directory**: `/`（根目录）
6. 点击 **Save and Deploy**
7. 部署完成后，获得URL：`https://fpsti-quiz.pages.dev/`

### 方式二：手动上传文件
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择 **Pages** → **Create a project**
3. 选择 **Direct Upload**
4. 将以下文件/文件夹拖入上传区域：
   - `index.html`
   - `images/` 文件夹
   - `_redirects` 文件（用于SPA路由）
   - `_headers` 文件（用于缓存控制）
5. 点击 **Deploy site**

### 配置文件说明
- **`_redirects`**: 确保所有路由重定向到 `index.html`，支持单页应用
- **`_headers`**: 优化缓存策略，提高加载速度

### 故障排除

#### 构建失败问题
如果之前构建失败，请检查以下配置：

1. **移除 Node.js 依赖**：
   - 项目已移除 `package.json` 和 `package-lock.json`，确保 Cloudflare Pages 不会尝试安装依赖
   - 如果重新添加这些文件，构建可能会失败

2. **正确构建设置**：
   - **Framework preset**: 必须设置为 `None`
   - **Build command**: 留空（不需要构建步骤）
   - **Build output directory**: `/`（根目录）

3. **重新部署**：
   - 在 Cloudflare Pages 项目中，进入 **Settings** → **Builds & deployments**
   - 点击 **Retry deployment** 或 **Clear cache & retry deploy**

#### 文件大小限制
- Cloudflare Workers 单个资源大小限制为 25 MiB
- 本项目所有图片文件均小于此限制，可以正常部署

### 自定义域名（可选）
1. 在Pages项目设置中选择 **Custom domains**
2. 添加你的域名并按照提示配置DNS

## ✨ 最新更新

### 2026-04-10
- ✅ 修复HTML编码乱码问题
- ✅ 修复JavaScript语法错误（questions数组）
- ✅ 更新图片路径：`人物/` → `images/`
- ✅ 文本优化：更新类型名称和描述
- ✅ 功能完善：确保所有16种类型计算逻辑正确
- ✅ 优化Cloudflare Pages部署：移除package.json依赖，添加配置文件

### 主要修复内容
1. **乱码修复**：解决UTF-8/GBK双重编码问题
2. **语法修复**：修复25个题目对象的JSON语法
3. **路径统一**：所有图片路径标准化
4. **类型更新**：`BABABOOEY/88BO1` → `BABABOOEY`

## 📝 使用说明

1. 点击"开始测试"按钮
2. 回答25道FPS游戏场景相关题目
3. 查看你的人格类型结果
4. 可点击"重新测试"进行多次测试

## ⚠️ 免责声明

* 本测试仅供娱乐，无任何科学依据
* 结果不代表真实的性格或能力评估
* 请勿将测试结果用于正式评估或决策

## 🤝 贡献

欢迎提交Issue或Pull Request来改进项目。

## 📄 许可证

MIT License - 详见LICENSE文件（如存在）

---

**最后更新**：2026-04-10  
**项目状态**：✅ 功能完整，部署正常