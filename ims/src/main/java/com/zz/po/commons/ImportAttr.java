package com.zz.po.commons;

import java.io.File;

public class ImportAttr{
	
	private Integer userId;
	
	private Integer storefront;
	
    private Integer department;
	
    // myFile属性用来封装上传的文件
    private File myFile;

    // myFileContentType属性用来封装上传文件的类型
    private String myFileContentType;

    // myFileFileName属性用来封装上传文件的文件名
    private String myFileFileName;


	// 获得myFile值
    public File getMyFile() {
	return myFile;
    }

    // 设置myFile值
    public void setMyFile(File myFile) {
	this.myFile = myFile;
    }

    // 获得myFileContentType值
    public String getMyFileContentType() {
	return myFileContentType;
    }

    public void setMyFileContentType(String myFileContentType) {
	this.myFileContentType = myFileContentType;
    }

    // 获得myFileFileName值
    public String getMyFileFileName() {
	return myFileFileName;
    }

    // 设置myFileFileName值
    public void setMyFileFileName(String myFileFileName) {
	this.myFileFileName = myFileFileName;
    }

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getStorefront() {
		return storefront;
	}

	public void setStorefront(Integer storefront) {
		this.storefront = storefront;
	}

	public Integer getDepartment() {
		return department;
	}

	public void setDepartment(Integer department) {
		this.department = department;
	}
    
}