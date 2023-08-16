import React, { useState, useEffect } from 'react'
import { Button, message, Upload, Form, Input, Select, Space } from 'antd';
import HttpUtil from '../../../../Util/httpUtil'
import styles from './index.module.css'
const { Option } = Select
const { TextArea } = Input;
export default function Index() {
  const [data, setData] = useState({})
  const [category, setCategory] = useState([])
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  const [commodity, setCommodity] = useState([])
  const [filter,setFilter] = useState([])
  
  useEffect(() => {
    const { pageNum, pageSize } = pagination
    
    HttpUtil.getCommodities({
      pageNum,
      pageSize,
      classificationId: '',
      name: '',
      status: ''
    }).then((res) => {
      console.log(res)
      if(res.code===200){
        setCommodity(res.data.list)
        const mapped = res.data.list.map((obj, index) => obj.unit)
        const filtered = mapped.filter((type, index) =>  mapped.indexOf(type) === index  )
        setFilter(filtered)
      }else{
        message.error(res.msg)
      }
      
    })
 
    HttpUtil.getCategories().then((res) => {
      console.log(res.data)
      if(res.code === 200){
        setCategory(res.data)
      }else{
        message.error(res.msg)
      }
      
    })

  }, [])
  const onFinish = (values) => {
    console.log('Success:', values);
    const price = parseInt(values.price)
    const sort = parseInt(values.sort)
    const {name,specification,classificationId,description,unit} = values
    values.price = price
    values.sort = sort
    console.log(values)
    setData(values)
    console.log(data)
    HttpUtil.addCommodities({
      name,specification,classificationId,description,unit,sort,price
    }).then((res)=>{
      console.log(res)
      message.success('项目新增成功')
      setTimeout(()=>{
        window.location.href='/home/commodity/homePage'
      },500)
   
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
            label="项目名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
          >
            <Input placeholder='项目名称' />
          </Form.Item>
          <Form.Item
            label="规格型号"
            name="specification"
            rules={[
              {
                required: true,
                message: '请输入规格型号',
              },
            ]}
          >
            <Input placeholder='规格型号' />
          </Form.Item> <Form.Item
            label="项目价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入项目价格',
              },
            ]}
          >
            <Input placeholder='项目价格' />
          </Form.Item>
          <Form.Item
            label="项目分类"
            name="classificationId"
            rules={[
              {
                required: true,
                message: '请选择项目分类',
              },
            ]}
          >
            <Select>
              {
                category.map((item) => {
                  return (
                    <Option key={item.id} value={item.id} >{item.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="计量单位"
            name="unit"
            rules={[
              {
                required: true,
                message: '请选择计量单位',
              },
            ]}
          >
            <Select>
              {
                filter.map((item)=>{
                  console.log(filter)
                   return(
                     <Option  value={item} >{item}</Option> 
                  )  
                })
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="显示顺序"
            name="sort"
          >
            < Input placeholder='（值越大越靠前）' />
          </Form.Item>
          <Form.Item
            label="项目描述"
            name="description"
          >
            <TextArea rows={5} placeholder='输入项目描述信息' />
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
