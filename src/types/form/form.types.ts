export interface FormItem {
  id?: string;
  title: string;
  body: string;
  createdAt?: string;
  modifiedAt?: string;
}
export interface FormData {
  id?: string;
  title: string;
  body: string;
}

export interface FormState {
  data: FormItem[];
}
