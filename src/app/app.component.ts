import { DataService } from "./core/data.service";
import { Component } from "@angular/core";
import { FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";



import { switchMap, startWith } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    id: 123,
    firstname: "Ali",
    age: 34,
    nationId: 1,
    cityId: 1,
    ip: null
  };

  constructor(private dataService: DataService) {}

  fields: FormlyFieldConfig[] = [
    {
      key: "id"
    },
    {
      key: "firstname",
      type: "input",
      templateOptions: {
        label: "First name",
        required: true
      }
    },
    {
      key: "age",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Age",
        min: 18
      }
    },
    {
      key: "nationId",
      type: "my-autocomplete",
      templateOptions: {
        label: "Nation",
        options: this.dataService.getNations()
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.form.get("age").valueChanges;
        }
      }
    },
    {
      key: "cityId",
      type: "select",
      templateOptions: {
        label: "Cities",
        options: []
      },
      hideExpression: "!model.nationId",
      expressionProperties: {
        "templateOptions.disabled": model => !model.nationId,
        "model.cityId": "!model.nationId ? null : model.cityId"
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form
            .get("nationId")
            .valueChanges.pipe(
              startWith(this.model.nationId),
              switchMap(nationId => this.dataService.getCities(nationId))
            );
        }
      }
    },
    {
      key: "ip",
      type: "input",
      templateOptions: {
        label: "IP Address",
        require:true,
      },
      validators:{
        validation:['ip']
      }
    }
  ];

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
