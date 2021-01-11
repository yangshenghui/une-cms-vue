const typeRouter = {
  route: null,
  name: null,
  title: '分类管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/type/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加分类',
      type: 'view',
      name: 'TypeCreate',
      route: '/type/add',
      filePath: 'view/type/type-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '分类列表',
      type: 'view',
      name: 'TypeCreate',
      route: '/type/list',
      filePath: 'view/type/type-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default typeRouter
