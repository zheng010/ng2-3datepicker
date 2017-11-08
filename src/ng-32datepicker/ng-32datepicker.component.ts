import { Component, OnInit, Input,Output, Inject, OnChanges, SimpleChanges, ElementRef, HostListener, forwardRef ,EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  setYear,
  eachDay,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameDay,
  isSameMonth,
  isSameYear,
  format,
  getDay,
  subDays,
  setDay
} from 'date-fns';
import { ISlimScrollOptions } from 'ngx-slimscroll';
import * as defaultLocale from 'date-fns/locale/en/index';

import { Subscription } from 'rxjs/Subscription';

import { D3datepickerService } from './ng-32datepicker.service';

import { NodeEvent } from './ng-32datepicker.events';

var cnLocale = require('date-fns//locale/zh_cn/index.js');

export interface DatepickerOptions {
    minYear?: number; // default: current year - 30
    maxYear?: number; // default: current year + 30
    displayFormat?: string; // default: 'MMM D[,] YYYY'
    barTitleFormat?: string; // default: 'MMMM YYYY'
    firstCalendarDay?: number; // 0 = Sunday (default), 1 = Monday, ..
    locale?: any; // default: english 'date-fns/locale/en/index'
  }


@Component({
    moduleId: module.id,
    selector: 'ng-32datepicker',
    templateUrl: 'ng-32datepicker.component.html',
    styleUrls: ['ng-32datepicker.component.sass'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Ng_32datepickerComponent), multi: true, },
        D3datepickerService
      ]
})
export class Ng_32datepickerComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() options: DatepickerOptions;
    @Input() markDays: {
      dateStart: String; //YYYYMMDD
      dateEnd: String; //YYYYMMDD
      type: String;
    }[];
  
    private subscriptions: Subscription[] = [];

    @Output()
    public fNextMonth
    : EventEmitter<any> = new EventEmitter();

    markdayList: {
      day: Date;
      dateStart: String; //YYYYMMDD
      dateEnd: String; //YYYYMMDD
      type: String;
    }[];

    isOpened: boolean;
    innerValue: Date;
    displayValue: string;
    displayFormat: string;

    date: Date;
    dateNext: Date;
    dateNextNext: Date;

    barTitle: string;
    barTitleNext: string;
    barTitleNextNext: string;

    barTitleFormat: string;
    minYear: number;
    maxYear: number;
    firstCalendarDay: number;
    view: string;
    years: { year: number; isThisYear: boolean }[];
    dayNames: string[];
    scrollOptions: ISlimScrollOptions;

    days: {
      date: Date;
      day: number;
      month: number;
      year: number;
      inThisMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isVacation: boolean;
    }[];

    daysNext: {
        date: Date;
        day: number;
        month: number;
        year: number;
        inThisMonth: boolean;
        isToday: boolean;
        isSelected: boolean;
        isVacation: boolean;        
      }[];

    daysNextNext: {
      date: Date;
      day: number;
      month: number;
      year: number;
      inThisMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isVacation: boolean;      
    }[];


    locale: any;
  
    private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: any) => void = () => { };
  
    get value(): Date {
      console.log('----------get value-------');
      
      return this.innerValue;
    }
  
    set value(val: Date) {
      console.log('----------set value-------');
      
      this.innerValue = val;
      this.onChangeCallback(this.innerValue);
    }
  
    constructor(private elementRef: ElementRef,
      @Inject(D3datepickerService) private d3datepickerService: D3datepickerService) {
      this.scrollOptions = {
        barBackground: '#DFE3E9',
        gridBackground: '#FFFFFF',
        barBorderRadius: '3',
        gridBorderRadius: '3',
        barWidth: '6',
        gridWidth: '6',
        barMargin: '0',
        gridMargin: '0'
      };
    }
  
    ngOnInit() {
      this.view = 'days';
      this.date = new Date();
      this.setOptions();
      this.initDayNames();
      this.initYears();
      console.log('console markday');
      
      console.log(this.markDays);
      this.parsemarkDays();


      this.subscriptions.push(this.d3datepickerService.fNextMonth$.subscribe((e: NodeEvent) => {
        this.fNextMonth.emit(e);
      }));

    }
  
    parsemarkDays(){
      //put into a list

      this.markDays.forEach(element => {

        // 
        // const tmpdays = [];

        console.log(element);
        
         let start = new Date(Number(element.dateStart.substring(0,4)),Number(element.dateStart.substring(4,6)) - 1 ,Number(element.dateStart.substring(6,8) ) );
         let end = new Date(Number(element.dateEnd.substring(0,4)),Number(element.dateEnd.substring(4,6)) -1 ,Number(element.dateEnd.substring(6,8)));

        console.log(start);
        console.log(end);
        
        const tmpdays = eachDay(start, end).map(date => {
          console.log('---->' + date);
          return {
            day: date,
            dateStart: element.dateStart,
            dateEnd: element.dateEnd,
            type:element.type,
          };
        });

        if ( typeof(this.markdayList) !== 'undefined' )
        {          
          this.markdayList =  this.markdayList.concat(tmpdays);
        }else{
          this.markdayList = tmpdays;
        }
      });

      console.log(this.markdayList);
    }

    ngOnChanges(changes: SimpleChanges) {

         
      console.log('changes------------');

      console.log(changes);
    

      if ('options' in changes) {
        this.setOptions();
        this.initDayNames();

        this.init();

        this.initYears();
      }
    }
  
    setOptions(): void {
      this.minYear = this.options && this.options.minYear || getYear(this.date) - 30;
      this.maxYear = this.options && this.options.maxYear || getYear(this.date) + 30;
      this.displayFormat = this.options && this.options.displayFormat || 'MMM D[,] YYYY';
      this.barTitleFormat = this.options && this.options.barTitleFormat || 'YYYY-MM';
      this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;
      this.locale = this.options && this.options.locale || defaultLocale;
    }
  
    nextMonth(): void {
    
      // 调用service 方法
      this.d3datepickerService.setNextMonth('hello world123');

      // this.nodeNextMonth.emit('complete');
      this.date = addMonths(this.date, 1);
      this.init();
    }
  
    prevMonth(): void {
      this.date = subMonths(this.date, 1);
      this.init();
    }
  
    setDate(i: number): void {
        alert(i);
    //   this.date = this.days[i].date;
    //   this.value = this.date;
    //   this.init();
    //   this.close();
    }
  
    setYear(i: number): void {
      this.date = setYear(this.date, this.years[i].year);
      this.init();
      this.initYears();
      this.view = 'days';
    }
  
    isVacation(curday:Date,refdays:any[]):boolean {

        let ret = false;
        refdays.forEach(element => {
           if( isSameDay(curday,element.day) ) ret = true;
        });
        return ret;
    }

    init(): void {
      const start = startOfMonth(this.date);
      const end = endOfMonth(this.date);
      console.log('start =' + start);
      
      this.days = eachDay(start, end).map(date => {
        return {
          date: date,
          day: getDate(date),
          month: getMonth(date),
          year: getYear(date),
          inThisMonth: true,
          isToday: isToday(date),
          isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
          isVacation: this.isVacation(date,this.markdayList),
        };
      });
  
      for (let i = 1; i <= getDay(start) - this.firstCalendarDay; i++) {
        const date = subDays(start, i);
        console.log('i=' + i + ',getdate =' + getDate(date));
        
        this.days.unshift({
          date: date,
          day: getDate(date),
          month: getMonth(date),
          year: getYear(date),
          inThisMonth: false,
          isToday: isToday(date),
          isVacation: this.isVacation(date,this.markdayList),
          isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue)
        });
        console.log(this.days);        
      }
      console.log('11111 月' + getDay(start) );
      
      console.log(this.days);
      
      this.displayValue = format(this.innerValue, this.displayFormat, {locale: this.locale});
      this.barTitle = format(start, this.barTitleFormat, {locale: this.locale});

      this.initNext();
      this.initNextNext();
    }
  

    initNext(): void {
        console.log(">>>initNext");
        
        this.dateNext = addMonths(this.date, 1);
        console.log(this.date);
        console.log(this.dateNext);
        
        const start = startOfMonth(this.dateNext);
        const end = endOfMonth(this.dateNext);
        
        this.daysNext = eachDay(start, end).map(date => {
          return {
            date: date,
            day: getDate(date),
            month: getMonth(date),
            year: getYear(date),
            inThisMonth: true,
            isToday: isToday(date),
            // isVacation: true,
            isVacation: this.isVacation(date,this.markdayList),            
            isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue)
          };
        });
    
        for (let i = 1; i <= getDay(start) - this.firstCalendarDay; i++) {
          const date = subDays(start, i);
          this.daysNext.unshift({
            date: date,
            day: getDate(date),
            month: getMonth(date),
            year: getYear(date),
            inThisMonth: false,
            isToday: isToday(date),
            isVacation: this.isVacation(date,this.markdayList),
            isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue)
          });
        }
    
        // this.displayValue = format(this.innerValue, this.displayFormat, {locale: this.locale});
        this.barTitleNext = format(start, this.barTitleFormat, {locale: this.locale});
      }

      initNextNext(): void {
          console.log(">>>initNextNext()");
          
        this.dateNextNext = addMonths(this.date, 2);

        const start = startOfMonth(this.dateNextNext);
        const end = endOfMonth(this.dateNextNext);
        
        this.daysNextNext = eachDay(start, end).map(date => {
          return {
            date: date,
            day: getDate(date),
            month: getMonth(date),
            year: getYear(date),
            inThisMonth: true,
            isToday: isToday(date),
            // isVacation: true,
            isVacation: this.isVacation(date,this.markdayList),            
            isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue)
          };
        });
    
        for (let i = 1; i <= getDay(start) - this.firstCalendarDay; i++) {
          const date = subDays(start, i);
          this.daysNextNext.unshift({
            date: date,
            day: getDate(date),
            month: getMonth(date),
            year: getYear(date),
            inThisMonth: false,
            isToday: isToday(date),
            isVacation: this.isVacation(date,this.markdayList),
            isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue)
          });
        }
    
        console.log(this.daysNextNext);
        
        this.displayValue = format(this.innerValue, this.displayFormat, {locale: this.locale});
        this.barTitleNextNext = format(start, this.barTitleFormat, {locale: this.locale});
      }


    initYears(): void {
      const range = this.maxYear - this.minYear;
      this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
        return { year: year, isThisYear: year === getYear(this.date) };
      });
    }
  
    initDayNames(): void {
      this.dayNames = [];
      const start = this.firstCalendarDay;
      for (let i = start; i <= 6 + start; i++) {
        const date = setDay(new Date(), i);
        this.dayNames.push(format(date, 'dd', {locale: this.locale}));
      }
    }
  
    toggleView(): void {
      this.view = this.view === 'days' ? 'years' : 'days';
    }
  
    toggle(): void {
      this.isOpened = !this.isOpened;
    }
  
    writeValue(val: Date) {
      if (val) {
        this.date = val;
        this.innerValue = val;
        this.init();
        this.displayValue = format(this.innerValue, this.displayFormat, {locale: this.locale});
        this.barTitle = format(startOfMonth(val), this.barTitleFormat, {locale: this.locale});
      }
    }
  
    registerOnChange(fn: any) {
      // this.onChangeCallback = fn;
    }
  
    registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
    }

    ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub && sub.unsubscribe());
    }

  }
  