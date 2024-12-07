export interface PaginatedResponseDto<T> {
  total: number;
  data: T[];
}
