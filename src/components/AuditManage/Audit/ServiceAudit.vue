<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="服务审核"></el-tab-pane>					  			  
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
			  		<el-form-item label="服务名称">				        
					    <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.service_name"></el-input>
					</el-form-item>
			  		<el-form-item label="服务类型">
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.type"></el-input>
				   </el-form-item>				    
					<el-form-item label="服务信息">				       
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.description"></el-input>
				   </el-form-item>
				    <el-form-item label="地址">				       
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.address"></el-input>
				    </el-form-item>
				    <el-form-item label="人均消费">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.avgfee"></el-input>
				    </el-form-item>
				    <el-form-item label="服务详情">				       
				        <el-button type="primary" size="mini">点击查看详情</el-button>
				    </el-form-item>				    
			  	</div>
			  	
			  </el-col>
			  <el-col :span="8">
			  	<div class="grid-content bg-purple-light">
			  		<el-form-item label="付款方式">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.paystyle"></el-input>
				    </el-form-item>
				    <el-form-item label="服务时间">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.servicetime"></el-input>
				    </el-form-item>
				    <el-form-item label="联系人">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.contactpeople"></el-input>
				    </el-form-item>
				    <el-form-item label="联系电话">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.contactphone"></el-input>
				    </el-form-item>
				    <el-form-item label="车辆信息">				        
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.car_message"></el-input>
				    </el-form-item>
				    <el-form-item label="驳回原因" v-if="identificationForm.verify_id == 2">				        
				        <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.return_reson"></el-input>
				    </el-form-item>
			  	</div>
			  </el-col>
			</el-row>	
			  <el-form-item>
			  	<el-row :gutter="20">
				  <el-col :span="24">
				  	  <div class="grid-content bg-purple">
					  	<el-button type="primary" v-if='identificationForm.verify_id != 1' :disabled='identificationForm.verify_id == 1' @click="CrossIdent">通过审核</el-button>
				        <el-button type="danger"  @click="rejectVisible = true" v-if='identificationForm.verify_id != 1' :disabled='identificationForm.verify_id == 1 || identificationForm.verify_id == 2'>审核驳回</el-button>
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
	          service_name: '',
	          type: '',
	          description: '',
	          address: '',
	          avgfee: '',
	          paystyle: '',
	          servicetime: '',
	          contactpeople: '',
	          contactphone:'',
	          car_message:'',
	          return_reson:''
	        },
	        update:true,
            dialogVisible: false,
            //驳回原因是否显示
            rejectVisible: false,
            //驳回原因
            return_reson:'',
	        //通过认证数据
	        crossIdentification:{
	          service_name: '',
	          type: '',
	          description: '',
	          address: '',
	          avgfee: '',
	          paystyle: '',
	          servicetime: '',
	          contactpeople: '',
	          contactphone:'',
	          car_message:'',	           	           
	        },
	      }
	    },
	   
       methods: {
       	//获取单条信息
       	 GetIdentificationInfo:function(){
       	 	let routerParams = this.$route.query.id
       	 	let para = {
       	 		sId:routerParams
       	 	 }
       	 	 api.GetServiceAuditInfo(para).then(res => {
       	 	 	console.log(res)				
				this.identificationForm = {
		          service_name: res.data.data.service_name,
		          type: res.data.data.type,
		          description: res.data.data.description,
		          address: res.data.data.address,
		          avgfee: res.data.data.avgfee,
		          paystyle: res.data.data.paystyle,
		          servicetime: res.data.data.servicetime,
		          contactpeople: res.data.data.contactpeople,
		          contactphone:res.data.data.contactphone,
		          car_message:res.data.data.car_message,
		          verify_id:res.data.data.verify_id,
		          created_user_id:res.data.data.created_user_id,
		          return_reson:res.data.data.return_reson,
		          created_user_id:res.data.data.created_user_id
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
       	 	   sId:routerParams,	         
	        }
	        this.$confirm('确认审核吗?', '提示', {
			}).then(() => {
			let para = Object.assign({}, this.crossIdentification);	
			api.CrossServiceAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
						message: '审核成功',
						type: 'success'
				    });		
				this.addMessage('服务审核反馈','你提交的 "' +this.identificationForm.service_name+ '" 已通过审核');
				this.$router.push({path:'/ServiceManage'});
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
       	 		sId:routerParams,
       	 		reson:this.return_reson
       	 	}
	        this.$confirm('确认驳回吗?', '提示', {
			}).then(() => {
			api.RejectServiceAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '已驳回',
					type: 'success'
				});	
				this.addMessage('服务审核反馈',this.return_reson);
				this.rejectVisible = false;
				this.$router.push({path:'/ServiceManage'});
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
			    receiver_id:this.identificationForm.created_user_id,
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