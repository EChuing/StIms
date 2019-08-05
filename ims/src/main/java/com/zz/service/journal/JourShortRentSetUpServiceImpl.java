package com.zz.service.journal;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.mapper.journal.JourShortRentSetUpMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourShortRentSetUp;


public class JourShortRentSetUpServiceImpl implements JourShortRentSetUpService{

	@Autowired
	private JourShortRentSetUpMapper jourShortRentSetUpMapper;
	
	
	@Override
	public Result<String> updateSetUp(JourShortRentSetUp jourShortRentSetUp) throws Exception{
		System.out.println("进来了7070：                   "+jourShortRentSetUp);
		//修改短租设置
		int result = jourShortRentSetUpMapper.updateByPrimaryKeySelective(jourShortRentSetUp);
		
		if(result > 0){
			return new Result<>(1,"修改成功",null);
		}else{
			return new Result<>(-1,"修改失败",null);
		}
	}

	@Override
	public Result<String> getSetUpInfo(JourShortRentSetUp jourShortRentSetUp) throws Exception {
		List<JourShortRentSetUp> resultList = jourShortRentSetUpMapper.selectByPrimaryKey(jourShortRentSetUp);
		if(resultList.size() > 0){
			String resultStr = JSON.toJSONString(resultList,SerializerFeature.WriteMapNullValue);
			return new Result<>(1,"成功",resultStr);
		}else{
			return new Result<>(-1,"没查询到设置信息",null);
		}
	}

	@Override
	public Result<String> deleteAdImg(JourShortRentSetUp jourShortRentSetUp) throws Exception {
		List<JourShortRentSetUp> list = jourShortRentSetUpMapper.selectByPrimaryKey(jourShortRentSetUp);
		if(list.size() > 0){
			//因为这是短租设置表 默认有且只有一条数据
			JourShortRentSetUp jsrcu = list.get(0);
			
			String oldPath = "";
			String delPath = "";
			if(jsrcu.getJsrsuAdImgs() != null){
				oldPath = jsrcu.getJsrsuAdImgs();
				delPath = jourShortRentSetUp.getJsrsuAdImgs();
				String newPath = PubUploadUtil.getNewPath(oldPath, delPath);
				jourShortRentSetUp.setJsrsuAdImgs(newPath);
			}
			
            int result = jourShortRentSetUpMapper.updateByPrimaryKeySelective(jourShortRentSetUp);
			if(result > 0){
				return new Result<>(1,"成功",null);
			}else{
				return new Result<>(-2,"修改失败",null);
			}
		}else{
			return new Result<>(-1, "没有查询到符合条件的记录！", null);
		}
	}

	@Override
	public List<JourShortRentSetUp> selectByPrimaryKey(Integer jsrsuId) throws Exception {
		JourShortRentSetUp jsrsu = new JourShortRentSetUp();
		jsrsu.setJsrsuId(jsrsuId);
		return jourShortRentSetUpMapper.selectByPrimaryKey(jsrsu);
	}

}
