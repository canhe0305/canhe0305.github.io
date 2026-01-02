// 初始化地图
(function() {
    // 科罗拉多州中心坐标（Denver 附近）
    const coloradoCenter = [39.7392, -104.9903];
    
    // 创建地图（优化：禁用不必要的功能）
    const map = L.map('map-container', {
        center: coloradoCenter,
        zoom: 8,
        minZoom: 5, // 降低最小缩放级别，允许看到更大范围
        maxZoom: 12,
        zoomControl: false,
        attributionControl: false,
        preferCanvas: false, // 不使用 Canvas，确保图片可以正常显示
        updateWhenIdle: true, // 只在空闲时更新
        updateWhenZooming: false, // 缩放时不更新，减少卡顿
        maxBounds: null, // 移除边界限制
        worldCopyJump: false // 禁用世界复制跳转
    });

    // 使用深色底图（无标签版本，去掉地图上的文字）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);
    
    // 如果底图加载失败，使用备用方案（无标签版本）
    setTimeout(() => {
        if (!map.hasLayer(map._layers[Object.keys(map._layers)[0]])) {
            // 使用无标签的深色底图作为备用
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
                attribution: '',
                maxZoom: 19,
                subdomains: 'abcd'
            }).addTo(map);
        }
    }, 1000);

    // 科罗拉多州主要城市坐标和人口密度数据
    const cities = [
        { name: 'Denver', lat: 39.7392, lng: -104.9903, density: 9 },
        { name: 'Aurora', lat: 39.7294, lng: -104.8319, density: 8.5 },
        { name: 'Lakewood', lat: 39.7047, lng: -105.0814, density: 8 },
        { name: 'Fort Collins', lat: 40.5853, lng: -105.0844, density: 7.5 },
        { name: 'Boulder', lat: 40.0150, lng: -105.2705, density: 8 },
        { name: 'Loveland', lat: 40.3978, lng: -105.0749, density: 7 },
        { name: 'Longmont', lat: 40.1672, lng: -105.1019, density: 7 },
        { name: 'Arvada', lat: 39.8028, lng: -105.0875, density: 7.5 },
        { name: 'Westminster', lat: 39.8367, lng: -105.0372, density: 7.5 },
        { name: 'Thornton', lat: 39.8680, lng: -104.9719, density: 7.5 },
        { name: 'Greeley', lat: 40.4233, lng: -104.7091, density: 6 },
        { name: 'Broomfield', lat: 39.9205, lng: -105.0867, density: 7 },
        { name: 'Littleton', lat: 39.6133, lng: -105.0166, density: 7 },
        { name: 'Centennial', lat: 39.5803, lng: -104.8772, density: 7 },
        { name: 'Parker', lat: 39.5186, lng: -104.7614, density: 6.5 },
        { name: 'Castle Rock', lat: 39.3722, lng: -104.8561, density: 6 },
        { name: 'Vail', lat: 39.6403, lng: -106.3742, density: 4 },
        { name: 'Breckenridge', lat: 39.4817, lng: -106.0384, density: 4 },
        { name: 'Aspen', lat: 39.1911, lng: -106.8175, density: 3 },
        { name: 'Steamboat Springs', lat: 40.4850, lng: -106.8317, density: 3.5 },
        { name: 'Obedience Play', lat: 41.25, lng: -102.75, density: 5 },
        { name: 'Where Is the Price', lat: 38.0, lng: -107.2, density: 4 },
        { name: 'The Block and the Tower', lat: 40.9, lng: -106.4, density: 4 },
        { name: 'Cannit', lat: 38.6, lng: -103.8, density: 4 },
        { name: 'The fallen gospel', lat: 40.6, lng: -103.4, density: 4 },
        { name: 'The awkward relationship', lat: 40.1, lng: -106.0, density: 4 },
        { name: 'Newman', lat: 37.8, lng: -108.8, density: 4 },
        { name: 'Machine relics', lat: 40.4, lng: -105.2, density: 4 },
        { name: 'Triple Merit Students', lat: 39.2, lng: -105.0, density: 4 },
        { name: 'Consumable Icons', lat: 41.35, lng: -101.45, density: 4 },
        { name: 'Treasure of the Mundane World', lat: 39.8, lng: -104.7, density: 4 }
    ];


    // 添加城市标签
    cities.forEach(city => {
        // 如果是作品，添加图片覆盖层（会随地图缩放而放大）
        const artworkNames = ['Obedience Play', 'Where Is the Price', 'The Block and the Tower', 'Canit', 'The Fallen Gospel', 'Awkward Relationship', 'New Man', 'Machine Relics', 'Triple Merit Students', 'Cleansing Objects', 'Treasure of the Mundane World'];
        if (artworkNames.includes(city.name)) {
            // 根据作品名称选择对应的图片
            let imagePath;
            if (city.name === 'Obedience Play') {
                imagePath = 'img/art work/Obedience Play/Obedience Play-icon.png';
            } else if (city.name === 'Where Is the Price') {
                imagePath = 'img/art work/where is the price/where is the price-icon.jpg';
            } else if (city.name === 'The Block and the Tower') {
                imagePath = 'img/art work/The block and the tower/the block and the tower-icon.jpg';
            } else if (city.name === 'Cannit') {
                imagePath = 'img/art work/canit/canit-icon.jpg';
            } else if (city.name === 'The fallen gospel') {
                imagePath = 'img/art work/the fallen gospel/the fallen gospel-icon.jpg';
            } else if (city.name === 'The awkward relationship') {
                imagePath = 'img/art work/the awkward relationship/awkward relationship-icon.jpg';
            } else if (city.name === 'Newman') {
                imagePath = 'img/art work/newman/newman-icon.jpg';
            } else if (city.name === 'Machine relics') {
                imagePath = 'img/art work/machine relics/machine relics-icon.jpg';
            } else if (city.name === 'Triple Merit Students') {
                imagePath = 'img/art work/Triple Merit Students/Triple Merit Students-icon.jpg';
            } else if (city.name === 'Consumable Icons') {
                imagePath = 'img/art work/Consumable Icons/Consumable Icons-icon.jpg';
            } else if (city.name === 'Treasure of the Mundane World') {
                imagePath = 'img/art work/Treasure of the Mundane World/Treasure of the Mundane World-icon.jpg';
            }
            
            // 先加载图片获取原始尺寸，然后根据宽高比计算边界框
            const img = new Image();
            img.onload = function() {
                const imgWidth = this.width;
                const imgHeight = this.height;
                const aspectRatio = imgWidth / imgHeight;
                
                // 使用 imageOverlay 让图片像地图上的真实物体一样，随缩放而变大
                // 根据图片宽高比定义图片覆盖的地理区域（保持原始比例）
                // 不同作品使用不同大小
                let baseSize = 0.3;
                if (city.name === 'Where Is the Price') {
                    baseSize = 0.5;
                } else if (city.name === 'The Block and the Tower') {
                    baseSize = 0.4;
                } else if (city.name === 'Cannit') {
                    baseSize = 0.35;
                } else if (city.name === 'The fallen gospel') {
                    baseSize = 0.35;
                } else if (city.name === 'The awkward relationship') {
                    baseSize = 0.35;
                } else if (city.name === 'Newman') {
                    baseSize = 0.7; // 竖状图片，放大2倍
                } else if (city.name === 'Machine relics') {
                    baseSize = 0.25; // 不是特别重要的作品，小一点
                } else if (city.name === 'Triple Merit Students') {
                    baseSize = 0.35;
                } else if (city.name === 'Consumable Icons') {
                    baseSize = 0.35;
                } else if (city.name === 'Treasure of the Mundane World') {
                    baseSize = 0.35;
                }
                
                // 需要考虑地图投影：在墨卡托投影中，需要根据纬度调整经度比例
                // 在科罗拉多州（约39-40度），经度的实际距离约为纬度的 0.76 倍
                const latCorrection = Math.cos(city.lat * Math.PI / 180);
                
                let latSize, lngSize;
                if (aspectRatio > 1) {
                    // 图片是横向的（宽 > 高），图片宽度对应经度，高度对应纬度
                    // 需要补偿经度的实际距离差异
                    latSize = baseSize;
                    lngSize = (baseSize * aspectRatio) / latCorrection;
                } else {
                    // 图片是纵向的（高 > 宽），图片高度对应纬度，宽度对应经度
                    latSize = baseSize;
                    lngSize = (baseSize * aspectRatio) / latCorrection;
                }
                
                const imageBounds = [
                    [city.lat - latSize, city.lng - lngSize], // 西南角
                    [city.lat + latSize, city.lng + lngSize]  // 东北角
                ];
                
                const cityImage = L.imageOverlay(imagePath, imageBounds, {
                    opacity: 1,
                    interactive: true // 允许交互，用于拖动
                }).addTo(map);
                
                // 确保图片在正确的图层上，不被其他图层覆盖
                cityImage.bringToFront();
                
                // 添加拖动功能来调整图片位置
                let isDraggingImage = false;
                let dragStartPoint = null;
                let dragStartBounds = null;
                
                // 获取图片的 DOM 元素
                const imageElement = cityImage.getElement();
                if (imageElement) {
                    imageElement.style.cursor = 'move';
                    
                    // 为 "The awkward relationship" 图片应用位置偏移
                    if (city.name === 'The awkward relationship') {
                        // 使用 setTimeout 确保 Leaflet 完成初始定位后再应用偏移
                        const applyOffset = () => {
                            if (imageElement) {
                                imageElement.style.setProperty('left', '14px', 'important');
                                imageElement.style.setProperty('top', '135px', 'important');
                            }
                        };
                        
                        setTimeout(applyOffset, 100);
                        
                        // 监听地图更新事件，重新应用偏移
                        map.on('moveend', applyOffset);
                        map.on('zoomend', applyOffset);
                        map.on('viewreset', applyOffset);
                    }
                    
                    imageElement.addEventListener('mousedown', (e) => {
                        e.stopPropagation(); // 阻止地图拖动
                        isDraggingImage = true;
                        dragStartPoint = map.mouseEventToLatLng(e);
                        dragStartBounds = imageBounds;
                        imageElement.style.cursor = 'grabbing';
                    });
                    
                    document.addEventListener('mousemove', (e) => {
                        if (!isDraggingImage) return;
                        e.stopPropagation();
                        e.preventDefault();
                        
                        const currentPoint = map.mouseEventToLatLng(e);
                        const deltaLat = currentPoint.lat - dragStartPoint.lat;
                        const deltaLng = currentPoint.lng - dragStartPoint.lng;
                        
                        // 计算新的边界
                        const newBounds = [
                            [dragStartBounds[0][0] + deltaLat, dragStartBounds[0][1] + deltaLng],
                            [dragStartBounds[1][0] + deltaLat, dragStartBounds[1][1] + deltaLng]
                        ];
                        
                        // 更新图片位置
                        cityImage.setBounds(newBounds);
                        
                        // 更新存储的地理坐标
                        city.lat = (newBounds[0][0] + newBounds[1][0]) / 2;
                        city.lng = (newBounds[0][1] + newBounds[1][1]) / 2;
                    });
                    
                    document.addEventListener('mouseup', () => {
                        if (isDraggingImage) {
                            isDraggingImage = false;
                            if (imageElement) {
                                imageElement.style.cursor = 'move';
                            }
                        }
                    });
                    
                    // 触摸支持
                    imageElement.addEventListener('touchstart', (e) => {
                        e.stopPropagation();
                        if (e.touches.length === 1) {
                            isDraggingImage = true;
                            const touch = e.touches[0];
                            dragStartPoint = map.mouseEventToLatLng({
                                clientX: touch.clientX,
                                clientY: touch.clientY
                            });
                            dragStartBounds = imageBounds;
                        }
                    }, { passive: false });
                    
                    document.addEventListener('touchmove', (e) => {
                        if (!isDraggingImage || e.touches.length !== 1) return;
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const touch = e.touches[0];
                        const currentPoint = map.mouseEventToLatLng({
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        });
                        const deltaLat = currentPoint.lat - dragStartPoint.lat;
                        const deltaLng = currentPoint.lng - dragStartPoint.lng;
                        
                        const newBounds = [
                            [dragStartBounds[0][0] + deltaLat, dragStartBounds[0][1] + deltaLng],
                            [dragStartBounds[1][0] + deltaLat, dragStartBounds[1][1] + deltaLng]
                        ];
                        
                        cityImage.setBounds(newBounds);
                        city.lat = (newBounds[0][0] + newBounds[1][0]) / 2;
                        city.lng = (newBounds[0][1] + newBounds[1][1]) / 2;
                    }, { passive: false });
                    
                    document.addEventListener('touchend', () => {
                        if (isDraggingImage) {
                            isDraggingImage = false;
                        }
                    });
                }
            };
            img.src = imagePath;
        }
        // 不显示任何文字标签
    });

    // 生成作品列表（从实际数据中提取）
    const artworksList = document.getElementById('artworks-list');
    if (artworksList) {
        const artworkNames = ['Obedience Play', 'Where Is the Price', 'The Block and the Tower', 'Canit', 'The Fallen Gospel', 'Awkward Relationship', 'New Man', 'Machine Relics', 'Triple Merit Students', 'Cleansing Objects', 'Treasure of the Mundane World'];
        
        // 按照在 cities 数组中的顺序显示
        cities.forEach(city => {
            if (artworkNames.includes(city.name)) {
                const item = document.createElement('div');
                item.className = 'artwork-item';
                item.textContent = city.name;
                artworksList.appendChild(item);
            }
        });
    }

    // 禁用默认的缩放控件，如果需要可以自定义添加
    // map.addControl(L.control.zoom({ position: 'bottomright' }));
})();
