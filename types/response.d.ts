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

export interface BlogResponseType {
  user: UserType;
  category: CategoryType;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  mainImage: string;
  subImage: string;
  content: string;
}

export interface BlogListResponseType extends ListResponseType {
  data: BlogResponseType[];
}

export interface LoginResponseType {
  access: string;
  refresh: string;
}

export interface CategoryListResponseType extends ListResponseType {
  data: CategoryType[];
}
