import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



//Imported custom modules
import { AppRoutingModule } from './app-routing.module';

//Imported components
import { AppComponent } from './app.component';
import { GallaryComponent } from './components/gallary/gallary.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

//Imported services
import { ArtCollectionService } from './services/art-collection.service';
 
@NgModule({
  declarations: [
    AppComponent,
    GallaryComponent,
    NavbarComponent, 
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ], 
  providers: [ArtCollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
