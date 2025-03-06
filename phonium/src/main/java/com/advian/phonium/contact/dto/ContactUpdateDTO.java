package com.advian.phonium.contact.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO for updating an existing contact.
 */
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContactUpdateDTO {
    /** The unique identifier of the contact. */
    @NotNull(message = "ID is required")
    @Min(value = 1, message = "ID must be a positive integer")
    private Long id;

    /** The updated name of the contact. */
    @Size(min = 1, max = 50, message = "Name must be from 1 to 50 characters long")
    private String name;

    /** The updated phone number of the contact. */
    @Size(min = 4, max = 31, message = "Phone number must be from 4 to 31 characters long")
    @Pattern(regexp = "^\\+?[0-9 ]+$", message = "Phone number must contain only digits and spaces")
    private String phone;

    /** The updated description for the contact. */
    @Size(min = 1, max = 200, message = "Description must be from 1 to 200 characters long")
    private String description;
}
