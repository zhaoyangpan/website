<template>
	<el-container>	  
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="广告位管理"></el-tab-pane>					  
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
					  	<el-button type="primary" @click="handleAddAdvert">新增</el-button>
					  </div></el-col>
					</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="advertpositionlistLoading" element-loading-text="拼命加载中" :data="advertPositionTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="name" label="广告位"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="description" label="广告位描述"  show-overflow-tooltip> </el-table-column>		    
            <el-table-column prop="identify" label="标识" width="220" show-overflow-tooltip> </el-table-column> 
		    <el-table-column prop="created_time" label="创建时间" width="220" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间" width="220" show-overflow-tooltip> </el-table-column>
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
		  <el-dialog title="新增广告位" :visible.sync="addAdvertPositionVisible" width="40%" :close-on-click-modal="false">
		  	<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="addAdvertPosition" label-width="80px" :rules="addAdvertPositionRules" ref="addAdvertPosition">
						<el-form-item label="广告位" prop="name">
							<el-input v-model="addAdvertPosition.name" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="addAdvertPosition.description" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="标识" prop="identify">
							<el-input v-model="addAdvertPosition.identify" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<!--<el-form-item label="创建时间">
							<el-date-picker type="datetime" placeholder="选择日期" style="width: 100%;" v-model="addAdvertPosition.created_time"></el-date-picker>
						</el-form-item>-->
						<el-form-item label="排序">
							<el-input-number v-model="addAdvertPosition.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addAdvertPositionVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addAdvertPositionSubmit" :loading="addAdvertPositionLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--编辑标签-->
		<el-dialog title="编辑广告位" :visible.sync="editAdvertPositionVisible" width="40%" :close-on-click-modal="false">
			<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="editAdvertPosition" label-width="80px" :rules="editAdvertPositionRules" ref="editAdvertPosition">
						<el-form-item label="广告位" prop="name">
							<el-input v-model="editAdvertPosition.name" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="editAdvertPosition.description" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="标识" prop="identify">
							<el-input v-model="editAdvertPosition.identify" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<!--<el-form-item label="创建时间">
							<el-date-picker v-model="editAdvertPosition.created_time" style="width: 100%;" type="datetime" placeholder="选择创建时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="修改时间">
							<el-date-picker v-model="editAdvertPosition.updated_time" style="width: 100%;" type="datetime" placeholder="选择修改时间"> </el-date-picker>
						</el-form-item>-->
						<el-form-item label="排序">
							<el-input-number v-model="editAdvertPosition.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editAdvertPositionVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editAdvertPositionSubmit" :loading="editAdvertPositionLoading">提交</el-button>
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
	export default {
        data() {
	      return {
	        advertPositionTableData: [],
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
            advertpositionlistLoading:false,
            addAdvertPositionLoading:false,
            addAdvertPositionVisible:false,//显示新增
            editAdvertPositionLoading:false,
            editAdvertPositionVisible:false,//显示编辑
            options: [{
	          value: 1,
	          label: '标签'
	        }],
	        //新增标签数据
	        addAdvertPosition:{
	           name:'',
	           description:'',
	           sequence:'',
	        },
	        addAdvertPositionRules: {
				name: [
					{ required: true, message: '请输入图片描述', trigger: 'blur' },
				],				
			},
			 //编辑标签数据
	        editAdvertPosition:{
	           name:'',
	           description:'',	          
	           sequence:'',
	        },
	        editAdvertPositionRules: {
				name: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],				
			},
	      }
	    },
       methods: {
       	  //获取广告位列表
       	  GetAdvertPositionList:function(name,pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					name:this.name
				};
			this.advertpositionlistLoading = true;	
      		let data = [];
	        api.GetAdvertPositionList().then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.description = res.data.data.list[i].description;
		            obj.id = res.data.data.list[i].id;
		            obj.created_time = res.data.data.list[i].created_time
		            obj.created_user_id = res.data.data.list[i].created_user_id		           
		            obj.name = res.data.data.list[i].name
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.updated_time = res.data.data.list[i].updated_time
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            obj.identify = res.data.data.list[i].identify		            
		            data[i] = obj
		       }				  			
			    _this.advertPositionTableData = data;
			    this.advertpositionlistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.advertpositionlistLoading = false;
			});
       	  },
       	  //显示增加广告位界面
       	  handleAddAdvert:function(){
       	  	this.addAdvertPositionVisible = true;
       	  	this.addAdvertPosition = {
	           name:'',
	           description:'',
	           sequence:'',
	           identify:''
	        }
       	  },
       	  //增加广告位
       	  addAdvertPositionSubmit:function  () {
       	  	this.$refs.addAdvertPosition.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addAdvertPosition);
						//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddAdvertPosition(para).then((res) => {
							console.log(res)
							this.$message({
								message: '添加广告位成功',
								type: 'success'
							});
							this.$refs['addAdvertPosition'].resetFields();
							this.addAdvertPositionVisible = false;
							this.GetAdvertPositionList();
						});
					});
				}
			});
       	  },
       	  //显示广告位编辑界面
	      handleEdit:function(index, row){
	      	this.editAdvertPositionVisible = true;
//			this.editPowerForm = Object.assign({}, row);
            this.editAdvertPosition = {
	           name:row.name,
	           description:row.description,	          
	           sequence:row.sequence,
	           id:row.id,
	           identify:row.identify
	        }
            console.log(this.editAdvertPosition)
	      },
	      //编辑广告位
	      editAdvertPositionSubmit:function(){
	      	this.$refs.editAdvertPosition.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editAdvertPositionLoading = true;
							let para = Object.assign({}, this.editAdvertPosition);
							//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
							//para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');
							console.log(para)							
								api.EditAdvertPosition(para).then((res) => {
								this.editAdvertPositionLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editAdvertPosition'].resetFields();
								this.editAdvertPositionVisible = false;
								this.GetAdvertPositionList();
							});							
						});
					}
				});
	      },
       	  //删除单个广告位
		  handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.advertpositionlistLoading = true;
			let para = { id: row.id };
			console.log(para)
			api.DeleteAdvertPosition(para).then((res) => {
				    this.advertpositionlistLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetAdvertPositionList();
				});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
	      //批量删除广告位
		  batchRemove: function () {
			var ids = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {;
				api.BatchDeleteAdvertPosition({'ids':ids}).then((res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetAdvertPositionList();
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
			this.GetAdvertPositionList(this.currentPage, this.pagesize);
		  }, 
		   //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.GetAdvertPositionList(this.currentPage, this.pagesize);
          }, 
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //搜索
          search: function(){
          	this.advertpositionlistLoading = true;
            this.GetAdvertPositionList(this.tname, this.currentPage, this.pagesize);
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
      	this.GetAdvertPositionList();      
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
</style>