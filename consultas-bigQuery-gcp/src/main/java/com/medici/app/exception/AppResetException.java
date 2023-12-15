package com.medici.app.exception;

public class AppResetException extends RuntimeException{
    AppResetException(String message){
        super(message);
    }
}
