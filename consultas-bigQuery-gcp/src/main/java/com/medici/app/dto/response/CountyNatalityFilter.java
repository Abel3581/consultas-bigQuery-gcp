package com.medici.app.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CountyNatalityFilter {

    @JsonProperty("2018/01/01")
    private String year20180101;
    @JsonProperty("2017/01/01")
    private String year20170101;
    @JsonProperty("2016/01/01")
    private String year20160101;
    private int births2018;
    private int births2017;
    private int births2016;


}
