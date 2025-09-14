import { useEffect, useState } from "@wordpress/element";
import { Card } from "antd";
import PropTypes from 'prop-types';
import { Wheel } from "react-custom-roulette";

const CustomRoulette = ({ formData = {}, selectedWheelData = null }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelData, setWheelData] = useState([]);

  useEffect(() => {
    if (selectedWheelData?.data) {
      const data = selectedWheelData.data.map((item, index) => ({
        option: item.text || `Item ${index + 1}`,
        style: {
          backgroundColor: formData.backgroundColors?.[index] || "#ff8f43",
          textColor: formData.textColors?.[index] || "#ffffff",
        },
      }));
      setWheelData(data);
    }
  }, [selectedWheelData, formData]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  if (!wheelData.length) {
    return (
      <Card style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Please select wheel data to preview
      </Card>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
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

CustomRoulette.propTypes = {
  formData: PropTypes.shape({
    backgroundColors: PropTypes.arrayOf(PropTypes.string),
    textColors: PropTypes.arrayOf(PropTypes.string),
    outerBorderColor: PropTypes.string,
    outerBorderWidth: PropTypes.number,
    innerBorderColor: PropTypes.string,
    innerBorderWidth: PropTypes.number,
    radiusLineColor: PropTypes.string,
    radiusLineWidth: PropTypes.number,
    fontSize: PropTypes.number,
    textDistance: PropTypes.number,
    spinDuration: PropTypes.number
  }),
  selectedWheelData: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string
    }))
  })
};

export default CustomRoulette;
