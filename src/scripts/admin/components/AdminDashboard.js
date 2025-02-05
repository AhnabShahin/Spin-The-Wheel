import { useState } from '@wordpress/element';
import { Layout, Menu, Typography, theme } from 'antd';
import {
    DashboardOutlined,
    SettingOutlined,
    GiftOutlined,
    UserOutlined,
    MailOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'wheel-settings',
            icon: <SettingOutlined />,
            label: 'Wheel Settings',
        },
        {
            key: 'coupons',
            icon: <GiftOutlined />,
            label: 'Coupons',
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'User Management',
        },
        {
            key: 'email-templates',
            icon: <MailOutlined />,
            label: 'Email Templates',
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['dashboard']}
                    mode="inline"
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: token.colorBgContainer }} />
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: token.colorBgContainer }}>
                        <Title level={2}>Spin Wheel Dashboard</Title>
                        {/* Content components will be rendered here based on selected menu item */}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;