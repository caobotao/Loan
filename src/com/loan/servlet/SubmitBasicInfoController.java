package com.loan.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
@WebServlet("/mobile/submitapplication")
public class SubmitBasicInfoController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SubmitBasicInfoController() {
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
		String userId = request.getParameter("userId");
//		String busimessName = request.getParameter("busimessName");
		String name = request.getParameter("name");
		String age = request.getParameter("age");
		String provinceCode = request.getParameter("provinceCode");
		String cityCode = request.getParameter("cityCode");
		String districtCode = request.getParameter("districtCode");
		String work = request.getParameter("work");
		String workName = request.getParameter("workName");
		String monthCost = request.getParameter("monthCost");
		String payWay = request.getParameter("payWay");

		
		String shebao = request.getParameter("shebao");
		String gongjijin = request.getParameter("gongjijin");
		String shangbao = request.getParameter("shangbao");
		String weilidai = request.getParameter("weilidai");
		String house = request.getParameter("house");
		String houseMortgage = request.getParameter("houseMortgage");
		String car = request.getParameter("car");
		String carMortgage = request.getParameter("carMortgage");
		String amount = request.getParameter("amount");
		String purpose = request.getParameter("purpose");
		
		Phone_reg reg = new Phone_reg(userId, name, age,
				provinceCode, cityCode, districtCode, work,
				workName, monthCost, payWay, amount, shebao,
				gongjijin, shangbao, weilidai, house,
				houseMortgage, car, carMortgage, purpose,
				XwhTool.getCurrentDateTimeValue());
		try {
			// 记录log
			Log4j.NAME.BASIC_INFO_LOG.debug(new Gson().toJson(reg));
			// 记录数据库
			LoanDao.instance.saveOrUpdate(reg);
		} catch (Exception e) {
			Log4j.NAME.BASIC_INFO_LOG.debug(Log4j.getExceptionInfo(e));
			e.printStackTrace();
		}
		Res res = new Res();
		res.setCode(0);
		res.setMessage("申请成功！");
		res.setSuccess(true);
		LoanHttpUtil.sendResult(res, response);
	}
}
