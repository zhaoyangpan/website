<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="全部"></el-tab-pane>
					  <!--<el-tab-pane label="普通用户组"></el-tab-pane>
					  <el-tab-pane label="土著用户组"></el-tab-pane>
					  <el-tab-pane label="企业组"></el-tab-pane>
					  <el-tab-pane label="政府组"></el-tab-pane>
					  <el-tab-pane label="管理员组"></el-tab-pane>-->				  
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content search-flex">
			  		<el-row :gutter="20">
					  <el-col :span="15">
					  	  <div class="grid-content bg-purple">
						  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="name"> </el-input>
						  </div>
					  </el-col>
					  <el-col :span="4">
					  	  <div class="grid-content bg-purple">
						  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
						  </div>
					  </el-col>
					  <el-col :span="5">
					  	  <div class="grid-content bg-purple">
						  	<el-button type="primary" @click="addGroup">新增组</el-button>
						  </div>
					  </el-col>
					</el-row>			  	
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border :data="groupTableData" v-loading="grouplistLoading" element-loading-text="拼命加载中" tooltip-effect="#f0f9eb" style="width: 100%" @selection-change="groupSelectionChange">
	  	  	<el-table-column type="index" label="序号" width="50"> </el-table-column>
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="name" label="组名称"> </el-table-column>
		    <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip>  </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间"  show-overflow-tooltip>  </el-table-column>	
		    <el-table-column prop="status_id" label="状态"  show-overflow-tooltip> 
		         <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
	                {{scope.row.status_id == 1 ? "已启用":"已禁用"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column label="操作" align='center' fixed="right" width="400" show-overflow-tooltip> 
		       <template slot-scope="scope" class="edit">
		       	    <router-link :to="{path: '/ChildGroup',query:{id: scope.row.id}}">
						<el-button type="success" size="small" v-if="scope.row.current_parent_id ==0">查看子组</el-button>
					</router-link>
		       	    <router-link :to="{path: '/GroupEditAdmin',
		       	    	query:{
		       	    		id: scope.row.id,
		       	    		parentId:scope.row.parent_id, 
		       	    	    groupname:scope.row.name,
		       	    	    created_user_id:scope.row.created_user_id,
		       	    	    sequence:scope.row.sequence,
		       	    	    updated_user_id:scope.row.updated_user_id,
		       	    	    status_id:scope.row.status_id		       	    	
		       	    	}}">
						<el-button type="warning" size="small">权限编辑</el-button>
					</router-link>
		       		<el-button size="small" @click="editGroupInfo(scope.$index, scope.row)">编辑</el-button>		       				       		       	
		       		<el-button type="danger" size="small" @click="groupDel(scope.$index, scope.row)">删除</el-button>		       				       	
		       </template>
		    </el-table-column>
		  </el-table>
		  <div class="pagination">
		  	<div class="pagination-btn">
		  		<el-button type="danger" @click="batchDelete" :disabled="this.sels.length===0">批量删除</el-button>
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
	  	   <!--新增组-->
			<el-dialog title="新增组用户" :visible.sync="addGroupVisible" :close-on-click-modal="false" width="40%">
				<el-row>
				  <el-col :span="16">
				  	<div class="grid-content bg-purple">
						<el-form :model="addGroupForm" label-width="80px" :rules="addGroupFormRules" ref="addGroupForm">					
					  		<el-form-item label="组名称" prop="name">
								<el-input v-model="addGroupForm.name" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="组排序">
								<el-input-number v-model="addGroupForm.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
							</el-form-item>
							<!--<el-form-item label="创建时间">
								<el-date-picker v-model="addGroupForm.created_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>
							<el-form-item label="修改时间">
								<el-date-picker v-model="addGroupForm.updated_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>-->
							<el-form-item label="状态" prop="status_id">
								<el-switch v-model="addGroupForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
							</el-form-item>
						</el-form>
					</div>
				  </el-col>					 
				</el-row>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addGroupVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addGroupSubmit" :loading="addGroupLoading">提交</el-button>
				</div>
			</el-dialog>
			<!--编辑组-->
			<el-dialog title="新增组用户" :visible.sync="editGroupVisible" :close-on-click-modal="false" width="40%">
				<el-form :model="editGroupForm" label-width="80px" :rules="editGroupFormRules" ref="editGroupForm">
					<el-row>
					  <el-col :span="16">
					  	<div class="grid-content bg-purple">
					  		<el-form-item label="组名称" prop="name">
								<el-input v-model="editGroupForm.name" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="组排序">
								<el-input-number v-model="editGroupForm.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
							</el-form-item>							
							<!--<el-form-item label="创建时间">
								<el-date-picker v-model="editGroupForm.created_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>
							<el-form-item label="修改时间">
								<el-date-picker v-model="editGroupForm.updated_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>	-->
							<el-form-item label="状态" prop="status_id">
								<el-switch v-model="editGroupForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
							</el-form-item>
					  	</div>
					  </el-col>					  
					</el-row>																																	
				</el-form>
				<div slot="footer"  class="dialog-footer">
					<el-button @click.native="editGroupVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editGroupSubmit" :loading="editGroupLoading">提交</el-button>
				</div>
			</el-dialog>
	  </el-main>
	</el-container>
</template>

<script>
	const api =require('../../api/api.js')
	import util from '../../common/js/util'
	export default {
        data() {
	      return {
	      	sels:[],//列表选中项
	        groupTableData: [],
	        total: 0,
			//当前页码
            currentPage: 1,
			//默认每页数据量
            pagesize: 10,
            //默认数据总数
            totalCount: 0,
            //搜索条件
            name: '',     
        	input:'',
	        addGroupVisible:false,
	        addGroupLoading:false,
	        editGroupVisible:false,
	        editGroupLoading:false,
	        grouplistLoading:false,	       
	        //新增界面数据
			addGroupForm: {
				name: '',
				created_user_id:'',
				created_time:'',				
				sequence:1,
				updated_user_id:'',
				updated_time: '',
				status_id:true
			},
			addGroupFormRules: {
					name: [					
						{ required: true, message: '请输入组名称', trigger: 'blur' }
					],
//					createuser: [
//						{ required: true, message: '请填写创建人', trigger: 'blur' }
//					],
//					createtime: [
//						{ required: true, message: '请输入密码', trigger: 'blur' }
//					],
//					updateuser: [
//						{ required: true, message: '请填写修改人', trigger: 'blur' }
//					],
//					updatetime: [
//						{ required: true, message: '请输入昵称', trigger: 'blur' }
//					],			
			},
			//编辑界面数据
			editGroupForm: {
				name: '',
				created_user_id:'',
				created_time:'',				
				sequence:'',
				updated_user_id:'',
				updated_time: '',
				id:'',
				status_id:''
			},
			editGroupFormRules: {
					name: [					
						{ required: true, message: '请输入组名称', trigger: 'blur' }
					],
//					created_user_id: [
//						{ required: true, message: '请填写创建人', trigger: 'blur' }
//					],
//					created_time: [
//						{ required: true, message: '请输入密码', trigger: 'blur' }
//					],
//					updated_user_id: [
//						{ required: true, message: '请填写修改人', trigger: 'blur' }
//					],
//					updated_time: [
//						{ required: true, message: '请输入昵称', trigger: 'blur' }
//					],			
			},
	      }
	    },
       methods: {
       	  //获取组用户
       	   getGroupUser(name, pageNumber, pageSize){
       	   	let groupId = sessionStorage.getItem('group_id');
       	   	let current_parent_id = sessionStorage.getItem('current_parent_id');
       	   	
	      	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					name:this.name,
					parent_id:groupId
				};
				console.log(para)
			this.grouplistLoading = true;	
      		let data = [];
	        api.GetGroupList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.name = res.data.data.list[i].name;
		            obj.created_user_id = res.data.data.list[i].created_user_id
		            obj.created_time = res.data.data.list[i].created_time		           
		            obj.id = res.data.data.list[i].id
		            obj.status_id = res.data.data.list[i].status_id
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            obj.parent_id = res.data.data.list[i].parent_id
		            obj.current_parent_id = current_parent_id
		            obj.sequence = res.data.data.list[i].sequence
		            obj.updated_time = res.data.data.list[i].updated_time
		            data[i] = obj
		       }				  			
			    _this.groupTableData = data;
			    this.grouplistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.grouplistLoading = false;
			});
	      },
	      //搜索
          search: function(){
          	this.grouplistLoading = true;
            this.getGroupUser(this.name, this.currentPage, this.pagesize);
          },
	      //显示增加组
	      addGroup:function(){
	      	this.addGroupVisible = true;
	      	var createuser = sessionStorage.getItem('id');	 
	      	var groupId = sessionStorage.getItem('group_id');
	      	this.addGroupForm = {
				name: '',
				created_user_id:createuser,
//				created_time:'',				
				sequence:1,
				updated_user_id:0,
//				updated_time: '',
                parent_id:groupId,
				status_id:true
			}	      	
	      },
	      //增加组
	      addGroupSubmit:function (){
	      	this.$refs.addGroupForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addGroupForm);  
						para.status_id = (para.status_id == true) ? 1 : 2;
//						para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
//						para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddGroup(para).then((res) => {
							this.$message({
								message: '添加组用户成功',
								type: 'success'
							});
							this.$refs['addGroupForm'].resetFields();
							this.addGroupVisible = false;
							this.getGroupUser();
						});
					});
				}
			});
	      },
	      //显示组编辑界面
	      editGroupInfo:function(index, row){
	      	this.editGroupVisible = true;
//			this.editGroupForm = Object.assign({}, row);
	      	let createuser = sessionStorage.getItem('id');
	      	var groupId = sessionStorage.getItem('group_id');
			this.editGroupForm = {
				name: row.name,
				created_user_id:row.created_user_id,								
				sequence:row.sequence,
				updated_user_id:row.updated_user_id,
				id:row.id,
				status_id:row.status_id == 1 ? true : false,
				parent_id:groupId,
			}
	      },
	      //编辑组
	      editGroupSubmit:function(){
	      	this.$refs.editGroupForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editGroupLoading = true;
							let para = Object.assign({}, this.editGroupForm);
							para.status_id = (para.status_id == true) ? 1 : 2;
							//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
						    //para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');							
								api.EditGroup(para).then((res) => {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.editGroupLoading = false;
								this.$refs['editGroupForm'].resetFields();
								this.editGroupVisible = false;
								this.getGroupUser();
							 });							
						});
					}
				});
	      },
	      //删除单个组用户
		  groupDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.grouplistLoading = true;
			let para = { id: row.id };
			api.DeleteGroup(para).then((res) => {
				    this.grouplistLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getGroupUser();
				});
			}).catch(() => {

			});
		  },
	      //批量删除用户
		  batchDelete: function () {		  	
			var ids = this.sels.map(item => item.id).toString();
			console.log(ids)
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {;
				api.BatchDeleteGroup({'ids':ids}).then((res) => {					
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getGroupUser();
				});
			}).catch(() => {
              this.$message.success('出错了哦，服务器崩溃了');
			});
		 },
	      //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.getGroupUser(this.currentPage, this.pagesize);
          },
          //第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.getGroupUser(this.currentPage, this.pagesize);
		  },  
		  //选中行
       	   groupSelectionChange(sels) {
	        this.sels = sels;
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
      mounted:function (){
      	this.getGroupUser();
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
.el-pagination.is-background .el-pager li.active{
	background-color: #324057 !important;
} 
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
	color: #333 !important;
    background-color: #fff;
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