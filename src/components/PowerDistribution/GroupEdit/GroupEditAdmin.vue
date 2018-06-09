<template>
	<el-form :model="ruleForm"  ref="ruleForm" label-width="150px" class="demo-ruleForm">
		<el-row>
		  <el-col :span="12">
		  	<div class="grid-content bg-purple">
		  		<el-form-item label="分组名称" prop="groupname" >
				    <el-input v-model="groupname" disabled></el-input>
				</el-form-item>				  
		  	</div>
		  </el-col>
		</el-row>	 		
	   <el-row v-for="(val, key, index) in ruleForm" :key="index">
	   		<div class="remarks-name">
				<div class="remarks-img">
					<i class="el-icon-success"></i>
				</div>
				<div class="remarks-names">
					{{key}}
				</div>
			</div>			
		  <el-col v-for="(item, index2) in val" :span="4" :key="index2" style="padding: 0 20px;">
		  	<div class="grid-content bg-purple">
		  		<el-form-item :label="item.methodname" prop="allow" class="allow_form">
				    <el-switch
					  v-model="item.allow"
					  @change="changeStatus($event,item.id)"  
					  :active-value="1"
					  :inactive-value="2"  
					  active-text="启用"
					  inactive-text="禁用">
					</el-switch>
			    </el-form-item>	
		  	</div>
		  </el-col>	   		  		  
		</el-row>							
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
	    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
	  </el-form-item>
	</el-form>	 
</template>

<script>	
	const api =require('../../../api/api.js')
	const status = Array.of();
	export default {
        data(){
            return {
            	sels:[],
            	list:[],
            	groupname:'',
            	ruleForm: {
		        },	
            }
        },
        methods: {      
        	GetPowerEdit(){      		
        		let routerParams = this.$route.query.id
        		let groupName = this.$route.query.groupname
        		let para = {
							groupId:routerParams,
						};		
							let data = [];
							let _arr = [];
							this.groupname = groupName;
									api.GetPowerInfo(para).then(res => {	
									let tempObj = res.data.data;
										this.ruleForm = res.data.data;
										for (let key in tempObj) {
											tempObj[key].map( (item,val)=>{
												console.log(item.allow)
												if(item.allow== 1){
													this.sels.push(item.id)
												}
											})
										}
							})
						.catch(err => {
							this.$message.error('错了哦，服务器崩溃了。。。');
						});
        	},
        	submitForm:function(){   
        		let routerParams = this.$route.query.id
        		let name = this.$route.query.groupname
        		let parentId = this.$route.query.parentId
        		let created_user_id = this.$route.query.created_user_id
        		let sequence = this.$route.query.sequence
        		let updated_user_id = this.$route.query.updated_user_id
        		let status_id = this.$route.query.status_id         		
        		let params = {
        			id:routerParams,
        			name: name,
        			parent_id:parentId,
							created_user_id:created_user_id,
							sequence:sequence,
							updated_user_id:updated_user_id,
							status_id:status_id,
							groupadminpriv_ids: this.sels.toString(),        							
        		}   
      			api.EditGroup(params).then(res => {	
							if(res.data.code == '200'){
								this.$message({
									message: res.data.msg,
									type: 'success'
								});
								this.$router.push({path:'/GroupManagemen'});
							}else{
								this.$message({
									message: res.data.msg,
									type: 'warning'
								});
							}
						})
						.catch(err => {
							this.$message.error('错了哦，服务器崩溃了。。。');
						});        		
        	},
        	//改变状态
        	changeStatus(event,id){
        		let temp = [];
        		if(event == 1){
        			if(this.sels.indexOf(id) == -1){
        				this.sels.push(id)
        			}
        		}else{
        			if(this.sels.indexOf(id) != -1){
        				let index = this.sels.indexOf(id);
        				this.sels.splice(index,1);
        			}
        		}            
        	}
        },  
        watch:{
	        '$route':'getGroupUser'      
	      },
        mounted:function (){
	      	this.GetPowerEdit();
	      },
    }
</script>

<style>
 .remarks-name{
 	width: 100px;
 	padding: 10px 0 10px 10px;
 	display: flex;
 	flex-direction: row;
 	align-items: center;
 }
 .remarks-img>i{
 	font-size: 24px;
 	color: #027EC1;
 	padding-right: 10px;
 }
 .remarks-names{
 	font-size: 16px;
 	font-weight: 600;
 }
 .demo-ruleForm{
 	padding-top: 30px;
 }
 .allow_form{
 	margin-bottom: 0 !important;
 }
 .allow_form>label{
 	width: 80px !important;
 	text-align: center;
 }
 .allow_form>.el-form-item__content{
 	margin-left:80px !important;
 }
</style>