package com.sashojoto.harvesthub.exceptions;

public class HarvestHubException extends RuntimeException {
    public HarvestHubException(String message) {
        super(message);
    }

    public HarvestHubException(String message, Throwable cause) {
        super(message, cause);
    }
}