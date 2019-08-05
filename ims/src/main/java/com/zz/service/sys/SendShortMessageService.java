package com.zz.service.sys;

import com.zz.po.commons.Result;
public interface SendShortMessageService {
	
	/**
	 * 发送短信的统一服务接口
	 * 调用此接口前必须自己判断是内部短信还是外部短信 并新增一条记录到数据库 然后把该记录id传进来
	 * @param phone 为短信接收人的手机号码
	 * @param message 为发送的短信内容
	 * @param seqid 为短信识别号
	 * @return 返回 num 发送短信数量  resultXmlStr 发送短信回来的值
	 * @throws Exception
	 */
	Result<String> sendMessage(String phone,String message,long seqid) throws Exception;
	
	/**
	 * 发送短信的统一服务接口
	 * 此接口封装了整个短信发送流程：添加短信记录到数据库，发送短信给运营商，修改短信记录的发送状态
	 * @param phone 为短信接收人的手机号码
	 * @param message 为发送的短信内容
	 * @param object 内/外部短信对象
	 * @param inOutType 内部短信：1 外部短信：2
	 * @return 返回 num 发送短信数量  resultXmlStr 发送短信回来的值
	 * @throws Exception
	 */
	Result<String> sendMessage(String phone,String message,Object object,Integer inOutType) throws Exception;
}
