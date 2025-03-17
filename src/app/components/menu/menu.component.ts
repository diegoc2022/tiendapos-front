import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-menu',
  standalone: false, 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [      
      {
        label: 'Facturación',
        icon: 'pi pi-fw pi-dollar',
        items: [            
            {label: 'Cuadre de caja', icon: 'pi pi-fw pi-caret-right',routerLink:['cuadre']}, 
            {label: 'Facturación', icon: 'pi pi-fw pi-caret-right',routerLink:['ventas']}            
        ]
      },     
      {
        label: 'Otros',
        icon: 'pi pi-fw pi-file-edit',
        items: [           
            {label: 'Asociar producto', icon: 'pi pi-fw pi-caret-right',routerLink:['vinculos']},
            {label: 'Editar cantidad', icon: 'pi pi-fw pi-caret-right',routerLink:['inventario']},
            {label: 'Editar precio', icon: 'pi pi-fw pi-caret-right',routerLink:['precio']}                 
        ]
      },      
      {
        label: 'Seguridad',
        icon: 'pi pi-fw pi-lock',
        items: [
            {label: 'Cerrar sesion', icon: 'pi pi-fw pi-caret-right',routerLink:['salir']}            
        ]
      }
    ];
  }
}
