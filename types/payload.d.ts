export interface BlogPayload {
  category: number;
  title: string;
  mainImage: string;
  subImage?: string;
  content: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
