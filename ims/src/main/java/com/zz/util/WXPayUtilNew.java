package com.zz.util;

import com.zz.other.Syslog;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class WXPayUtilNew {

	// md5加密
		public static String md5(String str) {
			try {
				MessageDigest md5 = MessageDigest.getInstance("MD5");
				byte[] bytes = md5.digest(str.getBytes("UTF-8"));
				StringBuffer hexValue = new StringBuffer();
				for (int i = 0; i < bytes.length; i++) {
					int val = ((int) bytes[i]) & 0xff;
					if (val < 16) {
						hexValue.append("0");
					}
					hexValue.append(Integer.toHexString(val));
				}
				return hexValue.toString().toUpperCase();
			} catch (Exception e) {
				e.printStackTrace();
				Syslog.writeErr(e);
			}
			return "";
		}

		// 签名算法sign
		public static String sign(Map map, String key) {
			Set set = map.keySet();
			Iterator iterator = set.iterator();
			List list = new ArrayList();
			while (iterator.hasNext()) {
				String _key = iterator.next().toString();
				if (("".equals(map.get(_key))) || (null == map.get(_key))) {
					continue;
				}
				if ("sign".equals(_key)) {
					continue;
				}
				list.add(_key);
			}

			Object[] objects = list.toArray();
			Arrays.sort(objects);

			StringBuffer strb = new StringBuffer();
			for (int i = 0; i < objects.length; i++) {
				strb.append(objects[i] + "=" + map.get(objects[i]) + "&");
			}
			strb.append("key=" + key);
			return md5(strb.toString());
		}

		// getXML
		public static String getXML(Map map, String key) throws Exception {

			Iterator iterator = map.keySet().iterator();
			StringBuffer strb = new StringBuffer();
			StringBuffer _strb = new StringBuffer();
			while (iterator.hasNext()) {
				String _key = iterator.next().toString();
				String _val = map.get(_key).toString();
				_strb.append("<" + _key + ">" + _val + "</" + _key + ">");
			}
			strb.append("<xml>");
			strb.append(_strb);
			strb.append("</xml>");
			return strb.toString();
		}

		public static String post(String reqmap, String strUrl) {

			URL url = null;
			HttpURLConnection connection = null;
			BufferedReader breader = null;
			StringBuffer strb = new StringBuffer();

			try {
				url = new URL(strUrl);
				// url = new URL(strUrl);
				connection = (HttpURLConnection) url.openConnection();
				connection.setRequestMethod("POST");
				connection.setDoOutput(true);
				connection.setDoInput(true);
				connection.setUseCaches(false);
				connection.setRequestProperty("Content-Type", "text/html");
				connection.connect();

				strb = new StringBuffer();
				OutputStreamWriter writer = new OutputStreamWriter(
						connection.getOutputStream(), "UTF-8");
				writer.write(reqmap);
				writer.flush();
				writer.close();

				breader = new BufferedReader(new InputStreamReader(
						connection.getInputStream(), "UTF-8"));
				String str;
				while ((str = breader.readLine()) != null) {
					strb.append(str);
				}
			} catch (Exception e) {
				e.printStackTrace();Syslog.writeErr(e);
			}
			try {
				breader.close();
			} catch (IOException e) {
				e.printStackTrace();Syslog.writeErr(e);
			}
			connection.disconnect();
			return strb.toString();
		}
}