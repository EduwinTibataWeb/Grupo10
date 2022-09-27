$( document ).ready(function() {
    var botonMenu = $(".menu");
    var menu = $(".menu_listas_content");
    botonMenu.on("click", function(){
        $(this).toggleClass("active_icon_menu");
        menu.toggleClass("active_menu");
    });
});



function leerClientes(){
    //FUNCION GET
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'GET',
        dataType : 'json',

        success : function(clientes) {
               let cs=clientes.items;
               $("#listaClientes").empty();
               $("#listaClientes").append("<tr><th>ID</th><th>NOMBRE</th><th>CORREO</th><th>AÑOS</th><th>BORRAR</th></tr>");
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Clientes</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTabla(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].name + "</td><td>" + cs[i].email + "</td><td>" + cs[i].age + "</td><td><div class='btn-borrar' onclick='borrarCliente("+cs[i].id+")'>Borrar</div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
       
function guardarCliente() {
    let idCliente=$("#idCliente").val();
    let nombre=$("#nombreCliente").val();
    let mailCliente=$("#mailCliente").val();
    let edad=$("#edadCliente").val();
    
    let data={
        id:idCliente,
        name:nombre,
        email:mailCliente,
        age:edad
    };
    
    let dataToSend=JSON.stringify(data);
    
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'POST',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#mailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerClientes();
        }
    });
}
       
function editarCliente(){
    let idCliente=$("#idCliente").val();
    let nombre=$("#nombreCliente").val();
    let mailCliente=$("#mailCliente").val();
    let edad=$("#edadCliente").val();
    
    let data={
        id:idCliente,
        name:nombre,
        email:mailCliente,
        age:edad
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#mailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerClientes();
        }
    });
}
    
function borrarCliente(idCliente){
    let data={
        id:idCliente
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idCliente").val("");
            $("#nombreCliente").val("");
            $("#mailCliente").val("");
            $("#edadCliente").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerClientes();
        }
    }); 
}

function datosTabla(idCliente){
    let id=$("#idCliente");
    let nombre=$("#nombreCliente");
    let mailCliente=$("#mailCliente");
    let edad=$("#edadCliente");

    $.ajax({
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'GET',
        dataType : 'json',

        success : function(clientes) {
                let cs = clientes.items;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == idCliente){
                        id.val(cs[i].id);
                        nombre.val(cs[i].name);
                        mailCliente.val(cs[i].email);
                        edad.val(cs[i].age);
                    }
                }
        }
    });
}
