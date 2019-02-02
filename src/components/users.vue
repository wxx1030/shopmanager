<template>
  <el-card class="box-card card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索和添加用户 -->
    <el-row>
      <el-col>
        <el-input
          @clear="getAllUsers()"
          clearable
          placeholder="请输入用户名"
          v-model="query"
          class="input-with-select"
        >
          <el-button @click="serchUsers()" slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button type="primary" @click="showDiaAdd()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- 
        id:id
        username:用户名
        email:邮箱
        mobile:手机号
        create_time:创建时间
        mg_state:用户状态
        role_name:角色名
    -->
    <el-table height="300px" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>

      <el-table-column label="创建日期" width="180">
        <!-- 如果单元格的内容不是prop的值key对应的值，
        此时，需要给被显示内容外出包裹容器template-->
        <!-- 目的：在里层使用外层tableData->组件传值
        slot-scope作用：承上启下/传递数据
        "tableData" 会自动获取上层数据的值 data="tableData"
        在里层通过tableData.row-->
        <template slot-scope="scope">{{scope.row.create_time|fmtDate}}</template>
      </el-table-column>

      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" 
          @click="showDiaEdit(scope.row)" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" 
          @click="showDeleConfig(scope.row)" circle>

          </el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" 
          @click="showRoleDia(scope.row)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 @size-change 每页条数改变时触发
              @current-page 页码改变时触发
              current-page 当前页
    total 总条数-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUsers()">确 定</el-button>
      </div> 
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item  label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUsers()">确 定</el-button>
      </div> 
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form >
        <el-form-item label="用户名" :label-width="formLabelWidth">
        {{currUserName}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          
          <!-- 
            1.v-model 写在select
            2.如果v-modle绑定数据的值和option的value一样 ->默认显示option(label)
            3.如果选择了莫个option ,此时，v-modle绑定的数据的值就是被选中option的value值

           -->
          <el-select v-model="currRoldId" >
            <el-option disabled label="请选择" :value="-1"></el-option>
           <!-- 遍历角色 -->
            <el-option 
            v-for="(v, i) in roles" :key = "i"
             :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],

      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 控制对话框显示/隐藏   
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleRole:false,
      form: {
          username:'',
          password:'',
          email:'',
          mobile:''

      } ,
      formLabelWidth: "100px",
      currRoldId:-1,
      // 角色数据
      roles: [],
      // 当前用户名
      currUserName:"",
      currUserId: -1
      
    };
  },
  //   实例创建完成之后
  created() {
    this.getTableData();
  },
  methods: {
    //   分页方法
    handleSizeChange(val) {
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
      //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // val是当前页面
      this.pagenum = val;
      this.getTableData();
      //   console.log(`当前页: ${val}`);
    },
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // query	查询参数	可以为空
      // pagenum	当前页码	不能为空
      // pagesize	每页显示条数	不能为空
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // 解构赋值
      const {
        data: { total, users },
        meta: { status, msg }
      } = res.data;

      if (status === 200) {
        // 获取成功
        this.tableData = users;
        // console.log(this.tableData);
        this.total = total;
      }
      // console.log(res)
      //   this.$message.warning(msg);
    },
    // 搜索用户
    serchUsers() {
      this.getTableData();
    },
    // 点击x获取所有用户
    getAllUsers() {
      this.getTableData();
      // console.log(1111111)
    },
    // 添加用户 打开对话框
    showDiaAdd (){
      // 一点开 清空上一次的内容
      this.form = {}
      this.dialogFormVisibleAdd = true;
       
    },
    // 添加用户
    async addUsers () {
      // 发送请求
      const res = await this.$http.post('users',this.form)
      const{meta:{msg, status}} = res.data
      if (status === 201) {
        // 关闭对话框
        this.dialogFormVisibleAdd = false
        // 刷新表格
        this.getTableData()
        
      }else {
        // 提示
        this.$message.warning(msg)
      }
      // console.log(res)
      
       
    },
    // 删除用户 打开对话框
    showDeleConfig (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(async () => {
          // 删除
          const res = await this.$http.delete(`users/${user.id}`)
          // console.log(res)
          const {meta:{msg, status}} = res.data
          if (status === 200) {
            this.$message.success('删除成功!')
            this.pagenum = 1
            this.getTableData()
          }else {
            this.$message.warning(msg)
          }
          
        }).catch(() => {
          
          this.$message.info('已取消删除')
        });
    },
    // 编辑用户 打开编辑对话框
    async showDiaEdit (user) {
       this.dialogFormVisibleEdit = true
       const res = await this.$http.get(`users/${user.id}`)
       console.log(res)
       const {meta:{status,msg},data} = res.data
       if (status === 200) {
         this.form = data
         
       }
    },
     async editUsers () {
       const res = await this.$http.put(`users/${this.form.id}`,this.form)
       const {meta: {msg, status}} = res.data
       if (status === 200) {
        //  关闭对话框
        this.dialogFormVisibleEdit = false
        // 刷新表格
        this.getTableData()

       }else {
         this.$message.warning(msg);
       }
       
       
    },
    // 改变用户状态
    async changeState (user) {
       const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      //  console.log(res)
        
    },
    // 分配角色
    async showRoleDia (user) {
      this.dialogFormVisibleRole = true;
      this.currUserName = user.username
      this.currUserId = user.id
      const res = await this.$http.get(`roles`)
      // console.log(res)
      const {meta:{status, msg}, data} = res.data
      if (status === 200) {
        this.roles = data
      }
      // 根据用户id查询用户 ->获取当前用户角色id
      const res2 = await this.$http.get(`users/${user.id}`)
      // console.log(res2)
      this.currRoldId = res2.data.data.rid
      

    },
    // 分配角色 发送请求
    async setRole () {
      // id: 用户id 1.看data中有没有 2.看方法能不能传入user.id ->在data中提供数据currUserId
      // 请求体{rid：当前修改后的角色id}
       const res = await this.$http.put(`users/${this.currUserId}/role`, {
         rid:this.currRoldId
       })
      //  console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRole = false;
      

    },


  }
};
</script>

<style>
.card {
  height: 100%;
}
.input-with-select {
  margin-top: 20px;
  width: 400px;
}
</style>
