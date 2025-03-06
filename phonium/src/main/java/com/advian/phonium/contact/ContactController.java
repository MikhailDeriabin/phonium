package com.advian.phonium.contact;

import com.advian.phonium.common.controller.BaseController;
import com.advian.phonium.common.error.APIError;
import com.advian.phonium.common.error.APIErrorReason;
import com.advian.phonium.common.response.UnifiedResponseDTO;
import com.advian.phonium.contact.dto.ContactCreateDTO;
import com.advian.phonium.contact.dto.ContactUpdateDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/contact")
@Validated
public class ContactController extends BaseController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<UnifiedResponseDTO<Contact>> createContact(@Valid @RequestBody ContactCreateDTO body) {
        Contact contact = modelMapper.map(body, Contact.class);
        Contact savedContact = contactService.create(contact);

        return unifyResponse(savedContact, null, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<UnifiedResponseDTO<Contact>> getAllContacts(
            @RequestParam(defaultValue = "1") @Min(value = 1, message = "Page must be 1 or greater") int page,
            @RequestParam(defaultValue = "10") @Min(value = 1, message = "Page size must 1 or greater") int pageSize
    ) {
        Page<Contact> resp = contactService.getAll(page, pageSize);

        if (resp.isEmpty())
            throw new APIError(APIErrorReason.NOT_FOUND, "contacts", null, "No contacts found for the given page and page size");

        return unifyResponse(resp.getContent(), new UnifiedResponseDTO.Metadata(
                resp.getTotalElements(),
                page,
                pageSize
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UnifiedResponseDTO<Contact>> getContactById(
            @PathVariable @Positive(message = "id must be a positive integer") Long id
    ) {
        Optional<Contact> contact = contactService.getById(id);

        if (contact.isEmpty())
            throw new APIError(APIErrorReason.NOT_FOUND, "id", id, "No contact found for this id");

        return unifyResponse(contact.get());
    }

    @PatchMapping
    public ResponseEntity<Void> updateContact(@Valid @RequestBody ContactUpdateDTO body) {
        Contact contact = modelMapper.map(body, Contact.class);
        boolean wasUpdated = contactService.update(contact);
        if (wasUpdated)
            return unifyResponse();

        throw new APIError(APIErrorReason.NOT_FOUND, "id", body.getId(), "No contact found for this id");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable @Positive(message = "id must be a positive integer") Long id
    ) {
        boolean wasRemoved = contactService.deleteById(id);
        if (wasRemoved)
            return unifyResponse();

        throw new APIError(APIErrorReason.NOT_FOUND, "id", id, "No contact found for this id");
    }
}
