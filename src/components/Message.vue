<template>
  <div>
    <app-bar></app-bar>
    <mu-list class="space">
      <mu-tabs :value.sync="active" center color="#fafafa">
        <mu-tab>
          <mu-icon value="sms" color="#737373"></mu-icon>
          私信
        </mu-tab>
        <mu-tab>
          <mu-icon value="forum" color="#737373"></mu-icon>
          群组
        </mu-tab>
        <mu-tab>
          <mu-icon value="comment" color="#737373"></mu-icon>
          公众号
        </mu-tab>
      </mu-tabs>
      <div v-if="active === 0">
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
      </div>
      <div v-if="active === 1">
        <div v-for="item in crowdmsg" :key="item.id" @click="sendMsg2(item);">
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
      props:['msgdata','userdata','crowdmsg'],
      data(){
          return {
            active:0
          }
        },
      methods:{
        sendMsg(data){
          var timer=setTimeout(()=>{
            this.$root.Bus.$emit('tABListenToMessage',data.name);
            this.$root.Bus.$emit('talkingListenToMessage',data.id);
            clearTimeout(timer);
          },100)
        },
        sendMsg2(data){
          var timer=setTimeout(()=>{
            this.$root.Bus.$emit('tABListenToMessage',data.name);
            this.$root.Bus.$emit('talkingListenToMessage2',{
              id:data.id,
              type:1
            });
            clearTimeout(timer);
          },100)
        }
      }
    }
</script>

<style scoped>
  .mu-tabs{
    color:#202020;
  }
  .mu-tab-active {
    color: #ff4081;
  }
</style>
