var $service = $service || {};
$service.type={local:"local",remoting:"remoting"};
$service.local = $service.local || {};
$service.remoting = $service.remoting || {};
$service.defualtType=$service.type.local;
$service.factory = function(type) {
	if($.isEmptyObject(type))
		type=$service.defualtType;
	/*if(type=="local")
	{
		document.write("<script language='javascript' src='"+appConfig.contextPath+"/resources/app/js/service/local-manage.js'></script>");
	}
	else
	{
		document.write("<script language='javascript' src='/web/resources/app/js/service/remoting-manage.js'></script>");
	}*/
	return $service[type];
};