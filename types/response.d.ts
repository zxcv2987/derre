import { CategoryType } from "./category";
import { UserType } from "./user";

export interface ListResponseType {
  count: number;
  totalCnt: number;
  pageCnt: number;
  curPage: number;
  nextPage: number;
  previousPage: number;
}

// Blog
export interface GeneralBlogResponseType {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  title: string;
  main_image: string;
  sub_image: string;
  content: string;
}

export interface BlogCreateResponseType extends GeneralBlogResponseType {
  category: CategoryType;
}

export interface BlogResponseType extends GeneralBlogResponseType {
  category: CategoryType;
  user: UserType;
}
export interface BlogListResponseType extends ListResponseType {
  data: BlogResponseType[];
}

// Auth
export interface LoginResponseType {
  access: string;
  refresh: string;
}

// Category
export interface CategoryListResponseType extends ListResponseType {
  data: CategoryType[];
}

// AWS
export interface UploadImageUrlResponseType {
  uploadURL: string;
  imageURL: string;
}
