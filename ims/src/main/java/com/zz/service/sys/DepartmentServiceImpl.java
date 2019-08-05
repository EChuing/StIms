package com.zz.service.sys;

import com.zz.mapper.sys.SysDepartmentMapper;
import com.zz.po.sys.SysDepartment;

import java.util.List;

public class DepartmentServiceImpl implements DepartmentService {
	
	private SysDepartmentMapper sysDepartmentMapper;

	
	public void setSysDepartmentMapper(SysDepartmentMapper sysDepartmentMapper) {
		this.sysDepartmentMapper = sysDepartmentMapper;
	}
	@Override
	public int deleteByPrimaryKey(Integer departmentId) throws Exception {
		return sysDepartmentMapper.deleteByPrimaryKey(departmentId);
	}

	@Override
	public int insertSelective(SysDepartment record) throws Exception {
		return sysDepartmentMapper.insertSelective(record);
	}

	@Override
	public List<SysDepartment> selectByPrimaryKey(SysDepartment departmentId)
			throws Exception {
		return sysDepartmentMapper.selectByPrimaryKey(departmentId);
	}

	@Override
	public int updateByPrimaryKeySelective(SysDepartment record)
			throws Exception {
		return sysDepartmentMapper.updateByPrimaryKeySelective(record);
	}

}
