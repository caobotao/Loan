var $controller = {};
var $serviceProvider = $service.factory(appConfig.service);
$controller.modal = $controller.modal || {};
$controller.modal.export = $controller.modal.export || {};
$controller.modal.export.open = function() {
	$("#modal_export").modal("show");
	$("#id_export_loading").show();
	$("#id_export_success").hide();
	$("#id_export_error").hide();
};
$controller.modal.export.success = function(url) {
	$("#id_export_loading").hide();
	$("#id_export_success").show();
	$("#id_export_error").hide();
	$("#id_export_url").attr("href", url);
};
$controller.modal.export.error = function() {
	$("#id_export_loading").hide();
	$("#id_export_success").hide();
	$("#id_export_error").show();
};
$controller.desktop = $controller.desktop || {};
$controller.desktop.init = function($dom) {};

$controller.user = $controller.user || {};
$controller.user.init = function($dom) {
	initData();

	/* 			$("select[name=province]").change(function(){
	 					 alert(12);
	 					}); */

	$dom.find("button[action=search]").click(function() {
		$(this).button("loading");
		$dom.find(".tb-processing-overlay").show();
		$dom.find("input[name=page]").val(1);
		initData();
	});

	$dom.find("button[action=export]").click(function() {
		$controller.modal.export.open();
		$serviceProvider.exportUser($dom.find("#form_user"), function(res) {
			if(res.code == 0) {
				$controller.modal.export.success(res.result);
			} else {
				$controller.modal.export.error();
			}
		});
		//		window.open(appConfig.contextPath + "/export");
	});
	$dom.find("button[action=save_new_pwd]").click(function() {
		var id = $dom.find("input[name = puserid]").val();
		var newPwd = $dom.find("input[name = newuserPwd]").val();
		var newPwdAgain = $dom.find("input[name = newuserPwdAgain]").val();
		if(newPwd != newPwdAgain) {
			$.simplyToast.error("两次密码输入不一致");
		} else {
			$serviceProvider.resetUserPassword(id, newPwdAgain, function(res) {
				if(res.code == 0) {
					$.simplyToast.success("成功");
					$dom.find("#modal_reset_userpwd").modal("hide");
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
	//启用 停用
	$dom.on("click", "button[action=del_user]", function() {
		var id = $(this).parent().data("userid");
		$serviceProvider.editUserStatus(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		$dom.find(".tb-processing-overlay").show();
		initData();
	});
	$(".info1").click(function() {
		$(".info1_text").css("display", "block");
		$(".info2_text").css("display", "none");
		$(".info3_text").css("display", "none");
	});
	$(".info2").click(function() {
		$(".info2_text").css("display", "block");
		$(".info1_text").css("display", "none");
		$(".info3_text").css("display", "none");
	});
	$(".info3").click(function() {
		$(".info3_text").css("display", "block");
		$(".info2_text").css("display", "none");
		$(".info1_text").css("display", "none");

	});
	//用户详情
	$dom.on("click", "button[action=user_detail]", function() {
		var id = $(this).parent().data("userid");
		$serviceProvider.userInfoDetail(id, function(res) {
			console.log(res);
			if(res.code == 0) {
				var userInfo = res.result;

				$dom.find("#form_user_info").initData(userInfo); /*  */
				$dom.find("#modal_user_info").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//通过H5页面注册的更多信息
	//	$dom.on("click", "info3", function() {
	//		
	//	});
	//备注
	$dom.on("click", "button[action=user_note]", function() {
		var id = $(this).parent().data("userid");
		$serviceProvider.userInfoNote(id, function(res) {
			if(res.code == 0) {
				var userInfo = res.result;
				$dom.find("#form_user_note").initData(userInfo); /*  */
				$dom.find("#modal_user_note").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//保存 备注
	$dom.on("click", "button[action = save_remark]", function() {
		$serviceProvider.saveNote($dom.find("#form_user_note"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_user_note").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//修改代理到期时间
	$dom.on("click", "button[action=btn_agent]", function() {
		var id = $dom.find("input[name = userId]").val();
		$dom.find("#modal_agentTime").modal("show");
		$dom.find("input[name = id]").val(id);
	});
	//确定修改代理到期时间
	$dom.on("click", "button[action=ensureagent]", function() {
		var id = $dom.find("input[name = id]").val();
		var time = $dom.find("input[name = agentCooperTime]").val();
		$serviceProvider.modifyAgentTime(id, time, function(res) {
			if(res.code == 0) {
				$dom.find("#modal_edit").modal("hide");
				$dom.find("#modal_agentTime").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//修改广告位到期时间
	$dom.on("click", "button[action=btn_adcooperation]", function() {
		var id = $dom.find("input[name = userId]").val();
		$dom.find("#modal_adCooperation").modal("show");
		$dom.find("#ad_type").initData();
		$dom.find("input[name = id]").val(id);
	});
	//确定修改广告位到期时间
	$dom.on("click", "button[action=ensuread]", function() {

		$serviceProvider.modifyAdTime($dom.find("#form_adcooper"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_edit").modal("hide");
				$dom.find("#modal_adCooperation").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//编辑用户
	$dom.on("click", "button[action=edit_user]", function() {
		var id = $(this).parent().data("userid");
		$dom.find("input[name = userId]").val(id);
		$serviceProvider.userInfoDetail(id, function(res) {
			if(res.code == 0) {
				var userInfo = res.result;
				$dom.find("#form_edit_user").initData(userInfo);
				changeCity(userInfo.provinceCode, userInfo.cityCode, userInfo.districtCode);
				changeDistrict(userInfo.cityCode, userInfo.districtCode);
				/* $("#form_edit_user").setValue("province",userInfo.provinceCode);
				$("#form_edit_user").setValue("city",userInfo.cityCode);
				$("#form_edit_user").setValue("district",userInfo.districtCode); */
				$dom.find("#modal_edit").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//保存 编辑
	$dom.on("click", "button[action = btn_save_user]", function() {
		$serviceProvider.editUserInfo($dom.find("#form_edit_user"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_edit").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//重置密码
	$dom.on("click", "button[action = reset_user]", function() {
		$dom.find("#modal_reset_userpwd").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("input[name=puserid]").val(id);
	});
	$dom.on("change", "#ad_type", function() {
		var id = $(this).val();
		$serviceProvider.getChargeSelect(id, function(res) {
			if(res.code == 0) {
				var htmlTxt = res.result;
				$dom.find("#ad_level").html(htmlTxt);
			} else {
				$.simplyToast.error(res.message);
			}
		});
		//		var htmlTxt = "";
		//		if(id == 1) {
		//			htmlTxt += "<option value='9'>关闭</option>";
		//			htmlTxt += "<option value='1'>1000元</option>";
		//			htmlTxt += "<option value='2'>5000元</option>";
		//		} if(id == 2) {
		//			htmlTxt += "<option value='9'>关闭</option>";
		//			htmlTxt += "<option value='1'>398元</option>";
		//			htmlTxt += "<option value='2'>1000元</option>";
		//		}if(id == 3) {
		//			htmlTxt += "<option value='9'>关闭</option>";
		//			htmlTxt += "<option value='1'>398元</option>";
		//			htmlTxt += "<option value='2'>1000元</option>";
		//		}if(id == 4) {
		//			htmlTxt += "<option value='9'>关闭</option>";
		//			htmlTxt += "<option value='1'>398元</option>";
		//			htmlTxt += "<option value='2'>1000元</option>";
		//		}if(id == 7) {
		//			htmlTxt += "<option value='9'>关闭</option>";
		//			htmlTxt += "<option value='1'>198元</option>";
		//			htmlTxt += "<option value='2'>1000元</option>";
		//			htmlTxt += "<option value='2'>5000元</option>";
		//		}
	});

	function initData() {
		$serviceProvider.getList($dom.find("#form_user"), function(res) {
			$dom.find("button[action=search]").button("reset");
			$dom.find(".tb-processing-overlay").hide();
			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_user").html($dom.find("#tmpl_user").tmpl(res.result));
				$dom.find("#table_pagination").html($dom.find("#tmpl_pagination").tmpl(res.pagination))
			} else {
				$.simplyToast.error(res.message);
			}

		});
	};

	//选择省份联动市
	function changeCity(id1, id2, id3) {
		$dom.find("#form_edit_user").setValue("provinceCode", id1);

		$serviceProvider.getCity(id1, 3, function(res) {
			if(res.result != null) {
				$dom.find("#form_edit_user").getField("cityCode").initSelect(res.result);
				$dom.find("#form_edit_user").setValue("cityCode", id2);
				changeDistrict(id2, id3);
			}
		});
	};
	//选择市联动区
	function changeDistrict(id2, id3) {
		$serviceProvider.getDistrict(id2, function(res) {
			if(res.result != null) {
				$dom.find("#form_edit_user").getField("districtCode").initSelect(res.result);
				$dom.find("#form_edit_user").setValue("districtCode", id3);
			}
		});
	};
	//选择省份联动市
	$dom.on("change", "select[name=provinceCode]", function() {
		var id1 = $(this).val();
		changeCity(id1, 0, 0);

	});
	//选择市联动区
	$dom.on("change", "select[name=cityCode]", function() {
		var id = $(this).val();
		changeDistrict(id, 0);
	});
}
$controller.loanmanage = $controller.loanmanage || {};
$controller.loanmanage.init = function($dom) {
	initData();
	var editor;
	editor = KindEditor.create("#contents", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});
	var editor1;
	editor1 = KindEditor.create("#flowsheet", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});

	function initData() {
		$serviceProvider.getProductList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_product").html($dom.find("#tmpl_product").tmpl(res.result));
				$dom.find("#table_pagination").html($dom.find("#tmpl_pagination").tmpl(res.pagination))
			} else {
				$.simplyToast.error(res.message);
			};
		});
	}

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	$dom.on("click", "button[action = search]", function() {
		initData();
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	$dom.on("click", "button[action = btn_raiders]", function() {
		var id = $(this).parent().data("productid");
		editor.html("");
		$dom.find("input[name=raiderID]").val(id);
		$serviceProvider.getProductBean(id, function(res) {
			var productBean = res.result;
			if(res.code == 0) {
				$dom.find("input[name = webURL]").val(productBean.raiders);
				$dom.find("#contents").val(productBean.raidersContent);
				editor.html(productBean.raidersContent);
				$dom.find("#modal_raiders").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	$dom.on("click", "button[action = save_raiders]", function() {
		editor.sync();
		$serviceProvider.raiders($dom.find("#form_raiders"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("保存成功");
				$dom.find("#modal_raiders").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "button[action = preview]", function() {
		window.open($("input[name = webURL]").val());

	});
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("productid");
		$serviceProvider.getProductBean(id, function(res) {
			if(res.code == 0) {
				var productBean = res.result;
				var platform = productBean.platform;
				var rateType = productBean.interestRateType;
				var img = productBean.image;
				$dom.find("input[name = image]").val(img);
				$dom.find("#form_productinfo").initData(productBean);
				$dom.find("#form_productinfo").setValue("platform", platform);
				$dom.find("#form_productinfo").setValue("interestRateType", rateType);
				$dom.find("#form_productinfo").find("#photos").attr("src", img);
				$dom.find("#modal_product_info").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});

	$dom.on("click", "button[action = btn_up]", function() {
		var id = $(this).parent().data("productid");
		$serviceProvider.upAction(id, function(res) {
			if(res.code == 0) {
				initData();
				$.simplyToast.success("成功置顶");

			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	$dom.on("click", "button[action = btn_flowsheet]", function() {
		var id = $(this).parent().data("productid");
		$serviceProvider.getProductBean(id, function(res) {
			if(res.code == 0) {
				var productBean = res.result;
				editor1.html(productBean.flowSheet);
				$dom.find("#form_flowsheet").initData(productBean);
				$dom.find("#modal_flowsheet").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	$dom.on("click", "button[action = save_flowsheet]", function() {
		editor1.sync();
		$serviceProvider.saveFlowSheet($dom.find("#form_flowsheet"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_flowsheet").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	$dom.on("click", "button[action = btn_homeup]", function() {
		var id = $(this).parent().data("productid");
		$serviceProvider.homeupAction(id, function(res) {
			if(res.code == 0) {
				initData();
				$.simplyToast.success("成功置顶");

			} else {
				$.simplyToast.error(res.message);
			}
		});

	});

	$dom.on("click", "button[action = btn_recommend]", function() {
		var id = $(this).parent().data("productid");
		$serviceProvider.productRecommend(id, function(res) {
			if(res.code == 0) {
				initData();
				$.simplyToast.success("成功更改推荐状态");

			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "button[action = save_productinfo]", function() {
		$serviceProvider.uploadProduct($dom.find("#form_productinfo"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_product_info").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "button[action = save_addproductinfo]", function() {
		var img = $dom.find("input[name = imageadd]").val();
		var name = $dom.find("input[name = productName]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不允许为空！");
			return;
		}
		$serviceProvider.addProduct($dom.find("#form_add_productinfo"), img, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功添加产品");
				$dom.find("#modal_add_product").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "button[action = btn_del]", function() {
		var pname = $(this).parent().data("productname");
		var id = $(this).parent().data("productid");
		$dom.find("#form_notice").find("label[name = notice]").text("确定要删除'" + pname + "'吗?");
		$dom.find("#modal_delproduct").modal("show");
		$dom.find("input[name = pid]").val(id);
	});
	$dom.on("click", "button[action = add]", function() {
		$dom.find("#form_add_productinfo").initData();
		var element = document.getElementById('photosadd');
		element.src = "../resources/app/images/nophoto.png";
		$dom.find("#modal_add_product").modal("show");

	});

	$dom.on("click", "button[action = ensuredel]", function() {

		var id = $dom.find("input[name = pid]").val();
		$serviceProvider.delProduct(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功删除该产品");
				$dom.find("#modal_delproduct").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	var options = {
		container: $dom.find("#form_load2"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=product",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = image]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	var optionsadd = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=product",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photosadd").attr("src", res.result);
			$dom.find("input[name = imageadd]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	$dom.find("#photos").ajaxUpload(options);
	$dom.find("#photosadd").ajaxUpload(optionsadd);
}

$controller.cardmanage = $controller.cardmanage || {};
$controller.cardmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getCardList($dom.find("#form_card"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_card").html($dom.find("#tmpl_card").tmpl(res.result));
				$dom.find("#table_pagination").html($dom.find("#tmpl_pagination").tmpl(res.pagination))
			} else {
				$.simplyToast.error(res.message);
			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//页码
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//详情按钮
	$dom.on("click", "button[action = btn_detail]", function() {
		var id = $(this).parent().data("cardid");

		$serviceProvider.getCardInfo(id, function(res) {
			if(res.code == 0) {
				var cardBean = res.result;
				var img = cardBean.cardImg;
				var bankCode = cardBean.bankCode;
				var gradeCode = cardBean.gradeCode;
				$dom.find("#form_card_info").initData(cardBean);
				$dom.find("#form_card_info").setValue("bank", bankCode);
				$dom.find("#form_card_info").setValue("cardgrade", gradeCode);
				$dom.find("#form_card_info").find("#photo").attr("src", img);
			} else {
				$.simplyToast.error(res.message);
			}

		});
		$dom.find("#modal_card_info").modal("show");
	});
	//编辑按钮
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("cardid");

		$serviceProvider.getCardInfo(id, function(res) {
			if(res.code == 0) {
				var cardBean = res.result;
				var img = cardBean.cardImg;
				var bankCode = cardBean.bankCode;
				var gradeCode = cardBean.gradeCode;
				$dom.find("input[name = cardImg]").val(img);
				$dom.find("#form_edit_card_info").initData(cardBean);
				$dom.find("#form_edit_card_info").setValue("bank", bankCode);
				$dom.find("#form_edit_card_info").setValue("cardgrade", gradeCode);
				$dom.find("#form_edit_card_info").find("#photos").attr("src", img);
			} else {
				$.simplyToast.error(res.message);
			}

		});
		$dom.find("#modal_edit_card_info").modal("show");
	});
	//添加按钮
	$dom.on("click", "button[action = add]", function() {
		$dom.find("#form_add_card_info").initData();
		var element = document.getElementById('photosadd');
		element.src = "../resources/app/images/nophoto.png";
		$dom.find("#modal_add_card_info").modal("show");
	});
	//保存新添卡片信息form_add_card_info
	$dom.on("click", "button[action = add_card]", function() {
		var img = $dom.find("input[name = addcardImg]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不允许为空！");
			return;
		}
		$serviceProvider.addCard($dom.find("#form_add_card_info"), img, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功添加产品");
				$dom.find("#modal_add_card_info").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//保存编辑卡片信息
	$dom.on("click", "button[action = save_cardinfo]", function() {
		$serviceProvider.uploadCardInfo($dom.find("#form_edit_card_info"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_edit_card_info").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});

	//更改卡片可用状态
	$dom.on("click", "button[action = btn_status]", function() {
		var id = $(this).parent().data("cardid");
		$serviceProvider.changeCardStatus(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//更改卡片推荐状态
	$dom.on("click", "button[action = btn_recommend]", function() {
		var id = $(this).parent().data("cardid");
		$serviceProvider.changeCardRecommend(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//删除信用卡按钮
	$dom.on("click", "button[action = btn_del]", function() {
		var id = $(this).parent().data("cardid");
		var name = $(this).parent().data("cardname");
		$dom.find("#form_notice").find("label[name = notice]").text("确定要删除'" + name + "'吗?");
		$dom.find("#modal_delcard").modal("show");
		$dom.find("input[name = cid]").val(id);
	});

	//确定删除信用卡按钮
	$dom.on("click", "button[action = ensuredel]", function() {
		var id = $dom.find("input[name = cid]").val();
		$serviceProvider.delCard(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_delcard").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = cardImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	var optionadd = {
		container: $dom.find("#form_load2"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photosadd").attr("src", res.result);
			$dom.find("input[name = addcardImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	$dom.find("#photos").ajaxUpload(options);
	$dom.find("#photosadd").ajaxUpload(optionadd);
}

$controller.requirementmanage = $controller.requirementmanage || {};
$controller.requirementmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getRequirementList($dom.find("#form_user"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//导出
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportLoan");
	});
	//页码
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//拒绝放款按钮
	$dom.on("click", "button[action = btn_refuse]", function() {
		$dom.find("#modal_refuse").modal("show");
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
	});
	//删除按钮
	$dom.on("click", "button[action = btn_del]", function() {
		$dom.find("#modal_del").modal("show");
		var id = $(this).parent().data("demandid");
		$dom.find("#modal_del").find("input[name=demandID]").val(id);
	});
	//确定删除
	$dom.on("click", "button[name = ensure_del]", function() {
		var id = $dom.find("#modal_del").find("input[name = demandID]").val();
		$serviceProvider.delRequirement(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_del").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseRequirement(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//放款按钮
	$dom.on("click", "button[action = btn_agree]", function() {
		$dom.find("#modal_agree").modal("show");
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoan(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}
$controller.loanhistory = $controller.loanhistory || {};
$controller.loanhistory.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanHistoryList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_loanhistory").html($("#tmpl_loanhistory").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportLoanHistory");
	});
	//删除按钮
	$dom.on("click", "button[action = btn_del]", function() {
		var historyID = $(this).parent().data("historyid");
		$dom.find("input[name = historyID]").val(historyID);
		$dom.find("#modal_del").modal("show");
	});
	$dom.on("click", "button[name = ensuredel]", function() {
		var historyID = $dom.find("input[name = historyID]").val();
		$serviceProvider.delHistory(historyID, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_del").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.Message);
			}
		});
	});
}

$controller.cardhistory = $controller.cardhistory || {};
$controller.cardhistory.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getCardHistory($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_cardhistory").html($("#tmpl_cardhistory").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportCard");
	});
	$dom.on("click", "button[action = btn_del]", function() {
		var historyID = $(this).parent().data("cardhistoryid");
		$dom.find("input[name = cardhistoryID]").val(historyID);
		$dom.find("#modal_del").modal("show");
	});
	$dom.on("click", "button[name = ensuredel]", function() {
		var historyID = $dom.find("input[name = cardhistoryID]").val();
		$serviceProvider.delCardHistory(historyID, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_del").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.Message);
			}
		});
	});
}

$controller.administrator = $controller.administrator || {};
$controller.administrator.init = function($dom) {
	initData();
	getAllFunc();

	function initData() {
		$serviceProvider.getManagerList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_admin").html($("#tmpl_admin").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//新增管理员
	$dom.find("button[action=add]").click(function() {

		$dom.find("#form_edit_admin_info").initData();
		$dom.find("#modal_add_admin").modal("show");
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//确定新增管理员

	$dom.find("button[action=add_admin]").click(function() {
		var userName = $dom.find("#form_edit_admin_info").find("input[name = userName]").val();
		var name = $dom.find("#form_edit_admin_info").find("input[name = name]").val();
		var password = $dom.find("#form_edit_admin_info").find("input[name = password]").val();
		var password1 = $dom.find("#form_edit_admin_info").find("input[name = password1]").val();
		if(!userName.match(/^[a-zA-Z0-9_]{6,13}$/)) {
			$.simplyToast.error("管理员账号为数字和英文且长度为6-13位");
			return;
		}

		if(isNull(userName)) {
			$.simplyToast.error("账号不能为空");
			return;
		}
		if(isNull(name)) {
			$.simplyToast.error("管理员名称不能为空");
			return;
		}
		if(isNull(password)) {
			$.simplyToast.error("密码不能为空");
			return;
		}
		if(!password.match(/^[a-zA-Z0-9_]{6,13}$/)) {
			$.simplyToast.error("密码长度为6-13位");
			return;
		}
		if(isNull(password1)) {
			$.simplyToast.error("密码不能为空");
			return;
		}
		if(password != password1) {
			$.simplyToast.error("两次密码不一致");
			return;
		}
		$serviceProvider.addAdmin($dom.find("#form_edit_admin_info"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功添加管理员账号");
				$dom.find("#modal_add_admin").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//管理员编辑
	$dom.on("click", "button[action = btn_edit]", function() {
		var adminID = $(this).parent().data("adminid");
		$dom.find("#modal_edit_admin_info").modal("show");
		$serviceProvider.getAdminInfo(adminID, function(res) {
			if(res.code == 0) {
				$dom.find("#form_admin_info").initData(res.result);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//确定编辑
	$dom.on("click", "button[action = ensure_edit]", function() {
		var userid = $dom.find("input[name = userId]").val();
		var name = $dom.find("input[name = name]").val();
		var password = $dom.find("input[name = password]").val();
		var password1 = $dom.find("input[name = password1]").val();
		if(isNull(name)) {
			$.simplyToast.error("管理员名称不能为空");
			return;
		}
		if(password != password1) {
			$.simplyToast.error("两次密码不一致");
			return;
		}
		$serviceProvider.editAdmin($dom.find("#form_admin_info"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功修改管理员信息");
				$dom.find("#modal_edit_admin_info").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//变更管理员状态
	$dom.on("click", "button[action = btn_status]", function() {
		var adminID = $(this).parent().data("adminid");
		$serviceProvider.changeAdminStatus(adminID, function(res) {
			if(res.code == 0) {
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//删除管理员用户
	$dom.on("click", "button[action = btn_del]", function() {
		var adminID = $(this).parent().data("adminid");
		$dom.find("#modal_deladmin").modal("show");
		$dom.find("input[name = aid]").val(adminID);
	});
	//确定删除管理员用户
	$dom.on("click", "button[action = ensuredel]", function() {
		var adminID = $dom.find("input[name = aid]").val();
		$serviceProvider.delAdmin(adminID, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功删除该管理员");
				$dom.find("#modal_deladmin").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//编辑用户功能
	$dom.on("click", "button[action = btn_authority]", function() {
		var adminID = $(this).parent().data("adminid");
		$dom.find("#modal_edit_func").modal("show");
		$serviceProvider.getAdminFunc(adminID, function(res) {
			if(res.code == 0) {
				//				$dom.find("input[name = name]").val(res.result.name);
				var result = res.result;
				$dom.find("#form_admin_func").initData(result);
				$dom.find("#modal_edit_func").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//保存编辑用户功能
	$dom.on("click", "button[action=save_func]", function() {
		$serviceProvider.saveFunction($dom.find("#form_admin_func"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_edit_func").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});

	function getAllFunc() {
		$serviceProvider.getAllFunc(function(res) {
			if(res.code == 0) {
				$dom.find("#tree_area").html($dom.find("#tmpl_area").tmpl(res.result.codeBeans));
				$dom.find("#tree_func").html($dom.find("#tmpl_func").tmpl(res.result.menuTree));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	}
}
$controller.banners = $controller.banners || {};
$controller.banners.init = function($dom) {
	initData();

	var editor;
	editor = KindEditor.create("#contents", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});
	var editor2;
	editor2 = KindEditor.create("#econtents", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});

	function initData() {
		$serviceProvider.getBannerList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_banner").html($("#tmpl_banner").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//添加
	$dom.find("button[action=add]").click(function() {
		$dom.find("#form_add_banner").initData();
		editor.html("");
		var element = document.getElementById('photos');
		element.src = "../resources/app/images/nophoto.png";
		$dom.find("#modal_add_banner").modal("show");
	});
	//确认添加
	$dom.find("button[action=add_banner]").click(function() {
		var img = $dom.find("input[name = addbannerImg]").val();
		var title = $dom.find("input[name = title]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不能为空");
			return;
		}
		if(isNull(title)) {
			$.simplyToast.error("标题不能为空");
			return;
		}
		editor.sync();
		$serviceProvider.addBannerImg($dom.find("#form_add_banner"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功添加首页轮播图");
				$dom.find("#modal_add_banner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//编辑
	$dom.on("click", "button[action = edit]", function() {
		var id = $(this).parent().data("id");
		$dom.find("input[name = bannerId]").val(id);
		$dom.find("#form_edit_banner").find("input[name = url]").val("");
		$serviceProvider.getBannerInfo(id, function(res) {
			if(res.code == 0) {
				var bannerBean = res.result;
				$dom.find("#form_edit_banner").find("#provinceCode").val(bannerBean.provinceCode);
				$dom.find("#form_edit_banner").find("#cityCode").val(bannerBean.type);
				$dom.find("#form_edit_banner").find("input[name = eaddbannerImg]").val(bannerBean.image);
				$dom.find("#form_edit_banner").find("input[name = etitle]").val(bannerBean.title);
				$dom.find("#form_edit_banner").find("input[name = productId]").val(bannerBean.productId);
				$dom.find("#form_edit_banner").find("#ephotos").attr("src", bannerBean.image);
				$dom.find("#econtents").val(bannerBean.content);
				editor2.html(bannerBean.content);
				$dom.find("#modal_edit_banner").modal("show");
				$dom.find("#previewUrl").val(bannerBean.webUrl);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//预览
	$dom.on("click", "button[action = preview]", function() {
		window.open($("#previewUrl").val());
	});
	//保存编辑
	$dom.find("button[action=save_banner]").click(function() {
		var img = $dom.find("input[name = eaddbannerImg]").val();
		var title = $dom.find("input[name = etitle]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不能为空");
			return;
		}
		if(isNull(title)) {
			$.simplyToast.error("标题不能为空");
			return;
		}
		editor2.sync();
		$serviceProvider.updateBanner($dom.find("#form_edit_banner"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功保存轮播图");
				$dom.find("#modal_edit_banner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//删除
	$dom.on("click", "button[action = del]", function() {
		var id = $(this).parent().data("id");
		$dom.find("input[name = cid]").val(id);
		$dom.find("#modal_delbanner").modal("show");
	});
	//确定删除
	$dom.find("button[action=ensuredel]").click(function() {
		var id = $dom.find("input[name = cid]").val();
		$serviceProvider.delBanner(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("删除成功");
				$dom.find("#modal_delbanner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = addbannerImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	var eoptions = {
		container: $dom.find("#eform_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#ephotos").attr("src", res.result);
			$dom.find("input[name = eaddbannerImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	//选择省份联动市
	function changeCity(id1, id2, id3) {
		$dom.find("#form_add_banner").setValue("provinceCode", id1);

		$serviceProvider.getCity(id1, 3, function(res) {
			if(res.result != null) {
				$dom.find("#form_add_banner").getField("cityCode").initSelect(res.result);
				$dom.find("#form_add_banner").setValue("cityCode", id2);
				//changeDistrict(id2, id3);
			}
		});
	};

	function changeCity1(id1, id2, id3) {
		$dom.find("#form_edit_banner").setValue("provinceCode", id1);

		$serviceProvider.getCity(id1, 3, function(res) {
			if(res.result != null) {
				$dom.find("#form_edit_banner").getField("cityCode").initSelect(res.result);
				$dom.find("#form_edit_banner").setValue("cityCode", id2);
				//changeDistrict(id2, id3);
			}
		});
	};
	//	//选择市联动区
	//	function changeDistrict(id2, id3) {
	//		$serviceProvider.getDistrict(id2, function(res) {
	//			if(res.result != null) {
	//				$dom.find("#form_add_banner").getField("districtCode").initSelect(res.result);
	//				$dom.find("#form_add_banner").setValue("districtCode", id3);
	//			}
	//		});
	//	};
	//选择省份联动市
	$dom.on("change", "select[name=provinceCode]", function() {
		var id1 = $(this).val();
		changeCity(id1, 0, 0);

	});
	$dom.on("change", "#provinceCode", function() {
		var id1 = $(this).val();
		changeCity1(id1, 0, 0);

	});
	//	//选择市联动区
	//	$dom.on("change", "select[name=cityCode]", function() {
	//		var id = $(this).val();
	//		changeDistrict(id, 0);
	//	});
	$dom.find("#photos").ajaxUpload(options);
	$dom.find("#ephotos").ajaxUpload(eoptions);
}
$controller.bankbanners = $controller.bankbanners || {};
$controller.bankbanners.init = function($dom) {
	initData();

	var editor;
	editor = KindEditor.create("#contents", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});
	var editor2;
	editor2 = KindEditor.create("#econtents", {
		uploadJson: appConfig.contextPath + "/kindupload",
		resizeType: 1
	});

	function initData() {
		$serviceProvider.getBankBannerList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_banner").html($("#tmpl_banner").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//添加
	$dom.find("button[action=add]").click(function() {
		$dom.find("#form_add_banner").initData();
		editor.html("");
		var element = document.getElementById('photos');
		element.src = "../resources/app/images/nophoto.png";
		$dom.find("#modal_add_banner").modal("show");
	});
	//确认添加
	$dom.find("button[action=add_banner]").click(function() {
		var img = $dom.find("input[name = addbannerImg]").val();
		var title = $dom.find("input[name = title]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不能为空");
			return;
		}
		if(isNull(title)) {
			$.simplyToast.error("标题不能为空");
			return;
		}
		editor.sync();
		$serviceProvider.addBankBannerImg($dom.find("#form_add_banner"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功添加银行页轮播图");
				$dom.find("#modal_add_banner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//编辑
	$dom.on("click", "button[action = edit]", function() {
		var id = $(this).parent().data("id");
		$dom.find("input[name = bannerId]").val(id);
		$serviceProvider.getBankBannerInfo(id, function(res) {
			if(res.code == 0) {
				var bannerBean = res.result;
				$dom.find("#form_edit_banner").find("input[name = eaddbannerImg]").val(bannerBean.image);
				$dom.find("#form_edit_banner").find("input[name = etitle]").val(bannerBean.title);
				$dom.find("#form_edit_banner").find("#ephotos").attr("src", bannerBean.image);
				$dom.find("#econtents").val(bannerBean.content);
				editor2.html(bannerBean.content);
				$dom.find("#modal_edit_banner").modal("show");
				$dom.find("#previewUrl").val(bannerBean.webUrl);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//预览
	$dom.on("click", "button[action = preview]", function() {
		window.open($("#previewUrl").val());
	});
	//保存编辑
	$dom.find("button[action=save_banner]").click(function() {
		var img = $dom.find("input[name = eaddbannerImg]").val();
		var title = $dom.find("input[name = etitle]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不能为空");
			return;
		}
		if(isNull(title)) {
			$.simplyToast.error("标题不能为空");
			return;
		}
		editor2.sync();
		$serviceProvider.updateBankBanner($dom.find("#form_edit_banner"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功保存轮播图");
				$dom.find("#modal_edit_banner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//删除
	$dom.on("click", "button[action = del]", function() {
		var id = $(this).parent().data("id");
		$dom.find("input[name = cid]").val(id);
		$dom.find("#modal_delbanner").modal("show");
	});
	//确定删除
	$dom.find("button[action=ensuredel]").click(function() {
		var id = $dom.find("input[name = cid]").val();
		$serviceProvider.delBankBanner(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("删除成功");
				$dom.find("#modal_delbanner").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = addbannerImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	var eoptions = {
		container: $dom.find("#eform_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=creditcard",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#ephotos").attr("src", res.result);
			$dom.find("input[name = eaddbannerImg]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	$dom.find("#photos").ajaxUpload(options);
	$dom.find("#ephotos").ajaxUpload(eoptions);
}

$controller.platformmanage = $controller.platformmanage || {};
$controller.platformmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getPlatformList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_platform").html($("#tmpl_platform").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//编辑
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("platformid");
		var name = $(this).parent().data("name");
		$dom.find("input[name = id]").val(id);
		$dom.find("input[name = name]").val(name);
		$dom.find("input[name = sign]").val("edit");
		$dom.find("#modal_platform").modal("show");
	});
	//新增
	$dom.on("click", "button[action = add]", function() {
		$dom.find("#form_platform").initData();
		$dom.find("input[name = sign]").val("add");
		$dom.find("#modal_platform").modal("show");
	});

	//保存 确认新增
	$dom.on("click", "button[action = save_platform]", function() {
		var sign = $dom.find("input[name = sign]").val();
		var id = $dom.find("input[name = id]").val();
		if(isNull($dom.find("input[name = name]").val())) {
			$.simplyToast.error("平台名不能为空");
		}
		if(sign == "edit") {
			$serviceProvider.savePlatform($dom.find("#form_platform"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("保存成功");
					$dom.find("#modal_platform").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
		if(sign == "add") {
			$serviceProvider.addPlatform($dom.find("#form_platform"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("添加成功");
					$dom.find("#modal_platform").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});

	//停用/启用
	$dom.on("click", "button[action = btn_disable]", function() {
		var id = $(this).parent().data("platformid");
		$serviceProvider.changePlatformStatus(id, function(res) {
			if(res.code == 0) {
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//删除
	$dom.on("click", "button[action = btn_del]", function() {
		var id = $(this).parent().data("platformid");
		var name = $(this).parent().data("name");
		$dom.find("input[name = platformname]").val(name);
		$dom.find("input[name = pid]").val(id);
		$dom.find("label[name = notice]").text("确定要删除" + name + "吗?");
		$dom.find("#modal_delplatform").modal("show");

	});
	//确定删除
	$dom.on("click", "button[action = ensuredel]", function() {
		var id = $dom.find("input[name = pid]").val();
		var name = $dom.find("input[name = platformname]").val();
		$serviceProvider.delPlatform(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功删除   " + name);
				$dom.find("#modal_delplatform").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
}

$controller.newsmanage = $controller.newsmanage || {};
$controller.newsmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.queryNews($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_news").html($("#tmpl_news").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//编辑
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("newsid");
		var content = $(this).parent().data("content");
		$dom.find("input[name = id]").val(id);
		$dom.find("textarea[name = content]").val(content);
		$dom.find("input[name = sign]").val("edit");
		$dom.find("#modal_news").modal("show");
	});
	//新增
	$dom.on("click", "button[action = add]", function() {
		$dom.find("#form_news").initData();
		$dom.find("input[name = sign]").val("add");
		$dom.find("#modal_news").modal("show");
	});
	//保存 确认新增
	$dom.on("click", "button[action = save_news]", function() {
		var sign = $dom.find("input[name = sign]").val();
		var id = $dom.find("input[name = id]").val();
		if(isNull($dom.find("textarea[name = content]").val())) {
			$.simplyToast.error("内容不能为空");
			return;
		}
		if(sign == "edit") {
			$serviceProvider.saveNews($dom.find("#form_news"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("保存成功");
					$dom.find("#modal_news").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
		if(sign == "add") {
			$serviceProvider.addNews($dom.find("#form_news"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("添加成功");
					$dom.find("#modal_news").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
	//停用/启用
	$dom.on("click", "button[action = btn_disable]", function() {
		var id = $(this).parent().data("newsid");
		$serviceProvider.changeNewsStatus(id, function(res) {
			if(res.code == 0) {
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//删除
	$dom.on("click", "button[action = btn_del]", function() {
		var id = $(this).parent().data("newsid");
		$dom.find("input[name = pid]").val(id);
		$dom.find("#modal_delnews").modal("show");
	});
	//确定删除
	$dom.on("click", "button[action = ensuredel]", function() {
		var id = $dom.find("input[name = pid]").val();
		$serviceProvider.delNews(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功删除动态");
				$dom.find("#modal_delnews").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});

}
$controller.bankmanage = $controller.bankmanage || {};
$controller.bankmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.queryBank($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_bank").html($("#tmpl_bank").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//编辑
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("bankid");
		var img = $(this).parent().data("desc");
		var name = $(this).parent().data("name");
		$dom.find("input[name = img]").val(img);
		$dom.find("input[name = sign]").val("edit");
		$dom.find("input[name = bankID]").val(id);
		$dom.find("#form_bank").find("input[name = bankname]").val(name);
		if(!isNull(img)) {
			$dom.find("#form_bank").find("#photos").attr("src", img);
		} else {
			$dom.find("#form_bank").find("#photos").attr("src", "../resources/app/images/nophoto.png");
		}
		$dom.find("#modal_bank").modal("show");
	});
	//新增
	$dom.on("click", "button[action = add]", function() {
		$dom.find("#form_bank").initData();
		$dom.find("input[name = sign]").val("add");
		var element = document.getElementById('photos');
		element.src = "../resources/app/images/nophoto.png";
		$dom.find("#modal_bank").modal("show");
	});
	//保存 确认新增
	$dom.on("click", "button[action = save_bank]", function() {
		var sign = $dom.find("input[name = sign]").val();
		var id = $dom.find("input[name = bankID]").val();
		if(isNull($dom.find("#form_bank").find("input[name = bankname]").val())) {
			$.simplyToast.error("银行名不能为空");
			return;
		}
		if(isNull($dom.find("#form_bank").find("input[name = img]").val())) {
			$.simplyToast.error("银行图片不能为空");
			return;
		}
		if(sign == "edit") {
			$serviceProvider.saveBank($dom.find("#form_bank"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("保存成功");
					$dom.find("#modal_bank").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
		if(sign == "add") {
			$serviceProvider.addBank($dom.find("#form_bank"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success("添加成功");
					$dom.find("#modal_bank").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
	//推荐
	$dom.on("click", "button[action = btn_disable]", function() {
		var id = $(this).parent().data("bankid");
		$serviceProvider.bankRecommend(id, function(res) {
			if(res.code == 0) {
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//删除
	$dom.on("click", "button[action = btn_del]", function() {
		var id = $(this).parent().data("bankid");
		var name = $(this).parent().data("name");
		$dom.find("input[name = bid]").val(id);
		$dom.find("label[name = notice]").text("确定要删除" + name + "吗?");
		$dom.find("#modal_delbank").modal("show");
	});
	//确定删除
	$dom.on("click", "button[action = ensuredel]", function() {
		var id = $dom.find("input[name = bid]").val();
		$serviceProvider.delBank(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success("删除成功");
				initData();
				$dom.find("#modal_delbank").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});

	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=bank",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = img]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};

	$dom.find("#photos").ajaxUpload(options);

}
$controller.agentmanage = $controller.agentmanage || {};
$controller.agentmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getAgentList($dom.find("#form_search"), function(res) {
			if(res.url == "0") {
				$dom.find("#export").hide();
			}
			if(res.code == 0) {
				$dom.find("#table_agent").html($("#tmpl_agent").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportAgentList");
	});
	$dom.on("click", "button[action=user_detail]", function() {
		var id = $(this).parent().data("userid");
		$serviceProvider.userInfoDetail(id, function(res) {
			if(res.code == 0) {
				var userInfo = res.result;
				$dom.find("#form_user_info").initData(userInfo); /*  */
				$dom.find("#modal_user_info").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "button[action=del_user]", function() {
		var id = $(this).parent().data("userid");
		var name = $(this).parent().data("name");
		$dom.find("input[name=bid]").val(id);
		$dom.find("label[name=notice]").text("确定要将用户:'" + name + "'转为经纪人吗?");
		$dom.find("#modal_agent").modal("show");

	});
	$dom.on("click", "button[action=ensure]", function() {
		var id = $dom.find("input[name = bid]").val();
		$serviceProvider.agentStatus(id, function(res) {
			if(res.code == 0) {
				initData();
				$dom.find("#modal_agent").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
}

//工薪贷 贷款需求
$controller.rqloanwages = $controller.rqloanwages || {};
$controller.rqloanwages.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanWagesHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportLoanWages");
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanWagesRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanWagesRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}

//企业贷 贷款需求
$controller.rqcompanyloan = $controller.rqcompanyloan || {};
$controller.rqcompanyloan.init = function($dom) {
	$dom.find("button[action=export]").click(function() {
		window.open(appConfig.contextPath + "/exportLoanCompany");
	});
	initData();

	function initData() {
		$serviceProvider.getLoanCompanyHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanCompanyRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanCompanyRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}

//房抵贷 贷款需求
$controller.rqloanhouse = $controller.rqloanhouse || {};
$controller.rqloanhouse.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanHouseHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanHouseRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanHouseRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}

//车抵贷 贷款需求
$controller.rqloancar = $controller.rqloancar || {};
$controller.rqloancar.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanCarHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				if(res.url == "0") {
					$dom.find("#export").hide();
				}
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanCarRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanCarRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}

//垫资过桥需求
$controller.rqloanbridge = $controller.rqloanbridge || {};
$controller.rqloanbridge.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanBridgeHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanBridgeRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanBridgeRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});
}

//承兑汇票需求
$controller.rqloanbill = $controller.rqloanbill || {};
$controller.rqloanbill.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getLoanBillHistoryList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_requirement").html($("#tmpl_requirement").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//拒绝
	$dom.on("click", "button[action = btn_refuse]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_refuse").modal("show");
	});
	//放款
	$dom.on("click", "button[action = btn_agree]", function() {
		var id = $(this).parent().data("demandid");
		$dom.find("input[name=demandID]").val(id);
		$dom.find("#modal_agree").modal("show");
	});
	//确定拒绝放款
	$dom.on("click", "button[name = ensurerefuse]", function() {
		var id = $dom.find("input[name = demandID]").val();
		$serviceProvider.refuseLoanBillRQ(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.Message);
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplToast.error(res.message);
			}
		});
	});
	//确定放款
	$dom.on("click", "button[name = ensureLoan]", function() {
		var id = $dom.find("input[name = demandID]").val();
		var amount = $dom.find("input[name = amount]").val();
		if(amount == "") {
			alert("金额不能为空");
		} else {
			$serviceProvider.agreeLoanBillRQ(id, amount, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_agree").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}
	});

}
//订单管理
$controller.ordermanage = $controller.ordermanage || {};
$controller.ordermanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getOrder($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_ordermanage").html($("#tmpl_ordermanage").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});

}

$controller.agentlogin = $controller.agentlogin || {};
$controller.agentlogin.init = function($dom) {
	function isNull(param) {
		if(null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	$dom.on("click", "a.btn-login", function() {
		var username = $dom.find("input[name = userName]").val();
		var pwd = $dom.find("input[name = passWord]").val();
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

		if(!myreg.test(username)) {
			alert('请输入有效的手机号码!');
			return;
		}
		$serviceProvider.loginAndDownload(username, pwd, function(res) {
			if(res.code == 0) {
				window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=haolaidai.cloudcns.com.haolaidai_as";
			} else {
				alert(res.message);
			}
		});
	});

}
$controller.other_reg = $controller.other_reg || {};
$controller.other_reg.init = function($dom) {
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
}

$controller.agentreg = $controller.agentreg || {};
$controller.agentreg.init = function($dom) {
	initData();

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

	function initData() {
		var Request = new Object();
		Request = GetRequest();
		$dom.find("input[name = invitecode]").val(Request.invitecode);
	}

	function isNull(param) {
		if(null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	var countdown = 60;

	function settime(obj) {
		if(countdown == 0) {
			obj.attr("disabled", false);
			//		obj.button_disabled=false;
			obj.text("免费获取验证码").css("background-color", "#fbb200");
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
	$dom.on("click", "button[name=authcode]", function() {
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

		if(!myreg.test($dom.find("input[name = userName]").val())) {
			alert('请输入有效的手机号码!');
			return;
		}
		settime($dom.find("button[name=authcode]"))
		var username = $dom.find("input[name = userName]").val();
		$serviceProvider.sendAuthCode(username, function(res) {
			if(res.code == 0) {
				alert("发送验证码成功,请注意查收");
			} else {
				alert("发送失败");
			}
		});
	});
	$dom.on("click", "a.btn-reg", function() {
		var username = $dom.find("input[name = userName]").val();
		var pwd = $dom.find("input[name = passWord]").val();
		var cfmpwd = $dom.find("input[name = cfmPwd]").val();
		var code = $dom.find("input[name = smsCode]").val();
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;

		$dom.find("a.btn-reg").attr("disabled", true);
		$dom.find("a.btn-reg").css("background-color", "#ccc");
		if(!myreg.test(username)) {
			alert('请输入有效的手机号码!');
			$dom.find("a.btn-reg").attr("disabled", false);
			$dom.find("a.btn-reg").css("background-color", "#fbb200");
			return;
		}
		if(isNull(code)) {
			alert("验证码不能为空");
			$dom.find("a.btn-reg").attr("disabled", false);
			$dom.find("a.btn-reg").css("background-color", "#fbb200");
			return;
		}

		if(pwd.length < 8) {
			alert("密码长度为8到16位");
			$dom.find("a.btn-reg").attr("disabled", false);
			$dom.find("a.btn-reg").css("background-color", "#fbb200");
			return;
		}
		if(pwd != cfmpwd) {
			alert("两次密码不相同");
			$dom.find("a.btn-reg").attr("disabled", false);
			$dom.find("a.btn-reg").css("background-color", "#fbb200");
			return;
		}
		$serviceProvider.agentInviteReg($("#form_reginfo"), function(res) {
			if(res.code == 0) {
				window.location.href = appConfig.contextPath + "/mobile/reg_success.jsp";
			} else {
				alert(res.message);
				$dom.find("a.btn-reg").attr("disabled", false);
				$dom.find("a.btn-reg").css("background-color", "#fbb200");
			}

		});
	});
	$dom.on("click", "a.btn-download", function() {
		window.location.href = appConfig.contextPath + "/mobile/agent_login.jsp";
	});

}
$controller.wagesloan = $controller.wagesloan || {};
$controller.wagesloan.init = function($dom) {
	function isNull(param) {
		if(null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
	initData();

	function initData() {
		$serviceProvider.getWagesLoanList($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_product").html($("#tmpl_product").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//新增
	$dom.find("button[action=add]").click(function() {
		$dom.find("#modal_add_product").modal("show");
	});
	$dom.on("click", "button[action=save_addproductinfo]", function() {
		$serviceProvider.addWagesLoan($dom.find("#form_add_productinfo"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_add_product").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//编辑
	$dom.on("click", "button[action = btn_edit]", function() {
		var id = $(this).parent().data("productid");
		var img = $(this).parent().data("image");
		$serviceProvider.getWagesLoanDetail(id, function(res) {
			if(res.code == 0) {
				var detail = res.result;
				var provinceCode = detail.provinceCode;
				$dom.find("#form_productinfo").initData(detail);
				$dom.find("#form_productinfo").setValue("provinceCode", provinceCode);
				$dom.find("select[name=provinceCode]").trigger("chosen:updated");

			} else {
				$.simplyToast.error(res.message);
			}
		});
		$dom.find("input[name = image]").val(img);
		if(!isNull(img)) {
			$dom.find("#form_productinfo").find("#photos").attr("src", img);
		} else {
			$dom.find("#form_productinfo").find("#photos").attr("src", "../resources/app/images/nophoto.png");
		}
		$dom.find("#modal_product_info").modal("show");
	});
	$dom.on("click", "button[action=save_productinfo]", function() {
		$serviceProvider.saveWagesLoan($dom.find("#form_productinfo"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_product_info").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//删除
	$dom.on("click", "button[action=btn_del]", function() {
		var id = $(this).parent().data("productid");
		var productname = $(this).parent().data("productname");
		$dom.find("input[name=pid]").val(id);
		$dom.find("label[name=notice]").text("确定要删除产品:'" + productname + "'吗?");
		$dom.find("#modal_delproduct").modal("show");
	});
	//确定删除
	$dom.on("click", "button[action=ensuredel]", function() {
		var id = $dom.find("input[name=pid]").val();
		$serviceProvider.delWagesLoan(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success(res.message);
				$dom.find("#modal_delproduct").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});

	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=wagesloan",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("#modal_product_info").find("input[name = image]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	var optionadd = {
		container: $dom.find("#form_load_add"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=wagesloan",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photosadd").attr("src", res.result);
			$dom.find("#modal_add_product").find("input[name = image]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	$dom.find("#photos").ajaxUpload(options);
	$dom.find("#photosadd").ajaxUpload(optionadd);
}

$controller.adcooperation = $controller.adcooperation || {};
$controller.adcooperation.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getAdCooperationPic($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_banner").html($("#tmpl_banner").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	//编辑
	$dom.on("click", "button[action=edit]", function() {
		$dom.find("#editpic").modal("show");
	});
	//保存编辑
	$dom.find("button[action=save]").click(function() {
		var img = $dom.find("input[name = pic]").val();
		if(isNull(img)) {
			$.simplyToast.error("图片不能为空");
			return;
		}
		$serviceProvider.savePic($dom.find("#form_adcooperationpic"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success("成功保存轮播图");
				$dom.find("#editpic").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	var options = {
		container: $dom.find("#form_load"), //创建form的容器

		uploadUrl: appConfig.contextPath + "/upload?fileType=adcooperationpic",
		// "http://localhost:8080/haolaidai-service/upload?fileType=banner", //上传地址
		targetInput: null, //保存地址的控件
		targetImg: null, //展示图片
		success: function(res) {

			$dom.find("#photos").attr("src", res.result);
			$dom.find("input[name = pic]").val(res.result);

		},
		error: function() {
			$.simplyToast.error("上传图片失败");
		}
	};
	$dom.find("#photos").ajaxUpload(options);

	function isNull(param) {
		if("" != param.trim() && null != param && undefined != param) {
			return false;
		} else {
			return true;
		}
	}
}
$controller.agentcooper = $controller.agentcooper || {};
$controller.agentcooper.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getAgentCooper($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_agentcooper").html($("#tmpl_agentcooper").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});

}

$controller.adcooper = $controller.adcooper || {};
$controller.adcooper.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getAdCooper($dom.find("#form_search"), function(res) {

			if(res.code == 0) {
				$dom.find("#table_ad").html($("#tmpl_ad").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//推荐
	$dom.on("click", "button[action=Recommend]", function() {
		var id = $(this).parent().data("userid");
		$dom.find("input[name = userId]").val(id);
		var type = $(this).parent().data("type");
		$dom.find("#form_edit_user").find("input[name = cooperType]").val(type);
		$serviceProvider.checkAdCooperStatus(id, type, function(res) {
			if(res.code == 1) {
				alert("该用户目前不是广告位合作人");
			}
			if(res.code == 0) {
				$dom.find("#modal_user_info").modal("show");
			}
			if(res.code != 0 && res.code != 1) {
				$.simplyToast.error(res.message);
			}

		});
	});
	//推荐详情
	$dom.on("click", "button[action=detail]", function() {
		$dom.find("#modal_detail").modal("show");
		var id = $(this).parent().data("userid");

		$dom.find("#modal_detail").find("input[name = parentuserId]").val(id);
		var type = $(this).parent().data("type");
		$dom.find("#modal_detail").find("input[name = type]").val(type);
		$serviceProvider.getRecommendList(id, type, function(res) {

			if(res.code == 0) {
				$dom.find("#table_adcooper").html($("#tmpl_adcooper").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//工薪贷
	$dom.on("click", "button[action=auto_detail_wages]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdWagesUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//企业贷
	$dom.on("click", "button[action=auto_detail_company]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdCompanyUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//房抵贷
	$dom.on("click", "button[action=auto_detail_house]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdHouseUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//车抵贷
	$dom.on("click", "button[action=auto_detail_car]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdCarUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//垫资过桥
	$dom.on("click", "button[action=auto_detail_bridge]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdBridgeUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//承兑汇票
	$dom.on("click", "button[action=auto_detail_bill]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdBillUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//短期贷
	$dom.on("click", "button[action=auto_detail_short]", function() {
		$dom.find("#modal_detail_wages").modal("show");
		var id = $(this).parent().data("userid");
		$dom.find("#modal_detail_wages").find("input[name = aduserId]").val(id);
		$serviceProvider.getAdShortUser(id, function(res) {

			if(res.code == 0) {
				$dom.find("#table_wages").html($("#tmpl_wages").tmpl(res.result));

			} else {
				$.simplyToast.error(res.message);

			}
		});

	});
	//删除推荐人推荐详情
	$dom.on("click", "button[action=del]", function() {
		$dom.find("#modal_detail").modal("show");
		var id = $(this).parent().data("recommendid");
		var type = $dom.find("#modal_detail").find("input[name = type]").val();
		$serviceProvider.delRecommendUser(id, function(res) {
			if(res.code == 0) {
				$serviceProvider.getRecommendList($dom.find("input[name = parentuserId]").val(), type, function(res) {

					if(res.code == 0) {
						$dom.find("#table_adcooper").html($("#tmpl_adcooper").tmpl(res.result));

					} else {
						$.simplyToast.error(res.message);

					}
				});

			} else {
				$.simplyToast.error(res.message);

			}
		});
	});
	//保存 编辑
	$dom.on("click", "button[action = btn_save_user]", function() {
		var name = $dom.find("input[name = username]").val();
		var idNumber = $dom.find("input[name = idNumber]").val();
		var phone = $dom.find("input[name = userphone]").val();
		var provinceCode = $dom.find("select[name = provinceCode]").val();
		var cityCode = $dom.find("select[name = cityCode]").val();
		var districtCode = $dom.find("select[name = districtCode]").val();
		var detailAddress = $dom.find("input[name = detailAddress]").val();
		if(name == "" || idNumber == "" || phone == "" || provinceCode == "" || cityCode == "" || districtCode == "" || detailAddress == "") {
			alert("请填写完整之后保存");
		} else {
			$serviceProvider.saveRecommendUser($dom.find("#form_edit_user"), function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.Message);
					$dom.find("#modal_user_info").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		}

	});

	//选择省份联动市
	function changeCity(id1, id2, id3) {
		$dom.find("#form_edit_user").setValue("provinceCode", id1);

		$serviceProvider.getCity(id1, 3, function(res) {
			if(res.result != null) {
				$dom.find("#form_edit_user").getField("cityCode").initSelect(res.result);
				$dom.find("#form_edit_user").setValue("cityCode", id2);
				changeDistrict(id2, id3);
			}
		});
	};
	//选择市联动区
	function changeDistrict(id2, id3) {
		$serviceProvider.getDistrict(id2, function(res) {
			if(res.result != null) {
				$dom.find("#form_edit_user").getField("districtCode").initSelect(res.result);
				$dom.find("#form_edit_user").setValue("districtCode", id3);
			}
		});
	};
	//选择省份联动市
	$dom.on("change", "select[name=provinceCode]", function() {
		var id1 = $(this).val();
		changeCity(id1, 0, 0);

	});
	//选择市联动区
	$dom.on("change", "select[name=cityCode]", function() {
		var id = $(this).val();
		changeDistrict(id, 0);
	});

}
$controller.recommendchange = $controller.recommendchange || {};
$controller.recommendchange.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getChangeRequest($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_ad").html($("#tmpl_ad").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	};
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//查看提交的图片
	$dom.on("click", "button[action=img]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.getReasonImg(id, function(res) {
			if(res.code == 0) {
				var userInfo = res.result;
				$dom.find("#form_image").find("#div_img").html($("#tmpl_img").tmpl(userInfo));
				$dom.find("#modal_image").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//置换
	$dom.on("click", "button[action=recommendInfo]", function() {
		var id = $(this).parent().data("recommendid");
		var type = $(this).parent().data("type");
		var request = $(this).parent().data("id");
		$serviceProvider.getVWChangeRequest(id, function(res) {
			if(res.code == 0) {
				var result = res.result;
				$dom.find("#form_change").initData(result);
				$dom.find("#modal_change").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});

	});
	//置换
	$dom.on("click", "button[action=change]", function() {
		var id = $(this).parent().data("recommendid");
		var type = $(this).parent().data("type");
		var request = $(this).parent().data("id");
		$serviceProvider.changeRecommend(id, function(res) {
			if(res.code == 0) {
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
		//		$dom.find("#form_change").find("input[name = recommendId]").val(id);
		//		$dom.find("#form_change").find("input[name = cooperType]").val(type);
		//		$dom.find("#form_change").find("input[name = requestId]").val(request);
		//		$dom.find("#modal_change").modal("show");
	});
	//保存交换的用户信息
	$dom.on("click", "button[action=btn_save]", function() {

		$serviceProvider.saveChange($dom.find("#form_change"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_change").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//拒绝替换
	$dom.on("click", "button[action=refuse]", function() {
		var id = $(this).parent().data("recommendid");
		$dom.find("#form_refuse").find("input[name = recommendId]").val(id);

		$dom.find("#modal_refuse").modal("show");
	});
	//确定拒绝替换
	$dom.on("click", "button[action=ensurerefuse]", function() {
		var id = $dom.find("#form_refuse").find("input[name = recommendId]").val();
		$serviceProvider.changeRefuse(id, function(res) {
			if(res.code == 0) {
				$dom.find("#modal_refuse").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//选择省份联动市
	function changeCity(id1, id2, id3) {
		$dom.find("#form_change").setValue("provinceCode", id1);

		$serviceProvider.getCity(id1, 3, function(res) {
			if(res.result != null) {
				$dom.find("#form_change").getField("cityCode").initSelect(res.result);
				$dom.find("#form_change").setValue("cityCode", id2);
				changeDistrict(id2, id3);
			}
		});
	};

	//选择市联动区
	function changeDistrict(id2, id3) {
		$serviceProvider.getDistrict(id2, function(res) {
			if(res.result != null) {
				$dom.find("#form_change").getField("districtCode").initSelect(res.result);
				$dom.find("#form_change").setValue("districtCode", id3);
			}
		});
	};
	//选择省份联动市
	$dom.on("change", "select[name=provinceCode]", function() {
		var id1 = $(this).val();
		changeCity(id1, 0, 0);

	});
	//选择市联动区
	$dom.on("change", "select[name=cityCode]", function() {
		var id = $(this).val();
		changeDistrict(id, 0);
	});
}

$controller.withdrawalsapply = $controller.withdrawalsapply || {};
$controller.withdrawalsapply.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getWithdrawalsList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_withdrawals").html($("#tmpl_withdrawals").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//搜索
	$dom.find("button[action=search]").click(function() {
		$dom.find("input[name=page]").val(1);
		initData();
	});
	//显示提交转账单号页面
	$dom.on("click", "button[action=update]", function() {
		var id = $(this).parent().data("id");
		$dom.find("input[name = cid]").val(id);
		$dom.find("#modal_voucher").modal("show");
	});
	//提交转账单号
	$dom.on("click", "button[action=ensureupdate]", function() {
		$serviceProvider.uploadVoucherAction($dom.find("#form_voucher"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_voucher").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});

}
$controller.noticemanage = $controller.noticemanage || {};
$controller.noticemanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getNoticeList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_news").html($("#tmpl_news").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
		//新增通知
		$dom.on("click", "button[action=add]", function() {
			$dom.find("#modal_add_notice").modal("show");
		});
		$dom.on("click", "button[action=save_news]", function() {
			$serviceProvider.addNotice($dom.find("#form_news"), function(res) {
				if(res.code == 0) {
					$dom.find("#modal_add_notice").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		});
		$dom.on("click", "li[data-page]", function() {
			$dom.find("input[name=page]").val($(this).data("page"));
			initData();
		});
		//编辑
		$dom.on("click", "button[action=btn_edit]", function() {
			var id = $(this).parent().data("newsid");
			$dom.find("#form_edit_notice").find("input[name = id]").val(id);
			$serviceProvider.getNoticeBean(id, function(res) {
				if(res.code == 0) {
					$dom.find("#form_edit_notice").initData(res.result);
					$dom.find("#modal_edit_notice").modal("show");
				} else {
					$.simplyToast.error(res.message);
				}
			});
		});
		//编辑
		$dom.on("click", "button[action=btn_save]", function() {
			var id = $(this).parent().data("newsid");
			$dom.find("#form_edit_notice").find("input[name = id]").val();
			$serviceProvider.saveNoticeBean($dom.find("#form_edit_notice"), function(res) {
				if(res.code == 0) {
					$dom.find("#form_edit_notice").initData(res.result);
					$dom.find("#modal_edit_notice").modal("hide");
				} else {
					$.simplyToast.error(res.message);
				}
			});
		});
		//删除
		$dom.on("click", "button[action=btn_del]", function() {
			var id = $(this).parent().data("newsid");
			$dom.find("#form_del_notice").find("input[name = id]").val(id);
			$dom.find("#modal_del").modal("show");
		});
		//发送短信1
		$dom.on("click", "button[action=sendmessage1]", function() {

			$dom.find("#modal_message1").modal("show");
		});

		//确定删除
		$dom.on("click", "button[action=ensuredel]", function() {

			var id = $dom.find("#form_del_notice").find("input[name = id]").val();
			$serviceProvider.delNoticeBean(id, function(res) {
				if(res.code == 0) {
					$dom.find("#modal_del").modal("hide");
					initData();
				} else {
					$.simplyToast.error(res.message);
				}
			});
		});
	};
}
$controller.adchannel = $controller.adchannel || {};
$controller.adchannel.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getChannelList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_news").html($("#tmpl_news").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		console.log(1)
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	$dom.on("click", "button[action = search]", function() {
		initData();
	});
	$dom.on("click", "button[action=add]", function() {
		$dom.find("#modal_edit_admin_info").modal("show");
		$dom.find("#form_admin_info").initData();
	});

	//折扣、单价
	$dom.on("click", "button[action=discount]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_discount input[name='id']").val(id);
		$serviceProvider.discount(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_discount").initData(res.result);
				$dom.find("#modal_discount").modal("show");
			} else {
				$.simplyToast.error();
			}
		})
	});
	//折扣、单价保存
	$dom.on("click", "button[action=discount_save]", function() {
		$serviceProvider.saveDiscount($dom.find("#form_discount"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_discount").modal("hide");
				initData();
				$.simplyToast.success();
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});
	//开通后台
	$dom.on("click", "button[action=open]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_platform").initData();
		$dom.find("#form_platform input[name='id']").val(id);
		$dom.find("#modal_platform").modal("show");
	});
	//编辑开通后台信息
	$dom.on("click", "button[action=edit]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_platform input[name='id']").val(id);
		$serviceProvider.platformInfo(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_platform input[name='account']").val(res.result.userName);
				$dom.find("#form_platform input[name='pwd']").val("******");
				$dom.find("#modal_platform").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});

	//后台信息保存
	$dom.on("click", "button[action=platform_save]", function() {
		var $pwd = $dom.find("#form_platform input[name='pwd']");
		var password = $dom.find("#form_platform input[name='password']").val();
		if($pwd.val() != "******") {
			$dom.find("#form_platform input[name='password']").val($pwd.val());
		} else {
			$dom.find("#form_platform input[name='password']").val(password);
		}
		$serviceProvider.save_platform($dom.find("#form_platform"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_platform").modal("hide");
				initData();
				$.simplyToast.success(res.message);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//停用
	$dom.on("click", "button[action=stop]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.stopPlatform(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success();
				initData();
			} else {
				$.simplyToast.error();
			}
		})
	});
	//启用
	$dom.on("click", "button[action=start]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.startPlatform(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success();
				initData();
			} else {
				$.simplyToast.error();
			}
		})
	});

	$dom.on("click", "button[action=del]", function() {
		var id = $(this).parent().data("id");
		if(!confirm("确认删除该申请渠道?")) {
			return;
		}
		$serviceProvider.busimessDel(id, function(res) {

			if(res.code == 0) {
				$.simplyToast.success(res.message);
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});
	//新增合作伙伴保存
	$dom.on("click", "button[action=save]", function() {
		$serviceProvider.saveBusimess($dom.find("#form_admin_info"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_edit_admin_info").modal("hide");
				initData();
				$.simplyToast.success(res.message);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	
	//设置
	$dom.on("click", "button[action=setting]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_info input[name='id']").val(id);
		$serviceProvider.getSettingInfo(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_info").initData(res.result);
				$dom.find("#modal_info").modal("show");
			} else {
				$.simplyToast.error();
			}
		})
	});
	//设置保存
	$dom.on("click", "button[action=setting_save]", function() {
		$serviceProvider.saveSettingInfo($dom.find("#form_info"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_info").modal("hide");
				initData();
				$.simplyToast.success();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	

}

$controller.jgsdchannel = $controller.jgsdchannel || {};
$controller.jgsdchannel.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getJGSDChannelList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_news").html($("#tmpl_news").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	};
	$dom.on("click", "li[data-page]", function() {
		console.log(1)
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	$dom.on("click", "button[action = search]", function() {
		initData();
	});
	$dom.on("click", "button[action=add]", function() {
		$dom.find("#modal_edit_admin_info").modal("show");
		$dom.find("#form_admin_info").initData();
	});

	//折扣、单价
	$dom.on("click", "button[action=discount]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_discount input[name='id']").val(id);
		$serviceProvider.JGSDdiscount(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_discount").initData(res.result);
				$dom.find("#modal_discount").modal("show");
			} else {
				$.simplyToast.error();
			}
		})
	});
	//折扣、单价保存
	$dom.on("click", "button[action=discount_save]", function() {
		$serviceProvider.saveJGSDDiscount($dom.find("#form_discount"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_discount").modal("hide");
				initData();
				$.simplyToast.success();
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});
	//开通后台
	$dom.on("click", "button[action=open]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_platform").initData();
		$dom.find("#form_platform input[name='id']").val(id);
		$dom.find("#modal_platform").modal("show");
	});
	//编辑开通后台信息
	$dom.on("click", "button[action=edit]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_platform input[name='id']").val(id);
		$serviceProvider.JGSDplatformInfo(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_platform input[name='account']").val(res.result.userName);
				$dom.find("#form_platform input[name='pwd']").val("******");
				$dom.find("#modal_platform").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});

	//后台信息保存
	$dom.on("click", "button[action=platform_save]", function() {
		var $pwd = $dom.find("#form_platform input[name='pwd']");
		var password = $dom.find("#form_platform input[name='password']").val();
		if($pwd.val() != "******") {
			$dom.find("#form_platform input[name='password']").val($pwd.val());
		} else {
			$dom.find("#form_platform input[name='password']").val(password);
		}
		$serviceProvider.save_JGSDplatform($dom.find("#form_platform"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_platform").modal("hide");
				initData();
				$.simplyToast.success(res.message);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//停用
	$dom.on("click", "button[action=stop]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.stopJGSDPlatform(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success();
				initData();
			} else {
				$.simplyToast.error();
			}
		})
	});
	//启用
	$dom.on("click", "button[action=start]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.startJGSDPlatform(id, function(res) {
			if(res.code == 0) {
				$.simplyToast.success();
				initData();
			} else {
				$.simplyToast.error();
			}
		})
	});

	$dom.on("click", "button[action=del]", function() {
		var id = $(this).parent().data("id");
		if(!confirm("确认删除该申请渠道?")) {
			return;
		}
		$serviceProvider.JGSDbusimessDel(id, function(res) {

			if(res.code == 0) {
				$.simplyToast.success(res.message);
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		})
	});
	//新增合作伙伴保存
	$dom.on("click", "button[action=save]", function() {
		$serviceProvider.saveJGSDBusimess($dom.find("#form_admin_info"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_edit_admin_info").modal("hide");
				initData();
				$.simplyToast.success(res.message);
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	
	//设置
	$dom.on("click", "button[action=setting]", function() {
		var id = $(this).parent().data("id");
		$dom.find("#form_info input[name='id']").val(id);
		$serviceProvider.getJGSDSettingInfo(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_info").initData(res.result);
				$dom.find("#modal_info").modal("show");
			} else {
				$.simplyToast.error();
			}
		})
	});
	//设置保存
	$dom.on("click", "button[action=setting_save]", function() {
		$serviceProvider.saveJGSDSettingInfo($dom.find("#form_info"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_info").modal("hide");
				initData();
				$.simplyToast.success();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	

}


$controller.notmanage = $controller.notmanage || {};
$controller.notmanage.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getNotList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_news").html($("#tmpl_news").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);
			}
		});
	}
	$dom.on("change", "select[name=type]", function() {
		if($(this).val() == 1) {
			$dom.find("textarea[name=content]").parent().parent().css("display", "block");
			$dom.find("input[name=url]").parent().parent().css("display", "none");
		} else {
			$dom.find("textarea[name=content]").parent().parent().css("display", "none");
			$dom.find("input[name=url]").parent().parent().css("display", "block");
		}
	});
	$dom.on("change", "select[name=targetType]", function() {
		if($(this).val() == 1) {
			$dom.find(".appoint").css("display", "block");
		} else {
			$dom.find(".appoint").css("display", "none");
		}
	});

	$dom.on("click", "a[action=look]", function() {
		$dom.find("#modal_look").modal("show");
	});
	//新增通知
	$dom.on("click", "button[action=add]", function() {
		$dom.find("#modal_add_notice").modal("show");
		var data = new Date();
		var year = data.getFullYear();
		var month = data.getMonth() + 1;
		var day = data.getDate();
		var hours = data.getHours();
		var min = data.getMinutes();
		var s = data.getSeconds()
		console.log(year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + s);
		$("#modal_add_notice").find("input").val("");
		$("#modal_add_notice").find("input[name=triggerTime]").val(year + "/" + month + "/" + day + " " + hours + ":" + min + ":" + s);

	});
	$dom.on("click", "button[action=save_news]", function() {
		$serviceProvider.addNot($dom.find("#form_news"), function(res) {
			if(res.code == 0) {
				$dom.find("#modal_add_notice").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	$dom.on("click", "li[data-page]", function() {
		$dom.find("input[name=page]").val($(this).data("page"));
		initData();
	});
	//编辑
	$dom.on("click", "button[action=btn_edit]", function() {
		if($("select[name=type]").val() == 1) {
			$dom.find("textarea[name=content]").parent().parent().css("display", "block");
			$dom.find("input[name=url]").parent().parent().css("display", "none");
		} else {
			$dom.find("textarea[name=content]").parent().parent().css("display", "none");
			$dom.find("input[name=url]").parent().parent().css("display", "block");
		}
		var id = $(this).parent().data("newsid");
		$dom.find("#form_edit_notice").find("input[name = id]").val(id);
		$serviceProvider.getNot(id, function(res) {
			if(res.code == 0) {
				$dom.find("#form_edit_notice").initData(res.result);
				$dom.find("#modal_edit_notice").modal("show");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//编辑
	$dom.on("click", "button[action=btn_save]", function() {
		var id = $(this).parent().data("newsid");
		$dom.find("#form_edit_notice").find("input[name = id]").val();
		$serviceProvider.saveNoticeBean($dom.find("#form_edit_notice"), function(res) {
			if(res.code == 0) {
				$dom.find("#form_edit_notice").initData(res.result);
				$dom.find("#modal_edit_notice").modal("hide");
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//删除
	$dom.on("click", "button[action=btn_del]", function() {
		var id = $(this).parent().data("newsid");
		$dom.find("#form_del_notice").find("input[name = id]").val(id);
		$dom.find("#modal_del").modal("show");
	});
	//确定删除
	$dom.on("click", "button[action=ensuredel]", function() {
		var id = $dom.find("#form_del_notice").find("input[name = id]").val();
		$serviceProvider.delNot(id, function(res) {
			if(res.code == 0) {
				$dom.find("#modal_del").modal("hide");
				initData();
			} else {
				$.simplyToast.error(res.message);
			}
		});
	});
	//上传人员名单
	$dom.find("button[action=import]").ajaxUpload({
		container: $("body"),
		uploadUrl: appConfig.contextPath + "/upload?fileType=file",
		success: function(res) {
			console.log(res);
			$.post(appConfig.contextPath + "/manage/agentcooper/import", {
				url: res.result
			}, function(res) {
				if(res.code == 0) {
					$.simplyToast.success(res.message);
					$dom.find("#table_user").html($("#tmpl_user").tmpl(res.result));
					$dom.find(".sumPro").html(res.result.length);
				} else {
					$.simplyToast.error(res.message);
				}
			}, "json");
		},
		error: function(res) {
			$.simplyToast.error("导入失败");
		}
	});

}
$controller.dataList = $controller.dataList || {};
$controller.dataList.init = function($dom) {
	initData();

	function initData() {
		$serviceProvider.getDataList($dom.find("#form_search"), function(res) {
			if(res.code == 0) {
				$dom.find("#table_banner").html($("#tmpl_banner").tmpl(res.result));
				$dom.find("#table_pagination").html($("#tmpl_pagination").tmpl(res.pagination));
			} else {
				$.simplyToast.error(res.message);

			}
		});
	}
	var $modal_new = $dom.find("#modal_new");
	var editor = KindEditor.create("#content", {
		uploadJson: appConfig.uploadUrl + "?action=ke"
	});
	$dom.on("click", "button[action=edit]", function() {
		var id = $(this).parent().data("id");
		$serviceProvider.getDataInfo(id, function(res) {
			console.log(res);
			$("#form_column").initData(res.result);
			if(res.result.type == 3) {
				$(".dv-textarea").addClass("hide");
				$(".dv-text").removeClass("hide");
			} else if(res.result.type == 2) { //富文本
				$(".dv-textarea").removeClass("hide");
				$(".dv-text").addClass("hide");
			}
			$modal_new.modal('show');
		});
		$serviceProvider.content(id, function(res) {
			console.log(res);
			$("#form_column").setValue("content", res);
			editor.html(res);
		});
	});
	//保存
	$modal_new.on("click", "button[action=save]", function() {
		editor.sync();
		$serviceProvider.saveData($("#form_column"), function(res) {
			if(res.code == 0) {
				$.simplyToast.success();
				$modal_new.modal('hide');
			} else {
				$.simplyToast.error();
			}
		});
	});

}