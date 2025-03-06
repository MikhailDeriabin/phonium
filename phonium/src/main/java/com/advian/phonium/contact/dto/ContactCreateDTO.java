package com.advian.phonium.contact.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * DTO for creating a new contact.
 */
@Getter
@Setter
public class ContactCreateDTO {

    /**
     * The name of the contact. Cannot start with a number and must be between 1 and 50 characters.
     */
    @Size(min = 1, max = 50, message = "Name must be from 1 to 50 characters long")
    @JsonProperty(required = false)
    @Pattern(regexp = "^(?!\\d).*", message = "Name cannot start with a number")
    private String name;

    /**
     * The phone number of the contact. Must contain only digits and spaces, and be between 4 and 31 characters long.
     */
    @NotBlank(message = "Phone number is required")
    @Size(min = 4, max = 31, message = "Phone number must be from 4 to 31 characters long")
    @Pattern(regexp = "^\\+?[0-9 ]+$", message = "Phone number must contain only digits and spaces")
    private String phone;

    /**
     * Additional description for the contact. Must be between 1 and 200 characters long.
     */
    @Size(min = 1, max = 200, message = "Description must be from 1 to 200 characters long")
    private String description;
}
