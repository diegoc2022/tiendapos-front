import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { authGuard } from '../auth.guard';
import { VentasComponent } from './components/ventas/ventas.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { VinculosComponent } from './components/vinculos/vinculos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { PreciosComponent } from './components/precios/precios.component';
import { CajaComponent } from './components/caja/caja.component';
import { SesionComponent } from './components/sesion/sesion.component';

const routes: Routes = [
  { path:'', title: 'Login', component: LoginComponent},    
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path:'menu', title: 'menu', component: MenuComponent,canActivate:[authGuard],    
    children: [
        {
          path: 'ventas', component: VentasComponent,          
        },
        {
          path: 'descargas', component: DownloadsComponent,          
        },        
        {
          path: 'vinculos', component: VinculosComponent,          
        },
        {
          path: 'inventario', component: InventarioComponent,          
        },
        {
          path: 'precio', component: PreciosComponent,          
        },
        {
          path: 'cuadre', component: CajaComponent,          
        },
        {
          path: 'salir', component: SesionComponent,          
        },
      ], 
  },
  { path: '**', redirectTo: '' } // Captura rutas no definidas 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
