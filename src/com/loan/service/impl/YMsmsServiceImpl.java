package com.loan.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.loan.service.SmsService;
import com.loan.tool.LoanHttpUtil;
import com.loan.tool.XwhTool;
import com.loan.tool.log4j.Log4j;
/**
 * 亿美短信验证码接口
 * @author Host-0
 *
 */
public class YMsmsServiceImpl implements SmsService{
	private static final String URL = "http://bjmtn.b2m.cn/simpleinter/sendSMS";
	private static final String APPID = "EUCP-EMY-SMS1-0CSGZ";
	private static final String SECRETKEY = "6FC9826E2AEACEC3";
	
	@Override
	public boolean sendMsg(String phone, String content) {
		DateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		String timeStamp = format.format(new Date());
//		System.out.println(timeStamp);
		String encode = null;
		try {
			encode = URLEncoder.encode(content,"UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		
		StringBuilder sb = new StringBuilder();
		sb.append(URL + "?");
		sb.append("appId=" + APPID);
		sb.append("&timestamp=" + timeStamp);
		sb.append("&sign=" + genSign(timeStamp));
		sb.append("&mobiles=" + phone);
		sb.append("&content=" + encode);
		
		String sendRes = null;
		try {
			sendRes = LoanHttpUtil.sendPost(sb.toString(), null);
			Log4j.NAME.STDOUTS_LOG.debug(sendRes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(sendRes == null)
		{
			return false;
		}
		JsonElement je = new JsonParser().parse(sendRes);
		
		if(!je.isJsonObject())
		{
			return false;
		}
		
		JsonElement code = je.getAsJsonObject().get("code");
		
		if(code != null && "SUCCESS".equals(code.getAsString()))
		{
			return true;
		}
		
		return false;
	}
	
	private static String genSign(String timeStamp)
	{
		String toSign = APPID + SECRETKEY + timeStamp;
		String md5 = XwhTool.getMD5Encode(toSign);
		return md5;
	}
//	public static void main(String[] args) {
//		SmsService service = new YMsmsServiceImpl();
//		System.out.println(service.sendMsg("15216655576", "您的验证码是1234，在五分钟内有效，如非本人操作请忽略本短信。"));
//	}
}
