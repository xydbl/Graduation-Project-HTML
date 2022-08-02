import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const actions={
    // isLogin(context,value){

    // }
}
const mutations={
    UPDATAUSER(state,value){
        state.user.userName=value.userName
        state.user.passWord=value.passWord
    },
    UPDATAISLOGIN(state,value){
        state.user.isLogin=value
    }
}
const state={
    user:{
        userName:'',
        passWord:'',
        phone:'',
        email:'',
        birthday:'',
        //  昵称
        nickname:'',
        // 个性签名
        signature:'',
        // 登录状态
        isLogin:false,

    }
}
const getters={}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})