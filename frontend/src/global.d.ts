export {};

declare global {
    type Contact = {
        id: number;
        name?: string;
        phone: string;
        description?: string;
    };
    type FetchContactsParams = {
        page?: number;
        pageSize?: number;
    };

    type FetchContactsResponse = {
        data: Contact[];
        metadata: {
            total: number;
            page: number;
            pageSize: number;
        };
    };
}

