<template>
  <div>
    <app-bar></app-bar>
    <mu-card class="person-card">
      <mu-card-header :title="userdata.username" :sub-title="myData.motto">
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
        <mu-list-item-title>个人信息</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon size="24" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button>
        <mu-list-item-action>
          <mu-icon value="book"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>我的日志</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon size="24" value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
    import AppBar from "./AppBar";
    import BottomNav from "./BottomNav";
    export default {
        name: "Person",
      components: {BottomNav, AppBar},
      props:['userdata'],
      data() {
        return{
          myData:{
            name:"荀奂",
            motto:"生有涯而知无涯，行有疆而乐无疆"
          }
        }
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
