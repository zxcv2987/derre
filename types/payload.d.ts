export interface BlogPayload {
  category: number;
  title: string;
  main_image: string;
  sub_image?: string;
  content: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
