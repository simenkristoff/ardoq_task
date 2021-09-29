import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Layout, Typography, Form, Input, Slider, Button } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';

import { StationFormValues } from '@/types';

interface IProps {
  form: FormInstance<StationFormValues>;
  onFinish: (values: StationFormValues) => void;
}

/**
 * Sidebar for managing station search.
 */
const Sidebar: React.FC<IProps> = ({ form, onFinish }: IProps) => {
  return (
    <Layout.Sider
      trigger={<MenuOutlined />}
      collapsible
      className='sidebar'
      breakpoint='lg'
      width={400}
      collapsedWidth={0}
    >
      <Typography.Title level={4}>Finn nærmeste stasjon</Typography.Title>
      <Form
        form={form}
        name='station_search'
        layout='vertical'
        requiredMark={false}
        initialValues={{ radius: 5 }}
        onFinish={onFinish}
      >
        <Form.Item
          name='address'
          label='Hvor befinner du deg?'
          rules={[{ required: true, message: 'Vennligst skriv inn en adresse' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ margin: 0 }} shouldUpdate>
          {() => {
            const radius = form.getFieldValue(['radius']);
            return (
              <div className='ant-col ant-form-item-label'>
                <label htmlFor='station_radius' className='ant-form-item' title='Søkeradius'>
                  Søkeradius: {radius}km
                </label>
              </div>
            );
          }}
        </Form.Item>
        <Form.Item name='radius'>
          <Slider min={0.5} max={10} step={0.5} />
        </Form.Item>

        <Form.Item name='submit'>
          <Button size='large' type='primary' htmlType='submit' className='submit-btn'>
            Søk
          </Button>
        </Form.Item>
      </Form>
    </Layout.Sider>
  );
};

export default Sidebar;
