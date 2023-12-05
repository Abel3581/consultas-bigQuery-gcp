package com.medici.app.service.injectdependency;


import com.medici.app.dto.*;
import com.medici.app.dto.response.CountyNatalityFilter;

import java.util.HashMap;
import java.util.List;


public interface BigQueryService {
    List<CountyNatalityResponse> getConsultTable() throws Exception;

    List<CountyNatalityFilterResidenceAndBirths> getCountyNatalityResidenceAndBirths() throws Exception;

    List<AbnormalConditionsResponse> getCountyNatalityByAbnormalConditions() throws Exception;

    List<AbnormalConditionsFilters> bnormalConditionsFilters() throws Exception;

    List<CountyNatalitySearchResponse> searchByYearAndResidence(CountyNatalitySearchRequest request) throws Exception;


    CountyNatalityFilter getAllByYearAndBirths() throws Exception;
}
