import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "@wordpress/element";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  InputNumber,
  Switch,
  Collapse,
  ColorPicker,
  Button,
  Card,
  message,
} from "antd";
import PropTypes from "prop-types";

const { Panel } = Collapse;

const CustomRouletteForm = ({ formData, setFormData, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleSliceAdd = () => {
    const slices = Array.isArray(form.getFieldValue("slices"))
      ? form.getFieldValue("slices")
      : [];
    const newSlices = [
      ...slices,
      {...initialValues.slices[0]},
    ];
    form.setFieldsValue({ slices: newSlices });
    // Ensure handleFormValuesChange is called with updated allValues
    handleFormValuesChange({}, form.getFieldsValue());
  };

  const handleSliceRemove = (index) => {
    const slices = Array.isArray(form.getFieldValue("slices"))
      ? form.getFieldValue("slices")
      : [];
    if (slices.length <= 1) {
      message.warning("At least one slice is required");
      return;
    }
    const newSlices = slices.filter((_, i) => i !== index);
    form.setFieldsValue({ slices: newSlices });
    // Ensure handleFormValuesChange is called with updated allValues
    handleFormValuesChange({}, form.getFieldsValue());
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => {
        handleFormValuesChange(changedValues, allValues);
      }}
      initialValues={initialValues}
    >
      {/* Basic Information */}
      <Card title="Basic Information" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Roulette Name"
              rules={[
                { required: true, message: "Please enter a roulette name" },
              ]}
            >
              <Input placeholder="Enter roulette name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="Description">
              <Input placeholder="Enter description" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Wheel Slices Configuration */}
      <Card
        title="Wheel Slices"
        style={{ marginBottom: 16 }}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleSliceAdd}
          >
            Add Slice
          </Button>
        }
      >
        <Form.List name="slices">
          {(fields, { add: _add, remove: _remove }) => (
            <>
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`Slice ${index + 1}`}
                  style={{ marginBottom: 16 }}
                  extra={
                    fields.length > 1 ? (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          handleSliceRemove(index);
                        }}
                      />
                    ) : null
                  }
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        name={[field.name, "option"]}
                        label="Slice Text"
                        rules={[
                          {
                            required: true,
                            message: "Please enter slice text",
                          },
                        ]}
                      >
                        <Input placeholder="Enter slice text" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      {/* Background Color Picker with onChange handler */}
                      <Form.Item
                        name={[field.name, "style", "backgroundColor"]}
                        label="Background Color"
                      >
                        <ColorPicker
                          showText
                          format="hex"
                          style={{ width: "100%" }}
                          presets={[
                            {
                              label: "Recommended",
                              colors: [
                                "#ff8f43",
                                "#70bbe0",
                                "#0b7ec8",
                                "#ffd23f",
                                "#e74c3c",
                                "#f39c12",
                                "#9b59b6",
                                "#2ecc71",
                              ],
                            },
                          ]}
                            onChange={(color) => {
                              const hexColor = color.toHexString(); // Ensure only hex color is used
                              const slices = form.getFieldValue("slices") || [];
                              slices[field.name].style.backgroundColor = hexColor;
                              form.setFieldsValue({ slices });
                              handleFormValuesChange({}, form.getFieldsValue());
                            }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name={[field.name, "style", "textColor"]}
                        label="Text Color"
                      >
                        <ColorPicker
                          showText
                          format="hex"
                          style={{ width: "100%" }}
                          presets={[
                            {
                              label: "Common",
                              colors: [
                                "#ffffff",
                                "#000000",
                                "#333333",
                                "#666666",
                                "#999999",
                                "#cccccc",
                                "#ff0000",
                                "#00ff00",
                              ],
                            },
                          ]}
                            onChange={(color) => {
                              const hexColor = color.toHexString(); // Ensure only hex color is used
                              const slices = form.getFieldValue("slices") || [];
                              slices[field.name].style.textColor = hexColor;
                              form.setFieldsValue({ slices });
                              handleFormValuesChange({}, form.getFieldsValue());
                            }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Collapse ghost>
                    <Panel header="Advanced Slice Settings" key="1">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name={[field.name, "image", "uri"]}
                            label="Image URL"
                          >
                            <Input placeholder="Enter image URL" />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={[field.name, "optionSize"]}
                            label="Option Size"
                          >
                            <InputNumber
                              min={0.1}
                              max={10}
                              step={0.1}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={6}>
                          <Form.Item
                            name={[field.name, "image", "offsetX"]}
                            label="Image Offset X"
                          >
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={[field.name, "image", "offsetY"]}
                            label="Image Offset Y"
                          >
                            <InputNumber style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={[field.name, "image", "sizeMultiplier"]}
                            label="Image Size"
                          >
                            <InputNumber
                              min={0.1}
                              max={5}
                              step={0.1}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={[field.name, "image", "landscape"]}
                            label="Landscape"
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            name={[field.name, "style", "fontFamily"]}
                            label="Font Family"
                          >
                            <Select placeholder="Select font family">
                              <Select.Option value="Arial">Arial</Select.Option>
                              <Select.Option value="Helvetica">
                                Helvetica
                              </Select.Option>
                              <Select.Option value="Times New Roman">
                                Times New Roman
                              </Select.Option>
                              <Select.Option value="Georgia">
                                Georgia
                              </Select.Option>
                              <Select.Option value="Verdana">
                                Verdana
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={[field.name, "style", "fontSize"]}
                            label="Font Size"
                          >
                            <InputNumber
                              min={8}
                              max={48}
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name={[field.name, "style", "fontWeight"]}
                            label="Font Weight"
                          >
                            <Select placeholder="Select font weight">
                              <Select.Option value={100}>
                                100 - Thin
                              </Select.Option>
                              <Select.Option value={200}>
                                200 - Extra Light
                              </Select.Option>
                              <Select.Option value={300}>
                                300 - Light
                              </Select.Option>
                              <Select.Option value={400}>
                                400 - Normal
                              </Select.Option>
                              <Select.Option value={500}>
                                500 - Medium
                              </Select.Option>
                              <Select.Option value={600}>
                                600 - Semi Bold
                              </Select.Option>
                              <Select.Option value={700}>
                                700 - Bold
                              </Select.Option>
                              <Select.Option value={800}>
                                800 - Extra Bold
                              </Select.Option>
                              <Select.Option value={900}>
                                900 - Black
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Card>
              ))}
            </>
          )}
        </Form.List>
      </Card>

      {/* Wheel Configuration */}
      <Card title="Wheel Configuration" style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="prizeNumber"
              label="Prize Number"
              rules={[{ required: true, message: "Please enter prize number" }]}
            >
              <InputNumber
                min={0}
                placeholder="Prize index"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="startingOptionIndex" label="Starting Option Index">
              <InputNumber
                min={0}
                placeholder="Starting index"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="spinDuration" label="Spin Duration (ms)">
              <InputNumber
                min={1000}
                max={10000}
                placeholder="Duration"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mustStartSpinning"
              label="Must Start Spinning"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="disableInitialAnimation"
              label="Disable Initial Animation"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Appearance Configuration */}
      <Card title="Appearance Configuration" style={{ marginBottom: 16 }}>
        <Collapse>
          <Panel header="Border Settings" key="borders">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="outerBorderColor" label="Outer Border Color">
                  <ColorPicker
                    showText
                    format="hex"
                    style={{ width: "100%" }}
                    onChange={(color) => {
                      const hexColor = color.toHexString();
                      const formValues = form.getFieldsValue();
                      form.setFieldsValue({ ...formValues, outerBorderColor: hexColor });
                      handleFormValuesChange({}, form.getFieldsValue());
                    }}
                    />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="outerBorderWidth" label="Outer Border Width">
                  <InputNumber
                    min={0}
                    max={20}
                    placeholder="Width in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="innerRadius" label="Inner Radius">
                  <InputNumber
                    min={0}
                    placeholder="Radius in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="innerBorderColor" label="Inner Border Color">
                  <ColorPicker
                    showText
                    format="hex"
                    style={{ width: "100%" }}
                    onChange={(color) => {
                      const hexColor = color.toHexString();
                      const formValues = form.getFieldsValue();
                      form.setFieldsValue({ ...formValues, innerBorderColor: hexColor });
                      handleFormValuesChange({}, form.getFieldsValue());
                    }}
                    />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="innerBorderWidth" label="Inner Border Width">
                  <InputNumber
                    min={0}
                    max={20}
                    placeholder="Width in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="radiusLineWidth" label="Radius Line Width">
                  <InputNumber
                    min={0}
                    max={20}
                    placeholder="Width in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="radiusLineColor" label="Radius Line Color">
                  <ColorPicker
                    showText
                    format="hex"
                    style={{ width: "100%" }}
                    onChange={(color) => {
                      const hexColor = color.toHexString();
                      const formValues = form.getFieldsValue();
                      form.setFieldsValue({ ...formValues, radiusLineColor: hexColor });
                      handleFormValuesChange({}, form.getFieldsValue());
                    }}
                    />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="Typography Settings" key="typography">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="fontFamily" label="Font Family">
                  <Select placeholder="Select font family">
                    <Select.Option value="Arial">Arial</Select.Option>
                    <Select.Option value="Helvetica">Helvetica</Select.Option>
                    <Select.Option value="Times New Roman">
                      Times New Roman
                    </Select.Option>
                    <Select.Option value="Georgia">Georgia</Select.Option>
                    <Select.Option value="Verdana">Verdana</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="fontSize" label="Font Size">
                  <InputNumber
                    min={8}
                    max={48}
                    placeholder="Size in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="fontWeight" label="Font Weight">
                  <Select placeholder="Select font weight">
                    <Select.Option value={100}>100 - Thin</Select.Option>
                    <Select.Option value={200}>200 - Extra Light</Select.Option>
                    <Select.Option value={300}>300 - Light</Select.Option>
                    <Select.Option value={400}>400 - Normal</Select.Option>
                    <Select.Option value={500}>500 - Medium</Select.Option>
                    <Select.Option value={600}>600 - Semi Bold</Select.Option>
                    <Select.Option value={700}>700 - Bold</Select.Option>
                    <Select.Option value={800}>800 - Extra Bold</Select.Option>
                    <Select.Option value={900}>900 - Black</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="fontStyle" label="Font Style">
                  <Select placeholder="Select font style">
                    <Select.Option value="normal">Normal</Select.Option>
                    <Select.Option value="italic">Italic</Select.Option>
                    <Select.Option value="oblique">Oblique</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="textDistance" label="Text Distance">
                  <InputNumber
                    min={10}
                    max={200}
                    placeholder="Distance in pixels"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="perpendicularText"
                  label="Perpendicular Text"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Panel>

          <Panel header="Pointer Settings" key="pointer">
            <Form.Item name="pointerImageSource" label="Pointer Image URL">
              <Input
                placeholder="Enter pointer image URL"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Panel>
        </Collapse>
      </Card>

      {/* Save Button */}
      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Button type="primary" onClick={() => form.submit()} size="large">
          Save Roulette
        </Button>
      </div>
    </Form>
  );
};

CustomRouletteForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  initialValues: PropTypes.object,
};

export default CustomRouletteForm;
