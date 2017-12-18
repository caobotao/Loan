package com.loan.tool.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.Vector;

import com.loan.tool.ResultSetMapper;

public class LoanDao extends ResultSetMapper
{
	public static LoanDao instance;
	
	public static int DEFAULT_INIT_CP_ID = 1000;
	
	static
	{
		instance = new LoanDao();
	}
	
	private LoanDao()
	{
		try
		{
			initCache();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@Override
	public String alias()
	{
		return OpDbConnector.DB_ALIAS.DB_LOAN;
	}

	@Override
	public ResultSet setResultSet(Connection conn,String sql)
	{
		return OpDbConnector.executeQuery(conn, sql);
	}
	
	/**
	 * 获取即将生成的最大的id
	 */
	public int getNextMaxId(String table, String generateCol){
		Connection conn = null;
		try {
			conn = LoanDao.instance.openConnection();
			String sql = "SELECT MAX("+generateCol+") + 1 next_max_id FROM " + table;
			ResultSet rs = LoanDao.instance.setResultSet(conn, sql);
			if(rs.next()){
				return rs.getInt("next_max_id");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			LoanDao.instance.closeConnection(conn);
		}
		return -1;
	}

	@Override
	public void closeConnection(Connection conn)
	{
		OpDbConnector.closeConnection(conn);
	}

	@Override
	public Connection openConnection()
	{
		return OpDbConnector.getConnection(alias());
	}

	@Override
	public int execSQLCMDInfo(String SQL)
	{
		Connection conn = openConnection();
		return OpDbConnector.execSQLCMDInfo(conn, SQL);
	}
	
	public int execSQLCMDInfoGenKey(String SQL)
	{
		Connection conn = openConnection();
		return OpDbConnector.execSQLCMDGenKey(conn, SQL);
	}
	
	@Override
	public Vector<Class<?>> getCacheClass()
	{
		Vector<Class<?>> vector = new Vector<>();
		return vector;
	}

}