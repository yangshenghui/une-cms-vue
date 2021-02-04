const swipeRouter = {
  route: null,
  name: null,
  title: '广告管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/swipe/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加广告',
      type: 'view',
      name: 'SwipeCreate',
      route: '/swipe/add',
      filePath: 'view/swipe/swipe-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '广告列表',
      type: 'view',
      name: 'SwipeCreate',
      route: '/swipe/list',
      filePath: 'view/swipe/swipe-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default swipeRouter
