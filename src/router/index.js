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
import Collect from '../page/Collect.vue'


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
            name:'blog',
            path:'/blog',
            component:Blog,
            props($route){
                return{
                    bid:$route.params.bid,
                    btitle:$route.params.btitle,
                    btype:$route.params.btype,
                    bcontent:$route.params.bcontent,
                    btime:$route.params.btime
                }
            }
        },
        // 用户查看博主信息
        {
            path:'/showUsr',
            name:'showUsr',
            component:ShowUsrInfo,
            props($route){
                return{
                    uid:$route.params.uid,
                    username:$route.params.username,
                    image:$route.params.image
                }
            }
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
                    name:'editblog',
                    path:'editblog',
                    component:EditBlog,
                    meta:{isAuth:true},
                    props($route){
                        return {
                            bid:$route.params.bid,
                            btitle:$route.params.btitle,
                            btype:$route.params.btype,
                            bimg:$route.params.bimage,
                            bcontent:$route.params.bcontent
                        }
                    }
                },
                //  审核评论
                {
                    name:'audit',
                    path:'audit',
                    component:Audit,
                    meta:{isAuth:true},
                    children:[
                        {
                            name:'approved',
                            path:'approved',
                            component:Approved,
                            meta:{isAuth:true}
                        },
                        {
                            name:'notApproved',
                            path:'notApproved',
                            component:NotApproved,
                            meta:{isAuth:true},
                            props($route){
                            return {
                                bid:$route.params.bid,
                            }
                    },
                        }
                    ]
                },
                // 
                {
                    path:'collect',
                    name:'collect',
                    component:Collect,
                    meta:{isAuth:true}
                },
                // // 历史记录
                // {
                //     path:'history',
                //     component:HistoryRecord,
                //     meta:{isAuth:true}
                // }
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
            if(to.fullPath=='/personalcenter'){
                next('/personalcenter/pushblog')
            }else{
                next()
            }
        }else{
            alert('权限不足')
        }
    }else{
        // if(to.fullPath=='/blog' && from.fullPath!='/frontPage'){
        //     next('/frontPage')
        // }
        if(to.fullPath=='/showUsr'&&from.fullPath=='/frontPage'){
            next('/frontPage')
        }else{
            next() 
        }
    }
    
})

router.afterEach((to, from) => {
    // to and from are both route objects.
    if(from.fullPath=='/editing'){
        sessionStorage.setItem('editing','')
    }
    if(from.fullPath=='/blog'){
        sessionStorage.setItem("getbid",'')
    }
    if(from.fullPath=='/showUsr'){
        sessionStorage.setItem('uid','')
    }
    if (from.fullPath=='/personalcenter/editblog') {
        sessionStorage.setItem('editBlog','')
        sessionStorage.setItem('isEdit','')
    }
    if(to.fullPath=='/setting/accountSetting'&&from.fullPath=='/setting/accountSetting/settingPassWord'){
    }else if(to.fullPath=='/setting/accountSetting/settingPassWord'&&from.fullPath=='/setting/accountSetting'){    
    }
    else{
        window.scrollTo(0,0)
    }
    if(to.fullPath!='/personalcenter/audit/notApproved'
        && to.fullPath!='/personalcenter/audit/Approved' 
        && to.fullPath!='/personalcenter/audit' && to.fullPath!='/editing' 
        && to.fullPath!='/personalcenter/history'){
            sessionStorage.setItem('abid','')
    }
})
export default router