import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imported components
import { GallaryComponent } from './components/gallary/gallary.component';


const routes: Routes = [
    {path: '', component: GallaryComponent}
  ]; 

@NgModule({
    exports: [RouterModule],
    imports: [
      RouterModule.forRoot(routes)
    ],
    declarations: []
  })
  export class AppRoutingModule { }