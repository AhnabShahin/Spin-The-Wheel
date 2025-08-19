import { useState, useEffect } from '@wordpress/element';
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
    Col
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useApi } from '../../shared/providers/ApiProvider';

const { Title } = Typography;

const WheelDataManager = () => {
    const [wheelData, setWheelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [form] = Form.useForm();
    const api = useApi();

    useEffect(() => {
        loadWheelData();
    }, []);

    const loadWheelData = async () => {
        setLoading(true);
        try {
            // For now, we'll create some sample data since the API might not be fully implemented
            const sampleData = [
                {
                    id: 1,
                    name: 'Default Wheel',
                    data: [
                        { 
                            option: 'Prize 1', 
                            image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                            style: { backgroundColor: '#ff8f43', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                            optionSize: 1
                        },
                        { 
                            option: 'Prize 2', 
                            image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                            style: { backgroundColor: '#70bbe0', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                            optionSize: 1
                        },
                        { 
                            option: 'Prize 3', 
                            image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                            style: { backgroundColor: '#0b7ec8', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                            optionSize: 1
                        },
                        { 
                            option: 'Try Again', 
                            image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                            style: { backgroundColor: '#ffd23f', textColor: '#000000', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                            optionSize: 2
                        }
                    ],
                    created_at: new Date().toISOString()
                }
            ];
            setWheelData(sampleData);
        } catch (error) {
            message.error('Failed to load wheel data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateData = () => {
        setEditingData(null);
        form.resetFields();
        form.setFieldsValue({
            data: [
                { 
                    option: 'Prize 1', 
                    image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                    style: { backgroundColor: '#ff8f43', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                    optionSize: 1
                },
                { 
                    option: 'Prize 2', 
                    image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                    style: { backgroundColor: '#70bbe0', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                    optionSize: 1
                },
                { 
                    option: 'Prize 3', 
                    image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                    style: { backgroundColor: '#0b7ec8', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                    optionSize: 1
                },
                { 
                    option: 'Try Again', 
                    image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                    style: { backgroundColor: '#ffd23f', textColor: '#000000', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                    optionSize: 2
                }
            ]
        });
        setModalVisible(true);
    };

    const handleEditData = (data) => {
        setEditingData(data);
        form.setFieldsValue(data);
        setModalVisible(true);
    };

    const handleDeleteData = async (dataId) => {
        try {
            // await api.data.deleteWheelData(dataId);
            setWheelData(prev => prev.filter(item => item.id !== dataId));
            message.success('Wheel data deleted successfully');
        } catch (error) {
            message.error('Failed to delete wheel data: ' + error.message);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingData) {
                // await api.data.updateWheelData(editingData.id, values);
                setWheelData(prev => prev.map(item => 
                    item.id === editingData.id ? { ...item, ...values } : item
                ));
                message.success('Wheel data updated successfully');
            } else {
                // await api.data.createWheelData(values);
                const newData = {
                    ...values,
                    id: Date.now(),
                    created_at: new Date().toISOString()
                };
                setWheelData(prev => [...prev, newData]);
                message.success('Wheel data created successfully');
            }
            setModalVisible(false);
        } catch (error) {
            message.error(`Failed to ${editingData ? 'update' : 'create'} wheel data: ` + error.message);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Prizes',
            dataIndex: 'data',
            key: 'data',
            render: (data) => (
                <Space wrap>
                    {data?.slice(0, 3).map((item, index) => (
                        <Tag key={index} color="blue">
                            {item.option}
                        </Tag>
                    ))}
                    {data?.length > 3 && (
                        <Tag color="default">+{data.length - 3} more</Tag>
                    )}
                </Space>
            )
        },
        {
            title: 'Total Segments',
            dataIndex: 'segments',
            key: 'count',
            render: (segments) => segments?.length || 0,
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
                        onClick={() => handleEditData(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this wheel data?"
                        description="This action cannot be undone."
                        onConfirm={() => handleDeleteData(record.id)}
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
                    <Title level={3} style={{ margin: 0 }}>Wheel Data Management</Title>
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
                    pagination={{ pageSize: 10 }}
                />
            </Card>

            <Modal
                title={editingData ? 'Edit Wheel Data' : 'Create New Wheel'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => form.submit()}
                width={900}
                okText={editingData ? 'Update' : 'Create'}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Wheel Name"
                        rules={[{ required: true, message: 'Please enter a wheel name' }]}
                    >
                        <Input placeholder="Enter wheel name" />
                    </Form.Item>

                    <Form.List name="data">
                        {(fields, { add, remove }) => (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Title level={5}>Wheel Segments</Title>
                                    <Button 
                                        type="dashed" 
                                        onClick={() => add({
                                            option: 'New Prize',
                                            image: { uri: '', offsetX: 0, offsetY: 0, sizeMultiplier: 1, landscape: false },
                                            style: { backgroundColor: '#ff8f43', textColor: '#ffffff', fontFamily: 'Arial', fontSize: 16, fontWeight: 400, fontStyle: 'normal' },
                                            optionSize: 1
                                        })}
                                        icon={<PlusOutlined />}
                                    >
                                        Add Prize
                                    </Button>
                                </div>
                                
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card key={key} size="small" style={{ marginBottom: 16 }}>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'option']}
                                                    label="Prize Name"
                                                    rules={[{ required: true, message: 'Please enter prize name!' }]}
                                                >
                                                    <Input placeholder="Enter prize name" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'optionSize']}
                                                    label="Segment Size"
                                                    rules={[{ required: true, message: 'Please enter segment size!' }]}
                                                >
                                                    <Select placeholder="Select size">
                                                        <Select.Option value={1}>Normal (1x)</Select.Option>
                                                        <Select.Option value={2}>Large (2x)</Select.Option>
                                                        <Select.Option value={0.5}>Small (0.5x)</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Button 
                                                    type="dashed" 
                                                    danger 
                                                    onClick={() => remove(name)}
                                                    icon={<DeleteOutlined />}
                                                    style={{ marginTop: 30 }}
                                                >
                                                    Remove
                                                </Button>
                                            </Col>
                                        </Row>
                                        
                                        {/* Image Configuration */}
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Typography.Title level={5}>Image Settings</Typography.Title>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'image', 'uri']}
                                                    label="Image URL"
                                                >
                                                    <Input placeholder="Enter image URL" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'image', 'offsetX']}
                                                    label="Offset X"
                                                    initialValue={0}
                                                >
                                                    <InputNumber placeholder="X Offset" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'image', 'offsetY']}
                                                    label="Offset Y"
                                                    initialValue={0}
                                                >
                                                    <InputNumber placeholder="Y Offset" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'image', 'sizeMultiplier']}
                                                    label="Size Multiplier"
                                                    initialValue={1}
                                                >
                                                    <InputNumber min={0.1} max={5} step={0.1} placeholder="Size" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'image', 'landscape']}
                                                    label="Landscape Mode"
                                                    valuePropName="checked"
                                                    initialValue={false}
                                                >
                                                    <Switch />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* Style Configuration */}
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Typography.Title level={5}>Style Settings</Typography.Title>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'backgroundColor']}
                                                    label="Background Color"
                                                    initialValue="#ff8f43"
                                                >
                                                    <ColorPicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'textColor']}
                                                    label="Text Color"
                                                    initialValue="#ffffff"
                                                >
                                                    <ColorPicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'fontFamily']}
                                                    label="Font Family"
                                                    initialValue="Arial"
                                                >
                                                    <Select placeholder="Select font">
                                                        <Select.Option value="Arial">Arial</Select.Option>
                                                        <Select.Option value="Helvetica">Helvetica</Select.Option>
                                                        <Select.Option value="Times New Roman">Times New Roman</Select.Option>
                                                        <Select.Option value="Georgia">Georgia</Select.Option>
                                                        <Select.Option value="Verdana">Verdana</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'fontSize']}
                                                    label="Font Size"
                                                    initialValue={16}
                                                >
                                                    <InputNumber min={8} max={48} placeholder="Size" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'fontWeight']}
                                                    label="Font Weight"
                                                    initialValue={400}
                                                >
                                                    <Select placeholder="Weight">
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
                                            <Col span={6}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'style', 'fontStyle']}
                                                    label="Font Style"
                                                    initialValue="normal"
                                                >
                                                    <Select placeholder="Style">
                                                        <Select.Option value="normal">Normal</Select.Option>
                                                        <Select.Option value="italic">Italic</Select.Option>
                                                        <Select.Option value="oblique">Oblique</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    );
};

export default WheelDataManager;
