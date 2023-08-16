import React, { useRef, useState } from 'react'
import { Button, Checkbox, Form, Input, message, Typography, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import HttpUtil from '../../Util/httpUtil';
import { useStore } from '../../store/index.js'
import styles from './index.module.css'
const { Text } = Typography;

export default function Index() {
  const userRef = useRef()
  //  const username = useStore(state=>state.username)
  const setUserName = useStore(state => state.setUserName)

  //  console.log(username)

  const onFinish = (values) => {
    // console.log(setUserName)
    console.log('Success:', values);
    const { username, password } = values
    setUserName('222')

    const data = {
      jobNumber: username,
      password: password
    }
    // eventBus.emit('username',username)
    // PubSub.publish('username',username)


    const hideloading = message.loading("请求中")
    HttpUtil.login(data).then((res) => {
      if (res.code === 200) {
        // setUserName(data.jobNumber)
        console.log(res)
        localStorage.setItem('token', res.data)
        localStorage.setItem('username', username)
        localStorage.setItem('oldPassword', password)
        HttpUtil.getUserInfo({}).then((res) => {
          console.log(res)
          if (res.code === 200) {
            localStorage.setItem('type', res.data.roleName)
            hideloading()
            message.success('登录成功')
            window.location.href = `/home/commodity/homePage/`
          } else {
            message.error(res.msg)
          }

        })

      } else {
        hideloading()
        message.error(res.msg)
      }

    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='shell'>
    <div className={styles.wrapper}>
       
      <Form
        ref={userRef}
        name="basic"
        style={{
          maxWidth: 600,
          margin: '150px auto',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.container}
      >
      <div className={styles.title}><text>华油项目管理系统</text></div>
      <div className={styles.subtitle}><text>欢迎登录</text></div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginButton} >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  )
}
