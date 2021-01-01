import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSmmaryComponent } from './show-smmary.component';

describe('ShowSmmaryComponent', () => {
  let component: ShowSmmaryComponent;
  let fixture: ComponentFixture<ShowSmmaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSmmaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSmmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
