<template>
  <el-container class="container">
     <el-header class="header">
        <el-row>
           <el-col :span="3"><div class="grid-content bg-purple">
                <img src="../assets/logo.png" alt="">
               </div></el-col>
           <el-col :span="19"><h2>电商后台管理系统</h2></el-col>
           <el-col :span="1"><a href="#" @click.prevent="handleLoginout()">退出</a></el-col>
        </el-row>
     </el-header>
     <el-container>
       <el-aside width="200px" class="aside">
           <el-menu unique-opened default-active="2">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
       <el-menu-item index="1-3">
            <i class="el-icon-menu"></i>
           用户列表
       </el-menu-item>
    </el-submenu>
     
     <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
       <el-menu-item index="1-3">
            <i class="el-icon-star-on"></i>
           角色列表
       </el-menu-item>
       <el-menu-item index="1-3">
            <i class="el-icon-star-on"></i>
           权限列表
       </el-menu-item>
    </el-submenu>

    <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
       <el-menu-item index="1-3">
            <i class="el-icon-menu"></i>
           商品列表
       </el-menu-item>
       <el-menu-item index="1-3">
            <i class="el-icon-menu"></i>
           分类参数
       </el-menu-item>
       <el-menu-item index="1-3">
            <i class="el-icon-menu"></i>
           商品分类
       </el-menu-item>
    </el-submenu>

    <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
       <el-menu-item index="1-3">
            <i class="el-icon-star-on"></i>
           订单列表
       </el-menu-item>
    </el-submenu>

    <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
       <el-menu-item index="1-3">
            <i class="el-icon-star-on"></i>
           数据报表
       </el-menu-item>
    </el-submenu>
    </el-menu>
       </el-aside>
       <el-main class="main">Main</el-main>
     </el-container>
  </el-container>

</template>

<script>
export default {
// vue实例创建之前
beforeCreate () {
    if (!localStorage.getItem('token')) {
        this.$message.warning('请先登录')
        this.$router.push({
        name: 'login'
    })
    }
},

methods: {
   handleLoginout () {
    // 清楚token
    localStorage.clear();
    // 回到登录组件
    this.$router.push({
        name: 'login'
    })

    // 提示
    this.$message.success('退出成功')

   }
}
}
</script>

<style>
.container {
    height: 100%;
    /* background: pink */
}
.header {
    /* background: red */
}
.aside {
    /* background: blue */
}
.header h2 {
    text-align: center;
    line-height: 60px
}
.header a {
    text-decoration: none;
    line-height:60px
}
</style>
