import React, { useEffect, useState, useRef } from 'react';

const JewelViewer2 = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const viewerRef = useRef(null);

    // Comprehensive mobile detection
    const detectMobile = () => {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        }) || window.innerWidth <= 768;
    };

    // Performance check for mobile devices
    const canRenderHighQuality = () => {
        // Check device capabilities
        const deviceMemory = navigator.deviceMemory || 4; // Default to 4GB if not available
        const hardwareConcurrency = navigator.hardwareConcurrency || 4; // Default to 4 cores

        return deviceMemory >= 4 && hardwareConcurrency >= 4;
    };

    useEffect(() => {
        // Detect mobile and set state
        const checkMobile = () => {
            const mobile = detectMobile();
            setIsMobile(mobile);
            console.log(`Mobile Device Detected: ${mobile}`);
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Fallback loading indicator
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
            console.warn('3D Viewer loading timed out');
        }, 15000); // 15 seconds timeout

        try {
            const viewer = new CoreViewerApp({
                canvas: document.getElementById("viewer-3d"),
                renderManager: {
                    // Adaptive rendering based on device capabilities
                    displayCanvasScaling: isMobile 
                        ? (canRenderHighQuality() 
                            ? Math.min(window.devicePixelRatio, 1.5) 
                            : Math.min(window.devicePixelRatio, 1))
                        : window.devicePixelRatio
                }
            });
            
            viewer
                .initialize({
                    caching: true,
                    plugins: {},
                    ui: {
                        logo: false,
                        branding: false
                    },
                    background: '#FFFFFF'
                })
                .then(async(viewer) => {
                    // Clear loading timeout
                    clearTimeout(loadingTimeout);

                    const diamondPlugin = await viewer.getOrAddPlugin(DiamondPlugin);
                    diamondPlugin.setKey('8KA8HZSP5WDG35XWHADNKPWMCY7F9J4G-HB7Q2BYGER');   
                    
                    // Adaptive render settings
                    viewer.renderManager.displayCanvasScaling = isMobile 
                        ? (canRenderHighQuality() 
                            ? Math.min(window.devicePixelRatio, 1.5) 
                            : Math.min(window.devicePixelRatio, 1))
                        : window.devicePixelRatio;

                    const tarunElement = document.getElementById('ring-3d-output');
                    if (tarunElement) {
                        tarunElement.classList.add('active');
                    }
                    
                    // Disable loading screen
                    const loadingScreen = viewer.getPlugin(LoadingScreenPlugin);
                    if (loadingScreen) {
                        loadingScreen.enabled = false;
                    }
                    
                    viewer.scene.background = '#FFFFFF';

                    // Lightweight loading for mobile
                    const modelToLoad = isMobile 
                        ? "./assets/ring-data/Ajaffe 0512-2.glb" 
                        : "./assets/ring-data/ijwelldaimandshank.glb";

                    Promise.all([
                        viewer.load(modelToLoad)
                    ]).then(() => {
                        setIsLoading(false);
                        if (tarunElement) {
                            setTimeout(() => {
                                tarunElement.classList.remove('active');
                            }, 5000);
                        }
                    }).catch((error) => {
                        setIsLoading(false);
                        console.error("Model loading error: ", error);
                        if (tarunElement) {
                            tarunElement.classList.remove('active');
                            tarunElement.innerHTML = `
                                <div style="text-align: center; color: red; padding: 20px;">
                                    <p>Unable to load 3D model</p>
                                    <small>${error.message}</small>
                                </div>
                            `;
                        }
                    });

                    // Mobile-specific touch handling
                    if (isMobile) {
                        const canvas = document.getElementById('viewer-3d');
                        canvas.addEventListener('touchstart', (e) => {
                            e.preventDefault();
                        }, { passive: false });
                        canvas.addEventListener('touchmove', (e) => {
                            e.preventDefault();
                        }, { passive: false });
                    }
                })
                .catch((initError) => {
                    setIsLoading(false);
                    console.error('Viewer initialization error:', initError);
                });

            // Cleanup
            return () => {
                window.removeEventListener('resize', checkMobile);
            };
        } catch (error) {
            setIsLoading(false);
            console.error('Viewer setup error:', error);
        }
    }, []);
  
    return (
        <div 
            id="ring-3d-output" 
            className={`active-viewer-check ${isMobile ? 'mobile-viewer' : ''}`}
            style={{ 
                width: "100%", 
                height: isMobile ? "50vh" : "100vh",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                overflow: "hidden",
                position: "relative"
            }}
        >
            {isLoading && (
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        zIndex: 10
                    }}
                >
                    <div>Loading 3D Viewer...</div>
                </div>
            )}
            <canvas
                ref={viewerRef}
                id="viewer-3d"
                src="./assets/ring-data/ijwelldaimandshank.glb"
                environment="./assets/hdr/studio_small_09_2k.hdr"
                style={{ 
                    width: "100%",
                    height: "100%", 
                    zIndex: 1, 
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%"
                }}
                enableAntialiasing="true"
                shadowQuality={isMobile ? "low" : "medium"}
                fogEnabled="false"
                enablePostProcessing="false"
                gammaCorrection="true"
            ></canvas>
        </div>
    );
};
  
export default JewelViewer2;