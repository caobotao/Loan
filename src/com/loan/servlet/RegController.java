package com.loan.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.loan.entity.Phone_reg;
import com.loan.entity.json.Res;
import com.loan.tool.LoanHttpUtil;
import com.loan.tool.XwhTool;
import com.loan.tool.db.LoanDao;
import com.loan.tool.log4j.Log4j;

/**
 * Servlet implementation class PreRegController
 */
@WebServlet("/mobile/register")
public class RegController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RegController() {
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
		
		String busimessName = request.getParameter("busimessName");// 渠道名称
		String phone = request.getParameter("userName");// 手机号码
		String smsCode = request.getParameter("smsCode");// 短信验证码
		
		HttpSession session = request.getSession();
		Object msgCodeSessionObj = session.getAttribute("msgCode"); 		
		
		Res res = new Res();
		
		// 1.短信验证码是否有效
		if(smsCode == null)
		{
			res.setCode(-6);
			res.setMessage("请输入短信验证码！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		// 2.短信验证码是否有效
		if(msgCodeSessionObj == null)
		{
			res.setCode(-7);
			res.setMessage("短信验证码已失效，请重新获取！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		String msgSessionCode = (String) msgCodeSessionObj;
		// 3.核对短信验证码
		if(!smsCode.equals(msgSessionCode))
		{
			res.setCode(-8);
			res.setMessage("短信验证码错误，请核对后再输入！");
			res.setSuccess(false);
			LoanHttpUtil.sendResult(res, response);
			return;
		}
		
		// 开始注册
		String ua = request.getHeader("user-agent");
		String ip = LoanHttpUtil.getIp(request);
		String now = XwhTool.getCurrentDateTimeValue();
		int userId = insertToDb(busimessName, phone, ua, ip, now);
		
		// 记录log
		try {
			Phone_reg reg = new Phone_reg(String.valueOf(userId), phone, ua, ip, busimessName, now);
			Log4j.NAME.REGISTER_LOG.debug(new Gson().toJson(reg));
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		// 记录session
		session.setAttribute("userId", userId);
		
		res.setCode(0);
		res.setMessage("注册成功！");
		RegResult result = new RegResult(busimessName, userId);
		res.setResult(result);
		res.setSuccess(true);
		LoanHttpUtil.sendResult(res, response);
	}

	/**
	 * 插入数据库并返回主键id做为userid
	 * @param chName
	 * @param phone
	 * @param ua
	 * @param ip
	 * @return
	 */
	private int insertToDb(String chName, String phone, String ua, String ip, String regTime) {
		String sql = "insert phone_reg (user_phone, user_ua, user_ip, user_chname, user_regtime) "
				+ "values('"+phone+"','"+ua+"','"+ip+"','"+chName+"','"+regTime+"')";
		int userId = LoanDao.instance.execSQLCMDInfoGenKey(sql);
		return userId;
	}

	class RegResult{
		private String name;
		private int userId;
		
		public RegResult(String name, int userId) {
			this.name = name;
			this.userId = userId;
		}
		
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getUserId() {
			return userId;
		}
		public void setUserId(int userId) {
			this.userId = userId;
		}
	}
}
