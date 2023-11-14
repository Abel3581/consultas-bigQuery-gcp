package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbnormalConditionsFilters {

    private String County_of_Residence;
    private String abnormalConditionsCheckedDesc;
    private String Ave_Age_of_Mother;
    private String Births;

}
