package com.medici.app.service;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.entity.CountyNatalityBase;
import com.medici.app.mapper.ConsultMapper;
import com.medici.app.repository.ConsultRepository;
import com.medici.app.service.injectdependency.ConsultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsultServiceImpl implements ConsultService {

    private final ConsultRepository consultRepository;
    private final ConsultMapper consultMapper;

    @Override
    public void sabeConsults(ConsultRequest request) {
        CountyNatalityBase county = consultMapper.mapToConsultRequest(request);
        consultRepository.save(county);
    }
}
