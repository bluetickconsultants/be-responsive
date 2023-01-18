import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";

import { ReactComponent as Iphone } from "../images/Iphone.svg";
import { ReactComponent as Iphone1 } from "../images/Iphone1.svg";
import { ReactComponent as Iphone2 } from "../images/Iphone2.svg";
import { ReactComponent as Samsung1 } from "../images/samsung1.svg";
import { ReactComponent as Samsung2 } from "../images/samsung2.svg";
import { ReactComponent as Samsung3 } from "../images/samsung3.svg";
import { ReactComponent as Pixel } from "../images/pixel.svg";
import { ReactComponent as Pixel1 } from "../images/pixel1.svg";
import { ReactComponent as Moto } from "../images/moto.svg";

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "white",
    zIndex: 999999999,
  },
  mobileView: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "gray",
  },
  mobileViewWithWidth: {
    height: "100vh",
    width: "25% !important",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "gray",
    position: "relative",
    overflow: "auto",
  },
  deviceContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
  },
  mobileOptions: {
    padding: "8px 0px",
    width: "100%",
    display: "flex",
    background: "#202124",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    fontSize: "14px !important",
    height: "100vh",
    width: "100vw",
    display: "flex",
  },
  resolution: {
    marginLeft: "5px",
    color: "White",
  },
  zoomClass: {
    marginLeft: "5px",
  },
  iPhone: {
    top: "108px",
    border: "none",
    marginLeft: "-1px",
  },
  iPhone1: {
    top: "49px",
    borderRadius: "40px",
    border: "none",
  },
  iPhone2: {
    top: "49px",
    borderRadius: "40px",
    border: "none",
    marginLeft: "-1px",
  },
  samsung: {
    top: "29px",
    borderRadius: "26px",
    border: "none",
  },
  samsung1: {
    top: "48px",
    borderRadius: "32px",
    border: "none",
  },
  samsung2: {
    top: "67px",
    borderRadius: "32px",
    border: "none",
  },
  pixel: {
    top: "71px",
    border: "none",
    marginLeft: "-2px",
    borderBottomLeftRadius: "32px",
    borderBottomRightRadius: "32px",
  },
  pixel1: {
    top: "59px",
    borderRadius: "29px",
    border: "none",
  },
  moto: {
    top: "70px",
    border: "none",
  },
});

function ContentScript() {
  const {
    modal,
    overlay,
    mobileView,
    mobileOptions,
    resolution,
    zoomClass,
    deviceContainer,
    iPhone,
    iPhone1,
    iPhone2,
    mobileViewWithWidth,
    samsung,
    samsung1,
    samsung2,
    pixel,
    pixel1,
    moto
  } = useStyles();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [mobileViewFrame, setMobileViewFrame] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [zoom, setZoom] = useState("");
  const mobIframe = useRef();

  const deviceList = [
    { value: "iphone", name: "iPhone SE" },
    { value: "iphone1", name: "iPhone 12 Pro" },
    { value: "iphone2", name: "iPhone XR" },
    { value: "samsung", name: "Samsung Galaxy S8+" },
    { value: "samsung1", name: "Samsung Galaxy S20 Ultra" },
    { value: "samsung2", name: "Samsung Galaxy A51/71" },
    { value: "pixel", name: "Pixel 5" },
    { value: "pixel1", name: "Pixel 2 XL" },
    { value: "moto", name: "Moto G4" },
  ];

  const deviceDimensionsList = {
     iphone: { height: "667", width: "375" },
     iphone1: { height: `${844 - 30}`, width: "390" },
     iphone2: { height: `${896 - 30}`, width: "414" },
     samsung: { height: "740", width: "360" },
     samsung1: { height: `${915 - 32}`, width: "412" },
     samsung2: { height: `${914 - 34}`, width: "412" },
     pixel: { height: `${851 - 47}`, width: "393" },
     pixel1: { height: "823", width: "411" },
     moto: { height: "640", width: "360" },
  }

  const selectedDeviceClasses = {
    iphone: iPhone,
    iphone1: iPhone1,
    iphone2: iPhone2,
    samsung: samsung,
    samsung1: samsung1,
    samsung2: samsung2,
    pixel: pixel,
    pixel1: pixel1,
    moto: moto,
  };

  const zoomOptionList = [
    { value: "1", name: "100%" },
    { value: "0.75", name: "75%" },
    { value: "0.70", name: "70%" },
    { value: "0.65", name: "65%" },
    { value: "0.5", name: "50%" },
  ];

  useEffect(() => {
    const firstDeviceOnList = deviceList[0].value
    setMobileViewFrame(deviceDimensionsList[firstDeviceOnList]);
    setZoom(zoomOptionList[1].value); //75% by default
    setSelectedDevice(firstDeviceOnList);
  }, []);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.value === "openPopup") {
      document.body.style.cssText = "overflow:hidden !important";
      setOpen(true);
    }
    if (message.value === "closePopup") {
      document.body.style.overflow = "auto";
      setOpen(false);
    }
  });

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  const onChangeOptions = (e) => {
    setSelectedDevice(e.target.value);
    const currentDevice = deviceDimensionsList[e.target.value]
    if(currentDevice){
      setMobileViewFrame(currentDevice)
    }
  };

  const onChangeZoomOption = (e) => {
    setZoom(e.target.value);
  };

  const PhoneContainerJsx = (props) => {
    switch (selectedDevice) {
      case "iphone":
        return <Iphone {...props} />;
      case "iphone1":
        return <Iphone1 {...props} />;
      case "iphone2":
        return <Iphone2  {...props}/>;
      case "samsung":
        return <Samsung1  {...props}/>;
      case "samsung1":
        return <Samsung2 {...props} />;
      case "samsung2":
        return <Samsung3 {...props} />;
      case "pixel":
        return <Pixel {...props} />;
      case "pixel1":
        return <Pixel1 {...props} />;
      case "moto":
        return <Moto {...props} />;
      default:
        return <></>;
    }
  };

 

  
  return (
    <>
      {open && (
        <Box className={overlay}>
          <Box className={modal}>

            <iframe src={location} height="100%" width="75%" title="Desktop View"/>

            <div className={zoom == "1" ? mobileView : mobileViewWithWidth} style={{ width: mobileViewFrame.width }}>
              <div className={mobileOptions}>

                <select name="phone" id="phone" onChange={onChangeOptions}>
                  {deviceList.map((e) => <option value={e.value}>{e.name}</option>)}
                </select>

                <div className={resolution}>
                  <span>{mobileViewFrame.width}</span> X <span>{mobileViewFrame.height}</span>
                </div>

                <select className={zoomClass} name="zoom" defaultValue={zoom} id="zoom" onChange={onChangeZoomOption}>
                  {zoomOptionList.map((e)=><option value={e.value}>{e.name}</option>)}
                </select>

              </div>
              {selectedDeviceClasses[selectedDevice] && zoom !== "1" ? (
                <div className={deviceContainer}
                  style={{
                    transform: `scale(${zoom})`,
                    minHeight: `${mobileViewFrame.height}px`,
                    top: mobileViewFrame.height > 850 ? "-10%" : "-5%",
                  }}>

                  <PhoneContainerJsx style={{ position: "absolute" }} />
                  
                  <iframe className={selectedDeviceClasses[selectedDevice]}
                    style={{ position: "absolute" }} src={location}
                    ref={mobIframe} {...mobileViewFrame} title="Mobile View"/>

                </div>
              ) : (
                <iframe style={{ transform: `scale(${zoom})` }} src={location}
                  ref={mobIframe} {...mobileViewFrame} title="Mobile View"/>
              )}
            </div>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ContentScript;
