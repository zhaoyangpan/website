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
						  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="title"> </el-input>
						  </div></el-col>
						  <el-col :span="4"><div class="grid-content bg-purple">
						  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
						  </div></el-col>
						</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="PostlistLoading" element-loading-text="拼命加载中" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="index" :index="typeIndex" label="序号" width="50"> </el-table-column>
		    <el-table-column type="selection"> </el-table-column>
		    <el-table-column prop="title" width="180" label="帖子名称" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="description"  label="帖子描述" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="user_id"  label="发帖人"> </el-table-column>
		    <el-table-column prop="contentfllow_count"  label="评论数" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="vists"  label="浏览量" show-overflow-tooltip> </el-table-column>		    
		    <el-table-column prop="created_time" label="创建时间" width="220" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="verify_id" label="状态" width="220" show-overflow-tooltip> 
		     <template slot-scope="scope">	
		      <el-tag :type="articleStatusTag(scope.row.top)" close-transition>
                {{scope.row.top == 1 ? "已置顶":((scope.row.top == 2) ? "未置顶":"正常")}}
              </el-tag>
              <el-tag :type="articleStatusTag(scope.row.better)" close-transition>
                {{scope.row.better == 1 ? "已精华":((scope.row.better == 2) ? "未精华":"正常")}}
              </el-tag>
             </template>
		    </el-table-column>
		    <el-table-column label="操作" width="250" align='center' fixed="right" show-overflow-tooltip> 
		       <template slot-scope="scope" >
		       	    <el-button type="success" v-if="scope.row.top =='1'" size="small" @click="topClick(scope.$index, scope.row)">取消置顶</el-button>
					<el-button type="danger" v-if="scope.row.top =='2'" size="small" @click="topClick(scope.$index, scope.row)">置顶</el-button>
					<el-button type="success" v-if="scope.row.better =='1'" size="small" @click="betterClick(scope.$index, scope.row)">取消精华</el-button>
					<el-button type="danger" v-if="scope.row.better =='2'" size="small" @click="betterClick(scope.$index, scope.row)">精华</el-button>
				    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
		       </template>
		    </el-table-column>
		  </el-table>
						
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
	import util from '../../../common/js/util'
	const api =require('../../../api/api.js')
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
            title: '',          
            BatchDeletePost:'http://www.56whw.cn:56/post/batchDelete?contentIds=',
            PostlistLoading:false,     			    
	      }
	    },
       methods: {
       	  //获取帖子列表
       	  GetPostList:function(title,pageNumber, pageSize){
       	  	let routerParams = this.$route.query.id
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					title:this.title,
					tagId:routerParams
				};
			this.PostlistLoading = true;	
      		let data = [];
	        api.GetPostList(para).then(res => {	
				console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.title = res.data.data.list[i].title;
		            obj.description = res.data.data.list[i].description
		            obj.favorite = res.data.data.list[i].favorite		           
		            obj.contentfllow_count = res.data.data.list[i].contentfllow_count
		            obj.id = res.data.data.list[i].id
		            obj.post_count = res.data.data.list[i].post_count
		            obj.up = res.data.data.list[i].up
		            obj.user_id = res.data.data.list[i].user_id
		            obj.vists = res.data.data.list[i].vists
		            obj.top = res.data.data.list[i].top
		            obj.better = res.data.data.list[i].better
		            obj.type = res.data.data.list[i].type
		            obj.created_time = res.data.data.list[i].created_time
		            data[i] = obj
		       }				  			
			    _this.tableData = data;
			    this.PostlistLoading = false;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
              this.PostlistLoading = false;
			});
       	  },    
       	  //删除单个帖子
		  handleDel: function (index, row) {
			this.$confirm('确认删除该帖子吗?', '提示', {
				type: 'warning'
			}).then(() => {
			this.PostlistLoading = true;
			let para = { content_id: row.id };
			console.log(para)
			api.DeletePost(para).then((res) => {
				    this.PostlistLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetPostList();
				});
			}).catch((err) => {
              this.$message({
				message: '已取消删除',
				type: 'success'
			});
			});
		  },
	      //批量删除帖子
		  batchRemove: function () {
			var contentIds = this.sels.map(item => item.id).toString();
			this.$confirm('确认删除选中帖子吗？', '提示', {
				type: 'warning'
			}).then(() => {;
				api.BatchDeletePost({'contentIds':contentIds}).then((res) => {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.GetPostList();
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
			this.GetPostList(this.currentPage, this.pagesize);
		  }, 
		   //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.GetPostList(this.currentPage, this.pagesize);
          }, 
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //搜索
          search: function(){
          	this.PostlistLoading = true;
            this.GetPostList(this.title, this.currentPage, this.pagesize);
          },
          //序号
          typeIndex(index) {
	        return index + (this.currentPage - 1) * 10 + 1;
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
          //置顶
          topClick(index, row){
          	let para = {
          		contentId:row.id,
          		status:row.top == 1 ? 2 : 1,
          		statusType:'top'
          	}
	        this.$confirm(row.top == 1 ? '是否取消置顶？' : '是否确认置顶？', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          	api.ChangePostStatus(para).then((res) => {
	          		console.log(res)
					this.$message({
						message: row.top == 1 ? '取消置顶成功' : row.top == 2 ? '置顶成功': '置顶失败',
						type: 'success'
					});
					this.GetPostList();
				});	        
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消设置置顶'
	          });          
	        });
          },
          //精华
          betterClick(index, row){
          	let para = {
          		contentId:row.id,
          		status:row.better == 1 ? 2 : 1,
          		statusType:'better'
          	}
	        this.$confirm(row.better == 1 ? '是否取消精华' : '是否确认设置精华', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          	api.ChangePostStatus(para).then((res) => {
	          		console.log(res)
					this.$message({
						message: row.top == 1 ? '取消精华成功' : row.top == 2 ? '设置精华成功': '设置精华失败',
						type: 'success'
					});
					this.GetPostList();
				});	        
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消设置精华'
	          });          
	        });
          }
	     },
	     mounted: function () {
	      	this.GetPostList();      
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