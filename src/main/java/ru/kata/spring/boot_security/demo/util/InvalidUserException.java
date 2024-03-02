package ru.kata.spring.boot_security.demo.util;

public class InvalidUserException extends RuntimeException{
    public InvalidUserException(String msg) {
        super(msg);
    }
}
