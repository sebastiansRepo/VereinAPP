import {Termin} from "./termin.model";
import {Trainer} from "./trainer.model";
import {Mitglied} from "./mitglied.model";

export class Kurs{

  constructor(public id? : string,
              public termine : Termin[] = [],
              public name? : string,
              public trainer : Trainer[] = [],
              public mitgliederAngemeldet : Mitglied[] = []) {

  }

}
