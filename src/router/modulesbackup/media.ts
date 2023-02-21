import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { MediaLibrary } from '@vicons/carbon';
import { renderIcon } from '@/utils/index';
import { PageEnum } from '@/enums/pageEnum';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */

// TODO /media/ 会重定向失败
const routes: Array<RouteRecordRaw> = [
  {
    path: '/media',
    name: 'Media',
    redirect: PageEnum.MEDIA_LIST_URL,
    component: Layout,
    meta: {
      title: '媒体文件',
      icon: renderIcon(MediaLibrary),
      sort: 1,
    },
    children: [
      {
        path: PageEnum.MEDIA_LIST_PATH,
        name: PageEnum.MEDIA_LIST_NAME,
        meta: {
          title: '媒体列表',
        },
        component: () => import('@/views/media/list/index.vue'),
      },
      {
        path: 'detail/:id?',
        name: PageEnum.MEDIAD_DETAIL_NAME,
        meta: {
          title: '媒体文件详情',
          hidden: true,
          activeMenu: PageEnum.MEDIA_LIST_NAME,
        },
        component: () => import('@/views/media/detail/index.vue'),
      },
      {
        path: PageEnum.MEDIA_SEARCH_PATH,
        name: PageEnum.MEDIA_SEARCH_NAME,
        meta: {
          title: '内容搜索',
        },
        component: () => import('@/views/media/search/index.vue'),
      },
      {
        path: PageEnum.MEDIA_UPLOAD_PATH,
        name: PageEnum.MEDIA_UPLOAD_NAME,
        meta: {
          title: '文件上传',
        },
        component: () => import('@/views/media/upload/index.vue'),
      },
    ],
  },
];

export default routes;
