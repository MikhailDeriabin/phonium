package com.advian.phonium.common.error;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Exception representing an API error.
 */
@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties({"cause", "stackTrace", "suppressed", "localizedMessage"})
public class APIError extends RuntimeException {

    /** The reason for the API error. */
    private APIErrorReason reason;

    /** The field related to the error. */
    private String field;

    /** The value that caused the error. */
    private Object value;

    /** The error message. */
    private String message;
}

