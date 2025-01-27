import { useState, useEffect } from '@wordpress/element';
import { Form, Input, InputNumber, Switch, Button, Card, message, ColorPicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Settings = () => {
    const [form] = Form.useForm(); 

    useEffect(() => {
        // TODO: Fetch settings from WordPress REST API
        form.setFieldsValue({
            wheelTitle: 'Spin & Win!',
            wheelDescription: 'Try your luck and win amazing discounts!',
            buttonText: 'Spin Now',
            displayTiming: 5,
            enablePopup: true,
            primaryColor: '#1890ff',
            secondaryColor: '#f5222d',
            backgroundColor: '#ffffff'
        });
    }, []);

    const handleSubmit = async (values) => {
        try {
            // TODO: Implement settings update API call
            console.log('Settings to save:', values);
            message.success('Settings saved successfully');
        } catch (error) {
            message.error('Failed to save settings');
        }
    };

    return (
        <Card title="Wheel Settings">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="wheelTitle"
                    label="Wheel Title"
                    rules={[{ required: true, message: 'Please input wheel title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="wheelDescription"
                    label="Wheel Description"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="buttonText"
                    label="Spin Button Text"
                    rules={[{ required: true, message: 'Please input button text!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="displayTiming"
                    label="Display Delay (seconds)"
                    tooltip="Time to wait before showing the wheel to visitors"
                >
                    <InputNumber min={0} max={60} />
                </Form.Item>

                <Form.Item
                    name="enablePopup"
                    label="Enable Popup"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    name="primaryColor"
                    label="Primary Color"
                >
                    <ColorPicker />
                </Form.Item>

                <Form.Item
                    name="secondaryColor"
                    label="Secondary Color"
                >
                    <ColorPicker />
                </Form.Item>

                <Form.Item
                    name="backgroundColor"
                    label="Background Color"
                >
                    <ColorPicker />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SaveOutlined />}
                    >
                        Save Settings
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Settings;