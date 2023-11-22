package com.medici.app.service.injectdependency;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.dto.CountyNatalityBaseResponse;
import com.medici.app.dto.SavedQueriesResponse;
import com.medici.app.entity.CountyNatalityBase;

import java.util.List;

public interface ConsultService {


    void save(ConsultRequest request);

    CountyNatalityBase findById(Long idConsult);

    void saveComment(CountyNatalityBase countyNatalityBase);

    List<SavedQueriesResponse> getAllConsults();

    List<CountyNatalityBaseResponse> getByIdConsultTable(Long id);
}
