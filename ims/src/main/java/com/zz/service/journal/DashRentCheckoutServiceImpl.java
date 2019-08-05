package com.zz.service.journal;

import com.zz.mapper.journal.DashRentCheckoutMapper;
import com.zz.po.journal.DashRentCheckout;

public class DashRentCheckoutServiceImpl implements DashRentCheckoutService {
    
    private DashRentCheckoutMapper dashRentCheckoutMapper;

    public void setDashRentCheckoutMapper(
            DashRentCheckoutMapper dashRentCheckoutMapper) {
        this.dashRentCheckoutMapper = dashRentCheckoutMapper;
    }

    @Override
    public DashRentCheckout select() {
        return dashRentCheckoutMapper.select();
    }

}
