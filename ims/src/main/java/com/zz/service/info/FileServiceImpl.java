package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoFileMapper;
import com.zz.po.info.InfoFile;

public class FileServiceImpl implements FileService{
	private InfoFileMapper infoFileMapper;

	public void setInfoFileMapper(
			InfoFileMapper infoFileMapper) {
		this.infoFileMapper = infoFileMapper;
	}
	@Override
	public List<InfoFile> selectAll(InfoFile record) throws Exception {
		return infoFileMapper.selectAll(record);
	}
	@Override
	public int insertSelective(InfoFile fileId) throws Exception {
		return infoFileMapper.insertSelective(fileId);
	}
	@Override
	public int deleteFile(Integer id) throws Exception {
		return infoFileMapper.deleteFile(id);
	}
	@Override
	public int updateFile(InfoFile record) throws Exception {
		return infoFileMapper.updateFile(record);
	}


}
