import { useState, useEffect } from "@wordpress/element";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Typography,
  Tag,
  Upload,
  ColorPicker,
  Select,
  Switch,
  Row,
  Col,
  Collapse,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;

const WheelDataManager = () => {
  const [wheelData, setWheelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);
  
  // Get initial pagination state from localStorage
  const getInitialPagination = () => {
    try {
      const saved = localStorage.getItem('wheelDataManagerPagination');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          current: parsed.current || 1,
          pageSize: parsed.pageSize || 10,
          total: 0,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        };
      }
    } catch (error) {
      console.warn('Could not restore pagination state:', error);
    }
    
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    };
  };
  
  const [pagination, setPagination] = useState(getInitialPagination);
  const [form] = Form.useForm();

  // Save pagination state to localStorage
  const savePaginationState = (paginationState) => {
    try {
      localStorage.setItem('wheelDataManagerPagination', JSON.stringify({
        current: paginationState.current,
        pageSize: paginationState.pageSize,
      }));
    } catch (error) {
      console.warn('Could not save pagination state:', error);
    }
  };

  // Helper function to convert color picker object to hex string
  const getColorValue = (color) => {
    if (typeof color === 'string') {
      return color;
    }
    
    if (color && color.metaColor && color.metaColor.r !== undefined) {
      const { r, g, b } = color.metaColor;
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    
    return '#ff8f43'; // Default color
  };

  useEffect(() => {
    const initialPagination = getInitialPagination();
    loadWheelData(initialPagination.current, initialPagination.pageSize);
  }, []);

  const loadWheelData = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/wheel/data?page=${page}&per_page=${pageSize}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setWheelData(responseData.data);
        
        // Update pagination state with API response data
        setPagination(prev => {
          const newPaginationState = {
            ...prev,
            current: responseData.current_page,
            total: responseData.total,
            pageSize: responseData.per_page,
          };
          
          // Save to localStorage
          savePaginationState(newPaginationState);
          
          return newPaginationState;
        });
      } else {
        throw new Error("Failed to fetch wheel data");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to load wheel data. Please try again.");
      setWheelData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (paginationInfo) => {
    const { current, pageSize } = paginationInfo;
    
    // Save pagination state
    savePaginationState({ current, pageSize });
    
    loadWheelData(current, pageSize);
  };

  const handleCreateData = () => {
    setEditingData(null);
    form.resetFields();
    form.setFieldsValue({
      name: "",
      data: [
        {
          option: "Prize 1",
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
        },
      ],
    });
    setModalVisible(true);
  };

  const handleEditData = (data) => {
    setEditingData(data);
    
    // Convert color objects to hex strings for form fields
    const formData = {
      ...data,
      data: data.data?.map(item => ({
        ...item,
        style: {
          ...item.style,
          backgroundColor: getColorValue(item.style?.backgroundColor),
          textColor: item.style?.textColor || "#ffffff"
        }
      })) || []
    };
    
    form.setFieldsValue(formData);
    setModalVisible(true);
  };

  const handleDeleteData = async (dataId) => {
    try {
      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/wheel/data/${dataId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("Wheel data deleted successfully");
        // Reload the current page data
        loadWheelData(pagination.current, pagination.pageSize);
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Failed to delete wheel data. Please try again.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const url = editingData
        ? `${window.stwAdminData.rest_url}/stw/v1/wheel/data/${editingData.id}`
        : `${window.stwAdminData.rest_url}/stw/v1/wheel/data`;

      const method = "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();

        if (editingData) {
          message.success("Wheel data updated successfully");
        } else {
          message.success("Wheel data created successfully");
        }
        
        // Reload the current page data
        loadWheelData(pagination.current, pagination.pageSize);
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      message.error(`Failed to ${editingData ? 'update' : 'create'} wheel data. Please try again.`);
    }
    setModalVisible(false);
  };

  const columns = [
    {
      title: "Wheel Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Prizes",
      dataIndex: "data",
      key: "data",
      width: "40%",
      render: (data) => (
        <Space wrap size="small">
          {Array.isArray(data) && data.slice(0, 3).map((item, index) => (
            <Tag
              key={index}
              color={getColorValue(item.style?.backgroundColor)}
              style={{
                color: item.style?.textColor || "#fff",
                margin: "2px",
              }}
            >
              {item.option}
            </Tag>
          ))}
          {Array.isArray(data) && data.length > 3 && <Tag color="default">+{data.length - 3}</Tag>}
        </Space>
      ),
    },
    {
      title: "Total Prizes",
      dataIndex: "data",
      key: "count",
      width: "15%",
      render: (data) => Array.isArray(data) ? data.length : 0,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "5%",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditData(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this wheel?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteData(record.id)}
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
            Wheel Data Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateData}
          >
            Create New Wheel
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={wheelData}
          loading={loading}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>

      <Modal
        title={editingData ? "Edit Wheel Data" : "Create New Wheel"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width={800}
        okText={editingData ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Wheel Name"
            rules={[{ required: true, message: "Please enter a wheel name" }]}
          >
            <Input placeholder="Enter wheel name" />
          </Form.Item>

          <Divider>Prize Configuration</Divider>

          <Form.List name="data">
            {(fields, { add, remove }) => (
              <div
                style={{
                  background: "#fafafa",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      background: "#ffffff",
                      padding: "20px",
                      marginBottom: "16px",
                      borderRadius: "8px",
                      border: "1px solid #d9d9d9",
                    }}
                  >
                    <Row gutter={16} align="middle">
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "option"]}
                          label="Prize Name"
                          rules={[{ required: true, message: "Required!" }]}
                          style={{ marginBottom: 16 }}
                        >
                          <Input placeholder="Prize name" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          {...restField}
                          name={[name, "optionSize"]}
                          label="Size"
                          style={{ marginBottom: 16 }}
                        >
                          <Select
                            placeholder="Size"
                            style={{ width: "100%" }}
                            getPopupContainer={(trigger) =>
                              trigger.parentElement
                            }
                          >
                            <Select.Option value={1}>One Slice</Select.Option>
                            <Select.Option value={2}>Two Slices</Select.Option>
                            <Select.Option value={3}>
                              Three Slices
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          {...restField}
                          name={[name, "style", "backgroundColor"]}
                          label="Background Color"
                          style={{ marginBottom: 16 }}
                        >
                          <ColorPicker
                            showText
                            format="hex"
                            style={{ width: "100%" }}
                            getPopupContainer={(trigger) =>
                              trigger.parentElement
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(name)}
                          icon={<DeleteOutlined />}
                        />
                      </Col>
                    </Row>

                    <Collapse ghost>
                      <Panel header="Advanced Settings" key="1">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "image", "uri"]}
                              label="Image URL"
                              style={{ marginBottom: 16 }}
                            >
                              <Input placeholder="Image URL" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              {...restField}
                              name={[name, "image", "offsetX"]}
                              label="X Offset"
                              style={{ marginBottom: 16 }}
                            >
                              <InputNumber
                                placeholder="X"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              {...restField}
                              name={[name, "image", "offsetY"]}
                              label="Y Offset"
                              style={{ marginBottom: 16 }}
                            >
                              <InputNumber
                                placeholder="Y"
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "style", "textColor"]}
                              label="Text Color"
                              style={{ marginBottom: 16 }}
                            >
                              <ColorPicker
                                showText
                                format="hex"
                                style={{ width: "100%" }}
                                getPopupContainer={(trigger) =>
                                  trigger.parentElement
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "style", "fontFamily"]}
                              label="Font"
                              style={{ marginBottom: 16 }}
                            >
                              <Select
                                placeholder="Font"
                                style={{ width: "100%" }}
                                getPopupContainer={(trigger) =>
                                  trigger.parentElement
                                }
                              >
                                <Select.Option value="Arial">
                                  Arial
                                </Select.Option>
                                <Select.Option value="Helvetica">
                                  Helvetica
                                </Select.Option>
                                <Select.Option value="Georgia">
                                  Georgia
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              {...restField}
                              name={[name, "style", "fontSize"]}
                              label="Font Size"
                              style={{ marginBottom: 16 }}
                            >
                              <InputNumber
                                min={8}
                                max={48}
                                style={{ width: "100%" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </div>
                ))}
                <Form.Item style={{ marginTop: 20 }}>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        option: "New Prize",
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
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Prize
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default WheelDataManager;
