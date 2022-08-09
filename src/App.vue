<template>
  <div style="">
    <div class="topPage">
      <Top></Top>
    </div>
    
    <div class="primaryPage">
      <Primary></Primary>
    </div>
    <!-- <div class="footPage">
      <BottomDisplay></BottomDisplay>
    </div> -->
  </div>
</template>

<script>
import Top from './components/Top.vue'
import Primary from './components/Primary.vue'
import BottomDisplay from './components/BottomDisplay.vue'

export default {
  name: 'app',
  components: {
	  Top,
    Primary,
    BottomDisplay
  },
  mounted(){
   let isLoginOut=null
   if (localStorage.getItem('isLoginOut')==null) {
    isLoginOut=false
   }else{
    isLoginOut=localStorage.getItem('isLoginOut')
   }
   
   let username=null
   if (localStorage.getItem('username')==null) {
    username=''
   }else{
    username=localStorage.getItem('username')
   }
   
   if(isLoginOut!='false'&&username!=''){
    
    this.$axios.get(`http://localhost:8081/api/user/findByUserName/${username}`)
    .then(res=>{
      let x=new Date(res.data.logintime).getTime()/1000/60/60/24
      let y=+new Date()/1000/60/60/24
      if(y-x<7){
        this.$store.commit('userOptions/UPDATAISLOGIN',true)
        this.$store.commit('userOptions/UPDATAUSER',res.data)
      }else{
        this.$store.commit('userOptions/UPDATAISLOGIN',false)
        localStorage.setItem('username','')
      }
    },error=>{
      console.log(error.message);
    })
   }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.primaryPage{
  position: relative;
  top: 70px;
  height: 800px;
}
a{
  text-decoration:none;
  color: #000;
}
.footPage{
  width: 1600px;
  height: 80px;
  position: relative;
  background-color: rgb(140, 136, 136);
  bottom: 0;
}

</style>
