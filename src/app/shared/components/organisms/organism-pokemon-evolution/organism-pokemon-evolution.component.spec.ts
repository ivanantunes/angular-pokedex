import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismPokemonEvolutionComponent } from './organism-pokemon-evolution.component';

describe('OrganismPokemonEvolutionComponent', () => {
  let component: OrganismPokemonEvolutionComponent;
  let fixture: ComponentFixture<OrganismPokemonEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismPokemonEvolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganismPokemonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
