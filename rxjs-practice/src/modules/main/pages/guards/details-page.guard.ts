import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import { GoodStorageService } from '../../services/good-storage.service';


@Injectable({ providedIn: "root" })
export class DetailsPageGuard implements CanActivate, CanActivateChild {
  constructor(
    private storage: GoodStorageService,
  ) {
  }

  async canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.storage.selectedGoodId) {
      return true;
    }

    if (childRoute.params['id'] === "new") {
      this.storage.selectGood('new', );
    }
    else {
      await this.storage.getGood(+childRoute.params['id']);
    }
    return true;
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return !!this.storage.selectedGoodId;
  }
}
