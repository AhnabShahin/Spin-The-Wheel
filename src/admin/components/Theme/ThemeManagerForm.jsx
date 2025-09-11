
import {
  Form,
  Input,
  Select,
  Divider,
  Row,
  Col,
  InputNumber,
  Switch,
  Collapse,
  ColorPicker
} from "antd";
import PropTypes from "prop-types";

const { Panel } = Collapse;

const ThemeManagerForm = ({
  form,
  selectedWheelSlices,
  selectedWheelData,
  wheelData,
  wheelDataLoading,
  wheelDataPage,
  wheelDataTotal,
  wheelDataSearch,
  setWheelDataSearch,
  loadWheelData,
  handleWheelDataChange,
  handleSubmit,
}) => {

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      {/* Basic Information */}
      <Form.Item
        name="name"
        label="Theme Name"
        rules={[{ required: true, message: "Please enter a theme name" }]}
      >
        <Input placeholder="Enter theme name" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input placeholder="Enter theme description" />
      </Form.Item>

      <Form.Item
        name="wheelDataId"
        label="Wheel Data"
        rules={[{ required: true, message: "Please select wheel data" }]}
      >
        <Select
          showSearch
          allowClear
          placeholder="Select wheel data"
          value={form.getFieldValue("wheelDataId")}
          loading={wheelDataLoading}
          filterOption={false}
          onSearch={(val) => {
            setWheelDataSearch(val);
            loadWheelData(1, 10, val);
          }}
          onChange={(val) => {
            form.setFieldsValue({ wheelDataId: val });
            handleWheelDataChange(val);
          }}
          onPopupScroll={(e) => {
            const target = e.target;
            if (
              target.scrollTop + target.offsetHeight === target.scrollHeight &&
              wheelData.length < wheelDataTotal
            ) {
              loadWheelData(wheelDataPage + 1, 10, wheelDataSearch);
            }
          }}
          optionFilterProp="children"
          style={{ width: "100%" }}
        >
          {wheelData.map((w) => (
            <Select.Option key={String(w.id)} value={String(w.id)}>
              {w.name} - have slices: {w.data?.length || 0}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Divider>Theme Configuration</Divider>

      <div
        style={{
          background: "#fafafa",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {/* Basic Configuration Card */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            marginBottom: "16px",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="prizeNumber"
                label="Prize Number"
                rules={[
                  { required: true, message: "Please enter prize number" },
                ]}
                style={{ marginBottom: 16 }}
              >
                <InputNumber
                  min={0}
                  placeholder="Prize index"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="startingOptionIndex"
                label="Starting Option Index"
                style={{ marginBottom: 16 }}
              >
                <InputNumber
                  min={0}
                  placeholder="Starting index"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="spinDuration"
                label="Spin Duration (ms)"
                style={{ marginBottom: 16 }}
              >
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
                style={{ marginBottom: 16 }}
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="disableInitialAnimation"
                label="Disable Initial Animation"
                valuePropName="checked"
                style={{ marginBottom: 16 }}
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Collapse ghost>
            <Panel header="Advanced Settings" key="1">
              {/* Colors */}
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label={`Slice Colors Configuration (${selectedWheelSlices} slices)`}
                    style={{ marginBottom: 16 }}
                  >
                    {selectedWheelSlices > 0 ? (
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          padding: "16px",
                        }}
                      >
                        {Array.from(
                          { length: selectedWheelSlices },
                          (_, index) => {
                            const sliceName =
                              selectedWheelData?.data?.[index]?.option ||
                              `Slice ${index + 1}`;
                            return (
                              <Row
                                key={`slice-${index}`}
                                gutter={16}
                                style={{
                                  marginBottom:
                                    index < selectedWheelSlices - 1 ? 12 : 0,
                                }}
                              >
                                <Col span={8}>
                                  <div
                                    style={{
                                      padding: "8px 12px",
                                      background: "#f5f5f5",
                                      borderRadius: "4px",
                                      fontWeight: 500,
                                      display: "flex",
                                      alignItems: "center",
                                      height: "32px",
                                    }}
                                  >
                                    {index + 1}. {sliceName}
                                  </div>
                                </Col>
                                <Col span={8}>
                                  <Form.Item
                                    name={["backgroundColors", index]}
                                    label="Background"
                                    style={{ marginBottom: 0 }}
                                  >
                                    <ColorPicker
                                      showText
                                      format="hex"
                                      size="small"
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
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item
                                    name={["textColors", index]}
                                    label="Text"
                                    style={{ marginBottom: 0 }}
                                  >
                                    <ColorPicker
                                      showText
                                      format="hex"
                                      size="small"
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
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "24px",
                          textAlign: "center",
                          color: "#999",
                          fontStyle: "italic",
                          border: "1px dashed #d9d9d9",
                          borderRadius: "6px",
                        }}
                      >
                        Please select wheel data first to configure slice colors
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              {/* Border Configuration */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="outerBorderColor"
                    label="Outer Border Color"
                    style={{ marginBottom: 16 }}
                  >
                    <ColorPicker
                      showText
                      format="hex"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="outerBorderWidth"
                    label="Outer Border Width"
                    style={{ marginBottom: 16 }}
                  >
                    <InputNumber
                      min={0}
                      max={20}
                      placeholder="Width in pixels"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="innerRadius"
                    label="Inner Radius"
                    style={{ marginBottom: 16 }}
                  >
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
                  <Form.Item
                    name="innerBorderColor"
                    label="Inner Border Color"
                    style={{ marginBottom: 16 }}
                  >
                    <ColorPicker
                      showText
                      format="hex"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="innerBorderWidth"
                    label="Inner Border Width"
                    style={{ marginBottom: 16 }}
                  >
                    <InputNumber
                      min={0}
                      max={20}
                      placeholder="Width in pixels"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="radiusLineWidth"
                    label="Radius Line Width"
                    style={{ marginBottom: 16 }}
                  >
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
                  <Form.Item
                    name="radiusLineColor"
                    label="Radius Line Color"
                    style={{ marginBottom: 16 }}
                  >
                    <ColorPicker
                      showText
                      format="hex"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Typography */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="fontFamily"
                    label="Font Family"
                    style={{ marginBottom: 16 }}
                  >
                    <Select
                      placeholder="Select font family"
                      style={{ width: "100%" }}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                      dropdownStyle={{ zIndex: 1050 }}
                    >
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
                  <Form.Item
                    name="fontSize"
                    label="Font Size"
                    style={{ marginBottom: 16 }}
                  >
                    <InputNumber
                      min={8}
                      max={48}
                      placeholder="Size in pixels"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="fontWeight"
                    label="Font Weight"
                    style={{ marginBottom: 16 }}
                  >
                    <Select
                      placeholder="Select font weight"
                      style={{ width: "100%" }}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                      dropdownStyle={{ zIndex: 1050 }}
                    >
                      <Select.Option value={100}>100 - Thin</Select.Option>
                      <Select.Option value={200}>
                        200 - Extra Light
                      </Select.Option>
                      <Select.Option value={300}>300 - Light</Select.Option>
                      <Select.Option value={400}>400 - Normal</Select.Option>
                      <Select.Option value={500}>500 - Medium</Select.Option>
                      <Select.Option value={600}>600 - Semi Bold</Select.Option>
                      <Select.Option value={700}>700 - Bold</Select.Option>
                      <Select.Option value={800}>
                        800 - Extra Bold
                      </Select.Option>
                      <Select.Option value={900}>900 - Black</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="fontStyle"
                    label="Font Style"
                    style={{ marginBottom: 16 }}
                  >
                    <Select
                      placeholder="Select font style"
                      style={{ width: "100%" }}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.parentElement
                      }
                      dropdownStyle={{ zIndex: 1050 }}
                    >
                      <Select.Option value="normal">Normal</Select.Option>
                      <Select.Option value="italic">Italic</Select.Option>
                      <Select.Option value="oblique">Oblique</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="perpendicularText"
                    label="Perpendicular Text"
                    valuePropName="checked"
                    style={{ marginBottom: 16 }}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              {/* Pointer Configuration */}
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="pointerImageSource"
                    label="Pointer Image Source"
                    style={{ marginBottom: 16 }}
                  >
                    <Input
                      placeholder="Enter pointer image URL"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </div>
      </div>
    </Form>
  );
};


ThemeManagerForm.propTypes = {
  form: PropTypes.object.isRequired,
  selectedWheelSlices: PropTypes.number.isRequired,
  selectedWheelData: PropTypes.object,
  wheelData: PropTypes.array.isRequired,
  wheelDataLoading: PropTypes.bool.isRequired,
  wheelDataPage: PropTypes.number.isRequired,
  wheelDataTotal: PropTypes.number.isRequired,
  wheelDataSearch: PropTypes.string.isRequired,
  setWheelDataSearch: PropTypes.func.isRequired,
  loadWheelData: PropTypes.func.isRequired,
  handleWheelDataChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ThemeManagerForm;
