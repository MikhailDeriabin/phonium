package com.advian.phonium.contact;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for managing contact data.
 */
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    /**
     * Retrieves all contacts with pagination support.
     *
     * @param pageable The pagination information.
     * @return A paginated list of contacts.
     */
    Page<Contact> findAll(Pageable pageable);
}

