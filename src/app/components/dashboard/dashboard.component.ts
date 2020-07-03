import { Component, OnInit } from '@angular/core';
import  *  as  data  from  './data.json';
import { HttpClientModule, HttpClient }    from '@angular/common/http';

declare let Email: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
/* show and hide forms*/
  costoVenta = 'not-active';
  resultadoCosto = 'not-active';
  datosCalculo = 'active';

/* grupo = datos a ingresar */
  grupo = {
    pesoPromedio: 3.4,
    precioProveedor: 30,
    costoDiesel: 19.30,
    cantidadPollo: 2500,
    proveedor: 1
  };

/* grucalculospo = datos a calculados conforme a datos ingresados */
  calculos = {
    costoViaje: 0,
    costoMerma: null,
    costoUniViaje: null,
    costoPollo: null,
    costoVenta: null
  }

/* arreglo de proveedores (pasar a json) */
  proveedores = [
    {
      "id": 1,
      "nombre": "PROVEEDOR 1",
      "origen": "COCULA",
      "kilometros": 418.00,
      "rendimiento_kilometraje": 1.68,
      "diesel":  4802.02,
      "casetas": 1600.00,
      "pago_chofer": 1000.00,
      "viaticos": 200.00,
      "merma_100g": 0.03
    },
    {
      "id": 2,
      "nombre": "PROVEEDOR 2",
      "origen": "MX",
      "kilometros": 411.00,
      "rendimiento_kilometraje": 1.88,
      "diesel":  4802.02,
      "casetas": 1300.00,
      "pago_chofer": 1100.00,
      "viaticos": 350.00,
      "merma_100g": 0.03
    }
  ];

/* arreglo de productos para calcular costo final (json) */
  producstos = [
    {
      "nombre": "POLLO VIVO GRANJA",
      "tipo_venta": "pza",
      "porcentaje_peso": 100,
      "ganancia": 3
    },
    {
      "nombre": "POLLO VIVO TARA",
      "tipo_venta": "pza",
      "porcentaje_peso": 100,
      "ganancia": 3.5
    },
    {
      "nombre": "POLLO TIPO RASTRO",
      "tipo_venta": "pza",
      "porcentaje_peso": 100,
      "ganancia": 14
    },
    {
      "nombre": "POLLO SUPER MERCADO",
      "tipo_venta": "pza",
      "porcentaje_peso": 100,
      "ganancia": 20
    },
    {
      "nombre": "PECHUGA",
      "tipo_venta": "pza",
      "porcentaje_peso": 30,
      "ganancia": 10
    },
    {
      "nombre": "PIERNA Y MUSLO SIN RABADILLA",
      "tipo_venta": "pza",
      "porcentaje_peso": 25,
      "ganancia": 10
    },
    {
      "nombre": "ALA NATURAL",
      "tipo_venta": "pza",
      "porcentaje_peso": 10,
      "ganancia": 10
    },
    {
      "nombre": "ALA MARINADA",
      "tipo_venta": "pza",
      "porcentaje_peso": 10,
      "ganancia": 10
    },
    {
      "nombre": "PECHUGA CON ALA",
      "tipo_venta": "pza",
      "porcentaje_peso": 35,
      "ganancia": 10
    },
    {
      "nombre": "PIERNA Y MUSLO CON RABADILLA",
      "tipo_venta": "pza",
      "porcentaje_peso": 30,
      "ganancia": 10
    },
    {
      "nombre": "MENUDENCIA SURTIDA",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 10
    },
    {
      "nombre": "PATA",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 10
    },
    {
      "nombre": "MOLLEJA",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 7
    },
    {
      "nombre": "HIGADO",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 5
    },
    {
      "nombre": "CABEZA",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 5
    },
    {
      "nombre": "RETAZO",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 5
    },
    {
      "nombre": "DEVOLUCIONES",
      "tipo_venta": "Kg",
      "porcentaje_peso": 5,
      "ganancia": 10
    }
  ];
 
  /* arreglo con catalogo de prodcutos */
  costoProductos = []; 
  /* Ganancia minima que se resta para obtener utilidad real */
  gananciaCentavos = 2.50;
  /* Lista de clientes con descuentos  */
  clientes = [
    {
      "id": 1,
      "nombre": "Mayorista",
      "descuento": 0.5
    },
    {
      "id": 2,
      "nombre": "Menudeo",
      "descuento": 1
    },
    {
      "id": 3,
      "nombre": "Amigo",
      "descuento": 1.5
    },
    {
      "id": 4,
      "nombre": "Otros",
      "descuento": 0.8
    },
  ];
  cliente;

/* Variables para envio de correo*/
/*http : HttpClient;
  rutaFilePHP : string;*/

  constructor(/*http: HttpClient*/) { 
     /*this.http = http;*/
  }

  ngOnInit( ) {
    /*this.rutaFilePHP = "http://localhost:8000/email.php";*/
  }

  calcularPrecio() {
    this.costoVenta = 'active';

    var proveedorSelected = this.proveedores.find( proveedor => proveedor.id == this.grupo.proveedor );

    /* Calculo de costo de viaje */
    this.calculos.costoViaje = proveedorSelected.diesel + proveedorSelected.casetas + proveedorSelected.pago_chofer + proveedorSelected.viaticos;

    /* Calculo unitario merma */
    this.calculos.costoMerma = Math.floor((proveedorSelected.merma_100g * this.grupo.precioProveedor)*100)/100;
    /*console.warn(Math.floor(this.calculos.costoMerma*100)/100);*/

    /* Calculo costo unitario viaje */
    this.calculos.costoUniViaje = Math.floor((this.calculos.costoViaje /(this.grupo.cantidadPollo * this.grupo.pesoPromedio))*100)/100;

    /* Calculo de costo de pollo */
    this.calculos.costoPollo = Math.floor((this.grupo.precioProveedor + this.calculos.costoMerma + this.calculos.costoUniViaje)*100)/100;
  }

  mostrarTabla(){
    this.datosCalculo = 'not-active';
    this.costoVenta = 'not-active';
    this.resultadoCosto = 'active';
    this.cliente = 0;
    var valorPolloVivo;

    if(!this.calculos.costoVenta){
      valorPolloVivo = this.calculos.costoPollo;
    }else{
      valorPolloVivo = this.calculos.costoVenta;
    }

    /* */
    var desMayoreo = this.clientes.find( cliente => cliente.nombre == "Mayorista" );
    var desMenudeo = this.clientes.find( cliente => cliente.nombre == "Menudeo" );
    var desAmigo = this.clientes.find( cliente => cliente.nombre == "Amigo" );
    var desOtros = this.clientes.find( cliente => cliente.nombre == "Otros" );

    this.costoProductos = this.producstos.map(producto => {
      return {
        producto: producto.nombre,
        valor: Math.floor(((valorPolloVivo * (producto.porcentaje_peso / 100)) + producto.ganancia)*100)/100,
        mayoreo: Math.floor((((valorPolloVivo - desMayoreo['descuento']) * (producto.porcentaje_peso / 100)) + producto.ganancia)*100)/100,
        menudeo: Math.floor((((valorPolloVivo - desMenudeo['descuento']) * (producto.porcentaje_peso / 100)) + producto.ganancia)*100)/100,
        amigo: Math.floor((((valorPolloVivo - desAmigo['descuento']) * (producto.porcentaje_peso / 100)) + producto.ganancia)*100)/100,
        otro: Math.floor((((valorPolloVivo - desOtros['descuento']) * (producto.porcentaje_peso / 100)) + producto.ganancia)*100)/100,
        costoManual: null,
      };
    });

  }

  calcularUtilidadReal(costo) {
    if (!costo.costoManual) {
      return null;
    }
    
    var utilidadReal = (costo.costoManual - costo.valor) - this.gananciaCentavos;
    return Math.floor(utilidadReal*100)/100;
  }

  message = '';
  envioCorreo(){
    /*let tableCostos = {
        message : this.message
    };

    //Envio de parametros a archivo PHP
    this.http.post(this.rutaFilePHP, tableCostos)
        .subscribe(
            response => console.log(response)
        );*/

    this.message = "Configuración de correo PENDIENTE";
  }

}