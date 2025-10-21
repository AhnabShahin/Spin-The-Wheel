import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Space, Typography, notification, Row, Col, Drawer } from 'antd';
import { useState, useEffect } from 'react';

import CustomRouletteManager from './CustomRouletteManager';

// Enhanced UI/UX with Drawer for full-screen editing

const { Title } = Typography;

const CustomRouletteList = () => {
  const [roulettes, setRoulettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRoulette, setSelectedRoulette] = useState(null);

  useEffect(() => {
    fetchRoulettes();
  }, []);

  const fetchRoulettes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/roulettes');
      const data = await response.json();
      setRoulettes(data);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedRoulette(null);
    setIsDrawerVisible(true);
  };

  const handleEdit = (roulette) => {
    setSelectedRoulette(roulette);
    setIsDrawerVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this roulette?',
      onOk: async () => {
        try {
          await fetch(`/api/roulettes/${id}`, { method: 'DELETE' });
          notification.success({
            message: 'Deleted',
            description: 'Roulette deleted successfully.',
          });
          fetchRoulettes();
        } catch {
          notification.error({
            message: 'Error',
            description: 'Failed to delete roulette.',
          });
        }
      },
    });
  };

  const handleSave = async (newRoulette) => {
    try {
      if (selectedRoulette) {
        // Update existing roulette
        await fetch(`/api/roulettes/${selectedRoulette.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRoulette),
        });
        notification.success({
          message: 'Updated',
          description: 'Roulette updated successfully.',
        });
      } else {
        // Add new roulette
        await fetch('/api/roulettes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRoulette),
        });
        notification.success({
          message: 'Created',
          description: 'Roulette created successfully.',
        });
      }
      fetchRoulettes();
      setIsDrawerVisible(false);
    } catch {
      notification.error({
        message: 'Error',
        description: 'Failed to save roulette.',
      });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>Custom Roulette List</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            Create New Roulette
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={roulettes}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
      <Drawer
        title={selectedRoulette ? 'Edit Roulette' : 'Create Roulette'}
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        width="100%"
        zIndex={99999} // Ensures the drawer is always on top
      >
        <CustomRouletteManager
        />
      </Drawer>
    </div>
  );
};

export default CustomRouletteList;