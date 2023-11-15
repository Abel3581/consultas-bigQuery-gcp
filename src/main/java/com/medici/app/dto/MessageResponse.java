package com.medici.app.dto;


import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class MessageResponse {

    private HttpStatus httpStatus = HttpStatus.CREATED;
    private String message = "Consulta Guardadada";
}
