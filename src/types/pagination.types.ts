export type PaginationOptions = {
    totalRecords: number;
    limit: number;
    totalPages: number;
    page: number;

    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    prevPage?: number | null;
    nextPage?: number | null;
};

export type PaginateResult<T> = {
    records: T[];
    meta: PaginationOptions;
};
