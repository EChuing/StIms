package com.zz.service.journal;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.mapper.journal.JourShortRentContractMapper;
import com.zz.mapper.journal.JourShortRentNexusMapper;
import com.zz.mapper.journal.JourShortRentRenterMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JourShortRentNexus;
import com.zz.po.journal.JourShortRentRenter;

public class JourShortRentRenterServiceImpl implements JourShortRentRenterService{
	
	@Autowired
	private JourShortRentRenterMapper jourShortRentRenterMapper;
	@Autowired
    private JourShortRentNexusMapper jourShortRentNexusMapper;
	@Autowired
    private JourShortRentContractMapper jourShortRentContractMapper;
	@Override
	public List<JourShortRentRenter> listLivingCustomer(JourShortRentRenter jourShortRentRenter) throws Exception {
		return jourShortRentRenterMapper.selectByJsrrId(jourShortRentRenter);
	}

	@Override
	public Result<List<JourShortRentRenter>> customerOrder(JourShortRentRenter jourShortRentRenter) throws Exception {
		List< JourShortRentRenter> list = jourShortRentRenterMapper.selectByJsrrId(jourShortRentRenter);
		if(list.size()>0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"没有查询到订单",null);
		}
	}
	@Override
	public Result<List<JourShortRentRenter>> customerContractOrder(JourShortRentRenter jourShortRentRenter) throws Exception {
		List< JourShortRentRenter> list = jourShortRentRenterMapper.selectByPrimaryKey(jourShortRentRenter);
		JourShortRentNexus jsrn =  new JourShortRentNexus();
		for(int i=0;i<list.size();i++){//遍历短租顾客
			List<Integer> jsrcIdList = new ArrayList<>();
			List<JourShortRentNexus> jsrnList = new ArrayList<>();
			jsrn.setJsrnJsrrId(list.get(i).getJsrrId());
			jsrnList.addAll(jourShortRentNexusMapper.selectByPrimaryKey(jsrn));
			for(int j=0;j<jsrnList.size();j++){//遍历短租订单
				jsrcIdList.add(jsrnList.get(j).getJsrnJsrcId());
				List<JourShortRentContract> jsrcList = jourShortRentContractMapper.selectByJsrcId(jsrcIdList);
				System.out.println(jsrcList);
				list.get(i).setJsrcList(jsrcList);
			}
		}
		System.out.println(list);
		if(list.size()>0){
			return new Result<>(1,"成功",list);
		}else{
			return new Result<>(-1,"没有查询到订单",null);
		}
	}



}
