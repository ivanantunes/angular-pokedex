// ! Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ! Ngx
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// ! Routing
import { AppRoutingModule } from './app-routing.module';

// ! Components
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './shared/components/organisms/card/card.component';

// ! Pages
import { AppComponent } from './app.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { HomeComponent } from './pages/home/home.component';

// ! Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MoleculeSearchComponent } from './shared/components/molecules/molecule-search/molecule-search.component';

@NgModule({
  declarations: [
    // ! Pages
    AppComponent
  ],
  imports: [
    // ! Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ! Routers
    AppRoutingModule,
    // ! Ngx
    ToastrModule.forRoot(),
    NgxChartsModule,
    // ! Material
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    // ! Components
    HeaderComponent,
    CardComponent,
    PokemonDetailsComponent,
    HomeComponent,
    // ? Molecules
    MoleculeSearchComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
