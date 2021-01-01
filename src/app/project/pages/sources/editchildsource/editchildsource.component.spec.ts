import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditchildsourceComponent } from './editchildsource.component';

describe('EditchildsourceComponent', () => {
  let component: EditchildsourceComponent;
  let fixture: ComponentFixture<EditchildsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchildsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditchildsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
