package com.loan.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.loan.annotation.PrimaryKey;

@Entity
public class Phone_reg {
	@PrimaryKey
	@Column(name="user_id")
	public String user_id;
	
	@Column(name="user_phone")
	public String user_phone;
	
	@Column(name="user_ua")
	public String user_ua;
	
	@Column(name="user_ip")
	public String user_ip;
	
	@Column(name="user_chname")
	public String user_chname;
	
	@Column(name="user_regtime")
	public String user_regtime;
	
	@Column(name="user_name")
	public String user_name;
	
	@Column(name="user_age")
	public String user_age;
	
	@Column(name="provinceCode")
	public String provinceCode;
	
	@Column(name="cityCode")
	public String cityCode;
	
	@Column(name="districtCode")
	public String districtCode;
	
	@Column(name="work")
	public String work;
	
	@Column(name="workName")
	public String workName;
	
	@Column(name="monthCost")
	public String monthCost;
	
	@Column(name="payWay")
	public String payWay;
	
	@Column(name="amount")
	public String amount;
	
	@Column(name="shebao")
	public String shebao;
	
	@Column(name="gongjijin")
	public String gongjijin;
	
	@Column(name="shangbao")
	public String shangbao;
	
	@Column(name="weilidai")
	public String weilidai;
	
	@Column(name="house")
	public String house;
	
	@Column(name="houseMortgage")
	public String houseMortgage;
	
	@Column(name="car")
	public String car;
	
	@Column(name="carMortgage")
	public String carMortgage;
	
	@Column(name="purpose")
	public String purpose;
	
	@Column(name="basic_addtime")
	public String basic_addtime;
	
	public Phone_reg(String user_id, String user_phone, String user_ua,
			String user_ip, String user_chname, String user_regtime) {
		this.user_id = user_id;
		this.user_phone = user_phone;
		this.user_ua = user_ua;
		this.user_ip = user_ip;
		this.user_chname = user_chname;
		this.user_regtime = user_regtime;
	}

	public Phone_reg(String user_id, String user_name, String user_age,
			String provinceCode, String cityCode, String districtCode, String work,
			String workName, String monthCost, String payWay, String amount, String shebao,
			String gongjijin, String shangbao, String weilidai, String house,
			String houseMortgage, String car, String carMortgage, String purpose,
			String basic_addtime) {
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_age = user_age;
		this.provinceCode = provinceCode;
		this.cityCode = cityCode;
		this.districtCode = districtCode;
		this.work = work;
		this.workName = workName;
		this.monthCost = monthCost;
		this.payWay = payWay;
		this.amount = amount;
		this.shebao = shebao;
		this.gongjijin = gongjijin;
		this.shangbao = shangbao;
		this.weilidai = weilidai;
		this.house = house;
		this.houseMortgage = houseMortgage;
		this.car = car;
		this.carMortgage = carMortgage;
		this.purpose = purpose;
		this.basic_addtime = basic_addtime;
	}
}
