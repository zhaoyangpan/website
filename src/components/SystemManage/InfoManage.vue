<template>
	<el-container>	  
	  <el-main class="main-card">	  	
		  	<div class="grid-content bg-purple info-manage">		  		
		  		<el-form  v-loading="ConfiglistLoading" label-width="120px"  ref="InfoEdit">
		  			<el-row :gutter="20">		  
			             <el-col :span="10" >
								<el-form-item :label="item.zhname"  v-for="(item,index) in ConfigData" :key="index">
									<el-input class="config-input" :type="item.id != 8 ? 'text' : 'textarea'" style="color: #333;" v-model="item.data" auto-complete="off" :disabled="update"></el-input>
								</el-form-item>								
						 </el-col>
					</el-row>
					<el-row>
					  <el-col :span="12">
					  	<div class="grid-content">
					  		<el-button type="primary" @click="KeepSysInfo()">保存</el-button>
					  		<el-button type="danger" @click="EditSysInfo">编辑</el-button>
					  	</div>
					  </el-col>
					</el-row>
				</el-form>
		  	</div>		  
	  </el-main>
	</el-container>
</template>

<script>
	const api =require('../../api/api.js')
	export default {
        data() {
	      return {      
	        ConfiglistLoading:false,
	        name : '',
	        ConfigData:[],
	        EditConfigData:{},
	        update:true,
	        textarea:'',
	        text:''
	      }
	    },
        methods: {
        //获取系统信息
       	 getConfigInfo(name){
       	 		let para = {
							name : this.name
						};
						this.ConfiglistLoading = true;	
			      		let data = [];
				        api.GetSiteInfo(para).then(res => {
		             this.ConfigData = res.data.data;
		             console.log(res)
						 
					    this.ConfiglistLoading = false;
					})
					.catch(err => {
					  this.$message.error(res.data.msg);
		              this.ConfiglistLoading = false;
					});
       	 },
       	 KeepSysInfo(){
       	 	var data="";
       	 	this.ConfigData.forEach( (item)=>{
       	 		data=data+item.name+":"+item.data+",";
       	 	})      
       	 	let para = {       	 		
       	 		data:data       	      	 		
       	 	}
       	 	api.EditSiteInfo(para).then(res => {
       	 		if(res.data.code == '200'){
       	 			this.$message({
			          message: '保存成功',
			          type: 'success'
			        });
			        this.update = true;
       	 		}else{
       	 			this.$message({
			          message: res.data.msg,
			          type: 'warning'
			        });
       	 		}
       	 		 
       	 	})
       	 	.catch(err => {
			  this.$message.error(res.data.msg);
			});
       	 },
       	 EditSysInfo(){
       	 	this.update = false;
       	 }
       	},
        mounted: function () {
         this.getConfigInfo()
      },
    }
</script>

<style>
.header-breadcrumb{
	background-color: #E9EEF3;
	font-size: 14px !important;
	text-align: left;
	height: 20px !important;
	line-height: 20px !important;
}
.info-manage{
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
}
.breadcrumb{
	padding-left: 20px;
}
.main-card{
	background-color: #E9EEF3 !important;
	margin: 0 !important;
}   
.config-input>.el-input__inner{
	color: #333 !important;
}
.el-textarea.is-disabled .el-textarea__inner{
	color: #333;
}
</style>