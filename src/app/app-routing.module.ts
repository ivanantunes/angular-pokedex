import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ! Pages
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

const routes: Routes = [
  {
    path: 'pokemon/details/:id',
    component: PokemonDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
