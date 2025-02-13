import { useState, useEffect } from '@wordpress/element';
import { Form, Input, Card, Button, Row, Col, ColorPicker, Typography, message, Select } from 'antd';
import apiFetch from '@wordpress/api-fetch';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const WheelThemes = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            const response = await apiFetch({ path: '/spin-wheel/v1/wheel-themes' });
            setThemes(response);
        } catch (error) {
            console.error('Error fetching themes:', error);
            message.error('Failed to load wheel themes');
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await apiFetch({
                path: '/spin-wheel/v1/wheel-themes',
                method: 'POST',
                data: {
                    ...values,
                    id: selectedTheme
                }
            });
            message.success('Theme saved successfully');
            fetchThemes();
            if (!selectedTheme) {
                form.resetFields();
            }
        } catch (error) {
            console.error('Error saving theme:', error);
            message.error('Failed to save theme');
        } finally {
            setLoading(false);
        }
    };

    const handleThemeSelect = (themeId) => {
        setSelectedTheme(themeId);
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            form.setFieldsValue(theme);
        }
    };

    const handleNewTheme = () => {
        setSelectedTheme(null);
        form.resetFields();
    };

    return (
        <div>
            <Title level={3}>Wheel Themes</Title>
            <Row gutter={24}>
                <Col span={6}>
                    <Card title="Theme List">
                        <Button 
                            type="dashed" 
                            icon={<PlusOutlined />} 
                            onClick={handleNewTheme}
                            style={{ marginBottom: 16 }}
                            block
                        >
                            New Theme
                        </Button>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select a theme"
                            value={selectedTheme}
                            onChange={handleThemeSelect}
                        >
                            {themes.map(theme => (
                                <Option key={theme.id} value={theme.id}>{theme.name}</Option>
                            ))}
                        </Select>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card title={selectedTheme ? 'Edit Theme' : 'Create New Theme'}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                name: '',
                                backgroundColor: '#ffffff',
                                borderColor: '#000000',
                                textColor: '#000000',
                                spinButtonColor: '#1890ff',
                                spinButtonTextColor: '#ffffff',
                                modalBackgroundColor: '#ffffff',
                                modalTextColor: '#000000',
                                fontSize: 16,
                                spinDuration: 0.8,
                                outerBorderWidth: 2,
                                radiusLineWidth: 1,
                                textDistance: 60,
                                wheelSize: 300
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Theme Name"
                                        rules={[{ required: true, message: 'Please enter theme name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item name="backgroundColor" label="Background Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="borderColor" label="Border Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="textColor" label="Text Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item name="spinButtonColor" label="Spin Button Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="spinButtonTextColor" label="Button Text Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item name="modalBackgroundColor" label="Modal Background">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="modalTextColor" label="Modal Text Color">
                                        <ColorPicker />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item
                                        name="fontSize"
                                        label="Font Size"
                                        rules={[{ required: true }]}
                                    >
                                        <Input type="number" min={12} max={32} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="spinDuration"
                                        label="Spin Duration (seconds)"
                                        rules={[{ required: true }]}
                                    >
                                        <Input type="number" min={0.5} max={5} step={0.1} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item
                                        name="wheelSize"
                                        label="Wheel Size (px)"
                                        rules={[{ required: true }]}
                                    >
                                        <Input type="number" min={200} max={800} step={10} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    {selectedTheme ? 'Update Theme' : 'Create Theme'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default WheelThemes;