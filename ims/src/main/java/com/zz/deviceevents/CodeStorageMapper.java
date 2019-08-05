package com.zz.deviceevents;

import java.util.List;

public interface CodeStorageMapper {
	// 获取查询code_storage表中的值
		List<CodeStorage> queryCodeStorage(CodeStorage codeStorage) throws Exception;
}
