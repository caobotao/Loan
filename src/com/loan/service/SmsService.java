package com.loan.service;

public interface SmsService {
	public boolean sendMsg(String phone, String content);
}
