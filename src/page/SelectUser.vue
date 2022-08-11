<template>
    <div>
        <input type="text" class="search" v-model="msg" @keyup.enter="searchName">
        <el-button type="primary" icon="el-icon-search" @click="searchName">用户名搜索</el-button>
        <button style="height:40px;">删除选中</button>
        <br>
        <table >
            <thead>
                <tr>
                    <td><input type="checkbox"></td>
                    <td>uid</td>
                    <td>用户名</td>
                    <td>密码</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in userList" :key="list.uid">
                    <td><input type="checkbox" :checked="list.checked" @change="checked1(list)"></td>
                    <td>{{list.uid}}</td>
                    <!--  -->
                    <td v-if="!list.isEdit">{{list.username}}</td>
                    <td v-if="list.isEdit"><input type="text" :value="list.username"></td>
                    <!--  -->
                    <td v-if="!list.isEdit">{{list.password}}</td>
                    <td v-if="list.isEdit"><input type="text" :value="list.password"></td>
                    <!-- 操作区 -->
                    <td><button v-if="!list.isEdit" @click="deleteUser(list)">删除</button>
                    <button v-if="!list.isEdit" @click="userEdit(list)">修改</button >
                    <button v-if="list.isEdit" @click="editFinish(list)">修改完成</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'SelectUser',
    data() {
        return {
            userList:[],
            msg:''
        }
    },
    methods: {
        // 删除用户
        deleteUser(user){
            axios.get(`http://localhost:8080/user/delete/${user.uid}`)
            .then(res=>{
                if(res.data) alert('删除成功')
                this.updateData()
            },
            error=>{
                console.log(error.message);
            })
        },
        // 修改 编辑
        userEdit(list){
            console.log(!list.isEdit);
            if(!list.isEdit&&list.isEdit!=false){
                this.$set(list,'isEdit',true)
            }else{
                list.isEdit=true
            }
        },
        // 按用户名搜索
        searchName(){
            axios.get(`http://localhost:8080/user/findByUserName/${this.msg}`)
            .then(res=>{
                this.userList= res.data
            },
            error=>{
                console.log(error.message);
            })
        },
        // 修改完成
        editFinish(list){
            list.isEdit=false
            // axios.post('http://localhost:8080/user/updateUserById')
            // .then(res=>{
            //     res.data
            // },
            // error=>{
            //     console.log(error.message);
            // })
        },
        // 选中
        checked1(list){
            if(!list.checked){
                this.$set(list,'checked',true)
            }else{
                list.checked=false
            }
        },
        // 更新数据
        updateData(){
            axios.get('http://localhost:8080/user/findAll').then(
            res=>{
                this.userList=res.data
            },error=>{
                console.log(error.message);
            })
        }
    },
    mounted() {
        // 刷新数据
        // this.getuser=setInterval(()=>{
        //     // console.log("xxx");
        //     axios.get('http://localhost:8080/user/findAll').then(
        //         res=>{
        //             this.userList=res.data
        //         },error=>{
        //             console.log(error.message);
        //         }
        //     )
        // },5000)
        axios.get('http://localhost:8080/user/findAll').then(
            res=>{
                this.userList=res.data
            },error=>{
                console.log(error.message);
            }
        )
    },
    beforeDestroy(){
        // clearInterval(this.getuser)
    }
}
</script>

<style scoped>
.search{
    height: 34px;
}
</style>