package com.karimbensaid.enchere.enchereApplication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleAllExceptions(Exception ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", LocalDateTime.now());
        errorBody.put("error", "Internal Server Error");
        errorBody.put("message", ex.getMessage());
        errorBody.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

        ex.printStackTrace();

        return new ResponseEntity<>(errorBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", LocalDateTime.now());
        errorBody.put("error", "Email Already Exists");
        errorBody.put("message", ex.getMessage());
        errorBody.put("status", HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(errorBody, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeExceptions(RuntimeException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", LocalDateTime.now());
        errorBody.put("error", "Bad Request");
        errorBody.put("message", ex.getMessage());
        errorBody.put("status", HttpStatus.BAD_REQUEST.value());

        ex.printStackTrace();

        return new ResponseEntity<>(errorBody, HttpStatus.BAD_REQUEST);
    }

}
