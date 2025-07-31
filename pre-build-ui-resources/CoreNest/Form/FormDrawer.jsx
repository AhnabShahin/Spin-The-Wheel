import { useState } from "react";
import { Button, Drawer, Space, Form } from "antd"; // Import notification
import ThemeForm from "./ThemeForm";

const FormDrawer = ({ drawerOpen, setDrawerOpen, onClose, record }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const handleExternalSubmit = () => form.submit();
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        window.SpinTheWheelData.rest_url + "stw/v1/template/roulette-theme",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": window.SpinTheWheelData.rest_nonce,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      // Check for validation errors
      if (data.message && data.message.error) {
        data.message.error.forEach((err) => {
          notification.error({
            message: "Validation Error",
            description: err,
            duration: 0, // Keep duration: 0 if you want them to stay forever
            // zIndexPopup is automatically applied via ConfigProvider
          });
        });
        // If there are errors, keep the drawer open so the user can fix them.
        // So, do NOT setDrawerOpen(false) here.
        return; // Important: Return after showing validation errors
      }

      // Show success messages
      if (data.message && data.message.success) {
        data.message.success.forEach((msg) => {
          notification.success({
            // <--- CORRECT USAGE
            message: "Success",
            description: msg,
            duration: 0, // Keep duration: 0 if you want them to stay forever
            // zIndexPopup is automatically applied via ConfigProvider
          });
        });
      }

      // If no errors, reset fields and close the drawer
      form.resetFields();
      setDrawerOpen(false); // <--- Move this here to close only on success
      onClose();
    } catch (error) {
      notification.error({
        // <--- CORRECT USAGE
        message: "Submission Failed",
        description: error.message || "Something went wrong.",
        // zIndexPopup is automatically applied via ConfigProvider
      });
      // Do not close the drawer on submission failure unless desired.
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={record ? "Edit Theme" : "Create Theme"}
      placement="right"
      size="large"
      onClose={() => setDrawerOpen(false)}
      open={drawerOpen}
      zIndex={99999} // This zIndex is for the Drawer component itself.
      extra={
        <Space>
          <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
          <Button
            type="primary"
            style={{ marginLeft: "8px" }}
            onClick={handleExternalSubmit}
            loading={loading}
          >
            Submit
          </Button>
        </Space>
      }
    >
      <ThemeForm handleSubmit={handleSubmit} form={form} />
    </Drawer>
  );
};

export default FormDrawer;
