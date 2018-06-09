<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card" @tab-click="AllIdent" v-model="activeName">
					  <el-tab-pane label="全部" name=""></el-tab-pane>  
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
						  	<el-button type="primary" @click="handleAddLabel">新增圈子</el-button>
						  </div></el-col>
						</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="LabellistLoading" element-loading-text="拼命加载中" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="tname"  label="圈子名称" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="post_count"  label="帖子数量"> </el-table-column>
		    <el-table-column prop="baike_count"  label="百科数量" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="topic_count"  label="活跃度" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="created_time" label="创建时间"  show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="verify_id" label="审核状态" width="200" show-overflow-tooltip> 
		      <template slot-scope="scope">	
			      <el-tag v-if="scope.row.verify_id == 1" :type="articleStatusTag(scope.row.verify_id)" close-transition>
	                                  通过
	              </el-tag>
	              <el-tag v-if="scope.row.verify_id == 2" :type="articleStatusTag(scope.row.verify_id)" close-transition>
	                                  未通过
	              </el-tag>
	              <el-tag v-if="scope.row.verify_id == 3" :type="articleStatusTag(scope.row.verify_id)" close-transition>
	                                  审核中
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column prop="ishot" label="是否热门"  show-overflow-tooltip> 
		         <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.ishot)" close-transition>
	                {{scope.row.ishot == 1 ? "是":"否"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column prop="status_id" label="状态"  show-overflow-tooltip> 
		         <template slot-scope="scope">	
			      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
	                {{scope.row.status_id == 1 ? "已启用":"已禁用"}}
	              </el-tag>
	             </template>
		    </el-table-column>
		    <el-table-column label="操作" width="350" align='center' fixed="right" show-overflow-tooltip> 
		       <template slot-scope="scope" >
		       	    <router-link :to="{path: '/PostManage',query:{id: scope.row.id}}">
		       	    	<el-button  size="small" >帖子</el-button>
		       	    </router-link>
					<el-button  size="small" @click="">文章</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>					
				</template>
		    </el-table-column>
		  </el-table>
		  <!--新增圈子-->
		  <el-dialog title="新增圈子" :visible.sync="addLabelVisible" width="40%" :close-on-click-modal="false">
		  	<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="addLabel" label-width="80px" :rules="addLabelRules" ref="addLabel">
						<el-form-item label="圈子名称" prop="tname">
							<el-input v-model="addLabel.tname" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="圈子类型">
							<el-select v-model="addLabel.tagtype_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="审核状态">
							<el-select v-model="addLabel.verify_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							 </el-select>
						</el-form-item>
						<el-form-item label="是否热门" prop="ishot">
							<el-switch v-model="addLabel.ishot" style="width: 100%;" active-text="是" inactive-text="否"> </el-switch>
						</el-form-item>
						<el-form-item label="圈子排序">
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
		<!--编辑圈子-->
		<el-dialog title="编辑圈子" :visible.sync="editLabelVisible" width="40%" :close-on-click-modal="false">
			<el-row>
			  <el-col :span="16">
			  	<div class="grid-content bg-purple-dark">
					<el-form :model="editLabel" label-width="80px" :rules="editLabelRules" ref="editLabel">
						<el-form-item label="圈子名称" prop="tname">
							<el-input v-model="editLabel.tname" style="width: 100%;" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="圈子类型">
							<el-select v-model="editLabel.tagtype_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="审核状态">
							<el-select v-model="editLabel.verify_id" placeholder="请选择" style="width: 100%;">
							    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"> </el-option>
							 </el-select>
						</el-form-item>
						<el-form-item label="是否热门" prop="ishot">
							<el-switch v-model="editLabel.ishot" style="width: 100%;" active-text="是" inactive-text="否"> </el-switch>
						</el-form-item>
						<el-form-item label="圈子排序">
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
            //tab默认状态
            activeName:'',
            tagsys_id:'',
            LabellistLoading:false,
            addLabelLoading:false,
            addLabelVisible:false,//显示新增
            editLabelLoading:false,
            editLabelVisible:false,//显示编辑
            options: [{
	          value: 1,
	          label: '标签'
	        }],
	        options2: [
			{
	          value: 3,
	          label: '审核中'
	        },
			{
	          value: 2,
	          label: '未通过'
	        },
			{
	          value: 1,
	          label: '通过'
	        }],
	        //新增标签数据
	        addLabel:{
	           tname:'',
	           tagtype_id:'',
	           sequence:'',
	        },
	        addLabelRules: {
				tname: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],				
			},
			 //编辑标签数据
	        editLabel:{
	           tname:'',
	           tagtype_id:'',	           
	           sequence:'',
	        },
	        editLabelRules: {
				tname: [
					{ required: true, message: '请输入标签名', trigger: 'blur' },
				],				
			},
	      }
	    },
       methods: {
       	  //获取圈子列表
       	  GetLabelList:function(tname,tagsys_id,pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					tname:this.tname,
					tagsys_id:this.tagsys_id,
					tagtype_id:2
				};
			this.LabellistLoading = true;	
      		let data = [];
	        api.GetCircleList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.baike_count = res.data.data.list[i].baike_count;
		            obj.created_time = res.data.data.list[i].created_time
		            obj.created_user_id = res.data.data.list[i].created_user_id		           
		            obj.description = res.data.data.list[i].description
		            obj.id = res.data.data.list[i].id
		            obj.post_count = res.data.data.list[i].post_count
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.tname = res.data.data.list[i].tname
		            obj.topic_count = res.data.data.list[i].topic_count
		            obj.tagtype_id = res.data.data.list[i].tagtype_id
		            obj.updated_time = res.data.data.list[i].updated_time
		            obj.updated_user_id = res.data.data.list[i].updated_user_id
		            obj.verify_id = res.data.data.list[i].verify_id
		            obj.verify_name = res.data.data.list[i].verify_name	
		            obj.ishot = res.data.data.list[i].ishot
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
	           tname:'',
	           tagtype_id:'',
	           sequence:'',
	           verify_id:'',
	           ishot:true,
	        }
       	  	this.GetLabelType();
       	  },
       	  //增加标签
       	  addLabelSubmit:function  () {
       	  	this.$refs.addLabel.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.addLabel);
						para.ishot = (para.ishot == true) ? 1 : 2;
						api.AddCircleInfo(para).then((res) => {
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
	           tname:row.tname,
	           tagtype_id:row.tagtype_id,	          
	           sequence:row.sequence,
	           id:row.id,
	           verify_id:row.verify_id,
	           ishot:row.ishot == 1 ? true : false,
	        }
	      },
	      //编辑标签
	      editLabelSubmit:function(){
	      	this.$refs.editLabel.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLabelLoading = true;
							let para = Object.assign({}, this.editLabel);
							para.ishot = (para.ishot == true) ? 1 : 2;
							//para.created_time = (!para.created_time || para.created_time == '') ? '' : util.formatDate.format(new Date(para.created_time), 'yyyy-MM-dd hh:mm:ss');
							//para.updated_time = (!para.updated_time || para.updated_time == '') ? '' : util.formatDate.format(new Date(para.updated_time), 'yyyy-MM-dd hh:mm:ss');							
								api.EditCircleInfo(para).then((res) => {
								this.editLabelLoading = false;
								//NProgress.done();
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
			api.DeleteCircle(para).then((res) => {
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
				api.BatchDeleteCircle({'ids':ids}).then((res) => {
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
	      //标签筛选
          AllIdent(tab, event) {
          	this.currentPage = 1;
          	this.tagsys_id = tab.name
	        this.GetLabelList(this.tname, this.tagsys_id, this.currentPage, this.pagesize);
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