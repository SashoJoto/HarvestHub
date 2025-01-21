package com.sashojoto.harvesthub.exceptions;

public class HarvestHubException extends RuntimeException {
    public HarvestHubException(String s, long userId) {
        super(String.format(s, userId));
    }
}
