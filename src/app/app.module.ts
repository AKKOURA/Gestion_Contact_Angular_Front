import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Component/Accueil/accueil/accueil.component';
import { ContactComponent } from './Component/contact/Contact.component';
import { FooterComponent } from './Component/footer/footer/footer.component';
const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'contacts', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
