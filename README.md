# ng2-datepicker

Angular 2+ Simple and minimal datepicker component

![Minion](https://github.com/zhengmh010/ng2-3datepicker/edit/master/sum.png)


<p align="center">
</p>

<p align="center">
</p>

## Installation

1. Install package from `npm`.

```sh
npm install ng2-3datepicker --save
```

2. Include NgDatepickerModule into your application.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng_32datepickerModule } from 'ng2-32datepicker';

@NgModule({
  imports: [
    BrowserModule,
    Ng_32datepickerModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ]
})
export class AppModule {}
```

## Options

```ts
import { DatepickerOptions } from 'ng2-32datepicker';
import * as es from 'date-fns/locale/es/index';

 options: DatepickerOptions = {
      minYear: 1970,
      maxYear: 2030,
      displayFormat: 'YYYY-MM-DD',
      barTitleFormat: 'YYYY-MM',
      firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
      locale:cnLocale,
    };
```

For available `format` options check out [here](https://date-fns.org/docs/format).
For available `locale` options check out [here](https://date-fns.org/v1.28.5/docs/I18n)

## Run Included Demo

1. Clone this repository

```sh
git clone https://github.com/zheng010/ng2-3datepicker.git
cd ng2-3datepicker
```

2. Install packages

```sh
npm install
```

3. Run Demo

```sh
npm start
```

## Licence

MIT
# ng2-3datepicker
