import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { history } from 'umi';
import { addUser } from '@/services/demo/UserController';
import { User } from '@/services/user';
import styles from './index.less'

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: User) => {
    addUser(values).then(() => {
      // 注册成功后的逻辑
      form.resetFields();
      history.push('/user');
    }, () => {
      message.error('添加失败请重试！');

    });
  };

  return (
    <div className={styles.main}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
