import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeDeliveryComponent } from './scrape-delivery.component';

describe('ScrapeDeliveryComponent', () => {
  let component: ScrapeDeliveryComponent;
  let fixture: ComponentFixture<ScrapeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapeDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
