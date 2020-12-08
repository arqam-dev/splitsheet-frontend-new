
export class AuthService{
 
  loggedIn=false;
  Authuntecate(){
      const promise=new Promise(
          (resolve, reject)=>{
            console.log(localStorage.getItem('login'))
            if(localStorage.getItem('login')=='true')
            {
              resolve (true);
              this.loggedIn=true;
            }
            else{
              resolve (false);
            }
            resolve( this.loggedIn);
          }
      )
     return promise;
  }
  loggIn(){
      console.log("Login service is called")
      localStorage.setItem('login','true');
      this.loggedIn=true;
  }
  logout(){
    console.log('logout called...!')
      this.loggedIn=false;
      localStorage.removeItem('login');
  }
} 