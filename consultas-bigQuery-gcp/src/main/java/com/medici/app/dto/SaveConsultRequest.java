package com.medici.app.dto;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class SaveConsultRequest {

    private String nameUser;
    private String nameConsult;
    private String comment;
    private List<ConsultRequest> consultRequestList = new ArrayList<>();
}
