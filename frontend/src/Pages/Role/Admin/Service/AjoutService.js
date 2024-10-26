
import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input, Space, notification,InputNumber } from "antd";
import axios from "axios";
import { useForm } from "antd/lib/form/Form";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const AjoutService = () => {
 
  const [form] = useForm();

  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const addData = (values) => {
    const information = {
      ...values,      
    };
    
    axios
      .post(`http://localhost:8800/service`, information, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "service ajouté avec succés",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message:"service doit étre unique",
          type: "error",
        });
      });
  };

  return (
    <div>
      <UserDashboard btn="add ">
          <Form form={form} {...formItemLayout} onFinish={addData}>
            <Form.Item label="designtion" name="designation" required>
              <Input
                placeholder="entrer la designation "
                name="designation"
              />
            </Form.Item>
            <Form.Item label="nombre d'employée" name="nbr_employee" required>
                  <InputNumber min={1} defaultValue={1} name="nbr_employee" required />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  ajouter
                </Button>
              </Space>
            </Form.Item>
          </Form>
      </UserDashboard>
    </div>
  );
};

export default AjoutService




