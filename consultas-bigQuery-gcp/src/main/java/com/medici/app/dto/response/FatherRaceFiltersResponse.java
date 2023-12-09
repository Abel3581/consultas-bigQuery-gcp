package com.medici.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FatherRaceFiltersResponse {

    private Integer white;
    private Integer unknownOrNotStated;
    private Integer asian;
    private Integer moreThanOneRace;
    private Integer blackOrAfricanAmerican;
    private Integer americanIndianOrAlaskaNative;
    private Integer nativeHawaiianOrOtherPacificIslander;

}

