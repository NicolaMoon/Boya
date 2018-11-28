<template>
    <div class="bgImg">
      <mu-container class="space">
        <mu-paper class="paper">
          <mu-row justify-content="center">
            <mu-avatar size="72" color="#cac7bf">
              <!--<img src="../assets/logo.png">-->
              BY
            </mu-avatar>
          </mu-row>
          <mu-form ref="form" class="margin-top" :model="validateForm">
            <mu-form-item prop="account" :rules="accountRules" icon="person">
              <mu-text-field color="#252523" placeholder="账号" v-model="validateForm.account" prop="account"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="password" :rules="passwordRules" icon="vpn_key">
              <mu-text-field type="password" color="#252523" placeholder="密码" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
          </mu-form>
        </mu-paper>

        <mu-alert color="rgba(37,37,35,.6)" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
          <mu-icon left value="warning"></mu-icon>{{alertMsg}}
        </mu-alert>

        <div class="bottom-nav">
          <mu-row>
            <mu-col span="6">
              <mu-button full-width color="#b3b0a7" @click="clear">
                取消
                <mu-icon right value="delete"></mu-icon>
              </mu-button>
            </mu-col>
            <mu-col span="6">
              <mu-button full-width color="#252523" @click="submit">
                登录
                <mu-icon right value="send"></mu-icon>
              </mu-button>
            </mu-col>
          </mu-row>
          <mu-button full-width @click="openBotttomSheet">
            <mu-icon right value="more_horiz"></mu-icon>
          </mu-button>
          <mu-bottom-sheet :open.sync="open">
            <mu-list>
              <mu-sub-header>其他操作</mu-sub-header>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="account_circle" color="cyan"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>注册</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="edit" color="red"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>修改密码</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="search" color="yellow"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>找回密码</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-bottom-sheet>
        </div>
      </mu-container>
    </div>
</template>

<script>
  import socket from '../socket'
    export default {
        name: "Login",
      data () {
        return {
          open: false,
          alert1:false,
          alertMsg:'',
          accountRules: [
            { validate: (val) => !!val, message: '*必填项'},
            { validate: (val) => val.length >= 6, message: '账号长度大于5'}
          ],
          passwordRules: [
            { validate: (val) => !!val, message: '*必填项'},
            { validate: (val) => val.length >= 6 && val.length <= 15, message: '密码长度6~15'}
          ],
          validateForm:{
            account:'',
            password:''
          }
        }
      },
      created(){
        const that = this;
        socket.on('sureLogin',function (data) {
          if(data.flag === true){
            that.$root.Bus.$emit('appListenToLogin',data.userInfo);
            that.$router.push({path:'/message'});
          }else{
            that.alertMsg=data.msg;
            that.alert1=true;
            let timer1=setTimeout(function(){
              that.alert1=false;
              clearTimeout(timer1);
            },3500);
          }
        })
      },
      mounted(){
        this.resizeBg();
      },
      methods: {
        resizeBg(){
          var clientHeight=window.innerHeight;
          var wrapper=document.getElementsByClassName('bgImg')[0];
          wrapper.style.cssText="min-height:"+(clientHeight-72)+"px";
        },
        submit () {
          this.$refs.form.validate().then((result) => {
            if(result === true){
              socket.emit('login',this.validateForm);
            }
          });
        },
        clear () {
          this.$refs.form.clear();
          this.validateForm = {
            account: '',
            password: ''
          };
        },
        closeBottomSheet () {
          this.open = false;
        },
        openBotttomSheet () {
          this.open = true;
        }
      }
    }
</script>

<style scoped>
  .bgImg{
    min-height:408px;
    background-image: url("../assets/images/LoginBg2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position-y: -72px;
  }
  .paper{
    background-color: rgba(255,255,255,0);
  }
  .margin-top{
    margin-top: 12px;
  }
  .mu-button{
    border-radius: 0px;
  }
  .mu-form-item__focus{
    color:#252523;
  }
</style>
