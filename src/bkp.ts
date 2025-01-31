// import React, { useEffect } from 'react';

// const JewelViewer = () => {
//   // useEffect(() => {
//   //   // Dynamically load the WebGI viewer script
//   //   const script = document.createElement("script");
//   //   script.src = "https://dist.pixotronics.com/webgi/runtime/viewer-0.9.15.js";
//   //   script.async = true;
//   //   document.body.appendChild(script);

//   //   // Clean up the script on component unmount
//   //   return () => {
//   //     document.body.removeChild(script);
//   //   };
//   // }, []);

//   // return (
//   //   <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//   //     <div style={{ width: "50%" }}>
//   //       {/* You can add any additional content here if needed */}
//   //     </div>
//   //     <div style={{ width: "50%", position: "relative" }}>
//   //       {/* WebGI viewer element */}
//   //       <webgi-viewer
//   //         id="viewer-3d"
//   //         src="./assets/ring-data/SHANK/0.04cts_SHANK.glb"
//   //         environment="./assets/hdr/Jewel-hdri-diamond-set1-3.hdr"
//   //         style={{ width: "100%", height: "100%", zIndex: 1, display: "block" }}
//   //       ></webgi-viewer>
//   //     </div>
//   //   </div>
//   // );
//   // useEffect(() => {
//   //   // Dynamically load the WebGI viewer script
//   //   const script = document.createElement("script");
//   //   script.src = "https://dist.pixotronics.com/webgi/runtime/viewer-0.9.15.js";
//   //   script.async = true;
//   //   document.body.appendChild(script);

//   //   script.onload = () => {
//   //     const viewer = document.querySelector("#viewer-3d");

//   //     // When the viewer is ready, load both GLB models
//   //     viewer.addEventListener("webgi-ready", async () => {
//   //       const app = viewer.getApp();
        
//   //       // Load the first GLB model
//   //       await app.loadScene("./assets/HEAD/Round/4 Prong Round/shank.glb");
//   //       console.log("First GLB model loaded.");

//   //       // Load the second GLB model
//   //       await app.loadScene("./assets/ring-data/SHANK/0.04cts_SHANK.glb");
//   //       console.log("Second GLB model loaded.");
//   //     });
//   //   };

//   //   return () => {
//   //     document.body.removeChild(script);
//   //   };
//     useEffect(() => {
//       // Dynamically load the WebGI viewer script
//       const script = document.createElement("script");
//       script.src = "https://dist.pixotronics.com/webgi/runtime/viewer-0.9.15.js";
//       script.async = true;
//       document.body.appendChild(script);
  
//       script.onload = () => {
//         const viewer = document.querySelector("#viewer-3d");
  
//         viewer.addEventListener("webgi-ready", async () => {
//           const app = viewer.getApp();
          
//           // Load both GLB models at the same time
//           const loadFirstModel = app.loadScene("./assets/HEAD/Round/4 Prong Round/shank.glb");
//           // const loadSecondModel = app.loadScene("./assets/ring-data/SHANK/0.04cts_SHANK.glb");
  
//           // Wait for both models to be loaded
//           // await Promise.all([loadFirstModel, loadSecondModel]);
//           console.log("Both models loaded at the same time.");
//         });
//       };
  
//       return () => {
//         document.body.removeChild(script);
//       };
//   }, []);

//   return (
//     <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//       <div style={{ width: "50%" }}>
//         {/* Any additional content goes here */}
//       </div>
//       <div style={{ width: "50%", position: "relative" }}>
//         {/* WebGI viewer element */}
//         <webgi-viewer
//           id="viewer-3d"
//           environment="./assets/hdr/Jewel-hdri-diamond-set1-3.hdr"
//           style={{ width: "100%", height: "100%", zIndex: 1, display: "block" }}
//         ></webgi-viewer>
//       </div>
//     </div>
//   );
// };
// function App() {

//   return (
//     <div className="App">
//       <JewelViewer />
//     </div>
//   );
// }

// export default App;
