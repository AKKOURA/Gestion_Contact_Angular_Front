import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Component/Accueil/accueil.component';
import { ContactComponent } from './Component/contact/Contact.component';
import { FooterComponent } from './Component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { CreateContact_modalComponent } from './Component/contact/create-contact-modal/create-contact_modal/create-contact_modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { UpdateContactModalComponent } from './Component/contact/update-contact-modal/update-contact-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GroupeComponent } from './groupe/groupe.component';
import { CreateGroupeModalComponent } from './groupe/create-groupe-modal/create-groupe-modal.component';
import { UpdateGroupeModalComponent } from './groupe/update-groupe-modal/update-groupe-modal.component';
import { AddGroupToContactComponent } from './Component/contact/add-group-to-contact/add-group-to-contact..component';
import { DeleteGroupFromContactComponent } from './Component/contact/delete-group-from-contact/delete-group-from-contact.component';
import { ConfirmDialogComponent } from './Component/confirm-dialog/confirm-dialog.component';
import { AddContactToGroupComponent } from './Component/contact/add-contact-to-group/add-contact-to-group.component';
import { DeleteContactFromGroupComponent } from './Component/contact/delete-contact-from-group/delete-contact-from-group.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'groupes', component: GroupeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContactComponent,
    AccueilComponent,
    CreateContact_modalComponent,
    UpdateContactModalComponent,
    GroupeComponent,
    CreateGroupeModalComponent,
    UpdateGroupeModalComponent,
    AddGroupToContactComponent,
    DeleteGroupFromContactComponent,
    ConfirmDialogComponent,
    AddContactToGroupComponent,
    DeleteContactFromGroupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
