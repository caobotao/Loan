//TODO:待改进...  省市区信息仍在area中
;(function($, window, document, undefined) {

	$.fn.initProvince = function(setttings) {
		var defaults = {
			$province: this.find("select[name=provinceCode]"),
			$city: this.find("select[name=cityCode]"),
			$county: this.find("select[name=districtCode]"),
			provinceVal: "", //省
			cityVal: "", //市
			countyVal: "", //区
			tempPro: "", //过程变量-省
			tempCity: "", //过程变量-市
			isPro:true, //是否显示省一级
			isCity:true, //是否显示市一级
			isCounty: true //是否显示区一级
		}
		var options = $.extend(defaults, setttings || {});
		return this.each(function() {
			if(options.isPro){
				options.$province.empty();
				options.$province.append('<option value="">省份</option>');
				for (var i = 0; i < area.length; i++) {
					options.$province.append('<option value="' + area[i].id + '">' + area[i].name + '</option>');
				}
				if(!options.provinceVal) { //参数为空时
					options.tempPro = options.$province.val();
					options.$province.val("");
				} else {
					options.tempPro = options.provinceVal;
					options.$province.val(options.provinceVal);
				}
				changeProvince(options);
			}

			options.$province.unbind("change").change(function() {
				options.tempPro = options.$province.val();
				options.provinceVal = "";
				options.cityVal = "";
				options.countyVal = "";
				changeProvince(options);
			});
			options.$city.unbind("change").change(function() {
				options.tempCity = options.$city.val();
				options.cityVal = "";
				options.countyVal = "";
				changeCity(options);
			});
		});
	}
	var citys=[];
	function changeProvince(opt) {
		if(opt.isCity){
			opt.$city.empty();
			opt.$city.append('<option value="">城市</option>');
			for (var i = 0; i < area.length; i++) {
				if(area[i].id == opt.tempPro) {
					citys = area[i].city;
					for (var j = 0; j < citys.length; j++) {
						opt.$city.append('<option value="' + citys[j].id + '">' + citys[j].name + '</option>');
					}
				}
			}
			
			if(!opt.cityVal) { //参数为空时
				opt.tempCity = opt.$city.val();
				opt.$city.val("");
			} else {
				opt.tempCity = opt.cityVal;
				opt.$city.val(opt.cityVal);
			}
			
			changeCity(opt);
		}
	}

	function changeCity(opt) {
		if(opt.isCounty) {
			opt.$county.empty();
			opt.$county.append('<option value="">区域</option>');
			for (var i = 0; i < citys.length; i++) {
				if(citys[i].id == opt.tempCity) {
					for (var j = 0; j < citys[i].county.length; j++) {
						opt.$county.append('<option value="' + citys[i].county[j].id + '">' + citys[i].county[j].name + '</option>');
					}
				}
			}
			if(!opt.countyVal) { //参数为空时
				opt.$county.val("");
			} else {
				opt.$county.val(opt.countyVal);
			}
		}
	}

})(jQuery, window, document);