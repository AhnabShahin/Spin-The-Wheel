import { useState, useEffect } from "@wordpress/element";
import { Form, Row, Col, Button, Card, message } from "antd";

import CustomRouletteForm from "./CustomRouletteForm";
import PreviewCustomRoulette from "./Roulette/PreviewCustomRoulette";

const CustomRouletteManager = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      // Make API call to save the roulette
      const response = await fetch('/wp-json/stw/v1/roulette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.stwAjax?.nonce || '',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        message.success('Roulette saved successfully!');
        // Optionally redirect or update the form with the returned data
        console.log('Saved roulette:', result.data);
      } else {
        message.error(result.message || 'Failed to save roulette');
      }
    } catch (error) {
      console.error('Error saving roulette:', error);
      message.error('An error occurred while saving the roulette');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={24}>
        <Col span={14}>
          <Card title="Roulette Configuration" style={{ height: '100%' }}>
            <CustomRouletteForm
              form={form}
              handleSubmit={handleSubmit}
              handleFormValuesChange={handleFormValuesChange}
            />
            
            <div style={{ marginTop: 24, textAlign: 'right' }}>
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
          <Card title="Live Preview" style={{ height: '100%' }}>
            <PreviewCustomRoulette formData={formData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomRouletteManager;
