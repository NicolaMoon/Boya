<template>
    <mu-bottom-nav :value.sync="shift" shift color="#474a4f" class="bottom-nav">
      <mu-bottom-nav-item value="people" title="好友" icon="people" to="/people"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="messages" title="消息" icon="mode_comment" to="/message"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="person" title="个人" icon="person" to="/person"></mu-bottom-nav-item>
    </mu-bottom-nav>
</template>

<script>
    export default {
        name: "BottomNav",
        data () {
          return {
            shift: 'messages'
           }
        },
      created(){
          var test=window.location.hash;
          if(test==="#/people"){
            this.shift="people";
          }else if(test==="#/person"){
            this.shift="person";
          }else{
            this.shift="messages";
          }
      }
    }
</script>

<style scoped>
</style>
