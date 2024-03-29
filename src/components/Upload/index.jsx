import { Upload, Icon, message } from 'antd';
import React, { Component } from 'react';

const flyio = require('flyio')

function getBase64(img, callback) { 
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result))
  return reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only Upload JPG/PNG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isJpgOrPng;
}

class Avatar extends Component {
  state = {
    loading: false,
  };

  onChange = (data) => {
    this.props.onChange(data)
  }

  handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async imageUrl => {

        const { data: imgRes } = await flyio.post('https://1512570506806731.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/chuanru/imagetest/', { imageUrl })
        this.onChange(imgRes)
        this.setState({
          imageUrl,
          loading: false,
        })
      });
    }
  };

  

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
    <div className="ant-upload-text">Upload</div>
      </div>
  );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    beforeUpload={beforeUpload}
    onChange={this.handleChange}
      >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
  }
}

export default Avatar
