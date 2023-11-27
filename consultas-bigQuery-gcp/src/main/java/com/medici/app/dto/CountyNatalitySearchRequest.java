package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountyNatalitySearchRequest {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private String year;
    private String county_of_Residence;
}
