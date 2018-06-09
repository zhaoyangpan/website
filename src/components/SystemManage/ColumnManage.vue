<template>
  	<div class="node-wrap">
    <div class="addnodebtn" style="margin-bottom:20px;">
    	<el-row :gutter="20">
			  <el-col :span="9">
			  	<div class="grid-content bg-purple">
				  	<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="cname"> </el-input>
				  </div>
			  </el-col>
			  <el-col :span="4">
			  	<div class="grid-content bg-purple">
				  	<el-button type="primary" class="search-btns" @click="search">搜索</el-button>
				  </div>
			  </el-col>
			  <el-col :span="5">
			  	<div class="grid-content bg-purple">
			  		<router-link :to="{path: '/AddNode'}">
						  <el-button type="primary">新增</el-button>
					  </router-link>				  	
				  </div>
			  </el-col>
			</el-row>
    </div> 
    
    <tree-table :data="data" :columns="columns" v-loading="LabellistLoading" border align="center" style="width: 100%;" @delUpdate="delUpdate"></tree-table>
    <div  class="paginations">
		    <div class="paginas">
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
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
const api =require('../../api/api.js')
export default {
  name: 'treeTableDemo',
  components: { treeTable },
  data() {
    return {
    	total: 0,
			//当前页码
      currentPage: 1,
			//默认每页数据量
      pagesize: 10,
      //默认数据总数
      totalCount: 0,
      //搜索条件
      cname:'',
      LabellistLoading:false,
      columns: [
        {
          text: '名称',
          value: 'cname',
          width: 200
        },                        
        {
          text: '类型',
          value: 'description'
        },
      ],
      data: []
    }
  },
  methods:{
  	delUpdate(){
  		this.getTreeTable();
  	},
  	getTreeTable(title,pageNumber, pageSize){
	  		let para = {
					pageNumber: this.currentPage,
					pageSize: this.pagesize,
					cname:this.cname
				};
	  		this.LabellistLoading = true;	
      		let data = [];
      		api.GetColumnList(para).then(res => {	
				  let _this = this;
				  _this.totalCount = res.data.data.totalRow;			  
				   console.log(res) 
				   var topCategory=[];
			    _this.data = res.data.data.list;
			     _this.data.unshift({cname:'顶级栏目',parent_id:0,status_id:1,image:"http://www.56whw.com"})
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
			this.getTreeTable(this.currentPage, this.pagesize);
		  }, 
	   //每页显示数据量变更
	  handleSizeChange: function(val) {
	    this.pagesize = val;
	    this.getTreeTable(this.currentPage, this.pagesize);
	  }, 
	  //搜索
	  search: function(){
	  	this.LabellistLoading = true;
	    this.getTreeTable(this.cname, this.currentPage, this.pagesize);
	  },
	  
  },
  mounted: function () {
  	  this.getTreeTable();      
  },
}
</script>
<style>
.node-wrap{
	position: relative;
	top: 40px;
}
.addnodebtn{
	width: 30%;
	position: absolute;
	right: -50px;
	top: -50px;
}
.paginations{
  	width: 100%;
  	position: relative;
}
.paginas{
  	position: absolute;
  	right: 20px;
}
</style>