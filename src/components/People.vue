<template>
  <div>
    <app-bar></app-bar>
    <div class="space">
      <mu-tabs :value.sync="active" center color="#fafafa">
        <mu-tab>
          <mu-icon value="person_outline" color="#737373"></mu-icon>
          好友
        </mu-tab>
        <mu-tab>
          <mu-icon value="people_outline" color="#737373"></mu-icon>
          群组
        </mu-tab>
        <mu-tab>
          <mu-icon value="face" color="#737373"></mu-icon>
          公众号
        </mu-tab>
      </mu-tabs>
      <mu-list v-if="active === 0">
        <mu-list-item v-for="group in groupdata" :key="group.id" button :ripple="false" nested :open="open === group.groupName" @click="open=(open===group.groupName)?'':group.groupName">
          <mu-list-item-action>
            <mu-icon value="people"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{group.groupName}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text>{{group.onlineNum}}/{{group.peopleNum}}</mu-list-item-after-text>
            <mu-icon size="24" value="keyboard_arrow_up" v-if="open === group.groupName"></mu-icon>
            <mu-icon size="24" value="keyboard_arrow_down" v-else></mu-icon>
          </mu-list-item-action>
          <mu-list-item v-for="people in group.peopleList" :key="people.id" avatar button :ripple="false" slot="nested" @click="sendMsg(people.name)" to="/otherPerson">
            <mu-list-item-action>
              <mu-avatar>
                <img src="../assets/logo.png">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{people.name}}</mu-list-item-title>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
      <mu-list v-if="active === 1">
        <mu-divider></mu-divider>
        <div v-for="crowd in crowdList" :key="crowd.id">
          <mu-list-item avatar button :ripple="false" @click="sendMsg(crowd.name)" to="/otherPerson">
            <mu-list-item-action>
              <mu-avatar>
                <img src="../assets/logo.png">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{crowd.name}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
      <mu-list v-if="active === 2">
        <mu-divider></mu-divider>
        <div v-for="office in officeList" :key="office.id">
          <mu-list-item avatar button :ripple="false" @click="sendMsg(office.name)" to="/otherPerson">
            <mu-list-item-action>
              <mu-avatar>
                <img src="../assets/logo.png">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{office.name}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </div>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
    import AppBar from "./AppBar";
    import BottomNav from "./BottomNav";
    export default {
        name: "People",
      components: {BottomNav, AppBar},
      props:['groupdata'],
      data(){
          return {
            open: '',
            active:0,
            crowdList:[
              {
                id:"24512",
                name:"葬爱家族"
              },
              {
                id:"23445",
                name:"杀马特世家"
              },
              {
                id:"32451",
                name:"脱贫致富"
              }
            ],
            officeList:[
              {
                id:"000001",
                name:"子期"
              },
              {
                id:"000002",
                name:"伯牙"
              }
            ]
          }
        },
      methods:{
          sendMsg(name){
            setTimeout(()=>{
              this.$root.Bus.$emit('oPListenToPeople',name);
            },100);
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
