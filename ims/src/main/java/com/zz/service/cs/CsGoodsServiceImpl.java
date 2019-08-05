package com.zz.service.cs;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.zz.mapper.cs.CsGoodsCategoryMapper;
import com.zz.mapper.cs.CsGoodsDeviceRelationMapper;
import com.zz.mapper.cs.CsGoodsInventoryMapper;
import com.zz.mapper.cs.CsGoodsMapper;
import com.zz.mapper.cs.CsGoodsPurchaseMapper;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.po.commons.Result;
import com.zz.po.cs.CsGoods;
import com.zz.po.cs.CsGoodsCategory;
import com.zz.po.cs.CsGoodsDeviceRelation;
import com.zz.po.cs.CsGoodsInventory;
import com.zz.po.cs.CsGoodsPurchase;
import com.zz.po.journal.JournalAttachment;

public class CsGoodsServiceImpl implements CsGoodsService{
	private CsGoodsMapper csGoodsMapper;
	
	private CsGoodsCategoryMapper csGoodsCategoryMapper;
	@Resource
	private JournalAttachmentMapper journalAttachmentMapper;
	@Resource
	private CsGoodsPurchaseMapper csGoodsPurchaseMapper;
	@Resource
	private CsGoodsInventoryMapper csGoodsInventoryMapper;
	@Resource
	private CsGoodsDeviceRelationMapper csGoodsDeviceRelationMapper;
	
	public void setCsGoodsCategoryMapper(CsGoodsCategoryMapper csGoodsCategoryMapper) {
		this.csGoodsCategoryMapper = csGoodsCategoryMapper;
	}

	public void setCsGoodsMapper(CsGoodsMapper csGoodsMapper) {
		this.csGoodsMapper = csGoodsMapper;
	}

	@Override
	public List<CsGoods> listCsGoods(CsGoods record) throws Exception {
		return csGoodsMapper.listCsGoods(record);
	}
	
	@Override
	public List<CsGoods> SNListCsGoods(CsGoods record) throws Exception {
		return csGoodsMapper.SNListCsGoods(record);
	}

	@Override
	public int insertCsGoods(CsGoods record) throws Exception {
		
		String att = record.getAtt();
		String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
            }
        }
        record.setCgImgPath(path);
        record.setCgImgNum(num);
		
		csGoodsMapper.insertSelective(record);
		//插入新货物 要修改货物类型的数量
		CsGoodsCategory csGoodsCategory = new CsGoodsCategory();
		csGoodsCategory.setCgcNum(record.getCgcNum()+1);
		csGoodsCategory.setId(record.getCgCategoryId());
		csGoodsCategoryMapper.updateByPrimaryKeySelective(csGoodsCategory);
		return 1;
	}

	@Override
	public CsGoods updateCsGoods(CsGoods record) throws Exception {
		
		//type 为 1 则是修改到商品类型  把新旧类型的数量更新一下
		if(record.getType() != null && record.getType() == 1){
			//修改类型 要修改货物类型的数量
			CsGoodsCategory csGoodsCategory = new CsGoodsCategory();
			csGoodsCategory.setCgcNum(record.getCgcNum()+1);
			csGoodsCategory.setId(record.getCgCategoryId());
			csGoodsCategoryMapper.updateByPrimaryKeySelective(csGoodsCategory);
			
			//修改旧类型的数量
			csGoodsCategory.setCgcNum(record.getOldCgcNum()-1);
			csGoodsCategory.setId(record.getOldCgCategoryId());
			csGoodsCategoryMapper.updateByPrimaryKeySelective(csGoodsCategory);
		}
		
		//type 为 2 不为空 则是删除商品操作  更新该商品的类型数量
		if(record.getType() != null && record.getType() == 2){
			CsGoodsCategory csGoodsCategory = new CsGoodsCategory();
			//修改该类型的数量
			csGoodsCategory.setCgcNum(record.getCgcNum()-1);
			csGoodsCategory.setId(record.getCgCategoryId());
			csGoodsCategoryMapper.updateByPrimaryKeySelective(csGoodsCategory);
		}
		csGoodsMapper.updateByPrimaryKeySelective(record);
		
		if(record.getType() != null && record.getType() == 2){
			return null;
		}
		
		CsGoods csGoods = new CsGoods();
		csGoods.setId(record.getId());
		
		List<CsGoods> list =  csGoodsMapper.listCsGoods(csGoods);
		
		return list.get(0);
	}

	@Override
	public String purchaseGoods(CsGoods record) throws Exception {
		//这是进货订单 json字符串
		String jsonString = record.getJsonString();
		CsGoodsPurchase csGoodsPurchase = JSON.parseObject(jsonString, CsGoodsPurchase.class);
		
		List<CsGoods> goodsList = JSON.parseArray(csGoodsPurchase.getCgpGoodsJson(), CsGoods.class);
		
		
		//生成流水单号
		Date date = new Date();
		SimpleDateFormat sdf4 = new SimpleDateFormat("yyyyMMddHHmmss");
		String purchaseNumber = sdf4.format(date)+(int) (Math.random() * 10) + (int) (Math.random() * 10)+(int) (Math.random() * 10);
		
		List<CsGoodsDeviceRelation> cgdrList = new ArrayList<>();
		
		for(CsGoods goods : goodsList){
			//因为批量修改语句里面的变量是cgNum  所以这里商品数量 改为 进货的数量  
			goods.setCgNum(goods.getNum());
			
			//求出新成本价 跟 旧成本价的平均值
			Double costPrice = goods.getCgCostPrice();
			if(goods.getCgCostPrice() != null && goods.getCgCostPrice() != 0 && goods.getCgCostPrice() != goods.getNewCgCostPrice()){
				costPrice = computeCostPrice(goods.getCgCostPrice(),goods.getNewCgCostPrice());
			}else if(goods.getCgCostPrice() == 0){
				costPrice = goods.getNewCgCostPrice();
			}
			
			goods.setCgCostPrice(costPrice);
			
			if(goods.getSn() != null){
				
				List<HashMap<String,String>> snList = goods.getSn();
				for(int i = 0; i < snList.size();i++){
					CsGoodsDeviceRelation cgdr = new CsGoodsDeviceRelation();
					cgdr.setCgdrGoodsId(goods.getId());
					cgdr.setCgdrSn(snList.get(i).get("sn"));
					cgdrList.add(cgdr);
				}
			}
		}
		
		//批量插入商品SN管理表
		if(cgdrList.size() > 0){
			System.out.println("cgdrList ==== " +cgdrList);
			csGoodsDeviceRelationMapper.insertList(cgdrList);
		}
		
		
		//批量修改商品的数量
		csGoodsMapper.updateList(goodsList);
		
		
		csGoodsPurchase.setCgpNumbers(purchaseNumber);
		
		csGoodsPurchaseMapper.insertSelective(csGoodsPurchase);
		
		return purchaseNumber;
	}
	
	/**
	 * 求出两个数的平均值
	 * @param oldPrice
	 * @param newPrice
	 * @return
	 */
	private Double computeCostPrice(Double oldPrice,Double newPrice){
		
		BigDecimal oldPriceDecimal = BigDecimal.valueOf(oldPrice);
		BigDecimal newPriceDecimal = BigDecimal.valueOf(newPrice);
		
		BigDecimal price = oldPriceDecimal.add(newPriceDecimal);
		
		BigDecimal avgPrice = price.divide(BigDecimal.valueOf(2.0));
		
		Double result = avgPrice.setScale(3,BigDecimal.ROUND_HALF_UP).doubleValue(); 
		
		return result;
	}

	@Override
	public String inventoryGoods(CsGoods record) throws Exception {
		csGoodsMapper.updateByPrimaryKeySelective(record);
		CsGoodsInventory csGoodsInventory = JSON.parseObject(record.getJsonString(),CsGoodsInventory.class);
		csGoodsInventoryMapper.insertSelective(csGoodsInventory);
		return "1";
	}
}
