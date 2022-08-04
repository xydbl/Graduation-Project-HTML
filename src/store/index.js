import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

// 用户相关
const userOptions={
    namespaced:true,
    actions:{},
    mutations:{
        // 获取 / 更新用户信息
        UPDATAUSER(state,value){
            // console.log(value);
            state.user.userName=value.username
            state.user.passWord=value.password
            state.user.email=value.email
            state.user.phone=value.phone
            state.user.birthday=value.birthday
            state.user.nickname=value.nickname
            state.user.signature=value.signature
        },
        // 退出登录
        // 更新登录状态
        UPDATAISLOGIN(state,value){
            state.user.isLogin=value
        },
        // 是否以游客登录
        TOURISTS(state,value){
            state.user.isTouristsLogin=value
        }
    },
    state:{
        user:{
            userName:'',
            passWord:'',
            phone:'',
            email:'',
            birthday:'',
            //  昵称
            nickname:'xx',
            // 个性签名
            signature:'nssb',
            // 登录状态
            isLogin:false,
            // 是否以游客身份登录
            isTouristsLogin:false
        }
    },
    getters:{}
}
// 博客相关
const blogOptions={
    namespaced:true,
    actions:{},
    mutations:{},
    state:{
        // 博客列表
        blogList:[],
        // 
        myBlog:[]
    },
    getters:{}
}
// 评论相关
const commentaryOptions={
    namespaced:true,
    actions:{},
    mutations:{},
    state:{},
    getters:{}
}
export default new Vuex.Store({
    modules:{
        userOptions,
        blogOptions,
        commentaryOptions
    }
})