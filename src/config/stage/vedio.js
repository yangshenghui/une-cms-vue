const vedioRouter = {
  route: null,
  name: null,
  title: '视频管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/vedio/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '添加视频',
      type: 'view',
      name: 'VedioCreate',
      route: '/vedio/add',
      filePath: 'view/vedio/vedio-create.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '视频列表',
      type: 'view',
      name: 'VedioCreate',
      route: '/vedio/list',
      filePath: 'view/vedio/vedio-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default vedioRouter
