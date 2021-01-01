import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditirregularsourcenamesComponent } from './addeditirregularsourcenames.component';

describe('AddeditirregularsourcenamesComponent', () => {
  let component: AddeditirregularsourcenamesComponent;
  let fixture: ComponentFixture<AddeditirregularsourcenamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditirregularsourcenamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditirregularsourcenamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
