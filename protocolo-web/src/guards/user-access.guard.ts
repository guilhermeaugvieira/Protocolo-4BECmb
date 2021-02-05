import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  EnumTokenUsuario,
  UserService,
} from 'src/app/services/UserService/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccessGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.verificaTokenUsuario() === EnumTokenUsuario.logado)
      return true;

    this.router.navigateByUrl('/login');
    return false;
  }
}
