export class User{
  constructor(
    email: string,
    id: string,
    private _token: string,
    private _tokenExpDate: Date
  ){}

  public get token(): string {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate){
      return null;
    }
    return this._token;
  }
}
