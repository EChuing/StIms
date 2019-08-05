package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourTemporaryOrder;
import com.zz.service.journal.JourTemporaryOrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourTemporaryOrderAction extends BaseAction implements ModelDriven<JourTemporaryOrder> {

    private JourTemporaryOrder jourTemporaryOrder;


    @Autowired
    private JourTemporaryOrderService jourTemporaryOrderService;

    @Override
    public JourTemporaryOrder getModel() {

        if(jourTemporaryOrder == null){

          jourTemporaryOrder =  new JourTemporaryOrder();
        }

        return jourTemporaryOrder;
    }

    //插入新数据到挂单表
    public void  insertTemporaryOrder(){

        try {
            int result = jourTemporaryOrderService.insertSelective(jourTemporaryOrder);

            if(result ==1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }


    //通过短租房id查找挂单信息
    public void selectTemporaryOrderByOrderId(){

        try {
            JourTemporaryOrder jour = jourTemporaryOrderService.selectByOrderId(jourTemporaryOrder);

            if (jourTemporaryOrder == null) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }else{

                String resultStr = JSON.toJSONString(jour, SerializerFeature.WriteMapNullValue);
                System.out.println(resultStr);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", resultStr));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }


    }


    //通过挂单表id更新数据

    public void updateTemporaryOrderById() {

        try {

            int result = jourTemporaryOrderService.updateTemporaryOrderById(jourTemporaryOrder);

            if(result ==1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }

        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }

    }


    //查询所有挂单信息
    public void selectAllTemporaryOrder(){

        try {
            System.out.println(jourTemporaryOrder.getJtoTakingStatus());
            List<JourTemporaryOrder> list = jourTemporaryOrderService.selectAll(jourTemporaryOrder);
            String resultStr = JSON.toJSONString(list, SerializerFeature.WriteMapNullValue);

            if(list.size()>0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", resultStr));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }

    }



    //删除挂单数据
    public void deleteTemporaryOrderById() {

        try {

            int result = jourTemporaryOrderService.deleteTemporaryOrderById(jourTemporaryOrder);

            if(result ==1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }

        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }

    }

    // 通过条件来查询挂单表信息
    public void selectBySelective(){

        try {
            List<JourTemporaryOrder> jto = jourTemporaryOrderService.selectBySelective(jourTemporaryOrder);
            System.out.println(jto.toString());
            String resultStr = JSON.toJSONString(jto, SerializerFeature.WriteMapNullValue);
            System.out.println(resultStr);
            if (jto.size() >0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", resultStr));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }
}
