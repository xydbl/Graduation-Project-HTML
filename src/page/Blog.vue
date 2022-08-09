<template>
  <div class="bbody">
    <div class="bmain">
      <div style="border-bottom: 1px solid red; width:630px">
        <!-- 标题 -->
        <h1>{{btitle}}</h1>
        <span style="position: relative; left: 10px;bottom: 5px;">
          发布人：
          <router-link to="/showUsr">{{blogUser.username}}</router-link>
        </span>
        <span style="position: relative; left: 270px;bottom: 5px;">发布时间：2020-08-09 07:25:33</span>
      </div>
	    <!-- 正文 -->
      <div>
		    <!-- <p>有道翻译提供即时免费的中文、英语、日语、韩语、法语、德语、俄语、西班牙语、葡萄牙语、越南语、印尼语、意大利语、荷兰语、泰语全文翻译、网页翻译、文档翻译服务。</p> -->
        <p>{{bcontent}}</p>
	    </div>
      <!-- 评论 -->
      <div style="position: relative;border-bottom: 1px solid #7E8388;top:20px">
        <el-badge :value="200" :max="99" class="item" style="font-size: 20px;">
          评论
        </el-badge>
      </div>
      <div class="botm">
		  <div>
			  <ul>
				  <li>time<br><span>评论时间:</span></li>
			  </ul>
		  </div>
		  <div>
			  <input type="text" placeholder="进行评论" v-model="commentary"><button @click="sendComm">发表评论</button>
		  </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:'Blog',
    data() {
      return {
        commentary:'',
        blog:''
      }
    },
    props:["bid","btype",'btitle','bcontent','btime'],
    methods:{
      ...mapMutations("userOptions",{getBlogUserMessage:'GETBLOGUSERMESSAGE'}),
      // 获取博主
      getUserMessage(){
      },
      // 发送评论
      sendComm(){
        this.$axios.post('http://localhost:8081/api/commentary/add',{
          message:this.commentary,
          messageId:this.user.uid,
          ctime:new Date(),
          ctype:0,
          clogId:'1'
        })
      }
    },
    computed:{
      ...mapState('userOptions',{user:'user'},{blogUser:'blogUser'})
    },
    mounted(){
      setTimeout(() => {
        this.getBlogUserMessage(this.bid)
      }, 200);
      // this.$axios.get('http://localhost:8081/api/')
      // .then(res=>{
      //   this.$store.state.blogOptions.commit(,res.data);
      // },
      // error=>{
      //   console.log(error.message);
      // })
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
</style>