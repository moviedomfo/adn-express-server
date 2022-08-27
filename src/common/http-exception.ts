export default class HttpException extends Error {
    statusCode?: number;
    status?: number;
    message: string;
    error: string | null;
  
    constructor(statusCode: number, message: string, error?: string) {
      super(message);
  
      this.statusCode = statusCode;
      this.message = message;
      this.error = error || null;
    }
  }
  export class CustomError extends Error{
 
    public severity: 'warning' | 'error' = "warning";
    public code?: string;
    public status?: string;
}