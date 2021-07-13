const customerRouter = {
  route: null,
  name: null,
  title: '客户管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/customer/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '客户列表',
      type: 'view',
      name: 'customerList',
      route: '/customer/list',
      filePath: 'view/customer/customer-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default customerRouter
