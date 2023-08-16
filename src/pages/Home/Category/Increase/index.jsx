import React, { useState } from 'react'
import { Button, message, Upload, Form, Input, PageHeader, Select,Space} from 'antd';
import HttpUtil from '../../../../Util/httpUtil'
import styles from './index.module.css'
const { Option } = Select
const { TextArea } = Input;

export default function Index() {
    const onFinish = (values) => {
        console.log('Success:', values);
        const {description,name} = values
        const sort = parseInt(values.sort)
        HttpUtil.addCategory({description,name,sort}).then((res)=>{
            console.log(res)
            message.success('新增分类成功')
            window.location.href='/home/category/homePage'
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
                    label="分类名称"
                    name="name"

                    rules={[
                        {
                            required: true,
                            message: '请输入分类名称',
                        },
                    ]}
                >
                    <Input placeholder='分类名称' />
                </Form.Item>
                <Form.Item
                    label="显示顺序"
                    name="sort"
                >
                    < Input placeholder='（值越大越靠前）' />
                </Form.Item>
                <Form.Item
                    label="分类描述"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: '输入分类描述信息',
                        },
                    ]}
                >
                    <TextArea rows={5} placeholder='输入描述信息' />
                </Form.Item>
              
                    <Space>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                    <Button htmlType="submit">
                        取消
                    </Button>
                    </Space>
               
            </Form>
            </div>
        </>
    )
}
