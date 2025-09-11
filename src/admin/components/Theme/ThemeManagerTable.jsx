import { EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import { Table, Space, Button, Tag, Popconfirm } from "antd";
import PropTypes from "prop-types";
import React from "react";

const ThemeManagerTable = ({
  themes,
  loading,
  getColorValue,
  wheelData,
  handleEditTheme,
  handleDuplicateTheme,
  handleDeleteTheme,
}) => {
  const columns = [
    {
      title: "Theme Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Colors",
      dataIndex: "backgroundColors",
      key: "colors",
      width: "20%",
      render: (colors) => (
        <Space wrap size="small">
          {colors?.slice(0, 4).map((color, idx) => (
            <Tag
              key={color + idx}
              style={{
                backgroundColor: getColorValue(color),
                color: "#fff",
                border: "none",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
          ))}
          {colors?.length > 4 && (
            <Tag color="default">+{colors.length - 4}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Wheel Data",
      dataIndex: "wheelDataId",
      key: "wheelDataId",
      width: "15%",
      render: (wheelDataId) => {
        const wheel = wheelData.find((w) => String(w.id) === String(wheelDataId));
        return wheel ? wheel.name : "Not selected";
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: "10%",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEditTheme(record)}
          >
            Edit
          </Button>
          <Button
            size="small"
            icon={<CopyOutlined />}
            onClick={() => handleDuplicateTheme(record)}
          >
            Duplicate
          </Button>
          <Popconfirm
            title="Delete this theme?"
            description="This action cannot be undone."
            onConfirm={() => handleDeleteTheme(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={themes}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};

ThemeManagerTable.propTypes = {
  themes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getColorValue: PropTypes.func.isRequired,
  wheelData: PropTypes.array.isRequired,
  handleEditTheme: PropTypes.func.isRequired,
  handleDuplicateTheme: PropTypes.func.isRequired,
  handleDeleteTheme: PropTypes.func.isRequired,
};

export default ThemeManagerTable;
