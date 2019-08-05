package com.zz.service.journal;

import java.util.List;

import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.journal.JournalGoToRegisterMapper;
import com.zz.po.journal.JournalGoToRegister;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.sys.UserService;
import com.zz.util.DateUtil;

public class GoToRegisterServiceImpl implements GoToRegisterService {
	private JournalGoToRegisterMapper journalGoToRegisterMapper;
	private UserService userService;
	public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setJournalGoToRegisterMapper(
			JournalGoToRegisterMapper journalGoToRegisterMapper) {
		this.journalGoToRegisterMapper = journalGoToRegisterMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer gotoId) throws Exception {
		return journalGoToRegisterMapper.deleteByPrimaryKey(gotoId);
	}

	@Override
	public int insertSelective(JournalGoToRegister record) throws Exception {
		return journalGoToRegisterMapper.insertSelective(record);
	}

	@Override
	public List<JournalGoToRegister> selectByPrimaryKey(
			JournalGoToRegister record) throws Exception {
		return journalGoToRegisterMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalGoToRegister record)
			throws Exception {
		return journalGoToRegisterMapper.updateByPrimaryKeySelective(record);
	}

    @Override
    public List<JournalGoToRegister> queryWorkOutsideByUserId(
            JournalGoToRegister record) throws Exception {
        return journalGoToRegisterMapper.queryWorkOutsideByUserId(record);
    }

    @Override
    public int comeBackSignIn(JournalGoToRegister record) throws Exception {
        record.setGotoComeBackTime(DateUtil.getCurDateTime());
        System.out.println("时间"+record.getGotoComeBackTime());
        journalGoToRegisterMapper.updateComeBackTime(record);
        SysUserExpand user = new SysUserExpand();
        user.setUserId(record.getGotoUserId());
        user.setSuWhetherGoOut("否");
        userService.updateByPrimaryKeySelective(user);
        return 1;
    }
}
