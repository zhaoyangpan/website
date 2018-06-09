<template>
	<el-container>
	  <el-header class="header-breadcrumb">
	  	<div class="breadcrumb">
	  		权限分配  
	  		<i class="el-icon-d-arrow-right"></i> 
	  		<span>组管理</span> 
	  	    <i class="el-icon-d-arrow-right"></i>
	  	    <span class="group">企业组</span>
	  	    <i class="el-icon-d-arrow-right"></i>
	  	    <span class="group">权限编辑</span>
	  	</div>
	  </el-header>
	  <el-main class="breadcrumb-main">
	  	<el-row :gutter="20">
		  <el-col :span="2"><div class="grid-content bg-purple group-name">组名称</div></el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-purple">
		  	 <el-input v-model="input" placeholder="请输入组名称"></el-input>
		    </div>
		  </el-col>
		</el-row>
		<el-row :gutter="20" class="group-remarks">
		  <el-col :span="2"><div class="grid-content bg-purple group-name">组备注</div></el-col>
		  <el-col :span="6">
		  	<div class="grid-content bg-purple">
		  	 <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
		    </div>
		  </el-col>
		</el-row>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						收藏关注
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   词条收藏
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[0]" label="1">允许</el-radio>
                                <el-radio v-model="arr[0]" label="2">不允许</el-radio>
							</div>
						</div>
						<div class="remarks-left-bottom">
							<div class="remarks-nums-name">
							   店铺关注
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[1]" label="1">允许</el-radio>
                                <el-radio v-model="arr[1]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   帖子收藏
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[2]" label="1">允许</el-radio>
                                <el-radio v-model="arr[2]" label="2">不允许</el-radio>
							</div>
						</div>
						<div class="remarks-left-bottom">
							<div class="remarks-nums-name">
							   圈子关注
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[3]" label="1">允许</el-radio>
                                <el-radio v-model="arr[3]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-right">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   服务收藏
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[4]" label="1">允许</el-radio>
                                <el-radio v-model="arr[4]" label="2">不允许</el-radio>
							</div>
						</div>
						<div class="remarks-left-bottom">
							<div class="remarks-nums-name">
							   用户关注
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[5]" label="1">允许</el-radio>
                                <el-radio v-model="arr[5]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						发布权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  词条发布
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[6]" label="1">允许</el-radio>
                                <el-radio v-model="arr[6]" label="2">不允许</el-radio>
							</div>
						</div>	
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							 订单评论
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[7]" label="1">允许</el-radio>
                                <el-radio v-model="arr[7]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  帖子发布
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[8]" label="1">允许</el-radio>
                                <el-radio v-model="arr[8]" label="2">不允许</el-radio>
							</div>
						</div>						
					</div>
					<div class="remarks-right">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							 发表评论
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[9]" label="1">允许</el-radio>
                                <el-radio v-model="arr[9]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						认证权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   邮箱认证
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[10]" label="1">允许</el-radio>
                                <el-radio v-model="arr[10]" label="2">不允许</el-radio>
							</div>
						</div>												
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   手机认证
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[11]" label="1">允许</el-radio>
                                <el-radio v-model="arr[11]" label="2">不允许</el-radio>
							</div>
						</div>						
					</div>
					<div class="remarks-right">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   身份证认证
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[12]" label="1">允许</el-radio>
                                <el-radio v-model="arr[12]" label="2">不允许</el-radio>
							</div>
						</div>					
					</div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						举报权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   帖子举报
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[13]" label="1">允许</el-radio>
                                <el-radio v-model="arr[13]" label="2">不允许</el-radio>
							</div>
						</div>
						<div class="remarks-left-bottom">
							<div class="remarks-nums-name">
							   店铺举报
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[14]" label="1">允许</el-radio>
                                <el-radio v-model="arr[14]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  服务举报
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[15]" label="1">允许</el-radio>
                                <el-radio v-model="arr[15]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-right">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   评论举报
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[16]" label="1">允许</el-radio>
                                <el-radio v-model="arr[16]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						标签权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  使用他人标签
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[17]" label="1">允许</el-radio>
                                <el-radio v-model="arr[17]" label="2">不允许</el-radio>
							</div>
						</div>						
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  使用系统标签
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[18]" label="1">允许</el-radio>
                                <el-radio v-model="arr[18]" label="2">不允许</el-radio>
							</div>
						</div>						
					</div>
					<div class="remarks-right">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  创建自定义标签
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[19]" label="1">允许</el-radio>
                                <el-radio v-model="arr[19]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>		
								
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						消息设置
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  接收系统消息
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[24]" label="1">允许</el-radio>
                                <el-radio v-model="arr[24]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   接收提示消息
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[25]" label="1">允许</el-radio>
                                <el-radio v-model="arr[25]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-right"> </div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						个人信息
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   个人信息修改
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[26]" label="1">允许</el-radio>
                                <el-radio v-model="arr[26]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   个人信息展示
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[27]" label="1">允许</el-radio>
                                <el-radio v-model="arr[27]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-right"> </div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						企业权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  企业信息展示
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[28]" label="1">允许</el-radio>
                                <el-radio v-model="arr[28]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							  企业信息修改
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[29]" label="1">允许</el-radio>
                                <el-radio v-model="arr[29]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-right"> </div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						社交权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   好友申请
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[30]" label="1">允许</el-radio>
                                <el-radio v-model="arr[30]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle"> </div>
					<div class="remarks-right"> </div>
				</div>
			</div>
		</div>
		<div class="remarks-select">
			<div class="remarks-wrap">
				<div class="remarks-name">
					<div class="remarks-img">
						<i class="el-icon-success"></i>
					</div>
					<div class="remarks-names">
						景点权限
					</div>
				</div>
				<div class="remarks-nums">
					<div class="remarks-left">
						<div class="remarks-left-top">
							<div class="remarks-nums-name">
							   认领景点
							</div>
							<div class="remarks-nums-select">
								<el-radio v-model="arr[31]" label="1">允许</el-radio>
                                <el-radio v-model="arr[31]" label="2">不允许</el-radio>
							</div>
						</div>
					</div>
					<div class="remarks-middle"> </div>
					<div class="remarks-right"> </div>
				</div>
			</div>
		</div>
	  </el-main>
	  <el-footer class="edit-footer">
	  	<div class="edit-select">
	  		<div class="edit-btn-keep"><el-button type="primary" @click=allallow(1)>全部允许</el-button></div>
	  		<div class="edit-btn-cancel"><el-button type="info" @click=allallow(2)>全部不允许</el-button></div>
	  	</div>
	  	<div class="edit-btn">
	  		<div class="edit-btn-keep"><el-button type="primary">保存</el-button></div>
	  		<div class="edit-btn-cancel"><el-button type="info">取消</el-button></div>
	  	</div>
	  </el-footer>
	</el-container>
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