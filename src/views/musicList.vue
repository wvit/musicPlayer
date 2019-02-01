<template>
  <div>
    <titleHead title="音乐列表"></titleHead>
    <div class="contentWrap">
      <ul>
        <li
          v-for="(item,index) of musicList"
          :key="index"
          class="musicItem"
          @click="playMusic(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      musicList: [], //音乐列表
      playMusicBuffer: null, //当前播放的音乐
      playCount: 0 //音乐播放点击次数
    };
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue")
  },
  //初始化数据
  beforeMount() {
    this.$axios.get(`/media/getMediaList?queryMusic='hello'`).then(res => {
      console.log("音乐列表", res.data);
      if (res.data.code === 0) {
        this.musicList = res.data.data;
      }
    });
  },
  methods: {
    //播放音乐
    playMusic(name) {
      const ac = new AudioContext();
      //后面通过判断count和this.playCount是否相等，来判断是否阻止这次播放音乐
      const count = ++this.playCount;
      this.playMusicBuffer ? this.playMusicBuffer.stop() : "";
      this.$axios
        .get(`/media/${name}`, {
          responseType: "arraybuffer"
        })
        .then(res => {
          if (res.status === 200) {
            if (count !== this.playCount) return;
            return new Promise(resolve => {
              ac.decodeAudioData(res.data, buffer => {
                if (count !== this.playCount) return;
                resolve(buffer);
              });
            });
          }
        })
        .then(buffer => {
          const bufferSource = ac.createBufferSource();
          bufferSource.buffer = buffer;
          bufferSource.connect(ac.destination);
          bufferSource.start(0);
          this.playMusicBuffer = bufferSource;
        });
    }
  }
};
</script>
<style scoped>
.musicItem {
  margin-bottom: 20px;
}
</style>
