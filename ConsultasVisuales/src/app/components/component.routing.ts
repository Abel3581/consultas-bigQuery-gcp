import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { GraficasComponent } from './graficas/graficas.component';
import{AdminComponent} from './admin/admin.component'
import { SearchComponent } from './search/search.component';
import { AllComponent } from './all/all.component';
import { GraficoCircularComponent } from './grafico-circular/grafico-circular.component';



const routes: Routes = [

{ path : '',

   children:[
    {
      path: '',
      component: AdminComponent
    },
    {
      path: 'natalidad',
      component: ConsultasComponent

    },
    {
      path: 'graficas',
      component: GraficasComponent
    },
    {
      path: 'buscar/:id',
      component: SearchComponent
    },
    {
      path: 'buscar',
      component: SearchComponent
    },
    {
      path: 'todos',
      component: AllComponent
    },
    {
      path: 'circular', component: GraficoCircularComponent
    },
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },


   ]


}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})

export class ComponentRoutingModule {}
