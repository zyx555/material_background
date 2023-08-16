import React from 'react';
import { Button, message, Upload, Form, Input, PageHeader, Select, Space } from 'antd';
import HttpUtil from '../../../../Util/httpUtil';
import styles from './index.module.css'
const { Option } = Select
const { TextArea } = Input;
const onFinish = (values) => {
  console.log('Success:', values);
  const {serviceChargeName} = values
  const expenseRatio = parseFloat(values.expenseRatio)
  const sort = parseInt(values.sort)
  HttpUtil.addServiceCharge({
    expenseRatio,serviceChargeName,sort
  }).then((res)=>{
    console.log(res)
    message.success('添加服务费成功')
    window.location.href='/home/serviceFee/homePage'
  })
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export default function Index() {

  return (
    <>
    <div className={styles.wrapper}>
      <Form
        name="basic"
        id="addCommodity"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="服务费名称"
          name="serviceChargeName"
         
          rules={[
            {
              required: true,
              message: '请输入服务费名称',
            },
          ]}
        >
          <Input  placeholder='服务费名称'/>
        </Form.Item>
        <Form.Item
          label="费用比（%）："
          name="expenseRatio"
          rules={[
            {
              required: true,
              message: '请输入费用比',
            },
          ]}
        >
          <Input placeholder='3.00'/>
        </Form.Item> 

        <Form.Item
          label="显示顺序"
          name="sort"
        >
          < Input placeholder='（值越大越靠前）'/>
        </Form.Item>
        
      <Space>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
          <Button  htmlType="submit">
            取消
          </Button>
          </Space>
      </Form>
      </div>
    </>
  )
}
