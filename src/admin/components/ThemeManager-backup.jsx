import { useState, useEffect } from '@wordpress/element';
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
    Collapse
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useApi } from '../../shared/providers/ApiProvider';

const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const ThemeManager = () => {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTheme, setEditingTheme] = useState(null);
    const [form] = Form.useForm();
    const api = useApi();

    useEffect(() => {
        loadThemes();
    }, []);

    const loadThemes = async () => {
        setLoading(true);
        try {
            // For now, create sample data since API might not be fully implemented
            const sampleThemes = [
                {
                    id: 1,
                    name: 'Classic Theme',
                    description: 'A classic wheel theme with vibrant colors',
                    mustStartSpinning: false,
                    prizeNumber: 0,
                    startingOptionIndex: 0,
                    spinDuration: 4000,
                    disableInitialAnimation: false,
                    backgroundColors: ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
                    textColors: ['#ffffff', '#000000'],
                    outerBorderColor: '#eeeeee',
                    outerBorderWidth: 10,
                    innerRadius: 30,
                    innerBorderColor: '#30261a',
                    innerBorderWidth: 70,
                    radiusLineColor: '#eeeeee',
                    radiusLineWidth: 8,
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontWeight: 700,
                    fontStyle: 'normal',
                    perpendicularText: false,
                    pointerImageSource: ''
                },
                {
                    id: 2,
                    name: 'Modern Theme',
                    description: 'A sleek modern design with clean lines',
                    mustStartSpinning: true,
                    prizeNumber: 1,
                    startingOptionIndex: 0,
                    spinDuration: 3000,
                    disableInitialAnimation: true,
                    backgroundColors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
                    textColors: ['#ffffff', '#000000'],
                    outerBorderColor: '#333333',
                    outerBorderWidth: 5,
                    innerRadius: 20,
                    innerBorderColor: '#555555',
                    innerBorderWidth: 40,
                    radiusLineColor: '#666666',
                    radiusLineWidth: 2,
                    fontFamily: 'Helvetica',
                    fontSize: 14,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    perpendicularText: true,
                    pointerImageSource: ''
                }
            ];
            setThemes(sampleThemes);
        } catch (error) {
            console.error('Theme loading error:', error);
            message.error('Failed to load themes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTheme = () => {
        setEditingTheme(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEditTheme = (theme) => {
        setEditingTheme(theme);
        form.setFieldsValue(theme);
        setModalVisible(true);
    };

    const handleDeleteTheme = async (themeId) => {
        try {
            // API call would go here
            setThemes(themes.filter(theme => theme.id !== themeId));
            message.success('Theme deleted successfully');
        } catch (error) {
            console.error('Delete error:', error);
            message.error('Failed to delete theme');
        }
    };

    const handleDuplicateTheme = async (theme) => {
        try {
            const newTheme = {
                ...theme,
                id: Date.now(),
                name: `${theme.name} (Copy)`
            };
            setThemes([...themes, newTheme]);
            message.success('Theme duplicated successfully');
        } catch (error) {
            console.error('Duplicate error:', error);
            message.error('Failed to duplicate theme');
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingTheme) {
                // Update existing theme
                setThemes(themes.map(theme => 
                    theme.id === editingTheme.id 
                        ? { ...theme, ...values } 
                        : theme
                ));
                message.success('Theme updated successfully');
            } else {
                // Create new theme
                const newTheme = {
                    ...values,
                    id: Date.now()
                };
                setThemes([...themes, newTheme]);
                message.success('Theme created successfully');
            }
            setModalVisible(false);
        } catch (error) {
            console.error('Submit error:', error);
            message.error('Failed to save theme');
        }
    };

    const columns = [
        {
            title: 'Theme Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },
        {
            title: 'Colors',
            dataIndex: 'backgroundColors',
            key: 'colors',
            width: '25%',
            render: (colors) => (
                <Space wrap size="small">
                    {colors?.slice(0, 4).map((color, index) => (
                        <Tag
                            key={index}
                            style={{
                                backgroundColor: color,
                                color: '#fff',
                                border: 'none',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}
                        />
                    ))}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '20%',
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
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
                title={editingTheme ? 'Edit Theme' : 'Create New Theme'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => form.submit()}
                width={800}
                okText={editingTheme ? 'Update' : 'Create'}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    {/* Basic Information */}
                    <Form.Item
                        name="name"
                        label="Theme Name"
                        rules={[{ required: true, message: 'Please enter a theme name' }]}
                    >
                        <Input placeholder="Enter theme name" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input placeholder="Enter theme description" />
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
                                        rules={[{ required: true, message: 'Please enter prize number' }]}
                                        style={{ marginBottom: 16 }}
                                    >
                                        <InputNumber min={0} placeholder="Prize index" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="startingOptionIndex"
                                        label="Starting Option Index"
                                        style={{ marginBottom: 16 }}
                                    >
                                        <InputNumber min={0} placeholder="Starting index" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="spinDuration"
                                        label="Spin Duration (ms)"
                                        style={{ marginBottom: 16 }}
                                    >
                                        <InputNumber min={1000} max={10000} placeholder="Duration" style={{ width: "100%" }} />
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
                                        <Col span={12}>
                                            <Form.Item
                                                name="backgroundColors"
                                                label="Background Colors"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <Space wrap>
                                                    <ColorPicker showText format="hex" />
                                                    <ColorPicker showText format="hex" />
                                                    <ColorPicker showText format="hex" />
                                                    <ColorPicker showText format="hex" />
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="textColors"
                                                label="Text Colors"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <Space wrap>
                                                    <ColorPicker showText format="hex" />
                                                    <ColorPicker showText format="hex" />
                                                </Space>
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
                                                <ColorPicker showText format="hex" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                name="outerBorderWidth"
                                                label="Outer Border Width"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <InputNumber min={0} max={20} placeholder="Width in pixels" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                name="innerRadius"
                                                label="Inner Radius"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <InputNumber min={0} placeholder="Radius in pixels" style={{ width: "100%" }} />
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
                                                <ColorPicker showText format="hex" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                name="innerBorderWidth"
                                                label="Inner Border Width"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <InputNumber min={0} max={20} placeholder="Width in pixels" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                name="radiusLineWidth"
                                                label="Radius Line Width"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <InputNumber min={0} max={20} placeholder="Width in pixels" style={{ width: "100%" }} />
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
                                                <ColorPicker showText format="hex" style={{ width: "100%" }} />
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
                                                <Select placeholder="Select font family" style={{ width: "100%" }}>
                                                    <Select.Option value="Arial">Arial</Select.Option>
                                                    <Select.Option value="Helvetica">Helvetica</Select.Option>
                                                    <Select.Option value="Times New Roman">Times New Roman</Select.Option>
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
                                                <InputNumber min={8} max={48} placeholder="Size in pixels" style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                name="fontWeight"
                                                label="Font Weight"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <Select placeholder="Select font weight" style={{ width: "100%" }}>
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
                                            <Form.Item
                                                name="fontStyle"
                                                label="Font Style"
                                                style={{ marginBottom: 16 }}
                                            >
                                                <Select placeholder="Select font style" style={{ width: "100%" }}>
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
                                                <Input placeholder="Enter pointer image URL" style={{ width: "100%" }} />
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
