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

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  flash: {
    success?: string;
  }
};
