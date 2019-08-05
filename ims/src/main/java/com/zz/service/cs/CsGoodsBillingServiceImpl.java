package com.zz.service.cs;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;

import javax.annotation.Resource;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.cs.*;
import com.zz.mapper.info.InfoFinancialAccountMapper;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.pay.strategy.OrangeCheckOrder;
import com.zz.pay.strategy.OrangeQRCodePay;
import com.zz.pay.strategy.OrangeRefundOrder;
import com.zz.pay.strategy.OrangeWxRefundOrder;
import com.zz.pay.strategy.WxPay;
import com.zz.po.commons.Result;
import com.zz.po.cs.*;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.service.journal.FinancialService;

public class CsGoodsBillingServiceImpl implements CsGoodsBillingService{
	
	private CsGoodsBillingMapper csGoodsBillingMapper;
	
	@Resource
	private CsGoodsMapper csGoodsMapper;
	
	@Resource
	private CsGoodsPurchaseMapper csGoodsPurchaseMapper;
	
	@Resource
	private InfoHouse4rentMapper infoHouse4rentMapper;
	
	@Resource
	private JournalFinancialMapper journalFinancialMapper;
	
	@Resource
	private InfoFinancialAccountMapper infoFinancialAccountMapper;
	
	@Resource
	private FinancialService financialService;
	
	@Resource
	private CsGoodsSellMapper csGoodsSellMapper;

	@Resource
	private CsGoodsDeviceRelationMapper csGoodsDeviceRelationMapper;

	@Resource
	private CsGoodsCategoryMapper csGoodsCategoryMapper;
	

	public void setCsGoodsBillingMapper(CsGoodsBillingMapper csGoodsBillingMapper) {
		this.csGoodsBillingMapper = csGoodsBillingMapper;
	}

	@Override
	public List<CsGoodsBilling> listOrder(CsGoodsBilling csGoodsBilling) throws Exception {
		return csGoodsBillingMapper.listCsGoodsBilling(csGoodsBilling);
	}

	@Override
	public List<CsGoodsBilling> operatingOrder(CsGoodsBilling csGoodsBilling) throws Exception {
		if(csGoodsBilling.getType() == 1){
			csGoodsBilling.setCgbState("已接单");
			csGoodsBilling.setCgbAcceptTime(getNewTime());
		}else if(csGoodsBilling.getType() == 2){
			csGoodsBilling.setCgbState("配送中");
			csGoodsBilling.setCgbSendTime(getNewTime());
			JSONArray goodsList = JSONArray.parseArray(csGoodsBilling.getGoodsRows());
			for (int i = 0; i < goodsList.size();i++){
				JSONObject json = JSONObject.parseObject(goodsList.getString(i));
				if(json.get("cgSn").equals("1")){
					JSONArray snList = (JSONArray) json.get("sn");
					CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
					for(int k = 0; k<snList.size();k++){
						JSONObject snJson = JSONObject.parseObject(snList.get(k).toString());
						csGoodsDeviceRelation.setCgdrSn(snJson.get("sn").toString());
						csGoodsDeviceRelation.setCgdrGoodsId((Integer) json.get("cgsGoodsId"));
						csGoodsDeviceRelation.setCgdrState(1);
						csGoodsDeviceRelation.setCgdrGoodsSellId((Integer) json.get("id"));
						csGoodsDeviceRelationMapper.updateState(csGoodsDeviceRelation);
					}
				}
			}
		}else if(csGoodsBilling.getType() == 3){
			Date date = new Date();
			SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
			String refundNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
			csGoodsBilling.setCgbState("退单完成");
			csGoodsBilling.setCgbPaymentStatus("已退款");
			csGoodsBilling.setCgbOverTime(getNewTime());
			csGoodsBilling.setCgbRefundNum(refundNum);
			Result<String> result = refundOrder(csGoodsBilling);
			if(result.getCode() != 1){
				throw new Exception(result.getMsg());
			}
			JSONArray goodsList = JSONArray.parseArray(csGoodsBilling.getOrderGoodsJson());
			for (int i = 0; i < goodsList.size();i++){
				JSONObject json = JSONObject.parseObject(goodsList.getString(i));
				if(json.get("cgSn").equals("1")){
					String newStr = json.get("cgsGoodsSn").toString().substring(1, json.get("cgsGoodsSn").toString().length()-1);
					JSONArray snList = JSONArray.parseArray(newStr);
					CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
					for(int k = 0; k<snList.size();k++){
						JSONObject snJson = JSONObject.parseObject(snList.get(k).toString());
						csGoodsDeviceRelation.setCgdrSn(snJson.get("sn").toString());
						csGoodsDeviceRelation.setCgdrGoodsId((Integer) json.get("cgsGoodsId"));
						csGoodsDeviceRelation.setCgdrState(0);
						csGoodsDeviceRelationMapper.updateState(csGoodsDeviceRelation);
					}
				}
			}
		}else if(csGoodsBilling.getType() == 4){
			csGoodsBilling.setCgbState("已送达");
			csGoodsBilling.setCgbOverTime(getNewTime());
		}else if(csGoodsBilling.getType() == 5){
			csGoodsBilling.setCgbState("配送中");
			csGoodsBilling.setCgbOverTime(getNewTime());
		}else if(csGoodsBilling.getType() == 6){
			if(csGoodsBilling.getCgbTransportationMethods().equals("自取")){
				csGoodsBilling.setCgbState("待自取");
			}else{
				csGoodsBilling.setCgbState("待发货");
			}
			csGoodsBilling.setCgbSendTime(getNewTime());
			JSONArray goodsList = JSONArray.parseArray(csGoodsBilling.getGoodsRows());
			for (int i = 0; i < goodsList.size();i++){
				JSONObject json = JSONObject.parseObject(goodsList.getString(i));
				if(json.get("cgSn").equals("1")){
					JSONArray snList = (JSONArray) json.get("sn");
					CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
					for(int k = 0; k<snList.size();k++){
						JSONObject snJson = JSONObject.parseObject(snList.get(k).toString());
						csGoodsDeviceRelation.setCgdrSn(snJson.get("cgSn").toString());
						csGoodsDeviceRelation.setCgdrGoodsId((Integer) json.get("cgsGoodsId"));
						csGoodsDeviceRelation.setCgdrState(1);
						csGoodsDeviceRelation.setCgdrGoodsSellId((Integer) json.get("id"));
						csGoodsDeviceRelationMapper.updateState(csGoodsDeviceRelation);
					}
				}
			}
		}
		csGoodsBillingMapper.updateByPrimaryKeySelective(csGoodsBilling);
		List<CsGoodsBilling> goodsBilling = csGoodsBillingMapper.selectByPrimaryKey(csGoodsBilling.getId());
		return goodsBilling;
	}
	
	/**
	 * 执行退单操作
	 * @param csGoodsBilling
	 * @throws Exception 
	 */
	private Result<String> refundOrder(CsGoodsBilling csGoodsBilling) throws Exception{
		
		List<CsGoodsSell> goodsSellList = JSON.parseArray(csGoodsBilling.getOrderGoodsJson(),CsGoodsSell.class);
		List<CsGoods> goodsList = new ArrayList<>();
		
		Integer operatorId = csGoodsBilling.getCgbOperatorId();
		String refundNum = csGoodsBilling.getCgbRefundNum();
		csGoodsBilling = csGoodsBillingMapper.selectByPrimaryKey(csGoodsBilling.getId()).get(0);
		csGoodsBilling.setCgbRefundNum(refundNum);
		for(CsGoodsSell goodsSell : goodsSellList){
			//获取订单中的货物数量
			CsGoods goods = new CsGoods();
			goods.setCgNum(goodsSell.getCgsSellNum());
			goods.setId(goodsSell.getCgsGoodsId());
			goodsList.add(goods);
		}
		
		//执行修改货物数量
		csGoodsMapper.updateList(goodsList);
		
		
		JournalFinancialExpand jfe = new JournalFinancialExpand();
		jfe.setJfTicketNumber(csGoodsBilling.getCgbOrderNum());
		List<JournalFinancialExpand> financialList = journalFinancialMapper.queryFinancialCommon(jfe);

		for(JournalFinancialExpand j : financialList){
			j.setJfTheCashierPeople(operatorId);
			financialService.financialCompensation(j);
		}
		System.out.println("支付类型 =================" + csGoodsBilling.getCgbPayType());
		if("扫码收银".equals(csGoodsBilling.getCgbPayType())){
			Result<String> result = orangeRefundOrder(csGoodsBilling);
			if(result.getCode() != 1){
				throw new Exception(result.getMsg());
			}
		}else if("在线支付".equals(csGoodsBilling.getCgbPayType())){
			Result<String> result = orangeWxRefundOrder(csGoodsBilling);
			if(result.getCode() != 1){
				throw new Exception(result.getMsg());
			}
		}
		
		return new Result<>(1,"成功",null);
	}
	
	/**
	 * 桔橙微信公众号统一退单
	 * @param csGoodsBilling
	 * @return
	 * @throws Exception
	 */
	private Result<String> orangeWxRefundOrder(CsGoodsBilling csGoodsBilling) throws Exception{
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String total_fee = computeMoney(csGoodsBilling.getCgbActualSpending());
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//商品描述
		sendMap.put("out_trade_no", csGoodsBilling.getCgbOrderNum());
		//总金额
		sendMap.put("total_fee", total_fee);
		//退单金额
		sendMap.put("refund_fee", total_fee);
		//退单单号
		sendMap.put("out_refund_no", csGoodsBilling.getCgbRefundNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		//由桔橙微信退款来实现退款接口
		wxPay.setRefundOrderStrategy(new OrangeWxRefundOrder());
		Result<String> result = wxPay.refundOrder(sendMap);
		return result;
	}
	
	/**
	 * 桔橙统一退单
	 * @param csGoodsBilling
	 * @return
	 * @throws Exception
	 */
	private Result<String> orangeRefundOrder(CsGoodsBilling csGoodsBilling) throws Exception{
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String total_fee = computeMoney(csGoodsBilling.getCgbActualSpending());
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//订单号
		sendMap.put("out_trade_no", csGoodsBilling.getCgbOrderNum());
		//总金额
		sendMap.put("total_fee", total_fee);
		//退单金额
		sendMap.put("refund_fee", total_fee);
		//退单单号
		sendMap.put("out_refund_no", csGoodsBilling.getCgbRefundNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		//由桔橙统一退款来实现退款接口
		wxPay.setRefundOrderStrategy(new OrangeRefundOrder());
		Result<String> result = wxPay.refundOrder(sendMap);
		return result;
	}
	
	/**
	 * 获取当前系统时间
	 * @return
	 */
	private String getNewTime(){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = df.format(new Date());
		return time;
	}

	@Override
	public Result<String> createBilling(CsGoodsBilling csGoodsBilling) throws Exception {
		String orderNum = "";
		if(csGoodsBilling.getType() == 1){
			//现金收银
			csGoodsBilling.setCgbPayType("现金收银");
			orderNum = createBill(csGoodsBilling);
			return new Result<String>(1,"收款成功",orderNum);
		}else if(csGoodsBilling.getType() == 2){
			//二维码收款
			csGoodsBilling.setCgbPayType("扫码收银");
			orderNum = createBill(csGoodsBilling);
			csGoodsBilling.setCgbOrderNum(orderNum);
			csGoodsBilling.setTotal_fee(csGoodsBilling.getCgbActualSpending());
			Result<String> result = qrCodePay(csGoodsBilling);
			if(result.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(csGoodsBilling);
				if(checkOrderResult.getCode() == 1){
					return new Result<String>(1,"收款成功",orderNum);
				}else{
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(result.getCode() != 1){
				throw new Exception(result.getMsg());
			}
			return result;
		}else{
			//台卡收银
			csGoodsBilling.setCgbPayType("台卡收银");
			orderNum = createBill(csGoodsBilling);
			return new Result<String>(1,"收款成功",orderNum);
		}
	}
	
	private Result<String> checkOrderThree(CsGoodsBilling csGoodsBilling) throws Exception{
		
		Integer cacheTime = 1000 * 10;
		Timer timer = new Timer();
		// (TimerTask task, long delay, long period)任务，延迟时间，多久执行
		
		boolean flag = false;
		for(int i = 0; i < 10;i++){
			Result<String> result = checkOrder(csGoodsBilling);
			if(result.getCode() == 1){
				flag = true;
				break;
			}
			Thread.sleep(1000 * 3);
		}
		
		if(flag){
			return new Result<String>(1,"成功","");
		}else{
			return new Result<String>(-1,"付款失败","");
		}
	}
	
	private Result<String> checkOrder(CsGoodsBilling csGoodsBilling) throws Exception{

		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");

		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//订单号
		sendMap.put("out_trade_no", csGoodsBilling.getCgbOrderNum());
		//微信支付key
		sendMap.put("key", key);
		
		WxPay wxPay = new WxPay();
		wxPay.setCheckOrderStrategy(new OrangeCheckOrder());
		Result<String> result = wxPay.checkOrder(sendMap);
		return result;
	}
	
	/**
	 * 将传入来的钱单位转化为分 
	 * @param money
	 * @return
	 */
	public String computeMoney(Double money){
		String total_fee = String.valueOf(money * 100);
		total_fee = total_fee.substring(0,total_fee.indexOf("."));
		return total_fee;
	}
	
	/**
	 * 调起微信二维码支付
	 * @param csGoodsBilling
	 * @throws Exception
	 */
	private Result<String> qrCodePay(CsGoodsBilling csGoodsBilling) throws Exception{
		
		String key = CommonMethodClass.getSessionByKey("wxKey");
		String mch_id = CommonMethodClass.getSessionByKey("wxMerchantNumber");
		String total_fee = computeMoney(csGoodsBilling.getTotal_fee());
		
		Map<String,String> sendMap = new HashMap<>();
		//商户号
		sendMap.put("mch_id", mch_id);
		//商品描述
		sendMap.put("body", csGoodsBilling.getGoodsBody());
		//总金额
		sendMap.put("total_fee", total_fee);
		//授权码
		sendMap.put("auth_code", csGoodsBilling.getAuthCode());
		//订单号
		sendMap.put("out_trade_no", csGoodsBilling.getCgbOrderNum());
		//微信支付key
		sendMap.put("key", key);

		WxPay wxPay = new WxPay();
		//由桔橙二维码支付来实现二维码支付的接口
		wxPay.setQrCodePay(new OrangeQRCodePay());
		Result<String> result = wxPay.qrCodePay(sendMap);
		return result;
	}
	
	/**
	 * 执行了 生成订单 修改货物数量 生成出货流水
	 * @param csGoodsBilling
	 * @return
	 * @throws Exception
	 */
	private String createBill(CsGoodsBilling csGoodsBilling) throws Exception{
		//生成订单
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String orderNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = sdf.format(date);
		
		csGoodsBilling.setCgbOrderNum(orderNum);
		csGoodsBilling.setCgbState("已完成");
		csGoodsBilling.setCgbAcceptTime(time);
		csGoodsBilling.setCgbOverTime(time);
		
		csGoodsBillingMapper.insertSelective(csGoodsBilling);
		
		List<CsGoods> newGoodsList = new ArrayList<>();

		List<CsGoods> goodsList = JSON.parseArray(csGoodsBilling.getOrderGoodsJson(), CsGoods.class);
		
		for(CsGoods g : goodsList){
			//获取订单中的货物数量
			CsGoods goods = new CsGoods();
			goods.setCgNum(g.getNum() * -1);
			goods.setId(g.getId());
			newGoodsList.add(goods);
			
			CsGoodsSell cgs = new CsGoodsSell();
			cgs.setCgsGoodsId(g.getId());
			cgs.setCgsOrderId(csGoodsBilling.getId());
			cgs.setCgsCategory(g.getCgcCategoryName());
			cgs.setCgsGoodsName(g.getCgName());
			cgs.setCgsSellNum(g.getNum());
			cgs.setCgsRemainingNum(g.getCgNum() - g.getNum());
			cgs.setCgsOriginalPrice(g.getCgOriginalPrice());
			cgs.setCgsCurrentPrice(g.getCgCurrentPrice());
			cgs.setCgsCostPrice(g.getCgCostPrice());
			cgs.setCgsPreferential(g.getCgPreferential());
			cgs.setCgsSellWell(g.getCgSellWell());
			cgs.setCgsOperatorId(csGoodsBilling.getCgbOperatorId());
			csGoodsSellMapper.insertSelective(cgs);
			int cgsId = cgs.getId();
			
			if(g.getCgSn().equals(1)){
				CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
				JSONArray snList = JSONArray.parseArray(g.getCgdrSn());
				for(int i=0;i<snList.size();i++){
					JSONObject snJson = JSONObject.parseObject(snList.get(i).toString());
					csGoodsDeviceRelation.setCgdrSn(snJson.get("sn").toString());
					csGoodsDeviceRelation.setCgdrGoodsId(g.getId());
					csGoodsDeviceRelation.setCgdrState(1);
					csGoodsDeviceRelation.setCgdrGoodsSellId(cgsId);
					csGoodsDeviceRelationMapper.updateState(csGoodsDeviceRelation);
				}
			}
		}
		//执行修改货物数量
		csGoodsMapper.updateList(newGoodsList);
		
		return orderNum;
	}

	@Override
	public CsGoodsBilling getOrderCount(CsGoodsBilling csGoodsBilling) throws Exception {
		return csGoodsBillingMapper.getOrderCount(csGoodsBilling);
	}

	@Override
	public CsGoodsBilling getMoneyTotal(CsGoodsBilling csGoodsBilling) throws Exception {
		return csGoodsBillingMapper.getMoney(csGoodsBilling);
	}

	@Override
	public CsGoodsBilling getProfit(CsGoodsBilling csGoodsBilling) throws Exception {
		return csGoodsBillingMapper.getProfit(csGoodsBilling);
	}

	@Override
	public Result<String> createPurchaseBilling(CsGoodsBilling csGoodsBilling) throws Exception {
		String orderNum = "";
		if(csGoodsBilling.getType() == 1){
			//现金收银
			csGoodsBilling.setCgbPayType("现金收银");
			orderNum = createPurchaseBill(csGoodsBilling);
			return new Result<String>(1,"收款成功",orderNum);
		}else if(csGoodsBilling.getType() == 2){
			//二维码收款
			csGoodsBilling.setCgbPayType("扫码收银");
			orderNum = createPurchaseBill(csGoodsBilling);
			csGoodsBilling.setCgbOrderNum(orderNum);
			Result<String> result = qrCodePay(csGoodsBilling);
			if(result.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(csGoodsBilling);
				if(checkOrderResult.getCode() == 1){
					return new Result<String>(1,"收款成功",orderNum);
				}else{
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(result.getCode() != 1){
				throw new Exception(result.getMsg());
			}
			return result;
		}else if(csGoodsBilling.getType() == 3){
			//台卡收银
			csGoodsBilling.setCgbPayType("台卡收银");
			orderNum = createPurchaseBill(csGoodsBilling);
			return new Result<String>(1,"收款成功",orderNum);
		}else{
			//转账
			csGoodsBilling.setCgbPayType("转账");
			orderNum = createPurchaseBill(csGoodsBilling);
			return new Result<String>(1,"保存订单成功",orderNum);
		}
	}
	
	private String createPurchaseBill(CsGoodsBilling csGoodsBilling) throws Exception{
		//生成订单
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String orderNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = sdf.format(date);
		
		csGoodsBilling.setCgbOrderNum(orderNum);
		csGoodsBilling.setCgbState("配货中");
		csGoodsBilling.setCgbAcceptTime(time);
		csGoodsBilling.setCgbOverTime(time);
		
		csGoodsBillingMapper.insertSelective(csGoodsBilling);
		
		List<CsGoods> newGoodsList = new ArrayList<>();
		
		List<CsGoods> goodsList = JSON.parseArray(csGoodsBilling.getOrderGoodsJson(), CsGoods.class);
		
		for(CsGoods g : goodsList){
			//获取订单中的货物数量
			CsGoods goods = new CsGoods();
			goods.setCgNum(g.getNum() * -1);
			goods.setId(g.getId());
			newGoodsList.add(goods);
			
			CsGoodsSell cgs = new CsGoodsSell();
			cgs.setCgsGoodsId(g.getId());
			cgs.setCgsOrderId(csGoodsBilling.getId());
			cgs.setCgsCategory(g.getCgcCategoryName());
			cgs.setCgsGoodsName(g.getCgName());
			cgs.setCgsSellNum(g.getNum());
			cgs.setCgsRemainingNum(g.getCgNum() - g.getNum());
			cgs.setCgsOriginalPrice(g.getCgOriginalPrice());
			cgs.setCgsCurrentPrice(g.getCgCurrentPrice());
			cgs.setCgsCostPrice(g.getCgCostPrice());
			cgs.setCgsPreferential(g.getCgPreferential());
			cgs.setCgsSellWell(g.getCgSellWell());
			cgs.setCgsOperatorId(csGoodsBilling.getCgbOperatorId());
			csGoodsSellMapper.insertSelective(cgs);
			int cgsId = cgs.getId();
			
			/*if(g.getCgSn().equals(1)){
				CsGoodsDeviceRelation csGoodsDeviceRelation = new CsGoodsDeviceRelation();
				JSONArray snList = JSONArray.parseArray(g.getCgdrSn());
				for(int i=0;i<snList.size();i++){
					JSONObject snJson = JSONObject.parseObject(snList.get(i).toString());
					csGoodsDeviceRelation.setCgdrSn(snJson.get("sn").toString());
					csGoodsDeviceRelation.setCgdrGoodsId(g.getId());
					csGoodsDeviceRelation.setCgdrState(1);
					csGoodsDeviceRelation.setCgdrGoodsSellId(cgsId);
					csGoodsDeviceRelationMapper.updateState(csGoodsDeviceRelation);
				}
			}*/
		}
		//执行修改货物数量
		csGoodsMapper.updateList(newGoodsList);
		
		return orderNum;
	}

	@Override
	public int updateByPrimaryKeySelective(CsGoodsBilling record) throws Exception {
		return csGoodsBillingMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public Result<String> exchangeGoods(CsGoodsBilling csGoodsBilling)throws  Exception {
		Result<String> result = new Result<String>();
		if(csGoodsBilling.getType() == 1){
			csGoodsBilling.setCgbPayType("现金收银");
		}else if(csGoodsBilling.getType() == 2){
			String orderNum = createOrderNum();
			csGoodsBilling.setCgbOrderNum(orderNum);
			Result<String> payResult = qrCodePay(csGoodsBilling);
			if(payResult.getCode() == -3){
				Result<String> checkOrderResult =  checkOrderThree(csGoodsBilling);
				if(checkOrderResult.getCode() != 1){
					throw new Exception("查询订单6次仍未支付");
				}
			}else if(payResult.getCode() != 1){
				throw new Exception(payResult.getMsg());
			}
			csGoodsBilling.setCgbPayType("扫码收银");
		}else if(csGoodsBilling.getType() == 3){
			csGoodsBilling.setCgbPayType("台卡收银");
		}

		result = doExchangeGoods(csGoodsBilling);

		return result;
	}


	public Result<String> doExchangeGoods(CsGoodsBilling csGoodsBilling)throws Exception{
		List<CsGoods> goodsList = JSON.parseArray(csGoodsBilling.getOrderGoodsJson(), CsGoods.class); //更换的货品

		List<CsGoods> newGoodsList = new ArrayList<>();	//商超货架表

		List<CsGoodsSell> cgsList = new ArrayList<>(); //商超出货流水表

		//原购买商品
		Integer cgsSellNum = csGoodsBilling.getCgsSellNum() - csGoodsBilling.getNum(); //被换商品剩余销售数量(原销售数量 - 被换数量)
		CsGoods oldGoods = new CsGoods();
		oldGoods.setCgNum(csGoodsBilling.getNum());
		oldGoods.setId(csGoodsBilling.getCgsGoodsId());
		newGoodsList.add(oldGoods);

		for(int i=0;i<goodsList.size();i++){
			CsGoods g = goodsList.get(i);
			//获取订单中的货物数量
			if(g.getId() == csGoodsBilling.getCgsGoodsId()){ //同一种货物
				System.out.println(g.getCgNum()+"  "+ g.getNum()+"  "+csGoodsBilling.getNum());
				int cgNum = (g.getNum() - csGoodsBilling.getNum()) * -1;
				newGoodsList.get(0).setCgNum(cgNum);
			}else{
				CsGoods goods = new CsGoods();
				goods.setCgNum(g.getNum() * -1);
				goods.setId(g.getId());
				newGoodsList.add(goods);
			}

			CsGoodsSell cgs = new CsGoodsSell();
			cgs.setCgsGoodsId(g.getId());
			cgs.setCgsOrderId(csGoodsBilling.getOrderId());
			cgs.setCgsCategory(g.getCgcCategoryName());
			cgs.setCgsGoodsName(g.getCgName());
			cgs.setCgsSellNum(g.getNum());
			cgs.setCgsRemainingNum(g.getCgNum()  - g.getNum());
			cgs.setCgsOriginalPrice(g.getCgOriginalPrice());
			cgs.setCgsCurrentPrice(g.getCgCurrentPrice());
			cgs.setCgsCostPrice(g.getCgCostPrice());
			cgs.setCgsPreferential(g.getCgPreferential());
			cgs.setCgsSellWell(g.getCgSellWell());
			cgs.setCgsOperatorId(csGoodsBilling.getCgbOperatorId());
			cgsList.add(cgs);
		}

		//执行修改货物数量
		int result = csGoodsMapper.updateList(newGoodsList);
		if(result > 0){
			//插入商超出货流水表
			boolean flag = false; //false为更换物品不包含被更换物品，及无需修改
			List<CsGoodsSell> newList = new ArrayList<>();
			for(CsGoodsSell cgs1 : cgsList){
				List<CsGoodsSell> list = csGoodsSellMapper.listGoodsSell(cgs1); //用订单id和商品id，查询该商品是否有销售记录
				if(list.size() > 0){
					Integer sellNum = 0;
					Integer remainingNum = 0;
					if(cgs1.getCgsGoodsId() == csGoodsBilling.getCgsGoodsId()){ //如果为被换货的商品
						//出货数量 = 被换商品剩余销售数量(原销售数量 - 被换数量) + 换购数量
						sellNum = cgsSellNum + cgs1.getCgsSellNum();
						//货品剩余数量 = (商品剩余数量 - 商品出售数量) + 被换数量
						System.out.println(cgs1.getCgsRemainingNum()+"   "+cgsSellNum);
						remainingNum = cgs1.getCgsRemainingNum() + csGoodsBilling.getNum();
					}else{
						sellNum = list.get(0).getCgsSellNum() + cgs1.getCgsSellNum();
						remainingNum = cgs1.getCgsRemainingNum();
					}
					cgs1.setId(list.get(0).getId());
					cgs1.setCgsSellNum(sellNum);
					cgs1.setCgsRemainingNum(remainingNum);
					System.out.println(cgs1);
					csGoodsSellMapper.updateByPrimaryKeySelective(cgs1);
					flag = true;
				}else{ //没记录的存起来，进行批量添加
					newList.add(cgs1);
				}
			}

			if(flag){
				if(newList.size() > 0){
					csGoodsSellMapper.insertList(newList);
				}
			}else{
				CsGoodsSell cgs2 = new CsGoodsSell();
				cgs2.setId(csGoodsBilling.getId());
				cgs2.setCgsSellNum(cgsSellNum);
				cgs2.setCgsRemainingNum(csGoodsBilling.getCgsRemainingNum());
				if(cgsSellNum == 0){ //原购买商品全部被换货时(换货后数量为0)，删除这条销售记录
					csGoodsSellMapper.deleteByPrimaryKey(csGoodsBilling.getId());
				}else{
					csGoodsSellMapper.updateByPrimaryKeySelective(cgs2);
				}
				csGoodsSellMapper.insertList(cgsList);
			}

			//修改订单号
			csGoodsBilling.setCgbOrderNum(csGoodsBilling.getCgbOrderNum());
			csGoodsBilling.setId(csGoodsBilling.getOrderId());
			csGoodsBilling.setCgbState("已完成");
			csGoodsBillingMapper.updateByPrimaryKeySelective(csGoodsBilling);

			return new Result<>(1,"成功",null);
		}else{
			return new Result<>(-1,"失败",null);
		}


	}

	/**
	 * 生成时间戳加上3位随机数的字符串
	 * @return
	 */
	private String createOrderNum(){
		//生成订单
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String orderNum = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		return orderNum;

	}
}
