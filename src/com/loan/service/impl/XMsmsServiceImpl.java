package com.loan.service.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.loan.service.SmsService;
import com.loan.tool.LoanHttpUtil;
import com.loan.tool.XwhTool;
import com.loan.tool.log4j.Log4j;
/**
 * 新盟短信验证码接口
 * @author Host-0
 *
 */
public class XMsmsServiceImpl implements SmsService{
	private static final String URL = "http://121.40.69.178:8888/v2sms.aspx";
	private static final int USERID = 82;
	private static final String USERNAME = "xinmeng";
	private static final String PASSWORD = "ABCD4321";
	
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
		sb.append("action=send");
		sb.append("&userid=" + USERID);
		sb.append("&timestamp=" + timeStamp);
		sb.append("&sign=" + genSign(timeStamp));
		sb.append("&mobile=" + phone);
		sb.append("&content=" + encode);
		
		String sendRes = null;
		try {
			sendRes = LoanHttpUtil.sendPost(sb.toString(), null);
			Log4j.NAME.STDOUTS_LOG.debug(sendRes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(sendRes);
		
		if(sendRes == null)
		{
			return false;
		}
		
		if(sendRes.contains("Success"))
		{
			return true;
		}
		
		return false;
	}
	
	private static String genSign(String timeStamp)
	{
		String toSign = USERNAME + PASSWORD + timeStamp;
		String md5 = XwhTool.getMD5Encode(toSign);
		return md5;
	}
	public static void main(String[] args) {
		SmsService service = new XMsmsServiceImpl();
		System.out.println(service.sendMsg("15216655576", "您的验证码是2345，在五分钟内有效，如非本人操作请忽略本短信。"));
	}
}
