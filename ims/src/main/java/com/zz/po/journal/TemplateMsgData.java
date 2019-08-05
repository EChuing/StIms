package com.zz.po.journal;

/**
 * 模板消息内容实体类
 */
public class TemplateMsgData {
    private String value;   //消息内容
    private String color;   //文本颜色

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return "TemplateMsgData{" +
                "value='" + value + '\'' +
                ", color='" + color + '\'' +
                '}';
    }
}
