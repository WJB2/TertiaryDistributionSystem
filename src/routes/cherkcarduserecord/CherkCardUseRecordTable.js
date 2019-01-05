import { Table,Form,Input,Button ,Pagination,Select} from 'antd';
import React,{ PureComponent,Fragment} from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create({

})
class CherkCardUseRecordTable extends PureComponent {//不帶有新增按鈕的表格

  render() {
    const { form } = this.props;
    // const { getFieldDecorator} = form;
    const columns = [
      {
        title: 'aid',
        dataIndex: 'aid',
        key: 'aid',
        align:"center",
      },
      {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
      },
      {
        title: '已使用数量',
        dataIndex: 'used',
        key: 'used',
      }
    ];

    const tableConfigs = {
      columns,
      rowKey: 'id',
      ...this.props,
      scroll:{
      x:300
      }
    };

    return (
      <div>

          {/*<FormItem label="商户类型">*/}
            {/*{getFieldDecorator('name')(<Select defaultValue="lucy" style={{ width: 120 }}  >*/}
              {/*<Option value="jack">Jack</Option>*/}
              {/*<Option value="lucy">Lucy</Option>*/}
              {/*<Option value="disabled" disabled>Disabled</Option>*/}
              {/*<Option value="Yiminghe">yiminghe</Option>*/}
            {/*</Select>)}</FormItem>*/}
          {/*<FormItem label="台卡状态">*/}
            {/*{getFieldDecorator('IdCardNo')(<Select defaultValue="lucy" style={{ width: 120 }}  >*/}
            {/*<Option value="jack">Jack</Option>*/}
            {/*<Option value="lucy">Lucy</Option>*/}
            {/*<Option value="disabled" disabled>Disabled</Option>*/}
            {/*<Option value="Yiminghe">yiminghe</Option>*/}
          {/*</Select> )}</FormItem>*/}
          {/*<span className={styles.developRewardOrPublishIndexOperator}>*/}
            {/*<Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)}>*/}
              {/*查询*/}
            {/*</Button>*/}
          {/*</span>*/}


        <Table  {...tableConfigs} />

      </div>
    );
  }
}
export default CherkCardUseRecordTable;
