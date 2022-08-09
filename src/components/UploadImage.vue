<template>
  <div class="uploadimg">
    <el-upload
        class="upload-demo"
        drag 
        action="" 
        :limit="1" 
        ref="clear"
        :show-file-list="false"
        :http-request="uploadImg"
        multiple>
        <img v-if="user.image" :src="require('../assets/userimage/'+user.image)">
        <i  class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
    </el-upload>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import {filesArray} from '@/api/curriculum'
export default {
    name:'UploadImage',
    data() {
      return {
        // coverImg:'',
        loadingstate:false
      }
    },
    methods: {
      // 
      ...mapMutations('userOptions',{updateUserMessage:'UPDATEUSERMESSAGE'}),

      // beforeUpload(file){
      //   this.loadingstate=true
      //   let index=file.name.lastIndexOf(".")
      //   let extension=file.name.substr(index+1)
      //   let extensionList=["png","PNG","jpg","JPG","jpeg","JPEG"]
      //   const isLimit=file.size / 1024 / 1024 < 10;
      //   if (!isLimit) {
      //     return false
      //   }else if(extensionList.indexOf(extension)<0){
      //     return false
      //   }else{
      //   }
      // },
      uploadImg(params){
        let file=params.file
        // console.log(file);
        // console.log(params);
        // let reader=new FileReader()
        // reader.readAsDataURL(file.raw)
        // console.log(reader.result);
        this.loadingstate=true
        let index=file.name.lastIndexOf(".")
        let extension=file.name.substr(index+1)
        let extensionList=["png","PNG","jpg","JPG","jpeg","JPEG"]
        const isLimit=file.size / 1024 / 1024 < 10;
        if(!isLimit){
          alert("文件大小超过10M")
        }else if(extensionList.indexOf(extension)<0){
          alert("文件格式不支持")
        }else{
          let obj=new FormData()
          let username=localStorage.getItem('username')
          obj.append("username",username)
          obj.append("file",file)
          this.$axios({
            method:"post",
            headers:{"Content-Type":"multipart/form-data"},
            url:'http://localhost:8081/api/user/uploadImage',
            data:obj
          }).then(res=>{
            this.$refs.clear.clearFiles()
            if (!res.data) {
              alert("文件为空")
            }else{
              this.updateUserMessage()
            }
          },error=>{
            alert("上传失败")
            console.log(error.message);
          })
        }
        
      }
    },
    computed:{
      ...mapState('userOptions',{user:'user'})
    }
}
</script>

<style scoped>
.uploadimg{
    position: relative;
    top: 100px;
    left: 200px;
}
</style>