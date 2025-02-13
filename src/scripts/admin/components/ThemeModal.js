import { Drawer, Form, Input, ColorPicker, InputNumber, Select, Switch, Table, Row, Col } from "antd";
import { useState, useRef, useEffect } from "@wordpress/element";
import apiFetch from '@wordpress/api-fetch';
import { Wheel } from 'react-custom-roulette';

const { Option } = Select;

const ThemeModal = ({ isOpen, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Sample wheel data - you can customize this based on your needs
  const wheelData = [
    { option: '30% OFF', style: { backgroundColor: '#ff4d4f', textColor: '#ffffff' } },
    { option: '20% OFF', style: { backgroundColor: '#1890ff', textColor: '#ffffff' } },
    { option: '10% OFF', style: { backgroundColor: '#52c41a', textColor: '#ffffff' } },
    { option: 'Try Again', style: { backgroundColor: '#faad14', textColor: '#ffffff' } }
  ];

  useEffect(() => {
    if (isOpen) {
      fetchThemeProperties();
    }
  }, [isOpen]);

  const fetchThemeProperties = async () => {
    setLoading(true);
    try {
      const response = await apiFetch({ 
        path: '/spin-wheel/v1/theme-properties'
      });
      const formattedData = response.map((item, index) => ({
        key: String(index + 1),
        property: item.name,
        description: item.description,
        type: item.type,
        defaultValue: item.default_value || '-'
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching theme properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Add New Theme"
      open={isOpen}
      onClose={handleCancel}
      width={800}
      zIndex={99999}
      styles={{
        header: {
          paddingInline: 24,
          paddingBlock: 16
        },
        body: {
          paddingInline: 24
        }
      }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <button 
            className="button button-secondary" 
            onClick={handleCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </button>
          <button 
            className="button button-primary" 
            onClick={handleOk}
          >
            Save
          </button>
        </div>
      }
    >
      <Row gutter={24}>
        {/* Left Column - Wheel Preview */}
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <h3>Theme Preview</h3>
            <div style={{ marginBottom: 16 }}>
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelData}
                onStopSpinning={() => setMustSpin(false)}
                outerBorderWidth={form.getFieldValue('outerBorderWidth') || 5}
                innerBorderWidth={form.getFieldValue('innerBorderWidth') || 0}
                radiusLineWidth={form.getFieldValue('radiusLineWidth') || 5}
                fontSize={form.getFieldValue('fontSize') || 20}
                textDistance={form.getFieldValue('textDistance') || 60}
              />
            </div>
            <button 
              className="button button-primary"
              onClick={handleSpinClick}
              disabled={mustSpin}
            >
              {mustSpin ? 'Spinning...' : 'SPIN'}
            </button>
          </div>
        </Col>

        {/* Right Column - Form Controls */}
        <Col span={12}>
          <Form
            form={form}
            layout="vertical" 
            name="add_theme_form"
          >
            <Form.Item
              name="themeName"
              label="Theme Name"
              rules={[{ required: false, message: 'Please enter theme name' }]}
            >
              <Input placeholder="Enter theme name" />
            </Form.Item>

            {/* Background Colors */}
            <Form.Item
              name="backgroundColors"
              label="Background Colors"
              rules={[{ required: false, message: 'Please select background colors' }]}
            >
              <ColorPicker />
            </Form.Item>

            {/* Text Colors */}
            <Form.Item
              name="textColors"
              label="Text Colors"
              rules={[{ required: false, message: 'Please select text colors' }]}
            >
              <ColorPicker />
            </Form.Item>

            {/* Border Settings */}
            <Form.Item
              name="outerBorderColor"
              label="Outer Border Color"
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item
              name="outerBorderWidth"
              label="Outer Border Width"
            >
              <InputNumber min={0} max={20} defaultValue={5} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="innerBorderColor"
              label="Inner Border Color"
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item
              name="innerBorderWidth"
              label="Inner Border Width"
            >
              <InputNumber min={0} max={20} defaultValue={0} style={{ width: '100%' }} />
            </Form.Item>

            {/* Radius Settings */}
            <Form.Item
              name="innerRadius"
              label="Inner Radius (0-100)"
            >
              <InputNumber min={0} max={100} defaultValue={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="radiusLineColor"
              label="Radius Line Color"
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item
              name="radiusLineWidth"
              label="Radius Line Width"
            >
              <InputNumber min={0} max={20} defaultValue={5} style={{ width: '100%' }} />
            </Form.Item>

            {/* Font Settings */}
            <Form.Item
              name="fontFamily"
              label="Font Family"
            >
              <Input placeholder="Helvetica, Arial" />
            </Form.Item>

            <Form.Item
              name="fontSize"
              label="Font Size (px)"
            >
              <InputNumber min={12} max={48} defaultValue={20} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="fontWeight"
              label="Font Weight"
            >
              <Select defaultValue="bold">
                <Option value="normal">Normal</Option>
                <Option value="bold">Bold</Option>
                <Option value="100">100</Option>
                <Option value="200">200</Option>
                <Option value="300">300</Option>
                <Option value="400">400</Option>
                <Option value="500">500</Option>
                <Option value="600">600</Option>
                <Option value="700">700</Option>
                <Option value="800">800</Option>
                <Option value="900">900</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="fontStyle"
              label="Font Style"
            >
              <Select defaultValue="normal">
                <Option value="normal">Normal</Option>
                <Option value="italic">Italic</Option>
              </Select>
            </Form.Item>

            {/* Text Settings */}
            <Form.Item
              name="perpendicularText"
              label="Perpendicular Text"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="textDistance"
              label="Text Distance (0-100)"
            >
              <InputNumber min={0} max={100} defaultValue={60} style={{ width: '100%' }} />
            </Form.Item>

            {/* Animation Settings */}
            <Form.Item
              name="spinDuration"
              label="Spin Duration (seconds)"
            >
              <InputNumber min={0.01} max={10} step={0.1} defaultValue={1.0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="disableInitialAnimation"
              label="Disable Initial Animation"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Drawer>
  );
};

export default ThemeModal;