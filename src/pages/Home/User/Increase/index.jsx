import React,{useState,useEffect} from 'react'
import { Button, message, Form, Input,  Select,Space,Typography, Modal   } from 'antd';
import HttpUtil from '../../../../Util/httpUtil'
import styles from './index.module.css'
const { Option } = Select
const {Text} = Typography


export default function Index() {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('确认是否添加用户');
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total:0
  })
  const [filter,setFilter] = useState([])
  const [item,setItem] = useState([])
  useEffect(()=>{
    const {pageNum,pageSize} = pagination
     HttpUtil.getUsers({
     pageNum,
     pageSize
     }).then((res)=>{
      console.log(res)
      if(res.code === 200){
        const item = res.data.list
        setItem(item)
      }
      const mapped = res.data.list.map((obj, index) => obj.roleName)
      const filtered = mapped.filter((type, index) => mapped.indexOf(type) === index)
      setFilter(filtered)
     })
    
  },[])
  const onFinish = (values) => {
      console.log('Success:', values);
      const{jobNumber,password,realName,roleId} = values
      HttpUtil.addUser({
        jobNumber,password,realName,roleId
      }).then((res)=>{
        console.log(res)
        if(res.code===200){
          message.success("添加用户成功")
          window.location.href='/home/user/homePage'
        }
        else{
          message.error(res.code)
        }
      })
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    const showModal = () => {
      setOpen(true);
    };
    const handleOk = (values) => {
      setModalText('确认是否添加用户');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
    
      console.log('Success:', values);
    };
    const handleCancel = () => {
      console.log('取消');
      setOpen(false);
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
        label="姓名"
        name="realName"
       
        rules={[
          {
            required: true,
            message: '请输入姓名',
          },
        ]}
      >
        <Input  placeholder='请输入姓名'/>
      </Form.Item>
      <Form.Item
        label="工号"
        name="jobNumber"
        rules={[
          {
            required: true,
            message: '请输入工号',
          },
        ]}
      >
        <Input placeholder='请输入工号'/>
      </Form.Item> 
      <Form.Item
        label="用户类型"
        name="roleId"
        rules={[
          {
            required: true,
            message: '请选择用户类型',
          },
        ]}
      >
        <Select>
          {
            filter.map((item,index)=>{
              console.log(filter)
                return(
                  <Option value={index+1}>{item}</Option>
                )
            }) 
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="使用密码"
        name="password"
        
      >
       {/* <Space direction="vertical"> */}
      <Input.Password placeholder="123456" />
      {/* </Space> */}
      </Form.Item>

     
      <Space><Text style={{color:'#2784FF'}}>若不输入初始密码，该账户默认密码为：123456</Text></Space>
      <Space>
          <Button type="primary" htmlType="submit" onClick={showModal}>
            保存
          </Button>
          <Button  htmlType="submit">
            取消
          </Button>
          </Space>
    </Form>
    {/* <Modal
        // title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"确认"}
        cancelText={'取消'}
      >
        <p>{modalText}</p>
      </Modal> */}
    </div>
  </>
  )
}
