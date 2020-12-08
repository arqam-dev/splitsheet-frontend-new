import { 
    CanActivate ,
    ActivatedRouteSnapshot ,
    RouterStateSnapshot ,
    Router} 
from "@angular/router";
import {Observable} from 'rxjs/Observable'
import {AuthService} from './Auth/login.service';
import {Injectable} from '@angular/core'
@Injectable()
export class UnauthGuard implements CanActivate{
    constructor(private auth:AuthService,private router:Router){}
    canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
         return this.auth.Authuntecate()
          .then(
              (authuntecated:boolean)=>{
                  if(authuntecated===true){
                      console.log(authuntecated)
                    this.router.navigate(['/'])
                  }
                  else{
                    return authuntecated;
                  }

              }
          )
        return true;
    }

} 