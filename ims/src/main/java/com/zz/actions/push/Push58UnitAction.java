package com.zz.actions.push;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.push.Push58Unit;
import com.zz.service.push.Push58UnitService;

public class Push58UnitAction extends BaseAction implements ModelDriven<Push58Unit> {
    private Push58Unit push58Unit;
    private Push58UnitService push58UnitService;
    public void setPush58Unit(Push58Unit push58Unit) {
        this.push58Unit = push58Unit;
    }
    public void setPush58UnitService(Push58UnitService push58UnitService) {
        this.push58UnitService = push58UnitService;
    }
    @Override
    public Push58Unit getModel() {
        if(push58Unit==null){
            push58Unit = new Push58Unit();
        }
        return push58Unit;
    }

}
