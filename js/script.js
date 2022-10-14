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
    }else if($('#idDisfraz').length > 0){
        getBotones.append('<div onclick="guardarDisfraz()">Guardar Disfraz</div>');
    }else{
        getBotones.append('<div onclick="guardarMensaje()">Guardar Mensaje</div>');
    }
    getFormulario.removeClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'none');
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

function leerDisfraz(){
    //FUNCION GET
    $.ajax({    
        url : 'http://192.9.144.130:8080/api/Costume/all',
        type : 'GET',
        dataType : 'json',

        success : function(disfraz) {
               let cs=disfraz;
               $("#listaClientes").empty();
               if(cs.length <= 0){
                    $("#listaClientes").append("<tr><td class='noClientes' colspan='5'>No hay Clientes</td></tr>");
               }else{
                   for(i=0;i<cs.length;i++){
                       $("#listaClientes").append("<tr class='TablaSelec' onClick='datosTablaDisfraz(" + cs[i].id + ")'><td>" + cs[i].id + "</td><td>" + cs[i].brand + "</td><td>" + cs[i].description + "</td><td>" + cs[i].category.id + "</td><td>" + cs[i].name + "</td><td>" + cs[i].years + "</td><td class='borrar'><div class='btn-borrar' onclick='borrarDisfraz("+cs[i].id+")'><i class='fa-solid fa-trash-can'></i></div></td></tr>");
                   }
               }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function guardarDisfraz() {
    let brandDisfraz=$("#brandDisfraz").val();
    let yearsDisfraz=$("#yearsDisfraz").val();
    let descriptionDisfraz=$("#descriptionDisfraz").val();
    let categoryDisfraz=$("#categoryDisfraz").val();
    let nameDisfraz=$("#nameDisfraz").val();

    if(nameDisfraz){

        let data={
            brand:brandDisfraz,
            years:yearsDisfraz,
            description:descriptionDisfraz,
            category:{id: categoryDisfraz},
            name:nameDisfraz
        };
        
        let dataToSend=JSON.stringify(data);
        
        $.ajax({    
            url : 'http://localhost:8080/api/Costume/save',
            type : 'POST',
            //dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                $("#brandDisfraz").val("");
                $("#yearsDisfraz").val("");
                $("#descriptionDisfraz").val("");
                $("#categoryDisfraz").val("");
                $("#nameDisfraz").val("");
            },
            error : function(xhr, status) {
               alert('La categoria NO existe');
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
    let yearsDisfraz=$("#yearsDisfraz").val();
    let descriptionDisfraz=$("#descriptionDisfraz").val();
    let categoryDisfraz=$("#categoryDisfraz").val();
    let nameDisfraz=$("#nameDisfraz").val();
    
    let data={
        id:idDisfraz,
        brand:brandDisfraz,
        years:yearsDisfraz,
        description:descriptionDisfraz,
        name:nameDisfraz
    };
    let dataToSend=JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({    
        url : 'http://localhost:8080/api/Costume/update',
        type : 'PUT',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#brandDisfraz").val("");
            $("#yearsDisfraz").val("");
            $("#descriptionDisfraz").val("");
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
        url : 'http://localhost:8080/api/Costume/' + idDisfraz,
        type : 'DELETE',
     //   dataType : 'json',
        data:dataToSend,
        contentType:'application/json',
        success : function(pepito) {
            $("#brandDisfraz").val("");
            $("#yearsDisfraz").val("");
            $("#descriptionDisfraz").val("");
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
    let idDisfraz=$("#idDisfraz").val();
    let brandDisfraz=$("#brandDisfraz").val();
    let yearsDisfraz=$("#yearsDisfraz").val();
    let descriptionDisfraz=$("#descriptionDisfraz").val();
    let categoryDisfraz=$("#categoryDisfraz").val();
    let nameDisfraz=$("#nameDisfraz").val();

    let getFormulario = $(".cont_formulario");
    let getBotones = $(".botones");
    let getBoton = $(".botones div");
    
    idDisfraz.prop("disabled","disabled");
    getBoton.hide();
    getBotones.append('<div onclick="editarDisfraz()">Editar Disfraz</div>');
    getFormulario.addClass("cont_formulario_cambios");
    $('.cerrar_pop').css('display', 'Flex');
    $.ajax({
        url : 'http://localhost:8080/api/Costume/all',
        type : 'GET',
        dataType : 'json',

        success : function(disfraz) {
                let cs = disfraz;
                for(i=0;i<cs.length;i++){
                    if(cs[i].id == Disfraz_item){
                        idDisfraz.val(cs[i].id);
                        brandDisfraz.val(cs[i].brand);
                        categoryDisfraz.val(cs[i].category.id);
                        nameDisfraz.val(cs[i].name);
                    }
                }
        }
    });
}
