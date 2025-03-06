package com.advian.phonium.common.error;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Global exception handler for handling application-wide exceptions.
 * Provides standardized error responses for validation errors and resource not found errors.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles validation exceptions when @Valid fails on request bodies.
     *
     * @param e The exception containing validation errors.
     * @return A structured error response with HTTP 400 BAD REQUEST.
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException e) {
        List<APIError> errorsToReturn = convertValidationErrorToAPIErrors(e);
        Map<String, Object> body = convertAPIErrorsToResponseBody(errorsToReturn);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    /**
     * Handles validation exceptions when constraint violations occur (e.g., @Min, @Max, etc.).
     *
     * @param e The exception containing constraint violations.
     * @return A structured error response with HTTP 400 BAD REQUEST.
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(ConstraintViolationException e) {
        List<APIError> errorsToReturn = convertValidationErrorToAPIErrors(e);
        Map<String, Object> body = convertAPIErrorsToResponseBody(errorsToReturn);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    /**
     * Handles APIError exceptions (typically for resource not found errors).
     *
     * @param e The APIError exception.
     * @return A structured error response with HTTP 404 NOT FOUND.
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(APIError.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(APIError e) {
        APIError error = new APIError(
                APIErrorReason.NOT_FOUND,
                e.getField(),
                e.getValue(),
                e.getMessage()
        );

        List<APIError> errorsToReturn = new ArrayList<>();
        errorsToReturn.add(error);
        Map<String, Object> body = convertAPIErrorsToResponseBody(errorsToReturn);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    /**
     * Converts a list of API errors into a response body format.
     *
     * @param errors The list of API errors.
     * @return A map containing the formatted error response.
     */
    private Map<String, Object> convertAPIErrorsToResponseBody(List<APIError> errors){
        Map<String, Object> response = new HashMap<>();
        response.put("errors", errors);
        return response;
    }

    /**
     * Converts constraint violation exceptions into a list of API errors.
     *
     * @param error The constraint violation exception.
     * @return A list of APIError objects.
     */
    private List<APIError> convertValidationErrorToAPIErrors(ConstraintViolationException error){
        List<APIError> errorsList = new ArrayList<>();

        for (ConstraintViolation<?> violation : error.getConstraintViolations()) {
            errorsList.add(new APIError(
                    convertFieldErrorToAPIReason(violation.getMessageTemplate(), violation.getInvalidValue()),
                    violation.getPropertyPath().toString(),
                    violation.getInvalidValue(),
                    violation.getMessage()
            ));
        }

        return errorsList;
    }

    /**
     * Converts method argument validation exceptions into a list of API errors.
     *
     * @param e The method argument validation exception.
     * @return A list of APIError objects.
     */
    private List<APIError> convertValidationErrorToAPIErrors(MethodArgumentNotValidException e){
        List<APIError> errorsList = new ArrayList<>();

        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            errorsList.add(new APIError(
                    convertFieldErrorToAPIReason(error.getCode(), error.getRejectedValue()),
                    error.getField(),
                    error.getRejectedValue(),
                    error.getDefaultMessage()
            ));
        }

        return errorsList;
    }

    /**
     * Determines the appropriate API error reason based on the validation error code and rejected value.
     *
     * @param errorCode The validation error code.
     * @param rejectedValue The value that caused the error.
     * @return The corresponding APIErrorReason.
     */
    private APIErrorReason convertFieldErrorToAPIReason(String errorCode, Object rejectedValue) {
        if(errorCode == null){
            return APIErrorReason.UNEXPECTED;
        }

        if (errorCode.contains("NotBlank") || errorCode.contains("NotNull")) {
            return APIErrorReason.REQUIRED;
        }
        if (errorCode.contains("Size") || errorCode.contains("Pattern")) {
            return APIErrorReason.NOT_STRING;
        }
        if (errorCode.contains("Min")) {
            return APIErrorReason.MIN;
        }
        if (errorCode.contains("Max")) {
            return APIErrorReason.MAX;
        }
        if (rejectedValue instanceof Number) {
            return APIErrorReason.NOT_NUMBER;
        }
        return APIErrorReason.UNEXPECTED;
    }
}
