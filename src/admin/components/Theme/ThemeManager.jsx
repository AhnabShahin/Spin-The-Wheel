import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "@wordpress/element";
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  ColorPicker,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Typography,
  Switch,
  Row,
  Col,
  Divider,
  Tag,
  Collapse,
  Splitter,
} from "antd";

import CustomRoulette from "../Roulette/CustomRoulette";

import ThemeManagerForm from "./ThemeManagerForm";
import ThemeManagerTable from "./ThemeManagerTable";

const { Title } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

const ThemeManager = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTheme, setEditingTheme] = useState(null);
  const [wheelData, setWheelData] = useState([]);
  const [wheelDataLoading, setWheelDataLoading] = useState(false);
  const [wheelDataPage, setWheelDataPage] = useState(1);
  const [wheelDataTotal, setWheelDataTotal] = useState(0);
  const [wheelDataSearch, setWheelDataSearch] = useState("");
  const [selectedWheelSlices, setSelectedWheelSlices] = useState(0);
  const [selectedWheelData, setSelectedWheelData] = useState(null);
  const [form] = Form.useForm();

  // Helper function to convert color picker object to hex string
  const getColorValue = (color) => {
    if (typeof color === "string") {
      return color;
    }

    if (color && color.metaColor && color.metaColor.r !== undefined) {
      const { r, g, b } = color.metaColor;
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }

    return color || "#ff8f43"; // Default color
  };

  useEffect(() => {
    loadThemes();
  }, []);

  // Track form values for the roulette preview
  const [formValues, setFormValues] = useState({});

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormValues(allValues);
  };

  useEffect(() => {
    // Update slice count when wheel data is loaded and we're editing
    if (editingTheme && wheelData.length > 0) {
      const selectedWheel = wheelData.find(
        (wheel) => wheel.id === editingTheme.wheelDataId
      );
      setSelectedWheelSlices(selectedWheel?.data?.length || 0);
      setSelectedWheelData(selectedWheel);
    }
  }, [wheelData, editingTheme]);

  const loadThemes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/template/roulette-theme`
      );
      if (response.ok) {
        const responseData = await response.json();
        setThemes(responseData.data || responseData);
      } else {
        throw new Error("Failed to fetch themes");
      }
    } catch (error) {
      console.error("Theme loading error:", error);
      message.error("Failed to load themes");
    } finally {
      setLoading(false);
    }
  };

  const loadWheelData = async (page = 1, pageSize = 10, search = "") => {
    setWheelDataLoading(true);
    try {
      let url = `${window.stwAdminData.rest_url}/stw/v1/wheel/data?page=${page}&per_page=${pageSize}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        if (page === 1) {
          setWheelData(responseData.data || []);
        } else {
          setWheelData((prev) => [...prev, ...(responseData.data || [])]);
        }
        setWheelDataTotal(responseData.total || 0);
        setWheelDataPage(page);
      } else {
        throw new Error("Failed to fetch wheel data");
      }
    } catch (error) {
      message.error("Failed to load wheel data. Please try again.");
      setWheelData([]);
      setWheelDataTotal(0);
    } finally {
      setWheelDataLoading(false);
    }
  };

  const handleCreateTheme = () => {
    setEditingTheme(null);
    form.resetFields();
    setFormValues({});
    setSelectedWheelSlices(0);
    setSelectedWheelData(null);
    loadWheelData();
    setModalVisible(true);
  };

  const handleEditTheme = async (theme) => {
    setEditingTheme(theme);
    // Always set wheelDataId as string
    const processedTheme = {
      ...theme,
      wheelDataId: theme.wheelDataId ? String(theme.wheelDataId) : undefined,
      backgroundColors:
        theme.backgroundColors?.map((color) => getColorValue(color)) || [],
      textColors: theme.textColors?.map((color) => getColorValue(color)) || [],
      outerBorderColor: getColorValue(theme.outerBorderColor),
      innerBorderColor: getColorValue(theme.innerBorderColor),
      radiusLineColor: getColorValue(theme.radiusLineColor),
    };
    form.setFieldsValue(processedTheme);
    setFormValues(processedTheme);
    if (wheelData.length === 0) {
      await loadWheelData();
    }
    setTimeout(() => {
      const selectedWheel = wheelData.find(
        (wheel) => String(wheel.id) === String(theme.wheelDataId)
      );
      setSelectedWheelSlices(selectedWheel?.data?.length || 0);
      setSelectedWheelData(selectedWheel);
    }, 100);
    setModalVisible(true);
  };

  const handleWheelDataChange = (wheelId) => {
    const selectedWheel = wheelData.find(
      (wheel) => String(wheel.id) === String(wheelId)
    );
    const sliceCount = selectedWheel?.data?.length || 0;
    setSelectedWheelSlices(sliceCount);
    setSelectedWheelData(selectedWheel);
    const currentValues = form.getFieldsValue();
    const defaultBgColors = [
      "#ff8f43",
      "#70bbe0",
      "#0b7ec8",
      "#ffd23f",
      "#e74c3c",
      "#f39c12",
      "#9b59b6",
      "#2ecc71",
    ];
    const defaultTextColors = [
      "#ffffff",
      "#000000",
      "#ffffff",
      "#000000",
      "#ffffff",
      "#000000",
      "#ffffff",
      "#000000",
    ];
    const newBackgroundColors = Array.from(
      { length: sliceCount },
      (_, index) =>
        currentValues.backgroundColors?.[index] ||
        defaultBgColors[index % defaultBgColors.length]
    );
    const newTextColors = Array.from(
      { length: sliceCount },
      (_, index) =>
        currentValues.textColors?.[index] ||
        defaultTextColors[index % defaultTextColors.length]
    );
    form.setFieldsValue({
      ...currentValues,
      backgroundColors: newBackgroundColors,
      textColors: newTextColors,
    });
  };

  const handleDeleteTheme = async (themeId) => {
    try {
      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/template/roulette-theme/${themeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        message.success("Theme deleted successfully");
        // Reload themes after deletion
        loadThemes();
      } else {
        const errorData = await response.json().catch(() => ({}));

        // Handle the nested error structure from your API
        if (
          errorData.message &&
          errorData.message.error &&
          Array.isArray(errorData.message.error)
        ) {
          // Display each validation error
          errorData.message.error.forEach((errorMsg) => {
            message.error(errorMsg);
          });
        } else {
          throw new Error(errorData.message || "Failed to delete theme");
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      if (!error.handled) {
        message.error("Failed to delete theme. Please try again.");
      }
    }
  };

  const handleDuplicateTheme = async (theme) => {
    try {
      const duplicatedTheme = {
        ...theme,
        name: `${theme.name} (Copy)`,
      };

      // Remove the id so it gets a new one from the API
      delete duplicatedTheme.id;

      const response = await fetch(
        `${window.stwAdminData.rest_url}/stw/v1/template/roulette-theme`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(duplicatedTheme),
        }
      );

      if (response.ok) {
        message.success("Theme duplicated successfully");
        // Reload themes after duplication
        loadThemes();
      } else {
        const errorData = await response.json().catch(() => ({}));

        // Handle the nested error structure from your API
        if (
          errorData.message &&
          errorData.message.error &&
          Array.isArray(errorData.message.error)
        ) {
          // Display each validation error
          errorData.message.error.forEach((errorMsg) => {
            message.error(errorMsg);
          });
        } else {
          throw new Error(errorData.message || "Failed to duplicate theme");
        }
      }
    } catch (error) {
      console.error("Duplicate error:", error);
      if (!error.handled) {
        message.error("Failed to duplicate theme. Please try again.");
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const processedValues = {
        ...values,
        wheelDataId: values.wheelDataId
          ? String(values.wheelDataId)
          : undefined,
        backgroundColors:
          values.backgroundColors?.map((color) => getColorValue(color)) || [],
        textColors:
          values.textColors?.map((color) => getColorValue(color)) || [],
        outerBorderColor: getColorValue(values.outerBorderColor),
        innerBorderColor: getColorValue(values.innerBorderColor),
        radiusLineColor: getColorValue(values.radiusLineColor),
      };
      const url = editingTheme
        ? `${window.stwAdminData.rest_url}/stw/v1/template/roulette-theme/${editingTheme.id}`
        : `${window.stwAdminData.rest_url}/stw/v1/template/roulette-theme`;
      const method = "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedValues),
      });
      if (response.ok) {
        await response.json(); // consume response
        if (editingTheme) {
          message.success("Theme updated successfully");
        } else {
          message.success("Theme created successfully");
        }
        loadThemes();
        setModalVisible(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (
          errorData.message &&
          errorData.message.error &&
          Array.isArray(errorData.message.error)
        ) {
          errorData.message.error.forEach((errorMsg) => {
            message.error(errorMsg);
          });
          return;
        } else {
          throw new Error(errorData.message || "API request failed");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      if (!error.handled) {
        message.error(
          `Failed to ${editingTheme ? "update" : "create"} theme. ${
            error.message || "Please try again."
          }`
        );
      }
    }
  };

  return (
    <div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Theme Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTheme}
          >
            Create New Theme
          </Button>
        </div>

        <ThemeManagerTable
          themes={themes}
          loading={loading}
          getColorValue={getColorValue}
          wheelData={wheelData}
          handleEditTheme={handleEditTheme}
          handleDuplicateTheme={handleDuplicateTheme}
          handleDeleteTheme={handleDeleteTheme}
        />
      </Card>

      <Modal
        title={editingTheme ? "Edit Theme" : "Create New Theme"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        width="900vw"
        okText={editingTheme ? "Update" : "Create"}
      >
        <Splitter>
          <Splitter.Panel defaultSize="40%" min="20%" max="70%">
            <CustomRoulette 
              formData={formValues} 
              selectedWheelData={selectedWheelData}
            />
          </Splitter.Panel>
          <Splitter.Panel>
            <ThemeManagerForm
              handleFormValuesChange={handleFormValuesChange}
              form={form}
              editingTheme={editingTheme}
              selectedWheelSlices={selectedWheelSlices}
              selectedWheelData={selectedWheelData}
              wheelData={wheelData}
              wheelDataLoading={wheelDataLoading}
              wheelDataPage={wheelDataPage}
              wheelDataTotal={wheelDataTotal}
              wheelDataSearch={wheelDataSearch}
              setWheelDataSearch={setWheelDataSearch}
              loadWheelData={loadWheelData}
              handleWheelDataChange={handleWheelDataChange}
              handleSubmit={handleSubmit}
            />
          </Splitter.Panel>
        </Splitter>
      </Modal>
    </div>
  );
};

export default ThemeManager;
