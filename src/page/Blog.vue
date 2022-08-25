<template>
  <div class="bbody">
    <div class="bmain">
      <div style="border-bottom: 1px solid red; width:630px">
        <!-- 标题 -->
        <h1>{{btitle||blog.btitle}}</h1>
        <span style="position: relative; left: 10px;bottom: 5px;">
          发布人：
          <router-link replace :to="{
            name:'showUsr',
            params:{
              uid:this.blogUser.uid,
              username:username,
              image:this.blogUser.image
            }
            }">{{username}}</router-link>
        </span>
        <el-button type="warning" icon="el-icon-star-off" circle style="position:relative;left:450px;top:-40px" @click="collectBlog" size="mini"></el-button>
        <span style="position: relative; left: 230px;bottom: 5px;">发布时间：2020-08-09 07:25:33</span>
      </div>
	    <!-- 正文 -->
      <div>
        <div v-html="compiledMarkdown" v-highlight></div>
	    </div>
      <!-- 评论 -->
      <div style="position: relative;border-bottom: 1px solid #7E8388;top:20px">
        <el-badge :value="commNum" :max="99" class="item" style="font-size: 20px;">
          评论
        </el-badge>
      </div>
      <div class="botm">
        <div>
			    <input type="text" placeholder="进行评论" v-model="commentary" style="margin-bottom:10px;"><button @click="sendComm">发表评论</button>
		    </div>
        <div style="margin-left:20px;margin-top:10px;border-bottom:1px solid black" v-for=" comm in list" :key="comm.cid">
          <div>
            <h2>{{comm.messageId}}</h2>
            <p>&nbsp&nbsp{{comm.message}}</p>
            <div style="text-align:left;">
              <span style="margin-bottom:10px;">{{comm.ctime}}</span>
              <span >
                <img v-if="comm.isD" src="../assets/Active.png" alt="" @click="delD(comm.did)" style="width:20px;height:20px;margin-left:10px;cursor: pointer;">
                <img v-if="!comm.isD" src="../assets/White.png" alt="" @click="addD(comm.cid)" style="width:20px;height:20px;margin-left:10px;cursor: pointer;">
              </span>
              <span style="margin-left:6px">{{comm.list.length}}</span>
              <span class="reply" @click="startReply(comm.cid)">回复</span>
              <span class="lookcomm" v-if="comm.replyList.length!=0" @click="lookReply(comm)">查看/收起</span>
              <div class="replybox1" v-if="comm.isLook" v-for="li in comm.replyList">
                <span style="font-size:18px;">&nbsp&nbsp{{li.husr||'游客'}}</span><br>
                <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{li.hmessage}}</span>
              </div>
            </div>
            <div></div>
          </div>
          <!-- <ul>
            <li v-for=" comm in list" :key="comm.cid"><span>{{comm.messageId}}</span><br><br>{{comm.message}}<br><span style="font-size:10px">评论时间:{{comm.ctime}}</span></li>
          </ul> -->
        </div>
        <div class="reply1" v-if="isReply">
          <input type="text" placeholder="请输入要回复的内容" v-model="hMessage" ref="reply"><button @click="endReply">取消</button>
          <button @click="replyMsg">回复</button>
        </div>
        <div class="scrolling">
          <el-button size="mini" v-if="isScroll" @click="backTop" type="info">返回顶部</el-button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {marked} from 'marked'
// import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
export default {
    name:'Blog',
    data() {
      return {
        // 发表评论
        commentary:'',
        username:'',
        content:'',
        // repMsg:'',
        isReply:false,
        // 回复信息
        hMessage:'',
        // 回复的评论id cid
        cid:'',
        // 评论列表
        list:[],
        // 评论数
        commNum:'',
        isScroll:false
      }
    },
    props:["bid","btype",'btitle','bcontent','btime'],
    methods:{
      // 获取博主信息
      ...mapMutations("userOptions",{getBlogUserMessage:'GETBLOGUSERMESSAGE'}),
      ...mapMutations("blogOptions",{currentBlog:'CURRENTBLOG'}),
      // 获取评论
      // ...mapMutations('commentaryOptions',{currentCommentary:'CURRENTCOMMENTARY',commentaryBlog:'COMMENTARYBLOG'}),

      // 获取评论 包含点赞等信息
      getComm(){
        let nanoid=sessionStorage.getItem('nanoid')
        let username=localStorage.getItem("username")
        // console.log(username,this.blog.bid,this.bid);
        this.$axios.post('http://localhost:8081/api/commentary/findByBid',{
          bid:this.bid||this.blog.bid,
          s:this.user.userName||username||nanoid
        }).then(res=>{
          // console.log(res.data);
          this.list=res.data
        },
        error=>{
          console.log(error.message);
        })
      },
      // 发送评论
      sendComm(){
        if(this.commentary!=''){
          this.$axios.post('http://localhost:8081/api/commentary/add',{
            message:this.commentary,
            messageId:this.user.uid,
            ctime:new Date(),
            ctype:0,
            clogId:this.blog.bid||this.bid
          }).then(res=>{
            this.commentary=''
            this.getComm()
            // this.currentCommentary(this.blog.bid ||this.bid)
          },error=>{
            console.log(error.message);
          })
        }else{
          alert('不能为空')
        }
      },
      // // 过滤评论
      // approvedComment(){
      //   this.list=this.commentaryList
      //   this.list=this.list.filter((li)=>{
      //     return li.ctype==1
      //   })
      // }

      // 点赞功能
      addD(cid){
        // if(this.user.isTouristsLogin){
        //   this.$message.warning('')
        //   return false
        // }
        let nanoid=sessionStorage.getItem('nanoid')
        this.$axios.post('http://localhost:8081/api/dTable/add',{
          dcid:cid,
          duser:this.user.userName||nanoid
        }).then(res=>{
          this.getComm()
        },error=>{
          console.log(error.message);
        })
      },
      // 过滤点赞信息
      //  取消点赞
      delD(did){
        this.$axios.get(`http://localhost:8081/api/dTable/del/${did}`)
        .then(res=>{
          this.getComm()
        },
        error=>{
          console.log(error.message);
        })
      },
      // 回复
      startReply(cid){
        this.isReply=true
        this.cid=cid
        this.$nextTick(function(){
          this.$refs.reply.focus()
        })
      },
      // 取消回复
      endReply(){
        this.hMessage=''
        this.isReply=false
      },
      // 回复
      replyMsg(){
        this.$axios.post('http://localhost:8081/api/reply/add',{
          hcid:this.cid,
          hmessage:this.hMessage,
          htime:new Date(),
          state:0,
          husr:this.user.userName||'游客',
          hbid:this.blog.bid||this.bid
        }).then(res=>{
          this.isReply=false
          this.hMessage=''
          this.getComm()
          this.msg1()
        },
        error=>{
          console.log(error.message);
        })
      },
      // 提示信息
      msg1(){
        this.$message({
          message:'成功',
          type:'success'
        })
      },
      msg2(){
        this.$message.error("失败")
      },
      // 测试
      test2(){
        let username=localStorage.getItem("username")
        this.$axios.post('http://localhost:8081/api/commentary/commPage',{
          bid:this.blog.bid||this.bid,
          pageIndex:1,
          pageSize:6,
          s:username||this.user.userName
        }).then(res=>{
          console.log(res.data);
        },error=>{
          console.log(error.message);
        })
      },
      // 隐藏 显示
      lookReply(comm){
        if(!comm.isLook){
          if(comm.isLook==null||comm.isLook==undefined){
            this.$set(comm,'isLook',true)
          }else{
            comm.isLook=true
          }
        }else{
          comm.isLook=false
        }
        
      },
      // 评论数量 评论+回复
      getCommNum(){
        let num=0
        this.list.forEach(li => {
          num++
          if (li.replyList.length!=0) {
            let x=li.replyList
            x.forEach(x=>{
              num++
            })
          }
        });
        this.$nextTick(function(){
          this.commNum=num
        })
      },
      // 收藏博客
      collectBlog(){
        if(this.user.isTouristsLogin){
          this.$message.warning("注册后才可所有此功能")
          return false
        }
        this.$axios.post('http://localhost:8081/api/collect/add',{
          uid:this.user.uid,
          bid:this.blog.bid||this.bid,
          time:new Date()
        }).then(res=>{
          if (res.data) {
            this.$message({
              message:'收藏成功',
              type:'success'
            })
          }else{
            this.$message({
              message:'您已收藏本博客，请勿重复收藏',
              type:'warning'
            })
          }
        },error=>{
          console.log(error.message);
        })
      },
      addBlogClick(){
        this.$axios.get(`http://localhost:8081/api/blog/addClick/${this.bid||this.blog.bid}`)
        .then(res=>{
          // console.log("ok");
        },error=>{
          console.log(error.message);
        })
      },
      backTop(){
        document.documentElement.scrollTop = 0
      },
      scroll1(e){
        let scrollTop=document.documentElement.scrollTop
        if (scrollTop>400) {
          this.isScroll=true
        }else{
          this.isScroll=false
        }
      }
    },
    computed:{
      ...mapState('userOptions',{user:'user',blogUser:'blogUser'}),
      ...mapState('blogOptions',{blog:'blog'}),
      // ...mapState('commentaryOptions',{commentaryList:'commentaryList'}),
      compiledMarkdown(){
        return marked.parse(this.bcontent||this.blog.bcontent||'')
      },
      // 评论数量
      // getCommNum(){
      //   let num=0
      //   this.list.forEach(li => {
      //     num++
      //     if (li.replyList.length!=0) {
      //       let x=li.replyList
      //       x.forEach(x=>{
      //         num++
      //       })
      //     }
      //   });
      //   return num
      // }
    },
    mounted(){
      window.addEventListener('scroll',this.scroll1,true)
        let bid=sessionStorage.getItem("getbid")
        if (bid==null||bid=='') {
          // console.log(this.bid);
          this.getBlogUserMessage(this.bid)
          sessionStorage.setItem("getbid",this.bid)
          // this.currentCommentary(this.bid)
          // this.getComm()
        }else{
          let bid=sessionStorage.getItem("getbid")
          this.getBlogUserMessage(bid)
          this.currentBlog(bid)
          // this.currentCommentary(bid)
          // this.getComm()
        }
        setTimeout(() => {
          this.username=this.blogUser.username 
          // this.commentaryBlog()
          // this.getComm()
          // this.test2()
          
        }, 200);
        setTimeout(() => {
          this.getComm()
        }, 300);
        setTimeout(() => {
          this.getCommNum()
        }, 700);
        setTimeout(() => {
          this.addBlogClick()
        }, 6000);
        let rendererMD=new marked.Renderer();
        marked.setOptions({
          renderer:rendererMD,
          highlight:function(code){
            const hljs=require('highlight.js')
            return hljs.highlightAuto(code).value;
          },
          pedantic:false,
          gfm:true,
          tables:true,
          breaks:false,
          sanitize:false,
          smartLists:true,
          smartypants:false,
          xhtml:false
        });
    },
    beforeDestroy() {
      window.removeEventListener('scroll',this.scroll,true)
    }
}
</script>

<style scoped>
.bbody{
  position: absolute;
  left: 400px;
  width: 650px;
  height: 700px;
}
.bmain{
  position: absolute;
  left: 20px;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.botm{
  position: relative;
  top: 25px;
  font-size: 18px;
}
.botm input{
	height: 30px;
	width: 550px;
}
.botm button{
	height: 35px;
}
.botm ul li{
  list-style-type: decimal;
}
.botm span{
  font-size: 14px;
}
.reply{
  margin-left:10px;
  cursor: pointer;
}
.reply:hover{
  color: skyblue;
}
.reply1{
  position: fixed;
  top: 500px;
  left: 500px;
  opacity: 0.9;
}
.reply1 button{
  width: 60px;
  border: 0;
  opacity: 0.7;
  cursor: pointer;
  margin-left: 10px;
}
.replybox1{
  border-top: 1px solid burlywood;
  opacity: 0.6;
  background-color: antiquewhite;
}
.lookcomm{
  cursor: pointer;
  margin-left:20px
}
.lookcomm:hover{
  color: skyblue;
}
.scrolling{
  position: fixed;
  top:400px;
  right:480px;
}
</style>