export type ResultList<T> = NullableExcept<{
    next: string
    previous: string
    count: number
    results: T[]
}, 'results'> 

export interface File {
    id: number
    file: string
}

export interface BucketFile {
    id: number
    image: File
}

export interface Pagination {
    page: number
    page_size: number
}

export interface UploadPagination {
    offset: number
    limit: number
}

export type NullableAll<T> = {
    [K in keyof T]: T[K] | undefined
}

export type NullableExcept<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? T[P] : T[P] | undefined
}