package com.medici.app.dto.response;

import com.medici.app.dto.CountyNatalityResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentResponse extends CountyNatalityResponse {

    private String sourceOfPayment;
    private String sourceOfPaymentCode;

}
