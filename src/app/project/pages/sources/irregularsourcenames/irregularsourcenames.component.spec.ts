import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrregularsourcenamesComponent } from './irregularsourcenames.component';

describe('IrregularsourcenamesComponent', () => {
  let component: IrregularsourcenamesComponent;
  let fixture: ComponentFixture<IrregularsourcenamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrregularsourcenamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrregularsourcenamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
