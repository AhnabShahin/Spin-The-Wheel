import { useState } from "@wordpress/element";
import PropTypes from "prop-types";
import { Wheel } from "react-custom-roulette";

import { initialFormValues } from "./initialFormValues";
import "./PreviewCustomRoulette.css";

const PreviewCustomRoulette = ({ formData = {} }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const spinDurationSeconds = formData?.spinDuration
    ? formData.spinDuration > 10
      ? formData.spinDuration / 1000
      : formData.spinDuration
    : 1.0;

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * (slices.length || 0));
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  // prefer `slices` but fall back to legacy `data`
  const slices = Array.isArray(formData?.slices) ? formData.slices : [];

  if (!slices.length) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          color: "#999",
        }}
      >
        Please add wheel slices to preview
      </div>
    );
  }

  return (
    <div className="custom-roulette-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={slices.map((slice) => ({
          option: slice.option || "No Option",
          style: {
            backgroundColor: slice.style?.backgroundColor || initialFormValues.slices[0].style.backgroundColor,
            textColor: slice.style?.textColor || initialFormValues.slices[0].style.textColor,
          },
        }))}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        outerBorderColor={formData?.outerBorderColor || initialFormValues.outerBorderColor}
        outerBorderWidth={formData?.outerBorderWidth || initialFormValues.outerBorderWidth}
        innerBorderColor={formData?.innerBorderColor || initialFormValues.innerBorderColor}
        innerBorderWidth={formData?.innerBorderWidth || initialFormValues.innerBorderWidth}
        radiusLineColor={formData?.radiusLineColor || initialFormValues.radiusLineColor}
        radiusLineWidth={formData?.radiusLineWidth || initialFormValues.radiusLineWidth}
        fontSize={formData?.fontSize || initialFormValues.fontSize}
        textDistance={formData?.textDistance || initialFormValues.textDistance}
        spinDuration={spinDurationSeconds}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSpinClick}
          disabled={mustSpin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: mustSpin ? "not-allowed" : "pointer",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {mustSpin ? "Spinning..." : "SPIN"}
        </button>
      </div>
    </div>
  );
};

PreviewCustomRoulette.propTypes = {
  formData: PropTypes.shape({
    slices: PropTypes.arrayOf(
      PropTypes.shape({
        option: PropTypes.string,
        style: PropTypes.shape({
          backgroundColor: PropTypes.string,
          textColor: PropTypes.string,
        }),
      })
    ),
    outerBorderColor: PropTypes.string,
    outerBorderWidth: PropTypes.number,
    innerBorderColor: PropTypes.string,
    innerBorderWidth: PropTypes.number,
    radiusLineColor: PropTypes.string,
    radiusLineWidth: PropTypes.number,
    fontSize: PropTypes.number,
    textDistance: PropTypes.number,
    spinDuration: PropTypes.number,
  }),
};

export default PreviewCustomRoulette;
