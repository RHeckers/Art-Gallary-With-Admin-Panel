import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSwapComponent } from './image-swap.component';

describe('ImageSwapComponent', () => {
  let component: ImageSwapComponent;
  let fixture: ComponentFixture<ImageSwapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSwapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
