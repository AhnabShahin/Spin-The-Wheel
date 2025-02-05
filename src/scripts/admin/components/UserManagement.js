import { Table, Space, Button, Tag, Input, DatePicker, message, Modal, Form, InputNumber } from 'antd';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SearchOutlined, ReloadOutlined, StopOutlined } from '@ant-design/icons';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        apiFetch({ path: '/spin-wheel/v1/users' })
            .then(response => {
                setUsers(response);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                message.error('Failed to load users');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleUpdateSpins = (values) => {
        apiFetch({
            path: `/spin-wheel/v1/users/${selectedUser.id}/spins`,
            method: 'POST',
            data: values
        })
            .then(() => {
                message.success('Spin limit updated successfully');
                setIsModalVisible(false);
                fetchUsers();
            })
            .catch(error => {
                console.error('Error updating spins:', error);
                message.error('Failed to update spin limit');
            });
    };

    const showUpdateModal = (user) => {
        setSelectedUser(user);
        form.setFieldsValue({
            spins_remaining: user.spins_remaining
        });
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Spins Remaining',
            dataIndex: 'spins_remaining',
            key: 'spins_remaining',
            render: (spins) => (
                <Tag color={spins > 0 ? 'green' : 'red'}>
                    {spins}
                </Tag>
            )
        },
        {
            title: 'Last Spin',
            dataIndex: 'last_spin',
            key: 'last_spin',
            sorter: (a, b) => new Date(a.last_spin) - new Date(b.last_spin),
            render: (date) => new Date(date).toLocaleString()
        },
        {
            title: 'Total Spins',
            dataIndex: 'total_spins',
            key: 'total_spins'
        },
        {
            title: 'Coupons Won',
            dataIndex: 'coupons_won',
            key: 'coupons_won'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => showUpdateModal(record)}
                        title="Update Spin Limit"
                    />
                    <Button
                        icon={<StopOutlined />}
                        danger
                        onClick={() => handleBlock(record.id)}
                        title="Block User"
                    />
                </Space>
            )
        }
    ];

    const handleBlock = (userId) => {
        Modal.confirm({
            title: 'Block User',
            content: 'Are you sure you want to block this user from spinning the wheel?',
            onOk() {
                apiFetch({
                    path: `/spin-wheel/v1/users/${userId}/block`,
                    method: 'POST'
                })
                    .then(() => {
                        message.success('User blocked successfully');
                        fetchUsers();
                    })
                    .catch(error => {
                        console.error('Error blocking user:', error);
                        message.error('Failed to block user');
                    });
            }
        });
    };

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search users"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 200, marginRight: 16 }}
                />
                <DatePicker.RangePicker style={{ marginRight: 16 }} />
            </div>

            <Table
                columns={columns}
                dataSource={users}
                loading={loading}
                rowKey="id"
                pagination={{
                    total: users.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
            />

            <Modal
                title="Update Spin Limit"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    onFinish={handleUpdateSpins}
                    layout="vertical"
                >
                    <Form.Item
                        name="spins_remaining"
                        label="Remaining Spins"
                        rules={[{ required: true, message: 'Please enter remaining spins' }]}
                    >
                        <InputNumber min={0} max={10} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;