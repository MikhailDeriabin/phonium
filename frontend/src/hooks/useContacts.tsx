import {useQuery} from "@tanstack/react-query";
import {fetchContacts} from "@/api/contact.ts";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useContacts = (params: FetchContactsParams) => {
    return useQuery<FetchContactsResponse>({
        queryKey: ["contacts", params],
        queryFn: () => fetchContacts(params),
    });
};

export const useInfiniteContacts = (pageSize: number) => {
    return useInfiniteQuery<FetchContactsResponse, Error, FetchContactsResponse, ["contacts"], number>({
        queryKey: ["contacts"],
        queryFn: ({ pageParam = 1 }) => fetchContacts({ page: pageParam, pageSize }),
        getNextPageParam: (lastPage, allPages) => {
            const totalLoaded = allPages.reduce((acc, page) => acc + page.data.length, 0);
            return totalLoaded < lastPage.metadata.total ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });
};
