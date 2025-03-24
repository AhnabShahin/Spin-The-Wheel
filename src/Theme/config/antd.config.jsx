import { ConfigProvider } from 'antd';

const antdConfig = {
  form: {
    layout: 'horizontal',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
};

export const AntdConfigProvider = ({ children }) => (
  <ConfigProvider componentSize="middle" form={{ layout: 'horizontal', labelCol: { span: 8 }, wrapperCol: { span: 16 } }}>
    {children}
  </ConfigProvider>
);

export default antdConfig;