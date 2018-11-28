import Vue from 'vue'
import Router from 'vue-router'
import Message from '@/components/Message'
import People from '@/components/People'
import  Person from '@/components/Person'
import Talking from '@/components/Talking'
import OtherPerson from '@/components/OtherPerson'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/talking',
      name: 'Talking',
      component: Talking
    },
    {
      path: '/otherPerson',
      name: 'OtherPerson',
      component: OtherPerson
    }
  ]
})
