import { defineStore } from 'pinia';

export type VideoTimeState = {
//   isLock: boolean; // 是否锁屏
  startTime: number;
  startstringTime: String; 
};

export const useVideoEditStore = defineStore({
  id: 'edit-video',
  state: (): VideoTimeState => ({
    startTime : 0,
    startstringTime: '00:00:00',
  }),
  getters: {
    getVideoTime(): number {
        return this.startTime;
      },
  },

  actions: {
    setVideoStart(payload) {
      console.log(payload.startAt);  
      this.startstringTime = payload.startAt
      var timearray = payload.startAt.split(':');
      this.startTime = (parseInt(timearray[0],10)*60*60)+(parseInt(timearray[1],10)*60)+parseInt(timearray[2],10)
    },
    // setLock(payload) {
    //   this.isLock = payload;
    // },
    // setLockTime(payload = initTime) {
    //   this.lockTime = payload;
    // },
  },
});
