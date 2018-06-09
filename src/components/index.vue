<template>
    <el-container>
	  <el-header>
	  	<div class="header">
	        <div class="logo">
	        	<img src="../../static/logo.png"/>
	        	<span class='title'>后台管理系统</span>
	        </div>
	        <div class="user-info">
	            <el-dropdown trigger="hover">
	                <span class="el-dropdown-link">
	                    <img class="user-logo" src="../../static/img.jpg">
	                    <div class='welcome'>
							<p class='name comename'>欢迎</p>
							<p class='name avatarname'>{{username}}</p>
						</div>
	                </span>
	                <el-dropdown-menu slot="dropdown">
	                	  <!--<el-dropdown-item command='info'>修改信息</el-dropdown-item>
                         <el-dropdown-item command='pass' v-if=''>修改密码</el-dropdown-item>-->
	                    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
	                </el-dropdown-menu>
	                <i class="fa fa-sign-out logout" @click='logout'></i>
	            </el-dropdown>
	        </div>
	    </div>
	  </el-header>
	  <el-container class="aside-contain">
        <el-aside width="200px" class="menu_page">
		    	<el-col :span="24">
				    <el-menu :default-active="defaultActive" unique-opened router  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#324057"
				      text-color="#fff" active-text-color="#42b983">
				      <template v-for="(item,index) in routejson" v-if="!item.hidden">
				      <el-menu-item v-if="index==1" :index="item.index"><i :class="item.iconCls" style="color: #fff;"></i>{{item.name}}</el-menu-item>
				      <el-submenu :index="index+''"  v-if="index>1">
				        <template slot="title">
				          <i :class="item.iconCls"></i>
				          <span>{{item.name}}</span>
				        </template>
				        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.id" v-if="!child.hidden">{{child.name}}</el-menu-item>			        
				      </el-submenu>				      
				      </template>
				    </el-menu>				    
				  </el-col>
		    </el-aside>
	      <el-main>
	      	<el-row>
	      		<el-col :span="24" class="breadcrumb-container">						
              <el-breadcrumb class="breadcrumb" separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页管理</el-breadcrumb-item>
                  <el-breadcrumb-item  v-for='item in $route.matched' :key='item.path' v-if='item.name'> {{item.name}} </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
	      	</el-row>
	      	<el-row>
	      		<el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
	      	</el-row>				
	      </el-main>
	  </el-container>
	</el-container>
</template>
<script>
const api = require("../api/api.js");
// import LeftMenu from './layout/leftMenu.vue'
export default {
  name: "App",
  // components: {LeftMenu},
  data() {
    return {
      name: "admin",
      routejson: null
    };
  },
  computed: {
    username() {
      let username = JSON.parse(sessionStorage.getItem("username"));
      return username ? username : this.name;
    },
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    initRouter() {
      api.GetCurrentPrivs().then(res => {
        var routeobj = "";
        var route =
          "[" +
          "{" +
          '"path": "/404",' +
          '"component": "NotFound",' +
          '"name": ""' +
          //'"hidden": "true"'+
          "}," +
          "{" +
          '"path":"/",' +
          '"name":"首页管理",' +
          '"component":"index",' +
          '"index":"/",' +
          '"iconCls":"el-icon-menu",' +
          '"redirect":"/home"' +
          "},";
        if (res.data.code == 200) {
          routeobj = res.data.data;
          var modulelength = Object.getOwnPropertyNames(routeobj).length;
          var moudlei = 0;
          for (var modulename in routeobj) {
            moudlei++;
            route =
              route +
              "{" +
              '"path":"/",' +
              '"name":"' +
              modulename +
              '",' +
              '"component":"index",' +
              '"index":"/",' +
              '"iconCls":"el-icon-menu",' +
              '"children": [' +
              "";
            for (var controllera in routeobj[modulename]) {
              var controllerat = routeobj[modulename][controllera];
              var methodlength = Object.getOwnPropertyNames(controllerat)
                .length;
              var methodli = 0;
              for (var controllername in controllerat) {
                var methoda = controllerat[controllername];
                methodli++;
                for (var methodi in methoda) {
                  if (methodli == methodlength) {
                    route =
                      route +
                      "{" +
                      '"path":"' +
                      methoda[methodi].vroute +
                      '",' +
                      '"name":"' +
                      controllername +
                      '",' +
                      '"component":"' +
                      methoda[methodi].vroute +
                      '"' +
                      //'"hidden": true'+
                      "}";
                  } else {
                    route =
                      route +
                      "{" +
                      '"path":"' +
                      methoda[methodi].vroute +
                      '",' +
                      '"name":"' +
                      controllername +
                      '",' +
                      '"component":"' +
                      methoda[methodi].vroute +
                      '"' +
                      //'"hidden": true'+
                      "},";
                  }
                }
              }
            }
            if (moudlei == modulelength) {
              route = route + "]}";
            } else {
              route = route + "]},";
            }
          }
          route = route + "]";
          this.routejson = JSON.parse(route);
        }
      });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    //退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          window.location.href = "/login.html";
        })
        .catch(() => {});
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
  },
  mounted() {
    this.initRouter();
  }
};
</script>
<style>
.el-container {
  min-height: 800px;
}
.el-header {
  color: #333;
  text-align: center;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  box-sizing: border-box;
}
.el-aside {
  background-color: #324057;
  color: #333;
  text-align: center;
  margin-top: 10px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  min-height: 100%;
}
.el-submenu__title {
  font-size: 14px;
  color: #2d2f33;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  padding-left: 0px !important;
}
.el-submenu {
  width: 200px;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item.is-active {
  color: #409eff;
}
.bg-purple-p {
  font-size: 18px;
  font-weight: 600;
}
.messages {
  font-size: 30px;
}
.item {
  margin-top: 10px;
}
.item > img {
  width: 32px;
}
.el-badge__content.is-fixed {
  position: absolute;
  top: 10px;
  right: 5px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
}
.el-badge__content {
  background-color: red;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 8px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  border: 1px solid #fff;
}
.el-submenu__title i {
  color: #fff;
}
.el-submenu__icon-arrow {
  right: 40px !important;
}
.header {
  width: 100%;
  height: 70px;
  min-width: 600px;
  background: #324057;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.header .logo {
  float: left;
  width: 250px;
  text-align: center;
  margin-left: 40px !important;
}
.user-info {
  float: right;
  padding-right: 60px;
  line-height: 60px;
}
.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  padding-left: 50px;
  color: #333;
  cursor: pointer;
  vertical-align: middle;
}
.user-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.user-info {
  vertical-align: middle;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.logo {
  font-size: 20px;
}
.logo > img {
  width: 80px;
  vertical-align: middle;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
  color: #fff;
}
.avatarname {
  color: #a9d86e;
  font-weight: bolder;
}
.logout {
  vertical-align: middle;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  letter-spacing: 3px;
}
.breadcrumb {
  padding: 10px 0 0;
}
</style>
