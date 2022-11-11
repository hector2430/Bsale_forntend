//menu mobile
$('#body-row .collapse').collapse('hide'); 
$('#collapse-icon').addClass('fa-angle-double-left'); 

$('[data-toggle=sidebar-colapse]').click(function() {
    SidebarCollapse();
});
//menu mobile
function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}
//Filtro de productos por categoria
function modCategory(category) {
    //Peticion a API
    fetch('https://bsalebackend-production.up.railway.app/categoryApi.php?categoryid='+category, {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        obj = data;
    })
    .then(() => {
        var grid=document.getElementById("contenido");
        
        grid.innerHTML="";
        if(obj.mensaje){
            document.getElementById("mensaje").innerHTML="No hay productos en la categoria seleccionada <br><br> Mostrando todas los productos...";
            $("#searchproductmodal").modal('show');
            getproduct();
        }else{
            for (let index = 0; index < obj.product.length; index++) {    
                //validacion de link imagen   
                if(obj.product[index].url_image == "" || obj.product[index].url_image==null ){
                    obj.product[index].url_image="img/noImagen.png"
                }     
                //Creacion de lista de productos
                var contenido='<div class="col-lg-4 col-md-6 mb-4"><div class="card"><div class="bg-image hover-zoom ripple" data-mdb-ripple-color="light"><img src="'+obj.product[index].url_image+'"class="w-100" style="height: 20rem;" /></div><div class="card-body"><a class="text-reset"><h5 class="card-title mb-3">'+obj.product[index].name+'</h5></a><h6 class="mb-3"><strong class="ms-2 ">$'+obj.product[index].price+'</strong></h6></div></div></div>';
                grid.innerHTML += contenido+'';
            }
        }
    });            
}
//Obtener categoria
function getCategories() {
    //Peticion a API
    fetch('https://bsalebackend-production.up.railway.app/categoryApi.php', {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        obj = data;
    })
    .then(() => {

        var aside=document.getElementById("menucategories");
        var mobile=document.getElementById("categorymobile"); 
        mobile.innerHTML= '<a class="dropdown-item"style="cursor: pointer;" onclick="getproduct()" >TODAS</a>';
        var contenido='<a class="bg-dark list-group-item list-group-item-action" style="cursor: pointer;" onclick="getproduct()"> <div class="d-flex w-100 justify-content-start align-items-center"> <span class="fa fa-tasks fa-fw mr-3"></span><span class="menu-collapsed">TODAS</span></div></a>';
        aside.innerHTML += contenido;
        for (let index = 0; index < obj.category.length; index++) {
            //creacion de lista de categorias
            contenido='<a class="bg-dark list-group-item list-group-item-action" style="cursor: pointer;text-transform: capitalize;" onclick="modCategory(\''+obj.category[index].id+'\')""> <div class="d-flex w-100 justify-content-start align-items-center"> <span class="fa fa-tasks fa-fw mr-3"></span><span class="menu-collapsed">'+obj.category[index].name+'</span> <span class="badge badge-primary badge-pill bg-primary">'+obj.category[index].total+'</span></li></div></a>'
            mobile.innerHTML+='<a class="dropdown-item"style="cursor: pointer; text-transform: capitalize;" onclick="modCategory(\''+obj.category[index].id+'\')"" >'+obj.category[index].name+'</a>';
            aside.innerHTML += contenido;
        }
    });
}
//Obtener Productos
function getproduct() {
    //Peticion a API
    fetch('https://bsalebackend-production.up.railway.app/productApi.php', {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        obj = data;
    })
    .then(() => {
        var grid=document.getElementById("contenido");
        grid.innerHTML="";

        for (let index = 0; index < obj.product.length; index++) {        
            //validacion de link imagen   
            if(obj.product[index].url_image == "" || obj.product[index].url_image==null ){
                obj.product[index].url_image="img/noImagen.png"
            }     
            //Creacion de lista de productos
            var contenido='<div class="col-lg-4 col-md-6 mb-4"><div class="card"><div class="bg-image hover-zoom ripple" data-mdb-ripple-color="light"><img src="'+obj.product[index].url_image+'"class="w-100"style="height: 20rem;" /></div><div class="card-body"><a  class="text-reset"><h5 class="card-title mb-3">'+obj.product[index].name+'</h5></a><h6 class="mb-3"><strong class="ms-2 ">$'+obj.product[index].price+'</strong></h6></div></div></div>';

            grid.innerHTML += contenido+'';
        }
    });
}
//Obtener Productos por nombre
function SearchProduct(evt) {
    evt.preventDefault();
    var productname=document.getElementById("searchProduct");
    var productnameMobile=document.getElementById("searchProductMobile"); 
    //validacion de dato ingresado por el usuario
    if(productname.value!="" || productnameMobile.value !=""){
        if(productname.value!=""){
            var product=productname.value;
        }else
        {
            var product=productnameMobile.value;
        }
        //Peticion a API
        fetch('https://bsalebackend-production.up.railway.app/productApi.php?name='+product, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            obj = data;
        })
        .then(() => {
            var grid=document.getElementById("contenido");
            grid.innerHTML="";
            if(obj.mensaje){    
                document.getElementById("mensaje").innerHTML="No hay productos que coincida con la búsqueda realizada <br><br> Mostrando todos los productos...";
                $("#searchproductmodal").modal('show');
                document.getElementById("searchProduct").value=""
                document.getElementById("searchProductMobile").value=""
                getproduct();
            }else{
                for (let index = 0; index < obj.product.length; index++) {  
                    //validacion de link imagen   
                    if(obj.product[index].url_image == "" || obj.product[index].url_image==null){
                        obj.product[index].url_image="img/noImagen.png"
                    }     
                    //Creacion de lista de productos
                    var contenido='<div class="col-lg-4 col-md-6 mb-4"><div class="card"><div class="bg-image hover-zoom ripple" data-mdb-ripple-color="light"><img src="'+obj.product[index].url_image+'" style="height: 20rem;" class="w-100" /></div><div class="card-body"><a  class="text-reset"><h5 class="card-title mb-3">'+obj.product[index].name+'</h5></a><h6 class="mb-3"><strong class="ms-2 ">$'+obj.product[index].price+'</strong></h6></div></div></div>';
                    grid.innerHTML += contenido+'';
                }
            }
        });
    }else{
        document.getElementById("mensaje").innerHTML="No se ha podido encontrar coincidencias con la búsqueda realizada <br><br> Mostrando todos los productos...";
        $("#searchproductmodal").modal('show');
    }
}
//Cerrar modal
function closeModal(params) {
    $("#searchproductmodal").modal('hide');
}
