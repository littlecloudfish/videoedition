import { http } from '@/utils/http/axios';
import { RequestEnum } from '@/enums/httpEnum';

/**
 * 上传媒体文件
 * @param formData
 */
export const uploadMediaFile = (formData: FormData) => {
  return http.request(
    {
      url: '/media/upload',
      method: RequestEnum.POST,
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    {}
  );
};

/**
 * 获取媒体文件列表
 * @param params
 */
export function getMediaList(params) {
  return http.request({
    url: '/media/list',
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 获取媒体文件详情
 * @param params
 */
export function getMedia(topicId: string) {
  return http.request({
    url: `/media/info/${topicId}`,
    method: RequestEnum.GET,
  });
}

/**
 * 删除媒体文件
 * @param topicId
 */
export function delMedia(topicId: string) {
  return http.request({
    url: `/media/del/${topicId}`,
    method: RequestEnum.DELETE,
  });
}

/**
 * 搜索内容
 * @param params
 */
export function searchMedia(params) {
  return http.request({
    url: `/media/search`,
    method: RequestEnum.GET,
    params,
  });
}
