import { Form, Input, InputNumber, Switch, Card, Button, Row, Col, Select, Typography, message } from 'antd';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const WheelSettings = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch current wheel settings
        apiFetch({ path: '/spin-wheel/v1/wheel-settings' })
            .then(settings => {
                form.setFieldsValue(settings);
            })
            .catch(error => {
                console.error('Error fetching wheel settings:', error);
                message.error('Failed to load wheel settings');
            });
    }, []);

    const onFinish = (values) => {
        setLoading(true);
        apiFetch({
            path: '/spin-wheel/v1/wheel-settings',
            method: 'POST',
            data: values
        })
            .then(() => {
                message.success('Settings saved successfully');
            })
            .catch(error => {
                console.error('Error saving settings:', error);
                message.error('Failed to save settings');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <Title level={3}>Wheel Settings</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    segments: [
                        { label: '10% Off', probability: 30, type: 'discount', value: 10 },
                        { label: '20% Off', probability: 20, type: 'discount', value: 20 },
                        { label: 'Free Shipping', probability: 15, type: 'shipping', value: 0 },
                        { label: 'Try Again', probability: 35, type: 'none', value: 0 }
                    ],
                    spinLimit: 3,
                    spinInterval: 24,
                    requireLogin: false,
                    enableSounds: true
                }}
            >
                <Card title="General Settings" style={{ marginBottom: 24 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="spinLimit"
                                label="Daily Spin Limit"
                                rules={[{ required: true, message: 'Please set spin limit' }]}
                            >
                                <InputNumber min={1} max={10} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="spinInterval"
                                label="Hours Between Spins"
                                rules={[{ required: true, message: 'Please set spin interval' }]}
                            >
                                <InputNumber min={1} max={72} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="requireLogin"
                                valuePropName="checked"
                                label="Require User Login"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="enableSounds"
                                valuePropName="checked"
                                label="Enable Sound Effects"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                <Card title="Wheel Segments" style={{ marginBottom: 24 }}>
                    <Form.List name="segments">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row gutter={16} key={key} style={{ marginBottom: 16 }}>
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'label']}
                                                rules={[{ required: true, message: 'Missing label' }]}
                                            >
                                                <Input placeholder="Segment Label" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'type']}
                                                rules={[{ required: true, message: 'Missing type' }]}
                                            >
                                                <Select placeholder="Prize Type">
                                                    <Option value="discount">Discount</Option>
                                                    <Option value="shipping">Free Shipping</Option>
                                                    <Option value="none">No Prize</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'value']}
                                                rules={[{ required: true, message: 'Missing value' }]}
                                            >
                                                <InputNumber
                                                    placeholder="Value"
                                                    style={{ width: '100%' }}
                                                    min={0}
                                                    max={100}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'probability']}
                                                rules={[{ required: true, message: 'Missing probability' }]}
                                            >
                                                <InputNumber
                                                    placeholder="Probability %"
                                                    style={{ width: '100%' }}
                                                    min={0}
                                                    max={100}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Segment
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save Settings
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default WheelSettings;