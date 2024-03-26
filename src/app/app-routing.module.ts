import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ! Pages
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home - Pokédex'
  },
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
