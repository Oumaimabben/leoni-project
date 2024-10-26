import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import { Button, Form, Input,  Space, notification } from "antd";
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

const AjoutTypeSortie = () => {
  
  const [form] = useForm();


  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const addData = (values) => {
    const information = {
      ...values,      
    };
    
    axios
      .post(`http://localhost:8800/typesortie`, information, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "type de sortie ajouté avec succés",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message:"type de sortie existe deja",
          type: "error",
        });
      });
  };


  return (
    <div>
      <UserDashboard btn="add ">
          <Form form={form} {...formItemLayout} onFinish={addData}>
            <Form.Item label="type de sortie" name="typesortie" required>
              <Input
                placeholder="entrer nouvelle type de sortie "
                name="typesortie"
              />
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

export default AjoutTypeSortie
