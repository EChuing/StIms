package com.zz.service.push;

import java.util.List;

import com.zz.po.push.PushBkHouseStatus;

public interface PushBkHouseStatusService {

	List<PushBkHouseStatus> queryBkHouseStatus(PushBkHouseStatus record) throws Exception;

}
