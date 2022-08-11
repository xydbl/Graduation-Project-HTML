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
        <span style="position: relative; left: 270px;bottom: 5px;">发布时间：2020-08-09 07:25:33</span>
      </div>
	    <!-- 正文 -->
      <div>
        <div v-html="compiledMarkdown"></div>
	    </div>
      <!-- 评论 -->
      <div style="position: relative;border-bottom: 1px solid #7E8388;top:20px">
        <el-badge :value="200" :max="99" class="item" style="font-size: 20px;">
          评论
        </el-badge>
      </div>
      <div class="botm">
        <div>
			  <input type="text" placeholder="进行评论" v-model="commentary"><button @click="sendComm">发表评论</button>
		  </div>
        <div style="margin-left:20px;margin-top:10px;border-bottom:1px solid black" v-for=" comm in list" :key="comm.cid">
          <div>
            <h2>{{comm.messageId}}</h2>
            <p>&nbsp&nbsp{{comm.message}}</p>
            <div style="text-align:left;">
              <span style="margin-bottom:10px;">{{comm.ctime}}</span>
              <span >
                <img v-if="false" src="../assets/Active.png" alt="" style="width:20px;height:20px;margin-left:10px;cursor: pointer;">
                <img v-if="true" src="../assets/White.png" alt="" style="width:20px;height:20px;margin-left:10px;cursor: pointer;">
              </span>
              <span style="margin-left:6px">1</span>
              <span class="reply">回复</span>
            </div>
            <div></div>
          </div>
          <!-- <ul>
            <li v-for=" comm in list" :key="comm.cid"><span>{{comm.messageId}}</span><br><br>{{comm.message}}<br><span style="font-size:10px">评论时间:{{comm.ctime}}</span></li>
          </ul> -->
        </div>
		  
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {marked} from 'marked'
export default {
    name:'Blog',
    data() {
      return {
        commentary:'',
        username:'',
        list:[]
      }
    },
    props:["bid","btype",'btitle','bcontent','btime'],
    methods:{
      // 获取博主信息
      ...mapMutations("userOptions",{getBlogUserMessage:'GETBLOGUSERMESSAGE'}),
      ...mapMutations("blogOptions",{currentBlog:'CURRENTBLOG'}),
      // 获取评论
      ...mapMutations('commentaryOptions',{currentCommentary:'CURRENTCOMMENTARY'}),
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
            this.currentCommentary(this.blog.bid ||this.bid)
          },error=>{
            console.log(error.message);
          })
        }else{
          alert('不能为空')
        }
        
      },
      // 过滤评论
      approvedComment(){
        this.list=this.commentaryList
        this.list=this.list.filter((li)=>{
          return li.ctype==1
        })
      }
    },
    computed:{
      ...mapState('userOptions',{user:'user',blogUser:'blogUser'}),
      ...mapState('blogOptions',{blog:'blog'}),
      ...mapState('commentaryOptions',{commentaryList:'commentaryList'}),
      compiledMarkdown(){
        return marked.parse(this.bcontent||this.blog.bcontent||'',{sanitize:true})
      }
    },
    mounted(){
        let bid=sessionStorage.getItem("getbid")
        if (bid==null||bid=='') {
          // console.log(this.bid);
          this.getBlogUserMessage(this.bid)
          sessionStorage.setItem("getbid",this.bid)
          this.currentCommentary(this.bid)
        }else{
          let bid=sessionStorage.getItem("getbid")
          this.getBlogUserMessage(bid)
          this.currentBlog(bid)
          this.currentCommentary(bid)
        }
        setTimeout(() => {
          this.username=this.blogUser.username 
        }, 200);
        setInterval(() => {
          this.approvedComment()
        }, 500);
       
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
</style>