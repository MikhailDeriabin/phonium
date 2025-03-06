import {updateContact} from "@/api/contact.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useUpdateContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateContact,
        onSuccess: (_, updatedContact) => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            queryClient.invalidateQueries({ queryKey: ["contact", updatedContact.id] });
        },
    });
};