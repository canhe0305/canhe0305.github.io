// 全局语言切换系统
(function() {
    // 语言数据
    const langData = {
        zh: {
            nav: {
                works: '作品',
                writing: '写作',
                about: '关于'
            },
            updating: '正在更新',
            about: {
                nav: {
                    about: '关于',
                    contact: '联系方式',
                    shortBio: '简介',
                    longBio: '长简介',
                    cv: '简历概述'
                }
            },
            works: {
                year2025: '2025',
                year2024: '2024'
            }
        },
        en: {
            nav: {
                works: 'Works',
                writing: 'Writing',
                about: 'About'
            },
            updating: 'Updating',
            about: {
                nav: {
                    about: 'About',
                    contact: 'Contact',
                    shortBio: 'Short Bio',
                    longBio: 'Long Bio',
                    cv: 'CV · Selected'
                }
            },
            works: {
                year2025: '2025',
                year2024: '2024'
            }
        }
    };

    // 获取当前语言（从 localStorage 或默认英文）
    function getCurrentLang() {
        return localStorage.getItem('siteLang') || 'en';
    }

    // 设置语言
    function setLang(lang) {
        localStorage.setItem('siteLang', lang);
        updatePageLang(lang);
    }

    // 更新页面语言
    function updatePageLang(lang) {
        const data = langData[lang];
        if (!data) return;

        // 更新导航栏
        const navLinks = document.querySelectorAll('.artworks-nav a, .hero-nav a, .nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === 'work.html' || href.includes('work.html'))) {
                link.textContent = data.nav.works;
            } else if (href && (href === 'about.html' || href.includes('about.html'))) {
                link.textContent = data.nav.about;
            } else if (link.getAttribute('data-lang-key') === 'navWriting' || (href === '#' && (link.textContent.trim() === 'Writing' || link.textContent.trim() === '写作'))) {
                link.textContent = data.nav.writing;
            }
        });

        // 更新网站标题
        const siteTitles = document.querySelectorAll('.hero-site-title, .artworks-site-title, .site-title');
        siteTitles.forEach(title => {
            if (lang === 'zh') {
                title.textContent = '能祂';
            } else {
                title.textContent = 'CANHE';
            }
        });

        // 更新语言切换按钮状态
        const langButtons = document.querySelectorAll('.lang-switcher-btn');
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 触发自定义事件，让各个页面可以响应语言变化
        window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
    }

    // 创建语言切换按钮
    function createLangSwitcher() {
        const currentLang = getCurrentLang();
        
        // 检查是否已存在语言切换器
        if (document.querySelector('.lang-switcher')) {
            return;
        }

        // 在导航栏中添加语言切换按钮
        const navs = document.querySelectorAll('.artworks-nav, .hero-nav, .nav-links');
        navs.forEach(nav => {
            // 设置 nav 为 flex 布局确保对齐
            nav.style.display = 'inline-flex';
            nav.style.alignItems = 'center';
            nav.style.gap = '3px';

            const langSwitcher = document.createElement('div');
            langSwitcher.className = 'lang-switcher';
            langSwitcher.innerHTML = `<button class="lang-switcher-btn ${currentLang === 'zh' ? 'active' : ''}" data-lang="zh">zh</button><span style="color: rgba(0,0,0,0.3);">/</span><button class="lang-switcher-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">en</button>`;
            
            // 插入到导航栏末尾
            nav.appendChild(langSwitcher);
        });

        // 为按钮添加事件监听
        document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                setLang(lang);
            });
        });
    }

    // 初始化
    function init() {
        const currentLang = getCurrentLang();
        createLangSwitcher();
        updatePageLang(currentLang);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 暴露全局函数
    window.getCurrentLang = getCurrentLang;
    window.setLang = setLang;
})();
