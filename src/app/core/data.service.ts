import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}
  getNations() {
    return of([
      { value: null, label: " -- " },
      { value: 1, label: "Bahrain" },
      { value: 2, label: "Kuwait" }
    ]);
  }
  getCities(nationId: number = null) {
    return of(
      [
        { value: null, label: " -- ", nationId: null },
        { value: 1, label: "Saddad", nationId: 1 },
        { value: 1, label: "Manama", nationId: 1 },
        { value: 2, label: "Jahra", nationId: 2 }
      ].filter(entry => {
        if (nationId) {
          return entry.nationId === nationId;
        } else {
          return true;
        }
      })
    );
  }
}
