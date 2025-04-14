export interface PostQueryParams {
  category?: number;
  isRecruiting?: boolean;
  sortBy?: "recent" | "popular";
  page?: number;
  limit?: number;
}
