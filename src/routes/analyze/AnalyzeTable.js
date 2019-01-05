import { Table,Form,Select} from 'antd';
import React,{ PureComponent} from 'react';

@Form.create({

})
class AnalyzeTable extends PureComponent {//不帶有新增按鈕的表格

  handleSearch() {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  render() {
    const { form } = this.props;
    // const { getFieldDecorator} = form;

    // const menu = (record)=>{
    //   return  <Menu>
    //     <Menu.Item key="delete">
    //       <a onClick={() => {
    //         onDelete(record.id);
    //       }}>删除</a>
    //     </Menu.Item>
    //   </Menu>
    // };

    const columns = [
      {
        title: '门店id',
        dataIndex: 'roomid',
        key: 'roomid',
        width:50,
        align:"center",
      },
      {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid',
        width:50,
        align:"center",
      },
      {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
        width:90,
      },
      {
        title: '商户名',
        dataIndex: 'MerchantName',
        key: 'MerchantName',
        width:150,
      },
      {
        title: '商户认证时间',
        dataIndex: 'CertificationTime',
        key: 'CertificationTime',
        width:150,
      },
      {
        title: '商户类型',
        dataIndex: 'MerchantType',
        key: 'MerchantType',
        width:150,
      },
      {
        title: 'aid',
        dataIndex: 'aid',
        key: 'aid',
        width:150,
      },
      {
        title: '业务员/代理员',
        dataIndex: 'salesman',
        key: 'salesman',
        width:150,
      },
      {
        title: '交易笔数',
        dataIndex: 'TransactionsNum',
        key: 'TransactionsNum',
        width:150,
      },
      {
        title: '>=2交易笔数',
        dataIndex: 'moreTwo',
        key: 'moreTwo',
        width:150,
      },
      {
        title: '交易总金额',
        dataIndex: 'AllMoney',
        key: 'AllMoney',
        width:150,
      },
      {
        title: '交易平均金额',
        dataIndex: 'AverageAmount',
        key: 'AverageAmount',
        width:150,
      },
      {
        title: '交易人数',
        dataIndex: 'AllPeople',
        key: 'AllPeople',
        width:150,
      },
      {
        title: '人均交易笔数',
        dataIndex: 'AveragePeople',
        key: 'AveragePeople',
        width:150,
        width:150,
      },
      {
        title: '交易人数/交易笔数',
        dataIndex: 'Proportion',
        key: 'Proportion',
        width:150,
      }
    ];

    const tableConfigs = {
      columns,
      rowKey: 'id',
      ...this.props,
      scroll:{
        x:1600
      }
    };
    console.log(this.props.dataSource)

    return (
      <div>
        <Table  {...tableConfigs} />
      </div>
    );
  }
}
export default AnalyzeTable;
