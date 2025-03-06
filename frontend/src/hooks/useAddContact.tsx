import { addContact } from "@/api/contact";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useAddContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};