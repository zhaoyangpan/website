<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="15" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card" @tab-click="AllIdent" v-model="activeName">
					  <el-tab-pane label="全部" name=""></el-tab-pane>
					  <el-tab-pane label="已处理" name="1"></el-tab-pane>
					  <el-tab-pane label="待处理" name="3"></el-tab-pane>	
					  <el-tab-pane label="已驳回" name="2"></el-tab-pane>
					</el-tabs>
			  	</div>
			  </el-col>
			  <el-col :span="8" class="search-col6">
			  	<div class="grid-content">
			  		<el-row :gutter="20">
					  <el-col :span="12"><div class="grid-content bg-purple">
					  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="word"> </el-input>
					  </div>
					  </el-col>
					  <el-col :span="6"><div class="grid-content bg-purple">
					  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
					  </div>
					 </el-col>					  
					</el-row>
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-table ref="multipleTable" border v-loading="LabellistLoading" element-loading-text="拼命加载中" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
		    <el-table-column type="index" label="序号" width="50"> </el-table-column>
		    <el-table-column prop="comment_content" label="回复内容" show-overflow-tooltip> 
		       <template slot-scope="scope">	
			      {{scope.row.comment_content | delHtmlTag}}
	            </template>
		    </el-table-column>
		    <el-table-column prop="nickname" label="举报人" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="created_time" label="举报时间" show-overflow-tooltip> </el-table-column>
		    <el-table-column prop="content" label="举报内容" show-overflow-tooltip> </el-table-column>		    		    
		    <el-table-column prop="status_id" label="处理状态" show-overflow-tooltip> 
		     <template slot-scope="scope">	
		      <el-tag :type="articleStatusTag(scope.row.status_id)" close-transition>
                {{scope.row.status_id == 1 ? "已处理":((scope.row.status_id == 2) ? "已驳回":"待处理")}}
              </el-tag>
             </template>
		    </el-table-column>		  
		    <el-table-column label="操作" width="350" align='center' fixed="right" show-overflow-tooltip> 
		       <template slot-scope="scope" >
					<router-link :to="{path: '/ReplyReport',query:{id: scope.row.id}}">
						<el-button type="danger" size="small">查看</el-button>
					</router-link>
				</template>
		    </el-table-column>
		  </el-table>	
		  <div class="pagination">
		  	<div class="pagination-btn">
		  		
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
            word: '',                
            LabellistLoading:false, 
            id:'',
            //tab默认状态
            activeName:'',
            status:'',            
	      }
	    },
       methods: {
       	  //获取百科举报列表
       	  GetIdentificationList:function(word, status, pageNumber, pageSize){
       	  	let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					word:this.word,
					status:this.status
				};
				console.log(para)
			this.LabellistLoading = true;	
      		let data = [];
	        api.GetReplyReportList(para).then(res => {
	        	  console.log(res)
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				  for (let i = 0; i < res.data.data.list.length; i++) {              
		            var obj = {}
		            obj.content = res.data.data.list[i].content;
		            obj.created_time = res.data.data.list[i].created_time;
		            obj.id = res.data.data.list[i].id		          
		            obj.nickname = res.data.data.list[i].nickname	
		            obj.sequence = res.data.data.list[i].sequence
		            obj.status_id = res.data.data.list[i].status_id
		            obj.comment_content = res.data.data.list[i].comment_content		          
		            obj.user_id = res.data.data.list[i].user_id			           
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
	      //第几页
       	  handleCurrentChange(val) {
			this.currentPage = val;
			this.GetIdentificationList(this.currentPage, this.pagesize);
		  }, 
		   //每页显示数据量变更
          handleSizeChange: function(val) {
            this.pagesize = val;
            this.GetIdentificationList(this.currentPage, this.pagesize);
          }, 
		  //选中行
       	   handleSelectionChange(sels) {
	        this.sels = sels;
	      },
	      //搜索
          search: function(){
          	this.LabellistLoading = true;
            this.GetIdentificationList(this.word, this.currentPage, this.pagesize);
          },
          AllIdent(tab, event) {
          	this.status = tab.name
          	this.word = ''
	        this.GetIdentificationList(this.word, this.status, this.currentPage, this.pagesize);
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
              case 3:
                     basic = 'warning';
                     break;
            }
            return basic;
          },
	     },
	    filters: {
	      //过滤html标签	      
          delHtmlTag(str){  
		    return str.replace(/<[^>]+>/g,"");  
		  }, 
		},
	    mounted: function () {
	      	this.GetIdentificationList();      
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