import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgOptionHighlightModule } from "@ng-select/ng-option-highlight";

import {
  ReactiveFormsModule,
  FormControl,
  ValidationErrors
} from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyMaterialModule } from "@ngx-formly/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgSelectFormlyComponent } from "./ng-select.type";
import { CommonModule } from "@angular/common";

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `Please provide value bigger than ${err.min}. You provided ${err.actual}`;
}

export function ipValidationMessage(err, field: FormlyFieldConfig) {
  return `"${field.formControl.value}" is not a valid IP address.`;
}

export function IpValidator(control: FormControl): ValidationErrors {
  return !control.value || /(\d{1,3}\.){3}\d{1,3}/.test(control.value)
    ? null
    : { ip: true };
}

@NgModule({
  declarations: [AppComponent, NgSelectFormlyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    CommonModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: "ip",
          validation: IpValidator
        }
      ],
      validationMessages: [
        {
          name: "required",
          message: "This field is required"
        },
        {
          name: "min",
          message: minValidationMessage
        },
        {
          name: "ip",
          message: ipValidationMessage
        }
      ],
      types: [
        {
          name: "my-autocomplete",
          component: NgSelectFormlyComponent
        }
      ]
    }),
    FormlyBootstrapModule,
    FormlyMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
