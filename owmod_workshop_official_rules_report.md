# 守望先锋地图工坊 (Workshop) 官方规则与权力博弈分析报告

## 检索时间
2026 年 4 月 9 日

## 信息来源说明
本报告所有信息均来自：
- 暴雪娱乐官方网站 (overwatch.blizzard.com)
- 暴雪官方论坛 (us.forums.blizzard.com)
- 暴雪法务页面 (blizzard.com/legal)
- 官方 YouTube 开发者视频
- 第三方工坊平台条款（引用暴雪政策）

---

## 一、官方工坊发布与定位

### 1.1 官方发布时间与渠道
**来源**: [Introducing the Overwatch Workshop - Blizzard Entertainment](https://overwatch.blizzard.com/en-us/news/22938941/introducing-the-overwatch-workshop/)
- **发布日期**: 2019 年 4 月 24 日
- **发布方**: Blizzard Entertainment
- **官方定义**: "The Workshop is a simplified game scripting system that expands the customization features available in the Game Browser."

### 1.2 官方功能描述
根据暴雪官网原文：
> "Within the Workshop, you'll create a Script to add Rules and unique play Conditions on top of the established Overwatch game modes you already know and love. Rules can do many things, like change how a hero's movement and abilities work, modify how players are damaged or healed, or even display text under certain circumstances."

**允许的创作范围**:
- 修改英雄移动和能力运作方式
- 修改玩家受伤或治疗机制
- 在特定条件下显示文本
- 在既定游戏模式基础上添加规则和独特玩法条件

### 1.3 官方开发者引导
**来源**: [Workshop Posting Guidelines - Dan Reed (Overwatch Developer)](https://us.forums.blizzard.com/en/overwatch/t/workshop-posting-guidelines/334929)

**发布者身份**: Dan Reed - Overwatch Developer (暴雪官方开发者，论坛 moderator)

**发布时间**: 2019 年 4 月 25 日

**官方表态**:
> "Welcome to the Workshop! We're looking forward to working with you to create new and exciting gameplay for Overwatch."
> "Feel free to post codes for your creations or share ideas with us about the future direction of this feature."

**官方提供的创作指引**:
1. 阅读官方博客文章
2. 查看编辑器内的详细说明文本
3. 使用自定义游戏预设中的工坊示例
4. 使用 Workshop Inspector 调试工具
5. 在论坛搜索是否已有解答
6. 分享代码以便开发者和社区帮助

---

## 二、官方明确规则与限制

### 2.1 所有权条款（核心权力博弈点）
**来源**: [Blizzard Custom Game Acceptable Use Policy](https://www.blizzard.com/en-us/legal/2749df07-2b53-4990-b75e-a7cb3610318b/custom-game-acceptable-use-policy)
**更新日期**: 2020 年 1 月 21 日

**关键条款原文**:
> **Ownership**: Custom Games are and shall remain the sole and exclusive property of Blizzard. Without limiting the foregoing, you hereby assign to Blizzard all of your rights, title, and interest in and to all Custom Games, including but not limited to any copyrights in the content of any Custom Games.

**权力分析**:
- 创作者**自动转让**所有权利给暴雪
- 包括版权在内的全部权利、所有权和利益
- 暴雪保留随时移除自定义游戏的权利
- 暴雪可要求创作者停止开发和分发

**后续条款**:
> "If for any reason you are prevented or restricted from assigning any rights in the Custom Games to Blizzard, you grant to Blizzard an exclusive, perpetual, worldwide, unconditional, royalty free, irrevocable license enabling Blizzard to fully exploit the Custom Games..."

**若无法转让权利则授予**:
- 独占性许可
- 永久性
- 全球范围
- 无条件
- 免版税
- 不可撤销

### 2.2 内容限制规则

**第三方可使用内容条款**:
> "You represent and warrant that neither the content you use to create or incorporate into any Custom Games, nor the compilation, arrangement or display of such content... infringes or will infringe any copyright, trademark, patent, trade secret or other intellectual property right of any third party."

**禁止内容**:
- 违法内容
- 侵权行为
- 诽谤性内容
- 淫秽内容
- 侵犯隐私内容
- 威胁、骚扰、仇恨内容

**暴雪保留权利**:
> "In the event that Blizzard learns of the existence of a third party claim related to a Custom Game, Blizzard reserves the right to remove or block the Custom Game from any Blizzard-owned platform."

### 2.3 商业利用禁令

**原文明确规定**:
> **Commercial Exploitation of Custom Games**: Unless otherwise authorized by Blizzard in writing, Custom Game developers cannot develop Custom Games for profit. Accordingly, a Custom Game cannot be sold, licensed, or rented by any party other than Blizzard, nor can the Custom Game contain features that would support purchase transactions of any tangible or intangible content.

**禁止事项**:
- 出售自定义游戏
- 许可自定义游戏
- 出租自定义游戏
- 包含任何购买交易功能

### 2.4 捐赠限制（有限度的权力让渡）

**官方允许但有严格限制**:
> "Blizzard recognizes that the time and resources needed to create a Custom Game can sometimes be substantial. Accordingly, Custom Game developers are permitted to fund their development costs through donations, subject to the following restrictions:"

**捐赠限制条件**:
1. 捐赠者不得获得游戏内特殊优势（私人访问、特殊关卡、图形标记、特殊文本、能力、单位等）
2. 公司、有限责任公司、合伙企业等不得出现在制作人员名单中，仅允许个人
3. 使用暴雪商标和版权内容需符合暴雪使用指南
4. 捐赠者的访问权限不得与公开发布前的访问挂钩
5. **暴雪保留单方面要求停止筹资的权利**

---

## 三、间接引导规则

### 3.1 技术架构引导

**官方工坊设计隐含引导**:
- 提供预设游戏模式作为基础
- 提供 8 个递增复杂度的示例
- 提供 Workshop Inspector 调试工具
- 提供代码分享功能（6 个月有效期）

**引导意图分析**:
- 鼓励在官方框架内创作
- 降低创作门槛以扩大参与度
- 通过工具标准化创作流程
- 代码时效性限制暗示临时性/实验性定位

### 3.2 社区规范引导

**来源**: Workshop.codes 条款（引用暴雪政策）
**链接**: https://workshop.codes/tos

**社区规则**（第三方平台执行暴雪政策）:
1. 内容必须尊重且适当
2. 禁止歧视性语言
3. 禁止 explicit 内容（血腥、色情、裸露、过度暴力）
4. 内容必须准确、相关、无误导
5. 仅可发布原创内容
6. 禁止敏感话题（政治、宗教）
7. 帖子必须包含有效导入代码
8. 禁止剽窃
9. 强烈不鼓励混淆代码
10. 强烈不鼓励 AI 生成内容

**关键引用**:
> "Posted Workshop content must abide by the Blizzard Custom Game Acceptable Use Policy and the Blizzard End User License Agreement"

### 3.3 官方论坛引导

**Dan Reed (Overwatch Developer) 在官方论坛的引导**:
> "If you're having issues with your script or have noticed bugs that you need help from devs or the community to resolve, please follow these guidelines before posting..."

**引导策略**:
- 鼓励自助解决问题
- 鼓励分享代码寻求帮助
- 提供系统化排错流程
- 建立开发者与创作者直接沟通渠道

---

## 四、权力博弈与动态平衡分析

### 4.1 权力结构

| 权力维度 | 官方权力 | 创作者权力 | 平衡机制 |
|---------|---------|-----------|---------|
| **所有权** | 完全所有（自动转让） | 无所有权，仅有创作权 | 创作者获得展示和分享平台 |
| **内容审查** | 单方面移除权 | 创作自由（在规则内） | 明确的内容规则边界 |
| **商业利用** | 独家商业化权利 | 禁止商业化（捐赠例外） | 允许有限捐赠维持创作 |
| **技术控制** | 平台控制权、代码有效期 | 技术创作自由 | 提供创作工具和文档 |
| **规则制定** | 单方面制定和修改 | 社区反馈渠道 | 论坛沟通和示例引导 |

### 4.2 博弈策略分析

**官方策略**:
1. **法律先行**: 通过 EULA 和 Custom Game Policy 确立绝对所有权
2. **技术赋能**: 提供强大但受限的创作工具
3. **社区共治**: 通过官方论坛和第三方平台执行规则
4. **弹性空间**: 允许捐赠、鼓励创作、提供指导
5. **最终裁量**: 保留"sole and absolute discretion"的最终决定权

**创作者策略**:
1. **边界试探**: 在规则允许范围内最大化创意
2. **社区协作**: 通过论坛和平台分享、互助
3. **声誉积累**: 通过优质作品获得社区认可
4. **间接变现**: 通过捐赠、引流等方式获得回报
5. **反馈影响**: 通过官方渠道影响功能发展方向

### 4.3 动态平衡表现

**平衡点 1: 知识产权**
- 官方获得：法律上的完全所有权
- 创作者获得：署名权、社区声誉、创作满足感
- 平衡机制：明确的规则让创作者预期可控

**平衡点 2: 商业利益**
- 官方获得：禁止第三方商业化，保留独家权利
- 创作者获得：允许捐赠维持创作热情
- 平衡机制：有限度的经济回报空间

**平衡点 3: 内容管控**
- 官方获得：单方面移除和封禁权力
- 创作者获得：明确规则内的创作自由
- 平衡机制：规则透明化，减少任意性

**平衡点 4: 技术发展**
- 官方获得：平台控制、功能迭代主导权
- 创作者获得：工具使用权、反馈渠道
- 平衡机制：官方示例和文档引导创作方向

### 4.4 潜在冲突点

1. **代码有效期**: 分享代码 6 个月后失效，影响创作传承
2. **区域限制**: 国服代码与国际服不互通
3. **混淆争议**: 官方"强烈不鼓励"但未禁止代码混淆
4. **AI 生成**: 新兴问题，官方政策尚未明确
5. **规则变更**: 官方保留单方面修改政策的权利

---

## 五、结论

### 5.1 官方立场总结

暴雪对工坊的官方定位是**"受控的创意沙盒"**：
- 鼓励创作但保留绝对控制权
- 提供工具但限制商业化
- 建立社区但执行官方规则
- 听取反馈但保持最终裁量

### 5.2 权力博弈特征

1. **不对称但透明**: 官方拥有绝对权力，但规则明确
2. **有限让渡**: 通过捐赠许可等有限方式让渡部分利益
3. **技术治理**: 通过工具设计间接引导创作方向
4. **社区缓冲**: 通过论坛和第三方平台缓解直接冲突

### 5.3 动态平衡可持续性

当前平衡的可持续因素：
- 规则透明度高，创作者预期稳定
- 官方提供实质性创作支持（工具、文档、示例）
- 保留适度的弹性空间（捐赠、反馈渠道）
- 社区自治减轻官方直接干预需求

潜在风险因素：
- 政策单方面修改权可能破坏信任
- 商业化禁令可能抑制高质量创作
- 代码有效期限制影响创作积累
- 新兴技术（如 AI）带来规则挑战

---

## 六、参考资料

### 官方来源
1. [Introducing the Overwatch Workshop](https://overwatch.blizzard.com/en-us/news/22938941/introducing-the-overwatch-workshop/) - 暴雪官网，2019 年 4 月 24 日
2. [Workshop Posting Guidelines](https://us.forums.blizzard.com/en/overwatch/t/workshop-posting-guidelines/334929) - 暴雪官方论坛，Dan Reed (Overwatch Developer)，2019 年 4 月 25 日
3. [Custom Game Acceptable Use Policy](https://www.blizzard.com/en-us/legal/2749df07-2b53-4990-b75e-a7cb3610318b/custom-game-acceptable-use-policy) - 暴雪法务，2020 年 1 月 21 日
4. [Blizzard End User License Agreement](https://www.blizzard.com/en-us/legal/fba4d00f-c7e4-4883-b8b9-1b4500a402ea/blizzard-end-user-license-agreement) - 暴雪法务
5. [Developer Update | The Workshop | Overwatch](https://www.youtube.com/watch?v=naPxnU2-4no) - 官方 YouTube 视频

### 第三方来源（引用官方政策）
6. [Workshop.codes Terms of Service](https://workshop.codes/tos) - 最后更新：2026 年 2 月 19 日
7. [Overwatch Wiki - Workshop](https://overwatch.fandom.com/wiki/Workshop)

---

**报告完成时间**: 2026 年 4 月 9 日
**检索工具**: 浏览器搜索 + 官方页面访问
**信息验证**: 所有核心条款均来自可验证的官方来源
