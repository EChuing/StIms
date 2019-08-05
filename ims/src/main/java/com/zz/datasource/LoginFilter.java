package com.zz.datasource;

import com.zz.other.Syslog;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.MySqlSessionFactory;
import net.sf.json.JSONArray;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 访问/login时进来
 *
 */
public class LoginFilter extends HttpServlet implements Filter {

	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException {
		System.out.println("===========LoginFilter=============");
		HttpServletRequest req = (HttpServletRequest) arg0;
		HttpServletResponse resp = (HttpServletResponse) arg1;
		HttpSession sess = req.getSession();
		DevSecondType dev =new DevSecondType();
		String url = req.getServletPath();
		SysUserExpand user=(SysUserExpand)sess.getAttribute("userinfo");  
		if(user != null){
			resp.sendRedirect(req.getContextPath()+"/error2.html");
			return;
		}
		String company = req.getParameter("company");
		System.out.println("访问 "+company+" 登录页");
		Cookie cookie = new Cookie("company", company);
		cookie.setMaxAge(60*60*24);//设置过期日期为 24 小时后
		resp.addCookie(cookie);// 在响应头中添加Cookie
		resp.setContentType("text/html;charset=UTF-8");
		try (SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
			MyDataSourceMapper mapper = sqlSession.getMapper(MyDataSourceMapper.class);
			BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);
			DevFirstTypeMapper devMapper = sqlSession.getMapper(DevFirstTypeMapper.class);
			DevSecondTypeMapper devMapper2 = sqlSession.getMapper(DevSecondTypeMapper.class);
			//根据公司名称取出整条数据
			MyDataSource dataSource = mapper.getDataSource(company);
			if (dataSource != null && dataSource.getState() != 0) {
				String coId = "" + dataSource.getId();
				String companyName = dataSource.getCompanyName();
				String companyContact = dataSource.getCompanyContact();
				String companyTel = dataSource.getCompanyTel();
				String systemBrand = dataSource.getSystemBrand();
				String systemType = dataSource.getSystemType();
				String companyRentProvince = dataSource.getCompanyRentProvince();
				String companyRentCity = dataSource.getCompanyRentCity();
				String authoritySwitch = dataSource.getAuthoritySwitch();
				String appId = dataSource.getAppId();
				String wxKey = dataSource.getWxKey();
				String wxMerchantNumber = dataSource.getWxMerchantNumber();
				String antUserId = dataSource.getAntUserId();

				//取出要拿的品牌id
				String deviceBrand = dataSource.getDeviceBrand();
				String[] Brandid = deviceBrand.split(",");
				//转换成List
				List<String> list = Arrays.asList(Brandid);
				//根据id查出相应品牌
				List<Brand> brand = brandMapper.getAllBrandById(list);
				//查询所有的品牌列表
				List<Brand> brandList = brandMapper.getAllBrand();
				//查询所有设备一级类型
				List<DevFirstType> devTypeList = devMapper.selectAll();
				List<DevSecondType> devTypeList2 = devMapper2.selectAll(dev);
				//把品牌数据转换为字符串
				String brandStr = JSONArray.fromObject(brand).toString();
				String brandListStr = JSONArray.fromObject(brandList).toString();
				String devTypeListStr = JSONArray.fromObject(devTypeList).toString();
				String devTypeListStr2 = JSONArray.fromObject(devTypeList2).toString();
				sess.setAttribute("company", company);
				sess.setAttribute("coId", coId);
				sess.setAttribute("companyName", companyName);
				sess.setAttribute("systemBrand", systemBrand);
				sess.setAttribute("systemType", systemType);
				sess.setAttribute("companyRentProvince", companyRentProvince);
				sess.setAttribute("companyRentCity", companyRentCity);
				sess.setAttribute("authoritySwitch", authoritySwitch);
				sess.setAttribute("brand", brandStr);
				sess.setAttribute("brandList", brandListStr);
				sess.setAttribute("devTypeList", devTypeListStr);
				sess.setAttribute("devTypeList2", devTypeListStr2);
				sess.setAttribute("appId", appId);
				sess.setAttribute("wxKey", wxKey);
				sess.setAttribute("wxMerchantNumber", wxMerchantNumber);
				sess.setAttribute("deviceBrand", deviceBrand);
				sess.setAttribute("companyContact",companyContact);
				sess.setAttribute("companyTel",companyTel);
				sess.setAttribute("antUserId",antUserId);

				String loginLogo = "http://pic-static.fangzhizun.com/images/logo/fzz_login.png";
				if (dataSource.getLogoCompany() != null && !dataSource.getLogoCompany().equals("")) {
					loginLogo = dataSource.getLogoCompany();
				}
				req.setAttribute("loginLogo", loginLogo);
				req.getRequestDispatcher("login.jsp").forward(req, resp);
			} else {
				System.out.println("公司不存在或公司已注销");
				resp.sendRedirect(req.getContextPath() + "/error.html");
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}
}
