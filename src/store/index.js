import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

// 用户相关
const userOptions={
    namespaced:true,
    actions:{},
    mutations:{
        // 获取 / 更新用户信息
        UPDATAUSER(state,value){
            // console.log(value);
            state.user.uid=value.uid
            state.user.userName=value.username
            state.user.passWord=value.password
            state.user.email=value.email
            state.user.phone=value.phone
            state.user.birthday=value.birthday
            state.user.nickname=value.nickname
            state.user.signature=value.signature
            state.user.image=value.image
        },
        // 退出登录
        // 更新登录状态
        UPDATAISLOGIN(state,value){
            state.user.isLogin=value
            state.user.uid=''
            state.user.userName=''
            state.user.passWord=''
            state.user.phone=''
            state.user.email=''
            state.user.birthday=''
            state.user.nickname=''
            state.user.signature=''
            state.user.image=''

        },
        // 是否以游客登录
        TOURISTS(state,value){
            state.user.isTouristsLogin=value
        },
        // 更新用户数据
        UPDATEUSERMESSAGE(state){
            // console.log(this);
            axios.get(`http://localhost:8081/api/user/findById/${state.user.uid}`)
            .then(res=>{
                state.user.userName=res.data.username
                state.user.passWord=res.data.password
                state.user.email=res.data.email
                state.user.phone=res.data.phone
                state.user.birthday=res.data.birthday
                state.user.nickname=res.data.nickname
                state.user.signature=res.data.signature
                state.user.image=res.data.image
            },
            error=>{
                console.log(error.message);
            })
        },
        // 获取当前博客博主信息
        GETBLOGUSERMESSAGE(state,value){
            axios.get(`http://localhost:8081/api/blog/findUserByBid/${value}`)
            .then(res=>{
                state.blogUser= res.data
            },
            error=>{
                console.log(error.message);
            })
        }
    },
    state:{
        user:{
            uid:'',
            userName:'',
            passWord:'',
            phone:'',
            email:'',
            birthday:'',
            //  昵称
            nickname:'xx',
            // 个性签名
            signature:'nssb',
            // 头像
            image:'',
            // 登录状态
            isLogin:false,
            // 是否以游客身份登录
            isTouristsLogin:false
        },
        blogUser:{}
    },
    getters:{}
}
// 博客相关
const blogOptions={
    namespaced:true,
    actions:{},
    mutations:{
        // 博客列表分页
        // 正在创建 编辑的博客的id
        UPDATEBID(state,value){
            state.bid=value
        },
        // 查询我的博客列表
        GETMYBLOGLIST(state,value){
            axios.get(`http://localhost:8081/api/blog/findByUid/${value}`)
            .then(res=>{
                state.myBlogList= res.data
                // console.log(res.data);
                // console.log(new Date(res.data[0].btime).getTime());
            },error=>{
                console.log(error.message);
            })
        },
        // 对myblogList中的数据进行处理
        SETMYBLOGLISTTIME(state){
            state.myBlogList.forEach(li => {
                li.btime=new Date(li.btime).getFullYear()
            });
        },
        // 正在查看的博客
        CURRENTBLOG(state,value){
            axios.get(`http://localhost:8081/api/blog/findByBid/${value}`)
            .then(res=>{
                state.blog= res.data
            })
        }
    },
    state:{
        // 博客列表
        blogList:[],
        // 我的博客列表
        myBlogList:[],
        // 正在查看的博客
        blog:[],
        // 正在创建 编辑的blog的id
        bid:'',
        blogOne:{}
    },
    getters:{}
}
// 评论相关
const commentaryOptions={
    namespaced:true,
    actions:{},
    mutations:{
        AUDITCBID(state,value){
            state.cbid=value
        },
        // 查看当前博客的所有评论
        //  仅仅在审核评论时使用
        CURRENTCOMMENTARY(state,value){
            axios.get(`http://localhost:8081/api/commentary/findById/${value}`)
            .then(res=>{
                state.commentaryList=res.data
            },error=>{
                console.log(error.message);
            })
        },
        // 展示博客时调用
        COMMENTARYBLOG(state,value){
            state.commentaryList=value
        }
    },
    state:{
        // 审核评论所属的博客
        cbid:'',
        // 当前查看博客的评论列表
        commentaryList:[],
        // 当前博客通过审核的评论
        // approvedCommentaryList:[]
        // 为通过审核的评论
    },
    getters:{}
}
export default new Vuex.Store({
    modules:{
        userOptions,
        blogOptions,
        commentaryOptions
    }
})