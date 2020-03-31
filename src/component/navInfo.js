export default [
  {
    key:1,
    title:'首页',
    icon:'home',
    path:'/admin/index'
  },
  {
    key:2,
    title:'管理页管理',
    icon:'Dashboard',
    path:'/admin/admin',
  },
  {
    key:'ban',
    title:'轮播图',
    icon:'banner',
    path:'/admin/banner'
  },
  {
    key:'picList',
    title:'客样照',
    icon:'pic',
    path:'/admin/picList'
  },
  // {
  //   key:'user',
  //   title:'用户信息',
  //   icon:'Dashboard',
  //   path:'/admin/user',
  //   children:[
  //     {
  //     key:'user-1',
  //     title:'查看用户',
  //     path:'/admin/user/info'
  //     },
  //     {
  //       key:'user-2',
  //       title:"注销用户",
  //       path:'/admin/user/del',
  //     }
  //   ]
  // },
  {
    key:4,
    title:'摄影师',
    icon:'Ding',
    path:'/admin/php'
  },
  {
    key:5,
    title:'摄影师详情',
    icon:'Ding',
    path:'/admin/phpdetails'
  },
  {
    key:'user/',
    title:'用户',
    icon:'user',
    path:"/admin/user",
    children:[
      {
        key:'user-info',
        title:"用户信息",
        path:'/admin/user/info',
      },
      {
      key:'user-how',
      title:'用户评价',
      path:'/admin/user/how'
      },
      {
        key:'user-book',
        title:"用户预约页",
        path:'/admin/user/book',
      },
      {
        key:'user-order',
        title:"用户订单页",
        path:'/admin/user/order',
      },
    ]
  },
  {
    key:'look',
    title:'数据统计',
    icon:'sheet',
    path:'/admin/look'
  }
]