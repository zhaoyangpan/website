<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="广告管理"></el-tab-pane>					  
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content">
			  		<el-row :gutter="20">
					  <el-col :span="15"><div class="grid-content bg-purple">
					  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="title"> </el-input>
					  </div></el-col>
					  <el-col :span="4"><div class="grid-content bg-purple">
					  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
					  </div></el-col>
					  <el-col :span="5"><div class="grid-content bg-purple">
					  	<el-button type="primary" @click="handleAddAdvert">新增广告</el-button>
					  </div></el-col>
					</el-row>			  		
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="advertlistLoading" element-loading-text="拼命加载中" :data="advertTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="title" label="广告名称"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="description" label="广告描述" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="advposition_name" label="广告位置" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="image" label="广告图片" width="200"> 
		      <template slot-scope="scope">
			    <img :src="scope.row.image" width="24" height="24"/>
			  </template>
		    </el-table-column>		    
		    <el-table-column prop="show_time" label="上线时间" show-overflow-tooltip> </el-table-column>	
		    <el-table-column prop="close_time" label="下线时间" show-overflow-tooltip> </el-table-column>	
		    <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="status_id" label="状态" width="180" show-overflow-tooltip> 
		      <template slot-scope="scope">	
		      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
                {{scope.row.status_id == 1 ? "启用":"禁用"}}
              </el-tag>
             </template>
		    </el-table-column>
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
						<el-form-item label="广告名称" prop="title">
							<el-input v-model="addAdvert.title" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告链接" prop="url">
							<el-input v-model="addAdvert.url" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告描述" prop="description">
							<el-input type="textarea" v-model="addAdvert.description" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告图片">
							<el-upload
							  class="avatar-uploader"
							  :action="importFileUrl"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="imageUrl" :src="imageUrl" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>							
						</el-form-item>
						<el-form-item label="广告排序">
							<el-input-number v-model="addAdvert.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
						<el-form-item label="上线时间" prop="show_time">
							<el-date-picker v-model="addAdvert.show_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="下线时间" prop="close_time">
							<el-date-picker v-model="addAdvert.close_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="广告位">
							<el-select v-model="addAdvert.advposition_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
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
						<el-form-item label="广告名称" prop="title">
							<el-input v-model="editAdvert.title" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告链接" prop="url">
							<el-input v-model="editAdvert.url" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告描述" prop="description">
							<el-input type="textarea" v-model="editAdvert.description" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="广告位" prop="advposition_id">
							<el-select v-model="editAdvert.advposition_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="上线时间" prop="show_time">
							<el-date-picker v-model="editAdvert.show_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="下线时间" prop="close_time">
							<el-date-picker v-model="editAdvert.close_time" style="width: 100%;" type="datetime" placeholder="选择日期时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="广告图片">
							<el-upload
							  class="avatar-uploader"
							  :action="importFileUrl"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="imageUrl" :src="imageUrl" class="avatar">
							  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>							
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
            title: '',   
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
	           url:'',
	           created_time:'',
	           sequence:'',
	           description:'',
	        },
	        addAdvertRules: {
				title: [
					{ required: true, message: '请输入图片描述', trigger: 'blur' },
				],
				url:[
				    {required: true, message: '请输入链接网址', trigger: 'blur'},
				    { pattern:/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/, message: '请输入有效网址例如（http://www.56whw.cn）'}
				]
			},
			 //编辑广告
	        editAdvert:{
	           title:'',
	           url:'',
	           created_time:'',
	           updated_time:'',
	           sequence:'',
	           advposition_id:'',
	           description:''
	        },
	        editAdvertRules: {
				title: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],
				url:[
				    {required: true, message: '请输入链接网址', trigger: 'blur'},
				    { pattern:/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/, message: '请输入有效网址例如（http://www.56whw.cn）'}
				]
			},
	      }
	    },
       methods: {
       	  //获取广告列表
       	  GetAdvertList:function(title,pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					title:this.title
				};
			this.advertlistLoading = true;	
      		let data = [];
	        api.GetAdvertList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.advposition_id = res.data.data.list[i].advposition_id;
		            obj.advposition_name = res.data.data.list[i].advposition_name;
		            obj.id = res.data.data.list[i].id;
		            obj.created_time = res.data.data.list[i].created_time
		            obj.created_user_id = res.data.data.list[i].created_user_id		           
		            obj.image = res.data.data.list[i].image
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.description = res.data.data.list[i].description
		            obj.title = res.data.data.list[i].title
		            obj.updated_time = res.data.data.list[i].updated_time
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            obj.url = res.data.data.list[i].url
		            obj.show_time = res.data.data.list[i].show_time
		            obj.close_time = res.data.data.list[i].close_time
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
       	  	this.imageUrl = '';
       	  	this.addAdvert = {
	           title:'',
	           url:'',
	           sequence:'',
	           image:'',
	           show_time:'',
	           close_time:'',
	           description:''
	        }      	  	
       	  },
       	  //增加广告
       	  addAdvertSubmit:function  () {
       	  	this.$refs.addAdvert.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addAdvert);
						para.show_time = (!para.show_time || para.show_time == '') ? '' : util.formatDate.format(new Date(para.show_time), 'yyyy-MM-dd hh:mm:ss');
						para.close_time = (!para.close_time || para.close_time == '') ? '' : util.formatDate.format(new Date(para.close_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddAdvert(para).then((res) => {
							console.log(res)
							this.$message({
								message: '添加广告成功',
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
	      	api.GetAdvertPosition().then((res) => {
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
	           url:row.url,	           
	           sequence:row.sequence,
	           id:row.id,
	           advposition_id:parseInt(row.advposition_id),
	           show_time:row.show_time,
	           close_time:row.close_time,
	           description:row.description,
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
							para.show_time = (!para.show_time || para.show_time == '') ? '' : util.formatDate.format(new Date(para.show_time), 'yyyy-MM-dd hh:mm:ss');
							para.close_time = (!para.close_time || para.close_time == '') ? '' : util.formatDate.format(new Date(para.close_time), 'yyyy-MM-dd hh:mm:ss');																					
								para.image = this.imageUrl;
								api.EditAdvert(para).then((res) => {
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
			api.DeleteAdvert(para).then((res) => {
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
				api.BatchDeleteAdvert({'ids':ids}).then((res) => {
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
            this.GetAdvertList(this.tname, this.currentPage, this.pagesize);
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
        //广告图
        beforeAvatarUpload(file) {
	      const isJPG = file.type === 'image/jpeg';	    
          const isPNG = file.type === 'image/png';
          const isLt1M = file.size / 1024 / 1024 < 1;
	      if (!isJPG && !isPNG) {
	          this.$confirm('上传图片暂时只支持JPG或者PNG格式', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'error' ,
	            callback: action => {
	              this.$refs.form.resetFields();
	
	              this.$emit('closeEditUpload');
	            }
	          })
	      }
	      if(!isLt1M) {  
            this.$message({  
                message: '上传文件大小不能超过 1MB!',  
                type: 'warning'  
            });  
          }  
         return (isJPG || isPNG) && isLt1M;
	    },
	    handleAvatarSuccess(res, file) {
	    	console.log(res)		    	
            this.imageUrl = res.data;
            this.addAdvert.image = res.data;
	    },         	     
	    handleExceed1(files, fileList) {
	      this.$message.warning(` 只能上传${files.length}张图片 `);
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