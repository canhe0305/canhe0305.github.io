// About 页面内容切换
(function() {
    // 中文内容数据
    const contentDataZh = {
        'about': {
            title: '关于（About）',
            content: `
                <p class="about-text">能祂（Canhe，1998 年生）是一位艺术家、设计师、研究员与教育者，其实践位于生成式人工智能、批判性技术研究与当代艺术的交叉地带。</p>
                <p class="about-text">他的工作关注算法系统、平台机制与技术基础设施如何重塑创作权、文化记忆与集体行动方式，尤其聚焦于中国语境下的生成式 AI及其在全球技术结构中的位置。通过装置、表演性系统、研究导向设计与参与式机制，他将技术视为一种嵌入制度、历史与权力关系中的社会—技术行动者，而非独立的"创作者"。</p>
            `
        },
        'contact': {
            title: '联系方式',
            content: `
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Wechat</p>
                    <p class="about-text" style="margin-bottom: 24px;">mysterych924</p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
                    <p class="about-text" style="margin-bottom: 24px;"><a href="mailto:hermeit@outlook.com">hermeit@outlook.com</a></p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Rednote / Instagram</p>
                    <p class="about-text" style="margin-bottom: 24px;">canhe_ych</p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Artool</p>
                    <p class="about-text"><a href="https://artool.top" target="_blank">artool.top</a></p>
                </div>
            `
        },
        'short-bio': {
            title: '简介（Short Bio）',
            content: `
                <p class="about-text">能祂是一位从事技术批评与艺术实践的创作者与研究员，其实践结合技术批评、系统设计与参与式艺术，关注人类—技术之间的协作、算法治理及技术对文化生产方式的影响。他毕业于中央圣马丁艺术与科学硕士项目，目前从事艺术创作、研究与教学工作。</p>
            `
        },
        'long-bio': {
            title: '长简介（约 100 字）',
            content: `
                <p class="about-text">能祂是一位艺术家、研究者与教育者，工作横跨生成式人工智能、批判性技术实践与当代艺术。他的研究型创作主要通过交互装置、视频与雕塑的形式，探讨技术物（不止是AI）如何在制度、语言与权力结构中参与创作过程，重点关注中国语境下的算法逻辑与文化影响。</p>
                <p class="about-text">他以最优等的成绩分别毕业于中央圣马丁与北京服装学院，目前持续在创作、学术研究与教学之间展开实践。除了获得LVMH MAISON/0 This Earth Award的提名外，目前他也是麻省理工旗下期刊Leonardo的特邀审稿人。</p>
                <p class="about-text">在教学方面，他曾以客座讲师的身份任教于中央美术学院与北京服装学院，从2025年9月起，他于厦门大学进行正式的教学工作。</p>
            `
        },
        'cv': {
            title: '简历（CV）',
            content: `
                <div style="width: 100%; height: 80vh; border: none;">
                    <iframe src="https://docs.google.com/document/d/e/2PACX-1vT0s2r1B9OWv5dvY4cLX3OYiDSWMJi9o-UO43I7HVsHn9Dl9SJn5Cd08PV_v610iA/pub?embedded=true" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
                </div>
            `
        }
    };

    // 英文内容数据
    const contentDataEn = {
        'about': {
            title: 'About',
            content: `
                <p class="about-text">Canhe (b. 1998) is an artist, designer, researcher, and educator whose practice sits at the intersection of generative AI, critical technology studies, and contemporary art.</p>
                <p class="about-text">His work examines how algorithmic systems, platform mechanisms, and technological infrastructure reshape creative agency, cultural memory, and modes of collective action, with particular focus on generative AI in the Chinese context and its position within global technological structures. Through installations, performative systems, research-driven design, and participatory mechanisms, he treats technology as a socio-technical actor embedded in institutional, historical, and power relations, rather than an independent "creator."</p>
            `
        },
        'contact': {
            title: 'Contact',
            content: `
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Wechat</p>
                    <p class="about-text" style="margin-bottom: 24px;">mysterych924</p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
                    <p class="about-text" style="margin-bottom: 24px;"><a href="mailto:hermeit@outlook.com">hermeit@outlook.com</a></p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Rednote / Instagram</p>
                    <p class="about-text" style="margin-bottom: 24px;">canhe_ych</p>
                </div>
                <div style="margin-bottom: 32px;">
                    <p class="about-text" style="margin-bottom: 8px; color: rgba(255, 255, 255, 0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Artool</p>
                    <p class="about-text"><a href="https://artool.top" target="_blank">artool.top</a></p>
                </div>
            `
        },
        'short-bio': {
            title: 'Short Bio',
            content: `
                <p class="about-text">Canhe is a creator and researcher working at the intersection of technology criticism and artistic practice. His work combines technology criticism, systems design, and participatory art, focusing on human–technology collaboration, algorithmic governance, and technology's impact on cultural production. He graduated from the MA Art and Science program at Central Saint Martins and currently works in artistic creation, research, and teaching.</p>
            `
        },
        'long-bio': {
            title: 'Long Bio',
            content: `
                <p class="about-text">Canhe is an artist, researcher, and educator working across generative AI, critical technology practice, and contemporary art. His research-driven practice primarily takes the form of interactive installations, video, and sculpture, exploring how technological objects (not limited to AI) participate in creative processes within institutional, linguistic, and power structures, with particular focus on algorithmic logic and cultural impact in the Chinese context.</p>
                <p class="about-text">He graduated with distinction from Central Saint Martins and Beijing Institute of Fashion Technology, and continues to practice across creation, academic research, and teaching. In addition to being nominated for the LVMH MAISON/0 This Earth Award, he is currently a guest reviewer for Leonardo, the journal published by MIT Press.</p>
                <p class="about-text">In teaching, he has served as a guest lecturer at the Central Academy of Fine Arts and Beijing Institute of Fashion Technology. Starting September 2025, he will begin formal teaching at Xiamen University.</p>
            `
        },
        'cv': {
            title: 'CV',
            content: `
                <div style="width: 100%; height: 80vh; border: none;">
                    <iframe src="https://docs.google.com/document/d/e/2PACX-1vTgIQgtsSu4A0BxZ1XrTUoqzyGGj6uL58D3XqsgUeg6b6DLWaQr_8-pCRjTPxLq4bcYjnijAUGfSH4B/pub?embedded=true" width="100%" height="100%" frameborder="0" style="border: none;"></iframe>
                </div>
            `
        }
    };

    // 导航项翻译数据
    const navTranslations = {
        'zh': {
            'aboutNavContact': '联系方式',
            'aboutNavShortBio': '简介',
            'aboutNavLongBio': '长简介',
            'aboutNavCV': '简历'
        },
        'en': {
            'aboutNavContact': 'Contact',
            'aboutNavShortBio': 'Short Bio',
            'aboutNavLongBio': 'Long Bio',
            'aboutNavCV': 'CV'
        }
    };

    // 更新导航栏文本
    function updateNavText(lang) {
        const navItems = document.querySelectorAll('.about-nav-item');
        navItems.forEach(item => {
            const langKey = item.getAttribute('data-lang-key');
            if (langKey && navTranslations[lang] && navTranslations[lang][langKey]) {
                item.textContent = navTranslations[lang][langKey];
            }
        });
    }

    // 当前语言和章节
    let currentLang = 'zh';
    let currentSection = 'short-bio';

    // 初始化
    function init() {
        const navItems = document.querySelectorAll('.about-nav-item');

        // 获取当前语言（从全局语言系统）
        currentLang = window.getCurrentLang ? window.getCurrentLang() : 'en';

        // 更新导航栏文本
        updateNavText(currentLang);

        // 显示默认内容
        showContent(currentSection, currentLang);

        // 为每个导航项添加点击事件
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                currentSection = section;
                
                // 移除所有 active 类
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // 添加 active 类到当前项
                this.classList.add('active');
                
                // 显示对应内容
                showContent(currentSection, currentLang);
            });
        });

        // 监听全局语言变化事件
        window.addEventListener('langChanged', function(event) {
            currentLang = event.detail.lang;
            updateNavText(currentLang);
            showContent(currentSection, currentLang);
        });
    }

    // 显示内容
    function showContent(section, lang) {
        const contentArea = document.getElementById('about-content');
        const contentData = lang === 'en' ? contentDataEn : contentDataZh;
        const data = contentData[section];
        
        if (data) {
            contentArea.innerHTML = `
                <div class="about-section-content">
                    ${data.content}
                </div>
            `;
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
