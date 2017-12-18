package com.loan.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.loan.annotation.PrimaryKey;

@Entity
public class Sms_send {
	@PrimaryKey
	@Column(name="id")
	public int id;
	
	@Column(name="phone")
	public String phone;
	
	@Column(name="auth_code")
	public String auth_code;
	
	@Column(name="ua")
	public String ua;
	
	@Column(name="ip")
	public String ip;
	
	@Column(name="send_result")
	public int send_result;
	
	@Column(name="user_chname")
	public String user_chname;
	
	@Column(name="send_time")
	public String send_time;

	public Sms_send() {
	}

	public Sms_send(String phone, String auth_code, String ua, String ip, int send_result,
			String user_chname, String send_time) {
		this.phone = phone;
		this.auth_code = auth_code;
		this.ua = ua;
		this.ip = ip;
		this.send_result = send_result;
		this.user_chname = user_chname;
		this.send_time = send_time;
	}
	
	
}
