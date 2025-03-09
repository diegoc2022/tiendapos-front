import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VinculosService } from '../vinculos/services/vinculos.service';
import { VentasService } from './services/ventas.service';
import { MessageService } from 'primeng/api';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import { ProductosService } from '../productos/services/productos.service';
import { CurrencyPipe } from '@angular/common';
import { ImpresionService } from '../imprimir/services/impresion.service';
import { SecuenciaService } from '../secuencia/services/secuencia.service';

@Component({
  selector: 'app-ventas', 
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss',
  standalone: false  
})
export class VentasComponent {
    products: any[]=[]; 
    dataBuscaProductos:any[] = [];  
    consultData: any[]=[];
    fecha_actual: Date = new Date();
    selectedProduct1?:any;
    selectedProduct2?:any[];
    data:FormGroup = new FormGroup({});
    data2:FormGroup = new FormGroup({});  
    data3:FormGroup = new FormGroup({});
    data4:FormGroup = new FormGroup({});    
    data5:FormGroup = new FormGroup({}); 
    data6:FormGroup = new FormGroup({}); 
    value1: string='';
    total_venta:number=0;     
    total_articulos:number =1;
    origen_venta:string='Ventas-1';
    idVentas:number=0; 
    prefijo_v:string='';
    openventas:string='abierto1';
    closeventas:string='cerrado1';
    idApertCaja:any=0;
    currentDate?: Date;
    date?:string;
    conteo:number =0;
    posicion:number=0;
    fecha_apertura:string=''; 
    factura:number=0;  
    habilitado:boolean = false; 
    visible:boolean = false;
    visible2:boolean = false;
    visible3:boolean = false;
    visible4:boolean = false;
    visible5:boolean = false;
    total_efectivo:number =0;
    total_cambio:number =0;
    efectivo:any=0;
    venta_total:any=0;
    producto_unidad:any[]=[]; 
    elimina_paquete_producto:any[]=[];
    idSecuencia:any[]=[];     
  
    constructor(               
      private fb: FormBuilder,
      private vinculos:VinculosService,
      private ventas: VentasService,
      private message: MessageService,
      private productos: ProductosService,
      private currencyPipe: CurrencyPipe,
      private impresion: ImpresionService,
      private secuencia:SecuenciaService   
      ){ 
               
    } 
      
    ngOnInit() {
        this.data = this.fb.group({
          codProducto: [null , Validators.required]
        }); 
        
        this.data2 = this.fb.group({
          cantidad:[null , Validators.required]
        });

        this.data3 = this.fb.group({        
          efectivo: [null, [Validators.required]]          
        });
        
        this.data4 = this.fb.group({        
          dlCodProducto: [null, [Validators.required]]          
        });       

        this.data5 = this.fb.group({
          codProd:[null , Validators.required],
          descripcion:[null , Validators.required],
          existencia:[null , Validators.required],
          cant:[null , Validators.required],
          precio_venta:[null , Validators.required],
          precio_compra:1
        });

        this.data6 = this.fb.group({
          factura:[null , Validators.required]
        });
         
        
        this.funct_retorna_ventas_c();
        this.funct_retorna_all_productos_c();
        this.funct_retorna_secuencia_c();
        this.visible = false;
        this.visible2 =false;
        this.visible3 =false;
        this.visible4 =false;
        this.visible5 =false;
        
  }  

  funct_retorna_productos_c(){    
      this.vinculos.funct_retorna_vinculos_s(this.data.value.codProducto).subscribe({
        next:data=>{
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);
          //const estado_apertura=localStorage.getItem('estado_apertura_caja');                                                                                            
          if (obj.code != 201) {
            this.idApertCaja= localStorage.getItem('id_caja');               
            this.ventas.funct_tegistra_ventas_s(obj[0].producto,this.origen_venta,this.openventas,this.idApertCaja,this.factura).subscribe({
              next:data=>{
                this.funct_retorna_ventas_c();                             
              }
              });               
            } else{
              this.message.add({ severity: 'warn', summary: 'Advertencia: ', detail: 'El producto que intenta vender no existe en base de datos o no se encuentra asociado', life: 2000 });
              
            }                   
          this.data.setValue({codProducto:''});   
        }
      })   
  }

  funct_retorna_ventas_c(){
    this.ventas.funct_retorna_all_s().subscribe({
      next:data=>{
      const objData = JSON.stringify(data);
      const obj = JSON.parse(objData);        
      this.total_articulos = 0;       
      this.total_venta=0;
      this.data.reset();
      this.products = [];
      for (let index = 0; index < obj.length; index++) {
        if (obj[index].estado == 'abierto1') {                 
              this.total_articulos++;        
              this.products.push(obj[index]);
              this.products.reverse();                                
              this.total_venta = this.total_venta + obj[index].subtotal;                         

              if (obj[index].existencia < 1) {
                this.habilitado =true;
              } 
              
              if (obj[index].precio_compra > obj[index].precio_venta) {
                this.habilitado =true;
              } 
          } 
        } 
      }
    })
  }

  funct_edita_cantidad_c(product:any) {   
    this.ventas.funct_edita_cantidad_s(product).subscribe({
      next:data=>{
        this.funct_retorna_ventas_c();        
      }
    })
  }

  funct_elimina_Item_ventas_c(product:any){     
    this.ventas.funct_elimina_item_ventas_s(product).subscribe({
      next:data=>{
        this.funct_retorna_ventas_c();      
        this.habilitado = false; 
        this.message.clear();
        this.message.add({ severity: 'warn', summary: 'Advertencia: ', detail: 'Ha eliminado un producto de la lista de compras', life: 1000 });
                      
      }
    })  
  }

  funct_elimina_id_ventas_c(){
    Swal.fire({
          title: '¡Avertencia!',
          text: 'Todos los productos del carrito de compras se borrarán. ¿Está seguro?',
          icon: 'warning',
          width:'400px',               
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor:'#3085d6',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Ignorar',          
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
            this.ventas.funct_elimina_id_ventas(this.products).subscribe({
              next:data=>{               
                if (data == null) {                
                  setTimeout(()=>{
                    this.funct_retorna_ventas_c();
                    this.habilitado = false;                    
                    this.message.add({severity:'warn', summary: 'Advertencia:', detail: 'Ha eliminado todos los productos de la lista de compras.', life:2000});
                  },1000)                                                      
                }                            
              }
            })            
          }
      });   
  }

  funct_retorna_all_productos_c(){
    this.dataBuscaProductos =[];
    this.productos.funct_retorna_productos_s().subscribe({
      next:data =>{   
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        for (let index = 0; index < obj.length; index++) {
          this.dataBuscaProductos.push(obj[index]);   
        }             
      }
    })
  }

  onRowSelect(event:any) {      
    this.vinculos.funct_retorna_vinculos_s(event.data.codProd).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const data2 = JSON.parse(objData);       
        const estado_apertura= 'true' //localStorage.getItem('estado_apertura');
        if (estado_apertura == 'true') {
          if (data2[0].producto != null) {          
            let id_apertura = 0 //localStorage.getItem('id_caja'); 
            let factura = 0 // localStorage.getItem('factura')         
            this.ventas.funct_tegistra_ventas_s(data2[0].producto,this.origen_venta,this.openventas,id_apertura,factura).subscribe({
              next:resp =>{
              this.funct_retorna_ventas_c();                       
              this.visible = false; 
              this.message.add({severity:'info', summary:'Informativo', detail: 'Acaba de agregar un producto mas en la lista de compras',life:1000});                              
            },error:any=>{
              console.log("Error: error");            
            }
            });

          } else{
            this.message.add({severity:'error', summary:'Product Selected', detail:'El producto que intenta vender no existe en base de datos',life:3000});
          }   
        } else {
          this.message.add({severity:'warn', summary:'Adventencia:', detail:'Antes de iniciar operación, debe generar apertura de caja',life: 3000});
        }        

      }         
      
  }); 
  }

  onRowSelect2(event:any) {                 
    this.vinculos.funct_retorna_vinculos_s(event.data.codProd).subscribe({
      next:data=>{
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);
          let id_apertura = 0 //localStorage.getItem('id_caja'); 
          let factura = 0 // localStorage.getItem('factura')                                                                                                 
          if (obj != null) {
            this.ventas.funct_elimina_item_ventas_s(this.elimina_paquete_producto[0]).subscribe({
              next:data=>{
                this.ventas.funct_tegistra_ventas_s(obj[0].producto,this.origen_venta,this.openventas,id_apertura,factura).subscribe({
                  next:data=>{
                    this.funct_retorna_ventas_c();                   
                    this.visible4 = false;                          
                  }
                });                     
              }
            })                       
          }       
      }     
    })   
  }


  funct_imprime_facturas_c(){
    this.impresion.funct_imprime_facturas(this.idSecuencia);     
  }

  funct_close_ventas_c() {   
    this.ventas.funct_close_ventas_s(this.products).subscribe({
      next:data=>{       
        this.secuencia.funct_edita_id_secuencia(this.idSecuencia).subscribe({
          next:data=>{
              this.total_efectivo=0;             
              this.visible2=false; 
              this.funct_retorna_ventas_c();
              this.funct_retorna_secuencia_c();               
            }
          })                         
      }       
    });   
  }

  funct_calcula_efectivo_c(){
    this.efectivo = this.currencyPipe.transform(this.data3.value.efectivo, '$', 'symbol', '1.2-2');  
    this.venta_total = this.currencyPipe.transform(this.total_venta, '$', 'symbol', '1.2-2');  

    function parseCurrency(value: string): number { 
      return parseFloat(value.replace(/[$,]/g, ''));
    }

    const efectivo = parseCurrency(this.efectivo);
    const total_venta = parseCurrency(this.venta_total);
    
    if(efectivo >= total_venta) {
      this.total_cambio =efectivo - total_venta;      
    }else{
      this.total_cambio =0;
      this.message.add({severity:'info', summary:'Product Selected', detail:'Debe ingresar un valor mayor o igual a total a pagar'});
    }
    
  }

  funct_show_dialog_c(){
    this.visible = true;
  }
  
  funct_show_dialog_2_c(){
    this.data3.setValue({efectivo:''});    
    this.visible2 = true;
  } 

  funct_show_dialog_3_c(){   
    this.visible3 = true;
  }

  funct_retorna_productos_otras_ventas_c() {        
    this.vinculos.funct_retorna_vinculos_s(this.data4.value.dlCodProducto).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const data2 = JSON.parse(objData); 
        console.log("data: ",data2[0].producto.codProd);
        if (data2[0].producto != null) {          
          this.data5.get('codProd')?.setValue(data2[0].producto.codProd);
          this.data5.get('descripcion')?.setValue(data2[0].producto.descripcion);
          this.data5.get('existencia')?.setValue(data2[0].producto.existencia);
          this.data5.get('cant')?.setValue(1); 
          this.data4.setValue({dlCodProducto:''});
          const nextElement = (document.querySelector(`[formControlName="precio_venta"]`) as HTMLElement);
          nextElement.focus();                                     

          } else{
            this.message.add({severity:'error', summary:'Product Selected', detail:'El producto que intenta vender no existe en base de datos',life:3000});
          }
      }  
      
  }); 
  }
  
  funct_registra_otras_ventas_c() { 
    const estado_apertura= 'true' //localStorage.getItem('estado_apertura_caja');   
    let id_apertura = 0 //localStorage.getItem('id_caja'); 
    let factura = 0 // localStorage.getItem('factura')  
    if (estado_apertura == 'true') {    
      this.ventas.funct_tegistra_ventas_s(this.data5.value,this.origen_venta,this.openventas,id_apertura,factura).subscribe({
        next:data=>{        
          this.data.reset();  
          this.visible3=false;     
          this.funct_retorna_ventas_c();          
          this.data2.get('codProd')?.setValue('');
          this.data2.get('descripcion')?.setValue('');
          this.data2.get('existencia')?.setValue('');
          this.data2.get('cant')?.setValue(''); 
          this.data2.get('precio_venta')?.setValue('');        
        }
      })    
    } else {
      this.message.add({severity:'warn', summary:'Adventencia:', detail:'Antes de iniciar operación, debe generar apertura de caja',life: 3000});
    }  
    
  }

  funct_retorna_venta_por_und_c(product:any){   
    this.visible4 = true; 
    this.elimina_paquete_producto.length = 0;
    this.vinculos.funct_retorna_vinculos_s(product.codProd).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData); 
        this.producto_unidad.length = 0;         
        this.producto_unidad.push(obj[1].producto);        
        this.elimina_paquete_producto.push({
          id:product.id,
          codProd:product.codProd
        });        
                
      }                       
       
    })       
    
  }

  funct_retorna_secuencia_c(){
    this.secuencia.funct_retorna_id_secuencia().subscribe({
      next:id=>{
        const objData = JSON.stringify(id);
        const obj = JSON.parse(objData);              
        this.factura =0;
        this.factura += obj[0].id_secuencia + 1;
        this.idSecuencia.length =0;
        this.idSecuencia.push({
          nombre:obj[0].nombre,
          id_secuencia:obj[0].id_secuencia + 1
        })    
        //localStorage.setItem('factura',this.factura);            
      }      
    })
    if (this.total_articulos == 0) {
      this.habilitado =false;
    }
  }

  funct_mostrar_dialog_reimprimir_factura_c(){
    this.visible5 = true
  }

  funct_reimprime_facturas_c(){
    this.idSecuencia.length =0;
    this.idSecuencia.push({      
      id_secuencia:this.data6.value.factura
    })    
    
    if (this.idSecuencia[0].id_secuencia != '' || this.idSecuencia[0].id_secuencia != 0) {
      this.impresion.funct_imprime_facturas(this.idSecuencia);
      this.visible5 = false;      
    } else {
      this.message.add({severity:'error', summary: 'Error:', detail: 'Debe incluir un número de factura', life: 3000});
    }
    
  }

}
