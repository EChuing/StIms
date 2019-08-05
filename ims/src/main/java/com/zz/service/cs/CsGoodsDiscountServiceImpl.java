package com.zz.service.cs;

import java.util.List;

import com.zz.mapper.cs.CsGoodsDiscountMapper;
import com.zz.po.cs.CsGoodsDiscount;

public class CsGoodsDiscountServiceImpl implements CsGoodsDiscountService{
	
	private CsGoodsDiscountMapper csGoodsDiscountMapper;
	

	public void setCsGoodsDiscountMapper(CsGoodsDiscountMapper csGoodsDiscountMapper) {
		this.csGoodsDiscountMapper = csGoodsDiscountMapper;
	}

	@Override
	public int insertSelective(CsGoodsDiscount record) {
		return csGoodsDiscountMapper.insertSelective(record);
	}

	@Override
	public List<CsGoodsDiscount> selectByPrimaryKey(CsGoodsDiscount record) {
		return csGoodsDiscountMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(CsGoodsDiscount record) {
		//启用优惠方案的操作 判断是有已经有同类优惠启用 品类优惠可以多个
		if(record.getCgdState() == 1){
			List<CsGoodsDiscount> list = csGoodsDiscountMapper.selectByPrimaryKey(new CsGoodsDiscount());
			
			for(CsGoodsDiscount cgd : list){
				if(!"品类满减".equals(record.getCgdType())){
					if(cgd.getCgdType().equals(record.getCgdType())){
						if(cgd.getCgdState() == 1){
							return -1;
						}
					}
				}else{
					if(cgd.getCgdType().equals(record.getCgdType()) && cgd.getCgdCategoryId().equals(cgd.getCgdCategoryId())){
						if(cgd.getCgdState() == 1){
							return -1;
						}
					}
				}
			}
			
			
		}
		return csGoodsDiscountMapper.updateByPrimaryKeySelective(record);
	}

}
