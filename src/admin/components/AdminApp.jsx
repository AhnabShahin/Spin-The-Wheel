import { useState, useEffect } from '@wordpress/element';
import { Card, Typography, Space, Button, Layout, Menu } from 'antd';
import { 
    DashboardOutlined, 
    BgColorsOutlined, 
    SettingOutlined, 
    BarChartOutlined,
    DatabaseOutlined 
} from '@ant-design/icons';
import ThemeManager from './ThemeManager';
import WheelDataManager from './WheelDataManager';
import SettingsManager from './SettingsManager';

const { Title, Paragraph } = Typography;
const { Sider, Content } = Layout;

const AdminApp = () => {
    // Get initial tab from localStorage or default to 'dashboard'
    const getInitialTab = () => {
        try {
            return localStorage.getItem('spinTheWheelAdminTab') || 'dashboard';
        } catch (error) {
            return 'dashboard';
        }
    };

    const [currentTab, setCurrentTab] = useState(getInitialTab);

    // Persist tab changes to localStorage
    const handleTabChange = (newTab) => {
        setCurrentTab(newTab);
        try {
            localStorage.setItem('spinTheWheelAdminTab', newTab);
        } catch (error) {
            console.warn('Could not save tab state to localStorage:', error);
        }
    };

    // Listen for storage changes (if multiple tabs are open)
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'spinTheWheelAdminTab' && e.newValue) {
                setCurrentTab(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'themes',
            icon: <BgColorsOutlined />,
            label: 'Theme Manager',
        },
        {
            key: 'wheels',
            icon: <DatabaseOutlined />,
            label: 'Wheel Data',
        },
        {
            key: 'analytics',
            icon: <BarChartOutlined />,
            label: 'Analytics',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
        },
    ];

    const renderContent = () => {
        switch (currentTab) {
            case 'themes':
                return <ThemeManager />;
            case 'wheels':
                return <WheelDataManager />;
            case 'settings':
                return <SettingsManager />;
            case 'analytics':
                return (
                    <Card>
                        <Title level={3}>Analytics Dashboard</Title>
                        <Paragraph>
                            Analytics dashboard will show spin statistics, popular prizes, user engagement metrics, and more.
                        </Paragraph>
                        <div style={{ padding: 40, background: '#f5f5f5', borderRadius: 8, textAlign: 'center' }}>
                            📊 Analytics charts and data visualization will be implemented here
                        </div>
                    </Card>
                );
            default:
                return (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Card>
                            <Title level={2}>🎯 Spin The Wheel - Admin Dashboard</Title>
                            <Paragraph>
                                Welcome to the Spin The Wheel plugin administration panel. 
                                Create and manage wheel themes, configure wheel data, view analytics, and adjust settings.
                            </Paragraph>
                        </Card>

                        <Card>
                            <Title level={3}>Quick Actions</Title>
                            <Space wrap size="large">
                                <Button type="primary" size="large" onClick={() => handleTabChange('themes')}>
                                    🎨 Manage Themes
                                </Button>
                                <Button size="large" onClick={() => handleTabChange('wheels')}>
                                    🎪 Create Wheel Data
                                </Button>
                                <Button size="large" onClick={() => handleTabChange('analytics')}>
                                    📊 View Analytics
                                </Button>
                                <Button size="large" onClick={() => handleTabChange('settings')}>
                                    ⚙️ Settings
                                </Button>
                            </Space>
                        </Card>

                        <Card>
                            <Title level={3}>Plugin Status</Title>
                            <Space direction="vertical">
                                <div>✅ Plugin successfully reorganized and optimized</div>
                                <div>✅ Modern React architecture implemented</div>
                                <div>✅ PHP classes restructured with PSR-4 autoloading</div>
                                <div>✅ Caching and performance optimizations enabled</div>
                                <div>✅ Error boundaries and logging configured</div>
                                <div>✅ Theme management system ready</div>
                                <div>✅ Wheel data management available</div>
                            </Space>
                        </Card>

                        <Card>
                            <Title level={3}>Getting Started</Title>
                            <Paragraph>
                                <strong>1. Create a Theme:</strong> Go to Theme Manager to create custom wheel themes with colors, fonts, and styling.
                            </Paragraph>
                            <Paragraph>
                                <strong>2. Set Up Wheel Data:</strong> Use Wheel Data manager to define wheel segments and prizes.
                            </Paragraph>
                            <Paragraph>
                                <strong>3. Configure Settings:</strong> Adjust plugin behavior, limits, and preferences.
                            </Paragraph>
                            <Paragraph>
                                <strong>4. Monitor Analytics:</strong> Track user engagement and spin results.
                            </Paragraph>
                        </Card>
                    </Space>
                );
        }
    };

    return (
        <Layout style={{ minHeight: '70vh', background: 'transparent' }}>
            <Sider 
                width={250} 
                style={{ 
                    background: '#fff',
                    borderRight: '1px solid #f0f0f0',
                    borderRadius: '8px 0 0 8px'
                }}
            >
                <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
                        🎯 Spin The Wheel
                    </Title>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[currentTab]}
                    items={menuItems}
                    onClick={({ key }) => handleTabChange(key)}
                    style={{ borderRight: 0 }}
                />
            </Sider>
            <Layout>
                <Content 
                    style={{ 
                        padding: '24px',
                        background: '#fff',
                        borderRadius: '0 8px 8px 0'
                    }}
                >
                    {renderContent()}
                </Content>
            </Layout>
            
            {/* Custom styles to fix active menu item appearance */}
            <style jsx global>{`
                .ant-menu-item-selected {
                    background-color: #5148ea !important;
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected .ant-menu-title-content {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected .anticon {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected::after {
                    border-right-color: #5148ea !important;
                }
                
                .ant-menu-item-selected:hover {
                    background-color: #6f5ef7 !important;
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected:hover .ant-menu-title-content {
                    color: #ffffff !important;
                }
                
                .ant-menu-item-selected:hover .anticon {
                    color: #ffffff !important;
                }
            `}</style>
        </Layout>
    );
};

export default AdminApp;
