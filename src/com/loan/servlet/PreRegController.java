package com.loan.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.loan.entity.Visit_record;
import com.loan.tool.LoanHttpUtil;
import com.loan.tool.XwhTool;
import com.loan.tool.db.LoanDao;
import com.loan.tool.log4j.Log4j;

/**
 * Servlet implementation class PreRegController
 */
@WebServlet("/preRegController")
public class PreRegController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public PreRegController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		// 访问记录
		String ua = request.getHeader("user-agent");
		String ip = LoanHttpUtil.getIp(request);
		String busimessName = request.getParameter("name");
		
		Visit_record record = new Visit_record(ua, ip, busimessName, XwhTool.getCurrentDateTimeValue());
		
		try {
			// 记录log
			Log4j.NAME.REG_VISIT_LOG.debug(new Gson().toJson(record));
			// 记录数据库
			LoanDao.instance.saveOrUpdate(record);
		} catch (Exception e) {
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
			e.printStackTrace();
		}
		
		request.getRequestDispatcher("WEB-INF/Register.jsp").forward(request,response);
	}

}
