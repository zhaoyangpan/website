<template>
	<el-container>
	  <el-main class="main-card">
	  	<div class="main-card-top">
	  		<el-row class="search-nav">
			  <el-col :span="20" class="search-col18">
			  	<div class="grid-content bg-purple">
			  		<el-tabs type="border-card">
					  <el-tab-pane label="百科审核"></el-tab-pane>					  			  
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
			  		<el-form-item label="百科名称">				        
					    <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.title"></el-input>
					</el-form-item>
			  		<el-form-item label="发布人">
				        <el-input type="text" class="ident-input" :disabled='update' v-model="identificationForm.nickname"></el-input>
				    </el-form-item>
				    <el-form-item label="百科名片">				        
					    <el-input type="textarea" class="ident-input" :disabled='update' v-model="identificationForm.title"></el-input>
					</el-form-item>
					<el-form-item label="所属标签" >	
						<el-tag type="success" v-for="(item,index) in tagList" :key="index" style="margin-right: 10px;">{{item}}</el-tag>				        
				    </el-form-item>				   
				    <el-form-item label="百科详情">				       
				        <el-button type="primary" size="mini" @click="checkDetail">点击查看详情</el-button>
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
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科名称 :</h3></el-col>
					  <el-col :span="5"><p>{{baikeTitle}}</p></el-col>
					</el-row>
			  	</div>	
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科分类 :</h3></el-col>
					  <el-col :span="5">
					  	<div v-for="(item,index) in biakeList" :key="index">
					  	  <p v-for="(v,index) in item" :key="index">{{v.name}}</p>
					    </div>
					  </el-col>
					</el-row>
			  	</div>	
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科名片 :</h3></el-col>
					</el-row>
					<div class="preview_zw">
						{{biakeList.describe}}
					</div>					
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科大图:</h3></el-col>
					</el-row>
					<div class="preview_dt">
						<img :src="biakeList.image"/>
					</div>					
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科副图:</h3></el-col>
					</el-row>
					<div class="preview_ft_wrap">
						<div class="preview_ft" v-for="(item,index) in biakeList.albums" :key="index">
							<img :src="item.url"/>
						</div>
					</div>
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>基本信息:</h3></el-col>
					</el-row>
					<div class="preview_bi_wrap">
						<div class="preview_bi" v-for="(item,index) in baseInfo" :key="index">
							<div class="preview_bi_title">{{item.field}}</div>
							<div class="preview_bi_content">{{item.value}}</div>
						</div>
					</div>
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科目录:</h3></el-col>
					</el-row>
					<div class="preview_ml">
						<div class="preview_ml" v-for="(item,index) in biakeList.catalogue" :key="index">
							<div class="preview_ml_title">{{item}}</div>
						</div>
					</div>
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科正文:</h3></el-col>
					</el-row>
					<div class="preview_ml">
						<div class="preview_ml">
							<div class="zw" v-html="baiketext">
							</div>
						</div>
					</div>
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>参考文献:</h3></el-col>
					</el-row>
					<div class="preview_wx">
						<div class="preview_wx_content" v-for="(item,index) in biakeList.reference" :key="index">
							    <div>{{index+1}}.</div>
								<div>{{item.articleName}}</div>
								<div>{{item.articleUrl}}</div>
								<div>{{item.publishDate}}</div>
								<div>{{item.siteName}}</div>
							</ul>
						</div>
					</div>
			  	</div>
			  	<div class="preview">
			  		<el-row>
					  <el-col :span="3"><h3>百科标签:</h3></el-col>
					</el-row>
					<div class="preview_tg">
						<el-tag :key="index" v-for="(tag,index) in baikelable" style="margin-right: 10px;">
						  {{tag}}
						</el-tag>						
					</div>
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
	          title: '',
	          nickname: '',	 
	          return_reson:'',
	          verify_id:''
	        },
	        //标签列表
	        tagList:[],
	        //百科详情列表
	        biakeList:[],
	        baseInfo:[],
	        baikeTitle:'',
	        baiketext:'',
	        baikelable:[],
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
       	 	 api.GetBaikeAuditInfo(para).then(res => {		
       	 	 	console.log(res)
				this.identificationForm = {
		          title: res.data.data.title,
		          nickname: res.data.data.nickname,	 
		          return_reson:res.data.data.return_reson,
		          verify_id:res.data.data.verifyId,
		          userId:res.data.data.userId,
		        }
				this.tagList = res.data.data.tagList;
			})
			.catch(err => {
			  this.$message.error('错了哦，服务器崩溃了。。。');
			});
       	 },
       	 //查看百科详情
       	 checkDetail(){
       	 	this.DetailDialogVisible = true;
       	 	let routerParams = this.$route.query.id
       	 	let para = {
       	 		checkId:routerParams
       	 	 }
       	 	 api.CheckeBaikeDetail(para).then(res => {		
       	 	 	console.log(res)
       	 	 	this.baikeTitle = res.data.data.title
       	 	 	this.biakeList = res.data.data	
       	 	 	this.baseInfo = res.data.data.basicInfo
       	 	 	this.baiketext = res.data.data.text
       	 	 	this.baikelable = res.data.data.tags
       	 	 	console.log(this.baseInfo)
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
			api.CrossBaikeAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: res.data.msg,
					type: 'success'
				});	
				
				this.addMessage('百科审核反馈','你提交的百科 "' +this.identificationForm.title+ '" 已通过审核')
				this.$router.push({path:'/BaikeManage'});
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
			api.RejectBaikeAudit(para).then((res) => {
				if(res.data.code == 200){
				    this.$message({
					message: res.data.msg,
					type: 'success'
				});	
				this.addMessage('百科审核反馈',this.return_reson)
				this.rejectVisible = false;
				this.$router.push({path:'/BaikeManage'});
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
 .preview_zw{
 	text-indent: 20px;
 }
 .preview_dt{
 	width: 100%;
 }
 .preview_dt>img{
 	width: 100%;
 }
 .preview_ft{
 	width: 32%;
 	height: 260px;
 	align-self: center;
 	background-color: #f1f2f4;
 	overflow: hidden;
 	padding: 5px;
 }
 .preview_ft>img{
 	height: 100%; 	
 }
 .preview_ft_wrap{
 	width: 100%;
 	display: flex;
 	flex-wrap: wrap;
 }
 .preview_bi_wrap{
 	width: 100%;
 	display: flex;
 	flex-wrap: wrap;
 }
 .preview_bi{
 	width: 50%;
 	display: flex;
 	flex-wrap: wrap;
 }
 .preview_bi_title{
 	width: 30%;
 	color: coral;
 }
 .preview_bi_content{
 	width: 70%;
 }
 .preview_wx{
 	width: 100%;
 }
 .preview_wx_content{
 	width: 100%;
 	display: flex;
 }
 .preview_wx_content>div{
 	margin-right: 10px;
 }
 .preview_wx_content>div:first-child{
 	font-size: 16px;
 	font-weight: 600;
 }
</style>