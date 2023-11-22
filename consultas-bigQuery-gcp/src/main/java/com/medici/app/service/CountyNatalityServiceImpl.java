package com.medici.app.service;

import com.medici.app.entity.CountyNatality;
import com.medici.app.repository.CountyNatalityRepository;
import com.medici.app.service.injectdependency.CountyNatalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountyNatalityServiceImpl implements CountyNatalityService {

    private final CountyNatalityRepository countyNatalityRepository;


    @Override
    public void save(List<CountyNatality> countyNatalities) {
        countyNatalityRepository.saveAll(countyNatalities);
    }
}
