package com.medici.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CongenitalFiltersResponse {

    private Integer NoneChecked;
    private Integer AtLeastOneChecked;
    private Integer UnknownOrNotStated;


}
