<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
	+ request.getServerName() + ":" + request.getServerPort()
	+ path ;
%>
<!DOCTYPE html>
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>信盟帮贷</title>
		<link rel="stylesheet" href="<%=basePath %>/web/resources/app/css/mobile_style.css" />
		<style type="text/css">
			#checkCode {
				width: 100px;
				height: 30px;
				float: right;
				padding: 0px;
				margin-top:5px;
				background-color: #FFFFFF;
			}
			.loading {
			position: fixed;
			z-index: 99999;
			display: none;
			width: 100%;
			height: 100%;
		}
		
		#loadding1 {
			width: 64px;
			height: 64px;
			position: fixed;
			top: 50%;
			left: 50%;
			margin-top: -32px;
			margin-left: -32px;
			z-index: 99999;
		}
		</style>
		<script src="<%=basePath %>/web/resources/jquery/js/jquery.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/base.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/frame.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/form.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/service-manage.js"></script>
		<script src="<%=basePath %>/web/resources/jquery/js/simply-toast.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/service/remoting-manage.js"></script>
	</head>

	<body>
		<div id="other_reg" class="container-fluid">
			<div class="loading">
				<img src="<%=basePath %>/web/resources/app/images/portal/loading.gif" id="loadding1" />
			</div>
			<div class="icon-head">
				<img src="<%=basePath %>/web/resources/app/images/agentreg/banner1.jpg" />
			</div>
			<div class="flex">
				<div class="step">
					<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_1.png" />
					<h3>手机号注册</h3>
				</div>
				<div class="arrow">
					<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_4.png" />
				</div>
				<div class="step">
					<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_3.png" />
					<h3>填写个人资料</h3>
				</div>
				<div class="arrow">
					<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_4.png" />
				</div>
				<div class="step">
					<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_2.png" />
					<h3>等待下款</h3>
				</div>
			</div>
			<form class="form-horizontal form-search" id="form_reginfo" style="margin-top: 2rem;">
				<input type="text" name="busimessName" hidden="hidden" />
				<div class="row">
					<div class="row-cell">
						<img src="<%=basePath %>/web/resources/app/images/agentreg/user.png" />
						<input type="tel" name="userName" maxlength="13" autocomplete="off" placeholder="请输入手机号码" />
					</div>
					<div class="row-cell row-sms">
						<img src="<%=basePath %>/web/resources/app/images/agentreg/code.png">
							<input type="text" placeholder="请输入验证码" id="authCode" />

							<img id="checkCode" src="<%=basePath %>/validateCodeServlet" onclick="changeImg()" />

					</div>
					<div class="row-cell row-sms">
						<img src="<%=basePath %>/web/resources/app/images/agentreg/code.png" />
						<input type="tel" maxlength="4" name="smsCode" autocomplete="off" placeholder="请输入验证码" />
						<button type="button" class="btn-sms" name="authcode">发送验证码</button>
					</div>
				</div>
			</form>
			<button type="button" class="btn-reg">立即申请</button>
			<span class="span_title" style="color: #9D9D9D;">点击注册即视为同意</span>
			<a href="#" class="user_accept">《用户协议》</a>
		</div>

	</body>

</html>
<script type="text/javascript">
	//刷新图片  
	function changeImg() {  
	    var imgSrc = $("#checkCode");  
	    var src = imgSrc.attr("src");  
	    imgSrc.attr("src", "<%=basePath %>/validateCodeServlet?timestamp="+(new Date()).valueOf());  
	}  

	var $serviceProvider = $service.factory(appConfig.service);
	var countdown = 60;
	//refreshCode();

	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	var Request = new Object();
	Request = GetRequest();
	var type = Request.type;
	$("#form_reginfo").find("input[name=busimessName]").val(Request.name);
	console.log(Request.name)
	console.log($("#form_reginfo").find("input[name=busimessName]").val())
	$("#other_reg").on('click', 'button[name=authcode]', function() {

		var userName = $("#other_reg").find("input[name=userName]").val();
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		var authCode = $("#other_reg").find("input[id=authCode]").val();
		if(!myreg.test(userName)) {
			//alert('请输入有效的手机号码!');
			$.simplyToast.error('请输入有效的手机号码!');
			return;
		}
		if(authCode == '') {
			//alert('请输入有效的手机号码!');
			$.simplyToast.error('请输入图形验证码!');
			return;
		}
		//手机验证
		$("#other_reg").find("button[name=authcode]").attr('disable', true);
		$serviceProvider.mobile.authcode(userName,authCode, function(res) {
			if(res.code == 0) {
				settime($("#other_reg").find("button[name=authcode]"));
				$.simplyToast.success("发送验证码成功,请注意查收");
			} else {
				$.simplyToast.error(res.message);
				changeImg();
				$("#other_reg").find("input[id=authCode]").val('');
				$("#other_reg").find("button[name=authcode]").attr('disable', false);
			}
		})
	})
	$(".btn-reg").click(function() {
		$(".btn-reg").attr('disabled', true);
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if(!myreg.test($("#other_reg").find("input[name=userName]").val())) {
			//alert('请输入有效的手机号码!');
			$.simplyToast.error('请输入有效的手机号码!');
			$(".btn-reg").attr('disabled', false);
			return;
		}
		$(".loading").css("display", "block");
		$serviceProvider.mobile.register($("#form_reginfo"), function(res) {
			$(".loading").css("display", "none");
			console.log($("#form_reginfo").find("input[name=busimessName]").val());
			if(res.code == 0) {
				$(".btn-reg").attr('disabled', false);
				if(type == 99) {
					window.location.href = appConfig.contextPath + "/mobile/pre_basic_info?userId=" + res.result.userId + "&type=99&name=" + res.result.name;
				} else {
					window.location.href = appConfig.contextPath + "/mobile/pre_basic_info?userId=" + res.result.userId + "&name=" + res.result.name;
				}

			} else {
				$(".btn-reg").attr('disabled', false);
				$.simplyToast.error(res.message);
			}
		});
		if(Request.name == null || Request.name == "") {

		} else {
			$serviceProvider.mobile.browse(Request.name, function(res) {
				if(res.code == 0) {} else {}
			})
		}

	})
	$(".user_accept").click(function() {
		window.location.href = appConfig.contextPath + "/web/mobile/user_agreement.html";
	})

	function refreshCode() {
				$("#checkCode").attr("src", appConfig.contextPath + "/validatecode?random=" + Math.random())
		};
	function settime(obj) {
		if(countdown == 0) {
			obj.attr("disabled", false);
			//		obj.button_disabled=false;
			obj.text("免费获取验证码").css("background-color", "#66CCFF");
			countdown = 60;
			return;
		} else {
			obj.attr("disabled", true);
			//		obj.hover(function(){
			//			
			//		},function(){
			//			
			//		})
			//		obj.button_disabled=true;
			obj.text("重新发送(" + countdown + ")").css("background-color", "#ccc");
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	}
</script>