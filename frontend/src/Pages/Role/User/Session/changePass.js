import React from "react";
import UserDashboard from "../../../../Components/Dashboard";
import axios from "axios";
import { Form, Input, Button, Space, notification } from "antd";
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

const ChangePass = () => {
  const [form] = useForm();
  var getlocal = localStorage.getItem("token");
  var bearer = localStorage.getItem("token") ? `Bearer ${getlocal}` : "";
  const addData = (values) => {
    if(values.confirmpass===values.newpass){
    const information = {
       passnow:values.passnow,
       newpass:values.newpass
    };
    axios
      .post(`http://localhost:8800/changepassword`, information, {
        headers: {
          authorization: bearer,
        },
      })
      .then((data) => {
        form.resetFields();
        notification.open({
          message: "mot de passe changée avec succés",
          type: "success",
        });
      })
      .catch((err) => {
        notification.open({
          message:
            "ancien mot de passe incorrect ",
          type: "error",
        });
      });
  }else{
    notification.open({
      message:
        "mot de passe et confirmation mot de passe doit étre identique",
      type: "error",
    }); 
  }
    
  };
  return (
    <div>
      <UserDashboard btn="add ">
        <Form form={form} {...formItemLayout} onFinish={addData}>
          <Form.Item label="ancien mot de passe " name="passnow" required>
            <Input placeholder="entrer ancien mot de passe " name="passnow" />
          </Form.Item>
          <Form.Item label="nouveau mot de passe " name="newpass" required>
            <Input placeholder="entrer nouveau mot de passe " name="newpass" />
          </Form.Item>
          <Form.Item label="confirmation mot de passe " name="confirmpass" required>
            <Input placeholder="entrer confirmation mot de passe " name="newpass" />
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
                changer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </UserDashboard>
    </div>
  );
};

export default ChangePass;
