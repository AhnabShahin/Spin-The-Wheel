import { useState, useEffect } from "@wordpress/element";
import { Form, Row, Col, Button, Card, message } from "antd";

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
        fontSize: 16,
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
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  // set initial values into the form and preview when component mounts
  useEffect(() => {
    form.setFieldsValue(initialFormValues);
    setFormData(initialFormValues);
  }, [form]); 

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      // Make API call to save the roulette
      const response = await fetch("/wp-json/stw/v1/roulette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-WP-Nonce": window.stwAjax?.nonce || "",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        message.success("Roulette saved successfully!");
        // Optionally redirect or update the form with the returned data
      } else {
        message.error(result.message || "Failed to save roulette");
      }
    } catch (error) {
      console.error("Error saving roulette:", error);
      message.error("An error occurred while saving the roulette");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={24}>
        <Col span={14}>
          <Card title="Roulette Configuration" style={{ height: "100%" }}>
            <CustomRouletteForm
              form={form}
              handleSubmit={handleSubmit}
              handleFormValuesChange={handleFormValuesChange}
              initialValues={initialFormValues}
            />

            <div style={{ marginTop: 24, textAlign: "right" }}>
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={isSubmitting}
                size="large"
              >
                Save Roulette
              </Button>
            </div>
          </Card>
        </Col>

        <Col span={10}>
          <Card title="Live Preview" style={{ height: "100%" }}>
            <PreviewCustomRoulette formData={formData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomRouletteManager;
