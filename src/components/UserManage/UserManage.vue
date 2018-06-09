<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="全部"></el-tab-pane>
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content">
			  		<el-row :gutter="20">
					  <el-col :span="15"><div class="grid-content bg-purple">
					  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="criteria"> </el-input>
					  </div></el-col>
					  <el-col :span="4"><div class="grid-content bg-purple">
					  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
					  </div></el-col>
					  <el-col :span="5"><div class="grid-content bg-purple">
					  	<el-button type="primary" @click="handleAdd">新增用户</el-button>
					  </div></el-col>
					</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="listLoading" element-loading-text="拼命加载中" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="index" label="序号" width="50"> </el-table-column>
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="username" label="用户名" width="180" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="nickname" label="昵称" width="180" show-overflow-tooltip > </el-table-column>
		    <el-table-column prop="useremail"  label="电子邮箱" show-overflow-tooltip> </el-table-column>	
		    <el-table-column prop="phone" label="联系电话"  show-overflow-tooltip > </el-table-column>
		    <el-table-column prop="name" label="组分类" show-overflow-tooltip> </el-table-column>		    		    
		    <el-table-column prop="status_id" label="状态" show-overflow-tooltip> 
		       <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
	                {{scope.row.status_id == 1 ? "已启用":"已禁用"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column label="最后登录时间" width="220" show-overflow-tooltip> 
		      <template slot-scope="scope">{{ scope.row.lastlogintime }}</template>
		    </el-table-column>
			<el-table-column label="操作" align='center' fixed="right" width="180">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		  </el-table>
		    <!--编辑界面-->
	       	 <el-dialog title="用户信息编辑" :visible.sync="editFormVisible" width="40%">
	       	 	<el-form :model="editForm" label-width="80px" :rules="editFormRules"  ref="editForm">
			    <el-row  class="user-model">
				  <el-col :span="16">
				  	<div class="grid-content bg-purple">
				  		<el-form-item label="用户名" prop="account">
							<el-input v-model="editForm.account" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="editForm.phone" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="昵称" prop="nickname">
							<el-input v-model="editForm.nickname" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="editForm.password" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="editForm.email" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="生日" prop="birthday">
							<el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="editForm.birthday"></el-date-picker>
						</el-form-item>
						<el-form-item label="组分类" prop="group_id">
							<el-select v-model="editForm.group_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							 </el-select>
						</el-form-item>
						<el-form-item label="状态">
							<el-switch v-model="editForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
						</el-form-item>												
				  	</div>
				  </el-col>				  				  						  					  
				</el-row>															
				</el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			 </div>
			</el-dialog>
		    <!--新增界面-->
			<el-dialog title="新增用户" :visible.sync="addFormVisible" :close-on-click-modal="false" width="40%">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-row>
					  <el-col :span="16">
					  	  <div class="grid-content bg-purple">
						  	<el-form-item label="用户名" prop="account">
								<el-input v-model="addForm.account" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="电子邮箱" prop="email">
								<el-input v-model="addForm.email" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input v-model="addForm.password" style="width: 100%;" type="password" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="confirmpassword">
								<el-input v-model="addForm.confirmpassword" style="width: 100%;" type="password" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="昵称" prop="nickname">
								<el-input v-model="addForm.nickname" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="真实姓名" prop="realname">
								<el-input v-model="addForm.realname" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="生日">
								<el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="addForm.birthday"></el-date-picker>
							</el-form-item>
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="addForm.phone" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="组分类">
								<el-select v-model="addForm.group_id" placeholder="请选择" style="width: 100%;">
								    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
								 </el-select>
							</el-form-item>
							<el-form-item label="状态" prop="status_id">
								<el-switch v-model="addForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
							</el-form-item>														
						  </div>
					  </el-col>					  
					</el-row>										
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				</div>
			</el-dialog>   		    
		  <div class="pagination">
		  	<div class="pagination-btn">
		  		<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
		  	</div>
		    <div class="pagina">
		    	<el-pagination
		    		 background
		    		 @size-change="handleSizeChange"
	                  @current-change="handleCurrentChange"
	                  :current-page="currentPage"
	                  :page-sizes="[10, 20, 30, 40]"
	                  :page-size="pagesize"
	                  layout="total, sizes, prev, pager, next, jumper"
	                  :total="totalCount">
		    	</el-pagination>
		    </div>	    
		  </div>
	  	</div>
	  </el-main>
	</el-container>
</template>

<script>
	import util from '../../common/js/util'
	const api =require('../../api/api.js')
	export default {
        data() {
          let validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          if (this.addForm.consirmpassword !== '') {
	            this.$refs.addForm.validateField('confirmpassword');
	          }
	          callback();
	        }
	      };
	      let validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请再次输入密码'));
	        } else if (value !== this.addForm.password) {
	          callback(new Error('两次输入密码不一致!'));
	        } else {
	          callback();
	        }
	      };	
	      return {
	      	sels:[],//列表选中项
	      	total: 0,
			//当前页码
            currentPage: 1,
			//默认每页数据量
            pagesize: 10,
            //默认数据总数
            totalCount: 0,
            //搜索条件
            criteria: '',			
	        tableData: [],//用户列表数据
	        editFormVisible: false,//编辑界面是否显示
	        addFormVisible: false,//新增界面是否显示
	        listLoading: true,
	        addLoading:false,
	        editLoading:false,
	        //新增界面数据
			addForm: {
				account: '',
				email:'',
				password:'',	
				confirmpassword:'',
				nickname:'',
				realname:'',
				birthday: '',
				group_id:'',
				phone:'',
				gender: -1,	
			},
			addFormRules: {
				account: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
					{ min: 3, max: 25, message: '长度在 3 到 25 个字符'},
                    { pattern:/^[A-Za-z0-9]+$/, message: '用户名只能为字母和数字'}
				],
				email: [
					{ type: 'email', message: '邮箱格式不正确'}
				],
				password: [
//						{ required: true, message: '请输入密码', trigger: 'blur' },
					{ validator: validatePass, trigger: 'blur' }
				],
				confirmpassword: [
					{ validator: validatePass2, trigger: 'blur' }
				],
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ pattern:/^1[34578]\d{9}$/, message: '请输入中国国内的手机号码'}
				],
				nickname: [
					{ required: true, message: '请输入昵称', trigger: 'blur' }
				],
				realname: [
					{ required: true, message: '请输入真实姓名', trigger: 'blur' }
				],			
			},
			//编辑界面数据
			editForm: {
				account: '',
				phone: '',
				nickname: '',
				password: '',
				birthday:'',
				email: '',
				group_id:'',
				status_id:true,
				name:''
			},
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},	        
	        options: [{
		          value: '',
		          lable: ''
		        }],		                
	      }
	    },
       methods: {
       	  //获取用户
	      getUsers(criteria,pageNumber, pageSize){
	      	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					account:this.criteria
				};
			this.listLoading = true;	
			this.consirmpassword = '';
      		let data = [];
	        api.GetUserList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.username = res.data.data.list[i].account;
		            obj.useremail = res.data.data.list[i].email
		            obj.gender = res.data.data.list[i].gender	
		            obj.name = res.data.data.list[i].name
		            obj.groups = res.data.data.list[i].group_id
		            obj.ids = res.data.data.list[i].id
		            obj.nickname = res.data.data.list[i].nickname
		            obj.status_id = res.data.data.list[i].status_id
		            obj.lastlogintime = res.data.data.list[i].lastlogintime
		            obj.phone = res.data.data.list[i].phone
		            obj.password = res.data.data.list[i].password
		            obj.birthday = res.data.data.list[i].birthday
		            data[i] = obj
		       }				  			
			    _this.tableData = data;
			    this.listLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.listLoading = false;
			});
	      },
	      //搜索
          search: function(){
          	this.listLoading = true;
            this.getUsers(this.criteria, this.currentPage, this.pagesize);
          },      
       	  //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.getUsers(this.currentPage, this.pagesize);
          },         	    
	      //获取管理员组
	      getAdminGroup: function () {
	      	let data = [];
	      	let group_id = sessionStorage.getItem('group_id');
	      	let para = {
	      		parent_id:group_id
	      	}
	      	api.GetGroupType(para).then((res) => {
				for (let i = 0; i < res.data.data.length; i++) {              
		            let obj = {}
		            obj.value = res.data.data[i].id;
		            obj.label = res.data.data[i].name;
		            data[i] = obj;
		        }
				this.options = data;
			});
	      },
	      //显示新增界面
		  handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					account: '',
					email:'',
					password:'',
					nickname:'',
					realname:'',					
					confirmpassword:'',
					birthday: '',
					gender: -1,	
					group_id:'',
					status_id:true
				};
			 this.getAdminGroup();			
		  },
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addForm);
						para.status_id = (para.status_id == true) ? 1 : 2;
						para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');
						api.AddUserInfo(para).then((res) => {
							this.$message({
								message: '添加用户成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
		//第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.getUsers(this.currentPage, this.pagesize);
		  },  
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //删除单个用户
		  handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.listLoading = true;
			let para = { id: row.ids };
			api.DeleteUser(para).then((res) => {
				    this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getUsers();
				});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
		   //批量删除用户
		  batchRemove: function () {
			var ids = this.sels.map(item => item.ids).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {;
			api.BatchDeleteUser({'ids':ids}).then((res) => {
				this.$message({
					message: '删除成功',
					type: 'success'
				});
				this.getUsers();
			});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
	      //显示编辑界面
		  handleEdit: function (index, row) {
			this.editFormVisible = true;
				this.editForm = {
					account: row.username,
					email: row.useremail,
					password:row.password,
					nickname:row.nickname,
					phone:row.phone,
					birthday: row.birthday,	
					group_id:row.name,
					status_id:row.status_id == 1 ? true : false,
					id:row.ids,
				};				
			this.getAdminGroup();
		  },
		  //编辑
		  editSubmit: function (index, row) {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;					
						let para = Object.assign({}, this.editForm);
						para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');											
						para.status_id = (para.status_id == true) ? 1 : 2;
						api.EditUserInfo(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						});
					});
				}
			});
		},
        //状态
       articleStatusTag(item){
        let basic = "";
        switch (item) {
          case 1:
                 basic = 'success';
                 break;
          case 2:
                 basic = 'warning';
                 break;            
        }
        return basic;
      },
      },
      mounted: function () {
      	this.getUsers();      
      },
    }
</script>

<style>
.header-breadcrumb{
	background-color: #E9EEF3 !important;
	font-size: 14px !important;
	text-align: left;
	height: 20px !important;
	line-height: 20px !important;
	padding-left: 20px !important;
}
.el-tabs--border-card {
	 background: #E9EEF3 !important; 
	 border: none;  
	 box-shadow:none !important; 
}
.el-tabs__nav-scroll{
	background: #E9EEF3 !important;
}
.main-card{
	background-color: #E9EEF3 !important;
	margin: 0 !important;
} 
.el-pagination.is-background .el-pager li.active{
	background-color: #324057 !important;
}  
.el-tabs__content{
	display: none;
}
.el-tabs__item{
	color: #fff !important; 
    margin-right: 30px !important;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	background-color: #324057;
	padding: 0 30px !important;
    height: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 50px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
	color: #333 !important;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
}
.cell{
	text-align: center;
}
.pagination{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-top: 20px;
	height: 30px;
}
</style>