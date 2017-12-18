/**
 * 
 */
package com.loan.tool.db;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.logicalcobwebs.proxool.configuration.JAXPConfigurator;
import org.xml.sax.InputSource;

import com.loan.tool.log4j.Log4j;

public class OpDbConnector
{
	public interface NAME{static final String DB_MASTER = "db_master.xml";}

	public interface DB_ALIAS{
		static final String DB_LOAN="db_loan"; 
	}

	/**
	 * 获取主服务器连接的方法
	 * 
	 * @return 得到的连接句柄
	 */
	public static Connection getKenshinSdkConn()
	{
		Connection conn = null;
		
		try
		{
			
			conn = DriverManager.getConnection("proxool." + DB_ALIAS.DB_LOAN);
			
			if (conn == null)
			{
				Log4j.NAME.SQLERROR_LOG.debug("getMasterConnection == null");
			}
		} catch (SQLException e)
		{
			Log4j.NAME.SQLERROR_LOG.debug("getMasterConnection == SQLException");
			// TODO Auto-generated catch block
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}
		
		return conn;
	}
	/**
	 * 获取主服务器连接的方法
	 * 
	 * @return 得到的连接句柄
	 */
	public static Connection getConnection(String alias)
	{
		Connection conn = null;

		try
		{

			conn = DriverManager.getConnection("proxool." + alias);

			if (conn == null)
			{
				Log4j.NAME.SQLERROR_LOG.debug("getMasterConnection == null");
			}
		} catch (SQLException e)
		{
			Log4j.NAME.SQLERROR_LOG.debug("getMasterConnection == SQLException");
			// TODO Auto-generated catch block
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}

		return conn;
	}

	/**
	 * 关闭一个连接的方法
	 * 
	 * @param conn
	 *            连接句柄信息
	 */
	public static void closeConnection(Connection conn)
	{
		try
		{
			if (conn != null)
			{
				conn.close();
			}
		} catch (SQLException e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}
	}

	/**
	 * 提交一次查询的方法
	 * 
	 * @param conn
	 *            连接信息
	 * @param sqlString
	 *            查询语句信息
	 */
	public static boolean executeQueryNothing(Connection conn, String sqlString)
	{
		try
		{
			Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			stmt.execute(sqlString);
			stmt.close();
			return true;
		} catch (Exception e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}

		return false;
	}

	/**
	 * 提交一次查询的方法
	 * 
	 * @param conn
	 *            连接信息
	 * @param sqlString
	 *            查询语句信息
	 * @return 得到的结果集
	 */
	public static ResultSet executeQuery(Connection conn, String sqlString)
	{
		try
		{
			if (conn == null)
			{
				Log4j.NAME.SQLERROR_LOG.debug("executeQuery conn== null");
			}

			Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);

			if (stmt == null)
			{
				Log4j.NAME.SQLERROR_LOG.debug("executeQuery stmt== null");
			}

			return stmt.executeQuery(sqlString);
		} catch (SQLException e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}

		return null;
	}

	/**
	 * 执行SQL指令
	 * 
	 * @param SQL
	 * @return
	 */
	public static int execSQLCMDInfo(Connection conn, String SQL)
	{
		int result = 0;
		try
		{
			Statement statemenet = conn.createStatement();
			result = statemenet.executeUpdate(SQL);
			statemenet.close();
		} catch (Exception e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		} finally
		{
			if (conn != null)
			{
				OpDbConnector.closeConnection(conn);
			}
		}

		return result;
	}
	/**
	 * 执行SQL指令返回主键
	 * 
	 * @param SQL
	 * @return
	 */
	public static int execSQLCMDGenKey(Connection conn, String SQL)
	{
		int genKey = 0;
		ResultSet rs = null; 
		try
		{
			Statement statemenet = conn.createStatement(java.sql.ResultSet.TYPE_FORWARD_ONLY,  
                    java.sql.ResultSet.CONCUR_UPDATABLE); 
			statemenet.execute(SQL, Statement.RETURN_GENERATED_KEYS);
			
		    rs = statemenet.getGeneratedKeys();   
		    if(rs.next())
		    {
		    	genKey = rs.getInt(1);
		    }
			statemenet.close();
		} catch (Exception e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		} finally
		{
			if (conn != null)
			{
				OpDbConnector.closeConnection(conn);
			}
		}
		
		return genKey;
	}
	/**
	 * 执行SQL指令(不关闭链接)
	 * 
	 * @param SQL
	 * @return
	 */
	public static int execSQLCMDInfoNotClose(Connection conn, String SQL)
	{
		int result = 0;
		try
		{
			Statement statemenet = conn.createStatement();
			result = statemenet.executeUpdate(SQL);
			statemenet.close();
		} catch (Exception e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}
		
		return result;
	}

	/**
	 * 连接池初始化的方法
	 */
	public static void init()
	{
		try
		{
			{
				InputStream in = OpDbConnector.class.getResourceAsStream("/" + NAME.DB_MASTER);
				InputSource is = new InputSource(in);
				JAXPConfigurator.configure(is, false);

			}
			Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");
		} catch (Exception e)
		{
			Log4j.NAME.SQLERROR_LOG.debug(Log4j.getExceptionInfo(e));
		}
	}
}
