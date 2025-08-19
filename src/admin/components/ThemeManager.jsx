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
    Tag
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useApi } from '../../shared/providers/ApiProvider';

const { Title } = Typography;
const { TextArea } = Input;

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
                    data: [],
                    backgroundColors: ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
                    textColors: ['#ffffff'],
                    outerBorderColor: '#000000',
                    outerBorderWidth: 5,
                    innerRadius: 0,
                    innerBorderColor: '#000000',
                    innerBorderWidth: 0,
                    radiusLineColor: '#000000',
                    radiusLineWidth: 5,
                    fontFamily: 'Arial',
                    fontSize: 20,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    perpendicularText: false,
                    textDistance: 60,
                    spinDuration: 4000,
                    startingOptionIndex: 0,
                    pointerProps: {
                        src: '',
                        style: {}
                    },
                    disableInitialAnimation: false,
                    created_at: new Date().toISOString()
                }
            ];
            setThemes(sampleThemes);
        } catch (error) {
            message.error('Failed to load themes: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTheme = () => {
        setEditingTheme(null);
        form.resetFields();
        form.setFieldsValue({
            name: '',
            description: '',
            mustStartSpinning: false,
            prizeNumber: 0,
            data: [],
            backgroundColors: ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
            textColors: ['#ffffff'],
            outerBorderColor: '#000000',
            outerBorderWidth: 5,
            innerRadius: 0,
            innerBorderColor: '#000000',
            innerBorderWidth: 0,
            radiusLineColor: '#000000',
            radiusLineWidth: 5,
            fontFamily: 'Helvetica, Arial',
            fontSize: 20,
            fontWeight: 400,
            fontStyle: 'normal',
            perpendicularText: false,
            textDistance: 60,
            spinDuration: 4000,
            startingOptionIndex: 0,
            pointerProps: {
                src: '',
                style: {}
            },
            disableInitialAnimation: false
        });
        setModalVisible(true);
    };

    const handleEditTheme = (theme) => {
        setEditingTheme(theme);
        form.setFieldsValue(theme);
        setModalVisible(true);
    };

    const handleDeleteTheme = async (themeId) => {
        try {
            // await api.themes.deleteTheme(themeId);
            setThemes(prev => prev.filter(theme => theme.id !== themeId));
            message.success('Theme deleted successfully');
        } catch (error) {
            message.error('Failed to delete theme: ' + error.message);
        }
    };

    const handleDuplicateTheme = async (theme) => {
        try {
            const newTheme = {
                ...theme,
                name: `${theme.name} (Copy)`,
                id: Date.now()
            };
            // await api.themes.createTheme(newTheme);
            setThemes(prev => [...prev, newTheme]);
            message.success('Theme duplicated successfully');
        } catch (error) {
            message.error('Failed to duplicate theme: ' + error.message);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingTheme) {
                // await api.themes.updateTheme(editingTheme.id, values);
                setThemes(prev => prev.map(theme => 
                    theme.id === editingTheme.id ? { ...theme, ...values } : theme
                ));
                message.success('Theme updated successfully');
            } else {
                // await api.themes.createTheme(values);
                const newTheme = {
                    ...values,
                    id: Date.now(),
                    created_at: new Date().toISOString()
                };
                setThemes(prev => [...prev, newTheme]);
                message.success('Theme created successfully');
            }
            setModalVisible(false);
        } catch (error) {
            message.error(`Failed to ${editingTheme ? 'update' : 'create'} theme: ` + error.message);
        }
    };

    const columns = [
        {
            title: 'Theme Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Background Colors',
            dataIndex: 'backgroundColors',
            key: 'colors',
            render: (colors) => (
                <Space>
                    {(colors || []).slice(0, 4).map((color, index) => (
                        <div
                            key={index}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: color,
                                border: '1px solid #ccc',
                                borderRadius: 2
                            }}
                        />
                    ))}
                    {colors && colors.length > 4 && <span>+{colors.length - 4}</span>}
                </Space>
            ),
        },
        {
            title: 'Font',
            key: 'font',
            render: (_, record) => (
                <Space direction="vertical" size="small">
                    <Tag>{record.fontFamily || 'Arial'}</Tag>
                    <Tag>{record.fontSize || 20}px</Tag>
                </Space>
            ),
        },
        {
            title: 'Spin Duration',
            dataIndex: 'spinDuration',
            key: 'spinDuration',
            render: (duration) => duration ? `${duration}ms` : '4000ms',
        },
        {
            title: 'Actions',
            key: 'actions',
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
                        <Button 
                            danger 
                            size="small" 
                            icon={<DeleteOutlined />}
                        >
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Title level={3} style={{ margin: 0 }}>Theme Management</Title>
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
                width={1000}
                okText={editingTheme ? 'Update' : 'Create'}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    {/* Basic Information */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Theme Name"
                                rules={[{ required: true, message: 'Please enter a theme name' }]}
                            >
                                <Input placeholder="Enter theme name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Input placeholder="Enter theme description" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Spin Configuration */}
                    <Divider>Spin Configuration</Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="mustStartSpinning"
                                label="Must Start Spinning"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="prizeNumber"
                                label="Prize Number"
                                rules={[{ required: true, message: 'Please enter prize number' }]}
                            >
                                <InputNumber min={0} placeholder="Prize index" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="startingOptionIndex"
                                label="Starting Option Index"
                            >
                                <InputNumber min={0} placeholder="Starting index" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="spinDuration"
                                label="Spin Duration (ms)"
                            >
                                <InputNumber min={1000} max={10000} placeholder="Duration in milliseconds" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="disableInitialAnimation"
                                label="Disable Initial Animation"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Colors */}
                    <Divider>Colors</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="backgroundColors"
                                label="Background Colors"
                                rules={[{ required: true, message: 'Please select background colors' }]}
                            >
                                <Space wrap>
                                    <ColorPicker showText />
                                    <ColorPicker showText />
                                    <ColorPicker showText />
                                    <ColorPicker showText />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="textColors"
                                label="Text Colors"
                            >
                                <Space wrap>
                                    <ColorPicker showText />
                                    <ColorPicker showText />
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Border Configuration */}
                    <Divider>Border Configuration</Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="outerBorderColor"
                                label="Outer Border Color"
                            >
                                <ColorPicker showText />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="outerBorderWidth"
                                label="Outer Border Width"
                            >
                                <InputNumber min={0} max={20} placeholder="Width in pixels" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="innerRadius"
                                label="Inner Radius"
                            >
                                <InputNumber min={0} placeholder="Radius in pixels" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="innerBorderColor"
                                label="Inner Border Color"
                            >
                                <ColorPicker showText />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="innerBorderWidth"
                                label="Inner Border Width"
                            >
                                <InputNumber min={0} max={20} placeholder="Width in pixels" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="radiusLineColor"
                                label="Radius Line Color"
                            >
                                <ColorPicker showText />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="radiusLineWidth"
                                label="Radius Line Width"
                            >
                                <InputNumber min={0} max={20} placeholder="Width in pixels" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Typography */}
                    <Divider>Typography</Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="fontFamily"
                                label="Font Family"
                            >
                                <Select placeholder="Select font family">
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
                            >
                                <InputNumber min={8} max={48} placeholder="Size in pixels" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="fontWeight"
                                label="Font Weight"
                            >
                                <Select placeholder="Select font weight">
                                    <Select.Option value={100}>Thin (100)</Select.Option>
                                    <Select.Option value={200}>Extra Light (200)</Select.Option>
                                    <Select.Option value={300}>Light (300)</Select.Option>
                                    <Select.Option value={400}>Normal (400)</Select.Option>
                                    <Select.Option value={500}>Medium (500)</Select.Option>
                                    <Select.Option value={600}>Semi Bold (600)</Select.Option>
                                    <Select.Option value={700}>Bold (700)</Select.Option>
                                    <Select.Option value={800}>Extra Bold (800)</Select.Option>
                                    <Select.Option value={900}>Black (900)</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="fontStyle"
                                label="Font Style"
                            >
                                <Select placeholder="Select font style">
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
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="textDistance"
                                label="Text Distance"
                            >
                                <InputNumber min={0} placeholder="Distance from center" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Pointer Configuration */}
                    <Divider>Pointer Configuration</Divider>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={['pointerProps', 'src']}
                                label="Pointer Image Source"
                            >
                                <Input placeholder="Enter pointer image URL" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ThemeManager;
