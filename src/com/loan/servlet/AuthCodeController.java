package com.loan.servlet;

import java.io.IOException;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.loan.entity.Sms_send;
import com.loan.entity.json.Res;
import com.loan.service.SmsService;
import com.loan.service.impl.XMsmsServiceImpl;
import com.loan.tool.LoanHttpUtil;
import com.loan.tool.XwhTool;
import com.loan.tool.db.LoanDao;
import com.loan.tool.log4j.Log4j;

/**
 * Servlet implementation class PreRegController
 */
@WebServlet("/mobile/authcode")
public class AuthCodeController extends HttpServlet {
	private static final long serialVersionUID = 1L;
      
	private SmsService smsService = new XMsmsServiceImpl();
	
    public AuthCodeController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		// 渠道名称
		String busimessName = request.getParameter("busimessName");
		
		Res res = new Res();
		
		HttpSession session = request.getSession();
		Object sessionPicCodeObj = session.getAttribute("pic_code");
		
		// 1.检查图形验证码session是否已失效
		if(sessionPicCodeObj == null)
		{
			res.setCode(-1);
			res.setMessage("图形验证码失效，请重新输入！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		String sessionPicCode = (String) sessionPicCodeObj; 
		
//		String reqStr = LoanHttpUtil.getClientUnencryCode(request);
//		System.out.println(reqStr);
		String authCode = request.getParameter("authCode");// 图片验证码
		String phone = request.getParameter("username");// 手机号码
		// 2.检查参数是否有效
		if(authCode == null || phone == null)
		{
			res.setCode(-1);
			res.setMessage("无效的请求参数！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		// 3.检查手机号是否有效
		if(!phone.matches("^1[3|4|5|7|8][0-9]\\d{4,8}$"))
		{
			res.setCode(-2);
			res.setMessage("手机号码无效，请检查！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		// 4.检查图形验证码是否有效
		if(!sessionPicCode.toLowerCase().equals(authCode.toLowerCase()))
		{
			res.setCode(-3);
			res.setMessage("图形验证码错误，请重新输入！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		// 5.检查上次请求短信验证码时间
		Object msgCodeTimestampObj = session.getAttribute("msgCodeTimestamp");
		if(msgCodeTimestampObj != null && 
				System.currentTimeMillis() - (Long)msgCodeTimestampObj <= 1 * 1000 * 60 )
		{
			res.setCode(-4);
			res.setMessage("请求过于频繁，请稍后再试！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		// 发送验证码
		int randomCode = new Random().nextInt(9000) + 1000;
		String content = "【信盟帮贷】您的验证码是"+randomCode+"，在五分钟内有效，如非本人操作请忽略本短信。";
		boolean isSendSuccess = smsService.sendMsg(phone, content);
		
		// 记录数据库
		String ua = request.getHeader("user-agent");
		String ip = LoanHttpUtil.getIp(request);
		Sms_send smsSend = new Sms_send(phone, String.valueOf(randomCode), ua, ip, 
				isSendSuccess ? 1 : 2, busimessName, XwhTool.getCurrentDateTimeValue());
		
		try {
			// 记录log
			Log4j.NAME.SMS_SEND_LOG.debug(new Gson().toJson(smsSend));
			// 记录数据库
			LoanDao.instance.saveOrUpdate(smsSend);
		} catch (Exception e) {
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
			e.printStackTrace();
		}
		
		// 6.发送短信验证码是否成功
		if(!isSendSuccess)
		{
			res.setCode(-5);
			res.setMessage("验证码发送失败,请稍后再试！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		// 发送成功
		session.setAttribute("msgCode", String.valueOf(randomCode));
		session.setAttribute("msgCodeTimestamp", System.currentTimeMillis());
		
		// 清理session
		session.removeAttribute("pic_code");
		
		// 返回成功信息
		res.setCode(0);
		res.setMessage("验证码发送成功！");
		res.setSuccess(true);
		LoanHttpUtil.sendResult(res, response);
		
	}
	
//	public static void main(String[] args) {
//		SmsService smsService = new YMsmsServiceImpl();
//		String content = "您的验证码是1234，在五分钟内有效，如非本人操作请忽略本短信。";
//		smsService.sendMsg("15216655576", content);
//	}
}
