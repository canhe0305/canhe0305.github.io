// SVG + Canvas 混合系统 - 高级双层 Bio-Network (Bio-inspired Attractor Bundling)
(function() {
    const artworks = window.worksData || [];
    if (artworks.length === 0) return;

    const academicEdges = [
        { source: 'Where is the price', target: 'Canit', weight: 0.9 },
        { source: 'Where is the price', target: 'New Man', weight: 0.8 },
        { source: 'Where is the price', target: 'MACHINE RELICS', weight: 0.7 },
        { source: 'Where is the price', target: 'AWKWARD RELATIONSHIP', weight: 0.6 },
        { source: 'Canit', target: 'The Fallen Gospel', weight: 0.85 },
        { source: 'Canit', target: 'The block and the tower', weight: 0.75 },
        { source: 'The block and the tower', target: 'The Fallen Gospel', weight: 0.8 },
        { source: 'The Fallen Gospel', target: 'Where is the price', weight: 0.65 },
        { source: 'New Man', target: 'Taming Theatre', weight: 0.9 },
        { source: 'Taming Theatre', target: 'Where is the price', weight: 0.5 },
        { source: 'MACHINE RELICS', target: 'Cleansing Objects', weight: 0.9 },
        { source: 'MACHINE RELICS', target: 'Mythical Creations of the Ages', weight: 0.85 },
        { source: 'Cleansing Objects', target: 'Mythical Creations of the Ages', weight: 0.85 },
        { source: 'Cleansing Objects', target: 'Where is the price', weight: 0.4 },
        { source: 'AWKWARD RELATIONSHIP', target: 'Treasure of the Mundane World', weight: 0.8 },
        { source: 'Treasure of the Mundane World', target: 'Where is the price', weight: 0.4 }
    ];

    const container = document.getElementById('map-container');
    if (!container) return;
    container.innerHTML = '';

    // --- 注入纸张噪点图层 ---
    if (!document.getElementById('noise-layer')) {
        const noiseLayer = document.createElement('div');
        noiseLayer.id = 'noise-layer';
        noiseLayer.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 0; opacity: 0.08;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        `;
        container.appendChild(noiseLayer);
    }

    // --- UI 控制面板 ---
    const controlsDiv = document.createElement('div');
    controlsDiv.id = 'map-ui-controls';
    controlsDiv.innerHTML = `
        <div class="control-toggle">BIO-NETWORK SETTINGS</div>
        <div class="control-panel">
            <div class="ctrl-row">
                <label>Fiber Density (密度)</label>
                <input type="range" id="ctrl-bundle" min="10" max="100" value="40">
            </div>
            <div class="ctrl-row">
                <label>Entanglement (纠缠)</label>
                <input type="range" id="ctrl-spread" min="0" max="60" value="20">
            </div>
            <div class="ctrl-row">
                <label>Fiber Thickness (粗细)</label>
                <input type="range" id="ctrl-width" min="1" max="50" value="8">
            </div>
            <div class="ctrl-row">
                <label>Tension (张力)</label>
                <input type="range" id="ctrl-force" min="0" max="100" value="60">
            </div>
            <div class="ctrl-row">
                <label>Ink Color (Hue)</label>
                <input type="range" id="ctrl-hue" min="0" max="360" value="200">
            </div>
        </div>
    `;
    container.appendChild(controlsDiv);

    const style = document.head.appendChild(document.createElement('style'));
    style.textContent = `
        #map-ui-controls { position: absolute; bottom: 30px; left: 30px; z-index: 100; font-family: 'Inter', sans-serif; pointer-events: auto; transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .control-toggle { background: #222; color: #f4f3ef; padding: 8px 15px; font-size: 10px; letter-spacing: 1px; cursor: pointer; border-radius: 2px; display: inline-block; font-weight: bold; }
        .control-panel { background: rgba(244, 243, 239, 0.95); backdrop-filter: blur(5px); padding: 20px; border-radius: 4px; box-shadow: 0 4px 25px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05); width: 220px; display: none; margin-top: 10px; }
        #map-ui-controls:hover .control-panel { display: block; }
        .ctrl-row { margin-bottom: 12px; }
        .ctrl-row label { display: block; font-size: 10px; color: #666; margin-bottom: 5px; text-transform: uppercase; font-weight: 700; }
        .ctrl-row input[type=range] { width: 100%; height: 2px; accent-color: #222; background: #ddd; appearance: none; }
        .artwork-item { cursor: pointer; transition: all 0.2s; padding: 5px 0; }
        .artwork-item:hover { color: #000 !important; font-weight: 600; }
        
        /* 景深模糊样式 */
        canvas.focused-blur {
            filter: blur(5px);
            opacity: 0.25;
            transition: filter 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .artwork-label.focused-fade {
            opacity: 0.15;
            filter: blur(3px);
            transition: opacity 1s ease, filter 1s ease;
        }
        .artwork-label.is-active {
            opacity: 1 !important;
            filter: none !important;
            transition: opacity 0.5s ease, filter 0.5s ease;
        }
        
        /* Modal 渐变 */
        .modal-overlay {
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;

    const dpr = window.devicePixelRatio || 1;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;
    
    const canvas = document.createElement('canvas');
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    canvas.style.position = 'absolute'; canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.mixBlendMode = 'multiply';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.scale(dpr, dpr);

    const svg = d3.select(container).append('svg').attr('width', width).attr('height', height).style('position', 'relative').style('z-index', '1');
    const g = svg.append('g');
    const padding = 80;
    const plotWidth = width - padding * 2, plotHeight = height - padding * 2;
    const nodeMap = {};
    artworks.forEach(a => nodeMap[a.name] = { x: a.x * plotWidth + padding, y: a.y * plotHeight + padding });

    const coreNodePos = nodeMap['Where is the price'] || { x: width/2, y: height/2 };

    let params = {
        bundleCount: 40,
        attractionForce: 0.6,
        spread: 20,
        fiberWidth: 0.8,
        hue: 200,
        inkColor: "20, 25, 30"
    };

    document.getElementById('ctrl-bundle').oninput = (e) => params.bundleCount = +e.target.value;
    document.getElementById('ctrl-force').oninput = (e) => params.attractionForce = +e.target.value / 100;
    document.getElementById('ctrl-spread').oninput = (e) => params.spread = +e.target.value;
    document.getElementById('ctrl-width').oninput = (e) => params.fiberWidth = +e.target.value / 10;
    document.getElementById('ctrl-hue').oninput = (e) => {
        params.hue = +e.target.value;
        const c = hslToRgb(params.hue / 360, 0.15, 0.1);
        params.inkColor = `${c.r}, ${c.g}, ${c.b}`;
    };

    function hslToRgb(h, s, l) {
        let r, g, b;
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
        const f = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1/6) return p + (q - p) * 6 * t; if (t < 1/2) return q; if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p; };
        r = f(p, q, h + 1/3); g = f(p, q, h); b = f(p, q, h - 1/3);
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }

    class Attractor {
        constructor(isCore = false) {
            this.isCore = isCore;
            this.x = isCore ? coreNodePos.x : width/2 + (Math.random()-0.5) * width * 0.5;
            this.y = isCore ? coreNodePos.y : height/2 + (Math.random()-0.5) * height * 0.5;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
            this.angle = Math.random() * Math.PI * 2;
        }
        update() {
            if (this.isCore) {
                this.angle += 0.005;
                this.x = coreNodePos.x + Math.cos(this.angle) * 15;
                this.y = coreNodePos.y + Math.sin(this.angle) * 15;
            } else {
                this.x += this.vx; this.y += this.vy;
                if (this.x < width*0.1 || this.x > width*0.9) this.vx *= -1;
                if (this.y < height*0.1 || this.y > height*0.9) this.vy *= -1;
            }
        }
    }
    const attractors = [new Attractor(true), new Attractor(), new Attractor()];

    // --- 初始视角设置（页面加载时的镜头位置） ---
    // 调整以下参数来控制初始视角：
    const initialScale = 1.6;        // 初始缩放倍率：0.5 = 缩小一半，1.0 = 原始大小，1.5 = 放大50%
    const initialCenterX = width / 2+10; // 初始镜头中心 X 坐标（默认屏幕中心）
    const initialCenterY = height / 2+10; // 初始镜头中心 Y 坐标（默认屏幕中心）
    
    const initialTransform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(initialScale)
        .translate(-initialCenterX, -initialCenterY);
    
    let currentTransform = initialTransform;

    const zoom = d3.zoom().scaleExtent([0.15, 10]).on('zoom', (event) => {
        currentTransform = event.transform;
        g.attr('transform', currentTransform);

        // --- 核心交互：移动即退出聚焦 ---
        if (event.sourceEvent) {
            // 如果存在 sourceEvent，说明是用户手动拖拽或缩放操作
            // 此时我们仅关闭 UI 和模糊，不干预镜头（让用户自己控）
            window.closeQuickPreview(true); 
        }
    });
    svg.call(zoom);
    svg.call(zoom.transform, initialTransform);
    let time = 0;
    const fiberRandomTable = Array.from({ length: 500 }, () => Math.random() - 0.5);

    function animate() {
        time += 0.012;
        attractors.forEach(a => a.update());
        drawCanvas();
        requestAnimationFrame(animate);
    }

    function drawBundle(ctx, a, b, edgeIdx) {
        const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
        let bestAttractor = attractors[0], minDist = Infinity;
        attractors.forEach(att => { const d = (midX - att.x)**2 + (midY - att.y)**2; if (d < minDist) { minDist = d; bestAttractor = att; } });

        const cpBaseX = midX * (1 - params.attractionForce) + bestAttractor.x * params.attractionForce;
        const cpBaseY = midY * (1 - params.attractionForce) + bestAttractor.y * params.attractionForce;
        const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy);
        const nx = -dy / len, ny = dx / len;

        const drawLayer = (isCore) => {
            const count = isCore ? Math.floor(params.bundleCount * 0.4) : params.bundleCount;
            const alpha = isCore ? Math.max(0.05, 0.15 - len/4000) : 0.02;
            const lineWidth = isCore ? params.fiberWidth * 1.3 : params.fiberWidth * 0.8;
            const spreadMult = isCore ? 0.6 : 1.8;

            ctx.strokeStyle = `rgba(${params.inkColor}, ${alpha})`;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            
            for (let i = 0; i < count; i++) {
                const randOffset = fiberRandomTable[(edgeIdx * 10 + i) % 500];
                const t = ((i / count) * 2 - 1) + randOffset * 0.5;
                const waveAmp = isCore ? 1.0 : 4.0;
                const wave = Math.sin(time + edgeIdx + i * 0.2) * waveAmp;
                const spread = params.spread * spreadMult * t + wave;
                const scatter = (isCore ? 2 : 8) * randOffset;
                const cp1x = cpBaseX + nx * spread + (a.x - cpBaseX) * 0.25 + scatter;
                const cp1y = cpBaseY + ny * spread + (a.y - cpBaseY) * 0.25 + scatter;
                const cp2x = cpBaseX + nx * spread + (b.x - cpBaseX) * 0.25 + scatter;
                const cp2y = cpBaseY + ny * spread + (b.y - cpBaseY) * 0.25 + scatter;
                ctx.moveTo(a.x, a.y);
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
            }
            ctx.stroke();
        };

        drawLayer(false); drawLayer(true);
    }

    function drawCanvas() {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(currentTransform.x, currentTransform.y);
        ctx.scale(currentTransform.k, currentTransform.k);
        
        ctx.strokeStyle = 'rgba(0,0,0,0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const step = 40;
        for(let x=-width; x<width*2; x+=step) { ctx.moveTo(x,-height); ctx.lineTo(x,height*2); }
        for(let y=-height; y<height*2; y+=step) { ctx.moveTo(-width,y); ctx.lineTo(width*2,y); }
        ctx.stroke();

        ctx.globalCompositeOperation = 'multiply';
        academicEdges.forEach((edge, idx) => { const a = nodeMap[edge.source], b = nodeMap[edge.target]; if(a && b) drawBundle(ctx, a, b, idx); });
        ctx.restore();
    }

    function zoomToNode(x, y, slug) {
        const scale = 4.5;
        const targetScreenY = height * 0.35;
        
        // 应用景深模糊
        canvas.classList.add('focused-blur');
        g.selectAll('.artwork-label').classed('focused-fade', true);
        if (slug) {
            g.selectAll(`.artwork-label[data-artwork-slug="${slug}"]`).classed('focused-fade', false).classed('is-active', true);
        }

        svg.transition()
            .duration(1200)
            .ease(d3.easeCubicInOut)
            .call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width / 2, targetScreenY)
                    .scale(scale)
                    .translate(-x, -y)
            );
    }

    function drawNodes() {
        const labelsGroup = g.selectAll('.labels').data([0]).join('g').attr('class', 'labels');
        const listLeft = document.getElementById('artworks-list-left');
        const listRight = document.getElementById('artworks-list-right');
        if (listLeft) listLeft.innerHTML = '';
        if (listRight) {
            listRight.innerHTML = '';
        }

        // 移除旧节点，确保重新渲染干净
        labelsGroup.selectAll('.artwork-label').remove();

        // 按年份分组作品
        const worksByYear = {};
        artworks.forEach(artwork => {
            const year = artwork.year;
            if (!worksByYear[year]) worksByYear[year] = [];
            worksByYear[year].push(artwork);
        });

        const years = Object.keys(worksByYear).sort((a, b) => b - a);
        const currentLang = window.getCurrentLang ? window.getCurrentLang() : 'en';

        years.forEach(year => {
            // 左侧：艺术作品（排除设计作品和商业作品）
            if (listLeft) {
                const leftWorks = worksByYear[year].filter(artwork => {
                    // 判断是否是设计作品：仅根据图片路径是否包含 "design work"
                    const isDesignWork = artwork.image && artwork.image.includes('design work');
                    return !isDesignWork; // 左侧只显示非设计作品
                });
                
                if (leftWorks.length > 0) {
                    const yearHeader = document.createElement('div');
                    yearHeader.className = 'year-header';
                    yearHeader.textContent = year;
                    yearHeader.style.cssText = `font-size:11px; font-weight:bold; color:rgba(0,0,0,0.8); margin-top:6px; marginBottom:2px; letter-spacing:1px;`;
                    listLeft.appendChild(yearHeader);

                    leftWorks.forEach(artwork => {
                        const pos = nodeMap[artwork.name];
                        const name = currentLang === 'zh' ? (artwork.nameZh || artwork.name) : (artwork.nameEn || artwork.name);
                        const item = document.createElement('div');
                        item.className = 'artwork-item';
                        item.textContent = name;
                        item.style.cssText = `color:rgba(0,0,0,0.4); font-size:12px; font-weight:400; line-height:1.5; letter-spacing:0.05em; margin-bottom:4px; cursor:pointer; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`;
                        item.onclick = (e) => {
                            e.stopPropagation();
                            if (pos) zoomToNode(pos.x, pos.y, artwork.slug);
                            if (window.openQuickPreview) window.openQuickPreview(artwork);
                        };
                        listLeft.appendChild(item);
                    });
                }
            }
            
            // 右侧：设计作品或商业作品
            if (listRight) {
                const rightWorks = worksByYear[year].filter(artwork => {
                    // 判断是否是设计作品：仅根据图片路径是否包含 "design work"
                    const isDesignWork = artwork.image && artwork.image.includes('design work');
                    return isDesignWork; // 右侧只显示设计作品
                });
                
                if (rightWorks.length > 0) {
                    const yearHeader = document.createElement('div');
                    yearHeader.className = 'year-header';
                    yearHeader.textContent = year;
                    yearHeader.style.cssText = `font-size:11px; font-weight:bold; color:rgba(0,0,0,0.8); margin-top:6px; marginBottom:2px; letter-spacing:1px;`;
                    listRight.appendChild(yearHeader);

                    rightWorks.forEach(artwork => {
                        const pos = nodeMap[artwork.name];
                        const name = currentLang === 'zh' ? (artwork.nameZh || artwork.name) : (artwork.nameEn || artwork.name);
                        const item = document.createElement('div');
                        item.className = 'artwork-item';
                        item.textContent = name;
                        item.style.cssText = `color:rgba(0,0,0,0.4); font-size:12px; font-weight:400; line-height:1.5; letter-spacing:0.05em; margin-bottom:4px; cursor:pointer; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`;
                        item.onclick = (e) => {
                            e.stopPropagation();
                            if (pos) zoomToNode(pos.x, pos.y, artwork.slug);
                            if (window.openQuickPreview) window.openQuickPreview(artwork);
                        };
                        listRight.appendChild(item);
                    });
                }
            }
        });

        // 绘制地图上的节点
        artworks.forEach(artwork => {
            const pos = nodeMap[artwork.name];
            if (!pos) return;
            const imgSize = 55;
            const labelGroup = labelsGroup.append('g')
                .attr('class', 'artwork-label')
                .attr('data-artwork-slug', artwork.slug)
                .attr('transform', `translate(${pos.x}, ${pos.y})`)
                .style('cursor', 'pointer');

            labelGroup.append('circle').attr('r', 32).attr('fill', '#f4f3ef').style('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))');
            if (artwork.image) {
                const clipId = `clip-${artwork.slug}`;
                svg.selectAll(`#${clipId}`).remove();
                svg.append('defs').append('clipPath').attr('id', clipId).append('circle').attr('cx', 0).attr('cy', 0).attr('r', imgSize / 2);
                labelGroup.append('image').attr('href', artwork.image).attr('x', -imgSize / 2).attr('y', -imgSize / 2).attr('width', imgSize).attr('height', imgSize).attr('clip-path', `url(#${clipId})`);
                labelGroup.append('circle').attr('r', imgSize / 2).attr('fill', 'none').attr('stroke', '#222').attr('stroke-width', 2);
            }

            // 点击照片交互
            labelGroup.on('click', function(event) {
                event.stopPropagation();
                zoomToNode(pos.x, pos.y, artwork.slug);
                if (window.openQuickPreview) window.openQuickPreview(artwork);
            });
        });
    }

    window.addEventListener('langChanged', () => {
        drawNodes(); // 语言改变时重新渲染节点
    });

    drawNodes();
    animate();

    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    window.openQuickPreview = function(artwork) {
        const displayName = getArtworkDisplayName(artwork);
        document.getElementById('modal-title').textContent = displayName;
        document.getElementById('modal-meta').textContent = `${artwork.year} / ${artwork.type || 'WORK'}`;
        document.getElementById('modal-summary').textContent = (window.getCurrentLang() === 'zh' ? artwork.indexNoteZh : artwork.indexNote) || '';
        document.getElementById('modal-theory').textContent = artwork.theory.toUpperCase();
        document.getElementById('modal-keywords').textContent = (window.getCurrentLang() === 'zh' ? artwork.keywordsZh : artwork.keywords).join(' / ');
        const dossierBtn = document.getElementById('btn-open-dossier');
        if (dossierBtn) dossierBtn.href = `artwork-html/${artwork.slug}.html`; 
        
        container.classList.add('blurred');
        modalOverlay.style.display = 'flex';
        // 强制回流以触发渐变
        modalOverlay.offsetHeight; 
        modalOverlay.style.opacity = '1';
        modalOverlay.classList.remove('fading');
        
        // 隐藏 BIO-NETWORK SETTINGS 控制面板
        const controlsPanel = document.getElementById('map-ui-controls');
        if (controlsPanel) {
            controlsPanel.style.opacity = '0';
            controlsPanel.style.pointerEvents = 'none';
        }
        
        window.history.pushState(null, '', `#${artwork.slug}`);
    };
    window.closeQuickPreview = function(isManualInteraction = false) {
        if (modalOverlay.style.display === 'none') return; // 防止重复触发

        container.classList.remove('blurred');
        modalOverlay.style.opacity = '0';
        
        // 延迟隐藏 DOM，让渐变动画完成
        setTimeout(() => {
            if (modalOverlay.style.opacity === '0') {
                modalOverlay.style.display = 'none';
            }
        }, 800);

        window.history.pushState(null, '', window.location.pathname);

        // 移除景深模糊
        canvas.classList.remove('focused-blur');
        g.selectAll('.artwork-label').classed('focused-fade', false).classed('is-active', false);

        // 显示 BIO-NETWORK SETTINGS 控制面板
        const controlsPanel = document.getElementById('map-ui-controls');
        if (controlsPanel) {
            controlsPanel.style.opacity = '1';
            controlsPanel.style.pointerEvents = 'auto';
        }

        // --- 核心更新：在原地自动缩小一倍 ---
        // 只有在主动点击关闭（而非手动拖拽）时，才触发自动缩小
        if (!isManualInteraction) {
            const currentScale = currentTransform.k;
            const targetScale = Math.max(0.8, currentScale * 0.5); // 缩小一倍

            // 获取当前视口中心的地理坐标
            const centerX = (width / 2 - currentTransform.x) / currentTransform.k;
            const centerY = (height / 2 - currentTransform.y) / currentTransform.k;

            svg.transition()
                .duration(1500)
                .ease(d3.easeCubicInOut)
                .call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(width / 2, height / 2)
                        .scale(targetScale)
                        .translate(-centerX, -centerY)
                );
        }
    };

    // --- 核心交互：点击空白处关闭 ---
    svg.on('click', (event) => {
        // 如果点击的是 svg 本身（即点击到了背景网格），则关闭预览
        if (event.target === svg.node()) {
            window.closeQuickPreview();
        }
    });
    if (modalClose) modalClose.onclick = window.closeQuickPreview;
    if (modalOverlay) modalOverlay.onclick = (e) => { if (e.target === modalOverlay) window.closeQuickPreview(); };

    function getArtworkDisplayName(artwork) {
        const currentLang = window.getCurrentLang ? window.getCurrentLang() : 'en';
        return currentLang === 'zh' ? (artwork.nameZh || artwork.name) : (artwork.nameEn || artwork.name);
    }
})();