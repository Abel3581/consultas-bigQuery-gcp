package com.medici.app.service;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.CountyNatalityBaseResponse;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.dto.SavedQueriesResponse;
import com.medici.app.entity.CountyNatality;
import com.medici.app.entity.CountyNatalityBase;
import com.medici.app.mapper.ConsultMapper;
import com.medici.app.repository.ConsultRepository;
import com.medici.app.service.injectdependency.ConsultService;
import com.medici.app.service.injectdependency.CountyNatalityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class ConsultServiceImpl implements ConsultService {

    private final ConsultRepository consultRepository;
    private final ConsultMapper consultMapper;


    @Override
    public void save(ConsultRequest request) {
        CountyNatalityBase base = consultMapper.maptoConsultRequest(request);
        if(consultRepository.existsByNameConsultAndNameUser(request.getNameConsult(), request.getNameUser())){
            log.error("Este nombre de consulta para este usuario ya esta creada ");
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este nombre de consulta para este usuario ya esta creada ");
        }
        List<CountyNatality> countyNatalities = consultMapper.maptoCountyNatalityBaseList(request.getCountyNatalityBaseList());
        countyNatalities.forEach(natality -> natality.setCountyNatalityBase(base));

        base.setCountyNatalities(countyNatalities);

        consultRepository.save(base);
    }

    @Override
    public CountyNatalityBase findById(Long idConsult) {

        Optional<CountyNatalityBase> countyNatalityBase = consultRepository.findById(idConsult);
        if(countyNatalityBase.isEmpty()){
            log.error("Consulta no encontrada");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta no encontrada");
        }
        return countyNatalityBase.get();
    }

    @Override
    public void saveComment(CountyNatalityBase countyNatalityBase) {
        consultRepository.save(countyNatalityBase);
    }

    @Override
    public List<SavedQueriesResponse> getAllConsults() {
        List<CountyNatalityBase> countyNatalityBases = consultRepository.findAll();
        List<SavedQueriesResponse> responses = consultMapper.maptoSavedQueriesResponse(countyNatalityBases);
        return responses;
    }

    @Override
    public List<CountyNatalityBaseResponse> getByIdConsultTable(Long id) {
        Optional<CountyNatalityBase> countyNatalityBase = consultRepository.findById(id);
        if(countyNatalityBase.isEmpty()){
            log.error("Consulta no encontrada con id: " + id, HttpStatus.NOT_FOUND);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Consulta no encontrada con id: " + id );
        }
        List<CountyNatality> countyNatalities = countyNatalityBase.get().getCountyNatalities();
        List<CountyNatalityBaseResponse> responses = consultMapper.maptoCountyList(countyNatalities);

        return responses;
    }
}
