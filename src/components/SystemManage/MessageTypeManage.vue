<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="消息管理"></el-tab-pane>					  
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content">
			  		<el-row :gutter="20">
					  <el-col :span="15"><div class="grid-content bg-purple">
					  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="name"> </el-input>
					  </div></el-col>
					  <el-col :span="4"><div class="grid-content bg-purple">
					  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
					  </div></el-col>
					  <el-col :span="5"><div class="grid-content bg-purple">
					  	<el-button type="primary" @click="handleAddAdvert">新增消息</el-button>
					  </div></el-col>
					</el-row>			  		
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="advertlistLoading" element-loading-text="拼命加载中" :data="advertTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="title" label="消息名称"  show-overflow-tooltip> </el-table-column>	
		    <el-table-column prop="messagetpl_title" label="分类标题"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间" show-overflow-tooltip> </el-table-column>
		    <!--<el-table-column prop="status_id" label="状态" width="180" show-overflow-tooltip> 
		      <template slot-scope="scope">	
		      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
                {{scope.row.status_id == 1 ? "启用":"禁用"}}
              </el-tag>
             </template>
		    </el-table-column>-->
		    <el-table-column label="操作" align='center' fixed="right" width="180" show-overflow-tooltip> 
		       <template slot-scope="scope" >
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
		    </el-table-column>
		  </el-table>
		  <!--新增广告-->
		  <el-dialog title="新增广告" :visible.sync="addAdvertVisible" width="40%" :close-on-click-modal="false">
		  	<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="addAdvert" label-width="80px" :rules="addAdvertRules" ref="addAdvert">
						<el-form-item label="消息标题" prop="title">
							<el-input v-model="addAdvert.title" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>						
						<el-form-item label="消息分类" prop="mcategory_id">
							<el-select v-model="addAdvert.mcategory_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="消息排序">
							<el-input-number v-model="addAdvert.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>						
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addAdvertVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addAdvertSubmit" :loading="addAdvertLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--编辑标签-->
		<el-dialog title="编辑广告" :visible.sync="editAdvertVisible" width="40%" :close-on-click-modal="false">
			<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="editAdvert" label-width="80px" :rules="editAdvertRules" ref="editAdvert">
						<el-form-item label="消息标题" prop="title">
							<el-input v-model="editAdvert.title" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="消息内容" prop="content">
							<el-input v-model="editAdvert.content" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="消息分类" prop="mcategory_id">
							<el-select v-model="editAdvert.mcategory_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>										
						<el-form-item label="排序">
							<el-input-number v-model="editAdvert.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editAdvertVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editAdvertSubmit" :loading="editAdvertLoading">提交</el-button>
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
	const api =require('../../api/api.js')
	import util from '../../common/js/util'
	export default {
        data() {
	      return {
	        advertTableData: [],
	        sels:[],//列表选中项
	      	total: 0,
			//当前页码
            currentPage: 1,
			//默认每页数据量
            pagesize: 10,
            //默认数据总数
            totalCount: 0,
            //搜索条件
            name: '',   
            imageUrl: '',
            advertlistLoading:false,
            addAdvertLoading:false,
            addAdvertVisible:false,//显示新增
            editAdvertLoading:false,
            editAdvertVisible:false,//显示编辑
            //图片上传
            importFileUrl:'http://www.56whw.cn:56/common/uploadImage',
            //广告位
            options: [{
	          value: '',
	          lable: ''
	        }],
	        //新增广告
	        addAdvert:{
	           title:'',
	           content:'',
	           mcategory_id:'',
	           sequence:'',
	        },
	        addAdvertRules: {
				title: [
					{ required: true, message: '请输入消息名称', trigger: 'blur' },
				],
				content:[
				    {required: true, message: '请输入消息内容', trigger: 'blur'},
				],    
			},
			 //编辑广告
	        editAdvert:{
	           title:'',
	           content:'',
	           mcategory_id:'',
	           sequence:'',
	        },
	        editAdvertRules: {
				title: [
					{ required: true, message: '请输入消息名称', trigger: 'blur' },
				],
				content:[
				    {required: true, message: '请输入消息内容', trigger: 'blur'},				    
				]
			},
	      }
	    },
       methods: {
       	  //获取广告列表
       	  GetAdvertList:function(name,pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					name:this.name
				};
			this.advertlistLoading = true;	
      		let data = [];
	        api.GetMessageTplList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            
		            
		            obj.content = res.data.data.list[i].content;
		            obj.created_time = res.data.data.list[i].created_time;
		            obj.id = res.data.data.list[i].id;
		            obj.mcategory_id = res.data.data.list[i].mcategory_id
		            obj.mcategory_name = res.data.data.list[i].mcategory_name
		            obj.sequence = res.data.data.list[i].sequence		           
		            obj.status_id = res.data.data.list[i].status_id	
		            obj.title = res.data.data.list[i].title;
		            obj.updated_time = res.data.data.list[i].updated_time;		          
		            data[i] = obj
		       }				  			
			    _this.advertTableData = data;
			    this.advertlistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.advertlistLoading = false;
			});
       	  },
       	  //显示增加广告界面
       	  handleAddAdvert:function(){
       	  	this.addAdvertVisible = true;
       	  	this.getAdverposition()
       	  	this.addAdvert = {
	           title:'',
	           content:'',
	           mcategory_id:'',
	           sequence:'',
	        }      	  	
       	  },
       	  //增加广告
       	  addAdvertSubmit:function  () {
       	  	this.$refs.addAdvert.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addAdvert);
						//para.show_time = (!para.show_time || para.show_time == '') ? '' : util.formatDate.format(new Date(para.show_time), 'yyyy-MM-dd hh:mm:ss');
						//para.close_time = (!para.close_time || para.close_time == '') ? '' : util.formatDate.format(new Date(para.close_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddMessageTpl(para).then((res) => {
							console.log(res)
							this.$message({
								message: '添加消息成功',
								type: 'success'
							});
							this.$refs['addAdvert'].resetFields();
							this.addAdvertVisible = false;
							this.GetAdvertList();
						});
					});
				}
			});
       	  },
       	  //获取广告位
       	  getAdverposition:function(){
       	  	let data = [];
	      	api.GetAllMessageTypeList().then((res) => {
				for (let i = 0; i < res.data.data.length; i++) {              
		            let obj = {}
		            obj.value = res.data.data[i].id;
		            obj.label = res.data.data[i].name;
		            data[i] = obj;
		        }
				this.options = data;
			});
       	  },
       	  //显示标签编辑界面
	      handleEdit:function(index, row){
	      	this.editAdvertVisible = true;
//			this.editPowerForm = Object.assign({}, row);
            this.getAdverposition();
            this.imageUrl = row.image;
            this.editAdvert = {
	           title:row.title,
	           content:row.content,
	           mcategory_id:row.mcategory_id,
	           sequence:row.sequence,
	           id:row.id
	        }
            console.log(this.editAdvert)
	      },
	      //编辑标签
	      editAdvertSubmit:function(){
	      	this.$refs.editAdvert.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editAdvertLoading = true;
							let para = Object.assign({}, this.editAdvert);
							//para.show_time = (!para.show_time || para.show_time == '') ? '' : util.formatDate.format(new Date(para.show_time), 'yyyy-MM-dd hh:mm:ss');
							//para.close_time = (!para.close_time || para.close_time == '') ? '' : util.formatDate.format(new Date(para.close_time), 'yyyy-MM-dd hh:mm:ss');																					
								api.EditMessageTpl(para).then((res) => {
								this.editAdvertLoading = false;
								if(res.data.code == '200'){
									this.$message({
										message: res.data.msg,
										type: 'success'
									 });
								}else{
									this.$message({
										message: res.data.msg,
										type: 'warning'
									 });
								}								
								this.$refs['editAdvert'].resetFields();
								this.editAdvertVisible = false;
								this.GetAdvertList();
							});														
						});
					}
				});
	      },
       	  //删除单个用户
		  handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.LabellistLoading = true;
			let para = { id: row.id };
			console.log(para)
			api.DeleteMessageTpl(para).then((res) => {
				    this.LabellistLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetAdvertList();
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
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {;
				api.BatchDeleteMessageTpl({'ids':ids}).then((res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetAdvertList();
				});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
	      //第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.GetAdvertList(this.currentPage, this.pagesize);
		  }, 
		   //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.GetAdvertList(this.currentPage, this.pagesize);
          }, 
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //搜索
          search: function(){
          	this.LabellistLoading = true;
            this.GetAdvertList(this.name, this.currentPage, this.pagesize);
          },
          //状态
          articleStatusTag(item){
            let basic = "";
            switch (item) {
              case 1:
                     basic = 'success';
                     break;
              case 2:
                     basic = 'danger';
                     break;
            }
            return basic;
        },     
     },
     mounted: function () {
      	this.GetAdvertList();      
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>