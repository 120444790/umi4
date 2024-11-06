import services from '@/services/demo';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, Form, Input, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';

const { queryUserList, deleteUser, modifyUser } =
  services.UserController;

/**
 * 更新用户
 * @param fields
 */
const handleUpdate = async (fields: {
  id?: number;
  name?: string;
  nickName?: string;
  email?: string;
}, actionRef: any) => {
  const hide = message.loading('正在修改');
  try {
    await modifyUser(
      {
        userId: fields.id,
      },
      {
        name: fields.name || '',
        nickName: fields.nickName || '',
        email: fields.email || '',
      },
    );
    hide();
    actionRef.current?.reload();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (id: number, actionRef: any) => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除选中的用户吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      const hide = message.loading('正在删除');
      try {
        await deleteUser({
          userId: id,
        });
        hide();
        actionRef.current?.reload();
        message.success('删除成功，即将刷新');
        return true;
      } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
      }

    },
    onCancel: () => {

      message.info('已取消删除');
      return false;
    },
  });
};

const TableList: React.FC<unknown> = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleRemove(record.id, actionRef);
            }}
            style={{
              color: '#f5222d',
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '用户列表',
      }}
    >
      <ProTable<API.UserInfo>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}

      />
      {
        stepFormValues && updateModalVisible && <Drawer
          title="修改用户信息"
          width={720}
          onClose={() => handleUpdateModalVisible(false)}
          visible={updateModalVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                style={{ marginRight: 8 }}
                onClick={() => handleUpdateModalVisible(false)}
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  handleUpdate(stepFormValues, actionRef);
                  setStepFormValues({})
                  handleUpdateModalVisible(false);
                }}
                type="primary"
              >
                确认
              </Button>
            </div>
          }
        >
          <Form layout="vertical" initialValues={stepFormValues}>
            <Form.Item
              label="名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '名称为必填项',
                },
              ]}
            >
              <Input placeholder="请输入名称" />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
          </Form>
        </Drawer>
      }

    </PageContainer>
  );
};

export default TableList;

