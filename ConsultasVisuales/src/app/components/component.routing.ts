import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasComponent } from './consultas/consultas.component';
import { GraficasComponent } from './graficas/graficas.component';
import{AdminComponent} from './admin/admin.component'
import { SearchComponent } from './search/search.component';
import { AllComponent } from './all/all.component';
import { GraficoCircularComponent } from './grafico-circular/grafico-circular.component';
import { DistributedColumnsComponent } from './distributed-columns/distributed-columns.component';
import { GraficoSearchIdComponent } from './grafico-search-id/grafico-search-id.component';
import { NacimientosPorAnoComponentComponent } from './nacimientos-por-ano-component/nacimientos-por-ano-component.component';



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
      path: 'columnas', component: DistributedColumnsComponent
    },
    {
      path: 'search-id', component: GraficoSearchIdComponent
    },
    {
      path: 'nacimientos', component: NacimientosPorAnoComponentComponent
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
