<template>
  <div class="my-word">
    <mu-row>
      <mu-col span="2">
        <mu-avatar>
          <img src="../assets/logo.png">
        </mu-avatar>
      </mu-col>
      <mu-col span="10">
        <mu-row>
          <mu-col span="2">{{data.name}}</mu-col>
          <mu-col span="1" class="subtitle">{{data.time}}</mu-col>
        </mu-row>
        <mu-row>
          <mu-col span="10">
            <div class="word">
              {{data.msg}}
            </div>
          </mu-col>
        </mu-row>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
    export default {
        name: "OthersWord",
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
    display: inline-block;
    position: relative;
    padding: 5px;
    border-radius: 4px;
    margin-right: 10px;
    padding-left: 8px;
    background-color: #757575;
    color: #fff;
    font-size: 16px;
  }
  .word::before{
    content: '';
    width:0px;
    height:0px;
    border-top: 6px solid #fafafa;
    border-bottom: 6px solid #fafafa;
    border-right: 6px solid #757575;
    position: absolute;
    top: 4px;
    left: -6px;
  }
</style>
