<template>
  <div class="my-word">
    <mu-row>
      <mu-col span="10">
        <mu-row>
          <mu-col span="1" offset="8" class="subtitle">{{data.time}}</mu-col>
          <mu-col span="2" offset="1">{{data.name}}</mu-col>
        </mu-row>
        <mu-row>
          <mu-col span="10" offset="2">
            <div class="word">
              {{data.msg}}
            </div>
          </mu-col>
        </mu-row>
      </mu-col>
      <mu-col span="2">
        <mu-avatar>
          <img src="../assets/logo.png">
        </mu-avatar>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
    export default {
        name: "MyWord",
      props:['data'],
      data(){
          return{
          }
      }
    }
</script>

<style scoped>
  .my-word{
    margin-top: 10px;
  }
  .subtitle{
    color: #707070;
  }
  .word{
    float: right;
    display: inline-block;
    position: relative;
    padding: 5px;
    border-radius: 4px;
    margin-right: 10px;
    padding-left: 8px;
    background-color: #2196f3;
    color: #fff;
    font-size: 16px;
  }
  .word::after{
    content: '';
    width:0px;
    height:0px;
    border-top: 6px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    border-left: 6px solid #2196f3;
    position: absolute;
    top: 4px;
    right: -6px;
  }
</style>
