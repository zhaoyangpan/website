<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="身份认证信息"></el-tab-pane>					  			  
					</el-tabs>
			  	</div>
			  </el-col>	
			  <el-col :span="4" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		 <!--<el-button type="primary"  @click="EditUpdate">编辑用户信息</el-button>-->
			  	</div>
			  </el-col>
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
	  	  <el-form ref="form" :model="identificationForm" label-width="80px">
	  	  	<el-row :gutter="20">
			  <el-col :span="6">
			  	<div class="grid-content bg-purple">
			  		<el-form-item label="真实姓名">				        
					    <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.realname"></el-input>
					</el-form-item>
			  		<el-form-item label="身份证号">
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.id_card"></el-input>
				   </el-form-item>				    
					<el-form-item label="提交时间">				       
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.submit_time"></el-input>
				  </el-form-item>				   
				    <!--<el-form-item label="驳回原因" v-if="identificationForm.verify_id == 2">				        
				        <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.reson"></el-input>
				    </el-form-item>-->
			  	</div>
			  </el-col>
			  <el-col :span="9">
			  	<div class="grid-content bg-purple-light">
			  		<el-form-item label="身份证正面照片" class="idcard">				       
						<el-upload		
						  :class="{disabled:type == true}"	
						  :action="importFileUrl"
						  list-type="picture-card"
						  :before-upload="beforeAvatarUpload1"
						  name="storeImage"
						  :disabled='update'
						  :on-success="handleAvatarSuccess1"
						  :on-preview="handlePictureCardPreview1"
						  :on-remove="handleRemove1"
						  :limit="1"
						  :on-exceed="handleExceed1"
						  :file-list="fileList">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
				   </el-form-item>
				   <el-form-item label="身份证反面照片" class="idcard">				       
						<el-upload
						  :class="{disabled:type == true}"
						  :action="importFileUrl"
						  list-type="picture-card"
						  name="storeImage"
						  :disabled='update'
						  :on-success="handleAvatarSuccess2"
						  :on-preview="handlePictureCardPreview2"
						  :on-remove="handleRemove2"
						  :limit="1"
						  :on-exceed="handleExceed2"
						  :file-list="fileList2">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
				   </el-form-item>
			  	</div>
			  </el-col>			 		
			</el-row>	
			  <el-form-item>
			  	<el-row :gutter="20">
				  <el-col :span="24"><div class="grid-content bg-purple">
				  	<el-button type="primary" v-if='identificationForm.verify_id != 1' :disabled='identificationForm.verify_id == 1' @click="CrossIdent">通过认证</el-button>
			        <el-button type="danger"  @click="rejectVisible = true" v-if='identificationForm.verify_id != 1' :disabled='identificationForm.verify_id == 1 || identificationForm.verify_id == 2'>认证驳回</el-button>
				  </div></el-col>
				  <!--<el-col :span="24"><div class="grid-content bg-purple">
				  	<el-button type="danger" v-if='identificationForm.verify_id == 1' :disabled='update' @click="saveinfo">保存信息</el-button>
				  </div></el-col>-->
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
					  v-model="reson">
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
	          realname: '',	        
	          id_card: '',	         
	          submit_time: '',
	          id_card_img1:'',
	          id_card_img2:'',	       
	          verify_id:'',
	          reson:''
	        },
	        update:true,
            dialogVisible: false,
            dialogImageUrl:'',
            //驳回原因是否显示
            rejectVisible: false,
            //驳回原因
            reson:'',
            update_btn:false,
            type:true,
	        //通过认证数据
	        crossIdentification:{
	           address:'',
	           email:'',
	           idCard:'',
	           idCardImg1:'',
	           idCardImg2:'',
	           mphone:'',
	           realname:'',
	           serviceline:'',
	           storeName:'',	           	           
	        },	     
	        //上传路径
	        importFileUrl:'http://www.56whw.cn:56/common/uploadImage',
	        //已上传成功图片展示
	        fileList:  [{name: '', url: ''}],
	        fileList2: [{name: '', url: ''}],
	      }
	    },
	   
       methods: {
       	 GetIdentificationInfo:function(){
       	 	var _this = this;
       	 	let routerParams = this.$route.query.id
       	 	let para = {
       	 		nId:routerParams
       	 	 }
       	 	 api.IdentityApplyUrl(para).then(res => {
       	 	 	console.log(res)
				this.fileList[0].url = res.data.data.id_card_img1;
				this.fileList2[0].url = res.data.data.id_card_img2;				
				this.identificationForm = {
		          realname: res.data.data.realname,		          
		          id_card: res.data.data.id_card,		          
		          submit_time: res.data.data.submit_time,
		          verify_id:res.data.data.verify_id,
		          reson:res.data.data.reson,
		          id:res.data.data.id,
		        }
			})
			.catch(err => {
			  this.$message.error('错了哦，获取身份认证信息失败');
			});
       	 },
       	 //通过认证
       	 CrossIdent:function() {
       	 	let routerParams = this.$route.query.id
       	 	this.crossIdentification = {
       	 	   nId:routerParams,	          
	        }
	        this.$confirm('确认认证吗?', '提示', {
			}).then(() => {
			let para = Object.assign({}, this.crossIdentification);	
			api.IdentityCrossApply(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '认证成功',
					type: 'success'
				});		
				this.addMessage('身份认证反馈','身份认证已通过审核')
				this.$router.push({path:'/IdentityManage'});
				}else{
					this.$message({
					message: res.data.msg,
					type: 'warning'
				});	
			  }								
			});				
			}).catch((err) => {
              this.$message({
				message: '已取消认证',
				type: 'success'
			});
		  });	
	     },
	     //认证驳回
	     RejectIdent:function(){
	     	let routerParams = this.$route.query.id
       	 	let para = {
       	 		nId:routerParams,
       	 		reson:this.reson
       	 	}
	        this.$confirm('确认驳回吗?', '提示', {
			}).then(() => {
			api.IdentityRejectApply(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '已驳回',
					type: 'success'
				});	
				this.addMessage('身份认证反馈',this.reson)
				this.rejectVisible = false;
				this.$router.push({path:'/IdentityManage'});
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
	    //身份证正面
	     beforeAvatarUpload1(file) {
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
	    handleAvatarSuccess1(res, file) {
	    	console.log(res,file)		    	
         this.fileList[0].url = res.data;
	      },
          handlePictureCardPreview1(res) {
          	console.log(res)
          	if(res.status == "success"){       	 
	        this.dialogImageUrl = res.url;
	        this.dialogVisible = true;
	       } 
	      },
	      handleRemove1(file, fileList) {
	        console.log(file, fileList);
	      },
	      handleExceed1(files, fileList) {
	        this.$message.warning(` 只能上传${files.length}张图片 `);
	      },	     
	      //身份证反面
	      handleAvatarSuccess2(res, file) {
		    	console.log(res,file)		    	
	        this.fileList2[0].url = res.data;
	      },
          handlePictureCardPreview2(res) {
          	console.log(res)
          	if(res.status == "success"){       	 
	        this.dialogImageUrl = res.url;
	        this.dialogVisible = true;
	       } 
	      },
	      handleRemove2(file, fileList) {
	        console.log(file, fileList);
	      },
	      handleExceed2(files, fileList) {
	        this.$message.warning(` 只能上传${files.length}张图片 `);
	      },
	       beforeRemove2(file, fileList) {
	        return this.$confirm(`确定删除图片吗？`);
	      },	      	     
	      //编辑用户信息
	      EditUpdate(){
	      	this.update = false;
	      	this.type = false;
	      },
	      addMessage(title,content){
			let para = {
			    receiver_id:this.identificationForm.id,
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
.el-upload-list--picture-card .el-upload-list__item{
	width: 250px !important;
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