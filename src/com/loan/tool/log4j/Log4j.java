package com.loan.tool.log4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * LOG配置
 * 
 * @author user
 * 
 */
public class Log4j
{
	public interface NAME{
	static Logger EXCEPTION_LOG = LoggerFactory.getLogger("exceptionLog");

	static Logger SQLERROR_LOG = LoggerFactory.getLogger("SQLErrorLog");

	static Logger STDOUTS_LOG = LoggerFactory.getLogger("stdoutsLog");
	
	static Logger REG_VISIT_LOG = LoggerFactory.getLogger("regVisitLog");
	
	static Logger SMS_SEND_LOG = LoggerFactory.getLogger("smsSendLog");
	
	static Logger REGISTER_LOG = LoggerFactory.getLogger("registerLog");
	
	static Logger BASIC_INFO_LOG = LoggerFactory.getLogger("basicInfoLog");
}

	/**
	 * 获取异常具体信息
	 * 
	 * @param e
	 * @return
	 */
	public static String getExceptionInfo(Exception e)
	{
		StringBuffer exception = new StringBuffer();
		exception.append(e.getMessage() + "\n");
		StackTraceElement[] messages = e.getStackTrace();
		for (StackTraceElement stackTraceElement : messages)
		{
			exception.append(stackTraceElement + "\n");
		}
		return exception.toString();
	}
}
