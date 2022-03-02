import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDashComponent } from './image-dash.component';

describe('ImageComponent', () => {
  let component: ImageDashComponent;
  let fixture: ComponentFixture<ImageDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
