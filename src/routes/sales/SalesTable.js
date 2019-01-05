import { Table,Form,Select} from 'antd';
import React,{ PureComponent} from 'react';


@Form.create({

})
class SalesTable extends PureComponent {//不帶有新增按鈕的表格

  handleSearch() {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  handleForm(e,text,record){
    console.log(record);
    if(record.bigaid===0){
      this.props.onAdd(record.aid);
    }else{
      this.props.onEdit(record.aid);
    }

  }

  handleProfitForm(record){
    console.log(record)
    if(record.bigaid===0){
      this.props.onAddProfit(record.aid);
    }else{
      this.props.onEditProfit(record.aid);
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
        title: 'aid',
        dataIndex: 'aid',
        key: 'aid',
        width:50,
        align:"center",
      },
      {
        title: '真实姓名',
        dataIndex: 'name',
        key: 'name',
        width:50,
        align:"center",
      },
      {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
        width:20,
        align:"center",
      },
      {
        title: '上级代理aid',
        dataIndex: 'bigaid',
        key: 'bigaid',
        width:50,
        align:"center",
      },
      {
        title: '代理分润比例',
        dataIndex: 'profitpoint',
        key: 'profitpoint',
        width:50,
        align:"center",
      },
      {
        title: '开户时间',
        dataIndex: 'OpenTime',
        key: 'OpenTime',
        width:50,
        align:"center",
      },
      {
        title: '状态',
        dataIndex: 'Status',
        key: 'Status',
        width:50,
        align:"center",
      },
      // {
      //   title: '操作',
      //   width:80,
      //   align:"center",
      //   render: (val, record) => (
      //     <Fragment>
      //       <a
      //         onClick={() => {
      //           onEdit(record.id);
      //         }}
      //       >
      //         编辑
      //       </a>
      //       <Divider type="vertical" />
      //       <Dropdown overlay={menu(record)}>
      //         <span className="ant-dropdown-link" href="#">
      //           更多<Icon type="down" />
      //         </span>
      //       </Dropdown>
      //     </Fragment>
      //   ),
      // },
    ];

    if(localStorage.getItem('CurrentUser')==="张孝杰"){
      new Array(2).fill('').forEach((item,index)=>{
        if(index===0){
          columns.push({
            title:'信息设置',
            dataIndex:'message',
            key:'message',
            width:50,
            render:(text,record)=>(
              <div onClick={(e)=>this.handleForm(e,text,record)}>
                <a>信息设置</a>
              </div>
            )})
        }else{
          columns.push({
            title:'利润点设置',
            dataIndex:'profit',
            key:'profile',
            width:50,
            render:(text,record)=>(
              <div onClick={(e)=>this.handleProfitForm(record)}>
                <a>利润点设置</a>
              </div>
            )
          })
        }
      })
    }


    const tableConfigs = {
      columns,
      rowKey: 'id',
      ...this.props,
      scroll:{
        x:1600
      }
    };

    return (
      <div >
        <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
          {/*<FormItem>*/}
            {/*{getFieldDecorator('name')(<Select defaultValue="我开通的" style={{ width: 120 }}  >*/}
              {/*<Option value="jack">Jack</Option>*/}
              {/*<Option value="lucy">Lucy</Option>*/}
              {/*<Option value="disabled" disabled>Disabled</Option>*/}
              {/*<Option value="Yiminghe">yiminghe</Option>*/}
            {/*</Select>)}</FormItem>*/}
          {/*<FormItem label="开通时间">*/}
            {/*{getFieldDecorator('IdCardNo')(<Select defaultValue="lucy" style={{ width: 120 }}  >*/}
              {/*<Option value="jack">Jack</Option>*/}
              {/*<Option value="lucy">Lucy</Option>*/}
              {/*<Option value="disabled" disabled>Disabled</Option>*/}
              {/*<Option value="Yiminghe">yiminghe</Option>*/}
            {/*</Select> )}</FormItem>*/}
          {/*<span className={styles.developRewardOrPublishIndexOperator}>*/}

            {/*<Input placeholder="输入业务员aid 手机号查找" style={{width:'300px',marginTop:'5px',marginRight:'200px'}}/>*/}

            {/*<Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)}>*/}
              {/*查询*/}
            {/*</Button>*/}
          {/*</span>*/}
        </Form>
        <Table  {...tableConfigs} />
      </div>
    );
  }
}
export default SalesTable;
