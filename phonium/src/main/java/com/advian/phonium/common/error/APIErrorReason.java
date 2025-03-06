package com.advian.phonium.common.error;

/**
 * Enumeration representing API error reasons.
 */
public enum APIErrorReason {
    /** The value is not a valid string format. */
    NOT_STRING,

    /** The field is required but missing. */
    REQUIRED,

    /** The value is not a valid number format. */
    NOT_NUMBER,

    /** The value is below the allowed minimum limit. */
    MIN,

    /** The value exceeds the allowed maximum limit. */
    MAX,

    /** The requested resource was not found. */
    NOT_FOUND,

    /** An unexpected error occurred. */
    UNEXPECTED
}
