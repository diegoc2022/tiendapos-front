import { SesionService } from './components/sesion/services/sesion.service';
import { CuadreCajaService } from './components/imprimir/services/cuadre.service';
import { CajaService } from './components/caja/services/caja.service';
import { SecuenciaService } from './components/secuencia/services/secuencia.service';
import { ImpresionService } from './components/imprimir/services/impresion.service';
import { PreciosService } from './components/precios/services/precios.service';
import { InventarioService } from './components/inventario/services/inventario.service';
import { DownloadsService } from './components/downloads/services/downloads.service';
import { ProductosService } from './components/productos/services/productos.service';
import { VinculosService } from './components/vinculos/services/vinculos.service';
import { LoginService } from './components/login/services/login.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { VentasComponent } from './components/ventas/ventas.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ProductosComponent } from './components/productos/productos.component';
import { DialogModule } from 'primeng/dialog';
import { CurrencyPipe } from '@angular/common';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VinculosComponent } from './components/vinculos/vinculos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { PreciosComponent } from './components/precios/precios.component';
import { CajaComponent } from './components/caja/caja.component';
import { SesionComponent } from './components/sesion/sesion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    VentasComponent,
    ProductosComponent,
    DownloadsComponent,
    VinculosComponent,
    InventarioComponent,
    PreciosComponent,
    CajaComponent,
    SesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MenubarModule,
    AvatarModule,
    InputGroupModule,
    InputGroupAddonModule,
    TableModule,
    BadgeModule,
    OverlayBadgeModule,
    InputNumberModule,
    ToastModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    SesionService,
    CuadreCajaService,
    CajaService,
    SecuenciaService,
    ImpresionService,
    PreciosService,
    InventarioService,
    DownloadsService,
    ProductosService,
    VinculosService,
    LoginService,
    MessageService,
    CurrencyPipe,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
