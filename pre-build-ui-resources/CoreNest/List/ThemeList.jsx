import React, { useState, useEffect } from "react";
import { ColorPicker, Table } from "antd";
import { createStyles } from "antd-style";
import FormDrawer from "../Form/FormDrawer";
import { App } from "antd"; // Import App for notification

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

const ThemeList = ({ open, setOpen }) => {
  const { styles } = useStyle();
  const [record, setRecord] = useState({});
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Theme Name",
      width: 100,
      dataIndex: "theme_name",
      key: "theme_name",
      fixed: "left",
    },
    {
      title: "Must Start Spinning",
      dataIndex: "mustStartSpinning",
      render: (text) => (text ? "True" : "False"),
      key: "1",
      width: 100,
    },
    {
      title: "Prize Number",
      dataIndex: "prizeNumber",
      // response is number but covert it in to string with render
      render: (text) => text.toString(),
      key: "2",
      width: 100,
    },
    {
      title: "Background Colors",
      dataIndex: "backgroundColors",
      render: (text) => text?.join(", "),
      key: "3",
      width: 100,
    },
    {
      title: "Text Colors",
      render: (text) => text?.join(", "),
      dataIndex: "textColors",
      key: "4",
      width: 100,
    },
    {
      title: "Outer Border Color",
      dataIndex: "outerBorderColor",
      key: "5",
      width: 100,
    },
    {
      title: "Outer Border Width",
      dataIndex: "outerBorderWidth",
      key: "6",
      width: 100,
    },
    {
      title: "Inner Radius",
      dataIndex: "innerRadius",
      key: "7",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Inner Border Color",
      dataIndex: "innerBorderColor",
      key: "8",
      width: 100,
      render: (text) => <ColorPicker defaultValue={text} showText disabled />,
    },
    {
      title: "Inner Border Width",
      dataIndex: "innerBorderWidth",
      key: "9",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Radius Line Color",
      dataIndex: "radiusLineColor",
      key: "10",
      width: 100,
    },
    {
      title: "Radius Line Width",
      dataIndex: "radiusLineWidth",
      key: "11",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Font Family",
      dataIndex: "fontFamily",
      key: "12",
      width: 100,
      render: (text) => text,
    },
    {
      title: "Font Size",
      dataIndex: "fontSize",
      key: "13",
      render: (text) => text.toString(),
      width: 100,
    },
    {
      title: "Font Weight",
      dataIndex: "fontWeight",
      key: "14",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Font Style",
      dataIndex: "fontStyle",
      key: "15",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Perpendicular Text",
      dataIndex: "perpendicularText",
      key: "16",
      render: (text) => (text ? "True" : "False"),
      width: 100,
    },
    {
      title: "Text Distance",
      dataIndex: "textDistance",
      key: "17",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Spin Duration",
      dataIndex: "spinDuration",
      key: "18",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Starting Option Index",
      dataIndex: "startingOptionIndex",
      key: "19",
      width: 100,
      render: (text) => text.toString(),
    },
    {
      title: "Pointer Props",
      dataIndex: "pointerProps",
      key: "20",
      width: 100,
      render: (text) => JSON.stringify(text),
    },
    {
      title: "Disable Initial Animation",
      dataIndex: "disableInitialAnimation",
      key: "21",
      render: (text) => (text ? "True" : "False"),
      width: 100,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <a
          onClick={() => {
            setRecord(record);
            setOpen(true);
          }}
        >
          EDIT
        </a>
      ),
    },
  ];
  
  useEffect(() => {
    const getThemeList = async (values) => {
      setLoading(true);
      try {
        const response = await fetch(
          window.SpinTheWheelData.rest_url +
            "stw/v1/template/roulette-theme-list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-WP-Nonce": window.SpinTheWheelData.rest_nonce,
            },
          }
        );

        const data = await response.json();
        // Check for validation errors
        if (data.message && data.message.error) {
          data.message.error.forEach((err) => {
            notification.error({
              message: "Validation Error",
              description: err,
              duration: 0,
            });
          });
          return; 
        }

        // Show success messages
        if (data.message && data.message.success) {
          data.message.success.forEach((msg) => {
            setDataSource(data.data || []);
            notification.success({
              // <--- CORRECT USAGE
              message: "Success",
              description: msg,
              duration: 0, // Keep duration: 0 if you want them to stay forever
              // zIndexPopup is automatically applied via ConfigProvider
            });
          });
        }
      } catch (error) {
        notification.error({
          message: "Submission Failed",
          description: error.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };
    getThemeList();
  }, []);

console.log("Data Source"); // Debugging: Check the data source
  return (
    <div>
      <Table
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: "max-content",
          y: 55 * 5,
        }}
      />
      <FormDrawer
        open={open}
        setOpen={setOpen}
        record={record}
        setRecord={setRecord}
      />
    </div>
  );
};

export default ThemeList;
