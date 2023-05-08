import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl:string = ''
  tokenUrlRevoke:string = ''

  jwtPayload:any;

  constructor(private http:HttpClient, private jwtHelper: JwtHelperService) { 
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`
    this.tokenUrlRevoke = `${environment.apiUrl}/tokens/revoke`
    this.carregarToken();
  }

  // async login(user:String, password:String):Promise<void>{
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   });

  //   const body = `username=${user}&password=${password}&grant_type=password`;

  //   let source = this.http.post(this.oauthTokenUrl, body, {headers});
  //   let data = await lastValueFrom(source).then((response:any)=>{
  //     //console.log(response);
  //     this.armazenarToken(response['access_token']);
  //   }).catch(response=>{
  //     if(response.status === 400){
  //       if(response.error.error){
  //         return Promise.reject('Usuário ou senha inválido!')
  //       }
  //     }

  //     return Promise.reject(response)
  //   });

  //   return data;
  // }
  login(email: String, password: String): Promise<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded',
      });

    const body = `username=${email}&password=${password}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then((response:any) => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = response.json();

          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token:any){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

 async  obterNovoAccessToken(): Promise<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = 'grant_type=refresh_token';
    const source = this.http.post(this.oauthTokenUrl, body, {headers, withCredentials:true})

    return await lastValueFrom(source).then((response:any) =>{
      this.armazenarToken(response['access_token']);

      console.log("Novo access token criado")

      return Promise.resolve(null);
    }).catch((response:any) =>{

      console.error("Erro ao renovar TOKEN", response);
      return Promise.resolve(null);
    });
    
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temQualquerPermissao(roles:any){
    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }

    return false;
  }

  limparAccessToken(){
    localStorage.removeItem('token')
    this.jwtPayload = null
  }

  async logout(){
    await this.http.delete(this.tokenUrlRevoke, { withCredentials: true })
      .toPromise();
    this.limparAccessToken(); 
  }
}
