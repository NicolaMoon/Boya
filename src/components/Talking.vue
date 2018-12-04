<template>
  <div>
    <talking-app-bar></talking-app-bar>
    <div class="space">
      <div v-show="progressShow" class="progress">
        <mu-flex justify-content="center">
          <mu-circular-progress class="demo-circular-progress" :size="24"></mu-circular-progress>
        </mu-flex>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <div v-for="wordData in wordList">
            <my-word :data="wordData" v-if="wordData.name==userdata.username"></my-word>
            <others-word :data="wordData" v-else></others-word>
          </div>
        </div>
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
    import BScroll from 'better-scroll'
    export default {
        name: "MessagePanel",
      components: {TalkingBottomNav, TalkingAppBar, OthersWord, MyWord},
      props:['userdata'],
      data(){
          return{
            talker:'',
            wordList:[],
            memoryNum:8,
            progressShow:false
          }
      },
      beforeCreate(){
          const that =this;
        this.$root.Bus.$on("talkingListenToMessage",(data) => {
          this.talker=data;
          socket.emit('getMemory',{
            friendAccount:this.talker,
            num:8
          },function () {
            that.$nextTick(() => {
              that.initScroll();
            });
          });
          socket.on('sendMemory',function (data) {
            that.wordList=data.wordList;
          });
          socket.on('reciveMsg',function (data) {
            if(data.flag === true){
              socket.emit('getMemory',{
                friendAccount:that.talker,
                num:8
              },function () {
                that.$nextTick(() => {
                  that.initScroll();
                });
              });
            }
          });
        })
      },
      mounted(){
          this.resize();
      },
      beforeDestroy(){
        this.$root.Bus.$off("talkingListenToMessage");
      },
      methods:{
        resize(){
          var clientHeight=window.innerHeight;
          var wrapper=document.getElementsByClassName('wrapper')[0];
          wrapper.style.cssText="height:"+(clientHeight-104)+"px";
        },
        initScroll(){
          if (this.scroll) {
            this.scroll.refresh();
            return;
          }
          if (!this.$refs.wrapper) {
            return;
          }
          this.scroll = new BScroll(this.$refs.wrapper,{});
          this.scroll.scrollTo(0,this.scroll.maxScrollY-10);
          const that=this;
          this.scroll.on('touchEnd',function (pos) {
            if (pos.y > 50) {
              that.progressShow=true;
              let timer=setTimeout(function () {
                that.getMoreMemory();
                clearTimeout(timer);
              },750);
            }
          });
        },
        getMoreMemory(){
          const that=this;
          that.memoryNum+=8;
          socket.emit('getMemory',{
            friendAccount:that.talker,
            num:that.memoryNum
          },function () {
            that.$nextTick(() => {
              that.initScroll();
            });
            that.progressShow=false;
          });
        }
      }
    }
</script>

<style scoped>
  .wrapper{
    position: relative;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  .progress{
    margin-bottom: 8px;
  }
</style>
