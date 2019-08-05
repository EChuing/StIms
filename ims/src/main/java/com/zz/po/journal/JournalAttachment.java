package com.zz.po.journal;

/**
 * 附件上传表
 */
public class JournalAttachment {
    private Integer id;

    private String att;
    
    private String att2;
    
    private Integer attType;

    private String num;

    private String time;

    private String path;
    
    private String bk;

    public String getBk() {
        return bk;
    }

    public void setBk(String bk) {
        this.bk = bk;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAtt() {
        return att;
    }

    public void setAtt(String att) {
        this.att = att == null ? null : att.trim();
    }
    
    public String getAtt2() {
		return att2;
	}

	public void setAtt2(String att2) {
		this.att2 = att2;
	}
	
	public Integer getAttType() {
		return attType;
	}
	public void setAttType(Integer attType) {
		this.attType = attType;
	}

	public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num == null ? null : num.trim();
    }

    public String getTime() {
        return (time != null && time.length() > 19) ? time.substring(0,19) : time;
    }

    public void setTime(String time) {
        this.time = time == null ? null : time.trim();
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }
}