
import { enUS } from 'antd/locale';

const AntdConfig = () => {
  return {
    locale: enUS,
    componentSize: "middle",
    form: {
      layout: 'vertical',
      labelCol: { span: 24, style: { padding: 0 } },
      wrapperCol: { span: 24 }
    },
    theme: {
      token: {
        colorPrimary: '#1677ff'
      }
    }
  };
};

export default AntdConfig;