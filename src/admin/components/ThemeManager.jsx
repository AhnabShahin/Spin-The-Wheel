import { useState, useEffect } from "@wordpress/element";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  ColorPicker,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Typography,
  Switch,
  Row,
  Col,
  Divider,
  Tag,
  Collapse,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useApi } from "../../shared/providers/ApiProvider";

const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const ThemeManager = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);
  const [wheelData, setWheelData] = useState([]);
  const [selectedWheelSlices, setSelectedWheelSlices] = useState(0);
  const [selectedWheelData, setSelectedWheelData] = useState(null);
  const [form] = Form.useForm();
  const api = useApi();

  useEffect(() => {
    loadThemes();
  }, []);

  useEffect(() => {
    // Update slice count when wheel data is loaded and we're editing
    if (editingTheme && wheelData.length > 0) {
      const selectedWheel = wheelData.find(wheel => wheel.id === editingTheme.wheelDataId);
      setSelectedWheelSlices(selectedWheel?.data?.length || 0);
      setSelectedWheelData(selectedWheel);
    }
  }, [wheelData, editingTheme]);

  const loadThemes = async () => {
    setLoading(true);
    try {
      // For now, create sample data since API might not be fully implemented
      const sampleThemes = [
        {
          id: 1,
          name: "Classic Theme",
          description: "A classic wheel theme with vibrant colors",
          mustStartSpinning: false,
          prizeNumber: 0,
          startingOptionIndex: 0,
          spinDuration: 4000,
          disableInitialAnimation: false,
          backgroundColors: ["#ff8f43", "#70bbe0", "#0b7ec8", "#ffd23f"],
          textColors: ["#ffffff", "#000000", "#ffffff", "#000000"],
          outerBorderColor: "#eeeeee",
          outerBorderWidth: 10,
          innerRadius: 30,
          innerBorderColor: "#30261a",
          innerBorderWidth: 70,
          radiusLineColor: "#eeeeee",
          radiusLineWidth: 8,
          fontFamily: "Arial",
          fontSize: 16,
          fontWeight: 700,
          fontStyle: "normal",
          perpendicularText: false,
          pointerImageSource: "",
        },
        {
          id: 2,
          name: "Modern Theme",
          description: "A sleek modern design with clean lines",
          mustStartSpinning: true,
          prizeNumber: 1,
          startingOptionIndex: 0,
          spinDuration: 3000,
          disableInitialAnimation: true,
          backgroundColors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
          textColors: ["#ffffff", "#ffffff", "#000000", "#ffffff"],
          outerBorderColor: "#333333",
          outerBorderWidth: 5,
          innerRadius: 20,
          innerBorderColor: "#555555",
          innerBorderWidth: 40,
          radiusLineColor: "#666666",
          radiusLineWidth: 2,
          fontFamily: "Helvetica",
          fontSize: 14,
          fontWeight: 400,
          fontStyle: "normal",
          perpendicularText: true,
          pointerImageSource: "",
        },
      ];
      setThemes(sampleThemes);
    } catch (error) {
      console.error("Theme loading error:", error);
      message.error("Failed to load themes");
    } finally {
      setLoading(false);
    }
  };

  const loadWheelData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/wheel/data?page=${page}&per_page=${pageSize}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setWheelData(responseData.data);
      } else {
        throw new Error("Failed to fetch wheel data");
      }
    } catch (error) {
      message.error("Failed to load wheel data. Please try again.");
      setWheelData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTheme = () => {
    setEditingTheme(null);
    form.resetFields();
    setSelectedWheelSlices(0);
    setSelectedWheelData(null);
    loadWheelData();
    setModalVisible(true);
  };

  const handleEditTheme = async (theme) => {
    setEditingTheme(theme);
    form.setFieldsValue(theme);
    
    // Load wheel data if not already loaded
    if (wheelData.length === 0) {
      await loadWheelData();
    }
    
    // Find the selected wheel data to set the slice count
    setTimeout(() => {
      const selectedWheel = wheelData.find(wheel => wheel.id === theme.wheelDataId);
      setSelectedWheelSlices(selectedWheel?.data?.length || 0);
      setSelectedWheelData(selectedWheel);
    }, 100);
    
    setModalVisible(true);
  };

  const handleWheelDataChange = (wheelId) => {
    const selectedWheel = wheelData.find(wheel => wheel.id === wheelId);
    const sliceCount = selectedWheel?.data?.length || 0;
    setSelectedWheelSlices(sliceCount);
    setSelectedWheelData(selectedWheel);
    
    // Reset background colors and text colors to match the number of slices
    const currentValues = form.getFieldsValue();
    const defaultBgColors = ["#ff8f43", "#70bbe0", "#0b7ec8", "#ffd23f", "#e74c3c", "#f39c12", "#9b59b6", "#2ecc71"];
    const defaultTextColors = ["#ffffff", "#000000", "#ffffff", "#000000", "#ffffff", "#000000", "#ffffff", "#000000"];
    
    const newBackgroundColors = Array.from({ length: sliceCount }, (_, index) => 
      currentValues.backgroundColors?.[index] || defaultBgColors[index % defaultBgColors.length]
    );
    
    const newTextColors = Array.from({ length: sliceCount }, (_, index) => 
      currentValues.textColors?.[index] || defaultTextColors[index % defaultTextColors.length]
    );
    
    form.setFieldsValue({
      ...currentValues,
      backgroundColors: newBackgroundColors,
      textColors: newTextColors
    });
  };

  const handleDeleteTheme = async (themeId) => {
    try {
      // API call would go here
      setThemes(themes.filter((theme) => theme.id !== themeId));
      message.success("Theme deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete theme");
    }
  };

  const handleDuplicateTheme = async (theme) => {
    try {
      const newTheme = {
        ...theme,
        id: Date.now(),
        name: `${theme.name} (Copy)`,
      };
      setThemes([...themes, newTheme]);
      message.success("Theme duplicated successfully");
    } catch (error) {
      console.error("Duplicate error:", error);
      message.error("Failed to duplicate theme");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingTheme) {
        // Update existing theme
        setThemes(
          themes.map((theme) =>
            theme.id === editingTheme.id ? { ...theme, ...values } : theme
          )
        );
        message.success("Theme updated successfully");
      } else {
        // Create new theme
        const newTheme = {
          ...values,
          id: Date.now(),
        };
        setThemes([...themes, newTheme]);
        message.success("Theme created successfully");
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Submit error:", error);
      message.error("Failed to save theme");
    }
  };

  const columns = [
    {
      title: "Theme Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Colors",
      dataIndex: "backgroundColors",
      key: "colors",
      width: "25%",
      render: (colors) => (
        <Space wrap size="small">
          {colors?.slice(0, 4).map((color, index) => (
            <Tag
              key={index}
              style={{
                backgroundColor: color,
                color: "#fff",
                border: "none",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditTheme(record)}
          >
            Edit
          </Button>
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={() => handleDuplicateTheme(record)}
          >
            Duplicate
          </Button>
          <Popconfirm
            title="Delete this theme?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteTheme(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Theme Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTheme}
          >
            Create New Theme
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={themes}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingTheme ? "Edit Theme" : "Create New Theme"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={800}
        okText={editingTheme ? "Update" : "Create"}
        zIndex={1000}
        getContainer={() => document.body}
      >
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
              placeholder="Select wheel data"
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              dropdownStyle={{ zIndex: 1050 }}
              onChange={handleWheelDataChange}
            >
              {wheelData?.map((wheel) => (
                <Select.Option key={wheel.id} value={wheel.id}>
                  {wheel.name} - have slices: {wheel.data?.length || 0}
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
                          <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px' }}>
                            {Array.from({ length: selectedWheelSlices }, (_, index) => {
                              const sliceName = selectedWheelData?.data?.[index]?.option || `Slice ${index + 1}`;
                              return (
                                <Row key={`slice-${index}`} gutter={16} style={{ marginBottom: index < selectedWheelSlices - 1 ? 12 : 0 }}>
                                  <Col span={8}>
                                    <div style={{ 
                                      padding: '8px 12px', 
                                      background: '#f5f5f5', 
                                      borderRadius: '4px',
                                      fontWeight: 500,
                                      display: 'flex',
                                      alignItems: 'center',
                                      height: '32px'
                                    }}>
                                      {index + 1}. {sliceName}
                                    </div>
                                  </Col>
                                  <Col span={8}>
                                    <Form.Item
                                      name={['backgroundColors', index]}
                                      label="Background"
                                      style={{ marginBottom: 0 }}
                                    >
                                      <ColorPicker 
                                        showText 
                                        format="hex" 
                                        size="small"
                                        style={{ width: '100%' }}
                                        presets={[
                                          {
                                            label: 'Recommended',
                                            colors: [
                                              '#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f',
                                              '#e74c3c', '#f39c12', '#9b59b6', '#2ecc71'
                                            ],
                                          },
                                        ]}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                    <Form.Item
                                      name={['textColors', index]}
                                      label="Text"
                                      style={{ marginBottom: 0 }}
                                    >
                                      <ColorPicker 
                                        showText 
                                        format="hex" 
                                        size="small"
                                        style={{ width: '100%' }}
                                        presets={[
                                          {
                                            label: 'Common',
                                            colors: [
                                              '#ffffff', '#000000', '#333333', '#666666',
                                              '#999999', '#cccccc', '#ff0000', '#00ff00'
                                            ],
                                          },
                                        ]}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              );
                            })}
                          </div>
                        ) : (
                          <div style={{ 
                            padding: '24px', 
                            textAlign: 'center', 
                            color: '#999', 
                            fontStyle: 'italic',
                            border: '1px dashed #d9d9d9',
                            borderRadius: '6px'
                          }}>
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
                          <Select.Option value="Helvetica">
                            Helvetica
                          </Select.Option>
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
                          <Select.Option value={400}>
                            400 - Normal
                          </Select.Option>
                          <Select.Option value={500}>
                            500 - Medium
                          </Select.Option>
                          <Select.Option value={600}>
                            600 - Semi Bold
                          </Select.Option>
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
      </Modal>
    </div>
  );
};

export default ThemeManager;
