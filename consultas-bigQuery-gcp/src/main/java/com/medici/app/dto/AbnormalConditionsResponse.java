package com.medici.app.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbnormalConditionsResponse extends CountyNatalityResponse{

    // AbnormalConditions
    private String abnormalConditionsCheckedDesc;
    private String abnormalConditionsCheckedYN;


}
