const orderRouter = {
  route: null,
  name: null,
  title: '订单管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/order/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '订单列表',
      type: 'view',
      name: 'OrderList',
      route: '/order/list',
      filePath: 'view/order/order-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default orderRouter
