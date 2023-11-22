package com.medici.app.service.injectdependency;


import com.medici.app.dto.*;

import java.util.List;


public interface BigQueryService {
    List<CountyNatalityResponse> getConsultTable() throws Exception;

    List<CountyNatalityFilterResidenceAndBirths> getCountyNatalityResidenceAndBirths() throws Exception;

    List<AbnormalConditionsResponse> getCountyNatalityByAbnormalConditions() throws Exception;

    List<AbnormalConditionsFilters> bnormalConditionsFilters() throws Exception;

;
}
