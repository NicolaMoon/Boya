<template>
  <div>
    <talking-app-bar></talking-app-bar>
    <div class="space">
        <div v-for="wordData in wordList">
          <my-word :data="wordData" v-if="wordData.name==userdata.username"></my-word>
          <others-word :data="wordData" v-else></others-word>
        </div>
    </div>
    <talking-bottom-nav :userdata="userdata" :talker="talker"></talking-bottom-nav>
  </div>
</template>

<script>
    import MyWord from "./MyWord";
    import OthersWord from "./OthersWord";
    import TalkingAppBar from "./TalkingAppBar";
    import TalkingBottomNav from "./TalkingBottomNav";
    import socket from '../socket';
    export default {
        name: "MessagePanel",
      components: {TalkingBottomNav, TalkingAppBar, OthersWord, MyWord},
      props:['userdata'],
      data(){
          return{
            talker:'',
            wordList:[]
          }
      },
      beforeCreate(){
          const that =this;
        this.$root.Bus.$on("talkingListenToMessage",(data) => {
          this.talker=data;
          console.log(this.talker);
          socket.emit('getMemory',{
            friendAccount:this.talker
          });
          socket.on('sendMemory',function (data) {
            that.wordList=data.wordList;
          });
        })
      },
      beforeDestroy(){
        this.$root.Bus.$off("talkingListenToMessage");
      }
    }
</script>

<style scoped>
</style>
