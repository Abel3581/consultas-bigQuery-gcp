package com.medici.app.dto;

import com.medici.app.entity.CountyNatalityBase;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ConsultRequest {

    private String nameUser;
    private String comment;
    private String nameConsult;
    List<CountyNatalityBaseRequest> countyNatalityBaseList;

}
