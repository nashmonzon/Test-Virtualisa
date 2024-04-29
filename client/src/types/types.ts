export interface PageProps<T = { [key: string]: any }> {
  params?: T;
  searchParams: { [key: string]: string | string[] | undefined };
}
