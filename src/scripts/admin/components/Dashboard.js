import { useState, useEffect } from '@wordpress/element';
import {   } from 'antd';
import { TrophyOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSpins: 0,
        totalUsers: 0,
        totalCoupons: 0
    });

    const [recentSpins, setRecentSpins] = useState([]);

    useEffect(() => {
        // TODO: Fetch actual data from WordPress REST API
        // Simulated data for now
        setStats({
            totalSpins: 150,
            totalUsers: 120,
            totalCoupons: 45
        });

        setRecentSpins([
            {
                key: '1',
                user: 'john.doe@example.com',
                coupon: 'SPIN20',
                date: '2024-01-20',
                status: 'Used'
            }
        ]);
    }, []);

    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user'
        },
        {
            title: 'Coupon',
            dataIndex: 'coupon',
            key: 'coupon'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        }
    ];

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Spins"
                            value={stats.totalSpins}
                            prefix={<TrophyOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={stats.totalUsers}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Coupons Claimed"
                            value={stats.totalCoupons}
                            prefix={<GiftOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginTop: 16 }}>
                <h2>Recent Spinsj</h2>
                <Table
                    columns={columns}
                    dataSource={recentSpins}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        </div>
    );
};

export default Dashboard;