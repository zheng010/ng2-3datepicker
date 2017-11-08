// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSlimScrollModule } from 'ngx-slimscroll';

// This Module's Components
import { Ng_32datepickerComponent } from './ng-32datepicker.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, NgSlimScrollModule,
    ],
    declarations: [
        Ng_32datepickerComponent,
    ],
    exports: [
        Ng_32datepickerComponent, CommonModule, FormsModule,NgSlimScrollModule
    ]
})
export class Ng_32datepickerModule {

}
