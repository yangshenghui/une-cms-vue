const readRouter = {
  route: null,
  name: null,
  title: '资料管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/read/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加资料',
      type: 'view',
      name: 'ReadCreate',
      route: '/read/add',
      filePath: 'view/read/read-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '资料列表',
      type: 'view',
      name: 'ReadCreate',
      route: '/read/list',
      filePath: 'view/read/read-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default readRouter
