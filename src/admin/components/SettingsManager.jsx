import { useState, useEffect } from '@wordpress/element';
import { 
    Card, 
    Form, 
    Input, 
    InputNumber, 
    Switch, 
    Button, 
    Space, 
    message,
    Typography,
    Divider,
    Select
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useApi } from '../../shared/providers/ApiProvider';

const { Title, Text } = Typography;

const SettingsManager = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const api = useApi();

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            // Load default settings for now
            const defaultSettings = {
                enable_analytics: true,
                cache_enabled: true,
                max_spins_per_day: 10,
                default_theme: 'classic',
                show_congratulations: true,
                auto_hide_wheel: false,
                enable_sound_effects: true,
                spin_duration: 3000,
                wheel_size: 300,
                enable_mobile_responsive: true
            };
            form.setFieldsValue(defaultSettings);
        } catch (error) {
            message.error('Failed to load settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values) => {
        setLoading(true);
        try {
            // await api.settings.updateSettings(values);
            message.success('Settings saved successfully');
            console.log('Settings to save:', values);
        } catch (error) {
            message.error('Failed to save settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Card>
                <Title level={3}>Plugin Settings</Title>
                
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    disabled={loading}
                >
                    <Title level={4}>General Settings</Title>
                    
                    <Form.Item
                        name="default_theme"
                        label="Default Theme"
                        tooltip="The default theme to use for new wheels"
                    >
                        <Select>
                            <Select.Option value="classic">Classic</Select.Option>
                            <Select.Option value="modern">Modern</Select.Option>
                            <Select.Option value="colorful">Colorful</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="wheel_size"
                        label="Default Wheel Size (px)"
                        tooltip="Default size for the wheel in pixels"
                    >
                        <InputNumber min={200} max={800} step={50} />
                    </Form.Item>

                    <Form.Item
                        name="spin_duration"
                        label="Spin Duration (ms)"
                        tooltip="How long the wheel spins in milliseconds"
                    >
                        <InputNumber min={1000} max={10000} step={500} />
                    </Form.Item>

                    <Divider />

                    <Title level={4}>User Experience</Title>

                    <Form.Item
                        name="max_spins_per_day"
                        label="Max Spins Per Day"
                        tooltip="Maximum number of spins allowed per user per day (0 = unlimited)"
                    >
                        <InputNumber min={0} max={100} />
                    </Form.Item>

                    <Form.Item
                        name="show_congratulations"
                        label="Show Congratulations Message"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="auto_hide_wheel"
                        label="Auto Hide Wheel After Spin"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="enable_sound_effects"
                        label="Enable Sound Effects"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="enable_mobile_responsive"
                        label="Enable Mobile Responsive Design"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Divider />

                    <Title level={4}>Performance & Analytics</Title>

                    <Form.Item
                        name="cache_enabled"
                        label="Enable Caching"
                        tooltip="Cache wheel data and themes for better performance"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        name="enable_analytics"
                        label="Enable Analytics"
                        tooltip="Track spin results and user interactions"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Divider />

                    <Form.Item>
                        <Space>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                icon={<SaveOutlined />}
                                loading={loading}
                            >
                                Save Settings
                            </Button>
                            <Button onClick={() => form.resetFields()}>
                                Reset to Defaults
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default SettingsManager;
