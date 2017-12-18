package com.loan.tool;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoanHttpUtil
{


	/**
	 * 进行一次GET类型的 HTTP 连接的方法
	 * 
	 * @param urlParam
	 *            链接参数
	 */
	public static String sendGet(String urlParam) throws Exception
	{
		byte[] resultByte = makeHttpConnect(urlParam, null, null, "GET", "utf-8", null, 60000, 60000);
		if (resultByte != null)
		{
			return new String(resultByte, "utf-8");
		}
		return null;
	}

	/**
	 * 表单发送数据
	 * 
	 * @param url
	 *            链接地址
	 * @param param
	 *            参数
	 * 
	 */
	public static String sendPost(String urlParam, String json) throws Exception
	{
		byte[] buffer = null;
		if(json != null)
		{
			buffer = json.getBytes("utf-8");
		}
		byte[] resultByte = makeHttpConnect(urlParam, null, null, "POST", "utf-8", buffer, 0, 0);
		if (resultByte != null)
		{
			return new String(resultByte, "utf-8");
		}
		return null;
	}

	/**
	 * json格式发送POST请求
	 * 
	 * @param url
	 *            访问地址
	 * @param param
	 *            JSON对象
	 * @param charset
	 *            解析编码格式
	 * @return
	 */
	public static String sendPostByGson(String url, Object param, String charset) throws Exception
	{
		byte[] sendByte = XwhTool.getGsonValue(param).getBytes();
		byte[] resultByte = makeHttpConnect(url, "close", "application/octet-stream", "POST", charset, sendByte, 60000,
				30000);
		if (resultByte != null)
		{
			return new String(resultByte, charset);
		}
		return null;
	}

	/**
	 * 操作一次HTTP链接
	 * 
	 * @param urlParam
	 *            访问链接地址
	 * @param connection
	 *            当次链接状态，HTTP1.1默认为保持（Keep-Alive），设置Connection: Close关闭
	 * @param contentType
	 *            [type]/[subtype]，后面的文档属于什么MIME类型
	 * @param method
	 *            当次访问访问类型
	 * @param charset
	 *            编号格式
	 * @param buffer
	 *            访问参数
	 * @param connectTimeout
	 *            链接超时时间
	 * @param readTimeout
	 *            读取超时时间
	 * @return
	 */
	public static byte[] makeHttpConnect(String urlParam, String connection, String contentType, String method,
			String charset, byte[] buffer, int connectTimeout, int readTimeout)
	{
		try
		{
			URL url = new URL(urlParam);
			HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
			httpConn.setDoOutput(true);
			httpConn.setDoInput(true);
			httpConn.setUseCaches(false);
			if (connectTimeout > 0)
			{
				httpConn.setConnectTimeout(connectTimeout);
			}
			if (readTimeout > 0)
			{
				httpConn.setReadTimeout(readTimeout);
			}

			httpConn.setRequestMethod(method);
			if (contentType != null)
			{
				httpConn.setRequestProperty("Content-Type", contentType);
			}
			if (connection != null)
			{
				httpConn.setRequestProperty("Connection", connection);
			}

			httpConn.setRequestProperty("Charset", charset);
			if (buffer != null)
			{
				httpConn.setRequestProperty("Content-length", String.valueOf(buffer.length));
				OutputStream out = new DataOutputStream(httpConn.getOutputStream());
				out.write(buffer);
				out.flush();
				out.close();
			}
			else 
			{
				httpConn.setRequestProperty("Content-length", "0");
				OutputStream out = new DataOutputStream(httpConn.getOutputStream());
				out.write(0);
				out.flush();
				out.close();
			}
			int responseCode = httpConn.getResponseCode();
			if (HttpURLConnection.HTTP_OK == responseCode)
			{
				byte[] readBytes = new byte[4 * 1024];
				int readed = 0;
				InputStream inStream = httpConn.getInputStream();
				ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
				while ((readed = inStream.read(readBytes)) != -1)
				{
					byteStream.write(readBytes, 0, readed);
				}
				byte[] b = byteStream.toByteArray();
				byteStream.close();
				inStream.close();
				return b;
			}
		} catch (IOException e)
		{
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 通过servlet中request来进行获取地域
	 * 
	 * @param request
	 * @return
	 */
	public static String getIp(HttpServletRequest request)
	{
		String ip = null;
		try {
			ip = request.getHeader("x-forwarded-for");
			if (ip == null || ip.equals("unknown"))
			{
				ip = request.getHeader("Proxy-Client-IP");
			}
			if (ip == null || ip.equals("unknown"))
			{
				ip = request.getHeader("WL-Proxy-Client-IP");
			}
			if (ip == null || ip.equals("unknown"))
			{
				ip = request.getRemoteAddr();
			}
			if (ip != null)
			{
				String[] ips = ip.split(",");
				if (ips != null && ips.length > 0)
				{
					ip = ips[0];
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ip;
	}

	/**
	 * 解析客户端发送加密协议
	 * 
	 * @param request
	 * @return
	 */
	public static String getClientUnencryCode(HttpServletRequest request)
	{
		String xmlInfo = null;
		// 记录协议开始时间
		int size = -1;

		try
		{
			// 获取HTTP请求流
			ServletInputStream inStream = request.getInputStream();
			// 获取HTTP请求流长度
			size = request.getContentLength();
			// 用于缓存每次读取的数据
			byte[] buffer = new byte[size];
			// inStream.read(buffer, 0, size);
			int count = 0;
			int offset = 0;
			// 优化从客户端获取代码输入流效率
			while (count >= 0)
			{
				count = inStream.read(buffer, offset, 1024);
				if (count == -1)
				{
					break;
				}
				offset += count;
			}
			try
			{
				xmlInfo = new String(buffer, "utf-8");
				xmlInfo = URLDecoder.decode(xmlInfo, "utf-8");
			}
			catch (Exception e)
			{
			}
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		return xmlInfo;
	}

	/**
	 * 回复对方请求结果
	 * 
	 * @param response
	 * @param result
	 * @throws IOException
	 */
	public static void returnResponseInfo(HttpServletResponse response, String responseResult)
			throws IOException
	{
		response.setContentType("text/html;charset=utf-8");
		response.setStatus(HttpServletResponse.SC_OK);
		ServletOutputStream out = response.getOutputStream();
		byte[] bytes = responseResult.getBytes();
		out.write(bytes);
		out.flush();
		out.close();
	}

	/**
	 * 发送结果集
	 * 
	 * @param resultObject
	 * @param response
	 * @throws IOException
	 */
	public static void sendResult(Object resultObject, HttpServletResponse response)
			throws IOException {
		String json = null;
		if (resultObject instanceof String) 
		{
			json = (String) resultObject;
		} else 
		{
			json = XwhTool.getGsonValue(resultObject, "yyyy-MM-dd");
		}
		OutputStream out = response.getOutputStream();
		out.write(json.getBytes("utf-8"));
		out.close();
	}
}
