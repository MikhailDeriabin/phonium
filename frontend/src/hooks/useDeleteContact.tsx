import { deleteContact } from "@/api/contact";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useDeleteContact = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};