<template>
  <div>
    <other-person-app-bar></other-person-app-bar>
    <mu-card class="person-card">
      <mu-card-header :title="itsData.name" :sub-title="itsData.motto">
        <mu-avatar slot="avatar" size="60">
          <img src="../assets/logo.png">
        </mu-avatar>
      </mu-card-header>
    </mu-card>
    <mu-list class="space">
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="edit"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>此人信息</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon size="24" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="book"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>Ta的空间</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon size="24" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <other-person-bottom-nav></other-person-bottom-nav>
  </div>
</template>

<script>
  import OtherPersonAppBar from "./OtherPersonAppBar";
  import OtherPersonBottomNav from "./OtherPersonBottomNav";
  export default {
    name: "OtherPerson",
    components: {OtherPersonBottomNav, OtherPersonAppBar},
    data() {
      return{
        itsData:{
          name:"",
          motto:""
        }
      }
    },
    beforeCreate(){
      this.$root.Bus.$on("oPListenToPeople",(data) => {
        this.itsData.name=data;
      });
    },
    beforeDestroy(){
      this.$root.Bus.$off("oPListenToPeople");
    }
  }
</script>

<style scoped>
  .space{
    padding-top: 153px;
  }
  .mu-card-title{
    font-size: 24px;
  }
  .mu-card-sub-title{
    height: 21px;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
</style>

