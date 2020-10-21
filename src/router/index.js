import Vue from 'vue'
import Router from 'vue-router'
import ContactHome from '../views/ContactHome.vue'
import ContactDetail from '../views/ContactDetail.vue'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name: 'Contacts Home',
            component: ContactHome
        },
        {
            path:'/:id',
            name:'Contact Detail',
            component: ContactDetail
        }
    ]
})
