import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestableComponent } from './gamestable.component';

describe('GamestableComponent', () => {
  let component: GamestableComponent;
  let fixture: ComponentFixture<GamestableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamestableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
