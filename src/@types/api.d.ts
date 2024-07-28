export {};
declare global {
  interface APIResponse<T> {
    code: number;
    msg: string;
    data: T;
  }
}
