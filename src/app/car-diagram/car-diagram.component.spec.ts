import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDiagramComponent } from './car-diagram.component';

describe('CarDiagramComponent', () => {
  let component: CarDiagramComponent;
  let fixture: ComponentFixture<CarDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
