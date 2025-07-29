import {
  Form,
  Input,
  Switch,
  Button,
  InputNumber,
  ColorPicker,
  Card,
  Upload,
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";

import { Row, Col } from "antd";
import themeConfig from '../config/themeConfig.json';


const ThemeForm = (handleSubmit) => {
  const formConfig = themeConfig.components?.Form || {};

  return (
    <>
      <Form
        name="spin_wheel_theme"
        onFinish={handleSubmit}
        layout={formConfig.layout || 'horizontal'}
        size={formConfig.size || 'middle'}
        style={{
          fontFamily: formConfig.fontFamily || 'Inter, sans-serif',
          marginBottom: formConfig.itemMarginBottom || 10
        }}
        initialValues={{
          mustStartSpinning: false,
          prizeNumber: 0,
          backgroundColors: ["#darkgrey", "#lightgrey"],
          textColors: ["#black"],
          outerBorderColor: "#black",
          outerBorderWidth: 5,
          innerRadius: 0,
          innerBorderColor: "#black",
          innerBorderWidth: 0,
          radiusLineColor: "#black",
          radiusLineWidth: 5,
          fontFamily: "Helvetica, Arial",
          fontSize: 20,
          fontWeight: "bold",
          fontStyle: "normal",
          perpendicularText: false,
          textDistance: 60,
          spinDuration: 1.0,
          disableInitialAnimation: false,
          data: [],
          startingOptionIndex: 0,
          pointerProps: {
            src: '',
            style: {}
          },
        }}
      >
        <Form.Item
          name="theme_name"
          label="Theme Names"
          rules={[
            {
              required: true,
              message: "Please input theme name",
            },
          ]}
        >
          <Input placeholder="Enter theme name" />
        </Form.Item>

        <Form.Item
          name="mustStartSpinning"
          label="Must Start Spinning"
          rules={[
            {
              required: true,
              message: "Please select if spinning should start",
            },
          ]}
          extra="Sets when the roulette must start the spinning animation"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="prizeNumber"
          label="Prize Number"
          rules={[
            {
              required: true,
              message: "Please input prize number",
            },
          ]}
          extra="Sets the winning option. Value must be between 0 and data.length-1"
        >
          <InputNumber
            min={0}
            placeholder="Enter prize number"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="backgroundColors"
          label="Background Colors"
          rules={[
            {
              required: true,
              message: "Please select background colors",
            },
          ]}
          extra="Array of colors that will fill the background of the roulette options"
        >
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          name="textColors"
          label="Text Colors"
          rules={[
            {
              required: true,
              message: "Please select text colors",
            },
          ]}
          extra="Array of colors that will fill the text of the roulette options"
        >
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          name="outerBorderColor"
          label="Outer Border Color"
          rules={[
            {
              required: true,
              message: "Please select outer border color",
            },
          ]}
          extra="Color of the roulette's outer border line"
        >
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          name="outerBorderWidth"
          label="Outer Border Width"
          rules={[
            {
              required: true,
              message: "Please input outer border width",
            },
          ]}
          extra="Width of the roulette's outer border line (0 represents no outer border line)"
        >
          <InputNumber
            min={0}
            placeholder="Enter outer border width"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="innerRadius"
          label="Inner Radius"
          rules={[
            {
              required: true,
              message: "Please input inner radius",
            },
          ]}
          extra="Distance of the inner radius from the center of the roulette"
        >
          <InputNumber
            min={0}
            max={100}
            placeholder="Enter inner radius"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="innerBorderColor"
          label="Inner Border Color"
          rules={[
            {
              required: true,
              message: "Please select inner border color",
            },
          ]}
          extra="Color of the roulette's inner border line"
        >
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          name="innerBorderWidth"
          label="Inner Border Width"
          rules={[
            {
              required: true,
              message: "Please input inner border width",
            },
          ]}
          extra="Width of the roulette's inner border line (0 represents no inner border line)"
        >
          <InputNumber
            min={0}
            placeholder="Enter inner border width"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="radiusLineColor"
          label="Radius Line Color"
          rules={[
            {
              required: true,
              message: "Please select radius line color",
            },
          ]}
          extra="Color of the radial lines that separate each option"
        >
          <ColorPicker showText />
        </Form.Item>

        <Form.Item
          name="radiusLineWidth"
          label="Radius Line Width"
          rules={[
            {
              required: true,
              message: "Please input radius line width",
            },
          ]}
          extra="Width of the radial lines that separate each option (0 represents no radial lines)"
        >
          <InputNumber
            min={0}
            placeholder="Enter radius line width"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="fontFamily"
          label="Font Family"
          rules={[
            {
              required: true,
              message: "Please input font family",
            },
          ]}
          extra="Global font family of the option string. Non-Web safe fonts are fetched from https://fonts.google.com/"
        >
          <Input placeholder="Enter font family" defaultValue="Helvetica, Arial" />
        </Form.Item>

        <Form.Item
          name="fontSize"
          label="Font Size"
          rules={[
            {
              required: true,
              message: "Please input font size",
            },
          ]}
          extra="Global font size of the option string"
        >
          <InputNumber
            min={1}
            defaultValue={20}
            placeholder="Enter font size"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="fontWeight"
          label="Font Weight"
          rules={[
            {
              required: true,
              message: "Please input font weight",
            },
          ]}
          extra="Global font weight of the option string"
        >
          <Input placeholder="Enter font weight" defaultValue="bold" />
        </Form.Item>

        <Form.Item
          name="fontStyle"
          label="Font Style"
          rules={[
            {
              required: true,
              message: "Please input font style",
            },
          ]}
          extra="Global font style of the option string"
        >
          <Input placeholder="Enter font style" defaultValue="normal" />
        </Form.Item>

        <Form.Item
          name="perpendicularText"
          label="Perpendicular Text"
          rules={[
            {
              required: true,
              message: "Please select if text should be perpendicular",
            },
          ]}
          extra="When true, sets the option texts perpendicular to the roulette's radial lines"
        >
          <Switch defaultChecked={false} />
        </Form.Item>

        <Form.Item
          name="textDistance"
          label="Text Distance"
          rules={[
            {
              required: true,
              message: "Please input text distance",
            },
          ]}
          extra="Distance of the option texts from the center of the roulette"
        >
          <InputNumber
            min={0}
            max={100}
            defaultValue={60}
            placeholder="Enter text distance"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="spinDuration"
          label="Spin Duration"
          rules={[
            {
              required: true,
              message: "Please input spin duration",
            },
          ]}
          extra="Coefficient to adjust the default spin duration"
        >
          <InputNumber
            min={0.01}
            step={0.1}
            defaultValue={1.0}
            placeholder="Enter spin duration"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="disableInitialAnimation"
          label="Disable Initial Animation"
          rules={[
            {
              required: true,
              message: "Please select if initial animation should be disabled",
            },
          ]}
          extra="When true, disables the initial backwards wheel animation"
        >
          <Switch defaultChecked={false} />
        </Form.Item>

        <Form.Item
          name="startingOptionIndex"
          label="Starting Option Index"
          extra="Set which option will be initially selected by the roulette (before spinning)"
        >
          <InputNumber
            min={0}
            placeholder="Enter starting option index"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Pointer Properties" style={{ marginBottom: 0 }}>
          <Form.Item
            name={["pointerProps", "src"]}
            label="Pointer Image Source"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="Enter pointer image URL" />
          </Form.Item>
          <Form.Item
            name={["pointerProps", "style"]}
            label="Pointer CSS Style"
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Input.TextArea
              placeholder="Enter CSS style object"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Wheel Data">
          <Form.List name="data">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <Card size="small" key={field.key} type="inner">
                    <CloseOutlined
                      onClick={() => remove(field.name)}
                      style={{ float: "right", cursor: "pointer" }}
                    />
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Option" name={[field.name, "option"]}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Option Size"
                          name={[field.name, "optionSize"]}
                        >
                          <InputNumber
                            placeholder="Enter option size (0, 1, 2, 3 ...)"
                            min={0}
                            defaultValue={1}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label="Style Type">
                          <Form.List name={[field.name, "style"]}>
                            {(fields, { add, remove }) => (
                              <div>
                                {fields.map((field) => (
                                  <Card
                                    size="small"
                                    key={field.key}
                                    type="inner"
                                  >
                                    <CloseOutlined
                                      onClick={() => remove(field.name)}
                                      style={{ float: "right", cursor: "pointer" }}
                                    />
                                    <Row gutter={16}>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Background Color"
                                          name={[field.name, "backgroundColor"]}
                                        >
                                          <ColorPicker showText />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Text Color"
                                          name={[field.name, "textColor"]}
                                        >
                                          <ColorPicker showText />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Font Family"
                                          name={[field.name, "fontFamily"]}
                                        >
                                          <Input placeholder="Enter font family" />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Font Size"
                                          name={[field.name, "fontSize"]}
                                        >
                                          <InputNumber min={1} placeholder="Enter font size" style={{ width: "100%" }} />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Font Weight"
                                          name={[field.name, "fontWeight"]}
                                        >
                                          <Input placeholder="Enter font weight (e.g., bold, 400)" />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Font Style"
                                          name={[field.name, "fontStyle"]}
                                        >
                                          <Input placeholder="Enter font style (e.g., normal, italic)" />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Card>
                                ))}

                                {fields.length < 1 && (
                                  <Button type="dashed" onClick={() => add()} block>
                                    + Add Item
                                  </Button>
                                )}
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label="Image Props">
                          <Form.List name={[field.name, "image"]}>
                            {(fields, { add, remove }) => (
                              <div>
                                {fields.map((field) => (
                                  <Card
                                    size="small"
                                    key={field.key}
                                    type="inner"
                                  >
                                    <CloseOutlined
                                      onClick={() => remove(field.name)}
                                      style={{ float: "right", cursor: "pointer" }}
                                    />
                                    <Row gutter={16}>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Image URI"
                                          name={[field.name, "uri"]}
                                          rules={[{ required: true, message: "Please input image URI" }]}
                                          extra="Image source. It can be url or path."
                                        >
                                          <Input placeholder="Enter image URI" />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Offset X"
                                          name={[field.name, "offsetX"]}
                                          initialValue={0}
                                          extra="Image offset in its X axis"
                                        >
                                          <InputNumber placeholder="Enter X offset" style={{ width: "100%" }} />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Offset Y"
                                          name={[field.name, "offsetY"]}
                                          initialValue={0}
                                          extra="Image offset in its Y axis"
                                        >
                                          <InputNumber placeholder="Enter Y offset" style={{ width: "100%" }} />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Size Multiplier"
                                          name={[field.name, "sizeMultiplier"]}
                                          initialValue={1}
                                          extra="Image height is calculated as 200px * sizeMultiplier"
                                        >
                                          <InputNumber
                                            min={0}
                                            step={0.1}
                                            placeholder="Enter size multiplier"
                                            style={{ width: "100%" }}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          label="Landscape"
                                          name={[field.name, "landscape"]}
                                          valuePropName="checked"
                                          initialValue={false}
                                          extra="Rotate image 90 degrees for landscape orientation"
                                        >
                                          <Switch />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Card>
                                ))}

                                {fields.length < 1 && (
                                  <Button type="dashed" onClick={() => add()} block>
                                    + Add Item
                                  </Button>
                                )}
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                {fields.length < 1 && (
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                  </Button>
                )}
              </div>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
    );
}

export default ThemeForm;
