import _ from 'lodash';

interface MediaStatusDesc {
  status: number;
  desc: string;
}

export const MediaStatus = {
  ProcessMakeSubtitles: {
    status: 100,
    desc: '提取字幕中',
  } as MediaStatusDesc,

  ProcessMakeSubtitlesSuccess: {
    status: 101,
    desc: '字幕提取完成',
  } as MediaStatusDesc,

  ProcessMakeSubtitlesFailed: {
    status: 102,
    desc: '字幕提取失败',
  } as MediaStatusDesc,

  ProcessTrimVideo: {
    status: 110,
    desc: '视频剪辑中',
  } as MediaStatusDesc,
  ProcessTrimVideoSuccess: {
    status: 111,
    desc: '视频剪辑完成',
  } as MediaStatusDesc,
  ProcessTrimVideoFailed: {
    status: 112,
    desc: '视频剪辑失败',
  } as MediaStatusDesc,
  ProcessTranslateText: {
    status: 120,
    desc: '翻译字幕中',
  } as MediaStatusDesc,
  ProcessTranslateTextSuccess: {
    status: 121,
    desc: '翻译字幕完成',
  } as MediaStatusDesc,
  ProcessTranslateTextFailed: {
    status: 122,
    desc: '翻译字幕失败',
  } as MediaStatusDesc,
  ProcessCompositeMedia: {
    status: 130,
    desc: '视频合成中',
  } as MediaStatusDesc,
  ProcessCompositeMediaSuccess: {
    status: 131,
    desc: '视频合成完成',
  } as MediaStatusDesc,
  ProcessCompositeMediaFailed: {
    status: 131,
    desc: '视频合成失败',
  } as MediaStatusDesc,

  getStatusDesc: (status: number): string => {
    for (const key of Object.keys(MediaStatus)) {
      const value = MediaStatus[key];
      if (_.isObject(value)) {
        const msd = value as MediaStatusDesc;
        if (msd.status == status) {
          return msd.desc;
        }
      }
    }
    return '未知异常状态';
  },
};
