import {Subscription} from "rxjs/Subscription";
import {Injectable} from "@angular/core";

@Injectable()
export class SubscriptionService {

  private subscriptions : Subscription[] = [];

  constructor() {}

  public addSubscription(sub : Subscription) : void {
    this.subscriptions.push(sub);
  }

  public removeSubscription(sub : Subscription) : void {
    let index = this.subscriptions.indexOf(sub);

    this.subscriptions.splice(index,1);
  }

  public getSubscriptions() : Subscription[] {
    return this.subscriptions;
  }

  public unsubscribeAll() : void {
    this.subscriptions.forEach( (subscription) => subscription.unsubscribe() );
    //clear list
    this.subscriptions = [];
  }

}
