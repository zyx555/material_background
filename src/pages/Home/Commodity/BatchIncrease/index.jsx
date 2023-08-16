import React, { useState } from 'react'
import { Button, message, Upload, Form, Input, PageHeader, Select, Space } from 'antd';
import axios from 'axios'
import baseUrl from '../../../../globalData'
import { PlusOutlined, InboxOutlined ,UploadOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default function Index() {
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false);
  function downloadFile(res) {
    const a = document.createElement('a');
    // 该实例化的方式第一个参数必须是数组的格式
    const blob = new Blob([res], {
      type: "application/vnd.ms-excel"
    });
    const url = window.URL.createObjectURL(blob);
    const filename = "项目模板" + ".xlsx"
    a.download = filename
    a.setAttribute('href', url);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const downloadTemplate = () => {

    axios({
      method: "get",
      url: baseUrl+'/api/productBasic/downloadBatchImportTemplate',
      responseType: 'blob',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") || null,
      },
      // data
    }).then((res) => {
      console.log(res)
      downloadFile(res.data)
    })
  }

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    setUploading(true);
    axios(baseUrl+'/api/productBasic/batchImport', {
      method: 'POST',
      data: formData,
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token") || null,
      }
    })
      .then((res) => {
        // res.json()
        console.log(res)
      })
      .then(() => {
        setFileList([]);
        // setFileList(fileList)
        message.success('上传成功');
        setTimeout(()=>{
          window.location.href = '/home/commodity/homePage'
        },500)
      })
      .catch(() => {
        message.error('上传失败');
      })
      .finally(() => {
        setUploading(false);
      });
  };
 
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
 
  return (
    <>
     
        <Space style={{'marginTop': '24px','marginLeft': '42px'}}>请下载批量上传<a onClick={downloadTemplate}>项目模板.xlsx</a>文件</Space>
        <div style={{'marginTop': '37px','marginLeft': '62px'}}>
      <Upload {...props}>
       
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? '正在上传' : '开始上传'}
      </Button>
      </div>
    </>
  )
}
