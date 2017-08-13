import {Mitglied} from "./mitglied.model";

export class Termin{

  constructor(public id? : string,
              public datum? : Date,
              public mitgliederAnwesend : Mitglied[] = []) {

  }

}
