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
function quitarPop(){
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    let getFormulario = $(".cont_formulario");
    let oculto=$('.ocultoForm');
    oculto.css("display", 'none');
    getBoton.hide();
    if($('#idCategory').length > 0){
        getBotones.append('<div onclick="guardarCategory()">Guardar Category</div>');
    }else if($('#idCliente').length > 0){
        getBotones.append('<div onclick="guardarCliente()">Guardar Cliente</div>');
    }else if($('#idCostume').length > 0){
        getBotones.append('<div onclick="guardarCostume()">Guardar Disfraz</div>');
    }else{
        getBotones.append('<div onclick="guardarMensaje()">Guardar Mensaje</div>');
    }
    getFormulario.removeClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'none');
    borrarTabla()
}
function borrarTabla(){
    $("#brandCostume").val("");
    $("#yearCostume").val("");
    $("#descriptionCostume").val("");
    $("#nameCostume").val("");
    $("#categoryCostume").val("");
}
//Category

function leerCategory(){
    //FUNCION GET
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',

        success : function(Category) {
               let cs=Category;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Categorias</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       let nl = cs[i].costumes.id;
                       if(cs[i].costumes.id == undefined){
                            nl = "No hay";
                       }
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaCategory(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].name + "</td><td>" + cs[i].description + "</td><td>" + nl + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarCategory("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                    }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function guardarCategory() {
    //FUNCION POST
    let nameCategory=$("#nameCategory").val();
    let descriptionCategory=$("#descriptionCategory").val();

    if(nameCategory){
        let data={
            name:nameCategory,
            description:descriptionCategory,
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'http://192.9.144.130:8080/api/Category/save',
            type : 'POST',
            //dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                $("#nameCategory").val("");
                $("#descriptionCategory").val("");
            },
            error : function(xhr, status) {
               alert('Error');
            },
            complete: function(){
                leerCategory();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
}
  
function editarCategory(){
    let idCategory=$("#idCategory").val()
    let nameCategory=$("#nameCategory").val();
    let descriptionCategory=$("#descriptionCategory").val();
    
    let data={
        id:idCategory,
        name:nameCategory,
        description:descriptionCategory,
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Category/update',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idCategory").val("");
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerCategory();
        }
    });
    quitarPop();
}
    
function borrarCategory(idCategory){
    let data={
        id:idCategory
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Category/' + idCategory,
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerCategory();
            quitarPop();
        }
    });
}

function datosTablaCategory(Category_item){
    let idCategory=$("#idCategory");
    let nameCategory=$("#nameCategory");
    let descriptionCategory=$("#descriptionCategory");
    let costumeCategory=$("#costumeCategory");

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    getBoton.hide();
    getBotones.append('<div onclick="editarCategory()">Editar Category</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $('.ocultoForm').css('display', 'inline-block');
    $.ajax({
        url : 'http://192.9.144.130:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',

        success : function(Category) {
                let cs = Category;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == Category_item){
                        idCategory.val(cs[i].id);
                        nameCategory.val(cs[i].name);
                        descriptionCategory.val(cs[i].description);
                        costumeCategory.val(cs[i].costumes.id);
                    }
                }
        }
    });
}



//DISFRAZ

function leerCostume(){
    //FUNCION GET
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Costume/all',
        type : 'GET',
        dataType : 'json',

        success : function(costume) {
               let cs=costume;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Disfraces</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaCostume(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].brand + "</td><td>" + cs[i].year + "</td><td>" + cs[i].description + "</td><td>" + cs[i].name + "</td><td>" + cs[i].category.id + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarCostume("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function guardarCostume() {
    let brandCostume=$("#brandCostume").val();
    let yearCostume=$("#yearCostume").val();
    let descriptionCostume=$("#descriptionCostume").val();
    let nameCostume=$("#nameCostume").val();
    let categoryCostume=$("#categoryCostume").val();

    if(brandCostume){

        let data={
            brand:brandCostume,
            year:yearCostume,
            description:descriptionCostume,
            name:nameCostume,
            category:{id: categoryCostume}
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'http://192.9.144.130:8080/api/Costume/save',
            type : 'POST',
            //dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                borrarTabla()
            },
            error : function(xhr, status) {
               alert('La categoria NO existe');
            },
            complete: function(){
                leerCostume();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
}
       
function editarCostume(){
    let idCostume=$("#idCostume").val();
    let brandCostume=$("#brandCostume").val();
    let yearCostume=$("#yearCostume").val();
    let descriptionCostume=$("#descriptionCostume").val();
    let nameCostume=$("#nameCostume").val();
    let categoryCostume=$("#categoryCostume").val();
    
    let data={
        id:idCostume,
        brand:brandCostume,
        year:yearCostume,
        description:descriptionCostume,
        name:nameCostume,
        category:{id: categoryCostume}
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Costume/update',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            borrarTabla()
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerCostume();
        }
    });
    quitarPop();
}

function borrarCostume(idCostume){
    let data={
        id:idCostume
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Costume/' + idCostume,
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            borrarTabla()
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerCostume();
            quitarPop();
        }
    });
}
function datosTablaCostume(costume_item){
    let idCostume=$("#idCostume");
    let brandCostume=$("#brandCostume");
    let yearCostume=$("#yearCostume");
    let descriptionCostume=$("#descriptionCostume");
    let nameCostume=$("#nameCostume");
    let categoryCostume=$("#categoryCostume");

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    getBoton.hide();
    getBotones.append('<div onclick="editarCostume()">Editar Disfraz</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $('.ocultoForm').css('display', 'inline-block');
    $.ajax({
        url : 'http://192.9.144.130:8080/api/Costume/all',
        type : 'GET',
        dataType : 'json',

        success : function(costume) {
                let cs = costume;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == costume_item){
                        idCostume.val(cs[i].id);
                        brandCostume.val(cs[i].brand);
                        yearCostume.val(cs[i].year);
                        descriptionCostume.val(cs[i].description);
                        nameCostume.val(cs[i].name);
                        categoryCostume.val(cs[i].category.id);
                    }
                }
        }
    });
}

//Reservation

function leerReservation(){
    //FUNCION GET
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Reservation/all',
        type : 'GET',
        dataType : 'json',

        success : function(Reservation) {
               let cs=Reservation;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Reservation</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaReservation(" + cs[i].idReservation + ")'><td>" + cs[i].idReservation + "</td><td>" + cs[i].startDate.substring(-1,10) + "</td><td>" + cs[i].devolutionDate.substring(-1,10) + "</td><td>" + cs[i].costume['id'] + "</td><td>" + cs[i].client['idClient'] + "</td><td>" + cs[i].status + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarReservation("+cs[i].idReservation+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function guardarReservation() {
    let startDateReservation=$("#startDateReservation").val();
    let devolutionDateReservation=$("#devolutionDateReservation").val();
    let costumeReservation=$("#costumeReservation").val();
    let clientReservation=$("#clientReservation").val();
    let statusReservation=$("#statusReservation").val();

    if(costumeReservation && clientReservation){

        let data={
            startDate: startDateReservation,
            devolutionDate: devolutionDateReservation,
            costume: {id: costumeReservation},
            client: {idClient: clientReservation},
            status: statusReservation
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'http://192.9.144.130:8080/api/Reservation/save',
            type : 'POST',
            //dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                $("#startDateReservation").val("");
                $("#devolutionDateReservation").val("");
                $("#costumeReservation").val("");
                $("#clientReservation").val("");
                $("#statusReservation").val("");
            },
            error : function(xhr, status) {
               alert('La categoria NO existe');
            },
            complete: function(){
                leerReservation();
            }
        });
    }else{
        alert("Falta el Id o el nombre");
    }
}
       
function editarReservation(){
    let idReservation=$("#idReservation").val();
    let startDateReservation=$("#startDateReservation").val();
    let devolutionDateReservation=$("#devolutionDateReservation").val();
    let costumeReservation=$("#costumeReservation").val();
    let clientReservation=$("#clientReservation").val();
    let statusReservation=$("#statusReservation").val();
    
    let data={
        idReservation: idReservation,
        startDate: startDateReservation,
        devolutionDate: devolutionDateReservation,
        costume: {id: costumeReservation},
        client: {idClient: clientReservation},
        status: statusReservation
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Reservation/update',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idReservation").val("")
            $("#startDateReservation").val("");
            $("#devolutionDateReservation").val("");
            $("#costumeReservation").val("");
            $("#clientReservation").val("");
            $("#statusReservation").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerReservation();
        }
    });
    quitarPop();
}

function borrarReservation(id_Reservation){
    let data={
        idReservation: id_Reservation
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Reservation/' + id_Reservation,
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#idReservation").val("")
            $("#startDateReservation").val("");
            $("#devolutionDateReservation").val("");
            $("#costumeReservation").val("");
            $("#clientReservation").val("");
            $("#statusReservation").val("");
        },
        error : function(xhr, status) {
       //     alert('ha sucedido un problema');
        },
        complete: function(){
            leerReservation();
            quitarPop();
        }
    });
}
function datosTablaReservation(reservation_item){
    let idReservation=$("#idReservation");
    let startDateReservation=$("#startDateReservation");
    let devolutionDateReservation=$("#devolutionDateReservation");
    let costumeReservation=$("#costumeReservation");
    let clientReservation=$("#clientReservation");
    let statusReservation=$("#statusReservation");

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    getBoton.hide();
    getBotones.append('<div onclick="editarReservation()">Editar Disfraz</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $('.ocultoForm').css('display', 'inline-block');
    $.ajax({
        url : 'http://192.9.144.130:8080/api/Reservation/all',
        type : 'GET',
        dataType : 'json',

        success : function(reservation) {
                let cs = reservation;
                for(i=0;i<cs.length;i++){
                    if(cs[i].idReservation == reservation_item){
                        idReservation.val(cs[i].idReservation);
                        startDateReservation.val(cs[i].startDate);
                        devolutionDateReservation.val(cs[i].devolutionDate);
                        costumeReservation.val(cs[i].costume.id);
                        clientReservation.val(cs[i].client.idClient);
                        statusReservation.val(cs[i].status);
                    }
                }
        }
    });
}
