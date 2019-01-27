import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Imported custom modules
import { AppRoutingModule } from './app-routing.module';

// Imported components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { EditCollectionComponent } from './components/edit-collection/edit-collection.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


// Imported services
import { ArtCollectionService } from './services/art-collection.service';
import { AuthInterceptorService } from './services/auth-interceptor';

// Swiper config
import { GalleryModule } from './components/gallary/gallary.module';

import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({

  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminPanelComponent,
    AddCollectionComponent,
    EditCollectionComponent,
    NotFoundComponent,
    RegisterLoginComponent,
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    GalleryModule,
    ScrollingModule
    

  ],

  
  providers: [ArtCollectionService,
       {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
       ],
  bootstrap: [AppComponent]
})
export class AppModule { }
