import {
  Form,
  Input,
  Switch,
  Button,
  InputNumber,
  ColorPicker,
  Card,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AntdConfigProvider } from "../config/antd.config";

// Form layout is controlled by AntdConfigProvider

const onFinish = (values) => {
  console.log("Received values of form: ", values);
};

const ThemeForm = () => (
  <AntdConfigProvider>
  <Form
    name="spin_wheel_theme"
    onFinish={onFinish}
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
      items: [],
    }}
    style={{
      maxWidth: 600
    }}
  >
    <Form.Item
      name="theme_name"
      label="Theme Name"
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
      <InputNumber min={0} placeholder="Enter prize number" />
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
      <InputNumber min={0} placeholder="Enter outer border width" />
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
      <InputNumber min={0} max={100} placeholder="Enter inner radius" />
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
      <InputNumber min={0} placeholder="Enter inner border width" />
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
      <InputNumber min={0} placeholder="Enter radius line width" />
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
      <InputNumber min={1} defaultValue={20} placeholder="Enter font size" />
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

    <Form.Item label="Wheel Data">
      <Form.List name="data">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: "flex",
              rowGap: 16,
              flexDirection: "column",
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Option" name={[field.name, 'option']}>
                  <Input />
                </Form.Item>
                <Form.Item label="Option Size" name={[field.name, 'optionSize']}>
                  <InputNumber />
                </Form.Item>
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
  </AntdConfigProvider>
);

export default ThemeForm;
