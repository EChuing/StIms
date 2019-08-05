package com.zz.service.journal;

import com.zz.mapper.journal.JourTemporaryOrderMapper;
import com.zz.po.journal.JourTemporaryOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JourTemporaryOrderServiceImpl implements JourTemporaryOrderService
{
    @Autowired
    private JourTemporaryOrderMapper jourTemporaryOrderMapper;

    @Override
    public int insertSelective(JourTemporaryOrder jourTemporaryOrder) throws Exception {


        int result =jourTemporaryOrderMapper.insertSelective(jourTemporaryOrder);

        return result;
    }

    @Override
    public JourTemporaryOrder selectByOrderId(JourTemporaryOrder jourTemporaryOrder) throws Exception {

       JourTemporaryOrder model = jourTemporaryOrderMapper.selectByPrimaryKey(jourTemporaryOrder);
        return model;
    }

    @Override
    public int updateTemporaryOrderById(JourTemporaryOrder jourTemporaryOrder) throws Exception {

        Integer num = jourTemporaryOrder.getJtoId();
        if ( num == null ){
            JourTemporaryOrder jt = jourTemporaryOrderMapper.selectByPrimaryKey(jourTemporaryOrder);
            jourTemporaryOrder.setJtoId(jt.getJtoId());
        }
        
        int result = jourTemporaryOrderMapper.updateByPrimaryKeySelective(jourTemporaryOrder);

        return result;
    }

    @Override
    public List<JourTemporaryOrder> selectAll(JourTemporaryOrder jourTemporaryOrder) throws Exception {



        return jourTemporaryOrderMapper.selectAll(jourTemporaryOrder);
    }

    @Override
    public int deleteTemporaryOrderById(JourTemporaryOrder jourTemporaryOrder) throws Exception {

        if (jourTemporaryOrder.getJtoId() == null){
            List<JourTemporaryOrder> jto = jourTemporaryOrderMapper.selectBySelective(jourTemporaryOrder);
            return jourTemporaryOrderMapper.deleteByPrimaryKey( jto.get(0).getJtoId());
        }

        return jourTemporaryOrderMapper.deleteByPrimaryKey(jourTemporaryOrder.getJtoId()) ;
    }


    @Override
    public List<JourTemporaryOrder> selectBySelective(JourTemporaryOrder jourTemporaryOrder) throws Exception {

        return jourTemporaryOrderMapper.selectBySelective(jourTemporaryOrder);
    }

}
