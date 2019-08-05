package com.zz.po.journal;

public class JourSetupHouseNexus {
	private Integer jshnId;

    private Integer jshnJsrsuId;

    private Integer jshnShdId;

	public Integer getJshnId() {
		return jshnId;
	}

	public void setJshnId(Integer jshnId) {
		this.jshnId = jshnId;
	}

	public Integer getJshnJsrsuId() {
		return jshnJsrsuId;
	}

	public void setJshnJsrsuId(Integer jshnJsrsuId) {
		this.jshnJsrsuId = jshnJsrsuId;
	}

	public Integer getJshnShdId() {
		return jshnShdId;
	}

	public void setJshnShdId(Integer jshnShdId) {
		this.jshnShdId = jshnShdId;
	}

	@Override
	public String toString() {
		return "JourSetupHouseNexus [jshnId=" + jshnId + ", jshnJsrsuId=" + jshnJsrsuId + ", jshnShdId=" + jshnShdId
				+ "]";
	}

}
