package com.zz.actions.commons;

import java.io.IOException;
import java.io.StringReader;
import java.util.List;

import com.zz.other.Syslog;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.xml.sax.InputSource;

/**
 * java 解析 xml 数据
 * @author Administrator
 *	第一种 只有子元素 <?xml version=\"1.0\" encoding=\"UTF-8\"?>
 *							<response>
 *								<error>0</error>
 *								<message></message>
 *							</response>
 *	第二种 子元素中还有子元素 
 *	<?xml version=\"1.0\" encoding=\"UTF-8\"?>
 *	<response>
 *		<error>0</error>
 *		<message>
 *			<srctermid>18874906337</srctermid>
 *			<submitDate>20170419175908</submitDate>
 *			<receiveDate>20170419175909</receiveDate>
 *			<addSerial></addSerial>
 *			<addSerialRev></addSerialRev>
 *			<state>EM:001</state>
 *			<seqid>378079813</seqid>
 *		</message>
 *	</response>
 */
public class DocXmlAnalysis {
	/**
	 * xml格式的字符串解析
	 * @param xmlDoc
	 * @return sum
	 */
	public static String xmlElements(String xmlDoc) {
    	//定义的元素值
        String error = null;
        String message = null;
        String sumData = "";
        String sum = "";
    	
        //创建一个新的字符串
        StringReader read = new StringReader(xmlDoc);
        //System.out.println("开始传入的值 xml： "+read);
        //创建新的输入源SAX 解析器将使用 InputSource 对象来确定如何读取 XML 输入
        InputSource source = new InputSource(read);
        //System.out.println("我想看到什么东西-： "+source);
        //创建一个新的SAXBuilder
        SAXBuilder sb = new SAXBuilder();
        try {
            //通过输入源构造一个Document
            Document doc = sb.build(source);
            //System.out.println("怎么解析的------： "+doc);
            //取的根元素
            Element root = doc.getRootElement();
            System.out.println("输出根元素的名称:  "+root.getName());//输出根元素的名称（测试）
            //得到根元素所有子元素的集合
            List<?> jiedian = root.getChildren();
            System.out.println("得到根元素所有子元素的集合："+jiedian);
//            //获得XML中的命名空间（XML中未定义可不写）
//            Namespace ns = root.getNamespace();
//            System.out.println("获得XML中的命名空间："+ns);
            if(root.getName().equals("message")){
            	sum = datalist(jiedian);
            }else{
	            Element et = null;        
	            for(int i = 0; i < jiedian.size(); ++i){
		            et = (Element) jiedian.get(i);//得到子元素
		            String name = et.getName();//元素名字
		            String value = et.getValue();//元素值
		            if(name.equals("error")){
		            	if(!value.equals("")){
		            		error = value;
		            	}
		            }else if(name.equals("message")){
		            	List<?> mes = et.getChildren();
		            	System.out.println("子元素的集合："+mes);
		            	if(mes.size() == 0){
		            		if(!value.equals("")){
		            			message = value;
		            		}
		            	}else{
		            		sumData = datalist(mes);
		            	}
		            }
	            }
				if(sumData.equals("")){
					sum = error+"###"+message;
				}else{
					sum = error+"###"+sumData;
				}
            }
        } catch (JDOMException e) {
            // TODO 自动生成 catch 块
            e.printStackTrace();Syslog.writeErr(e);
        } catch (IOException e) {
            // TODO 自动生成 catch 块
            e.printStackTrace();
			Syslog.writeErr(e);
        }
              
        return sum;
    }
	
	/**
	 * 获取子元素中子元素的值
	 * @param list
	 * @return
	 */
	public static String datalist(List<?> list){
    	String srctermid = null;
        String submitDate = null;
        String receiveDate = null;
        String addSerial = null;
        String addSerialRev = null;
        String state = null;
        String seqid = null;
    	
    	Element et = null;
    	for(int i = 0; i < list.size(); ++i){
            et = (Element) list.get(i);//得到子元素
            String name = et.getName();//元素名字
            String value = et.getValue();
            if(name.equals("srctermid")){
            	if(!value.equals("")){
            		srctermid = value;
            	}
            }else if(name.equals("submitDate")){
            	if(!value.equals("")){
            		submitDate = value;
            	}
            }else if(name.equals("receiveDate")){
            	if(!value.equals("")){
            		receiveDate = value;
            	}
            }else if(name.equals("addSerial")){
            	if(!value.equals("")){
            		addSerial = value;
            	}
            }else if(name.equals("addSerialRev")){
            	if(!value.equals("")){
            		addSerialRev = value;
            	}
            }else if(name.equals("state")){
            	if(!value.equals("")){
            		state = value;
            	}
            }else if(name.equals("seqid")){
            	if(!value.equals("")){
            		seqid = value;
            	}
            }
        }
    	String sum = srctermid+"###"+submitDate+"###"+receiveDate+"###"+addSerial+"###"+addSerialRev+"###"+state+"###"+seqid;
    	return sum;
    }
}
