import React from 'react';
import { useEffect } from 'react';

const JewelViewer2 = () => {
    useEffect(() => {
        const viewer = new CoreViewerApp({
          canvas: document.getElementById("viewer-3d")
        });
        
        viewer
          .initialize({
            caching: true,
            plugins: {},
            ui: {
              logo: false,
              branding: false
            },
            background: '#FFFFFF' // Set background to white
          })
          .then(async(viewer) => {
            // viewer.getManager().importer.importPath('./assets/3D Website.vjson', {processImported: true}).then(() => {})
            const diamondPlugin = await viewer.getOrAddPlugin(DiamondPlugin);
            diamondPlugin.setKey('8KA8HZSP5WDG35XWHADNKPWMCY7F9J4G-HB7Q2BYGER');   
            /// Set the quality based on display
            viewer.renderManager.displayCanvasScaling = window.devicePixelRatio;
            const tarunElement = document.getElementById('ring-3d-output');
            if (tarunElement) {
              tarunElement.classList.add('active'); // Add 'active' class
            }
            // Remove or disable the loading screen plugin
            const loadingScreen = viewer.getPlugin(LoadingScreenPlugin);
            if (loadingScreen) {
              loadingScreen.enabled = false; // Disable the loading screen
            }
            
            viewer.scene.background = '#FFFFFF';
            // console.log("Camera position:", viewer.camera.position);
            Promise.all([
              viewer.load("./assets/ring-data/Ajaffe 0512-2.glb"),
              // viewer.load("./assets/ring-data/ijwelldaimandshank.glb")
            ]).then(() => {
              // When both models are fully loaded, remove the 'active' class
              if (tarunElement) {
                setTimeout(() => {
                  tarunElement.classList.remove('active'); // Remove 'active' class after 5 seconds
                }, 8000);
              }
            }).catch((error) => {
              console.error("Model loading error: ", error);
              if (tarunElement) {
                tarunElement.classList.remove('active'); // Ensure 'active' is removed even if loading fails
                // Optional: Add user-friendly error message
                tarunElement.innerHTML = `<p>Error loading 3D model: ${error.message}</p>`;
              }
            });
          });
    }, []);
  
    return (
      <div id="ring-3d-output" className='active-viewer-check' style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* WebGI viewer element */}
        <canvas
          id="viewer-3d"
          src="./assets/ring-data/ijwelldaimandshank.glb"
          environment="./assets/hdr/studio_small_09_2k.hdr"
          style={{ width: "100%",height: "100vh", zIndex: 1, display: "block" }}
          enableAntialiasing="true"           // Enables antialiasing
          shadowQuality="high"                 // Sets shadow quality to high
          fogEnabled="true"                    // Enables fog for depth
          enablePostProcessing="true"          // Enables post-processing effects
          gammaCorrection="true"               // Applies gamma correction
          // vjson='./assets/view_config.vjson'
        ></canvas>
      </div>
    );
  };
  export default JewelViewer2;