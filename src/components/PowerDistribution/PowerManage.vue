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
					  <el-col :span="15">
					  	  <div class="grid-content bg-purple">
						  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keywords"> </el-input>
						  </div>
					  </el-col>
					  <el-col :span="4">
					  	  <div class="grid-content bg-purple">
						  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
						  </div>
					  </el-col>
					  <el-col :span="5">
					  	  <div class="grid-content bg-purple">
						  	<el-button type="primary" @click="addPower">新增权限</el-button>
						  </div>
					  </el-col>
					</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="PowerTable" border :data="PowerTableData"  v-loading="powerlistLoading" element-loading-text="拼命加载中" tooltip-effect="dark" style="width: 100%" @selection-change="PowerSelectionChange">
	  	  	<el-table-column type="index" label="序号"></el-table-column>
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="modulename" label="模块名称"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="controllername" label="条目名称"  show-overflow-tooltip>  </el-table-column>		    
		    <el-table-column prop="controllerid" label="条目标识"  show-overflow-tooltip> </el-table-column>		    
		    <el-table-column prop="methodname" label="方法名称"  show-overflow-tooltip>  </el-table-column>
		    <el-table-column prop="methodid" label="方法标识"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="vroute" label="前台路由"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="moduleid" label="模块标识"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间"  show-overflow-tooltip> </el-table-column>
		    <!--<el-table-column prop="status_id" label="状态"  show-overflow-tooltip> 
		         <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
	                {{scope.row.status_id == 1 ? "已启用":"已禁用"}}
	              </el-tag>
	             </template>
		    </el-table-column>-->
		    <el-table-column prop="leftshow" label="左侧显示"  show-overflow-tooltip> 
		         <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.leftshow)" close-transition>
	                {{scope.row.leftshow == 1 ? "是":"否"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column label="操作" align='center' fixed="right" width="180"> 
		       <template slot-scope="scope" class="edit">		       	
		       		<el-button size="small" @click="editPowerInfo(scope.$index, scope.row)">编辑</el-button>		       				       		       	
		       		<el-button type="danger" size="small" @click="groupPowerDel(scope.$index, scope.row)">删除</el-button>		       				       	
		       </template>
		    </el-table-column>
		  </el-table>
		  <div class="pagination">
		  	<div class="pagination-btn">
		  		<el-button type="danger" @click="batchPowerDelete" :disabled="this.sels.length===0">批量删除</el-button>
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
	  	<!--新增分组权限-->
			<el-dialog title="新增分组权限" :visible.sync="addPowerVisible" :close-on-click-modal="false" width="40%">				
					<el-row>
					  <el-col :span="16">
					  	<div class="grid-content bg-purple">
					  	  <el-form :model="addPowerForm" label-width="80px" :rules="addPowerFormRules" ref="addPowerForm">	
					  	  	<el-form-item label="模块名称" prop="modulename">
								<el-input v-model="addPowerForm.modulename" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
					  		<el-form-item label="条目名称" prop="controllername">
								<el-input v-model="addPowerForm.controllername" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="条目标识" prop="controllerid">
								<el-input v-model="addPowerForm.controllerid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="方法名称" prop="methodname">
								<el-input v-model="addPowerForm.methodname" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="方法标识" prop="methodid">
								<el-input v-model="addPowerForm.methodid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>							
							<el-form-item label="前台路由" prop="vroute">
								<el-input v-model="addPowerForm.vroute" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="模块标识" prop="moduleid">
								<el-input v-model="addPowerForm.moduleid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<!--<el-form-item label="创建时间">
								<el-date-picker v-model="addPowerForm.created_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>-->
							<el-form-item label="组排序">
								<el-input-number v-model="addPowerForm.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
							</el-form-item>
							<!--<el-form-item label="状态" prop="status_id">
								<el-switch v-model="addPowerForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
							</el-form-item>-->
							<el-form-item label="左侧显示" prop="leftshow">
								<el-switch v-model="addPowerForm.leftshow" style="width: 100%;" active-text="是" inactive-text="否"> </el-switch>
							</el-form-item>
						  </el-form>
					  	</div>
					  </el-col>
					</el-row>																										
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addPowerVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addPowerSubmit">提交</el-button>
				</div>
			</el-dialog>
			<!--编辑分组权限-->
			<el-dialog title="编辑分组权限" :visible.sync="editPowerVisible" :close-on-click-modal="false" width="40%">
				<el-form :model="editPowerForm" label-width="80px" :rules="editPowerFormRules" ref="editPowerForm">
					<el-row :gutter="20">
					  <el-col :span="12">
					  	<div class="grid-content bg-purple">
					  		<el-form-item label="模块名称" prop="modulename">
								<el-input v-model="editPowerForm.modulename" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
					  		<el-form-item label="条目名称" prop="controllername">
								<el-input v-model="editPowerForm.controllername" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="条目标识" prop="controllerid">
								<el-input v-model="editPowerForm.controllerid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="方法名称" prop="methodname">
								<el-input v-model="editPowerForm.methodname" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="方法标识" prop="methodid">
								<el-input v-model="editPowerForm.methodid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>	
							<el-form-item label="前台路由" prop="vroute">
								<el-input v-model="editPowerForm.vroute" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="模块标识" prop="moduleid">
								<el-input v-model="editPowerForm.moduleid" style="width: 100%;" auto-complete="off"></el-input>
							</el-form-item>
							<!--<el-form-item label="创建时间">
								<el-date-picker v-model="editPowerForm.created_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>
							<el-form-item label="修改时间">
								<el-date-picker v-model="editPowerForm.updated_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
							</el-form-item>-->
							<el-form-item label="组排序">
								<el-input-number v-model="editPowerForm.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
							</el-form-item>	
							<!--<el-form-item label="状态" prop="status_id">
								<el-switch v-model="editPowerForm.status_id" style="width: 100%;" active-text="启用" inactive-text="禁用"> </el-switch>
							</el-form-item>-->
							<el-form-item label="左侧显示" prop="leftshow">
								<el-switch v-model="editPowerForm.leftshow" style="width: 100%;" active-text="是" inactive-text="否"> </el-switch>
							</el-form-item>
					  	</div>
					  </el-col>
					</el-row>																												
				</el-form>
				<div slot="footer"  class="dialog-footer">
					<el-button @click.native="editPowerVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editPowerSubmit" :loading="editPowerLoading">提交</el-button>
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
	        PowerTableData: [],
	        total: 0,
			//当前页码
            currentPage: 1,
			//默认每页数据量
            pagesize: 10,
            //默认数据总数
            totalCount: 0,
            //搜索条件
            keywords: '',     
	        addPowerVisible:false,
	        addPowerLoading:false,
	        editPowerVisible:false,
	        editPowerLoading:false,
	        powerlistLoading:false,	     
	        //新增界面数据
			addPowerForm: {
				controllername: '',
				controllerid:'',
				methodname:'',				
				methodid:'',
				modulename:'',
				moduleid: '',
				created_time:'',
				sequence:'',
				status_id:'',
				leftshow:''
			},
			addPowerFormRules: {
					controllename: [					
						{ required: true, message: '请输入条目名称', trigger: 'blur' }
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
			editPowerForm: {
				controllername: '',
				controllerid:'',
				methodname:'',				
				methodid:'',
				modulename:'',
				moduleid: '',
				created_time:'',
				updated_time:'',
				sequence:'',
				leftshow:''
			},
			editPowerFormRules: {
					controllername: [					
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
       	  //获取权限列表
       	   getPower(keywords, pageNumber, pageSize){
	      	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					keywords:this.keywords
				};
			this.powerlistLoading = true;	
      		let data = [];
	        api.GetPowerList(para).then(res => {	
				  console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.controllername = res.data.data.list[i].controllername;
		            obj.controllerid = res.data.data.list[i].controllerid
		            obj.controllersequence = res.data.data.list[i].controllersequence		           
		            obj.created_time = res.data.data.list[i].created_time
		            obj.created_user_id = res.data.data.list[i].created_user_id
		            obj.id = res.data.data.list[i].id
		            obj.methodid = res.data.data.list[i].methodid
		            obj.methodname = res.data.data.list[i].methodname
		            obj.methodsequence = res.data.data.list[i].methodsequence
		            obj.moduleid = res.data.data.list[i].moduleid
		            obj.modulename = res.data.data.list[i].modulename
		            obj.modulesequence = res.data.data.list[i].modulesequence
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.updated_time = res.data.data.list[i].updated_time
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            obj.vroute = res.data.data.list[i].vroute
		            obj.leftshow = res.data.data.list[i].leftshow
		            data[i] = obj
		       }				  			
			    _this.PowerTableData = data;
			    this.powerlistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.powerlistLoading = false;
			});
	      },
	      //搜索
          search: function(){
          	this.powerlistLoading = true;
            this.getPower(this.keywords, this.currentPage, this.pagesize);
          },
	      //显示增加分组权限
	      addPower:function(){
	      	this.addPowerVisible = true;	      	
	      	this.addPowerForm = {
				controllername: '',
				controllerid:'',
				methodname:'',				
				methodid:'',
				modulename:'',
				moduleid: '',
				sequence:'',
				vroute:'',
//				status_id:true,
				leftshow:true,
			}	      	
	      },
	      //增加分组权限
	      addPowerSubmit:function (){
	      	this.$refs.addPowerForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addPowerForm); 
						para.leftshow = (para.leftshow == true) ? 1 : 2;
						//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
						//para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddGroupPower(para).then((res) => {
							this.$message({	
								message: '添加分组权限成功',
								type: 'success'
							});
							this.$refs['addPowerForm'].resetFields();
							this.addPowerVisible = false;
							this.getPower();
						});
					});
				}
			});
	      },
	      //显示分组权限编辑界面
	      editPowerInfo:function(index, row){
	      	this.editPowerVisible = true;
//			this.editPowerForm = Object.assign({}, row);
            this.editPowerForm = {
				controllername: row.controllername,
				controllerid:row.controllerid,
				methodname:row.methodname,				
				methodid:row.methodid,
				modulename:row.modulename,
				moduleid: row.moduleid,				
				sequence:row.sequence,
				id:row.id,
				vroute:row.vroute,
//				status_id:row.status_id == 1 ? true : false,
				leftshow:row.leftshow == 1 ? true : false,
			},
			console.log(this.editPowerForm)
	      },
	      //编辑分组权限
	      editPowerSubmit:function(){
	      	this.$refs.editPowerForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editPowerLoading = true;
							let para = Object.assign({}, this.editPowerForm);
							para.leftshow = (para.leftshow == true) ? 1 : 2;
							//para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');							
								api.EditGroupPower(para).then((res) => {
								this.editPowerLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editPowerForm'].resetFields();
								this.editPowerVisible = false;
								this.getPower();
							});							
						});
					}
				});
	      },
	      //删除单个分组权限
		  groupPowerDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.powerlistLoading = true;
			let para = { id: row.id };
			api.DeleteGroupPower(para).then((res) => {
				    this.powerlistLoading = false;
					this.$notify({
						title:'成功',
						message: '删除分组权限成功',
						type: 'success'
					});
					this.getPower();
				});
			}).catch(() => {

			});
		  },
	      //批量删除分组权限
		  batchPowerDelete: function () {		  	
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {;
				api.BatchDeleteGroupPower({'ids':ids}).then((res) => {
					this.$notify({
						title:'成功',
						message: '删除成功',
						type: 'success'
					});
					this.getPower();
				});
			}).catch(() => {

			});
		 },
	      //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.getPower(this.currentPage, this.pagesize);
          },
          //第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.getPower(this.currentPage, this.pagesize);
		  },  
		  //选中行
       	   PowerSelectionChange(sels) {
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
      	this.getPower();
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
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
	color: #333 !important;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
}
.el-pagination.is-background .el-pager li.active{
	background-color: #324057 !important;
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