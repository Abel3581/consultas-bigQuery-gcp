package com.medici.app.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentFiltersResponse {

    private Integer other;
    private Integer medicaid;
    private Integer selfPay;
    private Integer privateInsurance;
    private Integer unknownOrNotStated;

}
