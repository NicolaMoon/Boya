<template>
    <mu-paper z-depth="8" class="bottom-nav">
      <mu-button icon slot="left">
        <mu-icon value="filter_list"></mu-icon>
      </mu-button>
      <mu-text-field placeholder="输入" v-model="msg" multi-line :rows-max="6" :rows="1" action-icon="send" :action-click="sendMsg" underline_color="#474a4f" solo></mu-text-field>
    </mu-paper>
</template>

<script>
  import socket from '../socket';
    export default {
        name: "TalkingBottomNav",
      props:['userdata','talker'],
      data(){
        return{
          msg:''
        }
      },
      methods:{
          sendMsg(){
            const that=this;
            if(this.msg!=''){
              socket.emit('sendMsg',{
                talker:this.talker,
                msg:this.msg
              });
              socket.on('gotMsg',function (data) {
                if(data.flag === true){
                  socket.emit('getMemory',{
                    friendAccount:that.talker
                  });
                  that.msg='';
                }
              })
            }
          }
      }
    }
</script>

<style scoped>

</style>
