package com.zz.po.journal;

/**
 * @ClassName:  TemplateMessage
 * @Description:模板信息实体类
 * @author: ml
 * @date:   2019年4月18日 下午3:58:45
 * @Copyright:  深圳星辰计算机科技有限公司
 */

public class JournalTemplateMessage {

    private Integer id;
    private Integer scene;
    private String datasourceName;
    private String templateId;
    private String url;
    private String appid;
    private String pagepath;
    private String title;


    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getScene() {
        return scene;
    }

    public void setScene(Integer scene) {
        this.scene = scene;
    }

    public String getDatasourceName() {
        return datasourceName;
    }

    public void setDatasourceName(String datasourceName) {
        this.datasourceName = datasourceName;
    }

    public String getTemplateId() {
        return templateId;
    }
    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getPagepath() {
        return pagepath;
    }

    public void setPagepath(String pagepath) {
        this.pagepath = pagepath;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "JournalTemplateMessage{" +
                "id=" + id +
                ", scene=" + scene +
                ", datasourceName='" + datasourceName + '\'' +
                ", templateId='" + templateId + '\'' +
                ", url='" + url + '\'' +
                ", appid='" + appid + '\'' +
                ", pagepath='" + pagepath + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
