package com.advian.phonium.common.controller;

import com.advian.phonium.common.response.UnifiedResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * Abstract base controller to unify API responses.
 */
public abstract class BaseController {

    /**
     * Returns a `204 No Content` response.
     *
     * @return `ResponseEntity<Void>` with status `204 No Content`
     */
    protected ResponseEntity<Void> unifyResponse() {
        return ResponseEntity.noContent().build();
    }

    /**
     * Wraps a single object in a unified response format.
     * Defaults to `200 OK`.
     *
     * @param data The object to wrap.
     * @param <T> The type of the object.
     * @return A `ResponseEntity` containing the wrapped object.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(T data) {
        return unifyResponse(data, null, HttpStatus.OK);
    }

    /**
     * Wraps a single object in a unified response format with metadata.
     *
     * @param data The object to wrap.
     * @param metadata Additional metadata.
     * @param <T> The type of the object.
     * @return A `ResponseEntity` containing the wrapped object and metadata.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(T data, UnifiedResponseDTO.Metadata metadata) {
        return unifyResponse(data, metadata, HttpStatus.OK);
    }

    /**
     * Wraps a single object in a unified response format with metadata and status.
     *
     * @param data The object to wrap.
     * @param metadata Additional metadata.
     * @param status HTTP status to return.
     * @param <T> The type of the object.
     * @return A `ResponseEntity` containing the wrapped object, metadata, and status.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(T data, UnifiedResponseDTO.Metadata metadata, HttpStatus status) {
        return ResponseEntity.status(status).body(new UnifiedResponseDTO<>(data, metadata));
    }

    /**
     * Wraps a list of objects in a unified response format.
     * Defaults to `200 OK`.
     *
     * @param data The list of objects to wrap.
     * @param <T> The type of the objects.
     * @return A `ResponseEntity` containing the wrapped list.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(List<T> data) {
        return unifyResponse(data, null, HttpStatus.OK);
    }

    /**
     * Wraps a list of objects in a unified response format with metadata.
     *
     * @param data The list of objects to wrap.
     * @param metadata Additional metadata.
     * @param <T> The type of the objects.
     * @return A `ResponseEntity` containing the wrapped list and metadata.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(List<T> data, UnifiedResponseDTO.Metadata metadata) {
        return unifyResponse(data, metadata, HttpStatus.OK);
    }

    /**
     * Wraps a list of objects in a unified response format with metadata and status.
     *
     * @param data The list of objects to wrap.
     * @param metadata Additional metadata.
     * @param status HTTP status to return.
     * @param <T> The type of the objects.
     * @return A `ResponseEntity` containing the wrapped list, metadata, and status.
     */
    protected <T> ResponseEntity<UnifiedResponseDTO<T>> unifyResponse(List<T> data, UnifiedResponseDTO.Metadata metadata, HttpStatus status) {
        return ResponseEntity.status(status).body(new UnifiedResponseDTO<>(data, metadata));
    }
}

