<template>
  <mu-appbar style="width: 100%;" color="#474a4f" class="app-bar" :title="talkerName">
    <mu-button icon slot="left" to="/message">
      <mu-icon size="24" value="keyboard_arrow_left"></mu-icon>
    </mu-button>
    <mu-button icon slot="right">
      <mu-icon size="24" value="more_horiz"></mu-icon>
    </mu-button>
  </mu-appbar>
</template>

<script>
    export default {
        name: "TalkingAppBar",
      data(){
          return{
            talkerName:""
          }
      },
      beforeCreate(){
        this.$root.Bus.$on("tABListenToMessage",(data) => {
            this.talkerName=data;
          })
      },
      beforeDestroy(){
        this.$root.Bus.$off("tABListenToMessage");
      }
    }
</script>

<style scoped>
</style>
