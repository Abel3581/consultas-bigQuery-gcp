package com.medici.app.service.injectdependency;


import com.medici.app.dto.*;
import com.medici.app.dto.response.*;

import java.util.List;
import java.util.concurrent.CompletionStage;


public interface BigQueryService {

    List<CountyNatalityResponse> getConsultTable() throws Exception;

    List<CountyNatalityFilterResidenceAndBirths> getCountyNatalityResidenceAndBirths() throws Exception;

    List<AbnormalConditionsResponse> getCountyNatalityByAbnormalConditions() throws Exception;

    List<AbnormalConditionsFilters> bnormalConditionsFilters() throws Exception;

    List<CountyNatalitySearchResponse> searchByYearAndResidence(CountyNatalitySearchRequest request) throws Exception;

    CountyNatalityFilterResponse getAllByYearAndBirths() throws Exception;

    AbnormalFiltersResponse getAllAbnormalNoCheckedUnknown() throws Exception;

    List<CongenitalAbnormalitiesResponse> getAllCongenitalAbnormalities() throws Exception;

    CongenitalFiltersResponse getAllCongenitalFilters() throws Exception;

    List<CountyByFatherRaceResponse> getAllByFatherRace() throws Exception;

    FatherRaceFiltersResponse getFatherRaceFilters() throws Exception;

    List<MaternalMorbidityResponse> getAllMaternalMorbidity() throws Exception;

    MaternalMorbidityFilters getMaternalMorbidityFilters() throws Exception;

    List<MotherRaceResponse> getAllMotherRace() throws Exception;

    MotherRaceFiltersResponse getMotherRaceFilters() throws Exception;

    List<PaymentResponse> getAllPayments() throws Exception;

    PaymentFiltersResponse getPaymentFilters() throws Exception;


}
