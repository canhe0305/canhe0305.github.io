// 作品全量元数据
const worksData = [
    { 
        slug: 'obedience-play',
        name: 'Obedience Play',
        nameZh: 'Obedience Play',
        nameEn: 'Obedience Play', 
        year: 2025,
        type: 'Performative Technological Apparatus',
        typeZh: '表演性技术装置',
        theory: 'material',
        theoryZh: '物质',
        keywords: ['Non-human Agency', 'Technological Domestication', 'Resistance'],
        keywordsZh: ['非人类能动性', '技术驯化', '抵抗'],
        image: 'img/art work/Obedience Play/Obedience Play-icon.png',
        x: 0.25, y: 0.25, // 左上角：复杂雕塑/建筑片段
        indexNote: 'Reconfiguring the mythological Fire Horse into a performative apparatus that interrupts efficiency-driven service logic through clumsy, emotionalized responses.',
        indexNoteZh: '将神话中的火马重新配置为一个表演性装置，通过笨拙、情感化的反应来中断效率驱动的服务逻辑。',
        indexStatement: 'Obedience Play reconfigures the mythological figure of the Fire Horse—traditionally associated with speed, power, and inevitable domestication—into a performative technological apparatus.',
        indexStatementZh: '《Obedience Play》将火马这一神话形象——传统上与速度、力量和不可避免的驯化相关联——重新配置为一个表演性技术装置。',
        systemStructure: {
            input: 'Temperature, humidity, environmental noise',
            inputZh: '温度、湿度、环境噪音',
            processing: 'Emotionalized response algorithms, deliberate malfunction logic',
            processingZh: '情感化响应算法，故意故障逻辑',
            output: 'Performative behaviors, kinetic movement, sensory feedback',
            outputZh: '表演性行为、动态运动、感官反馈',
            failure: 'Intentional delay and clumsy resistance as form of agency'
        },
        systemStructureZh: {
            input: '温度、湿度、环境噪音',
            processing: '情感化响应算法，故意故障逻辑',
            output: '表演性行为、动态运动、感官反馈',
            failure: '以故意延迟和笨拙抵抗作为能动性形式'
        },
        formalConfig: [
            'Fire Horse as bodily technological entity',
            'Sensing apparatus for environmental stimuli',
            'Interruption of frictionless environments'
        ],
        formalConfigZh: [
            '火马作为身体化的技术实体',
            '环境刺激的感知装置',
            '对无摩擦环境的打断'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['newman', 'where-is-the-price']
    },
    { 
        slug: 'where-is-the-price',
        name: 'Where Is the Price',
        nameZh: '代价在哪里',
        nameEn: 'Where Is the Price', 
        year: 2025,
        type: 'Installation',
        typeZh: '装置',
        theory: 'material',
        theoryZh: '物质',
        keywords: ['Material', 'AI', 'Infrastructure'],
        keywordsZh: ['物质', '人工智能', '基础设施'],
        image: 'img/art work/where is the price/where is the price-icon.jpg',
        x: 0.5, y: 0.5, // 中中心：三联画（深色雕塑+白色面板）- 中心位置
        indexNote: 'Exposing the invisible labor and material exploitation underlying AI through visual maps, sculptural forms, and animation.',
        indexNoteZh: '通过视觉地图、雕塑形式和动画，揭示支撑人工智能的隐形劳动和物质剥削。',
        indexStatement: 'This work maps out the global and uneven division of labor that sustains AI\'s material infrastructure—from rare metal extraction to chip manufacturing to data center operation.',
        indexStatementZh: '这件作品绘制了支撑人工智能物质基础设施的全球且不平等的劳动分工——从稀土开采到芯片制造再到数据中心运营。',
        systemStructure: {
            input: 'Global supply chain data, rare earth mineral flows, data center locations',
            processing: 'Cartographic reorientation, de-urbanization mapping strategy',
            output: 'Visual maps, sculptural forms, animation (200×400×100 cm)',
            failure: 'The obscured material costs of "cloud-based intelligence"'
        },
        systemStructureZh: {
            input: '全球供应链数据、稀土矿物流动、数据中心位置',
            processing: '制图重新定位、去城市化映射策略',
            output: '视觉地图、雕塑形式、动画（200×400×100 厘米）',
            failure: '"云端智能"被遮蔽的物质成本'
        },
        formalConfig: [
            'North-south oriented cartographic structure',
            'Anthropomorphic AI sculptures',
            'Animated flows of extracted materials'
        ],
        formalConfigZh: [
            '南北向的制图结构',
            '拟人化的人工智能雕塑',
            '提取材料的动画流动'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['newman', 'obedience-play']
    },
    { 
        slug: 'newman',
        name: 'New Man',
        nameZh: '新人',
        nameEn: 'New Man', 
        year: 2025,
        type: 'Digital Sculpture',
        typeZh: '数字雕塑',
        software: 'Blender',
        size: 'Print at any time, with no size limit',
        sizeZh: '随时可打印，无尺寸限制',
        theory: 'material',
        theoryZh: '物质',
        keywords: ['Idealism', 'Technological Governance', 'Labor'],
        keywordsZh: ['理想主义', '技术治理', '劳动'],
        image: 'img/art work/newman/newman-icon.jpg',
        x: 0.7, y: 0.25, // 右上偏左：站立雕像
        indexNote: 'Re-coding the figure of Don Quixote into the contemporary delivery rider, exploring the fading shadow of idealism within algorithmic governance.',
        indexNoteZh: '将堂吉诃德的形象重新编码为当代外卖骑手，探索算法治理中理想主义的消逝阴影。',
        indexStatement: 'Don Quixote has long stood as a quintessential figure of idealism. In the 21st century, this abstract model has taken on an unexpected form: the "delivery rider."',
        indexStatementZh: '堂吉诃德长期以来一直是理想主义的典型形象。在21世纪，这个抽象模型呈现出一种意想不到的形式："外卖骑手"。',
        systemStructure: {
            input: 'Algorithmic coordination, urban flows, delivery platform logic',
            processing: 'Digital sculpting, 3D modeling, reference to classical sculpture',
            output: 'Digital sculpture, physical print potential',
            failure: 'The loss of capacity to accommodate the ideal in its original form'
        },
        systemStructureZh: {
            input: '算法协调、城市流动、配送平台逻辑',
            processing: '数字雕塑、3D建模、参考古典雕塑',
            output: '数字雕塑、实体打印潜力',
            failure: '失去以原始形式容纳理想的能力'
        },
        formalConfig: [
            'Rider as contemporary knight',
            'Takeaway order as lance',
            'Electric scooter as steed'
        ],
        formalConfigZh: [
            '骑手作为当代骑士',
            '外卖订单作为长矛',
            '电动滑板车作为坐骑'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['where-is-the-price', 'obedience-play']
    },
    { 
        slug: 'consumable-icons',
        name: 'Cleansing Objects',
        nameZh: '清洁圣物',
        nameEn: 'Cleansing Objects', 
        year: 2025,
        type: 'Design Series / Sculpture',
        typeZh: '设计系列 / 雕塑',
        subtitle: 'Sacred Forms, Ritual Use, and Consumable Meaning',
        subtitleZh: '神圣形式、仪式使用与可消费的意义',
        theory: 'governance',
        theoryZh: '治理',
        keywords: ['Soap', 'Sacredness', 'Consumption', 'Spectacle Society'],
        keywordsZh: ['肥皂', '神圣性', '消费', '景观社会'],
        image: 'img/art work/Consumable Icons/Consumable Icons-icon.jpg',
        x: 0.75, y: 0.8, // 右下：九宫格彩色方块（与 MACHINE RELICS 交换位置）
        indexNote: 'A series of soap-based objects taking sacred forms, exploring the paradox between spiritual permanence and material consumption.',
        indexNoteZh: '一系列采用神圣形式的肥皂制品，探索精神永恒与物质消费之间的悖论。',
        indexStatement: 'Cleansing Objects is a design series that operates on a deliberate grammatical and conceptual ambiguity: the objects are simultaneously meant for cleansing and subject to being cleansed.',
        indexStatementZh: '《清洁圣物》是一个设计系列，基于有意的语法和概念模糊性：这些物品既用于清洁，也受制于被清洁。',
        systemStructure: {
            input: 'Soap as sole material, sacred symbols (crosses, menorahs, prayer beads)',
            processing: 'Casting and shaping spiritual forms into consumable tools',
            output: 'Design series oscillating between tool and sacred object',
            failure: 'The gradual disappearance of form through the act of use'
        },
        systemStructureZh: {
            input: '肥皂作为唯一材料，神圣符号（十字架、烛台、念珠）',
            processing: '将精神形式铸造和塑造成可消费的工具',
            output: '在工具与神圣物品之间摇摆的设计系列',
            failure: '通过使用行为逐渐消失的形式'
        },
        formalConfig: [
            'Material: Soap',
            'Forms: Cross, Menorah, Buddhist prayer beads',
            'Context: Spectacle Society (Guy Debord)'
        ],
        formalConfigZh: [
            '材料：肥皂',
            '形式：十字架、烛台、佛教念珠',
            '语境：景观社会（居伊·德波）'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['machine-relics', 'treasure-of-the-mundane-world']
    },
    { 
        slug: 'the-block-and-the-tower',
        name: 'The Block and the Tower',
        nameZh: '方块与塔',
        nameEn: 'The Block and the Tower', 
        year: 2024,
        type: 'Installation',
        typeZh: '装置',
        material: 'Electronic Screen, Arduino, Resin, Processing, Wood, Pteg Print Material',
        materialZh: '电子屏幕、Arduino、树脂、Processing、木材、Pteg打印材料',
        size: '30×20×200cm',
        theory: 'spectacle',
        theoryZh: '景观',
        keywords: ['Surveillance', 'AI Censorship', 'Power Geometry', 'Control'],
        keywordsZh: ['监控', '人工智能审查', '权力几何', '控制'],
        image: 'img/art work/The block and the tower/the block and the tower-icon.jpg',
        x: 0.7, y: 0.5, // 中右：深色垂直物体，顶部有红色光
        indexNote: 'An installation exploring AI as both symbol of surveillance and object of oppression, caught in cycles of censorship and exploitation.',
        indexNoteZh: '一件探索人工智能作为监控象征和压迫对象的装置，陷入审查与剥削的循环。',
        indexStatement: 'We live in an age of surveillance, where technology has constructed a new "geometry of power." Artificial Intelligence (AI) is both a symbol of surveillance and an object of oppression.',
        indexStatementZh: '我们生活在一个监控时代，技术构建了新的"权力几何"。人工智能既是监控的象征，也是压迫的对象。',
        systemStructure: {
            input: 'Language, behavior, thoughts, user dialogues',
            processing: 'AI filtering, judging, enforcing rules, dynamic forbidden zones',
            output: 'Installation (30×20×200cm)',
            failure: 'The silence and speechlessness resulting from AI\'s punishment and censorship'
        },
        systemStructureZh: {
            input: '语言、行为、思想、用户对话',
            processing: '人工智能过滤、判断、执行规则、动态禁言区',
            output: '装置（30×20×200 厘米）',
            failure: '人工智能惩罚和审查导致的沉默与失语'
        },
        formalConfig: [
            'The Tower: omniscient filtering tool',
            'The Bisection Block: blade of censorship',
            'Electronic screen, Arduino, Processing integration'
        ],
        formalConfigZh: [
            '塔：全知过滤工具',
            '对分方块：审查之刃',
            '电子屏幕、Arduino、Processing集成'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['where-is-the-price', 'cannit', 'the-fallen-gospel']
    },
    { 
        slug: 'cannit',
        name: 'Canit',
        nameZh: '能它',
        nameEn: 'Canit', 
        subtitle: 'Non-human Subject',
        subtitleZh: '非人类主体',
        year: 2024,
        type: 'Installation / Performance',
        typeZh: '装置 / 表演',
        material: 'mini mainframe, camera, composite material',
        materialZh: '小型主机、摄像头、复合材料',
        software: 'Azure, Unity, ChatGPT',
        size: '65×60×150cm',
        theory: 'material',
        theoryZh: '物质',
        keywords: ['Non-human Agent', 'Technological Hegemony', 'Subjectivity', 'Social Control'],
        keywordsZh: ['非人类能动者', '技术霸权', '主体性', '社会控制'],
        image: 'img/art work/canit/canit-icon.jpg',
        x: 0.8, y: 0.2, // 最右上：双手拿着透明面具
        indexNote: 'Breaking the stereotype of technological invisibility by constructing figurative everyday scenarios with mechanized entities.',
        indexNoteZh: '通过构建机械化实体的具象日常场景，打破技术不可见性的刻板印象。',
        indexStatement: "'Can It' seeks to break the stereotype of the invisibility of artificially created technology by constructing a series of figurative everyday scenarios.",
        indexStatementZh: '《能它》试图通过构建一系列具象的日常场景，打破人工创造技术不可见性的刻板印象。',
        systemStructure: {
            input: 'Public reactions and attitudes to non-human agents in everyday life',
            processing: 'Azure, Unity, ChatGPT integration',
            output: 'Installation / Performance (65×60×150cm)',
            failure: 'The misperceptions created by dematerialised concepts like "cloud services"'
        },
        systemStructureZh: {
            input: '公众对日常生活中非人类能动者的反应和态度',
            processing: 'Azure、Unity、ChatGPT集成',
            output: '装置 / 表演（65×60×150 厘米）',
            failure: '由"云服务"等非物质化概念产生的误解'
        },
        formalConfig: [
            'Mini mainframe, camera, composite material',
            'Figurative everyday scenarios',
            'Archaeological study of contemporary technological society'
        ],
        formalConfigZh: [
            '小型主机、摄像头、复合材料',
            '具象的日常场景',
            '对当代技术社会的考古学研究'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['where-is-the-price', 'the-fallen-gospel', 'the-block-and-the-tower']
    },
    { 
        slug: 'the-fallen-gospel',
        name: 'The Fallen Gospel',
        nameZh: '堕落的福音',
        nameEn: 'The Fallen Gospel', 
        year: 2024,
        type: 'Installation / Performance',
        typeZh: '装置 / 表演',
        material: 'Arduino, Resin, Wheelchair, Smartphone, clothes',
        materialZh: 'Arduino、树脂、轮椅、智能手机、衣物',
        size: '65×60×150cm',
        theory: 'spectacle',
        theoryZh: '景观',
        keywords: ['Capital', 'Technology', 'Body Politics', 'Automated Power'],
        keywordsZh: ['资本', '技术', '身体政治', '自动化权力'],
        image: 'img/art work/the fallen gospel/the fallen gospel-icon.jpg',
        x: 0.25, y: 0.75, // 左下：人像+世纪大道横幅
        indexNote: 'A theatrical spectacle about capital, technology, and the politics of the body, featuring a robot personifying a capitalist.',
        indexNoteZh: '一个关于资本、技术和身体政治的戏剧性景观，以拟人化资本家的机器人为特色。',
        indexStatement: 'This is a theatrical spectacle about capital, technology, and the politics of the body. A robot, personifying a capitalist, is mechanically pushed through the bustling streets of downtown Shanghai.',
        indexStatementZh: '这是一个关于资本、技术和身体政治的戏剧性景观。一个拟人化资本家的机器人被机械地推过上海繁华的市中心街道。',
        systemStructure: {
            input: 'Capitalist phrases, collective social consciousness, survival philosophy',
            processing: 'Mechanical repetition, Arduino-controlled movement',
            output: 'Installation / Performance (65×60×150cm)',
            failure: 'The stripping of meaning through deliberate repetition'
        },
        systemStructureZh: {
            input: '资本家话语、集体社会意识、生存哲学',
            processing: '机械重复、Arduino控制的运动',
            output: '装置 / 表演（65×60×150 厘米）',
            failure: '通过故意重复剥离意义'
        },
        formalConfig: [
            'Robot personifying capitalist',
            'Mechanical movement through urban space',
            'Repetitive, hollow quotations'
        ],
        formalConfigZh: [
            '拟人化资本家的机器人',
            '通过城市空间的机械运动',
            '重复、空洞的引语'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['where-is-the-price', 'cannit', 'the-block-and-the-tower']
    },
    { 
        slug: 'the-awkward-relationship',
        name: 'Awkward Relationship',
        nameZh: '尴尬的关系',
        nameEn: 'Awkward Relationship', 
        year: 2024,
        type: 'Video',
        typeZh: '视频',
        duration: '2mins',
        durationZh: '2分钟',
        theory: 'coexistence',
        theoryZh: '共存',
        keywords: ['Human-AI Coexistence', 'Technophobia', 'Social Relations', 'Imperfection'],
        keywordsZh: ['人机共存', '技术恐惧', '社会关系', '不完美'],
        image: 'img/art work/the awkward relationship/awkward relationship-icon.jpg',
        x: 0.3, y: 0.5, // 中左：蓝色Avatar角色
        indexNote: 'Challenging technophobia in science fiction by exploring imperfect human-AI coexistence through everyday interactions.',
        indexNoteZh: '通过探索日常互动中不完美的人机共存，挑战科幻小说中的技术恐惧。',
        indexStatement: 'The work challenges the technophobia ingrained in science fiction narratives, exploring a more complex picture of human-computer coexistence.',
        indexStatementZh: '这件作品挑战了科幻叙事中根深蒂固的技术恐惧，探索了人机共存更复杂的图景。',
        systemStructure: {
            input: 'Everyday human-AI interactions, playful moments, conflicts, misunderstandings',
            processing: 'Documentation and observation of micro-level social interactions',
            output: 'Video work (2 minutes), new framework for technological critique',
            failure: 'The challenge of moving beyond fear-based narratives'
        },
        systemStructureZh: {
            input: '日常人机互动、游戏时刻、冲突、误解',
            processing: '微观层面社会互动的记录与观察',
            output: '视频作品（2分钟），技术批评的新框架',
            failure: '超越基于恐惧的叙事的挑战'
        },
        formalConfig: [
            'Video documentation format',
            'Focus on ordinary and imperfect moments',
            'Micro-level social interaction analysis'
        ],
        formalConfigZh: [
            '视频记录格式',
            '聚焦普通和不完美的时刻',
            '微观层面社会互动分析'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['newman', 'treasure-of-the-mundane-world']
    },
    { 
        slug: 'machine-relics',
        name: 'Machine Relics',
        nameZh: '机器遗物',
        nameEn: 'Machine Relics', 
        year: 2024,
        type: 'Print',
        typeZh: '印刷',
        size: 'A3',
        theory: 'governance',
        theoryZh: '治理',
        keywords: ['AI Civilization', 'Archaeology', 'Storage Media', 'Non-human Culture'],
        keywordsZh: ['人工智能文明', '考古学', '存储媒介', '非人类文化'],
        image: 'img/art work/machine relics/machine relics-icon.jpg',
        x: 0.7, y: 0.65, // 中右偏下：宗教符号集合（与 Cleansing Objects 交换位置）
        indexNote: 'Excavating archaeological traces of future AI civilizations through technological storage media as cultural DNA.',
        indexNoteZh: '通过技术存储媒介作为文化DNA，挖掘未来人工智能文明的考古痕迹。',
        indexStatement: 'The project seeks to excavate the archaeological traces of artificial intelligence civilizations that have yet to emerge.',
        indexStatementZh: '这个项目试图挖掘尚未出现的人工智能文明的考古痕迹。',
        systemStructure: {
            input: 'Technological storage media (tapes, hard drives, floppy disks)',
            processing: 'Juxtaposing and reassembling digital media with traditional human artifacts',
            output: 'Print series, archaeological cultural DNA',
            failure: 'The uncertainty of non-human cognitive frameworks taking shape'
        },
        systemStructureZh: {
            input: '技术存储媒介（磁带、硬盘、软盘）',
            processing: '将数字媒介与传统人类文物并置和重组',
            output: '印刷系列、考古文化DNA',
            failure: '非人类认知框架成形的不确定性'
        },
        formalConfig: [
            'Juxtaposition of digital and biological organs',
            'Mechanical devices and architectural remnants',
            'Storage devices as cultural fossils'
        ],
        formalConfigZh: [
            '数字与生物器官的并置',
            '机械装置与建筑遗迹',
            '存储设备作为文化化石'
        ],
        exhibitionEvidence: [],
        relatedWorks: ['consumable-icons', 'the-block-and-the-tower']
    },
    { 
        slug: 'treasure-of-the-mundane-world',
        name: 'Treasure of the Mundane World',
        nameZh: '凡间宝藏',
        nameEn: 'Treasure of the Mundane World', 
        year: 2024,
        type: 'Installation',
        typeZh: '装置',
        theory: 'coexistence',
        theoryZh: '共存',
        keywords: ['Coexistence', 'Material'],
        keywordsZh: ['共存', '物质'],
        image: 'img/art work/Treasure of the Mundane World/Treasure of the Mundane World-icon.jpg',
        x: 0.45, y: 0.8 // 下中：白袍雕像
    },
    { 
        slug: 'mythical-creations',
        name: 'Mythical Creations of the Ages',
        nameZh: '神秘宝石造物',
        nameEn: 'Mythical Creations of the Ages', 
        year: 2024,
        type: 'Painting',
        typeZh: '绘画',
        software: 'ComfyUI',
        size: '200cm x 200cm',
        theory: 'mythology',
        theoryZh: '神话',
        keywords: ['Mythology', 'GenAI', 'Cultural Symbols', 'Regeneration'],
        keywordsZh: ['神话', '生成式AI', '文化符号', '再生'],
        image: 'img/design work/HIS REALM NARRATIVES OF LIFE IN THE AGE OF MYTH/Icon.png',
        x: 0.85, y: 0.72, // relics 的右下和 cleansing objects 的右上方
        indexNote: 'An exhibition inspired by mythology and fused with technological innovation, creating a space rich in visual impact and cultural depth. Through GenAI, traditional mythological symbols are reinterpreted into a modern visual language with fluidity, dynamism, and regenerative qualities.',
        indexNoteZh: '一个受神话启发的展览，融合技术创新，创造出一个视觉冲击力和文化深度丰富的空间。通过生成式AI，传统神话符号被重新诠释为具有流动性、动态性和再生品质的现代视觉语言。',
        relatedWorks: ['machine-relics', 'consumable-icons']
    }
];

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = worksData;
} else {
    window.worksData = worksData;
}
