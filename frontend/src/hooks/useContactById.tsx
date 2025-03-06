import {useQuery} from "@tanstack/react-query";
import {fetchContactById} from "@/api/contact.ts";

export const useContactById = (id: number) => {
    return useQuery({
        queryKey: ["contact", id],
        queryFn: () => fetchContactById(id),
    });
};