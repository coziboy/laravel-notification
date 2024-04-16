export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export interface Feed {
  created_at: string;
  updated_at: string;
  id: number;
  content: string;
  user: User;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};
