import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Imported components
import { GallaryComponent } from './components/gallary/gallary.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddCollectionComponent } from './components/add-collection/add-collection.component';
import { EditCollectionComponent } from './components/edit-collection/edit-collection.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BioComponent } from './components/Bio/Bio.component';
import { InfoComponent } from './components/info/info.component';



const routes: Routes = [
    {path: '', component: GallaryComponent},
    {path: 'bio', component: BioComponent},
    {path: 'info', component: InfoComponent},
    {path: 'admin', component: AdminPanelComponent},
    {path: 'add-collection', component: AddCollectionComponent},
    {path: 'edit-collection', component: EditCollectionComponent},
    {path: 'edit-collection/:id', component: EditCollectionComponent},
    {path: '**', component: NotFoundComponent}
  ]; 

@NgModule({
    exports: [RouterModule],
    imports: [
      RouterModule.forRoot(routes)
    ],
    declarations: []
  })
  export class AppRoutingModule { }