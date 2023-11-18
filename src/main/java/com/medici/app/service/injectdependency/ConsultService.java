package com.medici.app.service.injectdependency;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.entity.CountyNatalityBase;

public interface ConsultService {


    void save(ConsultRequest request);

    CountyNatalityBase findById(Long idConsult);

    void saveComment(CountyNatalityBase countyNatalityBase);
}
