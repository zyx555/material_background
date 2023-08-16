import React, { useEffect, useRef, useState } from 'react'
import { Table, Space, Button, Modal, Form, Input, message } from 'antd'
import axios from 'axios'
import styles from './index.module.css'
import HttpUtil from '../../../../Util/httpUtil'
export default function Index() {
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState([])
  const [one, setOne] = useState({
    id: null,
    expenseRatio: null,
    serviceChargeName: "",
    sort: null
  })
  const [id, setId] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const FormRef = useRef(null)
  const [form] = Form.useForm();

  const columns = [
    {
      title: '服务费名称',
      dataIndex: 'serviceChargeName',
      key: 1,
      render: (text) => <a>{text}</a>,
    },
    {
      title: '总价费用比例（%）',
      dataIndex: 'expenseRatio',
      key: 2,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showModal.bind(this, record.id)}>修改</a>
          <a onClick={deleteServiceFee.bind(this, record.id)} style={{ "color": '#E51C23' }}>删除</a>
        </Space>
      ),
    },
  ]
  useEffect(() => {
    const { pageNum, pageSize } = pagination
    HttpUtil.getServiceCharge({
      pageNum,
      pageSize
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        const data = res.data.list
        setData(data)
        setPagination({
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total
        })
      }
    })
    FormRef && FormRef.current && FormRef.current.resetFields()
  }, [setData, one])
  const showModal = (id) => {
    setOpen(true);
    console.log(id)
    setOne(id)
    HttpUtil.getOneServiceCharge({ id }).then((res) => {
      console.log(res.data)
      if (res.code === 200) {
        const { serviceChargeName, sort, expenseRatio } = res.data
        setOne({
          id, serviceChargeName, sort, expenseRatio
        })
      }
    })
  };
  const handleOk = () => {
    console.log(pagination)
    const { pageNum, pageSize } = pagination
    form.validateFields().then(async (values) => {
      const { expenseRatio, serviceChargeName, sort } = values
      HttpUtil.updateServiceCharge({
        id: one.id,
        expenseRatio, serviceChargeName, sort
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          message.success("修改成功")
          HttpUtil.getServiceCharge({
            pageNum,
            pageSize
          }).then((res) => {
            console.log(res)
            if (res.code === 200) {
              const data = res.data.list
              setData(data)
              setPagination({
                pageNum,
                pageSize,
                total: res.data.total
              })
            } else {
              message.error(res.msg)
            }
          })
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 1000);
        }
      })
    })


  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const cancelModel = () =>{
    setIsModalVisible(false)
  }
  const deleteServiceFee = (id) => {
    console.log(id)
    setId(id)
    setIsModalVisible(true)
  }

  const modalHandleOk =()=>{
    setIsModalVisible(false)
    const { pageNum, pageSize } = pagination
    HttpUtil.deleteServiceCharge({ id }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        message.success("删除该项服务费成功")
        HttpUtil.getServiceCharge({
          pageNum,
          pageSize
        }).then((res) => {
          console.log(res)
          if (res.code === 200) {
            const data = res.data.list
            setData(data)
            setPagination({
              pageNum: res.data.pageNum,
              pageSize: res.data.pageSize,
              total: res.data.total
            })
          } else {
            message.error(res.msg)
          }

        })
      }

    })
  }
  const onTableChange = (paginationState) => {
    const { current, pageSize } = paginationState
    HttpUtil.getServiceCharge({
      pageNum: current,
      pageSize
    }).then((res) => {
      console.log(res)
      if (res.code === 200) {
        const data = res.data.list
        setData(data)
        setPagination({
          pageNum: current,
          pageSize,
          total: res.data.total
        })
      } else {
        message.error(res.msg)
      }

    })
  }


  return (
    <div className={styles.container}>
      <Table columns={columns} dataSource={data} pagination={pagination} onChange={onTableChange} />
      <Modal
        title="修改服务费"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={'修改'}
        cancelText={'取消'}
      >
        {/* <p>{modalText}</p> */}
        <Form

          ref={FormRef}
          form={form}
          name="basic"
          id="updateServiceCharge"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
            expenseRatio: one.expenseRatio,
            sort: one.sort,
            serviceChargeName: one.serviceChargeName
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
            <Input defaultValue={one.serviceChargeName} key={one.serviceChargeName} />
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
            <Input defaultValue={one.expenseRatio} key={one.expenseRatio} />
          </Form.Item>

          <Form.Item
            label="显示顺序"
            name="sort"
          >
            < Input defaultValue={one.sort} key={one.sort} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="删除操作"
        open={isModalVisible}
        onOk={modalHandleOk}
        onCancel={cancelModel}
        // footer={null}
        okText="确认"
        cancelText="取消"
        destroyOnClose={true}
      >
        <p>确认删除该项服务费</p>
      </Modal>
    </div>
  )
}
