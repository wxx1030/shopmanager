<template>
    <div class="wrap">
      <el-form class="form" label-position="top" label-width="80px" >
        <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formdata.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="handleLogin()">登录</el-button>
      </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    //   登录请求
    handleLogin () {
      this.$http
        .post('login', this.formdata)
        .then((res) => {
          console.log(res)
          const {data:{meta:{msg,status},data}} = res
          if (status === 200) {
             
            //  提示框
             
            // this.$message({
            //   message: msg,
            //   type: 'success'
            // });
            // 简单写法
            // this.$message.success(msg)
            // 渲染home.vue -->改标识-->编程式导航
            this.$router.push({
              name:"home"
            })
             
          }else {
            
            //  提示框
             
            // this.$message({
            //   message: msg,
            //   type: 'warning'
            // });
            // 简单写法
            this.$message.warning(msg)
          }
        })
    }
  }
}
</script>

<style>
.wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap .form {
  background-color: #ffffff;
  border-radius: 10px;
  width: 400px;
  padding: 30px;
}

.wrap .form .btn {
  width: 100%;
}
</style>
