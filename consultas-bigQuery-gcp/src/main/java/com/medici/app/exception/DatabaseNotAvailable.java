package com.medici.app.exception;

public class DatabaseNotAvailable extends RuntimeException{

    public DatabaseNotAvailable(String message){
        super(message);
    }
}
