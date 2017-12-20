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
		<title>基本信息</title>
		<link rel="stylesheet" href="<%=basePath %>/web/resources/font-awesome/css/font-awesome.css" />
		<link rel="stylesheet" href="<%=basePath %>/web/resources/app/css/mobile_style.css" />
		<script src="<%=basePath %>/web/resources/jquery/js/jquery.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/base.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/frame.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/form.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/service-manage.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/app-manage.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/area.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/citychange.js"></script>
		<script src="<%=basePath %>/web/resources/jquery/js/simply-toast.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/portal/idCardCheck.js"></script>
		<script src="<%=basePath %>/web/resources/app/js/service/remoting-manage.js"></script>
	</head>
	<style>
		.simply-toast {
			padding: 15px;
			margin-bottom: 20px;
			border: 1px solid transparent;
			border-radius: 4px;
			background-color: #f2dede;
			border-color: #ebccd1;
			color: #a94442;
		}
		
		.btn-regs,
		.btn-reg {
			height: 44px;
			line-height: 44px;
			margin: 8% 5% 0;
			width: 90%;
			border: none;
			text-decoration: none;
			text-align: center;
			font-size: 18px;
			color: #fff;
			background-color: #66CCFF;
			border-radius: 4px;
			font-family: "微软雅黑", "宋体";
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

	<body style="background-color: #f5f5f5;">

		<div id="basic_info" class="container-fluid">
			<div class="loading">
				<img src="<%=basePath %>/web/resources/app/images/portal/loading.gif" id="loadding1" />
			</div>
			<div class="icon-head">
				<div class="header_info">
					<div class="header_img">
						<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_11.png" />
					</div>
					<div>身份认证</div>
					<div>完善信息</div>
					<div>提交申请</div>
				</div>
			</div>
			<form class="form-horizontal form-search" id="form_reginfo">
				<input name="userId" hidden="hidden" />
				<input name="busimessName" hidden="hidden" />
				<div class="one">
					<div class="row">
						<input name="gender" hidden="hidden" />
						<div class="row-cell">
							<label class="input_title">真实姓名  </label>
							<input type="text" name="name" autocomplete="off" placeholder="请输入真实姓名" />
						</div>
						<div class="row-cell">
							<label class="input_title">年龄  </label>
							<input type="text" name="age" autocomplete="off" placeholder="请输入年龄" />
						</div>
						<div class="row-cell row-cell-last chose_city">
							<select class="city" name="provinceCode">
							</select>
							<select class="city" name="cityCode">
							</select>
							<select class="city" name="districtCode">
							</select>
						</div>
					</div>
					<div class="row">
						<div class="row-cell2 row-cell-last">
							<label class="input_title">我的身份</label>
							<div class="lanrentuku">
								<div class="my_identity">
									<div class="pitch_on"><i class="fa">&#xf00c;</i></div>
									<input type="radio" name="work" class="radio_work" value="3" style="display: none;">
									<div class="identity_img">
										<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_07.png">
									</div>
									<div class="identity">上班族</div>
								</div>
								<div class="my_identity">
									<div class="pitch_on"><i class="fa">&#xf00c;</i></div>
									<input type="radio" name="work" class="radio_company" value="2" style="display: none;">
									<div class="identity_img">
										<img src="<%=basePath %>/web/resources/app/images/agentreg/ico_08.png">
									</div>
									<div class="identity">企业主</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="row-cell">
							<label class="input_title">公司名称  </label>
							<input type="text" name="workName" autocomplete="off" placeholder="请输入公司详细名称" />
						</div>
						<div class="row-cell">
							<label class="input_title">月收入&emsp; </label>
							<select class="xk_select" name="monthCost">
								<option value="">请选择您的收入情况</option>
								<option value="1">3000以下</option>
								<option value="2">3000-6000</option>
								<option value="3">6000-20000</option>
								<option value="4">20000-100000</option>
								<option value="5">10万以上</option>
							</select>
						</div>

						<div class="row-cell row-cell-last">
							<label class="input_title">发薪方式  </label>
							<select class="xk_select" name="payWay">
								<option value="">请选择您的发薪方式</option>
								<option value="1">打卡</option>
								<option value="2">现金</option>
							</select>
						</div>
						<div class="row-cell2 row-cell" style="border: none;">
							<span class="input_title">借款金额  </span>
							<input type="text" name="amount" autocomplete="off" placeholder="请输入需求额度" />
						</div>

					</div>
				</div>
				<div class="two" style="display: none;">
					<div class="row">
						<div class="row-cell">
							<span class="input_title">社保&emsp;&emsp; </span>
							<select name="shebao">
								<option value="">请选择社保信息</option>
								<option value="0">无</option>
								<option value="1">6个月以下</option>
								<option value="2">6个月以上</option>
							</select>
						</div>
						<div class="row-cell">
							<span class="input_title">公积金&emsp; </span>
							<select name="gongjijin">
								<option value="">请选择公积金信息</option>
								<option value="0">无</option>
								<option value="1">6个月以下</option>
								<option value="2">6个月以上</option>
							</select>
						</div>
						<div class="row-cell">
							<span class="input_title">商业保险 </span>
							<select name="shangbao">
								<option value="">请选择商业保险信息</option>
								<option value="0">无</option>
								<option value="1">一年以下</option>
								<option value="2">一年以上</option>
							</select>
						</div>
						<!--<div class="row-cell">
							<span class="input_title">芝麻分 </span>
							<select name="zhimafen">
								<option value="">请选择芝麻分信息</option>
								<option value="0">无</option>
								<option value="1">600以下</option>
								<option value="2">600以上</option>
							</select>
						</div>-->
						<div class="row-cell">
							<span class="input_title">微粒贷 </span>
							<select name="weilidai">
								<option value="">请选择微粒贷信息</option>
								<option value="0">无</option>
								<option value="1">有</option>
							</select>
						</div>
						<!--<div class="row-cell" style="border: none;">
							<span class="input_title">淘宝四星 </span>
							<select name="taobao">
								<option value="">请选择淘宝四星信息</option>
								<option value="0">否</option>
								<option value="1">是</option>
							</select>
						</div>-->
					</div>
					<div class="row">
						<div class="row-cell">
							<span class="input_title">房产&emsp;&emsp; </span>
							<select name="house">
								<option value="">请选择房产信息</option>
								<option value="0">无</option>
								<option value="1">有</option>
							</select>
						</div>
						<!--<div class="row-cell">
							<span class="input_title">房产现值 </span>
							<input type="text" disabled name="housePrice" autocomplete="off" placeholder="请填写现金金额" />
						</div>-->
						<div class="row-cell">
							<span class="input_title">房产抵押  </span>
							<select name="houseMortgage" disabled>
								<option value="">请选择是否接受房产抵押</option>
								<option value="1">接受</option>
								<option value="0">不接受</option>
							</select>
						</div>
						<div class="row-cell">
							<span class="input_title">车产&emsp;&emsp;  </span>
							<select name="car">
								<option value="">请选择车产信息</option>
								<option value="0">无</option>
								<option value="1">有</option>
							</select>
						</div>
						<!--<div class="row-cell">
							<span class="input_title">车产现值  </span>
							<input type="text" disabled name="carPrice" autocomplete="off" placeholder="请填写现金金额" />
						</div>-->
						<div class="row-cell row-cell-last">
							<span class="input_title">车产抵押  </span>
							<select name="carMortgage" disabled>
								<option value="">请选择是否接受车产抵押</option>
								<option value="1">接受</option>
								<option value="0">不接受</option>
							</select>
						</div>
					</div>
					<div class="row">

						<input type="hidden" name="amount" disabled="disabled" autocomplete="off" placeholder="请输入需求额度" />

						<!--<div class="row-cell">
							<span class="input_title">借款期限  </span>
							<select name="limit">
								<option value="">请选择借款期限</option>
								<option value="一个月">一个月</option>
								<option value="三个月">三个月</option>
								<option value="六个月">六个月</option>
								<option value="九个月">九个月</option>
								<option value="一年">一年</option>
								<option value="俩年">俩年</option>
								<option value="三年">三年</option>
							</select>
						</div>-->
						<!--<div class="row-cell">
							<span class="input_title">征信情况  </span>
							<select name="creditStatus">
								<option value="">请选择征信情况</option>
								<option value="1">非常好</option>
								<option value="2">良好</option>
								<option value="3">逾期严重</option>
								
							</select>
						</div>-->
						<div class="row-cell row-cell-last">
							<span class="input_title">借款用途  </span>
							<input name="purpose" autocomplete="off" type="text" placeholder="必填项" />
						</div>
					</div>

				</div>
			</form>
			<button href="#" class="btn-reg">下一步</button>
			<button class="btn-regs" style="display: none;">提交申请</button>
			<div class="span_notice">成功就在前方,再坚持一下</div>
			<span class="span_notices" style="display: none;">温馨提示:</span><br />
			<div class="span_notices" style="display: none;">
				1.请确保信息填写完整真实,否则将无法通过人工审核,虚假信息将导致申请失败,被系统计入黑名单.<br />2.基本信息有效期为90天,有效期内不得编辑修改</div>
		</div>
		</div>

	</body>

</html>
<script type="text/javascript">
	var $serviceProvider = $service.factory(appConfig.service);
	//var newTab=window.open('about:blank');
	$(".my_identity").click(function() {
		$(this).find(".pitch_on").css("display", "block");
		$(this).find("input[type=radio]").prop("checked", "2")
		$(this).siblings().find(".pitch_on").css("display", "none");
	})
	$("#form_reginfo").initProvince();

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
	var type = 0;

	if(Request.type) {
		type = Request.type;
	}
//	console.log(type);
	if(Request.userId == "" || Request.userId == null) {
		//window.location.href=appConfig.contextPath + "/mobile/other_reg";
	}
	$("#form_reginfo").find("input[name=userId]").val(Request.userId);
	$("#form_reginfo").find("input[name=busimessName]").val(Request.name);
	$(".btn-reg").click(function() {
		$(".two").find("input[name=amount]").val($(".one").find("input[name=amount]").val());
//		console.log($(".two").find("input[name=amount]").val())
		var count = 0;
		$(".one").find("input[type=text]").each(function() {
			var $this = $(this);
			if($.isNullOrEmpty($this.val())) {
				//alert($this.prev().text() + '不能为空');
				$.simplyToast.error($this.prev().text() + '不能为空');
				count++;
				return false;
			}
		});
		if(isNaN($(".one").find("input[name=age]").val())) {
			var $this = $(this);
			$.simplyToast.error($this.prev().text() + '年龄只能填写数字');
			$(".btn-regs").attr("disabled", false);
			count++;
			return false;
		}
		/* if(!(idCardNoUtil.check15IdCardNo($(".one").find("input[name=idNumber]").val()) || idCardNoUtil.check18IdCardNo($(".one").find("input[name=idNumber]").val()))) {
			if(count > 0) {
				return;
			}
			$.simplyToast.error('请输入正确的身份证号!');
			return;
		} else {
			var idNumber = $(".one").find("input[name=idNumber]").val();
			var arr = idNumber.split("");
			if(arr.length == 18) {
				if(parseInt(idNumber.substr(16, 1)) % 2 == 1) {
					$(".one").find("input[name = gender]").val(2);
				} else {
					$(".one").find("input[name = gender]").val(1);
				}
			} else {
				if(parseInt(idNumber.substr(13, 1)) % 2 == 1) {
					$(".one").find("input[name = gender]").val(2);
				} else {
					$(".one").find("input[name = gender]").val(1);
				}
			}

		}; */
		$(".one").find($(".city")).each(function() {
			if(count > 0) {
				return;
			};
			if($.isNullOrEmpty($(this).val())) {
				//alert('地区不能为空');
				$.simplyToast.error('地区不能为空');
				count++;
				return false;
			}
		});
		$(".one").find($(".xk_select")).each(function() {
			if(count > 0) {
				return;
			};
			var $this = $(this);
			if($.isNullOrEmpty($this.val())) {
				//alert($this.prev().text() + '不能为空');
				$.simplyToast.error($this.prev().text() + '不能为空');
				count++;
				return false;
			}
		});
		if(isNaN($(".one").find("input[name=amount]").val())) {
			var $this = $(this);
			$.simplyToast.error($this.prev().text() + '只能填写数字');
			$(".btn-regs").attr("disabled", false);
			count++;
			return false;
		}
		if(!($(".radio_work").prop("checked") || $(".radio_company").prop("checked"))) {
			if(count > 0) {
				return;
			};
			//alert("请选择您的身份");
			$.simplyToast.error("请选择您的身份");
			count++;
		}
		if(count > 0) {
			return;
		};
		//	if(type == 99) {
			$(".two").find("input[name=amount]").val($(".one").find("input[name=amount]").val());
			$(".one").css("display", "none");
			$(".two").css("display", "block");
			$(".btn-reg").css("display", "none");
			$(".btn-regs").css("display", "block");
			$(".span_notice").css("display", "none");
			$(".span_notices").css("display", "block");
			$(".header_img").find("img")[0].src = '<%=basePath %>/web/resources/app/images/agentreg/ico_12.png';
			//} else {
			//	if($(".two").css("display") == "none") {
				//	$(".one").css("display", "none");
				//	$(".two").css("display", "block");
				//	$(".btn-reg").css("display", "none");
				//	$(".btn-regs").css("display", "block");
				//	$(".span_notice").css("display", "none");
				//	$(".span_notices").css("display", "block");
				//	$(".header_img").find("img")[0].src = '<%=basePath %>/web/resources/app/images/agentreg/ico_12.png';
				//}
			//			$(".two").find("input[name=amount]").val($(".one").find("input[name=amount]").val());
			//			if($(".two").find("input[name=amount]").val()>=50000){
			//				$(".one").css("display","none");
			//				$(".two").css("display","block");
			//				$(".btn-reg").css("display","none");
			//				$(".btn-regs").css("display","block");
			//				$(".span_notice").css("display","none");
			//				$(".span_notices").css("display","block");
			//				$(".header_img").find("img")[0].src = '<%=basePath %>/web/resources/app/images/agentreg/ico_12.png';
			//			}else{
			//				$(".btn-reg").attr("disabled",true);
			//				$serviceProvider.mobile.submitApplication($("#form_reginfo"), function(res) {
			//					if(res.code == 0) {
			//						$(".btn-reg").attr("disabled",false);
			//						window.location.href = "http://jc.yaredai.net/";
			//					} else {
			//						$(".btn-reg").attr("disabled",false);
			//						$.simplyToast.error(res.message);
			//					}
			//				})
			//				
			//			}
		//}

	})
	$("#form_reginfo").find("select[name=house]").change(function() {
		if($(this).val() == 0) {
			$("#form_reginfo").find("select[name=houseMortgage]").attr("disabled", "disabled");
			$("#form_reginfo").find("select[name=houseMortgage]").val("0");
			$("#form_reginfo").find("input[name=housePrice]").attr("disabled", "disabled");
			$("#form_reginfo").find("input[name=housePrice]").val("0");
		} else if($(this).val() == 1) {
			$("#form_reginfo").find("select[name=houseMortgage]").removeAttr("disabled");
			$("#form_reginfo").find("select[name=houseMortgage]").val("");
			$("#form_reginfo").find("input[name=housePrice]").removeAttr("disabled");
			$("#form_reginfo").find("input[name=housePrice]").val("");
		}
	});
	$("#form_reginfo").find("select[name=car]").change(function() {
		if($(this).val() == 0) {
			$("#form_reginfo").find("select[name=carMortgage]").attr("disabled", "disabled");
			$("#form_reginfo").find("select[name=carMortgage]").val("0");
			$("#form_reginfo").find("input[name=carPrice]").attr("disabled", "disabled");
			$("#form_reginfo").find("input[name=carPrice]").val("0");
		} else if($(this).val() == 1) {
			$("#form_reginfo").find("select[name=carMortgage]").removeAttr("disabled");
			$("#form_reginfo").find("select[name=carMortgage]").val("");
			$("#form_reginfo").find("input[name=carPrice]").removeAttr("disabled");
			$("#form_reginfo").find("input[name=carPrice]").val("");
		}
	})
	$(".btn-regs").click(function() {
		
		$(".btn-regs").attr("disabled", true);
		var count = 0;
		$(".two").find("input[type=text]").each(function() {
			var $this = $(this);
			if($.isNullOrEmpty($this.val())) {
				//alert($this.prev().text() + '不能为空');
				$.simplyToast.error($this.prev().text() + '不能为空');
				$(".btn-regs").attr("disabled", false);
				count++;
				return false;
			}
//			if(isNaN($this.val())) {
//				$.simplyToast.error($this.prev().text() + '只能填写数字');
//				$(".btn-regs").attr("disabled", false);
//				count++;
//				return false;
//			}
		});
		$(".two").find("select").each(function() {
			if(count > 0) {
				return;
			};
			var $this = $(this);
			if($.isNullOrEmpty($this.val())) {
				//alert($this.prev().text() + '不能为空');
				$.simplyToast.error($this.prev().text() + '不能为空');
				$(".btn-regs").attr("disabled", false);
				count++;
				return false;
			}
		});
		if(count > 0) {
			return;
		};
		$(".loading").css("display", "block")
//		console.log(type)
		$(".btn-reg").attr("disabled", true);
		$serviceProvider.mobile.submitApplication($("#form_reginfo"), function(res) {
			$(".loading").css("display", "none");
			if(res.code == 0) {
				$(".btn-reg").attr("disabled", false);
				$.simplyToast.success("恭喜注册成功！信贷专员会尽快与您联系。");
				//window.location.href = "https://5g.yirendai.com";
			} else {
				$(".btn-reg").attr("disabled", false);
				$.simplyToast.error(res.message);
			}
		})
		<%-- if(type == 99) {
			$serviceProvider.mobile.submitApplications($("#form_reginfo"), function(res) {
				$(".loading").css("display", "none");
				if(res.code == 0) {
					window.location.href = appConfig.contextPath + "/mobile/apply_success";
				} else {
					$(".btn-regs").attr("disabled", false);
					$.simplyToast.error(res.message);
				}
			})
		} else {
			$(".two").find("input[name=amount]").val($(".one").find("input[name=amount]").val());
			if($(".two").find("input[name=amount]").val() >= 50000) {
				$(".one").css("display", "none");
				$(".two").css("display", "block");
				$(".btn-reg").css("display", "none");
				$(".btn-regs").css("display", "block");
				$(".span_notice").css("display", "none");
				$(".span_notices").css("display", "block");
				$(".header_img").find("img")[0].src = '<%=basePath %>/web/resources/app/images/agentreg/ico_12.png';
				$serviceProvider.mobile.submitApplications($("#form_reginfo"), function(res) {
					$(".loading").css("display", "none");
					if(res.code == 0) {
						window.location.href = appConfig.contextPath + "/mobile/apply_success";
					} else {
						$(".btn-regs").attr("disabled", false);
						$.simplyToast.error(res.message);
					}
				})
			} else {
				$(".btn-reg").attr("disabled", true);
				$serviceProvider.mobile.submitApplication($("#form_reginfo"), function(res) {
					$(".loading").css("display", "none");
					if(res.code == 0) {
						$(".btn-reg").attr("disabled", false);
						window.location.href = "http://jc.yaredai.net/";
					} else {
						$(".btn-reg").attr("disabled", false);
						$.simplyToast.error(res.message);
					}
				})

			}
		} --%>
		
		
		
		//		$serviceProvider.mobile.submitApplications($("#form_reginfo"), function(res) {
		//			if(res.code == 0) {
		//				window.location.href=appConfig.contextPath + "/mobile/apply_success";
		//			} else {
		//				$(".btn-regs").attr("disabled",false);
		//				$.simplyToast.error(res.message);
		//			}
		//		})
	})
</script>