import React from 'react';
import { Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Avatar from '../../components/Upload'
import styles from './index.less'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    tmp: '',
    imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
  }

  render() {
    return (
    <PageHeaderWrapper>
      <div className={styles.container}>
      <div><Avatar onChange={ data => this.setState({ tmp: data }) } /></div>
      <Button onClick={ () => {
        const { tmp } = this.state
        this.setState({
          imageUrl: JSON.parse(tmp).imageUrl
        })
      } }>转化</Button>
        <img alt="example" src={ this.state.imageUrl } className={styles.exportImg} />
      </div>
    </PageHeaderWrapper>
    )
  }
}

export default Index