(function($, window, document) {
	/*
	 * 根据名称去表单字段jquery对象
	 */
	$.prototype.getField = function(name) {
		if (this.is("form")) {
			return this.find("[name='" + name + "']");
		}
	};
	/*
	 * 根据名称获取字段值
	 */
	$.prototype.getValue = function(name) {
		if (this.is("form")) {
			var $field = this.find("[name='" + name + "']");
			if ($field.is("input")) {
				return $field.val();
			} else if ($field.is("select")) {
				return $field.val();
			} else if ($field.is("textarea")) {
				return $field.val();
			} else {
				alert("解析错误");
			}
		}
	};
	$.prototype.setValue = function(name, value) {
		if (this.is("form")) {
			var $field = this.find("[name='" + name + "']");
			if ($.isNullOrEmpty(value)) {
				if ($field.is("input")) {
					if ($field.attr("type") == "checkbox" || $field.attr("type") == "radio") {
						$field.val([]);
					} else {
						$field.val("");
					}
				} else if ($field.is("select")) {
					$field[0].selectedIndex = -1;
				} else if ($field.is("textarea")) {
					$field.val("");
				} else if ($field.is("img")) {
					$field.attr("src", "");
				} else {
					$field.text("");
				}
			} else {
				if ($field.is("input")) {
					if ($field.attr("type") == "checkbox" || $field.attr("type") == "radio") {
						if ($.isArray(value)) {
							$field.val(value);
						} else if(!$.isNullOrEmpty(value)){
							var values = value.toString().split(",");
							$field.val(values);
						}else{
							$field[0].selectedIndex = -1;
						}
					} else {
						$field.val(value);
					}
				} else if ($field.is("select")) {
					if ($field.attr("multiple") == "multiple") {
						var values = value.toString().split(",");
						$field.val(values);
					} else if(!$.isNullOrEmpty(value)){
						$field.val(value);
					}else{
						
					}
				} else if ($field.is("textarea")) {
					$field.val(value);
				} else if ($field.is("img")) {
					$field.attr("src", value);
				} else {
					$field.text(value);
				}
			}

		}
	};
	/**
	 * 为form赋值，如果参数为空则重置
	 * @param {Object} json
	 */
	$.prototype.initData = function(json) {
		if (!this.is("form")) {
			return;
		};
		var fieldList = [];
		this.find("[name]").each(function() {
			fieldList.push($(this).attr("name"));
		});
		fieldList = fieldList.unique();
		if ($.isNullOrEmpty(json)) {
			for (var i = 0; i < fieldList.length; i++) {
				var fieldName = fieldList[i];
				this.setValue(fieldName,null);
			}

		} else {
			for (var i = 0; i < fieldList.length; i++) {
				var fieldName = fieldList[i];
				var value = json[fieldName];
				this.setValue(fieldName,value);
			}
		}
	};
	$.prototype.initSelect = function(data, all) {
		var $this = this;
		if ($this.is("select")) {
			$this.empty();
			if (all) {
				$this.append("<option value='-1'>全部</option>");
			}

			$.each(data, function(i, item) {
				$this.append("<option value='" + item.key + "'>" + item.value + "</option>")
			});
		}
	};
	$.extend({
		//判断是否是空，包括undefiend,null,""
		isNullOrEmpty: function(obj) {
			if (typeof(obj) === 'undefined')
				return true;
			if (obj === null)
				return true;
			if (obj === "")
				return true;
			return false;
		},
		//拷贝对象,暂时没管基本类型和数组
		copy:function(obj){
			var result={};
			for(var key in obj){
				if(typeof(obj[key])=='object')
				{
					result[key]=copy(obj[key]);
				}else{
					result[key]=obj[key];
				}
			}
			return result;
		}
	});
	Array.prototype.unique = function() {
		var newArr = [],
			obj = {};
		for (var i = 0, len = this.length; i < len; i++) {
			if (!obj[this[i]]) {
				newArr.push(this[i]);
				obj[this[i]] = true;
			}
		}
		return newArr;
	}

}(jQuery, window, document));