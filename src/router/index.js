import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
// import SelectUser from '../page/SelectUser.vue'
import FrontPage from '../page/FrontPage.vue'
import Setting from '../page/Setting.vue'
import AccountSetting from '../page/AccountSetting.vue'
import PersonalInformation from '../components/PersonalInformation.vue'
import SettingPassWord from '../components/SettingPassWord.vue'
import Editing from '../components/Editing.vue'
import PersonalCenter from '../page/PersonalCenter.vue'
import MyPushBlog from '../page/MyPushBlog.vue'
import EditBlog from '../components/EditBlog.vue'
import Audit from '../page/Audit.vue'
import HistoryRecord from '../page/HistoryRecord.vue'
import Approved from '../components/Approved.vue'
import NotApproved from '../components/NotApproved.vue'
import Blog from '../page/Blog.vue'
import UploadImage from '../components/UploadImage.vue'
import ShowUsrInfo from '../page/ShowUsrInfo.vue'

const router= new VueRouter({
    routes:[
        // 默认
        {
            path:'/',
            redirect:'/frontPage'
        },
        // 登录
        {
            path:'/login',
            component:Login,
        },
        // 注册
        {
            path:'/register',
            component:Register
        },
        // 首页
        {
            path:'/frontPage',
            component:FrontPage
        },
        // 博客页面
        {
            path:'/blog',
            component:Blog,
            props($route){
                return{
                    bid:$route.query.bid,
                    btitle:$route.query.btitle,
                    btype:$route.query.btype,
                    bcontent:$route.query.bcontent,
                    btime:$route.query.btime
                }
            }
        },
        // 用户查看博主信息
        {
            path:'/showUsr',
            component:ShowUsrInfo
        },
        // 设置
        {
            path:'/setting',
            component:Setting,
            meta:{isAuth:true},
            children:[
                // 上传用户图片
                {
                    path:'uploadimage',
                    component:UploadImage,
                    meta:{isAuth:true}
                },
                {
                    path:'accountSetting',
                    // name:'',
                    component:AccountSetting,
                    meta:{isAuth:true},// 鉴权
                    children:[{
                        path:'settingPassWord',
                        component:SettingPassWord,
                        meta:{isAuth:true}
                    }]
                },
                {
                    path:'personalInformation',
                    component:PersonalInformation,
                    meta:{isAuth:true}
                }
            ]
        },
        // 发布博客
        {
            path:'/editing',
            component:Editing,
            meta:{isAuth:true}
        },
        // 个人中心
        {
            path:'/personalcenter',
            component:PersonalCenter,
            meta:{isAuth:true},
            children:[
                // 我发布的博客
                {
                    path:'pushblog',
                    component:MyPushBlog,
                    meta:{isAuth:true}
                },
                // 修改博客
                {
                    path:'editblog',
                    component:EditBlog,
                    meta:{isAuth:true},
                    props($route){
                        return {
                            bid:$route.query.bid,
                            btitle:$route.query.btitle,
                            btype:$route.query.btype,
                            bimg:$route.query.bimage,
                            bcontent:$route.query.bcontent
                        }
                    }
                },
                //  审核评论
                {
                    path:'audit',
                    component:Audit,
                    meta:{isAuth:true},
                    props($route){
                        return {
                            bid:$route.query.bid,
                        }
                    },
                    children:[
                        {
                            path:'approved',
                            component:Approved,
                            meta:{isAuth:true}
                        },
                        {
                            path:'notApproved',
                            component:NotApproved,
                            meta:{isAuth:true}
                        }
                    ]
                },
                // 历史记录
                {
                    path:'history',
                    component:HistoryRecord,
                    meta:{isAuth:true}
                }
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if(to.meta.isAuth){
        if(localStorage.getItem('username')!=''&&
        localStorage.getItem('username')!=null&&
        localStorage.getItem('isLoginOut')!='false'){
            next()
        }else{
            alert('权限不足')
        }
    }else{
       next() 
    }
    
})

router.afterEach((to, from) => {
    // to and from are both route objects.
    if(from.fullPath=='/editing'){
        sessionStorage.setItem('editing','')
    }
    if(to.fullPath=='/setting/accountSetting'&&from.fullPath=='/setting/accountSetting/settingPassWord'){
    }else if(to.fullPath=='/setting/accountSetting/settingPassWord'&&from.fullPath=='/setting/accountSetting'){    
    }
    else{
        window.scrollTo(0,0)
    }
})
export default router