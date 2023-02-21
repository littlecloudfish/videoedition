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
    redirect: PageEnum.MEDIA_EDIT_URL, //bigblueass
    component: Layout,
    meta: {
      title: 'MediaFile',
      icon: renderIcon(MediaLibrary),
      sort: 1,
    },
    children: [
      // {
      //   path: PageEnum.MEDIA_LIST_PATH,
      //   name: PageEnum.MEDIA_LIST_NAME,
      //   meta: {
      //     title: 'MediaList',
      //   },
      //   component: () => import('@/views/media/list/index.vue'),
      // },
      // {
      //   path: 'detail/:id?',
      //   name: PageEnum.MEDIAD_DETAIL_NAME,
      //   meta: {
      //     title: 'MediaFileDetail',
      //     hidden: true,
      //     activeMenu: PageEnum.MEDIA_LIST_NAME,
      //   },
      //   component: () => import('@/views/media/detail/Detail.vue'),
      // },
      // {
      //   path: PageEnum.MEDIA_SEARCH_PATH,
      //   name: PageEnum.MEDIA_SEARCH_NAME,
      //   meta: {
      //     title: 'MediaSearch',
      //   },
      //   component: () => import('@/views/media/search/index.vue'),
      // },
      // {
      //   path: PageEnum.MEDIA_UPLOAD_PATH,
      //   name: PageEnum.MEDIA_UPLOAD_NAME,
      //   meta: {
      //     title: 'MediaUpload',
      //   },
      //   component: () => import('@/views/media/upload/Upload.vue'),
      // },
      {
        path: PageEnum.MEDIA_EDIT_PATH,
        name: PageEnum.MEDIA_EDIT_NAME,
        meta: {
          title: 'EditVideo',
        },
        component: () => import('@/views/media/edit/Edit.vue'),
      },

    ],
  },
];

export default routes;
