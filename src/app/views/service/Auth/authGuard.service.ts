import { 
    CanActivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot ,
    Router} 
from "@angular/router";
import {Observable} from 'rxjs/Observable'
import {AuthService} from './login.service';
import {Injectable} from '@angular/core'
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth:AuthService,private router:Router){}
    canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
         return this.auth.Authuntecate()
          .then(
              (authuntecated:boolean)=>{
                  if(authuntecated===true){
                    return authuntecated;
                  }
                  else{
                      this.router.navigate(['/'])
                  }

              }
          )
        return true;
    }

} 