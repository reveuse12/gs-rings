import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  TonemapPlugin,
  timeout,
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.9.1.mjs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ringIcon from "../assets/ringIcon.svg";
import diamondIcon from "../assets/diamond.svg";
import ring from "../assets/ring.svg";
import * as THREE from "three";
// import * as THREE from 'three';
// import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
// import 'swiper/swiper-bundle.min.css';
import "./home.css";
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
import Navbar from "../component/Navbar.jsx";

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
      /Windows Phone/i,
    ];

    return (
      toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      }) || window.innerWidth <= 768
    );
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
    window.addEventListener("resize", checkMobile);

    // Fallback loading indicator
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      console.warn("3D Viewer loading timed out");
    }, 15000); // 15 seconds timeout

    try {
      const viewer = new CoreViewerApp({
        canvas: document.getElementById("viewer-3d"),
        renderManager: {
          // Adaptive rendering based on device capabilities
          displayCanvasScaling: isMobile
            ? canRenderHighQuality()
              ? Math.min(window.devicePixelRatio, 1.5)
              : Math.min(window.devicePixelRatio, 1)
            : window.devicePixelRatio,
        },
      });

      viewer
        .initialize({
          caching: true,
          plugins: {},
          ui: {
            logo: false,
            branding: false,
          },
          background: "#FFFFFF",
        })
        .then(async (viewer) => {
          // Clear loading timeout
          clearTimeout(loadingTimeout);

          const diamondPlugin = await viewer.getOrAddPlugin(DiamondPlugin);
          diamondPlugin.setKey("8KA8HZSP5WDG35XWHADNKPWMCY7F9J4G-HB7Q2BYGER");

          // Adaptive render settings
          viewer.renderManager.displayCanvasScaling = isMobile
            ? canRenderHighQuality()
              ? Math.min(window.devicePixelRatio, 1.5)
              : Math.min(window.devicePixelRatio, 1)
            : window.devicePixelRatio;

          const tarunElement = document.getElementById("ring-3d-output");
          if (tarunElement) {
            tarunElement.classList.add("active");
          }

          // Disable loading screen
          const loadingScreen = viewer.getPlugin(LoadingScreenPlugin);
          if (loadingScreen) {
            loadingScreen.enabled = false;
          }

          viewer.scene.background = "#FFFFFF";

          // Lightweight loading for mobile
          const modelToLoad = isMobile
            ? "./assets/ring-data/Ajaffe 0512-2.glb"
            : "./assets/ring-data/ijwelldaimandshank.glb";

          Promise.all([viewer.load(modelToLoad)])
            .then(() => {
              setIsLoading(false);
              if (tarunElement) {
                setTimeout(() => {
                  tarunElement.classList.remove("active");
                }, 5000);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              console.error("Model loading error: ", error);
              if (tarunElement) {
                tarunElement.classList.remove("active");
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
            const canvas = document.getElementById("viewer-3d");
            canvas.addEventListener(
              "touchstart",
              (e) => {
                e.preventDefault();
              },
              { passive: false }
            );
            canvas.addEventListener(
              "touchmove",
              (e) => {
                e.preventDefault();
              },
              { passive: false }
            );
          }
        })
        .catch((initError) => {
          setIsLoading(false);
          console.error("Viewer initialization error:", initError);
        });

      // Cleanup
      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    } catch (error) {
      setIsLoading(false);
      console.error("Viewer setup error:", error);
    }
  }, []);

  return (
    <div
      id="ring-3d-output"
      className={`active-viewer-check ${isMobile ? "mobile-viewer" : ""}`}
      style={{
        width: "100%",
        height: isMobile ? "50vh" : "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.8)",
            zIndex: 10,
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
          maxHeight: "100%",
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
  const [pricing, setpricing] = useState("$0");
  const [shapeModel, setShapeModel] = useState("Round");

  const [brevoId, setBrevoId] = useState("");
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

  const [retailers, setRetailers] = useState(
    DEFAULT_RETAILERS.jewelry_retailers
  );
  const [retailersapi, setRetailersapi] = useState("false");
  const [selectedRetailer, setSelectedRetailer] = useState(null);
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

  const [checkuserformifream, setCheckuserformifream] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state
  const [glburl, setGlburl] = useState("3D Website");

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

    {
      name: "Marquise",
      img: "/assets/shape-svg/marquise.svg",
      url: `Marquise.glb`,
    },

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
  const gemcount = ["0", "1", "2"];
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
            {sideDaimandStonTypeitems.map((item, index) => (
              <div
                key={index}
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
            ))}
          </div>
        </div>
      </div>
    );
  };
  const images = [ringIcon, diamondIcon, ring];

  return (
    <div className="active">
      {loading && <Loader />}

      <div>
        <Navbar />

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

      <div className="progress-bar mt-8 flex flex-col md:flex-row items-center justify-between w-full border border-gray-300">
        {/* Design Your Ring Step */}
        <div className="step w-full md:w-[220px]  flex items-center justify-center p-4">
          <h3 className="text-sm md:text-base lg:text-lg">Design Your Ring</h3>
        </div>

        {/* Steps with active states */}
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`step w-full md:w-[346px] flex items-center justify-between p-4 ${
              activestep >= step ? "bg-[#F7F7F7] arrow-border-active" : ""
            }`}
          >
            <div className="content flex items-center gap-3 md:gap-4">
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

            {/* Step Image - Different image for each step */}
            <div className="step-icon">
              <img
                src={images[step - 1]} // Dynamically select the image based on the step index
                alt="Step Icon"
                className={
                  step === 1 ? "w-[50px] h-[50px]" : "w-[34px] h-[25px]"
                }
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
          {/* Main ring image */}
          <img src="/ring.png" alt="Ring" className="w-full mb-4" />

          {/* Two images side by side */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <img src="/ring2.png" alt="Diamond" className="w-full h-auto" />
            </div>
            <div className="w-1/2">
              <img src="/ring3.png" alt="Ring" className="w-full h-auto" />
            </div>
          </div>

          {retailersapi === "true" && ifremcheck && !CheckUserRegister && (
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
        </div>
        <div className="w-full lg:w-2/5 p-3.5">
          <div className="">
            <div className=" pt-30">
              <div className="flex flex-wrap mb-5">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5 ">
                  <h2 className=" text-3xl">Design your own ring</h2>
                </div>
              </div>

              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  View with Diamond shape
                  {selectedSetting && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedSetting}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {Daimandsettingitems.map((item, index) => (
                      <div
                        key={index}
                        className={`box-ring-selection-box`}
                        onClick={() => handlesetDaimandsetting(item)}
                        daimandsetting-item={`${item}`}
                      >
                        <div
                          className="box-ring-img-bundal"
                          style={{
                            borderRadius: "100%",
                            ...(Daimandsetting === item && {
                              border: "2px solid #fea506",
                            }),
                          }}
                        >
                          <img
                            src="./assets/img/Round_Classic_6_Prong.svg"
                            className="main-img"
                          />
                          <img
                            src="./assets/img/Round_Classic_6_Prong_Helper.svg"
                            className="helper-img"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* shank design */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  View with Shank Design
                  {selectedRingStyle && (
                    <span className="ml-2 text-gray-600 text-sm">
                      ({selectedRingStyle})
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5 pb-3">
                  <div className="arrow-slider-wrap">
                    {RingStyleDesigntypeitems.map((item, index) => (
                      <div
                        key={index}
                        className={`box-ring-selection-box  ${
                          RingStyleDesigntype == item.url
                            ? "active !rounded-lg"
                            : ""
                        }`}
                        onClick={() => handlesetRingStyleDesigntype(item.url)}
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
                        <div
                          className="box-ring-selection-item-text"
                          style={{ fontFamily: '"Agbalumo", sans-serif' }}
                        >
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Setting section */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  View with Setting Design
                  {selectedSetting && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedSetting}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {Daimandsettingitems.map((item, index) => (
                      <div
                        key={index}
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
                    ))}
                  </div>
                </div>
              </div>

              {/* Metals */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  Metal
                  {selectedMetal && (
                    <span className="ml-2 text-gray-600 text-sm">
                      ({selectedMetal})
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {Ringmetalitems.map((item, index) => (
                      <div
                        key={index}
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
                    ))}
                  </div>
                </div>
              </div>

              {/*side stone size  */}
              <div className=" ">
                <div className="w-full md:w-1/4 lg:w-full xl:full content-center pb-5">
                  Side Stone Size
                  {
                    selectedsideDaimandCarat && (
                      <span className="ml-2 text-gray-600 text-sm">
                        : {selectedsideDaimandCarat}
                      </span>
                    ) // Display selected side stone size
                  }
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {sideDaimandCaratitems.map((item, index) => (
                      <div
                        key={index}
                        className={`box-ring-selection-box
                        ${sideDaimandCarat == item ? "active" : ""}`}
                        onClick={() => handlesetsideDaimandCarat(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* side stone length */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  Side Stone Length
                  {
                    sideDaimandlength && (
                      <span className="ml-2 text-gray-600 text-sm">
                        : {sideDaimandlength}
                      </span>
                    ) // Display selected side stone length
                  }
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5 ">
                  <div className="arrow-slider-wrap">
                    {sideDaimandlengthitems.map((item, index) => (
                      <div
                        key={index}
                        className={`box-ring-selection-box font-semibold
                        ${
                          sideDaimandlength == item ? "active !rounded-lg" : ""
                        }`}
                        style={{ fontFamily: '"Agbalumo", sans-serif' }}
                        onClick={() => handlesetsideDaimandlength(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Stone */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  Center Stone Shape
                  {selectedDiamond && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDiamond}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5 ">
                  <div className="arrow-slider-wrap">
                    {filteredDiamondtypeitems.map((item, index) => (
                      <div
                        key={index}
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
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Stone Size */}
              <div className="">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  Center Stone Size
                  {selectedDaimandCarat && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDaimandCarat}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {DaimandCaratitems.map((item, index) => (
                      <div
                        key={index}
                        className={`box-ring-selection-box
                        ${DaimandCarat == item ? "active" : ""}`}
                        onClick={() => handlesetDaimandCarat(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Stone Type */}
              <div className="" id="GEM01">
                <div className="w-full md:w-1/4 lg:w-full xl:w-full content-center pb-5">
                  Center Stone Type
                  {selectedDaimandStonType && (
                    <span className="ml-2 text-gray-600 text-sm">
                      : {selectedDaimandStonType}
                    </span>
                  )}
                </div>
                <div className="w-full md:w-3/4 lg:w-full xl:w-full pb-5">
                  <div className="arrow-slider-wrap">
                    {DaimandStonTypeitems.map((item, index) => (
                      <div
                        key={index}
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gems */}
              {gemcount.map((gemIndex, index) => (
                <GemItem key={index} gemIndex={gemIndex} />
              ))}
            </div>
            {/* Pricing & Button */}
            <div className="flex flex-col my-4 md:my-8 w-full px-4 md:px-0 md:max-w-[378px]">
              {/* Pricing */}
              <div className="flex flex-col items-center md:items-start mb-4 md:mb-6">
                <div className="text-2xl md:text-4xl font-normal text-center md:text-left">
                  {pricing}
                  <span className="text-xs md:text-sm font-thin ml-1">
                    (Setting Only)
                  </span>
                </div>
              </div>

              {/* Button & Heart */}
              {checkuserformifream && (
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full">
                  <button
                    type="button"
                    className="w-full sm:w-4/5 bg-amber-500 text-white py-2.5 px-4 md:px-6 rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50 text-sm md:text-base"
                    onClick={() => handleContactSubmit(true)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Choose the setting"
                    )}
                  </button>

                  <button className="text-2xl sm:w-1/5 p-2 hover:text-amber-500 transition-colors">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              )}
            </div>
            <InfoSection />
          </div>
        </div>
      </div>
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

      {showRegisterPopup && (
        <div
          className="popup-overlay"
          onClick={() => {
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
