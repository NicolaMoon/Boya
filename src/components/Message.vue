<template>
  <div>
    <app-bar></app-bar>
    <mu-list class="space">
      <div v-for="item in msgdata" :key="item.id" @click="sendMsg(item)">
        <mu-list-item avatar :ripple="false" button to="/talking">
          <mu-list-item-action>
            <mu-avatar>
              <img src="../assets/logo.png">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>
              {{item.name}}
            </mu-list-item-title>
            <mu-list-item-sub-title>
              {{(item.lastMsg.talker==userdata.username)?'我':item.lastMsg.talker}}：
              {{item.lastMsg.msg}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>{{item.lastMsg.time}}</mu-list-item-after-text>
            <mu-badge :content="item.nonRead" circle color="#ff526c" v-show="(item.nonRead>0)">
            </mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
      <bottom-nav></bottom-nav>
    </mu-list>
  </div>
</template>

<script>
    import AppBar from "./AppBar";
    import BottomNav from "./BottomNav";
    export default {
        name: "Message",
      components: {BottomNav, AppBar},
      props:['msgdata','userdata'],
      data(){
          return {}
        },
      methods:{
          sendMsg(data){
            setTimeout(()=>{
              this.$root.Bus.$emit('tABListenToMessage',data.name);
              this.$root.Bus.$emit('talkingListenToMessage',data.id);
            },100)
          }
      }
    }
</script>

<style scoped>
</style>
