import { Component ,OnInit } from '@angular/core';
import { D3DatepickerOptions } from '../../ng-32datepicker';

import * as defaultLocale from 'date-fns/locale/en/index';

var cnLocale = require('date-fns//locale/zh_cn/index.js');

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html'
})
export class AppHomeComponent implements  OnInit {


  date: Date;

	markDays = [];


	options: D3DatepickerOptions = {
	  minYear: 1970,
	  maxYear: 2030,
	  displayFormat: 'YYYY-MM-DD',
	  barTitleFormat: 'YYYY-MM',
	  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
	  locale:cnLocale,
	};

  constructor() {
    this.date = new Date();
	}
	
	ngOnInit() {
		this.markDays = [{dateStart:'20171101',dateEnd:'20171103',type:'1'},{dateStart:'20171205',dateEnd:'20171207',type:'1'}]
	}

	onChangeCallback()
	{
		alert('hello')
	}

	public abc(event:Event):void {
		alert('sub 1234444')
		console.log(event);
	}
	
	public queryBeforeMonth(event:Event):void{
		alert('back');
	}
}
