const configRouter = {
  route: null,
  name: null,
  title: '配置管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/config/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加配置',
      type: 'view',
      name: 'ConfigCreate',
      route: '/config/add',
      filePath: 'view/config/config-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '配置列表',
      type: 'view',
      name: 'ConfigCreate',
      route: '/config/list',
      filePath: 'view/config/config-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default configRouter
