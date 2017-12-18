$service.remoting.err = {
	code: -1,
	message: "请求失败,请检查网络状态"
};
/*
 * 测试
 */
$service.remoting.test=function(callback){
	callback({code:1});
};

$service.remoting.login=function($form,callback){
	$.post(appConfig.contextPath+"/manage/login",$form.serialize(),function(res){
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.sendLoginAuthCode=function(username,callback){
	$.post(appConfig.contextPath+"/manage/sendcode",{
		username:username
	},function(res){
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getList = function($form,callback) {
	$.post(appConfig.contextPath + "/manage/user/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.userInfoDetail = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/userinfodetail?id="+id, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getChargeSelect = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/getchargeselect",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//H5页面的更多信息的显示
$service.remoting.userInfoMore = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/userinfomore?id="+id, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//备注的显示
$service.remoting.userInfoNote = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/userinfonote?id="+id, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//保存备注
$service.remoting.saveNote = function($form,callback) {
	$.post(appConfig.contextPath + "/manage/user/savenote",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.modifyAgentTime = function(id,time,callback) {
	$.post(appConfig.contextPath + "/manage/user/modifyagenttime",{
		id:id,
		time:time
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.modifyAdTime = function($form,callback) {
	$.post(appConfig.contextPath + "/manage/user/modifyadtime",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getCity = function(id,level,callback) {
	$.post(appConfig.contextPath + "/manage/user/getcity",{
		id:id,
		level:level
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.editUserStatus = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/edituserstatus",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getDistrict = function(id,callback) {
	$.post(appConfig.contextPath + "/manage/user/getdistrict?id="+id, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.resetUserPassword = function (id,pwd,callback){
	$.post(appConfig.contextPath + "/manage/user/resetuserpwd",{id:id,pwd:pwd}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getRequirementList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/requirementmanage/getlist",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseRequirement = function (id,callback){
	$.post(appConfig.contextPath + "/manage/requirementmanage/refuserequirement",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delRequirement = function (id,callback){
	$.post(appConfig.contextPath + "/manage/requirementmanage/delrequirement",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoan = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/requirementmanage/agreeloan",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getProductList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/getproductlist",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getProductBean = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/getproductbean",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.raiders= function ($form,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/raiders",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveFlowSheet = function($form,callback) {
	$.postData(appConfig.contextPath + "/manage/loanmanage/saveflowsheet",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.uploadProduct = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/uploadproduct",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.productRecommend = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/productrecommend",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.upAction = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/upaction",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.homeupAction = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/homeupaction",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}


$service.remoting.delProduct = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/delproduct",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addProduct = function ($form,img,callback){
	$.post(appConfig.contextPath + "/manage/loanmanage/addproduct?img="+img,$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getCardList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getCardInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/cardinfo",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.uploadCardInfo = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/uploadcardinfo",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeCardStatus = function (id,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/changecardstatus",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeCardRecommend = function (id,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/changecardrecommend",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delCard = function (id,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/delcard",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addCard = function ($form,img,callback){
	$.post(appConfig.contextPath + "/manage/cardmanage/addcard?img="+img,$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getLoanHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/loanhistory/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delHistory = function (id,callback){
	$.post(appConfig.contextPath + "/manage/loanhistory/delhistory",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}


$service.remoting.getCardHistory = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/cardhistory/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delCardHistory = function (id,callback){
	$.post(appConfig.contextPath + "/manage/cardhistory/delcardhistory",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getManagerList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/administrator/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addAdmin = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/administrator/addadmin",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdminInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/administrator/getadmininfo",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.editAdmin = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/administrator/editadmin",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeAdminStatus = function (id,callback){
	$.post(appConfig.contextPath + "/manage/administrator/changeadminstatus",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delAdmin = function (id,callback){
	$.post(appConfig.contextPath + "/manage/administrator/deladmin",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdminFunc = function (id,callback){
	$.post(appConfig.contextPath + "/manage/administrator/getadminfunc",{
		id:id
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAllFunc = function (callback){
	$.post(appConfig.contextPath + "/manage/administrator/getallfunc", function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveFunction = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/administrator/savefunction",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getBannerList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/banners/getbannerlist",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addBannerImg = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/banners/addbannerimg",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.updateBanner = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/banners/updatebanner",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getBannerInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/banners/getbannerinfo",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delBanner= function (id,callback){
	$.post(appConfig.contextPath + "/manage/banners/delbanner",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}



$service.remoting.getBankBannerList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankbanners/getbankbannerlist",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addBankBannerImg = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankbanners/addbankbannerimg",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.updateBankBanner = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankbanners/updatebankbanner",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getBankBannerInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/bankbanners/getbankbannerinfo",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delBankBanner = function (id,callback){
	$.post(appConfig.contextPath + "/manage/bankbanners/delbankbanner",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}



$service.remoting.getPlatformList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/platformmanage/getplatformlist",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.savePlatform = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/platformmanage/saveplatform",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addPlatform = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/platformmanage/addplatform",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changePlatformStatus = function (id,callback){
	$.post(appConfig.contextPath + "/manage/platformmanage/changestatus",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delPlatform = function (id,callback){
	$.post(appConfig.contextPath + "/manage/platformmanage/delplatform",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}


$service.remoting.queryNews = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/newsmanage/querynews",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveNews = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/newsmanage/savenews",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addNews = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/newsmanage/addnews",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeNewsStatus = function (id,callback){
	$.post(appConfig.contextPath + "/manage/newsmanage/newsstatus",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delNews = function (id,callback){
	$.post(appConfig.contextPath + "/manage/newsmanage/delnews",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.queryBank = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankmanage/query",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveBank = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankmanage/savebank",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addBank = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/bankmanage/addbank",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.bankRecommend = function (id,callback){
	$.post(appConfig.contextPath + "/manage/bankmanage/recommend",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delBank = function (id,callback){
	$.post(appConfig.contextPath + "/manage/bankmanage/del",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}



$service.remoting.getAgentList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentmanage/query",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agentStatus = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentmanage/isagent",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}




$service.remoting.agentInviteReg = function ($form,callback){
	$.post(appConfig.contextPath + "/mobile/agentreg/reg",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.sendAuthCode = function (username,callback){
	$.post(appConfig.contextPath + "/mobile/agentreg/authcode",{
		username:username
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.loginAndDownload = function (username,pwd,callback){
	$.post(appConfig.contextPath + "/mobile/agentreg/login",{
		username:username,
		pwd:pwd
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getWagesLoanList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/wagesloan/query",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getWagesLoanDetail = function(id,callback){
	$.post(appConfig.contextPath + "/manage/wagesloan/detail",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveWagesLoan = function($form,callback){
	$.post(appConfig.contextPath + "/manage/wagesloan/save",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addWagesLoan = function($form,callback){
	$.post(appConfig.contextPath + "/manage/wagesloan/add",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delWagesLoan = function(id,callback){
	$.post(appConfig.contextPath + "/manage/wagesloan/del",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}


//工薪贷
$service.remoting.getLoanWagesHistoryList = function($form,callback){
	$.post(appConfig.contextPath + "/manage/rqwagesloan/query",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanWagesRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqwagesloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanWagesRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqwagesloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//企业贷
$service.remoting.getLoanCompanyHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/rqcompanyloan/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanCompanyRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqcompanyloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanCompanyRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqcompanyloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//房抵贷
$service.remoting.getLoanHouseHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/rqhouseloan/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanHouseRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqhouseloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanHouseRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqhouseloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//车抵贷
$service.remoting.getLoanCarHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/rqcarloan/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanCarRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqcarloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanCarRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqcarloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//垫资过桥
$service.remoting.getLoanBridgeHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/rqbridgeloan/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanBridgeRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqbridgeloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanBridgeRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqbridgeloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//承兑汇票
$service.remoting.getLoanBillHistoryList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/rqbillloan/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.refuseLoanBillRQ = function(id,callback){
	$.post(appConfig.contextPath + "/manage/rqbillloan/refuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.agreeLoanBillRQ = function (id,amount,callback){
	$.post(appConfig.contextPath + "/manage/rqbillloan/agree",{
		id:id,
		amount:amount
	}, function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//订单管理
$service.remoting.getOrder = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/ordermanage/query",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//广告位管理
$service.remoting.getAdCooperationPic = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/adcooperationpic/getpic",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.savePic = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/adcooperationpic/savepic",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//消息管理
$service.remoting.getDataList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/dataList/data",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.getDataInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/dataList/dataInfo",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.content = function (id,callback){
	$.post(appConfig.contextPath + "/manage/dataList/content",{
		id:id
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveData = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/dataList/saveData",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//代理合作用户页面
$service.remoting.getAgentCooper = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getagentcooper",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//广告位合作用户页面
$service.remoting.getAdCooper = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadcooper",$form.serialize() ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//广告位合作页面 检查该用户广告位合作状态
$service.remoting.checkAdCooperStatus = function (id,type,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/checkstatus",{
		id:id,
		type:type
	} ,function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//保存推荐人信息
$service.remoting.saveRecommendUser = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/saverecomend",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//获取向推荐人推荐的用户
$service.remoting.getRecommendList = function (id,type,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getrecommend",{
		id:id,
		type:type
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
//删除向推荐人推荐的用户
$service.remoting.delRecommendUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/delrecommend",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//获取向推荐人推荐的用户
$service.remoting.getChangeRequest = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getchangerequest",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getReasonImg = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getreasonimg",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveChange = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/savechange",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeRecommend = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/changerecommend",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getVWChangeRequest = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getvwchangerequest",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.changeRefuse = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/changerefuse",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}



$service.remoting.getNoticeList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getnoticelist",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addNotice = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/addnotice",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getNoticeBean = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getnoticebean",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.saveNoticeBean = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/savenoticebean",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delNoticeBean = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/delnoticebean",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

$service.remoting.getNotList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getnotlist",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.addNot = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/addnot",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.delNot = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/delnot",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getNot = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getnot",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}







//获取提现记录
$service.remoting.getWithdrawalsList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getwithdrawlist",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//上传转账单号
$service.remoting.uploadVoucherAction = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/uploadvoucher",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdWagesUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadwagesuser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdCompanyUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadcompanyuser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdHouseUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadhouseuser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdCarUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadcaruser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdBridgeUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadbridgeuser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdBillUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadbilluser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.getAdShortUser = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getadshortuser",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

/* 渠道*/
$service.remoting.getChannelList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/getchannellist",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveBusimess = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/savebusimess",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
//$service.remoting.busimessInfo = function (id,callback){
//	$.post(appConfig.contextPath + "/manage/agentcooper/busimessinfo",{id:id},function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//};
$service.remoting.discount = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/get_zhekou_danjia",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveDiscount = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/business_set_zhekou_danjia",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.platformInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/get_platform_account",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.save_platform = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/save_platform",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.stopPlatform = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/close_platform",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.startPlatform = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/open_platform",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.busimessDel = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/busimess_del",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};


$service.remoting.getSettingInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/settinginfo",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveSettingInfo = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/agentcooper/savesettinginfo",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};


/* 极光闪贷 */
$service.remoting.getJGSDChannelList = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/getchannellist",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveJGSDBusimess = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/savebusimess",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
//$service.remoting.busimessInfo = function (id,callback){
//	$.post(appConfig.contextPath + "/manage/agentcooper/busimessinfo",{id:id},function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//};
$service.remoting.JGSDdiscount = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/get_zhekou_danjia",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveJGSDDiscount = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/business_set_zhekou_danjia",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.JGSDplatformInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/get_platform_account",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.save_JGSDplatform = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/save_platform",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.stopJGSDPlatform = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/close_platform",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.startJGSDPlatform = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/open_platform",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.JGSDbusimessDel = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/busimess_del",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};


$service.remoting.getJGSDSettingInfo = function (id,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/settinginfo",{id:id},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.saveJGSDSettingInfo = function ($form,callback){
	$.post(appConfig.contextPath + "/manage/jgsd/savesettinginfo",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};







$service.remoting.manage=$service.remoting.manage||{};
$service.remoting.manage.login=function($form,callback){
	$.postData(appConfig.contextPath+"/manage/login",$form.serialize(),function(res){
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.manage.getMain = function(callback) {
	$.postData(appConfig.contextPath + "/manage/main", function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.manage.resetMyPwd = function($form,callback) {
	$.postData(appConfig.contextPath + "/manage/main/resetMyPwd",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile=$service.remoting.mobile||{};
$service.remoting.mobile.submitApplications = function($form,callback) {
	$.postData(appConfig.contextPath + "/mobile/submitapplications",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
};
$service.remoting.mobile.submitApplication = function($form,callback) {
	$.postData(appConfig.contextPath + "/mobile/submitapplication",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.authcode = function (username,authCode,callback){
	$.post(appConfig.contextPath + "/mobile/authcode",{
		username:username,
		authCode:authCode
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.register = function($form,callback) {
	$.postData(appConfig.contextPath + "/mobile/register",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.browse = function (username,callback){
	$.post(appConfig.contextPath + "/mobile/browse",{
		username:username
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.product = function(page,min,max,least,callback) {
	$.post(appConfig.contextPath + "/mobile/product",{
		page:page,min:min,max:max,least:least
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.productInfo = function (id,callback){
	$.post(appConfig.contextPath + "/mobile/info",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.getMessage = function (userId,page,callback){
	$.post(appConfig.contextPath + "/mobile/messageList",{
		userId:userId,
		page:page
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.getMessageInfo = function (id,callback){
	$.post(appConfig.contextPath + "/mobile/messageInfo",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.getThisInfo = function (id,callback){
	$.post(appConfig.contextPath + "/mobile/thisInfo",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.mobile.strategyInfo = function (id,callback){
	$.post(appConfig.contextPath + "/mobile/strategyInfo",{
		id:id
	},function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}
$service.remoting.exportUser = function ($form,callback){
	$.post(appConfig.contextPath + "/export",$form.serialize(),function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//数据统计
$service.remoting.data_List = $service.remoting.data_List || {};
$service.remoting.data_List.getDataList = function($form,callback) {
	$.post(appConfig.contextPath + "/manage/merchant/get_data",$form.serialize(), function(res) {
		callback(res);
	}, "json").error(function() {
		callback($service.remoting.err);
	});
}

//$service.remoting.getList = function($form,callback) {
//	$.postData(appConfig.contextPath + "/manage/query", function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//}
////$service.remoting.manage=$service.remoting.manage||{};
//$service.remoting.getList = function($form,callback) {
//	$.post(appConfig.contextPath+"manage/user/query",$form.serialize(),function(res){
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//};

//=======
//
//
//$service.remoting.manage.getUserList= function($form,callback) {
//	$.postData(appConfig.contextPath + "/manage/user/list",$form.serialize(),function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//}
//$service.remoting.manage.delUsers = function($form,callback) {
//	$.postData(appConfig.contextPath + "/manage/user/delete?id="+id,function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//}
//$service.remoting.manage.saveUser = function($form,callback) {
//	$.postData(appConfig.contextPath + "/manage/user/save",$form.serialize(), function(res) {
//		callback(res);
//	}, "json").error(function() {
//		callback($service.remoting.err);
//	});
//}>>>>>>> .r7627
