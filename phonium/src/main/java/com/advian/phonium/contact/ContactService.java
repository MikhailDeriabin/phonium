package com.advian.phonium.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Handles business logic for managing contacts.
 */
@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    /**
     * Creates a new contact.
     *
     * @param contact The contact to be created.
     * @return The created contact.
     */
    public Contact create(Contact contact) {
        return contactRepository.save(contact);
    }

    /**
     * Retrieves a paginated list of contacts.
     *
     * @param page     The page number (1-based index).
     * @param pageSize The number of contacts per page.
     * @return A paginated list of contacts.
     */
    public Page<Contact> getAll(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        return contactRepository.findAll(pageable);
    }

    /**
     * Retrieves a contact by its ID.
     *
     * @param id The ID of the contact.
     * @return An Optional containing the contact if found, otherwise empty.
     */
    public Optional<Contact> getById(Long id) {
        return contactRepository.findById(id);
    }

    /**
     * Updates an existing contact.
     *
     * @param contact The contact with updated details.
     * @return True if the update was successful, false if the contact does not exist.
     */
    public boolean update(Contact contact) {
        Optional<Contact> existingContactOpt = contactRepository.findById(contact.getId());
        if (existingContactOpt.isEmpty()) {
            return false;
        }

        Contact existingContact = existingContactOpt.get();

        if (contact.getName() != null)
            existingContact.setName(contact.getName());

        if (contact.getPhone() != null)
            existingContact.setPhone(contact.getPhone());

        if (contact.getDescription() != null)
            existingContact.setDescription(contact.getDescription());

        contactRepository.save(existingContact);
        return true;
    }

    /**
     * Deletes a contact by its ID.
     *
     * @param id The ID of the contact to delete.
     * @return True if the deletion was successful, false if the contact does not exist.
     */
    public boolean deleteById(Long id) {
        if (!contactRepository.existsById(id)) {
            return false;
        }
        contactRepository.deleteById(id);
        return true;
    }
}
