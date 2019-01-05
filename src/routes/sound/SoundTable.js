import { Table,Form,Select} from 'antd';
import React,{ PureComponent} from 'react';


@Form.create({
})
class SoundTable extends PureComponent {//不帶有新增按鈕的表格

  handleSearch() {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  render() {
    const { form } = this.props;
    // const { getFieldDecorator} = form;
    const columns = [
      {
        title: '音响id号',
        dataIndex: 'yxid',
        key: 'yxid',
        width:120,
        align:"center",
      },
      {
        title: '设备名',
        dataIndex: 'shebeiname',
        key: 'shebeiname',
        width:90,
      },
      {
        title: '门店id',
        dataIndex: 'roomid',
        key: 'roomid',
        width:150,
      },
      {
        title: '店名',
        dataIndex: 'roomname',
        key: 'roomname',
        width:150,
      },
      {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
        width:150,
      },
      {
        title: '激活时间',
        dataIndex: 'creattime',
        key: 'creattime',
        width:150,
      },
      {
        title: '认证通过时间',
        dataIndex: 'authenticationTime',
        key: 'authenticationTime',
        width:150,
      },
      {
        title: '业务员aid',
        dataIndex: 'salesmanaid',
        key: 'salesmanaid',
        width:150,
      },
      {
        title: '业务员',
        dataIndex: 'salesmanname',
        key: 'salesmanname',
        width:150,
      },
      {
        title: '总代aid',
        dataIndex: 'allaid',
        key: 'allaid',
        width:150,
      },
      {
        title: '总代',
        dataIndex: 'allname',
        key: 'allname',
        width:150,
      },
      {
        title: '押金',
        dataIndex: 'deposit',
        key: 'deposit',
        width:150,
      },
      {
        title: '是否满足退押金',
        dataIndex: 'istime',
        key: 'istime',
        width:150,
      },
      {
        title: '支付押金时间',
        dataIndex: 'paytime',
        key: 'paytime',
        width:150,
      },

    ];

    const tableConfigs = {
      columns,
      rowKey: 'id',
      ...this.props,
      scroll:{
        x:1600
      }
    };

    return (
      <div>
        <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
          {/*<Input placeholder="请输入门店id进行搜索" style={{width:'300px',marginTop:'5px',marginRight:'20px'}}/>*/}
          {/*<Input placeholder="请输入代理商aid 代理商名称 代理商手机号搜索" style={{width:'300px',marginTop:'5px',marginRight:'20px'}}/>*/}
          {/*<Tag>日</Tag>*/}
          {/*<Tag><a href="https://github.com/ant-design/ant-design/issues/1862">周</a></Tag>*/}
          {/*<Tag closable>月</Tag>*/}
          {/*<Tag closable>区间</Tag>*/}
          {/*<DatePicker   />*/}
          {/* <span >
            <Button type="primary"  style={{marginLeft:'100px'}}>
              月
            </Button>
            <Button type="primary"   style={{float:'right'}}>
              查询
            </Button>
          </span> */}
        </Form>
        <Table {...tableConfigs} />
      </div>
    );
  }
}
export default SoundTable;
