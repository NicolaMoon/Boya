<template>
  <div id="app">
    <router-view :userdata="userInfo" :msgdata="msgList" :groupdata="groupList" :crowddata="crowdList" :crowdmsg="crowdMsg"/>
  </div>
</template>

<script>
  import socket from './socket'
export default {
  name: 'App',
  data(){
    return{
      userInfo:{},
      msgList:[],
      groupList:[],
      crowdList: [],
      crowdMsg: []
    }
  },
  mounted(){
    this.$root.Bus.$on('appListenToLogin',(data)=>{
        this.userInfo=data;
    });
    socket.on('getMsgList',(data) => {
        this.msgList=data.msgList;
    });
    socket.on('getGroupList',(data) => {
      this.groupList=data.groupList;
    });
    socket.on('getCrowdList',(data) => {
      this.crowdList=data.crowdList;
    });
    socket.on('getCrowdMsgList',(data) => {
      this.crowdMsg=data.crowdMsg;
    });
    socket.on('changeOnline',(data) => {
      console.log(data.flag);
      for(var item of this.groupList){
        if(item.id === data.groupId){
          if(data.flag === 0){
            item.onlineNum-=1;
          }else if(data.flag === 1){
            item.onlineNum+=1;
          }
        }
      }
    });
    socket.on('changeMsgList',() => {
      socket.emit('wantMsgList');
    });
    socket.on('changeCrowdMsg',() => {
      socket.emit('wantCrowdMsg');
    });
  },
  beforeDestroy(){
    this.$root.Bus.$off('appListenToLogin');
  }
}
</script>

<style>
  /*给AppBar和BottomNav留出空间*/
  .space{
    padding-top:56px ;
    padding-bottom: 56px;
  }
  /*将BottomNav相对视窗固定*/
  .bottom-nav{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index:1000;
  }
  /*将AppBar相对视窗固定*/
  .app-bar{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1000;
  }
  /*设置头部导航栏背景*/
  .app-bar-bg{
    background-image: url("assets/images/AppBarBg2.jpeg");
    background-repeat: no-repeat;
  }
  /*人物面板头像栏背景*/
  .person-card{
    position: fixed;
    z-index: 1000;
    top: 56px;
    background-image: url("assets/images/AppBarBg2.jpeg");
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
</style>
