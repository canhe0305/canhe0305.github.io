// 自动加载 img/latest work 文件夹中的视频作为背景
(function() {
    // 视频文件列表（按优先级排序，第一个会被使用）
    // 当文件夹中有新文件时，将最新的文件名添加到数组最前面
    const videoFiles = [
        'img/latest work/horse.mp4',
        // 添加更多文件时，将最新的放在最前面：
        // 'img/latest work/new-video.mp4',
    ];

    // 视频交互状态
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let scale = 1;
    let minScale = 0.5;
    let maxScale = 3;
    let lastX = 0;
    let lastY = 0;

    function loadHeroVideo() {
        // 尝试加载列表中的第一个文件（最新的）
        if (videoFiles.length > 0) {
            const videoPath = videoFiles[0];
            
            // 检查视频文件是否存在（通过创建 Image 对象测试）
            const testVideo = document.createElement('video');
            testVideo.src = videoPath;
            testVideo.onerror = function() {
                console.error('视频文件不存在或无法访问:', videoPath);
                showFallbackImage();
            };
            testVideo.onloadeddata = function() {
                console.log('视频文件存在，开始加载:', videoPath);
                setHeroVideo(videoPath);
                initVideoInteraction();
            };
            // 触发加载检测
            testVideo.load();
            
            // 如果 3 秒内没有响应，显示备用内容
            setTimeout(() => {
                if (testVideo.readyState === 0) {
                    console.warn('视频加载超时，显示备用图片');
                    showFallbackImage();
                }
            }, 3000);
        } else {
            console.warn('没有可用的视频文件');
            showFallbackImage();
        }
    }

    function setHeroVideo(videoPath) {
        const videos = document.querySelectorAll('.hero-video');
        let loadedCount = 0;
        const totalVideos = videos.length;
        
        // 检测文件扩展名，设置正确的 MIME 类型
        const getMimeType = (path) => {
            const ext = path.toLowerCase().split('.').pop();
            const mimeTypes = {
                'mp4': 'video/mp4',
                'webm': 'video/webm',
                'ogv': 'video/ogg',
                'ogg': 'video/ogg'
            };
            return mimeTypes[ext] || 'video/mp4';
        };
        
        const mimeType = getMimeType(videoPath);
        
        videos.forEach((video, index) => {
            // 清除旧的源
            video.innerHTML = '';
            
            // 创建 source 元素并指定 MIME 类型
            const source = document.createElement('source');
            source.src = videoPath;
            source.type = mimeType;
            video.appendChild(source);
            
            // 添加错误处理
            video.onerror = function(e) {
                console.error('视频加载失败:', videoPath, 'MIME类型:', mimeType, '索引:', index, e);
                // 如果所有视频都加载失败，显示备用内容
                loadedCount++;
                if (loadedCount === totalVideos) {
                    console.warn('所有视频加载失败，显示备用图片');
                    showFallbackImage();
                }
            };
            
            // 添加加载成功检测
            video.onloadeddata = function() {
                loadedCount++;
                console.log('视频加载成功:', videoPath, 'MIME类型:', mimeType, `(${loadedCount}/${totalVideos})`);
                
                // 所有视频加载成功后，尝试播放
                if (loadedCount === totalVideos) {
                    videos.forEach((v) => {
                        v.play().catch(error => {
                            console.warn('视频自动播放失败:', error);
                            // 如果自动播放失败，尝试用户交互后播放
                            document.addEventListener('click', function playOnClick() {
                                videos.forEach(v => v.play().catch(() => {}));
                                document.removeEventListener('click', playOnClick);
                            }, { once: true });
                        });
                    });
                }
            };
            
            // 添加 canplaythrough 事件作为备用
            video.oncanplaythrough = function() {
                console.log('视频可以播放:', videoPath);
            };
            
            // 添加 preload 属性确保视频预加载
            video.preload = 'auto';
            video.load();
        });
    }
    
    function showFallbackImage() {
        // 如果视频加载失败，确保图片层可见
        const imageLayer = document.querySelector('.hero-image-layer');
        if (imageLayer) {
            imageLayer.style.opacity = '1';
            imageLayer.style.zIndex = '10';
        }
    }

    function initVideoInteraction() {
        const layers = document.querySelectorAll('.hero-layer');
        
        layers.forEach((layer) => {
            const video = layer.querySelector('.hero-video');
            if (!video) return;

            // 鼠标滚轮缩放
            layer.addEventListener('wheel', (e) => {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                scale = Math.max(minScale, Math.min(maxScale, scale + delta));
                updateVideoTransform(video, currentX, currentY, scale, false);
            }, { passive: false });

            // 鼠标拖拽移动
            layer.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
                lastX = currentX;
                lastY = currentY;
                layer.style.cursor = 'grabbing';
                updateVideoTransform(video, currentX, currentY, scale, true);
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
                updateVideoTransform(video, currentX, currentY, scale, true);
            });

            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    layer.style.cursor = 'grab';
                    updateVideoTransform(video, currentX, currentY, scale, false);
                }
            });

            // 触摸支持
            let touchStartDistance = 0;
            let touchStartScale = scale;
            let touchStartX = 0;
            let touchStartY = 0;

            layer.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    isDragging = true;
                    touchStartX = e.touches[0].clientX - currentX;
                    touchStartY = e.touches[0].clientY - currentY;
                    updateVideoTransform(video, currentX, currentY, scale, true);
                } else if (e.touches.length === 2) {
                    isDragging = false;
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    touchStartDistance = Math.sqrt(dx * dx + dy * dy);
                    touchStartScale = scale;
                    updateVideoTransform(video, currentX, currentY, scale, false);
                }
            });

            layer.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (e.touches.length === 1 && isDragging) {
                    currentX = e.touches[0].clientX - touchStartX;
                    currentY = e.touches[0].clientY - touchStartY;
                    updateVideoTransform(video, currentX, currentY, scale, true);
                } else if (e.touches.length === 2) {
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    scale = Math.max(minScale, Math.min(maxScale, touchStartScale * (distance / touchStartDistance)));
                    updateVideoTransform(video, currentX, currentY, scale, false);
                }
            }, { passive: false });

            layer.addEventListener('touchend', () => {
                if (isDragging) {
                    isDragging = false;
                    updateVideoTransform(video, currentX, currentY, scale, false);
                }
            });
        });
    }

    function getVideoLeftEdgeToImageCenter(x, y, s) {
        // 获取图片容器
        const imageLayer = document.querySelector('.hero-image-layer');
        const centerImage = document.querySelector('.hero-center-image');
        if (!imageLayer || !centerImage) return { distance: Infinity, maxDistance: 0 };
        
        // 获取图片容器的位置和大小
        const imageRect = imageLayer.getBoundingClientRect();
        const imageCenterX = imageRect.left + imageRect.width / 2;
        
        // 获取视频层的实际位置
        const heroRect = document.querySelector('.hero').getBoundingClientRect();
        const videoCenterX = heroRect.width / 2 + x;
        
        // 计算视频的实际宽度（考虑缩放）
        const videoWidth = heroRect.width * s;
        
        // 计算视频左边边缘的位置
        const videoLeftEdgeX = videoCenterX - videoWidth / 2;
        
        // 计算视频左边边缘到图片中心的距离
        // 如果视频左边在图片中心左侧，距离为负；在右侧，距离为正
        const distance = videoLeftEdgeX - imageCenterX;
        
        // 使用图片宽度作为参考距离
        const maxDistance = imageRect.width;
        
        return { distance, maxDistance };
    }

    function updateVideoTransform(video, x, y, s, isDraggingState) {
        const videos = document.querySelectorAll('.hero-video');
        const centerImage = document.querySelector('.hero-center-image');
        const imageCaption = document.querySelector('.hero-image-caption');
        
        let videoBlur = 0;
        
        // 1. 检测视频左边到达图片中心：根据视频左边边缘到图片中心的距离计算模糊
        const { distance, maxDistance } = getVideoLeftEdgeToImageCenter(x, y, s);
        
        // 当视频左边在图片中心左侧时（distance < 0），开始模糊
        // 距离从 -maxDistance 到 0，模糊从 0 到 10
        let dragBlur = 0;
        if (distance < 0) {
            // 视频左边在图片中心左侧，根据距离计算模糊
            const blurRatio = Math.abs(distance) / maxDistance;
            dragBlur = Math.min(10, blurRatio * 10);
        }
        // 当视频左边在图片中心右侧时（distance >= 0），不模糊
        
        // 2. 检测缩放方向（缩小导致模糊，放大取消模糊）
        let scaleBlur = 0;
        if (s < 1) {
            // 缩小：scale 从 1 到 0.5，模糊从 0px 到 10px
            // 使用更平滑的曲线，让模糊度逐渐增加
            const scaleRatio = 1 - s; // 0 到 0.5
            // 使用平方根函数让变化更平滑渐进
            scaleBlur = Math.sqrt(scaleRatio * 2) * 10;
        } else if (s > 1) {
            // 放大：取消所有模糊
            dragBlur = 0;
            scaleBlur = 0;
        }
        
        // 如果放大，直接设置为0；否则取拖动模糊和缩放模糊的较大值
        if (s > 1) {
            videoBlur = 0;
        } else {
            videoBlur = Math.max(dragBlur, scaleBlur);
        }
        
        // 限制模糊值在 0-10 之间
        videoBlur = Math.max(0, Math.min(10, videoBlur));
        
        // 图片和文字的模糊程度与视频模糊成反比
        // 视频模糊 0px 时，图片模糊 10px
        // 视频模糊 10px 时，图片模糊 0px
        const imageBlur = 10 - videoBlur;
        
        videos.forEach((v) => {
            v.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
            v.style.filter = `blur(${videoBlur}px)`;
        });
        
        // 图片和文字使用模糊，而不是透明度
        if (centerImage) {
            centerImage.style.opacity = 1;
            centerImage.style.filter = `blur(${imageBlur}px)`;
        }
        if (imageCaption) {
            imageCaption.style.opacity = 1;
            imageCaption.style.filter = `blur(${imageBlur}px)`;
        }
        
        // 更新最后位置
        lastX = x;
        lastY = y;
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeroVideo);
    } else {
        loadHeroVideo();
    }
})();
