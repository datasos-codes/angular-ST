import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropErrorsComponent } from './drag-drop-errors.component';

describe('DragDropErrorsComponent', () => {
  let component: DragDropErrorsComponent;
  let fixture: ComponentFixture<DragDropErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
