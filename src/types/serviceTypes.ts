export interface IBasicAuth {
  username: string;
  password: string;
}

export type requestMethods = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface IApiMethods {
  post: 'POST';
  put: 'PUT';
  get: 'GET';
  delete: 'DELETE';
}
