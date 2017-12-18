package com.loan.tool;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.loan.tool.db.OpDbConnector;

@WebListener
public class Listener implements ServletContextListener
{
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0)
	{
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0)
	{
		OpDbConnector.init();
	}

}
