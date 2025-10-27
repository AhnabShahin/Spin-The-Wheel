import { useState, useEffect } from "@wordpress/element";
import { Row, Col, Card } from "antd";

import CustomRouletteForm from "./CustomRouletteForm";
import PreviewCustomRoulette from "./PreviewCustomRoulette";

// Single source of truth for initial values used by both the form and preview
const initialFormValues = {
  slices: [
    {
      option: "",
      image: {
        uri: "",
        offsetX: 0,
        offsetY: 0,
        sizeMultiplier: 1,
        landscape: false,
      },
      style: {
        backgroundColor: "#ff8f43",
        textColor: "#ffffff",
        fontFamily: "Arial",
        fontSize: 20,
        fontWeight: 400,
        fontStyle: "normal",
      },
      optionSize: 1,
      couponId: "",
    },
  ],
  mustStartSpinning: false,
  prizeNumber: 0,
  outerBorderColor: "#000000",
  outerBorderWidth: 5,
  innerRadius: 0,
  innerBorderColor: "#000000",
  innerBorderWidth: 0,
  radiusLineColor: "#000000",
  radiusLineWidth: 5,
  fontFamily: "Arial",
  fontSize: 20,
  fontWeight: 400,
  fontStyle: "normal",
  perpendicularText: false,
  textDistance: 60,
  // keep this in ms here (works with form UX) — Preview will normalize
  spinDuration: 1000,
  startingOptionIndex: 0,
  disableInitialAnimation: false,
};

const CustomRouletteManager = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialFormValues);
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={24}>
        <Col span={14}>
          <Card title="Roulette Configuration" style={{ height: "100%" }}>
            <CustomRouletteForm
              initialValues={initialFormValues}
              formData={formData}
              setFormData={setFormData}
            />
          </Card>
        </Col>

        <Col span={10}>
          <Card title="Live Preview" style={{ height: "100%" }}>
            <PreviewCustomRoulette formData={formData} setFormData={setFormData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomRouletteManager;
