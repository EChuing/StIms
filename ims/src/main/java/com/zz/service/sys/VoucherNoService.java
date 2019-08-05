package com.zz.service.sys;

import java.util.List;
import com.zz.po.sys.SysVoucherNo;

public interface VoucherNoService {
	List<SysVoucherNo> selectVoucherNo(SysVoucherNo record) throws Exception;
	
    int insert(SysVoucherNo record) throws Exception;

    int insertSelective(SysVoucherNo record) throws Exception;
}
