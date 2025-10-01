import { useState } from "@wordpress/element";
import { Card } from "antd";
import PropTypes from 'prop-types';
import { Wheel } from "react-custom-roulette";
import "./PreviewCustomRoulette.css";

const PreviewCustomRoulette = ({ formData = {} }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * (formData?.slices?.length || 0));
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  if (!formData?.slices?.length) {
    return (
      <Card style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Please add wheel slices to preview
      </Card>
    );
  }

  return (
    <div className="custom-roulette-container">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={formData?.slices ?? []}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        outerBorderColor={formData?.outerBorderColor || "#000000"}
        outerBorderWidth={formData?.outerBorderWidth || 5}
        innerBorderColor={formData?.innerBorderColor || "#000000"}
        innerBorderWidth={formData?.innerBorderWidth || 3}
        radiusLineColor={formData?.radiusLineColor || "#000000"}
        radiusLineWidth={formData?.radiusLineWidth || 2}
        fontSize={formData?.fontSize || 16}
        textDistance={formData?.textDistance || 60}
        spinDuration={formData?.spinDuration || 1.0}
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
    slices: PropTypes.arrayOf(PropTypes.shape({
      option: PropTypes.string,
      style: PropTypes.shape({
        backgroundColor: PropTypes.string,
        textColor: PropTypes.string
      })
    })),
    outerBorderColor: PropTypes.string,
    outerBorderWidth: PropTypes.number,
    innerBorderColor: PropTypes.string,
    innerBorderWidth: PropTypes.number,
    radiusLineColor: PropTypes.string,
    radiusLineWidth: PropTypes.number,
    fontSize: PropTypes.number,
    textDistance: PropTypes.number,
    spinDuration: PropTypes.number
  })
};

export default PreviewCustomRoulette;
