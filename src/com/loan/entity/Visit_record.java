package com.loan.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.loan.annotation.PrimaryKey;

@Entity
public class Visit_record {
	@PrimaryKey
	@Column(name="id")
	public Integer id;
	
	@Column(name="ua")
	public String ua;
	
	@Column(name="ip")
	public String ip;
	
	@Column(name="chname")
	public String chname;
	
	@Column(name="vistime")
	public String vistime;

	public Visit_record(String ua, String ip, String chname, String vistime) {
		this.ua = ua;
		this.ip = ip;
		this.chname = chname;
		this.vistime = vistime;
	}
	
}
