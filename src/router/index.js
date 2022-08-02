import VueRouter from 'vue-router'
import Login from '../page/Login.vue'
import Register from '../page/Register.vue'
import SelectUser from '../page/SelectUser.vue'
import FrontPage from '../components/FrontPage.vue'
import Setting from '../page/Setting.vue'
import AccountSetting from '../page/AccountSetting.vue'
import PersonalInformation from '../components/PersonalInformation.vue'
import SettingPassWord from '../components/SettingPassWord.vue'

const router= new VueRouter({
    routes:[
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        // 首页
        {
            path:'/frontPage',
            component:FrontPage
        },
        // 设置
        {
            path:'/setting',
            component:Setting,
            children:[
                {
                    path:'accountSetting',
                    // name:'',
                    component:AccountSetting,
                    children:[{
                        path:'settingPassWord',
                        component:SettingPassWord
                    }]
                },
                {
                    path:'personalInformation',
                    component:PersonalInformation
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    next()
})

router.afterEach((to, from) => {
    // to and from are both route objects.
})
export default router