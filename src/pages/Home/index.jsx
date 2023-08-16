import React, { Component, useEffect, useState } from 'react'
// import { Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Space, theme, Avatar, Typography, Button, message, Modal, Input, Form } from 'antd';
// import {eventBus} from '../event';
import { useStore } from '../../store/index.js'
import { Link, Outlet } from 'react-router-dom'
import Nav from './Nav'
import avatar from '../../assets/avatar.png'
import { clearToken } from '../../Util/auth.js'
import HttpUtil from '../../Util/httpUtil.js';

const { Header, Content, Sider } = Layout;
const { Text } = Typography

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const username = useStore(state=>state.username)
  // console.log(username)
  const username = localStorage.getItem('username')
  const oldPassword = localStorage.getItem('oldPassword')
  console.log(oldPassword)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm();
  const logoutModal = () => {
    setIsModalVisible(true)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    form.validateFields().then(async (values) => {
      console.log(values)
      if (values.oldPassword == oldPassword && values.newPassword == values.confirmPassword) {
        HttpUtil.updatePSW({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            message.success("修改密码成功")
            // window.location.href='/home/commodity/homePage'
            localStorage.setItem('oldPassword', values.newPassword)
            setTimeout(() => {
              setIsModalOpen(false);
            }, 300);
          }
        })
      } else if (values.oldPassword !== oldPassword) {
        message.error('旧密码输入错误')
      } else if (values.newPassword !== values.confirmPassword) {
        message.error('两次输入密码不一致')
      } else {
        message.error('修改失败')
      }

    })

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(oldPassword)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const modalHandleOk = () => {
    clearToken()
    message.success("退出登录成功")
    setTimeout(() => {
      window.location.href = '/'
    }, 300)
  }
  const cancelModel = () => {
    setIsModalVisible(false)
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Space style={{ color: "white", fontSize: "16px", textAlign: "center", margin: "17px" }}>华油项目管理系统</Space>
          <Space style={{ marginLeft: '70%', cursor: "pointer" }}><Avatar size={30} src={avatar} onClick={showModal} /><Text onClick={showModal} style={{ color: 'white' }} >{username}</Text></Space>
          <Space><Button onClick={logoutModal} size='small' style={{ 'marginLeft': '15px' }}>退出登录</Button></Space>
        </Header>
      </Layout>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: colorBgContainer,
          }}
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Nav />
        </Sider>

        <Layout>
          <Content style={{ margin: '0 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 0, minHeight: 624, }}>
              <Outlet />
            </div>
          </Content>
        </Layout>

      </Layout>
      <Modal title="修改密码"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: '请输入旧密码',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: '请再次输入新密码',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="退出登录"
        open={isModalVisible}
        onOk={modalHandleOk}
        onCancel={cancelModel}
        // footer={null}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <p>确认退出登录</p>
      </Modal>
    </>

  );


}
export default Home

