package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FiltersDto {

    private String county_of_Residence;
    private String year;
    private String ave_Age_of_Mother;
    private String births;


}
