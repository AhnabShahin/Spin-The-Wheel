import { Card, Row, Col, Statistic, Typography } from 'antd';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { PieChartOutlined, UserOutlined, GiftOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DashboardContent = () => {
    const [stats, setStats] = useState({
        totalSpins: 0,
        totalUsers: 0,
        totalCoupons: 0,
        redemptionRate: 0
    });

    useEffect(() => {
        // Fetch dashboard statistics from WordPress REST API
        apiFetch({ path: '/spin-wheel/v1/dashboard-stats' })
            .then(response => {
                setStats(response);
            })
            .catch(error => {
                console.error('Error fetching dashboard stats:', error);
            });
    }, []);

    return (
        <div>
            <Title level={3}>Overview</Title>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Spins"
                            value={stats.totalSpins}
                            prefix={<PieChartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={stats.totalUsers}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Coupons Generated"
                            value={stats.totalCoupons}
                            prefix={<GiftOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Redemption Rate"
                            value={stats.redemptionRate}
                            suffix="%"
                            prefix={<ClockCircleOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardContent;