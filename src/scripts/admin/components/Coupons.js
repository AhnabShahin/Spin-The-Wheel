import { useState, useEffect } from '@wordpress/element';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // TODO: Fetch coupons from WordPress REST API
        setCoupons([
            {
                id: 1,
                name: 'SPIN20',
                discount: 20,
                probability: 30,
                description: '20% off on all products'
            }
        ]);
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Discount (%)',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Probability (%)',
            dataIndex: 'probability',
            key: 'probability'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            )
        }
    ];

    const handleEdit = (record) => {
        setEditingId(record.id);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            // TODO: Implement delete API call
            setCoupons(coupons.filter(coupon => coupon.id !== id));
            message.success('Coupon deleted successfully');
        } catch (error) {
            message.error('Failed to delete coupon');
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (editingId) {
                // TODO: Implement update API call
                setCoupons(coupons.map(coupon =>
                    coupon.id === editingId ? { ...coupon, ...values } : coupon
                ));
            } else {
                // TODO: Implement create API call
                const newCoupon = {
                    id: Date.now(),
                    ...values
                };
                setCoupons([...coupons, newCoupon]);
            }
            message.success(`Coupon ${editingId ? 'updated' : 'created'} successfully`);
            setIsModalVisible(false);
            form.resetFields();
            setEditingId(null);
        } catch (error) {
            message.error('Failed to save coupon');
        }
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ marginBottom: 16 }}
            >
                Add New Coupon
            </Button>

            <Table columns={columns} dataSource={coupons} rowKey="id" />

            <Modal
                title={`${editingId ? 'Edit' : 'Add'} Coupon`}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setEditingId(null);
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Coupon Name"
                        rules={[{ required: true, message: 'Please input coupon name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        label="Discount Percentage"
                        rules={[{ required: true, message: 'Please input discount percentage!' }]}
                    >
                        <InputNumber min={0} max={100} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="probability"
                        label="Probability"
                        rules={[{ required: true, message: 'Please input probability!' }]}
                    >
                        <InputNumber min={0} max={100} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Coupons;