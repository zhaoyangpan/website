<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="全部"></el-tab-pane>
					  <el-tab-pane label="系统标签"></el-tab-pane>
					  <el-tab-pane label="用户自定义标签"></el-tab-pane>					  
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content">
			  		<el-row :gutter="20">
					  <el-col :span="15"><div class="grid-content bg-purple">
					  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="tname"> </el-input>
					  </div></el-col>
					  <el-col :span="4"><div class="grid-content bg-purple">
					  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
					  </div></el-col>
					  <el-col :span="5"><div class="grid-content bg-purple">
					  	<el-button type="primary" @click="handleAddLabel">新增标签</el-button>
					  </div></el-col>
					</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="LabellistLoading" element-loading-text="拼命加载中" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="index" label="序号"> </el-table-column>
		    <el-table-column type="selection" width="55"> </el-table-column>
		    <el-table-column prop="name" label="标签升级" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="post_count" label="帖子数量"> </el-table-column>
		    <el-table-column prop="baike_count" label="百科数量"> </el-table-column>
		    <el-table-column prop="sequence" label="排序"> </el-table-column>		    
		    <el-table-column prop="created_time" label="创建时间" width="200"> </el-table-column>
		    <el-table-column prop="updated_time" label="修改时间" width="200"> </el-table-column>
		    <el-table-column prop="status_id" label="状态" show-overflow-tooltip> 
		       <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
	                {{scope.row.status_id == 1 ? "已升级":"未升级"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column label="操作" width="350" align='center' fixed="right" show-overflow-tooltip> 
		       <template slot-scope="scope">
		       	    <el-button type="danger" size="small" @click="LabelUp">升级</el-button> 
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
		    </el-table-column>
		  </el-table>
		  <!--新增标签-->
		  <el-dialog title="新增标签升级" :visible.sync="addLabelVisible" width="40%" :close-on-click-modal="false">
		  	<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="addLabel" label-width="80px" :rules="addLabelRules" ref="addLabel">
						<el-form-item label="升级说明" prop="name">
							<el-input v-model="addLabel.name" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>				
						<!--<el-form-item label="创建时间">
							<el-date-picker type="datetime" style="width: 100%;" placeholder="选择日期" v-model="addLabel.created_time"></el-date-picker>
						</el-form-item>-->
						<el-form-item label="标签排序">
							<el-input-number v-model="addLabel.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addLabelVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addLabelSubmit" :loading="addLabelLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--编辑标签-->
		<el-dialog title="编辑标签" :visible.sync="editLabelVisible" width="40%" :close-on-click-modal="false">
			<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="editLabel" label-width="80px" :rules="editLabelRules" ref="editLabel">
						<el-form-item label="标签名称" prop="name">
							<el-input v-model="editLabel.name" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<!--<el-form-item label="创建时间">
							<el-date-picker v-model="editLabel.created_time" style="width: 100%;" type="datetime" placeholder="选择创建时间"> </el-date-picker>
						</el-form-item>
						<el-form-item label="修改时间">
							<el-date-picker v-model="editLabel.updated_time" style="width: 100%;" type="datetime" placeholder="选择修改时间"> </el-date-picker>
						</el-form-item>-->
						<el-form-item label="标签排序">
							<el-input-number v-model="editLabel.sequence" style="width: 100%;" :min="1" :max="200"></el-input-number>
						</el-form-item>
					</el-form>
			    </div>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editLabelVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editLabelSubmit" :loading="editLabelLoading">提交</el-button>
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
	      return {
	        tableData: [],
	        sels:[],//列表选中项
	      	total: 0,
			//当前页码
            currentPage: 1,
			//默认每页数据量
            pagesize: 10,
            //默认数据总数
            totalCount: 0,
            //搜索条件
            tname: '',       
            LabellistLoading:false,
            addLabelLoading:false,
            addLabelVisible:false,//显示新增
            editLabelLoading:false,
            editLabelVisible:false,//显示编辑
            options: [{
	          value: 1,
	          label: '标签'
	        }],
	        //新增标签数据
	        addLabel:{
	           name:'',
	           tagtype_id:'',
	           created_time:'',
	           sequence:'',
	        },
	        addLabelRules: {
				name: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],				
			},
			 //编辑标签数据
	        editLabel:{
	           name:'',
	           tagtype_id:'',
	           created_time:'',
	           updated_time:'',
	           sequence:'',
	        },
	        editLabelRules: {
				name: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],				
			},
	      }
	    },
       methods: {
       	  //获取标签列表
       	  GetLabelList:function(tname,pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					name:this.tname
				};
			this.LabellistLoading = true;	
      		let data = [];
	        api.GetLabelUpgradeList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.baike_count = res.data.data.list[i].baike_count;
		            obj.created_time = res.data.data.list[i].created_time
		            obj.created_user_id = res.data.data.list[i].created_user_id		           
		            obj.id = res.data.data.list[i].id
		            obj.post_count = res.data.data.list[i].post_count
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.name = res.data.data.list[i].name		           
		            obj.updated_time = res.data.data.list[i].updated_time
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            data[i] = obj
		       }				  			
			    _this.tableData = data;
			    this.LabellistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.LabellistLoading = false;
			});
       	  },
       	  //显示增加标签界面
       	  handleAddLabel:function(){
       	  	this.addLabelVisible = true;
       	  	this.addLabel = {
	           name:'',
	           sequence:'',
	        }
       	  	this.GetLabelType();
       	  },
       	  //增加标签
       	  addLabelSubmit:function  () {
       	  	this.$refs.addLabel.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addLabel);
						//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
						api.AddLabelUpgradeInfo(para).then((res) => {
							console.log(res)
							this.$message({
								message: '添加标签成功',
								type: 'success'
							});
							this.$refs['addLabel'].resetFields();
							this.addLabelVisible = false;
							this.GetLabelList();
						});
					});
				}
			});
       	  },
       	  //显示标签编辑界面
	      handleEdit:function(index, row){
	      	this.editLabelVisible = true;
//			this.editPowerForm = Object.assign({}, row);
            this.editLabel = {
	           name:row.name,	           
	           sequence:row.sequence,
	           id:row.id
	        }
	      },
	      //编辑标签
	      editLabelSubmit:function(){
	      	this.$refs.editLabel.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLabelLoading = true;
							let para = Object.assign({}, this.editLabel);
							//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
							//para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');							
								api.EditLabelUpgradeInfo(para).then((res) => {
								this.editLabelLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editLabel'].resetFields();
								this.editLabelVisible = false;
								this.GetLabelList();
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
			api.DeleteLabelUpgrade(para).then((res) => {
				    this.LabellistLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetLabelList();
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
				api.BatchDeleteLabelUpgrade({'ids':ids}).then((res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetLabelList();
				});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
		  //标签升级
		  LabelUp(){
		  	
		  },
	      //第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.GetLabelList(this.currentPage, this.pagesize);
		  }, 
		   //每页显示数据量变更
          handleSizeChange: function(val) {         	
            this.pagesize = val;
            this.GetLabelList(this.currentPage, this.pagesize);
          }, 
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //搜索
          search: function(){
          	this.LabellistLoading = true;
            this.GetLabelList(this.tname, this.currentPage, this.pagesize);
          },
	      //获取标签类型
	      GetLabelType:function(){
	      	let data = [];
	      	api.GetTagType().then((res) => {
				for (let i = 0; i < res.data.data.length; i++) {              
		            let obj = {}
		            obj.value = res.data.data[i].id;
		            obj.label = res.data.data[i].name;
		            data[i] = obj;
		        }
				this.options = data;
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
      	this.GetLabelList();      
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