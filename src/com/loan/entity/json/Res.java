package com.loan.entity.json;

import com.google.gson.Gson;

public class Res 
{
	private int code;
	private String message;
	private Object result;
	private boolean success;
	
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getResult() {
		return result;
	}
	public void setResult(Object result) {
		this.result = result;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public static void main(String[] args) {
		Res res = new Res();
		res.setCode(0);
		res.setMessage("ok");
		res.setSuccess(true);
		
		RegResult regResult = new RegResult();
		regResult.setUserId(1111);
		regResult.setName("zhangsan");
		res.setResult(regResult);
		String jsonString = new Gson().toJson(res, Res.class);
		System.out.println(jsonString);
	}
}
