import React, { PureComponent } from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

@Form.create({})
class ProfitForm extends PureComponent {
  handleFormSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && onSubmit) {
        onSubmit(values);
      }
    });
  }

  handleCancel(e) {
    e.preventDefault();
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  render() {
    const { profitFormType , global,currentInformation} = this.props;
    const { getFieldDecorator } = this.props.form;

    const profit = profitFormType === 'EDIT' ? currentInformation : {};

    const modalConfig = {
      title: profitFormType === 'EDIT' ? '编辑分润点设置' : '新建分润点设置',
      visible: true,
      onOk: this.handleFormSubmit.bind(this),
      onCancel: this.handleCancel.bind(this),
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal {...modalConfig}>
        <Form>
          <FormItem {...formItemLayout} label="分润点">
            {getFieldDecorator('point', {
            rules: [{ required: true, message: '请输入分润点' }],
              initialValue: profit.profitpoint,
          })(<Input placeholder="请输入分润点" />)}
        </FormItem>
      </Form>
      </Modal>
    );
  }
}

export default ProfitForm;
