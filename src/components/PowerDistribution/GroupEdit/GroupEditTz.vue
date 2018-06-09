<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	  <el-form-item label="分组名称" prop="name">
	    <el-input v-model="ruleForm.name"></el-input>
	  </el-form-item>
	  <el-form-item label="活动形式" prop="desc">
	    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
	  </el-form-item>
	  <el-form-item label="特殊资源" prop="resource">
	    <el-radio-group v-model="ruleForm.resource">
	      <el-radio label="线上品牌商赞助"></el-radio>
	      <el-radio label="线下场地免费"></el-radio>
	    </el-radio-group>
	  </el-form-item>  
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
	    <el-button @click="resetForm('ruleForm')">重置</el-button>
	  </el-form-item>
	</el-form>
</template>

<script>	
	export default {
        data(){
            return {
            	input:'',
            	textarea:'',      	
                arr:['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']
            }
        },
        methods: {
        	allallow:function(x){
        		for(var i =0;i < this.arr.length;i++){
        			this.$set( this.arr , i , x + "" );
        		}
        	},
        }
    }
</script>

<style>
 .breadcrumb-main{
 	background-color: #fff !important;
 	padding-top: 50px !important;
 }
 .header-breadcrumb{
	background-color: #E9EEF3 !important;
	font-size: 14px !important;
	text-align: left;
	height: 20px !important;
	line-height: 20px !important;
}
.breadcrumb{
	padding-left: 20px;
}
 .group-name{
 	font-size: 16px;
 	line-height: 40px;
 }
 .group-remarks{
 	padding: 30px 0;
 }
 .remarks-select{
 	width: 1300px;
 	padding-bottom: 20px;
 	border-bottom: 1px solid dodgerblue;
 }
 .remarks-name{
 	width: 150px;
 	padding: 20px 0 20px 20px;
 	display: flex;
 	flex-direction: row;
 	align-items: center;
 	justify-content: space-around;
 }
 .remarks-img>i{
 	font-size: 24px;
 	color: #027EC1;
 }
 .remarks-names{
 	font-size: 16px;
 	font-weight: 600;
 }
 .remarks-nums{
 	width: 1300px;
 	padding-left: 20px;
 	display: flex;
 	flex-direction: row;
 	justify-content: space-between;
 }
 .remarks-left,.remarks-middle,.remarks-right{
 	width: 280px;
 }
 .remarks-left-top,.remarks-left-bottom{
 	display: flex;
 	flex-direction: row;
 	justify-content: space-around;
 	align-items: center;
 	padding: 10px 0;
 }
 .el-radio+.el-radio{
 	margin-left: 10px !important;
 }
 .edit-btn{
 	margin: 0 auto;
 	width: 300px;
 	display: flex;
 	flex-direction: row;
 	justify-content: space-between;
 }
 .edit-footer{
 	display: flex;
 	height: 100px !important;
 }
 .edit-select{
 	width: 300px;
 	display: flex;
 	justify-content: space-between;
 	padding-left: 50px;
 }
 .group{
	color: #027EC1;
}
</style>