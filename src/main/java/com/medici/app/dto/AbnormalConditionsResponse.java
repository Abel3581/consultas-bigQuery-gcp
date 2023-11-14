package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AbnormalConditionsResponse extends CountyNatalityResponse{

    // AbnormalConditions
    private String abnormalConditionsCheckedDesc;
    private String abnormalConditionsCheckedYN;
}
