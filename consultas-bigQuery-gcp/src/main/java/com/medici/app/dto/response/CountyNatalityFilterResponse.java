package com.medici.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CountyNatalityFilterResponse {

    private String year20180101;
    private String year20170101;
    private String year20160101;
    private Integer births2018;
    private Integer births2017;
    private Integer births2016;


}
