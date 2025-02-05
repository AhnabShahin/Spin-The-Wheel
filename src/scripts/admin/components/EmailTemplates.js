import { useState, useEffect } from '@wordpress/element';
import { Card, Form, Input, Button, Select, message, Typography, Tabs } from 'antd';
import { MailOutlined, SaveOutlined } from '@ant-design/icons';
import apiFetch from '@wordpress/api-fetch';

const { Title } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

const EmailTemplates = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('registration');

    useEffect(() => {
        fetchEmailTemplates();
    }, []);

    const fetchEmailTemplates = async () => {
        setLoading(true);
        try {
            const response = await apiFetch({ path: '/spin-wheel/v1/email-templates' });
            form.setFieldsValue(response);
        } catch (error) {
            console.error('Error fetching email templates:', error);
            message.error('Failed to load email templates');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await apiFetch({
                path: '/spin-wheel/v1/email-templates',
                method: 'POST',
                data: values
            });
            message.success('Email templates saved successfully');
        } catch (error) {
            console.error('Error saving email templates:', error);
            message.error('Failed to save email templates');
        } finally {
            setLoading(false);
        }
    };

    const availableTags = [
        { label: 'User Name', value: '{user_name}' },
        { label: 'Email', value: '{email}' },
        { label: 'Prize', value: '{prize}' },
        { label: 'Coupon Code', value: '{coupon_code}' },
        { label: 'Expiry Date', value: '{expiry_date}' },
        { label: 'Site Name', value: '{site_name}' }
    ];

    return (
        <div>
            <Title level={3}>Email Templates</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    registration: {
                        subject: 'Welcome to {site_name}',
                        body: 'Hi {user_name},\n\nThank you for registering! You can now spin the wheel to win exciting prizes.\n\nBest regards,\n{site_name}'
                    },
                    prize_won: {
                        subject: 'Congratulations! You\'ve Won a Prize',
                        body: 'Hi {user_name},\n\nCongratulations! You\'ve won {prize}!\n\nYour coupon code is: {coupon_code}\nValid until: {expiry_date}\n\nBest regards,\n{site_name}'
                    },
                    coupon_expiry: {
                        subject: 'Your Coupon is About to Expire',
                        body: 'Hi {user_name},\n\nYour coupon {coupon_code} for {prize} will expire on {expiry_date}.\nDon\'t forget to use it before it expires!\n\nBest regards,\n{site_name}'
                    }
                }}
            >
                <Card>
                    <Tabs activeKey={activeTab} onChange={setActiveTab}>
                        <TabPane
                            tab={
                                <span>
                                    <MailOutlined /> Registration
                                </span>
                            }
                            key="registration"
                        >
                            <Form.Item
                                name={['registration', 'subject']}
                                label="Subject"
                                rules={[{ required: true, message: 'Please enter email subject' }]}
                            >
                                <Input placeholder="Email subject" />
                            </Form.Item>
                            <Form.Item
                                name={['registration', 'body']}
                                label="Body"
                                rules={[{ required: true, message: 'Please enter email body' }]}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="Email body"
                                />
                            </Form.Item>
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <MailOutlined /> Prize Won
                                </span>
                            }
                            key="prize_won"
                        >
                            <Form.Item
                                name={['prize_won', 'subject']}
                                label="Subject"
                                rules={[{ required: true, message: 'Please enter email subject' }]}
                            >
                                <Input placeholder="Email subject" />
                            </Form.Item>
                            <Form.Item
                                name={['prize_won', 'body']}
                                label="Body"
                                rules={[{ required: true, message: 'Please enter email body' }]}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="Email body"
                                />
                            </Form.Item>
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <MailOutlined /> Coupon Expiry
                                </span>
                            }
                            key="coupon_expiry"
                        >
                            <Form.Item
                                name={['coupon_expiry', 'subject']}
                                label="Subject"
                                rules={[{ required: true, message: 'Please enter email subject' }]}
                            >
                                <Input placeholder="Email subject" />
                            </Form.Item>
                            <Form.Item
                                name={['coupon_expiry', 'body']}
                                label="Body"
                                rules={[{ required: true, message: 'Please enter email body' }]}
                            >
                                <TextArea
                                    rows={6}
                                    placeholder="Email body"
                                />
                            </Form.Item>
                        </TabPane>
                    </Tabs>

                    <div style={{ marginTop: 16 }}>
                        <Title level={5}>Available Tags</Title>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Click to see available tags"
                            options={availableTags}
                            open={false}
                        />
                    </div>

                    <Form.Item style={{ marginTop: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                        >
                            Save Templates
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
};

export default EmailTemplates;