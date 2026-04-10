import sys
import os

# Add docx skill to path
docx_skill_path = os.path.join(os.environ['APPDATA'], 'LobsterAI', 'SKILLs', 'docx')
sys.path.insert(0, docx_skill_path)

from scripts.document import Document

# Create document
doc = Document()

# Add title
doc.add_heading('第二章 概念定义与理论框架', level=1)

# Section 2.1
doc.add_heading('2.1 概念定义', level=1)
doc.add_heading('2.1.1 参与式文化', level=2)
doc.add_paragraph('参与式文化由亨利·詹金斯（Henry Jenkins）于 20 世纪 90 年代提出，用以描述一种具有低门槛、强支持、高连接特征的文化形态 [29]。在《融合文化》一书中，詹金斯将参与式文化定义为"具有相对较低的艺术表达与公民参与门槛、对创造与分享的高度支持、某种形式的非正式导师制、成员相信自身贡献具有价值、成员之间具有基本社会连接"的文化 [30]。这一定义强调了参与式文化的五个核心特征：低门槛的参与机制、社群内部的支持体系、非正式的知识传递、成员贡献的价值认可，以及基于社会关系的连接网络。')

doc.add_paragraph('数字技术的发展为参与式文化提供了新的物质基础。在网络化时代，参与式文化不再局限于特定的亚文化社群，而是渗透至日常生活的诸多层面 [31]。从博客写作、维基百科编辑，到游戏模组创作、同人小说发布，普通用户获得了前所未有的文化生产能力。这种转变模糊了生产者与消费者之间的传统边界，催生了"产消者"（prosumer）这一混合身份 [32]。参与式文化的兴起不仅改变了文化生产的技术条件，更重塑了文化权力的分配格局——受众从被动的意义接收者转变为主动的意义生产者，在挪用、改造、再创作的过程中争夺话语权 [33]。')

doc.add_heading('2.1.2 游戏模组', level=2)
doc.add_paragraph('游戏模组（game modding）指玩家对既有游戏内容进行的修改与再创作 [34]。根据修改范围与深度的不同，游戏模组可划分为多种类型：Scacchi 提出至少存在五种模组类型，包括用户自定义内容、游戏功能扩展、总转换模组（total conversion）、独立模组以及引擎模组 [35]。Postigo 将模组创作区分为"小型模组"（minor mods）与"大型模组"（major mods），前者指对游戏数值、外观等局部元素的调整，后者则涉及游戏机制、叙事结构的重构 [36]。')

doc.add_paragraph('从劳动性质来看，游戏模组具有双重属性。一方面，模组创作是玩家对原作的致敬与热爱表达，属于典型的粉丝实践 [37]。Sotamaa 的研究发现，模组创作者往往将自身定位为"媒体粉丝"，其创作动机源于对游戏世界的深度投入与情感依恋 [38]。另一方面，模组的免费劳动可能被游戏公司无偿征用，成为商业价值的来源 [39]。Nieborg 与 Van Der Graaf 指出，游戏公司通过提供模组工具，将部分开发工作外包给玩家社区，形成了一种"非市场游戏生产"的工业逻辑 [40]。这种张力使得游戏模组成为观察参与式文化与资本逻辑互动的理想场域。')

doc.add_heading('2.1.3 地图工坊', level=2)
doc.add_paragraph('《守望先锋》地图工坊（Overwatch Workshop）是暴雪娱乐于 2019 年推出的可视化脚本编辑系统，允许玩家自定义游戏规则与玩法 [41]。与传统的地图编辑器不同，地图工坊不仅支持地形与物件的摆放，更赋予玩家修改技能参数、调整游戏逻辑、创建全新玩法的能力。其核心技术特征包括：可视化脚本界面、预设触发器系统、变量与函数编辑、以及实时测试功能。')

doc.add_paragraph('地图工坊的推出标志着游戏模组创作的技术门槛进一步降低。传统模组创作通常需要掌握编程语言（如 C++、Lua）与专业工具，而地图工坊通过拖拽式界面与预设模板，使非专业玩家也能参与创作 [42]。这一技术赋权迅速激发了玩家的创作热情：从简单的数值调整，到复杂的 RPG 地图、塔防模式、甚至是在《守望先锋》中复刻其他游戏的玩法，模组创作的边界不断拓展。然而，技术开放并不意味着创作的完全自由——暴雪官方对地图工坊设定了明确的规则边界，禁止创作涉及政治敏感、色情暴力、侵权内容的地图，同时保留对任何违规作品的下架权利 [43]。规则的模糊性与执行的不确定性，使得创作者常常面临"越界"的风险，这为本研究探讨规则协商提供了丰富的经验材料。')

doc.add_heading('2.1.4 规则盗猎', level=2)
doc.add_paragraph('"盗猎"（poaching）概念源于詹金斯的粉丝研究，原指粉丝从主流文化文本中"盗猎"感兴趣的元素，进行拼贴、改写与再创作 [44]。在《文本盗猎者》一书中，詹金斯将粉丝描述为"游牧式的意义生产者"，他们并不拥有文本，却通过盗猎实践将文本转化为自身的文化资源 [45]。这一概念挑战了传统版权话语中将粉丝创作视为"衍生作品"或"侵权"的负面定位，转而强调其作为文化参与的正当性与创造性价值。')

doc.add_paragraph('本研究提出"规则盗猎"（rule poaching）的分析视角，将盗猎理论延伸至游戏规则层面。规则盗猎指创作者对游戏机制、参数设定、逻辑结构等非文本元素的借用与改造。与文本盗猎不同，规则盗猎的对象并非叙事内容或视觉符号，而是构成游戏体验的底层逻辑 [46]。在地图工坊的语境中，规则盗猎表现为：修改英雄技能数值、调整游戏胜利条件、重构玩家互动机制等实践。这些实践触及了游戏规则的核心——什么可以做、什么不可以做、如何做——从而构成了对官方规则体系的挪用与挑战。')

doc.add_paragraph('规则盗猎的合法性边界始终处于争议之中。一方面，游戏公司提供模组工具本身即意味着对某种程度盗猎的默许；另一方面，当盗猎行为触及商业利益或破坏游戏平衡时，官方往往介入干预 [47]。这种模糊性使得规则盗猎成为一种"灰色实践"——既非完全合法，也非彻底非法，而是在具体情境中通过协商确定其边界。')

# Section 2.2
doc.add_heading('2.2 相关理论', level=1)
doc.add_heading('2.2.1 盗猎理论', level=2)
doc.add_paragraph('盗猎理论由詹金斯在 1988 年发表的《星际迷航重播、重读、重写：粉丝写作作为文本盗猎》一文中首次系统阐述 [44]。詹金斯借用法国文化理论家德·塞托（Michel de Certeau）的"盗猎"隐喻，将粉丝阅读描述为一种"游牧式"的意义生产实践。德·塞托在《日常生活实践》中指出，弱势者通过"策略"（tactics）在强势者的领地中进行临时性占有，盗猎即是一种典型的策略 [48]。詹金斯将这一理论应用于粉丝研究，认为粉丝并不被动接受文本的"preferred reading"，而是主动选择、挪用、重构文本元素，生产出符合自身兴趣与需求的新意义。')

doc.add_paragraph('在《文本盗猎者》一书中，詹金斯进一步拓展了盗猎理论的分析维度 [45]。他考察了粉丝小说、粉丝视频、粉丝艺术等多种创作形式，揭示了盗猎实践的多样性：从对原文本的忠实延续，到激进的改写与重构；从个体创作，到社群协作。盗猎不仅是个体层面的意义生产，更是社群层面的文化积累——粉丝社群通过共享、讨论、评价盗猎作品，形成了一套独立于主流文化的评价体系与规范。')

doc.add_paragraph('数字时代的盗猎实践呈现出新的形态。Bennett 对数字粉丝文化的研究发现，当代粉丝不仅盗猎文本内容，更盗猎平台的技术功能与算法逻辑 [49]。通过"逆向工程"式的实践，粉丝挖掘隐藏的创作可能性，开辟自主的表达空间。这一转向意味着盗猎理论的分析框架需要从文本层面延伸至技术层面，关注创作者如何在与平台基础设施的互动中争夺创作自主权。本研究提出的"规则盗猎"概念，正是对这一理论转向的回应。')

doc.add_heading('2.2.2 产消者理论', level=2)
doc.add_paragraph('"产消者"（prosumer）概念由未来学家托夫勒（Alvin Toffler）于 1980 年提出，用以描述生产者与消费者身份的融合 [50]。在《第三次浪潮》中，托夫勒预言，随着生产技术的民主化，消费者将越来越多地参与到产品的设计与制造过程中。这一预言在数字时代成为现实：博客作者既是内容的消费者也是生产者，维基百科编辑既是知识的使用者也是贡献者，游戏模组创作者既是玩家也是开发者 [32]。')

doc.add_paragraph('在游戏研究领域，产消者理论被广泛应用于分析模组创作的经济与文化意涵。Kücklich 提出"玩工"（playbour）概念，指出模组创作模糊了游戏（play）与劳动（labour）的界限 [51]。模组创作者投入大量时间与精力进行创作，却通常不获得经济回报——这种"免费劳动"被游戏公司间接征用，延长了游戏的生命周期，增强了用户粘性，最终转化为商业价值。Postigo 的研究进一步揭示，模组创作不仅是经济剥削的对象，更是身份建构的实践 [36]。创作者通过模组作品展示技能、获得声望、建立社群关系，在"为爱发电"的过程中实现自我价值。')

doc.add_paragraph('产消者理论的批判性在于揭示参与式文化背后的权力不对等。平台提供创作工具、降低参与门槛，看似赋权用户，实则将生产风险与成本转嫁给创作者 [52]。当模组获得成功时，游戏公司可以将其收编为官方内容；当模组引发争议时，公司则可以"用户创作"为由推卸责任。这种"赢者通吃、输者自担"的逻辑，使得产消者在享受创作自由的同时，也承担着制度性风险。')

doc.add_heading('2.2.3 平台治理理论', level=2)
doc.add_paragraph('平台治理（platform governance）是近年来传播学与互联网研究的热点议题。Gorwa 将平台治理定义为"平台通过技术设计、政策制定、执行机制等手段管理用户行为与内容生态的过程" [53]。这一定义涵盖了平台治理的三个核心维度：技术治理（通过算法、界面设计引导用户行为）、政策治理（通过用户协议、社区准则设定规则）、以及执行治理（通过审核、处罚确保规则落实）。')

doc.add_paragraph('在平台治理的研究中，内容审核（content moderation）是最受关注的实践。Gillespie 指出，平台通过人工审核与算法审核相结合的方式，识别并删除违规内容 [54]。然而，这一过程面临准确性、透明度与公平性的挑战：审核标准往往模糊不清，审核决策缺乏申诉渠道，不同用户群体受到差别对待。Seering 的研究强调，完全依赖平台中心的审核可能忽视社群的自治能力，社区为基础的审核模型（community-based moderation）在某些情境下更为有效 [55]。')

doc.add_paragraph('针对游戏平台的治理研究相对较少。现有研究多聚焦于社交媒体与短视频平台，对游戏社区的特殊性关注不足 [56]。游戏平台的治理对象不仅包括用户生成的文本与图像内容，更涉及游戏规则、机制等非文本元素——这对传统的内容审核框架提出了挑战。此外，游戏公司与玩家之间的权力关系也更为复杂：公司既是规则制定者，也是游戏生态的利益相关者；玩家既是规则遵守者，也是游戏价值的共同创造者 [57]。这种复杂性使得游戏平台的治理实践呈现出独特的动态性，需要发展更具针对性的分析框架。')

doc.add_heading('2.2.4 协商理论', level=2)
doc.add_paragraph('协商理论源于政治学与社会学对民主决策过程的研究，强调通过对话、辩论、妥协达成共识 [58]。在媒介研究领域，协商概念被用于分析受众与媒体文本之间的互动关系。Hall 在《编码/解码》一文中提出，受众对媒体信息的解读存在三种立场：主导 - 霸权立场（dominant-hegemonic position）、协商立场（negotiated position）、以及对立立场（oppositional position） [59]。其中，协商立场指受众部分接受主导意识形态，但根据自身经验与利益进行选择性解读与改造。')

doc.add_paragraph('詹金斯将协商概念引入粉丝研究，提出"协商式参与"（negotiated participation）的分析视角 [60]。他认为，粉丝与版权方之间并非简单的对抗关系，而是存在持续的博弈过程。粉丝既非完全顺从，也非彻底抵抗，而是在具体情境中进行策略性协商：何时遵守规则、何时挑战边界、何时寻求合作，都取决于具体的权力配置与利益考量。这一视角超越了"收编 - 抵抗"的二元框架，更细致地捕捉了粉丝实践的复杂性。')

doc.add_paragraph('在平台化时代，协商理论需要进一步拓展。传统协商理论预设了相对平等的协商主体，但平台与用户之间的权力不对等使得协商往往呈现为"弱者的武器" [61]。用户通过规避、伪装、集体行动等策略，在有限的空间内争取自主权。本研究提出的"协商光谱"模型，正是试图捕捉这种策略多样性：从顺从到规避，从协商到对抗，从退出到重返，创作者在不同策略之间动态切换，形成复杂的协商实践图谱。')

# Section 2.3
doc.add_heading('2.3 当前研究存在的问题', level=1)
doc.add_heading('2.3.1 概念操作化不足', level=2)
doc.add_paragraph('现有研究对核心概念的操作化定义存在模糊性。以"参与式文化"为例，詹金斯的原始定义包含五个特征，但后续研究往往只选取其中部分特征作为操作化标准，导致研究结论的可比性受限 [30]。部分研究将任何形式的用户生成内容都归为参与式文化，忽视了"低门槛""社群支持""非正式导师制"等关键特征 [62]。这种概念泛化使得参与式文化成为一个"包罗万象"的标签，削弱了其解释力。')

doc.add_paragraph('在游戏模组研究中，概念操作化问题同样存在。"模组"一词被用于指称从简单数值调整到完全重构的各种实践，但不同类型模组的创作动机、技术门槛、法律风险存在显著差异 [35]。现有研究往往未对模组类型进行细致区分，导致结论的适用范围不明确。此外，地图工作为新兴的模组创作工具，其技术特征与治理逻辑尚未得到充分的概念化，多数研究仍沿用传统模组编辑器的分析框架，忽视了可视化脚本系统带来的新变化 [42]。')

doc.add_heading('2.3.2 理论整合有限', level=2)
doc.add_paragraph('现有研究在理论整合方面存在不足。盗猎理论、产消者理论、平台治理理论分别从不同角度分析了参与式文化的某一面向，但缺乏系统性的整合框架 [63]。盗猎理论强调粉丝的主动性与创造力，但对资本征用的机制分析不足；产消者理论揭示了免费劳动的剥削逻辑，但可能忽视创作者的主体性与意义建构；平台治理理论关注规则执行的技术与政策机制，但对用户端的协商策略关注有限 [53][55]。')

doc.add_paragraph('这种理论分割导致对同一现象的解释存在盲点。以地图工坊的规则协商为例：盗猎理论可以解释创作者为何挪用官方资源，但难以说明为何某些挪用被容忍而另一些被禁止；产消者理论可以分析游戏公司如何从免费创作中获利，但难以解释创作者为何持续参与；平台治理理论可以描述规则执行的技术手段，但难以捕捉创作者的日常应对策略 [47][57]。本研究试图通过整合盗猎理论与平台治理视角，构建更具解释力的分析框架，弥补现有研究的理论缺口。')

doc.add_heading('2.3.3 经验研究局限', level=2)
doc.add_paragraph('现有经验研究存在若干局限。从研究对象来看，多数模组研究聚焦于西方社区（如《上古卷轴》《毁灭战士》模组社区），对中国游戏模组社区的特殊性缺乏深入了解 [36][38]。中国玩家的创作实践、社群文化与规则认知可能呈现出独特的本土特征，但现有研究对此关注不足。从研究方法来看，现有研究多采用文本分析或访谈法，对创作者日常实践的民族志深描有限 [49]。规则协商往往是一个动态的、情境性的过程，但现有研究多呈现协商的结果（如作品是否被保留），对协商过程的动态追踪不足 [60]。')

doc.add_paragraph('此外，现有研究对非文本性盗猎的关注不足。多数盗猎研究聚焦于影视同人、粉丝小说等文本创作，对游戏规则、机制等非文本元素的盗猎缺乏系统分析 [44][45]。《守望先锋》地图工坊的特殊性在于，创作者不仅修改视觉内容，更直接调整游戏机制——这构成了对规则本身的盗猎。这一维度有待进一步探索。')

doc.add_heading('2.3.4 规范性研究缺失', level=2)
doc.add_paragraph('现有研究多为描述性分析，缺乏规范性研究。描述性研究回答"是什么"的问题，如模组创作的类型、动机、社群结构等；规范性研究则回答"应该是什么"的问题，如平台规则应如何设计、创作者权益应如何保护、治理透明度应如何提升等 [54]。现有研究对平台治理的批判多于建设性建议，导致研究成果难以转化为实际的政策改进 [56]。')

doc.add_paragraph('本研究试图在描述性分析的基础上，提出规范性的政策建议。通过识别规则模糊地带与创作者的核心诉求，本研究可为地图工坊及类似平台的规则优化提供参考，促进治理的透明性与可预期性。同时，研究将总结常见的规则风险点与应对策略，为创作者提供权益保护的实践指南。这种描述与规范相结合的研究取向，有助于 bridging 学术研究与社会实践之间的鸿沟。')

# References
doc.add_heading('参考文献', level=1)

references = [
    '[29] Jenkins H. Confronting the challenges of participatory culture: media education for the 21st century (Part Two)[J]. Nordic Journal of Digital Literacy, 2007, 2(2): 36-49.',
    '[30] Jenkins H. Convergence culture: Where old and new media collide[M]. NYU Press, 2006.',
    '[31] Jenkins H, Ito M. Participatory culture in a networked era: A conversation on youth, learning, commerce, and politics[M]. Polity Press, 2015.',
    '[32] Ritzer G, Jurgenson N. Production, consumption, prosumption: The nature of capitalism in the age of the digital \'prosumer\'[J]. Journal of Consumer Culture, 2010, 10(1): 13-36.',
    '[33] Delwiche A, Henderson J J. The participatory cultures handbook[M]. Routledge, 2013.',
    '[34] Scacchi W. Computer game mods, modders, modding, and the mod scene[J]. First Monday, 2010, 15(5).',
    '[35] Postigo H. Of mods and modders: Chasing down the value of fan-based digital game modifications[J]. Games and Culture, 2007, 2(4): 300-313.',
    '[36] Sotamaa O. When the game is not enough: Motivations and practices among computer game modding culture[J]. Games and Culture, 2010, 5(3): 239-255.',
    '[37] Hong R. Game modding, prosumerism and neoliberal labor practices[J]. International Journal of Communication, 2013, 7: 20.',
    '[38] Nieborg D B, Van Der Graaf S. The mod industries? The industrial logic of non-market game production[J]. European Journal of Cultural Studies, 2008, 11(2): 177-195.',
    '[39] Blizzard Entertainment. Overwatch Workshop Custom Games[EB/OL]. (2019)[2026-04-07]. https://overwatch.blizzard.com.',
    '[40] Guzdial M, Liao N, Chen J, et al. Friend, collaborator, student, manager: How design of an ai-driven game level editor affects creators[C]//CHI. 2019: 1-13.',
    '[41] Blizzard Entertainment. Code of Conduct[EB/OL]. (2025)[2026-04-07]. https://www.blizzard.com/legal/code-of-conduct.',
    '[42] Jenkins H. Textual poachers: Television fans and participatory culture[M]. Routledge, 2012.',
    '[43] Jenkins III H. Star Trek rerun, reread, rewritten: Fan writing as textual poaching[J]. Critical Studies in Media Communication, 1988, 5(2): 85-107.',
    '[44] Bennett L. Tracing textual poachers: Reflections on the development of fan studies and digital fandom[J]. Journal of Fandom Studies, 2014, 2(1): 5-24.',
    '[45] Toffler A. The third wave[M]. Bantam Books, 1980.',
    '[46] Kücklich J. Precarious playbour: Modders and the digital games industry[J]. Fibreculture Journal, 2005, 5: 1-5.',
    '[47] Van Dijck J, Poell T, De Waal M. The platform society: Public values in a connective world[M]. Oxford University Press, 2018.',
    '[48] Gorwa R. What is platform governance?[J]. Information, Communication & Society, 2019, 22(6): 854-871.',
    '[49] Gillespie T. Custodians of the internet: Platforms, content moderation, and the hidden decisions that shape social media[M]. Yale University Press, 2018.',
    '[50] Seering J. Reconsidering self-moderation: the role of research in supporting community-based models for online content moderation[J]. Proceedings of the ACM on Human-Computer Interaction, 2020, 4(CSCW2): 1-28.',
    '[51] DeNardis L, Hackl A M. Internet governance by social media platforms[J]. Telecommunications Policy, 2015, 39(9): 761-770.',
    '[52] Flew T, Martin F, Suzor N. Internet regulation as media policy: Rethinking the question of digital communication platform governance[J]. Journal of Digital Media & Policy, 2019, 10(1): 33-50.',
    '[53] Dryzek J S. Deliberative democracy and beyond: Liberals, critics, contestations[M]. Oxford University Press, 2000.',
    '[54] Hall S. Encoding/decoding[C]//Culture, Media, Language. Hutchinson, 1980: 128-138.',
    '[55] Jenkins H. Fandom, negotiation, and participatory culture[M]//A Companion to Media Fandom and Fan Studies. Wiley, 2018: 1-16.',
    '[56] Scott J C. Weapons of the weak: Everyday forms of peasant resistance[M]. Yale University Press, 1985.',
    '[57] Meyer M D E, Tucker M H L. Textual poaching and beyond: Fan communities and fandoms in the age of the internet[J]. The Review of Communication, 2007, 7(2): 201-205.'
]

for ref in references:
    doc.add_paragraph(ref)

# Save document
output_path = r'C:\Users\shenyue05\lobsterai\project\chapter2_theory.docx'
doc.save(output_path)
print(f'Document saved to {output_path}')
