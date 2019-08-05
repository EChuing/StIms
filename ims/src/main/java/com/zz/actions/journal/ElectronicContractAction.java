package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalElectronicContract;
import com.zz.po.journal.JournalElectronicContractExpansion;
import com.zz.po.journal.JournalShortMessage;
import com.zz.service.journal.JourElectronicContractService;
import com.zz.service.journal.ShortMessageService;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;

public class ElectronicContractAction extends BaseAction implements ModelDriven<JournalElectronicContract> {

    private JournalElectronicContractExpansion journalElectronicContractExpansion;

    private JourElectronicContractService jourElectronicContractService;

    private ShortMessageService shortMessageService;


    public void setShortMessageService(ShortMessageService shortMessageService) {
        this.shortMessageService = shortMessageService;
    }

    public void setJourElectronicContractService(JourElectronicContractService jourElectronicContractService) {
        this.jourElectronicContractService = jourElectronicContractService;
    }

    public void setJournalElectronicContractExpansion(
            JournalElectronicContractExpansion journalElectronicContractExpansion) {
        this.journalElectronicContractExpansion = journalElectronicContractExpansion;
    }

    @Override
    public JournalElectronicContract getModel() {
        if (journalElectronicContractExpansion == null) {
            journalElectronicContractExpansion = new JournalElectronicContractExpansion();
        }
        return journalElectronicContractExpansion;
    }
    public void rentalContract(){
        try {
            String result = jourElectronicContractService.dealWithSignOut(journalElectronicContractExpansion);
            if (!"-1".equals(result)) {
                printlnOfJson(CommonMethodClass.jsonData(1, "创建合同成功", result));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "创建合同失败", null));
                System.out.println("发送短信失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "网络异常", null));
            System.out.println("系统异常");
        }
    }
    public void signContract() throws Exception {
        try {
            String result = jourElectronicContractService.dealWithSign(journalElectronicContractExpansion);

            if (!"-1".equals(result)) {
                JSONObject jobj = JSONObject.fromObject(journalElectronicContractExpansion.getEctTemplateFillValue());
                JSONObject jobj2 = jobj.getJSONObject("insertData");
                String address = jobj2.getString("jcdHouseAddress");
                JournalShortMessage journalShortMessage = new JournalShortMessage();
                journalShortMessage.setMessageType(15);
                journalShortMessage.setUrl(result);
                journalShortMessage.setPopName(journalElectronicContractExpansion.getEctName());
                journalShortMessage.setPopTelephone(journalElectronicContractExpansion.getEctTelphone());
                journalShortMessage.setPopIdcard(journalElectronicContractExpansion.getEctIdCard());
                journalShortMessage.setCompanyAddress(address);
                journalShortMessage.setSmPopId(journalElectronicContractExpansion.getPopId());
                journalShortMessage.setSmNotRentId(journalElectronicContractExpansion.getEctHsId());
                journalShortMessage.setSmRentId(journalElectronicContractExpansion.getEctHrId());
                journalShortMessage.setSmUserId(journalElectronicContractExpansion.getHrUserId());
                Result<String> result1 = shortMessageService.sendOutsideMessage(journalShortMessage);
                String resultStr = JSON.toJSONString(result1);
                printlnOfJson(CommonMethodClass.jsonData(1, "创建合同成功", resultStr));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "创建合同失败", null));
                System.out.println("创建合同失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            System.out.println("系统异常");
        }
    }

    public String signShow() throws Exception {
        String result = jourElectronicContractService.signShow(journalElectronicContractExpansion);
        if ("-1".equals(result)) {
            result = "查询不到这份合同";
        }
        if ("-2".equals(result)) {
            result = "合同已经使用过了";
        }

        HttpServletRequest request = ServletActionContext.getRequest();
        request.setCharacterEncoding("UTF-8");
        request.setAttribute("formString", result);

        return "sign";
    }

    public String syncCallBack() throws Exception {
        System.out.println("同步： " + journalElectronicContractExpansion.toString());
        HttpServletRequest req = ServletActionContext.getRequest();
        System.out.println("code" + journalElectronicContractExpansion.getCode());
        if ("0".equals(journalElectronicContractExpansion.getCode())) {
            String result = jourElectronicContractService.syncAddNoRent(journalElectronicContractExpansion);
            req.setAttribute("url", result);
            req.setAttribute("result", "已签署成功,请长按二维码添加微信公众号");
        } else {
            req.setAttribute("result", "签署失败");
        }

        return "success";
    }

    public String asynCallBack() throws Exception {
        System.out.println("异步： " + journalElectronicContractExpansion.toString());

        HttpServletResponse response = ServletActionContext.getResponse();
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        if ("0".equals(journalElectronicContractExpansion.getCode())) {
            String result = jourElectronicContractService.asynAddNoRent(journalElectronicContractExpansion);
        }
        out.println("success");//返回的字符串数据  

        return null;
    }

    public String checkResult() throws Exception {
        int result = jourElectronicContractService.checkResult(journalElectronicContractExpansion);
        if (result == 1) {
            printlnMsg("签署未成功");
        } else if (result == 0) {
            printlnMsg("签署成功");
        } else {
            printlnMsg("签署出现异常");
        }
        return null;
    }

    public void listContract() {
        try {
            System.out.println(journalElectronicContractExpansion.toString());
            List<JournalElectronicContractExpansion> list = jourElectronicContractService.listContract(journalElectronicContractExpansion);
            if (list.size() != 0) {
                String json = JSON.toJSONString(list, SerializerFeature.WriteMapNullValue);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }

    }

    public void updateContract() {
        try {
            Result<String> Result = jourElectronicContractService.updateContract(journalElectronicContractExpansion);
            JSONObject resultObj = JSONObject.fromObject(Result);
            String result = resultObj.toString();
            printlnMsg(result);
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }


    public void getContractImg() {
        try {
            System.out.println(journalElectronicContractExpansion);
            Result<String> Result = jourElectronicContractService.getContractImg(journalElectronicContractExpansion);
            JSONObject resultObj = JSONObject.fromObject(Result);
            String result = resultObj.toString();
            printlnMsg(result);
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }

    }

}
