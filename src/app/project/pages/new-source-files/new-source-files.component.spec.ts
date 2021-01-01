import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSourceFilesComponent } from './new-source-files.component';

describe('NewSourceFilesComponent', () => {
  let component: NewSourceFilesComponent;
  let fixture: ComponentFixture<NewSourceFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSourceFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSourceFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
