import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPokemonEvolutionComponent } from './dialog-pokemon-evolution.component';

describe('DialogPokemonEvolutionComponent', () => {
  let component: DialogPokemonEvolutionComponent;
  let fixture: ComponentFixture<DialogPokemonEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPokemonEvolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogPokemonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
