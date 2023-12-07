package com.medici.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AbnormalFiltersResponse {

    private Integer NoneChecked;
    private Integer AtLeastOneChecked;
    private Integer UnknownOrNotStated;

}
