import { useState, useEffect } from "@wordpress/element";
import { Card, Col, Row, Statistic, Table, Button, DatePicker, Progress, Typography } from "antd";
import ThemeModal from './ThemeModal';
import { TrophyOutlined, UserOutlined, GiftOutlined, PlusOutlined, LineChartOutlined, ClockCircleOutlined } from "@ant-design/icons";
import apiFetch from '@wordpress/api-fetch';

const { Title } = Typography;

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSpins: 0,
    totalUsers: 0,
    totalCoupons: 0,
    conversionRate: 0,
    averageSpinsPerUser: 0,
    todaySpins: 0
  });

  const [recentSpins, setRecentSpins] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [themePropertiesLoading, setThemePropertiesLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchThemeProperties();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiFetch({ path: '/spin-wheel/v1/dashboard-stats' });
      setStats({
        totalSpins: response.totalSpins || 0,
        totalUsers: response.totalUsers || 0,
        totalCoupons: response.totalCoupons || 0,
        conversionRate: response.conversionRate || 0,
        averageSpinsPerUser: response.averageSpinsPerUser || 0,
        todaySpins: response.todaySpins || 0
      });

      const spinsResponse = await apiFetch({ path: '/spin-wheel/v1/recent-spins' });
      setRecentSpins(spinsResponse);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchThemeProperties = async () => {
    setThemePropertiesLoading(true);
    try {
      const response = await apiFetch({ path: '/spin-wheel/v1/theme-properties' });
      const formattedData = response.map((item, index) => ({
        key: String(index + 1),
        property: item.name,
        description: item.description,
        type: item.type,
        defaultValue: item.default_value || '-'
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching theme properties:', error);
    } finally {
      setThemePropertiesLoading(false);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: true,
    },
    {
      title: "Prize Won",
      dataIndex: "prize",
      key: "prize",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === 'Used' ? '#52c41a' : '#1890ff' }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => console.log('View details:', record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAddTheme = () => {
    setIsModalOpen(true);
  };

  const handleSaveTheme = (values) => {
    console.log('Theme values:', values);
    // TODO: Implement theme creation logic
    setIsModalOpen(false);
  };

  return (
    // add 20px padding to the right
    <div style={{ paddingRight: '20px' }}>
      <Title level={3}>Dashboard Overview</Title>
      
      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Spins"
              value={stats.totalSpins}
              prefix={<TrophyOutlined />}
              suffix={<span style={{ fontSize: '14px', color: '#8c8c8c' }}>
                {` (${stats.todaySpins} today)`}
              </span>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Users"
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

      <Row gutter={24} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={stats.conversionRate}
              prefix={<LineChartOutlined />}
              suffix="%"
            />
            <Progress percent={stats.conversionRate} showInfo={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Avg. Spins per User"
              value={stats.averageSpinsPerUser}
              precision={1}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <DatePicker.RangePicker 
              style={{ width: '100%' }} 
              onChange={(dates) => {
                if (dates) {
                  // TODO: Implement date range filtering
                  console.log('Date range:', dates);
                }
              }}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Title level={4}>Recent Activity</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTheme}>Add New Theme</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={recentSpins}
        loading={loading}
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`
        }}
      />

      {/* Theme Properties Section */}
      <div style={{ marginTop: 24 }}>
        <Title level={4}>Theme Properties</Title>
        <Table
          dataSource={tableData}
          columns={[
            {
              title: 'Property',
              dataIndex: 'property',
              key: 'property',
              width: '20%'
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
              width: '40%'
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
              width: '20%'
            },
            {
              title: 'Default Value',
              dataIndex: 'defaultValue',
              key: 'defaultValue',
              width: '20%'
            }
          ]}
          pagination={false}
          size="small"
          bordered
          loading={themePropertiesLoading}
        />
      </div>

      <ThemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTheme}
      />
    </div>
  );
};

export default Dashboard;
