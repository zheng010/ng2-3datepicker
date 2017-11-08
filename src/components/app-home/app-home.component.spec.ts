import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Ng_32datepickerModule } from '../../ng-32datepicker';
import { AppHomeComponent } from './app-home.component';

describe(`App`, () => {
  let comp: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeComponent ],
      imports: [ Ng_32datepickerModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
});
