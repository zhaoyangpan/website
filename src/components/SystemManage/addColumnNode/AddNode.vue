<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="增加栏目"></el-tab-pane>					  			  
					</el-tabs>
			  	</div>
			  </el-col>				  
		    </el-row>
	  	</div>
	  	<div class="main-card-bottom">
  		<el-row>
		  <el-col :span="10">
		  	<div class="grid-content bg-purple-dark">
		  		<el-form ref="form" :model="form" label-width="80px">			  
				  <el-form-item label="上级栏目">
				      <el-cascader
					    :options="options"
					    v-model="form.selectedOptions"
					    @change="handleChange"
					    change-on-select
					    :props="props"
					    style="width: 100%;">
					  </el-cascader>
				  </el-form-item>
				  <el-form-item label="栏目名称">
				    <el-input v-model="form.name" style="width: 100%;"></el-input>
				  </el-form-item>		
				  <el-form-item label="栏目顺序">
				   <el-input-number v-model="form.sequence" style="width: 100%;" :min="1" :max="10" label="描述文字"></el-input-number>
				  </el-form-item>
				  <el-form-item label="栏目图片">
				    <el-upload				  
					  :action="importFileUrl"
					  list-type="picture-card"
					  name="storeImage"
					  :on-success="handleAvatarSuccess1"
					  :on-preview="handlePictureCardPreview1"
					  :on-remove="handleRemove1"
					  :limit="1"
					  :before-upload="beforeAvatarUpload1"
					  :on-exceed="handleExceed1"
					  :file-list="fileList">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				 </el-form-item>			  
				  <el-form-item label="栏目状态">
				    <el-switch v-model="form.delivery" style="width: 100%;"></el-switch>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit">立即创建</el-button>
				    <el-button>取消</el-button>
				  </el-form-item>
				</el-form>
		  	</div>
		  </el-col>
		</el-row>
	  	  								  	  			
	  	</div>
	  </el-main>
	</el-container>
</template>

<script>
	const api =require('../../../api/api.js')
	export default {
        data() {
	      return {	      	
	        form: {
	          name:'',
	          sequence:'',
	          delivery:true,
	          image:'',
	          selectedOptions:[],
	        },	       
            dialogImageUrl:'',
            dialogVisible:false,
            cname:'',
            IdList:'',
	        importFileUrl:'http://www.56whw.cn:56/common/uploadImage',
	        //已上传成功图片展示
	        fileList:  [{name: '', url: ''}],
	        options: [],	        
	        props: {
	          label: 'cname',
	          value: 'id',
	          children: 'children',
	        },	        
	      }
	    },	   
       methods: {
       	GetIdentificationInfo(cname){
	  		let para = {					
				cname:this.cname
			};	
      		let data = [];
      		api.GetAllColumnList(para).then(res => {	
				console.log(res.data.data) 
				let data =  res.data.data;
             	this.options = data;
             	this.options.unshift({cname:'顶级栏目',parent_id:0,id:0,status_id:1,image:"http://www.56whw.com"})
			})
			.catch(err => {
			    this.$message.error('错了哦，服务器开小差了。。。');
			});
	  	},  
	  	
	    //新增栏目
	    onSubmit(){
       	 	this.form = {
       	 	   cname:this.form.name,
	           sequence:this.form.sequence,
	           status_id:(this.form.delivery) == true ? 1 : 2,
	           parent_id:this.form.selectedOptions.pop(),
	           image:this.fileList[0].url,
	        }
	        this.$confirm('确认提交吗?', '提示', {
			}).then(() => {
			let para = Object.assign({}, this.form);
			console.log(para)
			api.AddColumn(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: '新增栏目成功',
					type: 'success'
				});		
				this.$router.push({path:'/ColumnManage'});
				}else{
					this.$message({
					message: '新增栏目失败',
					type: 'warning'
				});	
			  }								
			});				
			}).catch((err) => {
              this.$message({
				message: '已取消提交',
				type: 'success'
			});
		  });	
	   },	    
	    //栏目图片
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
	       beforeRemove1(file, fileList) {
	        return this.$confirm(`确定删除图片吗？`);
	      },	      
	      //级联选择器
	      handleChange(event) {
	        console.log(event,90);
	      }
       },
       mounted: function () {
      	   this.GetIdentificationInfo();  
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