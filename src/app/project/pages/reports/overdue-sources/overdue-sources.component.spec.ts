import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueSourcesComponent } from './overdue-sources.component';

describe('OverdueSourcesComponent', () => {
  let component: OverdueSourcesComponent;
  let fixture: ComponentFixture<OverdueSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverdueSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
