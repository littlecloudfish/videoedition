export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',
  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  // TODO 设计首页
  // 首页
  // BASE_HOME = '/dashboard',
  //首页跳转默认路由
  // BASE_HOME_REDIRECT = '/dashboard/console',
  // 错误
  ERROR_PAGE_NAME = 'ErrorPage',

  // 媒体列表页面
  MEDIA_LIST_URL = '/media/list',
  MEDIA_LIST_NAME = 'MediaList',
  MEDIA_LIST_PATH = 'list',

  BASE_HOME = '/media',
  BASE_HOME_REDIRECT = MEDIA_LIST_URL,

  // 媒体文件详情
  MEDIAD_DETAIL_URL = '/media/detail',
  MEDIAD_DETAIL_NAME = 'MediaDetail',
  MEDIA_DETAIL_PATH = 'detail/:id?',

  // 内容搜索列表页面
  MEDIA_SEARCH_URL = '/media/search',
  MEDIA_SEARCH_NAME = 'MediaSearch',
  MEDIA_SEARCH_PATH = 'search',

  // 媒体文件上传
  MEDIA_UPLOAD_URL = '/media/upload',
  MEDIA_UPLOAD_NAME = 'MediaUpload',
  MEDIA_UPLOAD_PATH = 'upload',

  //bigblueass trim video
  MEDIA_EDIT_URL = '/media/edit',
  MEDIA_EDIT_NAME = 'MediaEdit',
  MEDIA_EDIT_PATH = 'edit',
}
