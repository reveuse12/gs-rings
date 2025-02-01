import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  TonemapPlugin,
  timeout,
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.9.1.mjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ringIcon from "../assets/ring.png";
import * as THREE from "three";
// import * as THREE from 'three';
// import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
// import 'swiper/swiper-bundle.min.css';

import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ".././App.css";
import html2canvas from "html2canvas";
import DiamondList from "./DiamondList.jsx";
import Swal from "sweetalert2"; // Import SweetAlert
import InfoSection from "../component/InfoSection.jsx";

const JewelViewer2 = ({
  diamonds,
  sideDaimandStonType,
  metal,
  shankurl = "3D Website",
  halourl = "3D Website",
}) => {
  const [resetcamera, setresetcamera] = useState(false);
  useEffect(() => {
    const viewer = new CoreViewerApp({
      canvas: document.getElementById("viewer-3d"),
    });

    viewer
      .initialize({
        caching: true,
        plugins: {
          MaterialConfiguratorPlugin: true,
        },
        ui: {
          logo: false,
          branding: false,
        },
      })
      .then(async (viewer) => {
        var modelsize;
        const diamondPlugin = await viewer.getOrAddPlugin(DiamondPlugin);
        var materialConfiguratorPlugin = await viewer.getOrAddPlugin(
          MaterialConfiguratorPlugin
        );
        // const materialConfigurator = viewer.plugins.get('materialConfiguratorPlugin');
        diamondPlugin.setKey("8KA8HZSP5WDG35XWHADNKPWMCY7F9J4G-HB7Q2BYGER");

        viewer.renderManager.displayCanvasScaling = window.devicePixelRatio;
        const tarunElement = document.getElementById("ring-3d-output");
        if (tarunElement) {
          tarunElement.classList.add("active");
        }
        const loadingScreen = viewer.getPlugin(LoadingScreenPlugin);
        if (loadingScreen) {
          loadingScreen.enabled = false;
        }

        // console.log(material.variations.length > 0 ? material.variations.map(variation => variation.name) : 'No variations found');
        // console.log(material.variations[0].materials[0]);
        // console.log(materialConfiguratorPlugin);
        // materialConfiguratorPlugin.applyVariation('Metal 01', 2);
        const config = await viewer.addPlugin(VariationConfiguratorPlugin);
        await config.importPath("/assets/config.json");
        await viewer
          .getManager()
          .importer.importPath("./assets/3D Websitetest2.vjson", {
            processImported: true,
          })
          .then(() => {});
        viewer.scene.background = "#ffffff";
        document.querySelectorAll(".object").forEach((el) => {
          const index = parseInt(el.getAttribute("data-index"));
          const category = config.variations.objects.find(
            (cat) => cat.name === el.getAttribute("data-category")
          );
          const type = "objects";
          el.addEventListener("click", async () => {
            await config.applyVariation(category, index, type);

            // optional - sample for making changes to the loaded object. (commented below)
            // get the object reference
            const obj = viewer.scene.findObjectsByName(
              config.utils.getName(category)
            )[0]?.modelObject;
            if (!obj) return;
            var value = metal;
            var gem01 = diamonds;
            var gem02 = sideDaimandStonType[0];
            var gem03 = sideDaimandStonType[1];
            var gem04 = sideDaimandStonType[2];
            // console.log(gem01);
            // setTimeout(() => {
            document
              .querySelectorAll(".metal-selection.active")
              .forEach((box) => {
                // if (box.textContent == metal) {
                box.click();
                // }
              });
            document
              .querySelectorAll("#GEM01 .box-ring-selection-box.active")
              .forEach((box) => {
                // if (box.textContent == gem01) {
                box.click();
                // }
              });
            document
              .querySelectorAll("#GEM02 .box-ring-selection-box.active")
              .forEach((box) => {
                // if (box.textContent == gem02) {
                box.click();
                // }
              });
            document
              .querySelectorAll("#GEM03 .box-ring-selection-box.active")
              .forEach((box) => {
                // if (box.textContent == gem03) {
                box.click();
                // }
              });
            document
              .querySelectorAll("#GEM04 .box-ring-selection-box.active")
              .forEach((box) => {
                // if (box.textContent == gem04) {
                box.click();
                // }
              });
            // }, 1000);
          });
          // apply the first one
          if (index === 0) el.click();
          var value = metal;
          var gem01 = diamonds;
          var gem02 = sideDaimandStonType[0];
          var gem03 = sideDaimandStonType[1];
          var gem04 = sideDaimandStonType[2];
          // console.log(gem01);
          setTimeout(() => {
            document
              .querySelectorAll(".box-ring-selection-box")
              .forEach((box) => {
                if (box.textContent == value) {
                  box.click();
                }
              });
            document
              .querySelectorAll("#GEM01 .box-ring-selection-box")
              .forEach((box) => {
                if (box.textContent == gem01) {
                  box.click();
                }
              });
            document
              .querySelectorAll("#GEM02 .box-ring-selection-box")
              .forEach((box) => {
                if (box.textContent == gem02) {
                  box.click();
                }
              });
            document
              .querySelectorAll("#GEM03 .box-ring-selection-box")
              .forEach((box) => {
                if (box.textContent == gem03) {
                  box.click();
                }
              });
            document
              .querySelectorAll("#GEM04 .box-ring-selection-box")
              .forEach((box) => {
                if (box.textContent == gem04) {
                  box.click();
                }
              });
          }, 1000);
        });
        // document.querySelectorAll(".material").forEach((el) => {
        //   const index = parseInt(el.getAttribute("data-index"));
        //   const category = config.variations.materials.find((cat) => cat.name === el.getAttribute("data-category"));
        //   const type = "materials";
        //   el.addEventListener("click", async () => {
        //     await config.applyVariation(category, index, type);
        //   });
        //   if(index === 0) el.click()
        // });
        // document.querySelectorAll(".diamond").forEach((el) => {
        //   const index = parseInt(el.getAttribute("data-index"));
        //   const category = config.variations.materials.find((cat) => cat.name === el.getAttribute("data-category"));
        //   const type = "materials";
        //   el.addEventListener("click", async () => {
        //     await config.applyVariation(category, index, type);
        //   });
        //   if(index === 0) el.click()
        // });
        viewer.scene.background = "#FFFFFF";
        // document.querySelectorAll('.box-ring-selection-box').forEach(element => {
        //   element.addEventListener('click', async () => {
        //     console.log(viewer.RootScene);
        //     // console.log(viewer.scene.activeCamera.position);
        //     let activecamera = viewer.scene.activeCamera.position;
        //     const Daimandsetting = document.querySelector('.box-ring-selection-box.active[Daimandsetting-item]').getAttribute('Daimandsetting-item');
        //     const RingStyleDesigntype = document.querySelector('.box-ring-selection-box.active[RingStyleDesigntype-item]').getAttribute('RingStyleDesigntype-item');
        //     const Daimandtype = document.querySelector('.box-ring-selection-box.active[Daimandtype-item]').getAttribute('Daimandtype-item');
        //     await Promise.all([
        //       viewer.load(`./assets/all/${Daimandsetting}/${RingStyleDesigntype}`),
        //       // viewer.load(`./assets/all/${Daimandsetting}/${Daimandtype}`),
        //     ]).then(() => {}).catch((error) => {});
        //   });
        // });
        const Daimandsetting = document
          .querySelector(".box-ring-selection-box.active[Daimandsetting-item]")
          .getAttribute("Daimandsetting-item");
        const RingStyleDesigntype = document
          .querySelector(
            ".box-ring-selection-box.active[RingStyleDesigntype-item]"
          )
          .getAttribute("RingStyleDesigntype-item");
        const Daimandtype = document
          .querySelector(".box-ring-selection-box.active[Daimandtype-item]")
          .getAttribute("Daimandtype-item");
        // await Promise.all([
        //   viewer.load(shankurl),
        //   viewer.load(`./assets/all/${Daimandsetting}/${Daimandtype}`),
        // ]).then(() => {
        //   const threeScene = viewer.scene;
        // console.log(threeScene);
        if (tarunElement) {
          setTimeout(() => {
            tarunElement.classList.remove("active");
            document.querySelector(".daimand-body").classList.remove("active");
          }, 3000);
          setTimeout(() => {
            document.querySelector(".daimand-body").classList.remove("active");
          }, 5000);
        }
        //   modelsize = new THREE.Box3().setFromObject(threeScene).getSize(new THREE.Vector3());
        //   viewer.scene.activeCamera.position.set(modelsize.x / 2, modelsize.y + 2, modelsize.z * 10);

        //   document.getElementById('viewer-3d').setAttribute('cameraX', `${modelsize.x}`);
        //   document.getElementById('viewer-3d').setAttribute('cameraY', `${modelsize.y}`);
        //   document.getElementById('viewer-3d').setAttribute('cameraZ', `${modelsize.z}`);

        // }).catch((error) => {
        //   // console.error("Model loading error: ", error);
        //   if (tarunElement) {
        //     tarunElement.classList.remove('active');
        //   }
        // });
        // const dMat = await viewer
        //   .getManager()
        //   .importer.importSinglePath("./assets/diamond-material.dmat");
        // console.log(dMat);

        // const diamonds = [
        //   "Gem_Oval",
        //   "Gem_Princess",
        //   "Gem_Cushion",
        //   "Gem_Baguette",
        //   "Gem_Emerald",
        //   "Gem_Asscher",
        //   "Gem_Elongated",
        //   "Cushion",
        //   "Elongated",
        //   "Gem_Pear",
        //   "Gem_Marquise",
        //   "Gem_Heart",
        //   "Gem_Round_2",
        //   "Gem_Oval_2",
        //   "Gem_Princess_2",
        //   "Gem_Cushion_2",
        //   "Gem_Baguette_2",
        //   "Gem_Emerald_2",
        //   "Gem_Asscher_2",
        //   "Gem_Elongated",
        //   "Cushion_2",
        //   "Gem_Elongated Cushion_2",
        //   "Gem_Pear_2",
        //   "Gem_Marquise_2",
        //   "Marquise",
        //   "Gem_Heart_2",
        //   "Gem_Round_3",
        //   "Gem_Oval_3",
        //   "Gem_Princess_3",
        //   "Gem_Cushion_3",
        //   "Gem_Baguette_3",
        //   "Gem_Emerald_3",
        //   "Gem_Asscher_3",
        //   "Gem_Elongated",
        //   "Cushion_3",
        //   "Gem_Elongated Cushion_3",
        //   "Gem_Pear_3",
        //   "Gem_Marquise_3",
        //   "Gem_Heart_3",
        //   "Diamond_Round",
        //   "Round_Diamond",
        //   "Diamond_Oval",
        //   "Diamond_Princess",
        //   "Diamond_Cushion",
        //   "Diamond_Baguette",
        //   "Diamond_Emerald",
        //   "Diamond_Asscher",
        //   "Diamond_Elongated",
        //   "Diamond_Pear",
        //   "Diamond_Marquise",
        //   "Diamond_Heart",
        //   "Diamond_Round_2",
        //   "Diamond_Oval_2",
        //   "Diamond_Princess_2",
        //   "Diamond_Cushion_2",
        //   "Diamond_Baguette_2",
        //   "Diamond_Emerald_2",
        //   "Diamond_Asscher_2",
        //   "Diamond_Elongated",
        //   "Diamond_Elongated Cushion_2",
        //   "Diamond_Pear_2",
        //   "Diamond_Marquise_2",
        //   "Marquise",
        //   "Diamond_Heart_2",
        //   "Diamond_Round_3",
        //   "Diamond_Oval_3",
        //   "Diamond_Princess_3",
        //   "Diamond_Cushion_3",
        //   "Diamond_Baguette_3",
        //   "Diamond_Emerald_3",
        //   "Diamond_Asscher_3",
        //   "Diamond_Elongated",
        //   "Cushion_3",
        //   "Diamond_Elongated Cushion_3",
        //   "Diamond_Pear_3",
        //   "Diamond_Marquise_3",
        //   "Diamond_Heart_3",
        //   "Gem Count On Curve Gem",
        // ];

        // diamonds.forEach((diamond) => {
        //   const meshes = viewer.scene.findObjectsByName(diamond);

        //   meshes.forEach((mesh) => {
        //     // Prepare the meshes where the material needs to be applied.
        //     viewer
        //       .getPlugin(DiamondPlugin)
        //       .prepareDiamondMesh(mesh, { cacheKey: "d1", normalMapRes: 512 });

        //     // Assign the material
        //     mesh.setMaterial(dMat);
        //   });
        // });

        document
          .getElementById("front-camera-button")
          .addEventListener("click", () => {
            const cameraX = document
              .getElementById("viewer-3d")
              .getAttribute("cameraX");
            const cameraY = document
              .getElementById("viewer-3d")
              .getAttribute("cameraY");
            const cameraZ = document
              .getElementById("viewer-3d")
              .getAttribute("cameraZ");
            viewer.scene.activeCamera.position.set(
              cameraX / 2,
              cameraY + 2,
              cameraZ * 10
            );
          });
        document
          .getElementById("left-camera-button")
          .addEventListener("click", () => {
            const cameraX = document
              .getElementById("viewer-3d")
              .getAttribute("cameraX");
            const cameraY = document
              .getElementById("viewer-3d")
              .getAttribute("cameraY");
            const cameraZ = document
              .getElementById("viewer-3d")
              .getAttribute("cameraZ");
            viewer.scene.activeCamera.position.set(
              cameraX * 10,
              cameraY + 2,
              cameraZ / 2
            );
          });
        var value = metal;
        var gem01 = diamonds;
        var gem02 = sideDaimandStonType[0];
        var gem03 = sideDaimandStonType[1];
        var gem04 = sideDaimandStonType[2];
        // console.log(gem01);
        setTimeout(() => {
          document
            .querySelectorAll(".box-ring-selection-box")
            .forEach((box) => {
              if (box.textContent == value) {
                box.click();
              }
            });
          document
            .querySelectorAll("#GEM01 .box-ring-selection-box")
            .forEach((box) => {
              if (box.textContent == gem01) {
                box.click();
              }
            });
          document
            .querySelectorAll("#GEM02 .box-ring-selection-box")
            .forEach((box) => {
              if (box.textContent == gem02) {
                box.click();
              }
            });
          document
            .querySelectorAll("#GEM03 .box-ring-selection-box")
            .forEach((box) => {
              if (box.textContent == gem03) {
                box.click();
              }
            });
          document
            .querySelectorAll("#GEM04 .box-ring-selection-box")
            .forEach((box) => {
              if (box.textContent == gem04) {
                box.click();
              }
            });
        }, 1000);
        // console.log(sideDaimandStonType);
        setresetcamera(false);
      });
    return () => {
      viewer.dispose();
      // materialConfiguratorPlugin.reset();
    };
  }, []);
  // }, [resetcamera, shankurl, halourl]);

  return (
    <div id="ring-3d-output" className="sticky" style={{ width: "100%" }}>
      <canvas
        id="viewer-3d"
        src="./assets/ring-data/ijwelldaimandshank.glb"
        environment="./assets/hdr/studio_small_09_2k.hdr"
        style={{
          width: "100%",
          height: "calc(100vw * 0.3)",
          zIndex: 1,
          display: "block",
        }}
        enableAntialiasing="true"
        shadowQuality="high"
        fogEnabled="true"
        enablePostProcessing="true"
        gammaCorrection="true"
      ></canvas>
      <button id="front-camera-button" style={{ opacity: 0 }}>
        Front Camera
      </button>
      <button id="left-camera-button" style={{ opacity: 0 }}>
        Left Camera
      </button>
    </div>
  );
};

// Add this default retailers data
const DEFAULT_RETAILERS = {
  jewelry_retailers: [
    { ID: 1, RetailerCity: "New York", RetailerName: "Gems & Gold" },
    { ID: 2, RetailerCity: "Los Angeles", RetailerName: "Sparkling Treasures" },
    { ID: 3, RetailerCity: "Chicago", RetailerName: "Elegant Jewels" },
    { ID: 4, RetailerCity: "Miami", RetailerName: "Shimmering Stones" },
    { ID: 5, RetailerCity: "San Francisco", RetailerName: "The Diamond Shop" },
    { ID: 6, RetailerCity: "Seattle", RetailerName: "Vintage Vibes Jewelry" },
    { ID: 7, RetailerCity: "Dallas", RetailerName: "Timeless Trinkets" },
    { ID: 8, RetailerCity: "Atlanta", RetailerName: "Luxe Jewelry Boutique" },
    { ID: 9, RetailerCity: "Boston", RetailerName: "Precious Pieces" },
    { ID: 10, RetailerCity: "Denver", RetailerName: "Artisan Adornments" },
  ],
};

const Loader = () => (
  <div className="loader">
    {/* You can customize the loader style here */}
    <p>Loading...</p>
  </div>
);

function Home() {
  const [activestep, setactivestep] = useState(1);
  const [Shankbandtype, setShankbandtype] = useState("Most Popular");
  const [RingStyleDesigntype, setRingStyleDesigntype] = useState("Shank.glb");
  const [Daimandtype, setDaimandtype] = useState("Pear.glb");
  const [DaimandCarat, setDaimandCarat] = useState("1.00 ct");
  const [sideDaimandCarat, setsideDaimandCarat] = useState("0.10 ct");
  const [sideDaimandlength, setsideDaimandlength] = useState("Quarter");
  const [Daimandsetting, setDaimandsetting] = useState("4 PRONG");
  const [Ringmetal, setRingmetal] = useState("Platinum");
  const [DaimandStonType, setDaimandStonType] = useState("Diamond");
  const [sideDaimandStonType, setsideDaimandStonType] = useState([
    "Diamond",
    "Diamond",
    "Diamond",
    "Diamond",
    "Diamond",
    "Diamond",
  ]);
  const [count, setCount] = useState(0);
  const [pricing, setpricing] = useState("$0");
  const [roundModel, setRoundModel] = useState("1.00ct.glb");
  const [shapeModel, setShapeModel] = useState("Round");
  const [prongModel, setProngModel] = useState("4 Prong Round/4 Prong Round_");
  const [ringmetalModel, setRingcolorModel] = useState("#b1b1b1");
  const [daimandModel, setDaimandcolorModel] = useState("#F6F6F2");
  const [showPopup, setShowPopup] = useState(false);
  const [brevoId, setBrevoId] = useState("");
  const [brevoToken, setBrevoToken] = useState("");
  const [matchingBand, setMatchingBand] = useState(1);
  const [retailer, setRetailer] = useState("false");
  const [retailerid, setRetailerid] = useState("");
  const [retailerEmail, setRetailerEmail] = useState("");
  const [retailerName, setRetailerName] = useState("");
  const [retailerbrevo_id, setRetailerbrevo_id] = useState("");
  const [retailerbrevo_key, setRetailerbrevo_key] = useState("");
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [RGcontactName, setRGContactName] = useState("");
  const [RGcontactPhone, setRGContactPhone] = useState("");
  const [RGcontactEmail, setRGContactEmail] = useState("");
  const [retailers, setRetailers] = useState(
    DEFAULT_RETAILERS.jewelry_retailers
  );
  const [retailersapi, setRetailersapi] = useState("false");
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [transaction, setTransaction] = useState(false);
  const [CheckUserRegister, setCheckUserRegister] = useState(false);
  const [ifremId, setifremId] = useState("test");
  const [showPutOnMyWebsitePopup, setShowPutOnMyWebsitePopup] = useState(false);
  const [brevoKey, setBrevoKey] = useState("");
  const [email, setEmail] = useState("");
  const [GSsystum, setGSsystum] = useState(false);
  const [ifremcheck, setifremcheck] = useState(true);
  const [sendmail, setsendmail] = useState(true);
  const [retailerType, setRetailerType] = useState("brand");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [brevoIdStrength, setBrevoIdStrength] = useState(null);
  const [brevoKeyStrength, setBrevoKeyStrength] = useState(null);
  const [brevoIdError, setBrevoIdError] = useState("");
  const [brevoKeyError, setBrevoKeyError] = useState("");
  const [checkuserformifream, setCheckuserformifream] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const [glburl, setGlburl] = useState("3D Website");

  const handleRetailerTypeChange = async (e) => {
    setRetailerType(e.target.value);
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const updatedUserData = {
          email: localStorage.getItem("email"),
          name: localStorage.getItem("name"),
          brevo_id: localStorage.getItem("brevo_id"),
          brevo_key: localStorage.getItem("brevo_key"),
          email_send_from_brevo: localStorage.getItem("email_send_from_brevo"),
          role: e.target.value,
        };

        // Update user data
        const updateResponse = await fetch(
          `https://amgdynamics.horizonbeam.com/update-user/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
          }
        );

        if (!updateResponse.ok) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        localStorage.setItem("role", e.target.value);
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  useEffect(() => {
    const fetchRetailers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          "https://amgdynamics.horizonbeam.com/retailer-list/123"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch retailers");
        }
        const data = await response.json();
        setRetailers(data.jewelry_retailers);
      } catch (error) {
        console.error("Error fetching retailers:", error);
        setRetailers(DEFAULT_RETAILERS.jewelry_retailers); // Use default data if API fails
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchRetailers();
  }, []);

  const handleRetailerSelect = (retailerId) => {
    setSelectedRetailer(retailerId);
    // setRetailerid(retailerId); // Set the selected retailer ID
    setRetailer("true"); // Set retailer to 'true' to show contact form
    setShowContactPopup(true); // Keep the popup open but content will change
    setGSsystum(true);
  };

  const handleShapeModelChange = (shape) => {
    setShapeModel(shape);
  };

  const handleMatchingBand = (step) => {
    setMatchingBand(step);
    // fetchPrice(step);
  };
  // const fetchPrice = async (step) => {
  //   try {
  //     const response = await fetch('https://mindtechsolutions.com/StylePriceAPI/api/cntrl/styleprice', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ style_no: 'GMR46578' }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     setpricing(`$${data.price.toFixed(2)}`); // Update pricing with fetched price
  //   } catch (error) {
  //     console.error('Error fetching price:', error);
  //   }
  // };
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://mindtechsolutions.com/StylePriceAPI/api/cntrl/styleprice",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ style_no: "GMR46578" }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setpricing(`$${data.price.toFixed(2)}`); // Update pricing with fetched price
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    window.addEventListener("load", fetchPrice);
  }, []);
  useEffect(() => {
    const checkToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token") || null;
      console.log(token);
      if (token) {
        if (token && token.length > 20) {
          try {
            const response = await fetch(
              `https://amgdynamics.horizonbeam.com/get-user-all-data-iframe/${token}`
            );

            if (!response.ok) {
              // Handle specific error codes
              if (response.status === 404) {
                Swal.fire({
                  title: "Error 404!",
                  text: "The requested resource was not found. Please check the URL or contact support.",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              } else {
                throw new Error("Network response was not ok");
              }
            }

            const data = await response.json();
            // Check if data.user exists
            if (data.user) {
              setCheckuserformifream(true);
              setRetailerid(data.user.id);
              setRetailerEmail(data.user.email);
              setRetailerName(data.user.name);
              setRetailerbrevo_id(data.user.brevo_id);
              setRetailerbrevo_key(data.user.brevo_key);
              setCheckUserRegister(true);
              setifremcheck(false);
              setsendmail(data.user.email_send_from_brevo);

              if (data.user.role !== "brand") {
                setRetailer("true");
                setRetailersapi("true");
              }
            } else {
              console.warn("User data not found in response"); // Added warning for missing user data
            }
          } catch (error) {
            console.error("Error checking token:", error);
          }
        } else {
          try {
            const response = await fetch(
              `https://amgdynamics.horizonbeam.com/check-amgdynamics/${token}`
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            // Check if data.users exists and is an array
            if (data.user) {
              setRetailer("true");
              setRetailersapi("true");
              setRetailerid(data.user.id);
              setRetailerEmail(data.user.email);
              setRetailerName(data.user.name);
              setRetailerType(data.user.role);
              const userId = data.user.id;
              try {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second after setting retailerid
                const response = await fetch(
                  `https://amgdynamics.horizonbeam.com/get-user-all-data/${userId}`
                );

                if (!response.ok) {
                  // Handle specific error codes
                  if (response.status === 404) {
                    Swal.fire({
                      title: "Error 404!",
                      text: "The requested resource was not found. Please check the URL or contact support.",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  } else {
                    throw new Error("Network response was not ok");
                  }
                }

                const data = await response.json();
                // Check if data.user exists
                if (data.user) {
                  localStorage.setItem("userId", data.user.id);
                  localStorage.setItem("brevo_id", data.user.brevo_id);
                  localStorage.setItem("brevo_key", data.user.brevo_key);
                  localStorage.setItem("iframe_id", data.user.iframe_id);
                  localStorage.setItem("email", data.user.email);
                  localStorage.setItem("role", data.user.role);
                  localStorage.setItem("name", data.user.name);
                  localStorage.setItem(
                    "email_send_from_brevo",
                    data.user.email_send_from_brevo
                  );
                  setRetailerbrevo_id(data.user.brevo_id);
                  setRetailerbrevo_key(data.user.brevo_key);
                  setCheckUserRegister(true);
                } else {
                  console.warn("User data not found in response"); // Added warning for missing user data
                }
              } catch (error) {
                console.error("Error checking token:", error);
                // Fallback logic can be added here, e.g., setting default values or notifying the user
                setCheckUserRegister(false); // Ensure the registration check is reset on error
              }
            }
          } catch (error) {
            console.error("Error checking token:", error);
          }
        }
      } else {
        setCheckuserformifream(true);
      }
    };

    checkToken();
  }, []);
  const handlesetShankbandtype = (value) => {
    setShankbandtype(value);
  };
  const handlesetRingStyleDesigntype = (value) => {
    setRingStyleDesigntype(value);
    if (value === "Shank 2.glb") {
      setDaimandsetting("BEZEL");
    }
  };
  const handlesetDaimandtype = (value) => {
    setDaimandtype(value);
    if (value === "Emerald") {
      setGlburl("Ajaffe 2911");
    } else {
      setGlburl("3D Website");
    }
  };
  const handlesetDaimandStonType = (value) => {
    setDaimandStonType(value);
    const divs = document.querySelectorAll(".customContextGridHeading");
    const metalDiv = Array.from(divs).find((div) =>
      div.textContent.includes(`Gem 01`)
    );

    if (metalDiv) {
      const Diamond = metalDiv.nextElementSibling;
      const Sapphire = Diamond?.nextElementSibling;
      const Ruby = Sapphire?.nextElementSibling;
      const Emerald = Ruby?.nextElementSibling;
      const YellowSapphire = Emerald?.nextElementSibling;
      if (value === "Diamond") {
        if (Diamond) {
          Diamond.click();
        }
      }
      if (value === "Ruby") {
        if (Ruby) {
          Ruby.click();
        }
      }
      if (value === "Sapphire") {
        if (Sapphire) {
          Sapphire.click();
        }
      }
      if (value === "Emerald") {
        if (Emerald) {
          Emerald.click();
        }
      }
      if (value === "Yellow Sapphire") {
        if (YellowSapphire) {
          YellowSapphire.click();
        }
      }
    }
  };
  const handlesetsideDaimandStonType = (value, index) => {
    const newSideDaimandStonType = [...sideDaimandStonType];
    newSideDaimandStonType[index] = value;
    setsideDaimandStonType(newSideDaimandStonType);
    // console.log(sideDaimandStonType);
    const divs = document.querySelectorAll(".customContextGridHeading");
    let gem = parseInt(index) + 2;
    console.log(`Gem 0${gem}`);
    const metalDiv = Array.from(divs).find((div) =>
      div.textContent.includes(`Gem 0${gem}`)
    );

    if (metalDiv) {
      const Diamond = metalDiv.nextElementSibling;
      const Sapphire = Diamond?.nextElementSibling;
      const Ruby = Sapphire?.nextElementSibling;
      const Emerald = Ruby?.nextElementSibling;
      const YellowSapphire = Emerald?.nextElementSibling;
      if (value === "Diamond") {
        if (Diamond) {
          Diamond.click();
        }
      }
      if (value === "Ruby") {
        if (Ruby) {
          Ruby.click();
        }
      }
      if (value === "Sapphire") {
        if (Sapphire) {
          Sapphire.click();
        }
      }
      if (value === "Emerald") {
        if (Emerald) {
          Emerald.click();
        }
      }
      if (value === "Yellow Sapphire") {
        if (YellowSapphire) {
          YellowSapphire.click();
        }
      }
    }
  };
  const handlesetDaimandCarat = (value) => {
    setDaimandCarat(value);
  };
  const handlesetsideDaimandCarat = (value) => {
    setsideDaimandCarat(value);
  };
  const handlesetsideDaimandlength = (value) => {
    setsideDaimandlength(value);
  };
  const handlesetDaimandsetting = (value) => {
    setDaimandsetting(value);
  };
  const handlesetRingmetal = (value) => {
    setRingmetal(value);
    const divs = document.querySelectorAll(".customContextGridHeading");
    const metalDiv = Array.from(divs).find((div) =>
      div.textContent.includes("METAL01")
    );
    const metalDiv2 = Array.from(divs).find((div) =>
      div.textContent.includes("METAL02")
    );

    if (metalDiv) {
      const firstSibling = metalDiv.nextElementSibling;
      const secondSibling = firstSibling?.nextElementSibling;
      const thirdSibling = secondSibling?.nextElementSibling;
      if (
        value === "Platinum" ||
        value === "14K White Gold" ||
        value === "18K White Gold"
      ) {
        if (firstSibling) {
          firstSibling.click();
        }
      }
      if (value === "14K Yellow Gold" || value === "18K Yellow Gold") {
        if (secondSibling) {
          secondSibling.click();
        }
      }
      if (value === "14K Rose Gold" || value === "18K Rose Gold") {
        if (thirdSibling) {
          thirdSibling.click();
        }
      }
    }
    if (metalDiv2) {
      const firstSibling2 = metalDiv2.nextElementSibling;
      const secondSibling2 = firstSibling2?.nextElementSibling;
      const thirdSibling2 = secondSibling2?.nextElementSibling;
      if (
        value === "Platinum" ||
        value === "14K White Gold" ||
        value === "18K White Gold"
      ) {
        if (firstSibling2) {
          firstSibling2.click();
        }
      }
      if (value === "14K Yellow Gold" || value === "18K Yellow Gold") {
        if (secondSibling2) {
          secondSibling2.click();
        }
      }
      if (value === "14K Rose Gold" || value === "18K Rose Gold") {
        if (thirdSibling2) {
          thirdSibling2.click();
        }
      }
    }
  };
  const handlesetactivestep = (size) => {
    setactivestep(size);
  };
  const handleModelChange = (size) => {
    setRoundModel(size);
  };
  const handleprongModelChange = (size) => {
    setProngModel(size);
  };
  const handleRingcolorModel = (color) => {
    setRingcolorModel(color);
  };
  const handleDaimandcolorModel = (color) => {
    setDaimandcolorModel(color);
  };
  const Shankbandtypeitems = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
  ];
  const RingStyleDesigntypeitems = [
    {
      name: "Shank 1",
      url: "Shank.glb",
    },
    {
      name: "Shank 2",
      url: "Shank 2.glb",
    },
  ];
  const Diamondtypeitems = [
    {
      name: "Round",
      img: "/assets/shape-svg/round.svg",
      url: `Round.glb`,
    },
    {
      name: "Oval",
      img: "/assets/shape-svg/oval.svg",
      url: `Oval.glb`,
    },
    {
      name: "Cushion Square",
      img: "/assets/shape-svg/cushion.svg",
      url: `Cushion Square.glb`,
    },
    {
      name: "Cushion",
      img: "/assets/shape-svg/cushion.svg",
      url: `Cushion.glb`,
    },
    {
      name: "Emerald",
      img: "/assets/shape-svg/emerald.svg",
      url: `Emerald.glb`,
    },
    {
      name: "Pear",
      img: "/assets/shape-svg/pear.svg",
      url: `Pear.glb`,
    },
    {
      name: "Princess",
      img: "/assets/shape-svg/princess.svg",
      url: `Princess.glb`,
    },
    // {
    //   name:'Asscher',
    //   img:'/assets/shape-svg/asscher.svg',
    //   url: './assets/all/Single Halo/Shank 3.glb',
    // },
    {
      name: "Marquise",
      img: "/assets/shape-svg/marquise.svg",
      url: `Marquise.glb`,
    },
    // {
    //   name:'Heart',
    //   img:'/assets/shape-svg/heart.svg',
    //   url: './assets/all/Single Halo/Shank 3.glb',
    // },
    {
      name: "Radiant",
      img: "/assets/shape-svg/radiant.svg",
      url: `Radiant.glb`,
    },
    {
      name: "Elongated Cushion",
      img: "/assets/shape-svg/elongated cushion.svg",
      url: "",
    },
  ];
  let filteredDiamondtypeitems = Diamondtypeitems;
  if (Daimandsetting === "4 PRONG") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant"
    );
    if (
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb"
    ) {
      setDaimandtype("Pear.glb");
    }
  } else if (Daimandsetting === "6 PRONG") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Marquise.glb");
    }
  } else if (Daimandsetting === "BEZEL") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Cushion Square" ||
        item.name === "Cushion" ||
        item.name === "Emerald" ||
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Cushion Square.glb" &&
      Daimandtype != "Cushion.glb" &&
      Daimandtype != "Emerald.glb" &&
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Cushion Square.glb");
    }
  } else if (Daimandsetting === "CLAW PRONG") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Cushion Square" ||
        item.name === "Cushion" ||
        item.name === "Emerald" ||
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Cushion Square.glb" &&
      Daimandtype != "Cushion.glb" &&
      Daimandtype != "Emerald.glb" &&
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Cushion Square.glb");
    }
  } else if (Daimandsetting === "DOUBLE PRONG") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Cushion Square" ||
        item.name === "Cushion" ||
        item.name === "Emerald" ||
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Cushion Square.glb" &&
      Daimandtype != "Cushion.glb" &&
      Daimandtype != "Emerald.glb" &&
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Cushion Square.glb");
    }
  } else if (Daimandsetting === "HIDDEN HALO") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Cushion Square" ||
        item.name === "Cushion" ||
        item.name === "Emerald" ||
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Cushion Square.glb" &&
      Daimandtype != "Cushion.glb" &&
      Daimandtype != "Emerald.glb" &&
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Cushion Square.glb");
    }
  } else if (Daimandsetting === "Single Halo") {
    filteredDiamondtypeitems = Diamondtypeitems.filter(
      (item) =>
        item.name === "Cushion" ||
        item.name === "Emerald" ||
        item.name === "Marquise" ||
        item.name === "Oval" ||
        item.name === "Pear" ||
        item.name === "Princess" ||
        item.name === "Radiant" ||
        item.name === "Round"
    );
    if (
      Daimandtype != "Cushion.glb" &&
      Daimandtype != "Emerald.glb" &&
      Daimandtype != "Marquise.glb" &&
      Daimandtype != "Oval.glb" &&
      Daimandtype != "Pear.glb" &&
      Daimandtype != "Princess.glb" &&
      Daimandtype != "Radiant.glb" &&
      Daimandtype != "Round.glb"
    ) {
      setDaimandtype("Cushion.glb");
    }
  }
  const DaimandStonTypeitems = [
    {
      name: "Diamond",
      img: "/assets/daimandtype/Diamond.png",
      color: "#F6F6F2",
    },
    {
      name: "Ruby",
      img: "/assets/daimandtype/Ruby.png",
      color: "#E0115F",
    },
    {
      name: "Sapphire",
      img: "/assets/daimandtype/Sapphire.png",
      color: "#E0115F",
    },
    {
      name: "Emerald",
      img: "/assets/daimandtype/Emerald.png",
      color: "#E0115F",
    },
    {
      name: "Yellow Sapphire",
      img: "/assets/daimandtype/YellowSapphire.png",
      color: "#E0115F",
    },
  ];
  const sideDaimandStonTypeitems = [
    {
      name: "Diamond",
      img: "/assets/daimandtype/Diamond.png",
      color: "#F6F6F2",
    },
    {
      name: "Ruby",
      img: "/assets/daimandtype/Ruby.png",
      color: "#E0115F",
    },
    {
      name: "Sapphire",
      img: "/assets/daimandtype/Sapphire.png",
      color: "#E0115F",
    },
    {
      name: "Emerald",
      img: "/assets/daimandtype/Emerald.png",
      color: "#E0115F",
    },
    {
      name: "Yellow Sapphire",
      img: "/assets/daimandtype/YellowSapphire.png",
      color: "#E0115F",
    },
  ];
  const gemcount = [
    "0",
    "1",
    "2",
    // '3',
    // '4',
    // '5'
  ];
  const DaimandCaratitems = [
    "1.00 ct",
    "1.50 ct",
    "2.00 ct",
    "2.50 ct",
    "3.00 ct",
    "3.50 ct",
    "4.00 ct",
  ];
  const sideDaimandCaratitems = [
    "0.10 ct",
    "0.15 ct",
    "0.20 ct",
    "0.25 ct",
    "0.30 ct",
    "0.35 ct",
    "4.00 ct",
  ];
  const sideDaimandlengthitems = ["Quarter", "Half", "Three Quarter", "Full"];
  let Daimandsettingitems;
  if (RingStyleDesigntype === "Shank.glb") {
    Daimandsettingitems = [
      "4 PRONG",
      "6 PRONG",
      "BEZEL",
      "CLAW PRONG",
      "DOUBLE PRONG",
      "HIDDEN HALO",
      "Single Halo",
    ];
  } else {
    Daimandsettingitems = ["BEZEL", "CLAW PRONG"];
  }
  const Ringmetalitems = [
    { name: "Platinum", code: "#E5E4E2" },
    { name: "14K White Gold", code: "#F0F0F0" },
    { name: "14K Yellow Gold", code: "#FFD700" },
    { name: "14K Rose Gold", code: "#B76E79" },
    { name: "18K White Gold", code: "#F4F4F4" },
    { name: "18K Yellow Gold", code: "#FFD700" },
    { name: "18K Rose Gold", code: "#E0BFB8" },
  ];
  const handleNextClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleCreateTransactionSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("userid", retailerid);
    formData.append(
      "particular",
      JSON.stringify({
        item: "Gold Ring",
        price: pricing,
        ringStyle: RingStyleDesigntype,
        sideStoneSize: sideDaimandCarat,
        sideStoneLength: sideDaimandlength,
        centerStoneShape: DaimandStonType,
        centerStoneSize: DaimandCarat,
        setting: Daimandsetting,
        metal: Ringmetal,
        centerStoneType: DaimandStonType,
        sideStoneType: sideDaimandStonType,
      })
    );
    const screenshot = localStorage.getItem("screenshot");
    if (screenshot) {
      const blob = await fetch(screenshot).then((res) => res.blob());
      formData.append("image1", blob, "screenshot1.jpg");
    }
    const screenshot2 = localStorage.getItem("screenshot2");
    if (screenshot2) {
      const blob2 = await fetch(screenshot2).then((res) => res.blob());
      formData.append("image2", blob2, "screenshot2.jpg");
    }
    fetch("https://amgdynamics.horizonbeam.com/create-transaction", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create transaction");
        }
        return response.json();
      })
      .then((data) => {
        const transactionId = data.transaction.id;
        const customerName = contactName;
        const customerEmail = contactEmail;
        const apiKey = retailerbrevo_key; // Replace with your actual Brevo API key
        const subject = "Your Transaction ID";
        const htmlContent = `
        <html>
          <head></head>
          <body>
            <p>Hello ${customerName},</p>
            <p>Your transaction ID is: ${transactionId}</p>
            <p>Thank you for using GS Ring and Band Configurator.</p>
          </body>
        </html>
      `;
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": apiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: retailerbrevo_id,
              email: sendmail,
            },
            to: [
              {
                email: customerEmail,
                name: customerName,
              },
            ],
            subject: subject,
            htmlContent: htmlContent,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Failed to send transaction ID to customer by Brevo"
              );
            }
            return response.json();
          })
          .then((data) => {
            // console.log('Transaction ID sent to customer by Brevo successfully:', data);
            Swal.fire({
              title: "Success!",
              text: "Your order has been added successfully.",
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: () => {
                window.location.reload();
                return false;
              },
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(
              "Error sending transaction ID to customer by Brevo:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error creating transaction:", error);
        Swal.fire({
          title: "Error!",
          text: "Error creating transaction. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const handleContactSubmit = async () => {
    setIsSubmitting(true); // Start loading
    try {
      await import("html2canvas").then((html2canvasModule) => {
        document.getElementById("front-camera-button").click();
        setTimeout(() => {
          html2canvasModule
            .default(document.getElementById("viewer-3d"))
            .then((canvas) => {
              const screenshot = canvas.toDataURL();
              localStorage.setItem("screenshot", screenshot);
            });
          document.getElementById("left-camera-button").click();
          setTimeout(() => {
            html2canvasModule
              .default(document.getElementById("viewer-3d"))
              .then((canvas) => {
                const screenshot = canvas.toDataURL();
                localStorage.setItem("screenshot2", screenshot);
                setactivestep(2);
                setIsSubmitting(false); // End loading after everything is complete
              });
          }, 2000);
        }, 2000);
      });
    } catch (error) {
      console.error("Error during submission:", error);
      setIsSubmitting(false); // End loading if there's an error
    }
  };
  const handlesetPutOnMyWebsite = async () => {
    setIsLoading(true);
    // Use the values from the form submission
    const uniqidretailerbrevo_id = brevoId; // Use the input value
    const uniqidretailerbrevo_key = brevoKey; // Use the input value
    const email_send_from_brevo = email; // Use the input value
    const customerName = uniqidretailerbrevo_id;
    const customerEmail = email_send_from_brevo;
    const apiKey = uniqidretailerbrevo_key;
    const subject = "Registration Confirmation";
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <p>Hello ${customerName},</p>
          <p>Your registration has been successful.</p>
          <p>Thank you for registering with GS Ring and Band Configurator.</p>
        </body>
      </html>
    `;
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: customerName,
          email: customerEmail,
        },
        to: [
          {
            email: customerEmail,
            name: customerName,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire(
          "Error",
          "Invalid Email Send From Brevo or Brevo Key",
          "error"
        );
        setIsLoading(false);
        throw new Error("Invalid Brevo API key");
      }
      return response.json();
    });

    fetch("https://amgdynamics.horizonbeam.com/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: retailerid,
        email: retailerEmail,
        name: retailerName,
        brevo_id: uniqidretailerbrevo_id,
        brevo_key: uniqidretailerbrevo_key,
        email_send_from_brevo: email_send_from_brevo, // Updated to use the form input
        role: retailerType,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register user");
        }
        localStorage.setItem("role", retailerType);
        return new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second after setting retailerid
      })
      .then(() => {
        return fetch(
          `https://amgdynamics.horizonbeam.com/get-user-all-data/${retailerid}`
        );
      })
      .then((response) => {
        if (!response.ok) {
          // Handle specific error codes
          if (response.status === 404) {
            Swal.fire({
              title: "Error 404!",
              text: "The requested resource was not found. Please check the URL or contact support.",
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            throw new Error("Network response was not ok");
          }
        }
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        // Check if data.user exists
        if (data.user) {
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("brevo_id", data.user.brevo_id);
          localStorage.setItem("brevo_key", data.user.brevo_key);
          localStorage.setItem("iframe_id", data.user.iframe_id);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem(
            "email_send_from_brevo",
            data.user.email_send_from_brevo
          );
          setifremId(data.user.iframe_id);
          setRetailerbrevo_id(data.user.brevo_id);
          setRetailerbrevo_key(data.user.brevo_key);
          setRetailerType(data.user.role);
          setCheckUserRegister(true);
          setShowPutOnMyWebsitePopup(false);
          setshowRegisterPopup(true);
        } else {
          console.warn("User data not found in response"); // Added warning for missing user data
        }
        console.log("User registered successfully:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [diamonds, setDiamonds] = useState([]);

  useEffect(() => {
    setLoading(true); // Start loading
    try {
      const fetchDiamonds = async () => {
        const response = await fetch(
          "https://amgdynamics.horizonbeam.com/diamond-list/product_sku"
        );
        const data = await response.json();
        setDiamonds(data.data.products);
      };

      fetchDiamonds();
    } catch (error) {
      console.error("Error fetching diamonds:", error);
    } finally {
      setLoading(false); // End loading
    }
  }, []);

  const handlePutOnMyWebsiteSubmit = async (e) => {
    e.preventDefault();
    await handlesetPutOnMyWebsite();
  };

  // selected ring name
  const selectedRingStyle =
    RingStyleDesigntypeitems.find((item) => item.url === RingStyleDesigntype)
      ?.name || "";

  // sideDaimandCaratitems
  const selectedsideDaimandCarat = sideDaimandCaratitems.find(
    (item) => item === sideDaimandCarat
  );

  // selected diamond name
  const selectedDiamond =
    Diamondtypeitems.find((item) => item.url === Daimandtype)?.name || "";

  // selected diamond setting name
  const selectedSetting =
    Daimandsettingitems.find((item) => item === Daimandsetting) || "";

  // selected metal name
  const selectedMetal =
    Ringmetalitems.find((item) => item.name === Ringmetal)?.name || "";

  // selected diamond stone type name
  const selectedDaimandStonType =
    DaimandStonTypeitems.find((item) => item.name === DaimandStonType)?.name ||
    "";

  // selected diamond carat
  const selectedDaimandCarat = DaimandCaratitems.find(
    (item) => item === DaimandCarat
  );

  const swiperBreakpoints = useMemo(
    () => ({
      0: { slidesPerView: 2, spaceBetween: 0 },
      520: { slidesPerView: 3, spaceBetween: 0 },
      900: { slidesPerView: 4, spaceBetween: 0 },
    }),
    []
  );

  const GemItem = ({ gemIndex }) => {
    const gemId = `GEM ${gemIndex}`;
    const isGrayOut = Daimandsetting === "Classic Prong";
    const gemType = sideDaimandStonType[gemIndex];

    return (
      <div
        key={gemId}
        id={gemId}
        className={isGrayOut ? "gray-out-active" : ""}
      >
        <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
          Gem {Number(gemIndex) + 1}
          {gemType && (
            <span className="ml-2 text-gray-600 text-sm">: {gemType}</span>
          )}
        </div>
        <div className="w-full md:w-3/4 lg:w-full xl:w-full py-3">
          <div className="arrow-slider-wrap">
            <div
              id={`sideDaimandStonTypePrev${gemIndex}`}
              className="slider-custom-arrow"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>

            <Swiper
              className="padding-swiper"
              modules={[Navigation]}
              navigation={{
                nextEl: `#sideDaimandStonTypeNext${gemIndex}`,
                prevEl: `#sideDaimandStonTypePrev${gemIndex}`,
              }}
              spaceBetween={0}
              breakpoints={swiperBreakpoints}
              loop={false}
            >
              {sideDaimandStonTypeitems.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`box-ring-selection-box`}
                    onClick={() =>
                      handlesetsideDaimandStonType(item.name, gemIndex)
                    }
                  >
                    <div
                      className="box-ring-img-bundal"
                      style={{
                        borderRadius: "100%",
                        ...(gemType === item.name && {
                          border: "2px solid #fea506",
                        }),
                      }}
                    >
                      <img
                        src={item.img}
                        className="w-18 h-10 rounded-full"
                        alt={item.name}
                      />
                      <img
                        src="./assets/img/Traditional_Solitaire_Helper.svg"
                        className="helper-img"
                        alt="Helper"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              id={`sideDaimandStonTypeNext${gemIndex}`}
              className="slider-custom-arrow"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="daimand-body active">
      {loading && <Loader />}

      <div>
        <div
          className="flex justify-end mx-auto"
          style={{ maxWidth: "1300px" }}
        >
          {retailersapi == "true" && ifremcheck && CheckUserRegister && (
            <a href="/my-transactions" className="text-white">
              Account
            </a>
          )}
        </div>
      </div>

      <div className="progress-bar flex flex-col md:flex-row items-center justify-between w-full border border-gray-300">
        {/* Design Your Ring Step */}
        <div className="step w-full md:w-[220px]  flex items-center justify-center p-4">
          <h3 className="text-sm md:text-base lg:text-lg">Design Your Ring</h3>
        </div>

        {/* Steps with active states */}
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`step w-full md:w-[346px] flex items-center justify-between p-4 ${
              activestep >= step ? "bg-zinc-200" : ""
            }`}
          >
            <div className="content flex items-center gap-3">
              {/* Step Number */}
              <div className="icon text-xl md:text-2xl">{step}</div>
              <div className="content-text">
                {/* Step Title */}
                <h3 className="text-sm">
                  {step === 1
                    ? "Setting"
                    : step === 2
                    ? "Choose a Diamond"
                    : "Ring (Select Size)"}
                </h3>

                {/* Conditional Subtitle */}
                {step === 1 && <p className="text-xs">Nadia - $1,290</p>}

                {/* Conditional Action Link */}
                <a href="#" className="text-xs underline">
                  {step === 1
                    ? "Change"
                    : step === 2
                    ? "Browse Diamond"
                    : "Select Size"}
                </a>
              </div>
            </div>

            {/* Step Icon */}
            <div className="step-icon">
              <img
                src={ringIcon}
                alt="Complete Icon"
                className="w-8 h-8 md:w-12 md:h-12"
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`flex flex-wrap active items-start `}>
        <div
          className="w-full lg:w-3/5 p-3.5 top-0 bg-white"
          style={{ zIndex: "98", paddingTop: "20px" }}
        >
          <JewelViewer2
            diamonds={DaimandStonType}
            sideDaimandStonType={sideDaimandStonType}
            metal={Ringmetal}
            // shankurl={`./assets/all/${Daimandsetting}/${RingStyleDesigntype}`}
            // halourl={`./assets/all/${Daimandsetting}/${Daimandtype}`}
          />

          {retailersapi == "true" &&
            ifremcheck &&
            CheckUserRegister == false && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  type="button"
                  className="add-to-website-button"
                  onClick={() => setShowPutOnMyWebsitePopup(true)}
                >
                  Put On My Website
                </button>
              </div>
            )}

          <div id="ui">
            <div>
              <span>Basket</span>
              <button className="object" data-category="Basket" data-index="0">
                Cushion Halo
              </button>
              <button className="object" data-category="Basket" data-index="1">
                Empty
              </button>
              <button className="object" data-category="Basket" data-index="2">
                Pear Halo
              </button>
            </div>
            <div>
              <span>Ring</span>
              <button className="object" data-category="Ring" data-index="0">
                Alliance
              </button>
              <button className="object" data-category="Ring" data-index="1">
                Baguette
              </button>
            </div>
            <div>
              <span>Metal</span>
              <button className="material" data-category="Metal" data-index="0">
                rose
              </button>
              <button className="material" data-category="Metal" data-index="1">
                white
              </button>
            </div>
            <div>
              <span>Diamond</span>
              <button
                className="diamond"
                data-category="Diamond"
                data-index="0"
              >
                white
              </button>
              <button
                className="diamond"
                data-category="Diamond"
                data-index="1"
              >
                sapphire
              </button>
              <button
                className="diamond"
                data-category="Diamond"
                data-index="2"
              >
                emerald
              </button>
              <button
                className="diamond"
                data-category="Diamond"
                data-index="3"
              >
                brown
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 p-3.5">
          <div className="">
            <div className=" pt-30">
              <div className="flex flex-wrap mb-5">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 ">
                  <h2 className="font-bold text-3xl">Design your own ring</h2>
                </div>
                <div className="w-full md:w-3/4 lg:w-full  py-3 bg-gray-100 mb-3 rounded-sm">
                  <div className="">
                    <Swiper
                      spaceBetween={0} // Space between slides
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 4,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false} // Enable infinite loop
                    >
                      {Shankbandtypeitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`shank-band-type
                      ${Shankbandtype == item ? "active" : ""}`}
                            onClick={() => handlesetShankbandtype(item)}
                          >
                            {item}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  Ring Style and Design
                  {selectedRingStyle && (
                    <span className="ml-2 text-gray-600 text-sm">
                      ({selectedRingStyle})
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5 border-b border-gray-200 pb-3">
                  <div className="arrow-slider-wrap">
                    <div
                      id="RingStyleDesignPrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      navigation={{
                        nextEl: "#RingStyleDesignNext", // Custom class for Next button
                        prevEl: "#RingStyleDesignPrev", // Custom class for Prev button
                      }}
                      breakpoints={{
                        520: {
                          slidesPerView: 2,
                        },
                        900: {
                          slidesPerView: 3,
                          spaceBetween: 0,
                        },
                      }}
                      loop={true}
                    >
                      {RingStyleDesigntypeitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box  ${
                              RingStyleDesigntype == item.url
                                ? "active !rounded-lg"
                                : ""
                            }`}
                            onClick={() =>
                              handlesetRingStyleDesigntype(item.url)
                            }
                            RingStyleDesigntype-item={`${item.url}`}
                          >
                            <div className="box-ring-img-bundal">
                              <img
                                src="./assets/img/Traditional_Solitaire.svg"
                                className="main-img"
                              />
                              <img
                                src="./assets/img/Traditional_Solitaire_Helper.svg"
                                className="helper-img"
                              />
                            </div>
                            <div className="box-ring-selection-item-text">
                              {item.name}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="RingStyleDesignNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" ">
                <div className="w-full md:w-1/4 lg:w-full xl:full content-center pb-5 font-medium">
                  Side Stone Size
                  {
                    selectedsideDaimandCarat && (
                      <span className="ml-2 text-gray-600 text-sm">
                        : {selectedsideDaimandCarat}
                      </span>
                    ) // Display selected side stone size
                  }
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div
                      id="sideDaimandCaratPrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        520: {
                          slidesPerView: 3,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#sideDaimandCaratNext", // Custom class for Next button
                        prevEl: "#sideDaimandCaratPrev", // Custom class for Prev button
                      }}
                    >
                      {sideDaimandCaratitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box
                        ${sideDaimandCarat == item ? "active" : ""}`}
                            onClick={() => handlesetsideDaimandCarat(item)}
                          >
                            {item}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="sideDaimandCaratNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  Side Stone Length
                  {
                    sideDaimandlength && (
                      <span className="ml-2 text-gray-600 text-sm">
                        : {sideDaimandlength}
                      </span>
                    ) // Display selected side stone length
                  }
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div
                      id="sideDaimandlengthPrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      spaceBetween={0}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        520: {
                          slidesPerView: 3,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#sideDaimandlengthNext", // Custom class for Next button
                        prevEl: "#sideDaimandlengthPrev", // Custom class for Prev button
                      }}
                    >
                      {sideDaimandlengthitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box font-semibold
                        ${
                          sideDaimandlength == item ? "active !rounded-lg" : ""
                        }`}
                            style={{ fontFamily: '"Agbalumo", sans-serif' }}
                            onClick={() => handlesetsideDaimandlength(item)}
                          >
                            {item}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="sideDaimandlengthNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  Center Stone Shape
                  {selectedDiamond && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDiamond}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div id="DaimandtypePrev" className="slider-custom-arrow">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      slidesPerView={2}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#DaimandtypeNext", // Custom class for Next button
                        prevEl: "#DaimandtypePrev", // Custom class for Prev button
                      }}
                    >
                      {filteredDiamondtypeitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box  ${
                              `./assets/all/${Daimandsetting}/${item.url}`
                                ? "test-active"
                                : ""
                            } ${Daimandtype == item.url ? "active" : ""}`}
                            onClick={() => handlesetDaimandtype(item.url)}
                            Daimandtype-item={`${item.url}`}
                          >
                            <div className="box-ring-img-bundal">
                              <img src={item.img} className="main-img" />
                            </div>
                            <div className="box-ring-selection-item-text">
                              {item.name}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div id="DaimandtypeNext" className="slider-custom-arrow">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  Center Stone Size
                  {selectedDaimandCarat && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDaimandCarat}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div id="DaimandCaratPrev" className="slider-custom-arrow">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        520: {
                          slidesPerView: 3,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#DaimandCaratNext", // Custom class for Next button
                        prevEl: "#DaimandCaratPrev", // Custom class for Prev button
                      }}
                    >
                      {DaimandCaratitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box
                        ${DaimandCarat == item ? "active" : ""}`}
                            onClick={() => handlesetDaimandCarat(item)}
                          >
                            {item}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div id="DaimandCaratNext" className="slider-custom-arrow">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  SETTING
                  {selectedSetting && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedSetting}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div
                      id="DaimandsettingPrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#DaimandsettingNext", // Custom class for Next button
                        prevEl: "#DaimandsettingPrev", // Custom class for Prev button
                      }}
                    >
                      {Daimandsettingitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`box-ring-selection-box ${
                              Daimandsetting == item ? "active !rounded-lg" : ""
                            }`}
                            onClick={() => handlesetDaimandsetting(item)}
                            Daimandsetting-item={`${item}`}
                          >
                            <div className="box-ring-img-bundal">
                              <img
                                src="./assets/img/Round_Classic_6_Prong.svg"
                                className="main-img"
                              />
                              <img
                                src="./assets/img/Round_Classic_6_Prong_Helper.svg"
                                className="helper-img"
                              />
                            </div>
                            <div
                              className="box-ring-selection-item-text"
                              style={{ fontFamily: '"Agbalumo", sans-serif' }}
                            >
                              {item}
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="DaimandsettingNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  METAL
                  {selectedMetal && (
                    <span className="ml-2 text-gray-600 text-sm">
                      ({selectedMetal})
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div
                      id="RingmetalsettingPrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 5,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                      navigation={{
                        nextEl: "#RingmetalsettingNext", // Custom class for Next button
                        prevEl: "#RingmetalsettingPrev", // Custom class for Prev button
                      }}
                    >
                      {Ringmetalitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={`metal-selection box-ring-selection-box`}
                            onClick={() => handlesetRingmetal(item.name)}
                          >
                            <div
                              style={{
                                height: "20px",
                                width: "20px",
                                backgroundColor: item.code,
                                borderRadius: "50%",
                                margin: "0 auto 10px",
                                ...(Ringmetal === item.name && {
                                  border: "2px solid #fea506",
                                }),
                              }}
                            ></div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="RingmetalsettingNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="" id="GEM01">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 font-medium">
                  Center Stone Type
                  {selectedDaimandStonType && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDaimandStonType}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5  border-b border-gray-200">
                  <div className="arrow-slider-wrap">
                    <div
                      id="DaimandStonTypePrev"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <Swiper
                      className="padding-swiper"
                      modules={[Navigation]}
                      navigation={{
                        nextEl: "#DaimandStonTypeNext", // Custom class for Next button
                        prevEl: "#DaimandStonTypePrev", // Custom class for Prev button
                      }}
                      spaceBetween={0}
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 0,
                        },
                        520: {
                          slidesPerView: 3,
                          spaceBetween: 0,
                        },
                        900: {
                          slidesPerView: 4,
                          spaceBetween: 0,
                        },
                      }}
                      loop={false}
                    >
                      {DaimandStonTypeitems.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className={` box-ring-selection-box `}
                            onClick={() => handlesetDaimandStonType(item.name)}
                          >
                            <div
                              className="box-ring-img-bundal"
                              style={{
                                borderRadius: "100%",
                                ...(DaimandStonType === item.name && {
                                  border: "2px solid #fea506",
                                }),
                              }}
                            >
                              <img
                                src={item.img}
                                className="w-18 h-10 rounded-full"
                              />
                              <img
                                src="./assets/img/Traditional_Solitaire_Helper.svg"
                                className="w-18 h-10 rounded-full"
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div
                      id="DaimandStonTypeNext"
                      className="slider-custom-arrow"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gems */}
              {gemcount.map((gemIndex, index) => (
                <GemItem key={index} gemIndex={gemIndex} />
              ))}
            </div>

            {/* Pricing & Button */}
            <div className="flex flex-col my-8 max-w-[378px] max-h-[83px] md:flex-col md:items-left gap-4 md:justify-between">
              <div className="text-center font-normal text-4xl md:text-left md:text-3xl pb-4 md:pb-0">
                {pricing}
                <span className="text-sm font-thin"> (Setting Only)</span>
              </div>
              {checkuserformifream && (
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <button
                    type="button"
                    className="mt-4 md:mt-0 w-full md:w-8/12 bg-amber-500 text-white py-2 px-6 rounded-md hover:bg-amber-600 transition"
                    onClick={() => handleContactSubmit(true)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Choose the setting"}
                  </button>
                  <span className="text-2xl w-1/3">
                    <i className="fa-regular fa-heart"></i>
                  </span>
                </div>
              )}
            </div>
            {/* TODO: Add matching band selection */}
            {/* <div className="daimang-configurator-footer text-sm px-4 py-6 md:px-8 lg:px-12">
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-full text-center lg:text-left font-medium pb-4 lg:pb-0">
                  MATCHING BAND
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-center lg:justify-start">
                      <div className="matching-band-selection border-0 pr-4">
                        {[1, 2, 3].map((num) => (
                          <span
                            key={num}
                            className={`px-4 py-2 cursor-pointer ${
                              matchingBand === num
                                ? "active bg-gray-300 rounded-md"
                                : ""
                            }`}
                            onClick={() => handleMatchingBand(num)}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <InfoSection />
          </div>
        </div>
      </div>
      {/* <div className={`flex flex-wrap main-contant-container ${ activestep === 2 ? "active" : "" }`}>
        <div className="popup">
          <h1>Diamond Selection</h1>
          <DiamondList diamonds={diamonds} setActiveStep={setactivestep} />
        </div>
      </div> */}
      {activestep === 2 && (
        <div
          className="popup-overlay w-full p-4"
          onClick={() => setactivestep(1)}
        >
          <div
            className="popup-content w-full"
            style={{
              maxWidth: "1320px",
              maxHeight: "calc(100vh - 100px)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setactivestep(1)}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold text-gray-800"></h2>
            {/* <h1>Diamond Selection</h1> */}
            <DiamondList diamonds={diamonds} setActiveStep={setactivestep} />
          </div>
        </div>
      )}
      {activestep === 3 && (
        <div
          className="popup-overlay w-full"
          onClick={() => {
            if (GSsystum) {
              setSelectedRetailer("");
              setRetailer("false");
            }
            setactivestep(1);
          }}
        >
          <div
            className="popup-content w-4/5"
            style={{
              maxWidth: "900px",
              maxHeight: "calc(100vh - 100px)",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => {
                if (GSsystum) {
                  setSelectedRetailer("");
                  setRetailer("false");
                }
                setactivestep(1);
              }}
            >
              <i className="fas fa-times"></i>
            </button>
            {/* {retailer === "true" ? ( */}
            <div className="w-full">
              <div className="popup-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  Enter Your Contact Details
                </h2>
              </div>
              <form
                className="text-left"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateTransactionSubmit();
                }}
              >
                <div className="input-group mb-3">
                  <label htmlFor="contactName">Name</label>
                  <input
                    type="text"
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={contactPhone}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    maxLength="10"
                    minLength="10"
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <label htmlFor="contactEmail">Email ID</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <input type="hidden" id="retailerid" value={retailerid} />
                <button
                  type="submit"
                  className="action-btn block flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <span>Loading...</span> : "Submit"}
                </button>
              </form>
            </div>
            {/* ) : ( */}
            <div className="w-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Select a Retailer
                </h2>
                <p className="text-gray-600 mt-2">
                  Choose from our list of authorized retailers
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {retailers.map((retailer) => (
                      <tr
                        key={retailer.ID}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <div>
                            <div className="font-medium text-left">
                              {retailer.RetailerName}
                            </div>
                            <div className="text-gray-600 flex items-center mt-1 text-left">
                              <i className="fas fa-map-marker-alt mr-2"></i>
                              {retailer.RetailerCity}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 flex justify-end">
                          <button
                            className="bg-orange-800 text-white px-4 py-2 rounded-lg hover:bg-orange-900 transition-colors duration-200 flex items-center"
                            onClick={() =>
                              handleRetailerSelect("test@" + retailer.ID)
                            }
                          >
                            Select
                            <i className="fas fa-chevron-right ml-2"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      )}
      {/* <div className={`flex flex-wrap main-contant-container ${ activestep === 3 ? "active" : "" }`}>
        {retailer === 'true' ? (
            <div className='w-full md:w-6/12 mx-auto'>
              <div className="popup-left">
                <h2>User Contact Details</h2>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleCreateTransactionSubmit(); }}>
                <div className="input-group">
                  <label htmlFor="contactName">Name</label>
                  <input 
                    type="text" 
                    id="contactName" 
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contactPhone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contactPhone" 
                    value={contactPhone} 
                    onChange={(e) => setContactPhone(e.target.value)} 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="contactEmail">Email ID</label>
                  <input 
                    type="email" 
                    id="contactEmail" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)} 
                    required 
                  />
                </div>
                <input type="hidden" id="retailerid" value={retailerid} />
                <button type="submit" className="action-btn ">
                  Submit
                </button>
              </form>
              </div>
        ) : (
          <div className='w-full md:w-6/12 mx-auto'>
            <div className="popup-left">
              <h2>Retailer List</h2>
            </div>
            <div className="popup-right">
              <div className="retailer-list">
                {retailers.map(retailer => (
                  <div key={retailer.ID} className="retailer-item">
                    <h3>{retailer.RetailerName}</h3>
                    <p>Location: {retailer.RetailerCity}</p>
                    <button 
                      className="select-btn"
                      onClick={() => handleRetailerSelect('test@'+retailer.ID)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div> */}
      {/* {showContactPopup && (
        <div className="popup-overlay" onClick={(e) => {
          if (e.target.className === 'popup-overlay') {
            setShowContactPopup(false);
            if(retailersapi === 'false'){
              setRetailer('false')
            }
          }
        }}>
          {retailer === 'true' ? (
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowContactPopup(false)}>
                <i className="fas fa-times"></i>
              </button>
              <div className="popup-left">
                <h2>User Contact Details</h2>
              </div>
              <div className="popup-right">
                <form onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
                  <div className="input-group">
                    <label htmlFor="contactName">Name</label>
                    <input 
                      type="text" 
                      id="contactName" 
                      value={contactName} 
                      onChange={(e) => setContactName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contactPhone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="contactPhone" 
                      value={contactPhone} 
                      onChange={(e) => setContactPhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contactEmail">Email ID</label>
                    <input 
                      type="email" 
                      id="contactEmail" 
                      value={contactEmail} 
                      onChange={(e) => setContactEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <input type="hidden" id="retailerid" value={retailerid} />
                  <button type="submit" className="action-btn ">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowContactPopup(false)}>
                <i className="fas fa-times"></i>
              </button>
              <div className="popup-left">
                <h2>Retailer List</h2>
              </div>
              <div className="popup-right">
                <div className="retailer-list">
                  {retailers.map(retailer => (
                    <div key={retailer.ID} className="retailer-item">
                      <h3>{retailer.RetailerName}</h3>
                      <p>Location: {retailer.RetailerCity}</p>
                      <button 
                        className="select-btn"
                        onClick={() => handleRetailerSelect(retailer.ID)}
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )} */}
      {showRegisterPopup && (
        <div
          className="popup-overlay"
          onClick={(e) => {
            if (e.target.className === "popup-overlay") {
              setshowRegisterPopup(false);
              if (retailersapi === "false") {
                setRetailer("false");
              }
            }
          }}
        >
          <div
            className="popup-content"
            style={{ maxWidth: "900px", overflow: "hidden" }}
          >
            <button
              className="close-btn"
              onClick={() => setshowRegisterPopup(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="popup-left">
              <h2 className="text-2xl font-bold mb-4 border-b p-4">
                Iframe Content
              </h2>
              <div className="input-group bg-white p-8 rounded-lg">
                <div
                  className="bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    const iframeCode = `<iframe src="${window.location.origin}?token=${ifremId}" style="width: 100%; height: 100vh; border: none;"></iframe>`;
                    navigator.clipboard
                      .writeText(iframeCode)
                      .then(() => {
                        document.getElementById("show-message").textContent =
                          "Iframe code copied to clipboard";
                        document.getElementById("show-message").style.color =
                          "#9333EA";
                        setTimeout(() => {
                          document.getElementById("show-message").textContent =
                            "";
                        }, 2000);
                      })
                      .catch((err) => {
                        console.error("Failed to copy iframe code: ", err);
                      });
                  }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <label className="text-lg font-semibold tracking-wide">
                      {ifremId}
                    </label>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-800 py-2 text-center text-sm font-medium">
                    Click to copy iframe code
                  </div>
                </div>
                <span
                  id="show-message"
                  className="block mt-4 text-center font-medium animate-fade-in"
                ></span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPutOnMyWebsitePopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowPutOnMyWebsitePopup(false)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "900px", overflow: "hidden" }}
          >
            <button
              className="close-btn"
              onClick={() => setShowPutOnMyWebsitePopup(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Put On My Website
            </h2>
            <form onSubmit={handlePutOnMyWebsiteSubmit}>
              <div className="input-group mb-3">
                <label htmlFor="brevoId">Brevo Sender Name</label>
                <input
                  type="text"
                  id="brevoId"
                  value={brevoId}
                  onChange={(e) => setBrevoId(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label htmlFor="brevoKey">Brevo Key</label>
                <input
                  type="password"
                  id="brevoKey"
                  value={brevoKey}
                  onChange={(e) => setBrevoKey(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <label htmlFor="email">Email Send From Brevo</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="action-btn block flex items-center"
                disabled={isLoading}
              >
                {isLoading ? <span>Loading...</span> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
