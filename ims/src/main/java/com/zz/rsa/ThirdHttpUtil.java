package com.zz.rsa;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContextBuilder;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ThirdHttpUtil {

	private static Logger logger = LoggerFactory.getLogger(ThirdHttpUtil.class);
	private static int TIMEOUT = 10000;

	public static JSONObject getJSONResponse(String url, Map<String, String> parameters) {
		boolean ssl = url.startsWith("https://");

		// create the httpClientBuilder
		RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(TIMEOUT).setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT).build();

		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);
		if (ssl) {
			SSLContextBuilder builder = new SSLContextBuilder();
			try {
				builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClientBuilder.setSSLSocketFactory(sslsf);
			} catch (Exception e) {
				logger.error("创建SSLcontext失败", e);
			}
		}

		CloseableHttpClient httpClient = httpClientBuilder.build();

		HttpGet getRequest = new HttpGet(getFormattedUrl(url, parameters));

		CloseableHttpResponse response = null;
		InputStreamReader reader = null;
		try {
			response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(String.format("获取数据失败 \nurl = \"%s\" \nmethod = \"GET\" \nresponse code = \"%s\" \nreason = \"%s\"", getRequest.getURI().toString(), response.getStatusLine()
						.getStatusCode(), response.getStatusLine().getReasonPhrase()));
				return null;
			}
			
			reader = new InputStreamReader(response.getEntity().getContent());
			
			
			BufferedReader br = new BufferedReader(reader);
			String output = "";
			StringBuilder sbReturn = new StringBuilder();
			while ((output = br.readLine()) != null) {
				sbReturn.append(output);
			}

			return JSONObject.fromObject(sbReturn.toString());
		} catch (Exception e) {
			logger.error(String.format("获取数据失败  \nurl = \"%s\" \nmethod = \"GET\"", getRequest.getURI().toString()), e);
		} finally {
			try {
				reader.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.error("关闭GET请求失败", e);
				}
			}
			
		}

		return null;
	}

	public static JSONObject getJSONResponse(String url) {
		boolean ssl = url.startsWith("https://");

		// create the httpClientBuilder
		RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(TIMEOUT).setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT).build();

		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);
		if (ssl) {
			SSLContextBuilder builder = new SSLContextBuilder();
			try {
				builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClientBuilder.setSSLSocketFactory(sslsf);
			} catch (Exception e) {
				logger.error("创建SSLcontext失败", e);
			}
		}

		CloseableHttpClient httpClient = httpClientBuilder.build();

		HttpGet getRequest = new HttpGet(url);
		InputStreamReader reader = null;
		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(String.format("获取数据失败 \nurl = \"%s\" \nmethod = \"GET\" \nresponse code = \"%s\" \nreason = \"%s\"", getRequest.getURI().toString(), response.getStatusLine()
						.getStatusCode(), response.getStatusLine().getReasonPhrase()));
				return null;
			}
			reader = new InputStreamReader(response.getEntity().getContent());
			BufferedReader br = new BufferedReader(reader);
			String output = "";
			StringBuilder sbReturn = new StringBuilder();
			while ((output = br.readLine()) != null) {
				sbReturn.append(output);
			}

			return JSONObject.fromObject(sbReturn.toString());

		} catch (Exception e) {
			logger.error(String.format("获取数据失败  \nurl = \"%s\" \nmethod = \"GET\"", getRequest.getURI().toString()), e);
		} finally {
			try {
				reader.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.error("关闭POST请求失败", e);
				}
			}
		}

		return null;
	}

	public static JSONObject postJSONResponse(String url) {
		boolean ssl = url.startsWith("https://");

		// create the httpClientBuilder
		RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(TIMEOUT).setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT).build();

		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);
		if (ssl) {
			SSLContextBuilder builder = new SSLContextBuilder();
			try {
				builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClientBuilder.setSSLSocketFactory(sslsf);
			} catch (Exception e) {
				logger.error("创建SSLcontext失败", e);
			}
		}

		CloseableHttpClient httpClient = httpClientBuilder.build();

		HttpPost postRequest = new HttpPost(url);
		InputStreamReader reader = null;
		CloseableHttpResponse response = null;
		try {
			response = httpClient.execute(postRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(String.format("获取数据失败 \nurl = \"%s\" \nmethod = \"POST\" \nresponse code = \"%s\" \nreason = \"%s\"", postRequest.getURI().toString(), response.getStatusLine()
						.getStatusCode(), response.getStatusLine().getReasonPhrase()));
				return null;
			}
			reader = new InputStreamReader(response.getEntity().getContent());
			BufferedReader br = new BufferedReader(reader);
			String output = "";
			StringBuilder sbReturn = new StringBuilder();
			while ((output = br.readLine()) != null) {
				sbReturn.append(output);
			}

			JSONObject returnValue = new JSONObject();
			returnValue.put("result", sbReturn.toString());
			return returnValue;

		} catch (Exception e) {
			logger.error(String.format("获取数据失败  \nurl = \"%s\" \nmethod = \"POST\"", postRequest.getURI().toString()), e);
		} finally {
			try {
				reader.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.error("关闭POST请求失败", e);
				}
				;
			}
		}

		return null;
	}

	public static JSONObject postJSONResponse(String url, Map<String, String> parameters, String body) throws UnsupportedEncodingException {
		boolean ssl = url.startsWith("https://");

		// create the httpClientBuilder
		RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(TIMEOUT).setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT).build();

		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);
		if (ssl) {
			SSLContextBuilder builder = new SSLContextBuilder();
			try {
				builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClientBuilder.setSSLSocketFactory(sslsf);
			} catch (Exception e) {
				logger.error("创建SSLcontext失败", e);
			}
		}

		CloseableHttpClient httpClient = httpClientBuilder.build();

		HttpPost postRequest = new HttpPost(getFormattedUrl(url, parameters));
		postRequest.setEntity(new StringEntity(body, "UTF-8"));
		postRequest.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");

		CloseableHttpResponse response = null;
		InputStreamReader reader = null;
		try {
			response = httpClient.execute(postRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(String.format("获取数据失败 \nurl = \"%s\" \nmethod = \"POST\" \nresponse code = \"%s\" \nreason = \"%s\"", postRequest.getURI().toString(), response.getStatusLine()
						.getStatusCode(), response.getStatusLine().getReasonPhrase()));
				// return null;
			}
			reader = new InputStreamReader(response.getEntity().getContent());
			BufferedReader br = new BufferedReader(reader);
			String output = "";
			StringBuilder sbReturn = new StringBuilder();
			while ((output = br.readLine()) != null) {
				sbReturn.append(output);
			}

			return JSONObject.fromObject(sbReturn.toString());

		} catch (Exception e) {
			logger.error(String.format("获取数据失败  \nurl = \"%s\" \nmethod = \"POST\"", postRequest.getURI().toString()), e);
		} finally {
			try {
				reader.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.error("关闭POST请求失败", e);
				}
			}
		}

		return null;
	}

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 *             *
	 *******************************************************/
	public static String postResponse(String url, Map<String, String> parameters) throws ClientProtocolException, IOException {
		boolean ssl = url.startsWith("https://");

		// create the httpClientBuilder
		RequestConfig requestConfig = RequestConfig.custom().setConnectionRequestTimeout(TIMEOUT).setConnectTimeout(TIMEOUT).setSocketTimeout(TIMEOUT).build();

		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		httpClientBuilder.setDefaultRequestConfig(requestConfig);
		if (ssl) {
			SSLContextBuilder builder = new SSLContextBuilder();
			try {
				builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
				SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build(), SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
				httpClientBuilder.setSSLSocketFactory(sslsf);
			} catch (Exception e) {
				logger.error("创建SSLcontext失败", e);
			}
		}

		CloseableHttpClient httpClient = httpClientBuilder.build();

		HttpPost method = new HttpPost(url);
		// ////////////////////////////////////////////
		List<NameValuePair> params = new ArrayList<NameValuePair>();
		// 建立一个NameValuePair数组，用于存储欲传送的参数
		if (parameters != null && parameters.size() > 0) {
			for (String key : parameters.keySet()) {
				params.add(new BasicNameValuePair(key, parameters.get(key)));
			}
		}
		// 添加参数
		method.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));

		// 设置编码
		CloseableHttpResponse response = httpClient.execute(method);

		int statusCode = response.getStatusLine().getStatusCode();

		method.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
		InputStreamReader reader = null;
		// CloseableHttpResponse httpResponse = null;
		try {

			if (response.getStatusLine().getStatusCode() != 200) {
				logger.error(String.format("获取数据失败 \nurl = \"%s\" \nmethod = \"POST\" \nresponse code = \"%s\" \nreason = \"%s\"", method.getURI().toString(),
						response.getStatusLine().getStatusCode(), response.getStatusLine().getReasonPhrase()));
				// return null;
			}
			reader = new InputStreamReader(response.getEntity().getContent());
			BufferedReader br = new BufferedReader(reader);
			String output = "";
			StringBuilder sbReturn = new StringBuilder();
			while ((output = br.readLine()) != null) {
				sbReturn.append(output);
			}

			return sbReturn.toString();

		} catch (Exception e) {
			logger.error(String.format("获取数据失败  \nurl = \"%s\" \nmethod = \"POST\"", method.getURI().toString()), e);
		} finally {
			try {
				reader.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if (response != null) {
				try {
					response.close();
				} catch (IOException e) {
					logger.error("关闭POST请求失败", e);
				}
			}
		}

		return null;
	}

	/**********************************************************/

	private static String getFormattedUrl(String baseUrl, Map<String, String> parameters) {
		String returnValue = baseUrl;
		if (parameters.size() > 0) {
			returnValue = returnValue + "?";
		}
		for (String key : parameters.keySet()) {
			returnValue = String.format("%s%s=%s&", returnValue, key, parameters.get(key));
		}

		return StringUtils.removeEnd(returnValue, "&");
	}
}
