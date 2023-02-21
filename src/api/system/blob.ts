import { http } from '@/utils/http/axios';

// export const uploadFile = (formData: FormData) => {

export const uploadFile = (formData: FormData) => {
  return http.request(
    {
      url: '/blob/upload',
      method: 'POST',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    {}
  );
};
