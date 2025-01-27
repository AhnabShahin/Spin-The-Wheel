import { useState, useEffect } from "@wordpress/element";
import { Card, Col, Row, Statistic, Table, Button } from "antd";
import { TrophyOutlined, UserOutlined, GiftOutlined, PlusOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSpins: 0,
    totalUsers: 0,
    totalCoupons: 0,
  });

  const [recentSpins, setRecentSpins] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    // TODO: Fetch actual data from WordPress REST API
    // Simulated data for now
    setStats({
      totalSpins: 150,
      totalUsers: 120,
      totalCoupons: 45,
    });

    setRecentSpins([
      {
        key: "1",
        user: "john.doe@example.com",
        coupon: "SPIN20",
        date: "2024-01-20",
        status: "Used",
      },
    ]);
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "user",
      key: "user",
      sorter: true,
    },
    {
      title: "Discription",
      dataIndex: "coupon",
      key: "coupon",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="text" style={{ color: "#666" }}>
          ...
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

  return (
    <div>
      <Row gutter={16} style={{ margin: 0 }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '24px' }}>
        <h2 style={{ margin: 0 }}>Recent Spin Themes</h2>
        <Button type="primary" icon={<PlusOutlined />}>Add New</Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={recentSpins}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Dashboard;
