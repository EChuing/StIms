package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.po.journal.JourSubject;
import com.zz.service.journal.JourSubjectService;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;

import java.util.List;


public class JourSubjectAction extends BaseAction implements ModelDriven<JourSubject>{
	private JourSubject jourSubject;
	private JourSubjectService jourSubjectService;
	
	public void setJourSubjectService(JourSubjectService jourSubjectService) {
		this.jourSubjectService = jourSubjectService;
	}
	

	public String insertSubject(){
		try{
		int result=jourSubjectService.insertJourSubject(jourSubject);
		System.out.println("insertSubject:"+result);
		if(result>0){
			printlnOfJson(CommonMethodClass.jsonData(1,"success!",null));
		}else{
			printlnOfJson(CommonMethodClass.jsonData(-1,"fault!",null));
			}
		}catch(Exception e){
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-1,"SystemException!",null));
		}
		return null;
	}

	public void selectAllSubject()throws Exception{
		List<JourSubject> list = jourSubjectService.selectAllSubject(jourSubject);
		Integer total;
		if (list.size() > 0) {
			total = list.get(0).getTotalNum();
		} else {
			total = 0;
		}
		JSONObject jsonObj = new JSONObject();
		jsonObj.accumulate("total", total);
		jsonObj.accumulate("rows", list);
		String json = jsonObj.toString();
		printlnOfJson(json);
//		try{
//			List<JourSubject> list=jourSubjectService.selectAllSubject(jourSubject);
//			System.out.println(jourSubject.getStartNum());
//			Integer total = 0;
//			if(list.size()>0){
//			    total=list.get(0).getTotalNum();
//			}
//            String json = JSONUtil.serialize(list);
//            JSONObject obj = new JSONObject();
//            obj.put("rows", json);
//            obj.put("total", total);
//            printlnOfJson(obj.toString());
//		}catch(Exception e){
//			e.printStackTrace();
//			printlnOfJson(CommonMethodClass.jsonData(-1,"SystemException!",null));
//		}
	}

	public String updateSubject(){
		try{
			System.out.println("000000000"+jourSubject);
			int result=jourSubjectService.updateSubject(jourSubject);
			System.out.println("updateSubject:"+result);
			if(result>0){
				printlnOfJson(CommonMethodClass.jsonData(1,"success!",null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1,"fault!",null));
			}
		}catch(Exception e){
			e.printStackTrace();
			printlnOfJson(CommonMethodClass.jsonData(-1,"SystemException!",null));
		}
		return null;
	}
    public String deleteSubjectPic(){
        try {
            List<JourSubject> list=jourSubjectService.selectAllSubject(jourSubject);
            String oldPath=list.get(0).getFileImgPath();
            String delPath=jourSubject.getFileImgPath();
            String newPath = PubUploadUtil.getNewPath2(oldPath, delPath);
            jourSubject.setFileImgPath(newPath);
            jourSubject.setFileImgNum(PubUploadUtil.getImageNum2(newPath));
            int result=0;
            result =jourSubjectService.updateSubject(jourSubject);
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


	public JourSubject getModel() {
		if(jourSubject==null){
			jourSubject=new JourSubject();
		}
		return jourSubject;
	}


}
