// src/app/interfaces/audio-file.ts
export interface WebResponse<T> {
    data: Data<T>;
    error: Error;
}

export interface Data<T>{
  items: Array<T>;
  count: number;
  type: string;
}

export interface Error{
  message: string;
}
