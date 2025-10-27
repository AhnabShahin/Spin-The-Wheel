import { useState, useEffect } from "@wordpress/element";
import { Row, Col, Card } from "antd";

import CustomRouletteForm from "./CustomRouletteForm";
import { initialFormValues } from "./initialFormValues";
import PreviewCustomRoulette from "./PreviewCustomRoulette";

const CustomRouletteManager = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialFormValues);
  }, []);

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
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

        <Col span={10} style={{ position: "sticky", top: 24, height: "fit-content" }}>
          <Card title="Live Preview" style={{ height: "100%", position: "sticky", top: 24 }}>
            <PreviewCustomRoulette formData={formData} setFormData={setFormData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomRouletteManager;
