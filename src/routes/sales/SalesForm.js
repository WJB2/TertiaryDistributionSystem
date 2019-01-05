import React, { PureComponent } from 'react';

import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;

@Form.create({})
class SalesForm extends PureComponent {
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
    console.log('what')
    e.preventDefault();
    const { onCancel } = this.props;
    if (onCancel) {
      console.log('what')
      onCancel();
    }
  }

  render() {
    const { informationFormType , global,currentInformation} = this.props;
    const { getFieldDecorator } = this.props.form;

    const information = informationFormType === 'EDIT' ? currentInformation : {};

    const modalConfig = {
      title: informationFormType === 'EDIT' ? '编辑信息设置' : '新建信息设置',
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
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('psw', {
            rules: [{ required: true, message: '请输入密码' }],
              initialValue: information.psw,
          })(<Input placeholder="请输入密码" />)}
        </FormItem>

          <FormItem {...formItemLayout} label="上级">
            {getFieldDecorator('bigaid', {
              rules: [{ required: true, message: '请输入上级' }],
              initialValue: information.bigaid,
            })(<Input placeholder="请输入上级" />)}
          </FormItem>
      </Form>
      </Modal>
    );
  }
}

export default SalesForm;
