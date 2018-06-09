<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="帖子举报信息"></el-tab-pane>					  			  
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
	  	  <el-form ref="form" :model="identificationForm" label-width="80px">
	  	  	<el-row :gutter="20">
			  <el-col :span="8">
			  	<div class="grid-content bg-purple">
			  		<el-form-item label="帖子名称">				        
					    <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.title"></el-input>
					</el-form-item>
			  		<el-form-item label="发布人">
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.issuer"></el-input>
				   </el-form-item>				    
					<el-form-item label="发布日期">				       
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.publish_time"></el-input>
				   </el-form-item>
				    <el-form-item label="举报人">				       
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.nickname"></el-input>
				    </el-form-item>
				    <el-form-item label="举报日期">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.created_time"></el-input>
				    </el-form-item>
				    <el-form-item label="举报原因">				       
				        <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.content"></el-input>
				    </el-form-item>
				    <el-form-item label="驳回原因" v-if="identificationForm.status_id == 2">				        
				        <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.return_reson"></el-input>
				    </el-form-item>
				    <!--<el-form-item label="帖子详情">				       
				        <el-button type="primary" size="mini">点击查看详情</el-button>
				    </el-form-item>-->
			  	</div>
			  </el-col>			  
			</el-row>	
			  <el-form-item>
			  	<el-row :gutter="20">
				  <el-col :span="24">
				  	  <div class="grid-content bg-purple" v-if='identificationForm.status_id == 3'>
					  	<el-button type="primary"  @click="CrossIdent">举报通过</el-button>
				        <el-button type="danger"  @click="rejectVisible = true">举报驳回</el-button>
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
	          content: '',
	          created_time: '',
	          id: '',
	          nickname: '',
	          status_id: '',
	          title: '',
	          user_id: '',
	        },
	        update:true,
            dialogVisible: false,
            //驳回原因是否显示
            rejectVisible: false,
            //驳回原因
            return_reson:'',
	        //通过认证数据
	        crossIdentification:{
	          content: '',
	          created_time: '',
	          id: '',
	          nickname: '',
	          status_id: '',
	          title: '',
	          user_id: '',	
	        },
	      }
	    },
	   
       methods: {
       	//获取单条信息
       	 GetIdentificationInfo:function(){
       	 	let routerParams = this.$route.query.id
       	 	let para = {
       	 		reportId:routerParams
       	 	 }
       	 	 api.GetPostInfo(para).then(res => {
       	 	 	console.log(res)				
				this.identificationForm = {
		          content: res.data.data.content,
		          created_time: res.data.data.created_time,
		          id: res.data.data.id,
		          nickname: res.data.data.nickname,
		          status_id: res.data.data.status_id,
		          title: res.data.data.title,
		          user_id: res.data.data.user_id,
		          issuer:res.data.data.issuer,
		          publish_time:res.data.data.publish_time,
		          return_reson:res.data.data.return_reson,
		        }
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
			});
       	 },
       	 //通过举报
       	 CrossIdent:function() {
       	 	let routerParams = this.$route.query.id
       	 	this.crossIdentification = {
       	 	   reportId:routerParams,	         
	        }
	        this.$confirm('确认举报吗?', '提示', {
			}).then(() => {
			let para = Object.assign({}, this.crossIdentification);	
			api.CrossReport(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '举报成功',
					type: 'success'
				});
				this.addMessage('帖子举报反馈','您提交的帖子 "' +this.identificationForm.title+ '" 已处理')
				this.$router.push({path:'/PostReportManage'});
				}else{
					this.$message({
					message: res.data.msg,
					type: 'warning'
				});	
			  }								
			});				
			}).catch((err) => {
              this.$message({
				message: '已取消举报',
				type: 'success'
			});
		  });	
	     },
	     //举报驳回
	     RejectIdent:function(){
	     	let routerParams = this.$route.query.id
       	 	let para = {
       	 		reportId:routerParams,
       	 		reason:this.return_reson
       	 	}
	        this.$confirm('确认驳回吗?', '提示', {
			}).then(() => {
			api.RejectReport(para).then((res) => {
				console.log(res)
				if(res.data.code == 200){
				    this.$message({
					message: '已驳回',
					type: 'success'
				});	
				this.addMessage('帖子举报反馈',this.return_reson)
				this.rejectVisible = false;
				this.$router.push({path:'/PostReportManage'});
				}else{
					this.$message({
					message: res.data.msg,
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
			    receiver_id:this.identificationForm.user_id,
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
</style>