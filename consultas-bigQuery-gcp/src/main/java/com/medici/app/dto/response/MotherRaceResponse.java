package com.medici.app.dto.response;

import com.medici.app.dto.CountyNatalityResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MotherRaceResponse extends CountyNatalityResponse {

    private String mothersSingleRace;
    private String mothersSingleRaceCode;

}
