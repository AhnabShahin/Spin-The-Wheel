import React, { useState } from 'react';
import { Table } from 'antd';
import { createStyles } from 'antd-style';
import FormDrawer from '../Form/FormDrawer';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const dataSource = Array.from({
  length: 100,
}).map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

const ThemeList = () => {
  const { styles } = useStyle();
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    {
      title: 'Column 8',
      dataIndex: 'address',
      key: '8',
    },
    {
      title: 'Column 9',
      dataIndex: 'address',
      key: '9',
    },
    {
      title: 'Column 10',
      dataIndex: 'address',
      key: '10',
    },
    {
      title: 'Column 11',
      dataIndex: 'address',
      key: '11',
    },
    {
      title: 'Column 12',
      dataIndex: 'address',
      key: '12',
    },
    {
      title: 'Column 13',
      dataIndex: 'address',
      key: '13',
    },
    {
      title: 'Column 14',
      dataIndex: 'address',
      key: '14',
    },
    {
      title: 'Column 15',
      dataIndex: 'address',
      key: '15',
    },
    {
      title: 'Column 16',
      dataIndex: 'address',
      key: '16',
    },
    {
      title: 'Column 17',
      dataIndex: 'address',
      key: '17',
    },
    {
      title: 'Column 18',
      dataIndex: 'address',
      key: '18',
    },
    {
      title: 'Column 19',
      dataIndex: 'address',
      key: '19',
    },
    {
      title: 'Column 20',
      dataIndex: 'address',
      key: '20',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <a onClick={() => {
          setSelectedRecord(record);
          setOpen(true);
        }}>action</a>
      ),
    },
  ];

  return (
    <div>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 'max-content',
          y: 55 * 5,
        }}
      />
      <FormDrawer 
        open={open} 
        onClose={() => {
          setOpen(false); 
          setSelectedRecord(null);
        }}
        record={selectedRecord}
      />
    </div>
  );
};

export default ThemeList;