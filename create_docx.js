const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 },
        paragraph: { spacing: { line: 360, lineRule: "auto" } }
      }
    },
    paragraphStyles: [
      { 
        id: "Title", 
        name: "Title", 
        basedOn: "Normal",
        run: { size: 44, bold: true, color: "000000", font: "宋体" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER }
      },
      { 
        id: "Heading1", 
        name: "Heading 1", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 32, bold: true, color: "000000", font: "黑体" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 }
      },
      { 
        id: "Heading2", 
        name: "Heading 2", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 28, bold: true, color: "000000", font: "黑体" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 }
      },
      { 
        id: "Heading3", 
        name: "Heading 3", 
        basedOn: "Normal", 
        next: "Normal", 
        quickFormat: true,
        run: { size: 24, bold: true, color: "000000", font: "黑体" },
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: { 
      page: { 
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        size: { orientation: "portrait" }
      } 
    },
    children: [
      // Title
      new Paragraph({ 
        heading: HeadingLevel.TITLE, 
        children: [new TextRun({ text: "第一章 绪论", font: "宋体" })] 
      }),
      
      // Section 1.1
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "1.1 研究背景", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "数字技术的普及与互联网平台的发展，深刻改变了文化生产与消费的传统格局。用户不再是被动的内容接收者，而是积极参与到意义的创造与传播之中。亨利·詹金斯（Henry Jenkins）将这一现象概括为"参与式文化"（participatory culture）——一种具有低门槛、强支持、高连接特征的文化形态，模糊了生产者与消费者之间的边界 [1]。在这一文化转向中，游戏模组（game modding）作为一种典型的参与式实践，日益受到学界关注。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "游戏模组指玩家对既有游戏内容进行的修改与再创作，涵盖地图编辑、角色定制、机制调整等多种形式 [2]。从《毁灭战士》（DOOM）的早期模组社区，到《魔兽争霸 3》自定义地图的繁荣，再到《上古卷轴》《辐射》系列的官方模组支持，模组创作已成为游戏产业生态中不可忽视的力量。有研究指出，模组创作者的劳动具有双重属性：一方面是对原作的致敬与热爱表达，另一方面也可能被游戏公司无偿征用为"免费劳动"（free labour）[3]。这种张力在商业游戏与玩家创作的交界地带尤为突出。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "2017 年，暴雪娱乐在《守望先锋》中推出"地图工坊"（Workshop）功能，允许玩家使用可视化脚本工具自定义游戏规则 [4]。与传统的地图编辑器不同，地图工坊不仅支持地形与物件的摆放，更赋予玩家修改技能参数、调整游戏逻辑、创建全新玩法的能力。这一技术赋权迅速激发了玩家的创作热情：从简单的数值调整，到复杂的 RPG 地图、塔防模式、甚至是在《守望先锋》中复刻其他游戏的玩法，模组创作的边界不断拓展。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "然而，技术开放并不意味着创作的完全自由。暴雪官方对地图工坊设定了明确的规则边界：禁止创作涉及政治敏感、色情暴力、侵权内容的地图，同时保留对任何违规作品的下架权利 [5]。在实际运营中，规则的模糊性与执行的不确定性，使得创作者常常面临"越界"的风险。一些热门地图因"破坏游戏平衡"或"侵犯知识产权"被突然下架，创作者在社群中表达不满却又无可奈何。这类事件折射出平台治理与创作自由之间的深层矛盾。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "从更宏观的视角来看，《守望先锋》地图工坊的案例并非孤例。Roblox、Dreams、《我的世界》等平台化工具都在尝试类似的治理难题：如何在鼓励创作与维护秩序之间取得平衡？平台规则如何被创作者理解、接受或抵抗？创作者又如何在这一权力结构中争取自身的表达空间？这些问题构成了本研究的核心关切。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "本研究选择《守望先锋》地图工坊作为研究对象，主要基于以下考量：地图工坊代表了游戏模组创作的技术前沿，其可视化脚本系统降低了创作门槛，吸引了大量非专业玩家参与；暴雪作为老牌游戏厂商，其治理策略具有典型性与延续性，便于进行纵向比较；地图工坊社区活跃，争议事件频发，为观察规则协商提供了丰富的经验材料。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "通过对这一案例的深入分析，本研究期望揭示参与式文化下模组创作者的实践逻辑，以及他们与平台规则之间的复杂互动。这不仅有助于理解数字时代文化生产的演变趋势，也能为平台治理的设计提供实证依据。",
            font: "宋体"
          })
        ] 
      }),
      
      // Section 1.2
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "1.2 研究问题与研究意义", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.2.1 研究问题", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "基于上述背景，本研究聚焦于以下核心问题：在参与式文化视域下，《守望先锋》地图工坊的模组创作者如何进行规则的"盗猎"与"协商"？",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "围绕这一主问题，本研究进一步细化为四个子问题。模组创作者在创作过程中使用了哪些官方资源？这些使用行为如何构成对游戏规则的"盗猎"实践？这一问题关注创作实践的物质基础。地图工坊虽然提供了丰富的编辑工具，但其可调用的元素（英雄、技能、地图物件等）均来自官方设定。创作者如何在这些既定资源中进行选择、组合与改造？哪些使用方式被视为"合理借用"，哪些又可能被认定为"越界"？通过对热门模组的内容分析，本研究期望建立盗猎实践的类型学框架。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "平台通过哪些机制进行治理？规则的模糊地带在哪里？这一问题指向平台的治理逻辑。暴雪官方通过用户协议、社区准则、审核机制等技术 - 政策工具对地图工坊进行管理 [6]。然而，规则文本的抽象性与执行过程的情境性，往往留下解释空间。本研究将分析平台治理的多重手段，并识别那些"灰色地带"——规则未明确禁止但可能引发争议的行为。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "当遭遇规则冲突时，创作者采取哪些协商策略？这一问题关注创作者的能动性。面对作品下架、警告处罚等情境，创作者并非被动接受，而是可能采取顺从、规避、对抗或协商等不同策略 [7]。本研究将通过深度访谈，还原创作者的决策过程，揭示其背后的意义建构与资源动员。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "盗猎与协商实践对参与式文化生态有何意义？这一问题上升到理论层面。模组创作的规则博弈，折射出数字时代文化生产中的权力关系重构 [8]。通过分析这一微观过程，本研究期望与参与式文化、数字劳动、平台治理等理论对话，提出更具解释力的分析框架。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.2.2 研究意义", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在理论层面，本研究试图拓展盗猎理论的应用边界。詹金斯提出的"盗猎"（textual poaching）概念，原指粉丝对影视文本的挪用与再创作 [9]。本研究将这一概念延伸至互动游戏领域，提出"规则盗猎"的分析视角——创作者不仅盗猎文本内容，更盗猎游戏规则本身。这一拓展有助于理解互动媒介中粉丝创作的特殊性。同时，研究致力于丰富平台治理的微观研究。现有关于平台治理的研究多聚焦于内容审核、算法推荐等宏观机制 [10]，对具体创作场景中的规则协商关注不足。本研究通过深入地图工坊这一特定场域，揭示治理规则如何在日常实践中被解读、执行与挑战，为平台研究提供经验补充。此外，研究尝试整合参与式文化与数字劳动的理论对话。参与式文化研究强调粉丝的主动性与创造力 [11]，而数字劳动研究则关注平台资本对用户创作的征用 [3]。本研究试图在两者之间建立连接，分析创作者如何在"为爱发电"与"被剥削"的张力中定位自身，进而理解数字文化生产的复杂性。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在实践层面，本研究期望为平台设计提供参考。通过识别规则模糊地带与创作者的核心诉求，本研究可为地图工坊及类似平台的规则优化提供参考，促进治理的透明性与可预期性。研究将总结常见的规则风险点与应对策略，帮助创作者规避不必要的争议，更好地维护自身创作成果。模组创作是游戏生命周期的延长器，也是创新玩法的孵化器 [2]。理解创作者的动机与困境，有助于游戏公司建立更健康的 UGC（用户生成内容）生态，实现官方与社区的双赢。",
            font: "宋体"
          })
        ] 
      }),
      
      // Section 1.3
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "1.3 国内外研究现状", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.3.1 参与式文化与粉丝创作研究", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "参与式文化研究源于粉丝研究（fan studies）的传统。詹金斯在《文本盗猎者》（Textual Poachers）一书中，系统阐述了粉丝作为主动意义生产者的角色 [1]。他指出，粉丝并非被动接受主流文化产品，而是从中"盗猎"感兴趣的元素，进行拼贴、改写与再创作。这一观点挑战了当时将粉丝视为"文化傻瓜"的主流认知，为粉丝正名。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在《融合文化》（Convergence Culture）中，詹金斯进一步提出"参与式文化"的概念框架，将其定义为"具有相对较低的艺术表达与公民参与门槛、对创造与分享的高度支持、某种形式的非正式导师制、成员相信自身贡献具有价值、成员之间具有基本社会连接"的文化形态 [12]。这一定义成为后续研究的重要参照。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "数字技术的发展为参与式文化提供了新的物质基础。Delwiche 与 Henderson 编著的《参与式文化手册》收录了来自传播学、社会学、游戏研究等多学科的研究，展示了参与式文化在博客、维基、游戏模组、同人创作等领域的多样实践 [13]。其中，游戏模组因其技术复杂性与商业关联性，成为重点关注对象。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在游戏研究领域，模组创作被概念化为"产消者"（prosumer）实践的典型 [3]。Hong 指出，模组创作者兼具消费者与生产者的双重身份，其劳动既是对原作的热爱表达，也可能被游戏公司无偿征用 [2]。这种"玩工"（playbor）模糊了工作与娱乐的界限，成为数字劳动研究的重要议题。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "中国本土的粉丝研究起步较晚，但发展迅速。尹丽丽对中国在线粉丝社群的研究发现，数据化与算法逻辑正在重塑粉丝文化的组织形态 [14]。张雯与毛湛文对中国字幕组的研究则揭示了粉丝行动主义在中国语境下的特殊形态——通过翻译实践进行文化抵抗与身份建构 [15]。这些研究为理解中国玩家的模组创作提供了本土视角。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "然而，现有研究多聚焦于影视同人、字幕翻译等文本性创作，对游戏规则层面的盗猎关注不足。《守望先锋》地图工坊的特殊性在于，创作者不仅修改视觉内容，更直接调整游戏机制——这构成了对规则本身的盗猎。这一维度有待进一步探索。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.3.2 平台治理与规则协商研究", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "平台治理（platform governance）是近年来传播学与互联网研究的热点议题。Gorwa 等人将平台治理定义为"平台通过技术设计、政策制定、执行机制等手段管理用户行为与内容生态的过程" [16]。其中，内容审核（content moderation）是最受关注的治理实践。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在算法审核方面，Gillespie 指出，平台通过算法自动识别与删除违规内容，但这一过程面临准确性、透明度与公平性的挑战 [17]。Seering 的研究则强调，完全依赖算法审核可能忽视社群的自治能力，社区为基础的审核模型（community-based moderation）在某些情境下更为有效 [18]。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "针对游戏平台的治理研究相对较少。Walsdorff 对《上古卷轴》模组社区的研究发现，游戏公司通过法律威胁、经济诱导、技术限制等手段对模组创作进行管控，而创作者则通过隐藏作品、迁移平台、诉诸舆论等方式进行抵抗 [19]。这种"猫鼠游戏"反映了平台与用户之间的权力不对等。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "在规则协商方面，Jenkins 提出"协商式参与"（negotiated participation）的概念，认为粉丝与版权方之间存在持续的博弈过程 [20]。粉丝既非完全顺从，也非彻底对抗，而是在具体情境中进行策略性协商。这一视角为理解模组创作者的行为提供了理论工具。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "中国学者对平台治理的研究多聚焦于社交媒体与短视频平台。曾祥敏与 Kaye 对 TikTok 的研究发现，平台的可见性管理（visibility moderation）——通过流量分配而非直接删除来管控内容——成为一种新兴的治理策略 [21]。这一发现对理解游戏平台的推荐机制具有启发意义。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "然而，现有研究多从平台视角出发，对用户端的协商策略关注有限；研究对象以内容审核为主，对规则制定与执行过程的微观分析不足；缺乏对中国游戏社区特殊性的考察。本研究试图在这些方面进行补充。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.3.3 研究评述", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "综合现有研究，参与式文化研究从文本分析转向实践分析，早期研究关注粉丝创作的内容特征，近年来越来越多地关注创作过程、社群互动与平台关系 [13]；平台治理研究从宏观政策转向微观机制，学者开始关注算法审核的具体运作、审核员的劳动过程、用户的应对策略等 [16][18]；数字劳动研究从剥削批判转向复杂性分析，早期研究强调平台对用户劳动的无偿占有，近年研究开始关注劳动者的主体性、意义建构与策略空间 [19]。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "与此同时，研究领域仍存在若干空白：游戏规则层面的盗猎研究不足，现有盗猎理论多应用于影视同人、粉丝小说等文本创作 [9]，对游戏规则这一特殊对象的盗猎缺乏系统分析；中国游戏模组社区的本土研究稀缺，现有模组研究多以西方社区为对象 [2][19]，对中国玩家的创作实践、社群文化与规则认知缺乏深入了解；规则协商的过程性研究有限，现有研究多呈现协商的结果（如作品是否被保留），对协商过程的动态追踪不足 [20]。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "基于上述评述，本研究定位为：在参与式文化理论框架下，整合盗猎理论与平台治理视角，通过混合方法研究《守望先锋》地图工坊的规则盗猎与协商实践，贡献中国游戏社区的经验案例与理论反思。",
            font: "宋体"
          })
        ] 
      }),
      
      // Section 1.4
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "1.4 研究内容与研究方法", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.4.1 研究内容", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "本研究围绕"规则盗猎"与"协商"两个核心概念，展开四个层面的分析。盗猎实践的类型学分析通过对 100 个热门地图工坊模组的内容分析，识别创作者使用的官方资源类型（英雄技能、地图物件、游戏机制等），建立盗猎实践的分类框架，重点关注哪些元素被高频使用、哪些使用方式可能触及规则边界、不同类型的盗猎实践有何特征。平台治理机制的解构分析系统梳理暴雪官方对地图工坊的规则框架，包括用户协议、社区准则、审核流程等文本与制度，采用批判性话语分析方法，揭示规则文本中的修辞策略与权力预设，同时对比《魔兽争霸 3》地图编辑器、Roblox、Dreams 等类似平台，识别治理模式的共性与差异。创作者协商策略的过程分析通过对 15-20 位地图工坊创作者的深度访谈，还原其遭遇规则冲突时的决策过程，关注创作者如何解读官方规则、当作品被下架或警告时采取哪些应对策略、社群内部是否形成"民间规范"以及这些规范与官方规则如何互动。文化政治意义的理论分析将微观的经验发现与宏观的理论框架对话，分析盗猎与协商实践的文化政治意涵，重点关注这种实践如何重塑玩家与开发商的权力关系、对游戏产业的内容生产模式有何启示、参与式文化的未来走向如何。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.4.2 研究方法", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "本研究采用混合方法设计，结合质性研究与量化研究的优势，具体包括以下四种方法。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "深度访谈旨在理解创作者的动机、策略与意义建构过程。采用目的性抽样与滚雪球抽样相结合的方式，计划招募 15-20 位地图工坊创作者，抽样标准包括创作经验（新手<1 年、中级 1-3 年、资深>3 年）、作品类型（竞技地图、娱乐地图、叙事地图）以及作品热度（高播放量 vs 低播放量）。采用半结构化访谈提纲，涵盖创作历程与动机、对官方规则的理解与解读、遭遇规则冲突的经历、应对策略与协商过程、对未来的期望等主题。访谈通过线上视频（腾讯会议/Zoom）进行，时长 60-90 分钟，全程录音并转录。所有受访者签署知情同意书，研究中使用化名处理，隐去可识别信息，受访者有权随时退出研究或要求删除其数据。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "网络民族志旨在观察创作者社群的互动规范与文化实践。选择 2-3 个《守望先锋》地图工坊相关的 Discord 服务器、Reddit r/Overwatch 板块、NGA 守望先锋专区、暴雪官方论坛作为观察点。观察内容包括创作者之间的互动模式（合作、竞争、互助）、规则讨论与争议事件、民间规范的形成过程、与官方人员的互动。研究者每日撰写田野笔记，记录关键事件与观察心得，对重要讨论进行截图存档，建立事件日志，观察时间跨度为 3-6 个月。采用"参与式观察者"角色，适度参与社群讨论，但明确研究身份，避免欺骗性潜入。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "内容分析旨在系统分析模组作品的特征与盗猎模式。从《守望先锋》地图工坊热门作品榜中抽取 100 个模组，时间范围为 2020-2025 年，采用分层抽样，确保不同类型与热度的作品均有代表。建立包含以下维度的编码表：基础信息（名称、作者、发布日期、播放量、点赞数）、使用元素（英雄数量、技能修改程度、地图物件来源）、创新程度（机制创新、视觉创新、叙事创新，1-5 分量表）、规则边界（是否触及敏感内容、是否有争议）、官方回应（是否被推荐、是否被下架、是否有官方评论）。邀请另一位研究者对 20% 的样本进行独立编码，计算 Cohen's Kappa 系数，目标为>0.75。使用 Excel 进行描述性统计，使用 NVivo 14 进行质性编码。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "政策文本分析旨在解构平台规则的修辞与治理逻辑。文本来源包括《守望先锋》用户协议、暴雪社区行为准则、地图工坊创作指南、官方公告与开发者更新。采用 Fairclough 的批判性话语分析三维框架 [22]：文本维度分析词汇选择、句法结构、修辞策略；话语实践维度分析文本的生产、分配与消费过程；社会实践维度分析话语背后的权力关系与意识形态。分析步骤包括文本细读与标注、识别关键词与修辞策略、分析权力关系与意识形态预设、对比不同时期的政策变化并追踪话语演变。",
            font: "宋体"
          })
        ] 
      }),
      
      // Section 1.5
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "1.5 技术路线与创新点", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.5.1 技术路线", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "本研究的技术路线遵循"理论建构→数据收集→数据分析→理论对话"的逻辑。准备阶段（2025 年 11 月至 2025 年 12 月）完成文献综述，明确理论框架，设计研究方案，编制访谈提纲与编码表，提交伦理审查申请，获取 IRB 批准。预研究阶段（2026 年 1 月至 2026 年 2 月）进行 3-5 位创作者的试点访谈，检验访谈提纲的有效性，进行初步的网络观察，熟悉社群文化，根据预研究结果修订研究工具。正式数据收集阶段（2026 年 3 月至 2026 年 6 月）开展 15-20 位创作者的深度访谈，进行 3-6 个月的网络民族志观察，完成 100 个模组的内容分析编码，收集政策文本与官方公告。数据分析阶段（2026 年 7 月至 2026 年 8 月）对访谈转录稿进行主题分析，对田野笔记进行框架分析，对内容分析数据进行统计描述，整合多源数据，进行三角验证。论文写作阶段（2026 年 9 月至 2026 年 11 月）撰写初稿，整合研究发现，与理论框架对话，提炼理论贡献，根据导师意见进行修改。定稿与答辩阶段（2026 年 12 月至 2027 年 1 月）完成最终修改，准备答辩材料，进行论文答辩。",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        heading: HeadingLevel.HEADING_2, 
        children: [new TextRun({ text: "1.5.2 创新点", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "本研究的创新点体现在以下方面。理论创新方面，提出"规则盗猎"概念，现有盗猎理论多关注粉丝对文本内容的挪用 [1][9]，本研究将这一概念延伸至游戏规则层面，提出"规则盗猎"（rule poaching）的分析视角，规则盗猎指创作者对游戏机制、参数设定、逻辑结构等非文本元素的借用与改造，这一概念拓展了盗猎理论的应用边界，有助于理解互动媒介中粉丝创作的特殊性。模型创新方面，构建"协商光谱"模型，基于对创作者应对策略的系统分析，本研究提出"协商光谱"（negotiation spectrum）模型，将协商策略细分为五个连续类型：顺从（compliance）→规避（evasion）→协商（negotiation）→对抗（confrontation）→退出（exit），这一模型超越了简单的"顺从 - 抵抗"二元框架，更细致地捕捉创作者的策略多样性与情境依赖性。经验创新方面，贡献中国游戏社区的本土案例，现有模组研究多以西方社区为对象 [2][19]，本研究聚焦《守望先锋》中国社区，揭示本土玩家的创作实践、社群文化与规则认知，研究发现将丰富全球游戏研究的地理多样性，并为理解中国数字文化生态提供经验材料。方法创新方面，混合方法的整合应用，本研究结合深度访谈、网络民族志、内容分析与政策文本分析四种方法，实现微观 - 中观 - 宏观的多层次分析，多源数据的三角验证提升了研究的效度与信度，为游戏研究提供了方法示范。",
            font: "宋体"
          })
        ] 
      }),
      
      // References
      new Paragraph({ 
        heading: HeadingLevel.HEADING_1, 
        children: [new TextRun({ text: "参考文献", font: "黑体" })] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[1] Jenkins H. Textual poachers: Television fans and participatory culture[M]. Routledge, 2012. DOI: 10.4324/9780203114339.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[2] Hong R. Game modding, prosumerism and neoliberal labor practices[J]. International Journal of Communication, 2013, 7: 20.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[3] Hesmondhalgh D. User-generated content, free labour and the cultural industries[J]. ephemera, 2010, 10(3/4): 265-283.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[4] Blizzard Entertainment. Overwatch Workshop Custom Games[EB/OL]. (2017)[2026-04-07]. https://overwatch.blizzard.com.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[5] Blizzard Entertainment. Code of Conduct[EB/OL]. (2025)[2026-04-07]. https://www.blizzard.com/legal/code-of-conduct.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[6] Gorwa R, Binns R, Katzenbach C. Algorithmic content moderation: Technical and political challenges in the automation of platform governance[J]. Big Data & Society, 2020, 7(1): 2053951719897945.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[7] Jenkins H. Fandom, negotiation, and participatory culture[M]//A Companion to Media Fandom and Fan Studies. Wiley, 2018: 1-16. DOI: 10.1002/9781119237211.ch1.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[8] Van Dijck J. Governing digital societies: Private platforms, public values[J]. Computer Law & Security Review, 2020, 37: 105377.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[9] Jenkins III H. Star Trek rerun, reread, rewritten: Fan writing as textual poaching[J]. Critical Studies in Media Communication, 1988, 5(2): 85-107.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[10] Chen L, Tong T W, Tang S, et al. Governance and design of digital platforms: a review and future research directions on a meta-organization[J]. Journal of Management, 2022, 48(1): 141-173.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[11] Delwiche A, Henderson J J. The participatory cultures handbook[M]. Routledge, 2013. DOI: 10.4324/9780203117927.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[12] Jenkins H. Convergence culture: Where old and new media collide[M]. NYU Press, 2006.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[13] Delwiche A, Henderson J J. The participatory cultures handbook[M]. Routledge, 2013.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[14] Yin Y. An emergent algorithmic culture: The data-ization of online fandom in China[J]. International Journal of Cultural Studies, 2020, 23(5): 682-699.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[15] Zhang W, Mao C. Fan activism sustained and challenged: participatory culture in Chinese online translation communities[J]. Chinese Journal of Communication, 2013, 6(1): 45-61.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[16] Gorwa R, Binns R, Katzenbach C. Algorithmic content moderation: Technical and political challenges in the automation of platform governance[J]. Big Data & Society, 2020, 7(1): 2053951719897945.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[17] Gillespie T. Custodians of the internet: Platforms, content moderation, and the hidden decisions that shape social media[M]. Yale University Press, 2018.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[18] Seering J. Reconsidering self-moderation: the role of research in supporting community-based models for online content moderation[J]. Proceedings of the ACM on Human-Computer Interaction, 2020, 4(CSCW2): 1-28.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[19] Walsdorff F. Video game modding and money: From precarious playbor to reimbursed labor of love[J]. Media and Communication, 2022, 10(3): 258-267.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[20] Jenkins H. Fandom, negotiation, and participatory culture[M]//A Companion to Media Fandom and Fan Studies. Wiley, 2018: 1-16.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[21] Zeng J, Kaye D B V. From content moderation to visibility moderation: A case study of platform governance on TikTok[J]. Policy & Internet, 2022, 14(2): 321-341.",
            font: "宋体"
          })
        ] 
      }),
      
      new Paragraph({ 
        children: [
          new TextRun({ 
            text: "[22] Fairclough N. Discourse and social change[M]. Polity Press, 1992.",
            font: "宋体"
          })
        ] 
      })
    ]
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("C:\\Users\\shenyue05\\lobsterai\\project\\chapter1_introduction.docx", buffer);
  console.log("Document created successfully!");
}).catch((err) => {
  console.error("Error creating document:", err);
});
