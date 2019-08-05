package com.zz.service.cs;

import java.util.List;

import com.zz.mapper.cs.CsGoodsCategoryMapper;
import com.zz.po.cs.CsGoodsCategory;

public class CsGoodsCategoryServiceImpl implements CsGoodsCategoryService {
	private CsGoodsCategoryMapper csGoodsCategoryMapper;
	
	public void setCsGoodsCategoryMapper(CsGoodsCategoryMapper csGoodsCategoryMapper) {
		this.csGoodsCategoryMapper = csGoodsCategoryMapper;
	}



	@Override
	public List<CsGoodsCategory> listGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception{
		// TODO Auto-generated method stub
		return csGoodsCategoryMapper.listCsGoodsCategory(csGoodsCategory);
	}


	@Override
	public String insertGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception {
		List<CsGoodsCategory> list = csGoodsCategoryMapper.listCsGoodsCategory(csGoodsCategory);
		if(list.size() > 0){
			return "货物类型里面已经存在" + csGoodsCategory.getCgcCategoryName();
		}else{
			csGoodsCategoryMapper.insertSelective(csGoodsCategory);
			return "1";
		}
	}



	@Override
	public String updateGoodsCategory(CsGoodsCategory csGoodsCategory) throws Exception {
		if(csGoodsCategoryMapper.updateByPrimaryKeySelective(csGoodsCategory) > 0){
			return "1";
		}else{
			return "更新失败";
		}
	}

}
