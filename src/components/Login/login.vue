<template>				
	<div class="login-page-container">
		<canvas ref="canvas" style=" width: 100%;height:800px; background: rgba(255,255,255,0.6);"></canvas>
	  	<div class="login_wrap">
	  		<div class="login_wrap_right">
	  			<div class = "login_img">
	  				<!--<div><img src="../../../static/logo.png"/></div>-->		  			
		  			<h3 class="title">56文化后台登录</h3>
	  			</div>
			    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">			        
			        <el-form-item prop="account">
			            <el-input type="text" size="medium" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
			        </el-form-item>
			        <el-form-item prop="checkPass">
			            <el-input type="password" size="medium" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.enter.native="handlelogin($event)"></el-input>
			        </el-form-item>
			        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			        <el-form-item style="width:100%;">
			            <el-button type="danger" size="medium" style="width:100%;" @click="handlelogin($event)" :loading="logining">登录</el-button>
			        </el-form-item>
			    </el-form>
		    </div>
	    </div>
	</div>
</template>

<script>
    const api =require('../../api/api.js'); 
    export default {
    props: {
      point: {
        type: Number,
        default: 80 // 生成的星星（点）的个数, 默认25个
      },
      lineColor: {
        type: String,
        default: 'rgba(45,140,210,0.4)' // 线的颜色
      },
      roundColor: {
        type: String,
        default: 'rgba(45,140,210,0.3)' // 星星的颜色
      },
    },	
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符'},
            { pattern:/^[A-Za-z0-9]+$/, message: '用户名只能为字母和数字'}
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符'},
          ]
        },
        checked: true,
        docWidth: 0, // 画布宽
        docHeight: 0, // 画布高
        context: null, // canvasDom的执行上下文
        circleArr: [], // 圆点数组
        timer: null, // 定时器对象
      };
     },
     mounted() {
      const canvasDom = this.$refs.canvas
      // 取画布的高宽来设置显示分辨率
      this.docWidth = canvasDom.offsetWidth
      this.docHeight = canvasDom.offsetHeight

      // 设置画布分辨率
      canvasDom.width = canvasDom.offsetWidth
      canvasDom.height = canvasDom.offsetHeight

      // 初始化canvas上下文
      this.context = canvasDom.getContext('2d')

      // 设置线条和星星颜色
      this.context.strokeStyle = this.lineColor;
      this.context.lineWidth = 1;
      this.context.fillStyle = this.roundColor;

      // 初始化
      this.createCircleArr()       // 设置星星数组
      this.draw() // 首屏绘制
      this.cycleDraw() // 循环绘制
     },
     methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handlelogin(event) {
      	let para = {
				name: this.ruleForm2.account,
				password: this.ruleForm2.checkPass,
			};
        api.userLogin(para).then((res) => {
	          if (res.data.code !== '200') {
	            this.$message({
	              message: res.data.msg,
	              type: 'error'
	            });
	          } else {
	          	this.$message({
	              message: res.data.msg,
	              type: 'success'
	            });
	            sessionStorage.setItem('username', JSON.stringify(res.data.data.account));
	            sessionStorage.setItem('id', JSON.stringify(res.data.data.id));
	            sessionStorage.setItem('group_id', JSON.stringify(res.data.data.group_id))
	            window.location.href='/index.html'
	          }  		 
				})
				.catch(err => {
				  this.$message({
		            message: '服务器开小差了。。。',
		            type: 'error'
		          });
				});
      },
      /**
       * 生成min和max之间随机数
       */
      rangeRadom(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      },
      /**
       * 绘制原点
       */
      drawCircle(context, x, y, r, moveX, moveY) {
        let circle = {
          x,
          y,
          r,
          moveX,
          moveY,
        }
        context.beginPath()
        context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
        context.closePath()
        context.fill()
        return circle
      },
      /**
       * 绘制线条
       */
      drawLine(context, beginX, beginY, closeX, closeY, opacity) {
        context.beginPath()
        context.strokeStyle = `rgba(0, 0, 0, ${opacity})`
        context.moveTo(beginX, beginY)
        context.lineTo(closeX, closeY)
        context.closePath()
        context.stroke()
      },
      /**
       * 生成圆点数组
       */
      createCircleArr() {
        for (let i = 0; i < this.point; i++) {
          this.circleArr.push(this.drawCircle(
            this.context,
            this.rangeRadom(this.docWidth, 0),
            this.rangeRadom(this.docHeight, 0),
            this.rangeRadom(15, 2),
            this.rangeRadom(10, -10)/40,
            this.rangeRadom(10, -10)/40
          ))
        }
      },
      /**
       * 每一帧绘制
       */
      draw() {
        const circleArr = this.circleArr
        this.context.clearRect(0, 0, this.docWidth, this.docHeight)
        // 循环绘制点
        for (let i = 0; i < this.point; i++) {
          this.drawCircle(this.context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
        }
        // 循环绘制线
        for (let i = 0; i < this.point; i++) {
          for (let j = 0; j < this.point; j++) {
            if (i + j < this.point) {
              let A = Math.abs(circleArr[i + j].x - circleArr[i].x)
              let B = Math.abs(circleArr[i + j].y - circleArr[i].y)
              let lineLength = Math.sqrt(A * A + B * B)
              let C = 1 / lineLength * 7 - 0.009
              let lineOpacity = C > 0.03 ? 0.03 : C;
              if (lineOpacity > 0) {
                this.drawLine(
                  this.context,
                  circleArr[i].x,
                  circleArr[i].y,
                  circleArr[i + j].x,
                  circleArr[i + j].y,
                  lineOpacity,
                )
              }
            }
          }
        }
      },
      /**
       * 循环绘制
       */
      cycleDraw() {
        this.timer = setInterval(() => {
          for(let i = 0; i < this.point; i++) {
            let cir = this.circleArr[i]
            cir.x += cir.moveX
            cir.y += cir.moveY
            if (cir.x > this.docWidth) {
              cir.x = 0
            } else if (cir.x < 0) {
              cir.x = this.docWidth
            }
            if (cir.y > this.docHeight) {
              cir.y = 0
            } else if (cir.y < 0) {
              cir.y = this.docHeight
            }
          }
          this.draw()
        }, 10)
      },
    },
    beforeDestory() {
      // 记得摧毁定时器
      clearInterval(this.timer)
    }
  }

</script>
<style>
.login-page-container{
	margin: 0;
	position: relative;
	width: 100%;
	height: 100%;
}	
.login-container {
  background-clip: padding-box;
  width: 100%;
  background: #fff;
  height: 50%;  
  padding-top: 20px; 
}

label.el-checkbox.remember {
    margin: 0px 0px 35px 0px;
}
.login_wrap{
	position: absolute;
	top: 200px;
	left: 40%;
	display: flex;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	box-shadow: 0 0 25px #cac6c6;
	animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInLeft;
}
.login_img{
	text-align: center;	
}

.login_img>h3{
	padding: 20px 10px;
	font-size: 32px;
    background-image: -webkit-linear-gradient(left, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s infinite linear;
}

@keyframes masked-animation {
    0%  { background-position: 0 0;}
    100% { background-position: -100% 0;}
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.login_img>div{
	width: 80%;
	margin: 20px auto;
	
}
.login_img>div>img{
	width: 100%;
	background-color:#409EFF;
	padding: 10px;
}
.login_wrap_right{
	background-color: #fff;
	padding: 35px 50px;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}
.title{
	color: #333;
	font-size: 35px;
	margin: 0 !important;
}

</style>