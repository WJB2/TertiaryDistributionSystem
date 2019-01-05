import { Icon,Table,Form,Input,Button ,Pagination,Select,Divider,Dropdown,Menu} from 'antd';
import React,{ PureComponent,Fragment} from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
@Form.create({

})
class AddBusinessTable extends PureComponent {//不帶有新增按鈕的表格

  handleSearch() {
    const { onSearch } = this.props;

    if (onSearch) {
      onSearch();
    }
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator} = form;

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
        dataIndex: 'Roomid',
        key: 'Roomid',
        width:50,
        align:"center",
      },
      {
        title: 'id',
        dataIndex: 'Uid',
        key: 'Uid',
        width:50,
        align:"center",
      },
      {
        title: '真实姓名',
        dataIndex: 'Realname',
        key: 'Realname',
        width:90,
      },
      {
        title: '门店名称',
        dataIndex: 'RoomName',
        key: 'RoomName',
        width:150,
      },
      {
        title: '注册时间',
        dataIndex: 'RegistrationTime',
        key: 'RegistrationTime',
        width:150,
      },
      {
        title: '认证通过时间',
        dataIndex: 'AegistrationTime',
        key: 'AegistrationTime',
        width:150,
      },
      {
        title: '商户类型',
        dataIndex: 'Type',
        key: 'Type',
        width:150,
      },
      {
        title: '业务员姓名',
        dataIndex: 'Salesman',
        key: 'Salesman',
        width:150,
      },
      // {
      //   title: '操作',
      //   width:80,
      //   align:"center",
        // render: (val, record) => (
        //   <Fragment>
        //     <a
        //       onClick={() => {
        //         onEdit(record.id);
        //       }}
        //     >
        //       编辑
        //     </a>
        //     <Divider type="vertical" />
        //     <Dropdown overlay={menu(record)}>
        //       <span className="ant-dropdown-link" href="#">
        //         更多<Icon type="down" />
        //       </span>
        //     </Dropdown>
        //   </Fragment>
        // ),
      // },
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
        <Table  {...tableConfigs} />
      </div>
    );
  }
}
export default AddBusinessTable;
