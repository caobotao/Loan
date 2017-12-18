package com.loan.tool.config;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * 配置文件路径
 * 
 * @author xuweihua
 * 
 */
public class ReadConfig
{
	// 配置文件路径
	private static final String CONFIG_FILE_NAME = "config.properties";

	// 唯一事例
	private static ReadConfig instance;
	// 配置缓存
	private Map<String, String> configMap;
	//配置某个CP只显示某些分包
	private static Map<Integer, String> subGameMap;
	
	static
	{
		init();
	}

	/**
	 * 初始化配置
	 */
	public static void init()
	{
		instance = new ReadConfig();
	}
	/**
	 * 获取CP可查看的分包串码
	 * 格式：1003@'reGpUygz','XY_xsxbj'
	 * @param cpId
	 * @return
	 */
	public static String getSubSeqInForCp(int cpId){
		return subGameMap.get(cpId);
	}
	
	private ReadConfig()
	{
		configMap = new HashMap<String, String>();
		try
		{
			InputStream in = ReadConfig.class.getResourceAsStream("/" + CONFIG_FILE_NAME);
			Properties properties = new Properties();
			properties.load(in);
			for (Object key : properties.keySet())
			{
				configMap.put((String) key, properties.getProperty((String) key));
			}
			in.close();
		} catch (Exception e)
		{
			e.printStackTrace();
		}
	}

	/**
	 * 进行匹配KEY值
	 * 
	 * @param key
	 * @return
	 */
	public static boolean containsKey(String key)
	{
		return instance.configMap.containsKey(key);
	}

	/**
	 * 获取values值
	 * 
	 * @param key
	 * @return
	 */
	public static String get(String key)
	{
		return instance.configMap.get(key);
	}
}
