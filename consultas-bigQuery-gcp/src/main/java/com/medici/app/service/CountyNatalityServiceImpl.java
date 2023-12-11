package com.medici.app.service;

import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.dto.response.CountyNatalityResponseId;
import com.medici.app.entity.CountyNatality;
import com.medici.app.mapper.CountyNatalityMapper;
import com.medici.app.repository.CountyNatalityRepository;
import com.medici.app.service.injectdependency.CountyNatalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CountyNatalityServiceImpl implements CountyNatalityService {

    private final CountyNatalityRepository countyNatalityRepository;
    private final CountyNatalityMapper mapper;
    @Override
    public void save(List<CountyNatality> countyNatalities) {
        countyNatalityRepository.saveAll(countyNatalities);
    }

    @Override
    public CountyNatalityResponseId getById(Long id) {
        Optional<CountyNatality> countyNatalityOptional = countyNatalityRepository.findById(id);
        if(countyNatalityOptional.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Consulta con id: %s no encontrada",id));
        }
        CountyNatalityResponseId response = mapper.mapToCountyNatality(countyNatalityOptional.get());

        return response;
    }
}
