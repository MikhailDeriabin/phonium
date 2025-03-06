package com.advian.phonium.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * A generic response wrapper for API responses.
 *
 * @param <T> The type of data being returned in the response.
 */
@Getter
@Setter
@AllArgsConstructor
public class UnifiedResponseDTO<T> {
    /**
     * The data returned in the response, can be an object or a list.
     */
    private Object data;

    /**
     * Metadata containing pagination information (optional).
     */
    private Metadata metadata;

    /**
     * Metadata class to provide pagination details.
     */
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Metadata {
        /**
         * The total number of records available.
         */
        private long total;

        /**
         * The current page number in the pagination result.
         */
        private int page;

        /**
         * The number of records per page.
         */
        private int pageSize;
    }
}
