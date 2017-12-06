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
		this.markDays = [{dateStart:'20301101',dateEnd:'20301101',type:'1'},{dateStart:'20301201',dateEnd:'20301201',type:'1'}]
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

	public selecedNode(event:Event):void{
		console.log(event);
	}
	aaa():void{
		this.markDays = [{dateStart:'20170503',dateEnd:'20170505',showtype:'2',type:'3'},{dateStart:'20170605',dateEnd:'20170609',showtype:'1',type:{vid:123,start:'20170605',end:'20170608',vtype:'2',vtypename:'hello'}}]		
			this.date = new Date(2017,4,1);
	}
	bbb():void{
		this.markDays = [{dateStart:'20170703',dateEnd:'20170705',showtype:'1',type:'4'},{dateStart:'20170805',dateEnd:'20170809',type:'1'}]		
		
		this.date = new Date(2017,6,1);
		
	}
	ccc():void{
		this.date = new Date(2017,8,1);
		
	}
}
