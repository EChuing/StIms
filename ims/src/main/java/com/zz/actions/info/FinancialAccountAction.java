package com.zz.actions.info;

import java.math.BigDecimal;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoFinancialAccount;
import com.zz.service.info.FinancialAccountService;

public class FinancialAccountAction extends BaseAction implements ModelDriven<InfoFinancialAccount> {
    private InfoFinancialAccount infoFinancialAccount;
    private FinancialAccountService financialAccountService;

    public void setFinancialAccountService(
            FinancialAccountService financialAccountService) {
        this.financialAccountService = financialAccountService;
    }

    @Override
    public InfoFinancialAccount getModel() {
        if (infoFinancialAccount == null) {
            infoFinancialAccount = new InfoFinancialAccount();
        }
        return infoFinancialAccount;
    }

    //单个余额统计与计算
    public String uptheBalanceOf() {
        try {
            int i = financialAccountService.statisticsOfSingleItem(infoFinancialAccount);
            if (i == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "单个余额统计与计算失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //统计所有账户余额
    public String statisticsAllAccountBalance() {
        try {
            financialAccountService.statisticsAllAccountBalance();
            printlnMsg("1");
        } catch (Exception e) {
            printlnMsg("-1");
        }
        return null;
    }

    // 查询
    public String selectFinancialAccount() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectByPrimaryKey(infoFinancialAccount);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //项目账户查询
    public String allVirtualAccount() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectByPrimaryKey(infoFinancialAccount);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //财务收支账户查询
    public String selectFinancialAccountInFinancial() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectByPrimaryKey(infoFinancialAccount);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常!", null));
        }
        return null;
    }

    //查询收支总额
    public String selectFinancialSummary() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.totalQuery(infoFinancialAccount);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //查询总收入、总支出、总冲账
    public String selectFinancialTotal() {
        try {
            InfoFinancialAccount iFA = financialAccountService.revenueAndExpenditureLedger(infoFinancialAccount);
            if (iFA != null) {
                String json = JSONUtil.serialize(iFA);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询总收入、总支出、总冲账失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //查询全部账户
    public String selectAllName() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectAllName();
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询全部账户失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 查询全部账户的总余额
    public String selectAllCountBalance() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectByPrimaryKey(infoFinancialAccount);
            if (list.size() > 0) {
                Double sum = 0.0;
                for (InfoFinancialAccount item : list) {
                    if (item.getFaTheBalanceOf() != null) {
                        sum += item.getFaTheBalanceOf();
                    }
                }
                BigDecimal bd = new BigDecimal(sum);
                sum = bd.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
                InfoFinancialAccount ifa = new InfoFinancialAccount();
                ifa.setFaTheBalanceOf(sum);
                String json = JSONUtil.serialize(ifa);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询全部账户失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 公告接口查询账户部分信息
    public String selectNamePublic() {
        try {
            List<InfoFinancialAccount> list = financialAccountService.selectNamePublic(infoFinancialAccount);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, " 公告接口查询账户部分信息失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 新增
    public String insertFinancialAccount() {
        try {
            int result = financialAccountService.insertSelective(infoFinancialAccount);
            if (result != 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 修改
    public String updataFinancialAccount() {
        try {
            int result = financialAccountService.updateByPrimaryKeySelective(infoFinancialAccount);
            if (result != 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

}

