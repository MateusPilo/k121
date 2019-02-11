import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlePeopleComponent } from './controle-people.component';

describe('ControlePeopleComponent', () => {
  let component: ControlePeopleComponent;
  let fixture: ComponentFixture<ControlePeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlePeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
