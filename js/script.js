$( document ).ready(function() {
    var botonMenu = $(".menu");
    var menu = $(".menu_lista");
    botonMenu.on("click", function(){
        $(this).toggleClass("active_icon_menu");
        $('.menu_lista').toggleClass("active_menu");
    });
    $('.cerrar_pop').on('click', function(){
        if($('#idCliente').length > 0){
            quitarPop('#idCliente');
        }else if($('#idDisfraz').length > 0){
            quitarPop('#idDisfraz');
        }else{
            quitarPop('#idMensaje');
        }
    });
});
function quitarPop(idPop){
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    let getFormulario = $(".cont_formulario");
    let id=$(idPop);
    id.removeAttr("disabled");
    getBoton.hide();
    if($('#idCliente').length > 0){
        getBotones.append('<div onclick="guardarCliente()">Guardar cliente</div>');
    }else if($('#idDisfraz').length > 0){
        getBotones.append('<div onclick="guardarDisfraz()">Guardar Disfraz</div>');
    }else{
        getBotones.append('<div onclick="guardarMensaje()">Guardar Mensaje</div>');
    }
    getFormulario.removeClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'none');
}

//DISFRAZ

function leerDisfraz(){
    //FUNCION GET
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
        type : 'GET',
        dataType : 'json',

        success : function(disfraz) {
               let cs=disfraz.items;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Clientes</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaDisfraz(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].brand + "</td><td>" + cs[i].model + "</td><td>" + cs[i].category_id + "</td><td>" + cs[i].name + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarDisfraz("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function guardarDisfraz() {
    let idDisfraz=$("#idDisfraz").val();
    let brandDisfraz=$("#brandDisfraz").val();
    let modelDisfraz=$("#modelDisfraz").val();
    let categoryDisfraz=$("#categoryDisfraz").val();
    let nameDisfraz=$("#nameDisfraz").val();

    if(idDisfraz && categoryDisfraz){

        let data={
            id:idDisfraz,
            brand:brandDisfraz,
            model:modelDisfraz,
            category_id:categoryDisfraz,
            name:nameDisfraz
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
            type : 'POST',
            //dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                $("#idDisfraz").val("");
                $("#brandDisfraz").val("");
                $("#modelDisfraz").val("");
                $("#categoryDisfraz").val("");
                $("#nameDisfraz").val("");
            },
            error : function(xhr, status) {
               //alert('EL Id ' + idDisfraz + ' Ya esta en uso ');
            },
            complete: function(){
                leerDisfraz();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
}
       
function editarDisfraz(){
    let idDisfraz=$("#idDisfraz").val();
    let brandDisfraz=$("#brandDisfraz").val();
    let modelDisfraz=$("#modelDisfraz").val();
    let categoryDisfraz=$("#categoryDisfraz").val();
    let nameDisfraz=$("#nameDisfraz").val();
    let data={
        id:idDisfraz,
        brand:brandDisfraz,
        model:modelDisfraz,
        category_id:categoryDisfraz,
        name:nameDisfraz
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idDisfraz").val("");
            $("#brandDisfraz").val("");
            $("#modelDisfraz").val("");
            $("#categoryDisfraz").val("");
            $("#nameDisfraz").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerDisfraz();
        }
    });
    quitarPop('#idDisfraz');
}
    
function borrarDisfraz(idDisfraz){
    let data={
        id:idDisfraz
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idDisfraz").val("");
            $("#brandDisfraz").val("");
            $("#modelDisfraz").val("");
            $("#categoryDisfraz").val("");
            $("#nameDisfraz").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerDisfraz();
            quitarPop('#idDisfraz');
        }
    });
}
function datosTablaDisfraz(Disfraz_item){
    let idDisfraz=$("#idDisfraz");
    let brandDisfraz=$("#brandDisfraz");
    let modelDisfraz=$("#modelDisfraz");
    let categoryDisfraz=$("#categoryDisfraz");
    let nameDisfraz=$("#nameDisfraz");

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    idDisfraz.prop("disabled","disabled");
    getBoton.hide();
    getBotones.append('<div onclick="editarDisfraz()">Editar Disfraz</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $.ajax({
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
        type : 'GET',
        dataType : 'json',

        success : function(disfraz) {
                let cs = disfraz.items;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == Disfraz_item){
                        idDisfraz.val(cs[i].id);
                        brandDisfraz.val(cs[i].brand);
                        modelDisfraz.val(cs[i].model);
                        categoryDisfraz.val(cs[i].category_id);
                        nameDisfraz.val(cs[i].name);
                    }
                }
        }
    });
}


//CLIENTES

function leerClientes(){
    //FUNCION GET
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/client/client',
        type : 'GET',
        dataType : 'json',

        success : function(clientes) {
               let cs=clientes.items;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Clientes</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTabla(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].name + "</td><td>" + cs[i].email + "</td><td>" + cs[i].age + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarCliente("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
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

    if(idCliente && nombre){
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
               alert('EL Id ' + idCliente + ' Ya esta en uso ');
            },
            complete: function(){
                leerClientes();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
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
    quitarPop('#idCliente');
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
            quitarPop('#idCliente');
        }
    });
}
function datosTabla(idCliente){
    let id=$("#idCliente");
    let nombre=$("#nombreCliente");
    let mailCliente=$("#mailCliente");
    let edad=$("#edadCliente");
    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    id.prop("disabled","disabled");
    getBoton.hide();
    getBotones.append('<div onclick="editarCliente()">Editar cliente</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
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

//Mensage

function leerMensaje(){
    //FUNCION GET
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'GET',
        dataType : 'json',

        success : function(mensage) {
               let cs=mensage.items;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Clientes</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaMensaje(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].messagetext + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarMensaje("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
       
function guardarMensaje() {
    let idMensaje=$("#idMensaje").val();
    let Mensaje=$("#mensaje").val();

    if(idMensaje && Mensaje){
        let data={
            id:idMensaje,
            messagetext:Mensaje
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
            type : 'POST',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                $("#idMensaje").val("");
                $("#mensaje").val("");
            },
            error : function(xhr, status) {
               alert('EL Id ' + idMensaje + ' Ya esta en uso ');
            },
            complete: function(){
                leerMensaje();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
}

function editarMensaje(){
    let idMensaje=$("#idMensaje").val();
    let Mensaje=$("#mensaje").val();

    let data={
        id:idMensaje,
        messagetext:Mensaje
    };

    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idMensaje").val("");
            $("#mensaje").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerMensaje();
        }
    });
    quitarPop('#idMensaje');
}
    
function borrarMensaje(idMensaje){
    let data={
        id:idMensaje
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idMensaje").val("");
            $("#mensaje").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerMensaje();
            quitarPop('#idMensaje');
        }
    });
}
function datosTablaMensaje(idMensaje){
    let id=$("#idMensaje");
    let Mensaje=$("#mensaje");

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    id.prop("disabled","disabled");
    getBoton.hide();
    getBotones.append('<div onclick="editarMensaje()">Editar Mensaje</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $.ajax({
        url : 'https://g686fc0a63f034d-vlvobu3973xb119d.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/message/message',
        type : 'GET',
        dataType : 'json',

        success : function(mensaje) {
                let cs = mensaje.items;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == idMensaje){
                        id.val(cs[i].id);
                        Mensaje.val(cs[i].messagetext);
                    }
                }
        }
    });
}