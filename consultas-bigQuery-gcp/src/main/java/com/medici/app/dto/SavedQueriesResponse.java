package com.medici.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedQueriesResponse {

    private Long id;
    private String comment;
    private String nameConsult;
    private String nameUser;


}
