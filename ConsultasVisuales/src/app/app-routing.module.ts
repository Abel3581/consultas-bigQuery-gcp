import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ComponentRoutingModule } from './components/component.routing';


const routes: Routes = [
  { path: 'consultas',
  loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
  { path: '', redirectTo: 'consultas', pathMatch: 'full' },

 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouterModule]

})
export class AppRoutingModule { }
