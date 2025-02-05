import { Table, Space, Button, Tag, Input, DatePicker, message } from 'antd';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = () => {
        setLoading(true);
        apiFetch({ path: '/spin-wheel/v1/coupons' })
            .then(response => {
                setCoupons(response);
            })
            .catch(error => {
                console.error('Error fetching coupons:', error);
                message.error('Failed to load coupons');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        apiFetch({
            path: `/spin-wheel/v1/coupons/${id}`,
            method: 'DELETE'
        })
            .then(() => {
                message.success('Coupon deleted successfully');
                fetchCoupons();
            })
            .catch(error => {
                console.error('Error deleting coupon:', error);
                message.error('Failed to delete coupon');
            });
    };

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            filterable: true,
            render: (text) => <strong>{text}</strong>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => (
                <Tag color={type === 'discount' ? 'blue' : 'green'}>
                    {type.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (value, record) => (
                <span>{record.type === 'discount' ? `${value}%` : value}</span>
            )
        },
        {
            title: 'User Email',
            dataIndex: 'email',
            key: 'email',
            filterable: true
        },
        {
            title: 'Created Date',
            dataIndex: 'created_date',
            key: 'created_date',
            sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date)
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiry_date',
            key: 'expiry_date',
            render: (date) => (
                <span style={{ color: new Date(date) < new Date() ? 'red' : 'inherit' }}>
                    {date}
                </span>
            )
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
                        icon={<EditOutlined />}
                        onClick={() => console.log('Edit coupon:', record.id)}
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

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search coupons"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 200, marginRight: 16 }}
                />
                <DatePicker.RangePicker style={{ marginRight: 16 }} />
            </div>
            <Table
                columns={columns}
                dataSource={coupons}
                loading={loading}
                rowKey="id"
                pagination={{
                    total: coupons.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
            />
        </div>
    );
};

export default CouponManagement;