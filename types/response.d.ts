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

// Category
export interface CategoryListResponseType extends ListResponseType {
  data: CategoryType[];
}

// AWS
export interface UploadImageUrlResponseType {
  uploadURL: string;
  imageURL: string;
}

// Auth
export interface LoginResponseType {
  access: string;
  refresh: string;
}

export interface UserResponseType {
  last_login: string;
  date_joined: string;
  login_method: string;
  permission_type: string;
  status: string;
  email: string;
  username: string | null;
  social_username: string | null;
  social_email: string | null;
  name: string | null;
  phone_number: string | null;
  nickname: string | null;
  profile_image: string | null;
  address_type: string | null;
  postal_code: string;
  address: string;
  address_detail: string;
  birth_date: string | null;
  marketing_agree: boolean;
  token_version: number;
}
