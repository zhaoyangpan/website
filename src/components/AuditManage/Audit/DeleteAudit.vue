<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="百科删除审核"></el-tab-pane>					  			  
					</el-tabs>
			  	</div>
			  </el-col>	
			  <el-col :span="4" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		 
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-form ref="form" :model="identificationForm" label-width="100px">
	  	  	<el-row :gutter="20">
			  <el-col :span="8">
			  	<div class="grid-content bg-purple">
			  		<el-form-item label="删除百科名称">				        
					    <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.baike_name"></el-input>
					</el-form-item>
			  		<el-form-item label="删除百科链接">
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.baike_url"></el-input>
				    </el-form-item>				    
					<el-form-item label="提交者昵称" >	
						<el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.nickname"></el-input>			        
				    </el-form-item>	
				    <el-form-item label="描述" >	
						<el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.describe"></el-input>			        
				    </el-form-item>	
				    <el-form-item label="问题类型" >	
						<el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.problem_types"></el-input>			        
				    </el-form-item>					   
				    <el-form-item label="驳回原因" v-if="identificationForm.verify_id == 2">				        
				        <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.result"></el-input>
				    </el-form-item>
			  	</div>
			  </el-col>			  
			</el-row>	
			  <el-form-item>
			  	<el-row :gutter="20">
				  <el-col :span="24">
				  	  <div class="grid-content bg-purple" v-if='identificationForm.verify_id == 3'>
					  	<el-button type="primary" @click="CrossIdent">通过审核</el-button>
				        <el-button type="danger"  @click="rejectVisible = true">审核驳回</el-button>
					  </div>
				  </el-col>				  			  
				</el-row>			    
			  </el-form-item>
			  <el-dialog
				  title="请填写驳回原因"
				  :visible.sync="rejectVisible"
				  width="30%">
				    <el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入原因"
					  v-model="return_reson">
					</el-input>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="rejectVisible = false">取 消</el-button>
				    <el-button type="primary" @click="RejectIdent">确 定</el-button>
				  </span>
				</el-dialog>				
			</el-form>
			<el-dialog :title="baikeTitle" :visible.sync="DetailDialogVisible" width="50%" center>
				  <div>
				  	<el-row>
					  <el-col :span="8" v-for="(o, index) in biakeList" :key="index" :offset="index > 0 ? 2 : 0">
					    <el-card :body-style="{ padding: '0px' }">
					      <img :src="o.articleUrl" class="image">
					      <div style="padding: 14px;">
					        <span>{{o.articleName}}</span>
					        <div class="bottom clearfix">
					          <time class="time">{{ o.citeDate }}</time>
					        </div>
					      </div>
					    </el-card>
					  </el-col>
					</el-row>
				  </div>				  
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="DetailDialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="DetailDialogVisible = false">确 定</el-button>
				  </span>
				</el-dialog>
	  	</div>
	  </el-main>
	</el-container>
</template>

<script>
	const api =require('../../../api/api.js')
	export default {
        data() {
	      return {	      	
	         identificationForm: {
	          baike_name: '',
	          baike_url: '',	 
	          nickname:'',
	          describe:'',
	          verify_id:'',
	          problem_types:'',
	          result:''
	        },

	        //百科详情列表
	        biakeList:[],
	        baikeTitle:'',
	        update:true,
            dialogVisible: false,
            DetailDialogVisible:false,
            //驳回原因是否显示
            rejectVisible: false,
            //驳回原因
            return_reson:'',
	        //通过认证数据
	        crossIdentification:{
	          title: '',
	          nickname: '',	 	           	           
	        },
	      }
	    },
	   
       methods: {
       	//获取单条信息
       	 GetIdentificationInfo:function(){
       	 	let routerParams = this.$route.query.id
       	 	let para = {
       	 		checkId:routerParams
       	 	 }
       	 	 api.GetDeleteAuditInfo(para).then(res => {		
       	 	 	console.log(res)
				this.identificationForm = {
		          baike_name: res.data.data.baike_name,
		          baike_url: res.data.data.baike_url,	 
		          result:res.data.data.result,
		          verify_id:res.data.data.verify_id,
		          nickname: res.data.data.nickname,
		          describe: res.data.data.describe,	 
		          problem_types:res.data.data.problem_types,
		       }
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
			});
       	 },      
       	 //通过认证
       	 CrossIdent:function() {
       	 	let routerParams = this.$route.query.id
       	 	this.crossIdentification = {
       	 	   checkId:routerParams,	         
	        }
	        this.$confirm('确认审核吗?', '提示', {
			}).then(() => {
			let para = Object.assign({}, this.crossIdentification);	
			api.CrossDeleteAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '审核成功',
					type: 'success'
				});		
				this.addMessage('百科删除审核反馈','你提交的 "' +this.identificationForm.baike_name+ '" 已通过审核')
				this.$router.push({path:'/DeleteManage'});
				}else{
					this.$message({
					message: res.data.msg,
					type: 'warning'
				});	
			  }								
			});				
			}).catch((err) => {
              this.$message({
				message: '已取消审核',
				type: 'success'
			});
		  });	
	     },
	     //认证驳回
	     RejectIdent:function(){
	     	let routerParams = this.$route.query.id
       	 	let para = {
       	 		checkId:routerParams,
       	 		reason:this.return_reson
       	 	}
	        this.$confirm('确认驳回吗?', '提示', {
			}).then(() => {
			api.RejectDeleteAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '已驳回',
					type: 'success'
				});	
				this.addMessage('百科删除审核反馈',this.return_reson)
				this.rejectVisible = false;
				this.$router.push({path:'/DeleteManage'});
				}else{
					this.$message({
					message: '驳回失败',
					type: 'warning'
				});	
				}
								
			});				
			}).catch((err) => {
              this.$message({
				message: '已取消驳回',
				type: 'success'
				});
			  });	
		  },
		  addMessage(title,content){
			let para = {
			    receiver_id:this.identificationForm.userId,
			    title:title,
			    content:content,
			}
			api.addMessage(para).then((res)=>{
				console.log(res)
			})
		}
       },
       mounted: function () {
      	   this.GetIdentificationInfo();       	   
       },
      watch: {
      '$route': 'GetIdentificationInfo'
      }
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
.main-card-bottom{
	min-height: 500px;
	background-color: #fff;
	padding: 20px;
}
.idcard>.el-form-item__label{
	width: 130px !important;
}
.ident-input>.el-input__inner{
	color: #606266 !important;
}
.ident-input>.el-textarea__inner{
	color: #606266 !important;
	font-size: 16px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #666;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 5px;
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
    width: 220px;
    height: 120px;
    display: block;
  } 
.disabled .el-upload--picture-card{
    display: none;
 }
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>