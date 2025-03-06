package com.advian.phonium.contact;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity representing a contact.
 */
@Entity
@Table(name = "contact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    /**
     * Unique identifier for the contact.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    /**
     * Name of the contact (optional).
     */
    @Column(name = "name", nullable = true, length = 50)
    private String name;

    /**
     * Phone number of the contact
     */
    @Column(name = "phone", nullable = false, length = 31)
    private String phone;

    /**
     * Description or additional information about the contact (optional).
     */
    @Column(name = "description", nullable = true, length = 200)
    private String description;
}
