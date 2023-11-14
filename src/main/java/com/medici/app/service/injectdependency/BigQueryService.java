package com.medici.app.service.injectdependency;


import com.medici.app.dto.CountyNatalityFilterResidenceAndBirths;
import com.medici.app.dto.CountyNatalityResponse;
import java.util.List;


public interface BigQueryService {
    List<CountyNatalityResponse> getConsultTable() throws Exception;
    List<CountyNatalityFilterResidenceAndBirths> getCountyNatalityResidenceAndBirths() throws Exception;


}
