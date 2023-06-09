function loadCars(total_prod = 0, items_page = 3) {
    $('.date_car').empty();
    localStorage.removeItem('redirect_cart');
    localStorage.removeItem('redirect_cart2');
    $("#containerShop").empty();
    var filter = JSON.parse(localStorage.getItem('filter', filter));
    var brand_filter = JSON.parse(localStorage.getItem('brand_filter', brand_filter));
    var category_filter = JSON.parse(localStorage.getItem('category_filter', category_filter));
    var motor_filter = JSON.parse(localStorage.getItem('motor_filter', motor_filter));
    var filters_search = JSON.parse(localStorage.getItem('filters_search', filters_search));
    var detalle_coche = JSON.parse(localStorage.getItem('detalle_coche', detalle_coche));
    var redirect_like = localStorage.getItem('redirect_like',redirect_like);
    if (filter) {
        ajaxForSearch(friendlyURL('?module=shop&op=filter'), filter,total_prod, items_page);
    }
    else if (brand_filter) {
        var home=brand_filter;
        ajaxForSearch(friendlyURL('?module=shop&op=home_filter'),filter, home,total_prod, items_page);
        
    } else if (category_filter) {
        var home=category_filter;
        ajaxForSearch(friendlyURL('?module=shop&op=home_filter'),filter ,home,total_prod, items_page);
    } else if (motor_filter) {
        var home=motor_filter;
        ajaxForSearch(friendlyURL('?module=shop&op=home_filter'),filter,home,total_prod, items_page);
    }
    else if (filters_search){
        load_search(total_prod, items_page);
    } else if (detalle_coche){
        load_detalle_coche();
    } else if(redirect_like){
        redirect_login_like();
    }else {
        ajaxForSearch(friendlyURL('?module=shop&op=all_cars'),total_prod, items_page);
    }
}


function clicks() {
    $(document).on("click", ".more_info_list", function () {
        var id_car = this.getAttribute('id');
        console.log(id_car);
        loadDetails(id_car);
        countcar(id_car);
    }
    )
    $(document).on("click", ".list__heart", function() {
        var id_car = this.getAttribute('id');
        click_like(id_car, "list_all");
    });

    $(document).on("click", ".details__heart", function() {
        var id_car = this.getAttribute('id');
        click_like(id_car, "details");
    });
    $(document).on("click", ".carrito", function () {
        var id_car = this.getAttribute('id');
        localStorage.setItem('id_car',id_car);
        console.log(id_car);
        add_cart(id_car);
    }
    )
}


function countcar(id_car){
    console.log(id_car);
    ajaxPromise(friendlyURL('?module=shop&op=countcar'), 'POST', 'JSON',{'id':id_car})
    .then(function (data) {
        console.log(data);
                
    })
}

function loadDetails(id_car) {
    console.log(id_car);
    ajaxPromise(friendlyURL('?module=shop&op=details_car'), 'POST', 'JSON',{'id':id_car})

        .then(function (data) {
            console.log(data);
            $('#map').empty();
            $('#containerShop').empty();
            $('#pagination').empty();
            $('.div-filters').empty();
            $('.highlight').empty();
           
            $('.results').empty();
            
            $('.date_car').empty();
            
            $('.date_img').empty();
            for (row in data[1][0]) {
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                    .html(
                      "<div class='content-img-details'>" +
                        "<img src= 'http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[1][0][row].img_cars + "'" + "</img>" +
                        "</div>"
                    )
                   
            }
            
    
            $('<div></div>').attr({ 'id': data[0][0].id_car, class: 'date_car_dentro' }).appendTo('.date_car')
                .html(
                    '<button class="filter_remove" id="Remove_filter">volver</button>'+
                    "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                    "<h1><b>" + data[0][0].id_brand + " " + data[0][0].name_model + "</b></h1>" +
                    "<hr class=hr-shop>" +
                    "<table id='table-shop'> <tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0][0].Km + "KM" + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + data[0][0].gear_shift + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0][0].name_cat + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0][0].num_doors + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0][0].name_tmotor + "</td>" +
                    "<td> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0][0].matricualtion_date + "</td>  </tr>" +
                    "<td> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp;" + data[0][0].color + "</td>" +
                    "<td> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0][0].city + "</td> </tr>" +
                    "</table>" +
                    "<hr class=hr-shop>" +
                    "<h3><b>" + "More Information:" + "</b></h3>" +
                    "<p>This vehicle has a 2-year warranty and reviews during the first 6 months from its acquisition.</p>" +
                    "<div class='buttons_details'>" +
                    "<a class='carrito' id='" + data[0][0].id_car + "'><i id=" + data[0][0].id_car + " class='fa-solid fa-cart-shopping'></i></a>" +
                    "<span class='button' id='price_details'>" + data[0][0].price + "<i class='fa-solid fa-euro-sign'></i> </span>" +
                    "<br>"+
                    "<a class='details__heart' id='" + data[0][0].id_car + "'><i id=" + data[0][0].id_car + " class='fa-solid fa-heart fa-lg'></i></a>" +
                    
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                    
                )
              
                load_likes_user();
            new Glider(document.querySelector('.date_img'), {
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                dots: '.dots',
                arrows: {
                    prev: '.glider-prev',
                    next: '.glider-next'
                }
            });
            
           

            more_cars_related(data[0][0].name_tmotor);
            mapBox_all2(data);
           
        }).catch(function () {

        });
}
function ajaxForSearch(url,filter,home,filters_search, total_prod = 0, items_page = 3) {
    
    if (total_prod != 0) {
        localStorage.setItem('total_prod', total_prod);
        localStorage.removeItem('total_prod', total_prod);
    } else {
        if (localStorage.getItem('total_prod')) {
            total_prod = localStorage.getItem('total_prod');
            localStorage.removeItem('total_prod', total_prod);
        } 
        else {
            total_prod = 0;
        }
    }

     console.log(url);
    ajaxPromise(url, 'POST', 'JSON', { 'filter':filter, 'home':home, 'filters_search': filters_search,'total_prod': total_prod, 'items_page': items_page})
    .then(function (data) {
        console.log(data);
        $("#containerShop").empty();
        
        if (data == "error") {
            $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'list_content_shop' }).appendTo('#containerShop')
                .html(
                    '<h1>los filtros seleccionados no encajan con los coches que tenemos</h1>');
        } else {
            console.log(data);
            $("#containerShop").empty();
            for (row in data) {
                $('<div></div>').appendTo('#containerShop')
                    .html(
                       
                        "<div class='list_product'>" +
                        "<div class='img-container'>" +
                        "<img src= 'http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_car + "'" + "</img>" +
                        "</div>" +
                        "<div class='product-info'>" +
                        "<div class='product-content'>" +
                        "<h1><b>" + data[row].id_brand + " " + data[row].name_model + "<a class='list__heart' id='" + data[row].id_car + "'><i id= " + data[row].id_car + " class='fa-solid fa-heart'></i></a>" + "</b></h1>" +
                        "<h1><b>" + "<a  id='" + data[row].id_car + "'class='carrito'><i id= " + data[row].id_car + " class='fa-solid fa-cart-shopping'></i></a>" + "</b></h1>" +
                         "<p>Up-to-date maintenance and revisions</p>" +
                        "<ul>" +
                        "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;" + data[row].Km + " KM" + "</li>" +
                        "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;&nbsp;" + data[row].gear_shift + "</li>" +
                        "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp;" + data[row].color + "</li>" +
                        "</ul>" +
                        "<div class='buttons'>" +
                        "<button id='" + data[row].id_car + "' class='more_info_list button add' >More Info</button>" +
                        "<button class='button buy' >Buy</button>" +
                        "<span class='button' id='price'>" + data[row].price + '€' + "</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>");
            }
            mapBox_all(data);
            load_likes_user();
        }

    }
    )
    .catch(function (e) {
        $("#containerShop").empty();
        $('<div></div>').appendTo('#containerShop')
            .html('<h1>No hay coches con estos filtros</h1>');
    });


       
}

function highlight(filter) {
    if (filter != 0) {
        $('.highlight').empty();
        $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
            .html('<p style="display: inline; margin:10px;">Sus filtros: </p>');
        for (row in filter) {
            $('<div style="display: inline; float: right;"></div>').appendTo('.highlight')
                .html('<p style="display: inline; margin:3px;">' + filter[row] + '</p>');
        }
    }
    else {
        $('.highlight').empty();
        location.reload();
    }
}

function print_filters() {
    
    $('<div class="div-filters"></div>').appendTo('.filters')
        .html('<select class="filter_type">' +
            '<option value="A">Adapted</option>' +
            '<option value="E">Electric</option>' +
            '<option value="G">Gasoline</option>' +
            '<option value="H">Hybrid</option>' +
            '</select>' +
            '<select class="filter_category">' +
            '<option value="1">Km0</option>' +
            '<option value="2">Second Hand</option>' +
            '<option value="3">Renting</option>' +
            '<option value="4">Pre-Owned</option>' +
            '<option value="5">Offer</option>' +
            '<option value="6">New</option>' +
            '</select>' +
            '<select class="filter_model">' +
            '<option value="1">A1 </option>' +
            '<option value="2">Q5 </option>' +
            '<option value="3">TT </option>' +
            '<option value="4">A3 </option>' +
            '<option value="5">A7 </option>' +
            '<option value="6">Serie3 </option>' +
            '<option value="7">x5 </option>' +
            '<option value="8">x6 </option>' +
            '<option value="9">Clase A </option>' +
            '<option value="10">Clase C </option>' +
            '<option value="11">Clase G </option>' +
            '<option value="12">GLE </option>' +
            '<option value="13">Leon </option>' +
            '<option value="14">Ibiza </option>' +
            '<option value="15"> Tucson </option>' +
            '<option value="16">i30 </option>' +
            '<option value="17">Ranger </option>' +
            '<option value="18">Focus </option>' +
            '<option value="19">Cooper </option>' +
            '<option value="20">Vitara </option>' +
            '</select>' +
            '<select class="orden">' +
            '<option value="Km">kilometros</option>' +
            '<option value="price">Precio</option>' +
            '<option value="countcar">Visitas</option>' +
            '</select>' +
        
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div >' +
            '</div > ' +
            '</div>' +
            '</div>' +
            '<p> </p>' +
            '<button class="filter_button button_spinner" id="Button_filter">Filter</button>' +
            '<button class="filter_remove" id="Remove_filter">Remove</button>');
}


function filter_button() {
  

    $('.filter_type').change(function () {
        localStorage.setItem('filter_type', this.value);
    });

    if (localStorage.getItem('filter_type')) {
        $('.filter_type').val(localStorage.getItem('filter_type'));
    }


    $('.filter_category').change(function () {
        localStorage.setItem('filter_category', this.value);
    });
    if (localStorage.getItem('filter_category')) {
        $('.filter_category').val(localStorage.getItem('filter_category'));
    }



    $('.filter_model').change(function () {
        localStorage.setItem('filter_model', this.value);
    });
    if (localStorage.getItem('filter_model')) {
        $('.filter_model').val(localStorage.getItem('filter_model'));
    }


    $('.orden').change(function () {
        localStorage.setItem('orden', this.value);
    });
    if (localStorage.getItem('orden')) {
        $('.orden').val(localStorage.getItem('orden'));
    }


   
   
    $(document).on('click', '.filter_button', function () {
        var filter = [];
      
        if (localStorage.getItem('filter_type')) {
            filter.push(['motor ', localStorage.getItem('filter_type')])
        }
        if (localStorage.getItem('filter_category')) {
            filter.push(['category', localStorage.getItem('filter_category')])
        }
        if (localStorage.getItem('filter_model')) {
            filter.push(['model', localStorage.getItem('filter_model')])
        }
        if (localStorage.getItem('orden')) {
           filter.push(['car', localStorage.getItem('orden')])
        }
        
        highlight(filter);
        localStorage.setItem('filter', JSON.stringify(filter));

        console.log(JSON.stringify(filter));
        

        if (filter) {
            location.reload();
            ajaxForSearch(friendlyURL('?module=shop&op=filter'), filter);
        } else {
            ajaxForSearch(friendlyURL('?module=shop&op=all_cars'));
        }
    });
}

function load_details() {
    $(document).on('click', '.link', function () {
        var id = this.getAttribute('id');
        details(id);
    })
}

function remove_filter() {
    $(document).on('click', '.filter_remove', function () {
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('category_filter');
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('motor_filter');
        localStorage.removeItem('filters_search');
        localStorage.removeItem('detalle_coche');
        localStorage.removeItem('orden');
        localStorage.removeItem('orden_ascendente_descendente');
        localStorage.removeItem('ordenar');
        localStorage.removeItem('filter');
        localStorage.removeItem('pagination');
        location.reload();
    });
}


function mapBox(id) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id.lon, id.lat], 
        zoom: 10 
    });
    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<h4>' + 'modelo del coche: ' + id.model + '</h4><p>Modelo del motor: ' + id.motor + '</p>' +
        '<p>Precio: ' + id.price + '€</p>' +
        '<img src=" http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/' + id.img_car + '" alt="" width="200" height="150""/>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([id.lon, id.lat])
        .addTo(map);



}


function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], 
        zoom: 6 
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h3 style="text-align:center;">' + 'modelo del coche: ' + data[row].model + '</h3><p style="text-align:center;">Modelo del motor: <b>' + data[row].motor + '</b></p>' +
            '<p style="text-align:center;">Precio: <b>' + 'precio del coche: ' + data[row].price + '€</b></p>' +
            '<img src=" http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/' + data[row].img_car + '" alt="" width="200" height="150""/>' +
            '<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall more_info_list" data-wow-delay=".4s" id="' + data[row].id_car + '">Read More</a>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].lon, data[row].lat])
            .addTo(map);
    }
}
function mapBox_all2(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], 
        zoom: 6 
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h3 style="text-align:center;">' + 'modelo del coche: ' + data[0][0].model + '</h3><p style="text-align:center;">Modelo del motor: <b>' + data[0][0].motor + '</b></p>' +
            '<p style="text-align:center;">Precio: <b>' + 'precio del coche: ' + data[0][0].price + '€</b></p>' +
            '<img src="http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/' + data[0][0].img_car + '" alt="" width="200" height="150""/>' +
            '</a>')
        marker.setPopup(minPopup)
            .setLngLat([data[0][0].lon, data[0][0].lat])
            .addTo(map);
    }
}



function load_detalle_coche() {
    var array_detallec = JSON.parse(localStorage.getItem('detalle_coche'));
    var coche = array_detallec[0].id_car[0];
    loadDetails(coche);
}



function load_search( total_prod = 0, items_page) {
    var filters_search = JSON.parse(localStorage.getItem('filters_search'));
    ajaxPromise(friendlyURL('?module=shop&op=search'), 'POST', 'JSON', { 'filters_search':filters_search,'total_prod': total_prod, 'items_page': items_page })
        .then(function(data) {
            console.log(data);
            $("#containerShop").empty();
            for (row in data) {
                $('<div></div>').appendTo('#containerShop')
                .html(
                    "<div class='list_product'>" +
                            "<div class='img-container'>" +
                            "<img src= 'http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_car + "'" + "</img>" +
                            "</div>" +
                            "<div class='product-info'>" +
                            "<div class='product-content'>" +
                            "<h1><b>" + data[row].id_brand + " " + data[row].name_model + "<a class='list__heart' id='" + data[row].id_car + "'><i id= " + data[row].id_car + " class='fa-solid fa-heart fa-lg'></i></a>" + "</b></h1>" +
                            "<h1><b>" + "<a  id='" + data[row].id_car + "'class='carrito'><i id= " + data[row].id_car + " class='fa-solid fa-cart-shopping'></i></a>" + "</b></h1>" +
                             "<p>Up-to-date maintenance and revisions</p>" +
                            "<ul>" +
                            "<li> <i id='col-ico' class='fa-solid fa-road fa-xl'></i>&nbsp;&nbsp;" + data[row].Km + " KM" + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-person fa-xl'></i>&nbsp;&nbsp;&nbsp;" + data[row].gear_shift + "</li>" +
                            "<li> <i id='col-ico' class='fa-solid fa-palette fa-xl'></i>&nbsp;" + data[row].color + "</li>" +
                            "</ul>" +
                            "<div class='buttons'>" +
                            "<button id='" + data[row].id_car + "' class='more_info_list button add' >More Info</button>" +
                            "<button class='button buy' >Buy</button>" +
                            "<span class='button' id='price'>" + data[row].price + '€' + "</span>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>"
            );
            }
            mapBox_all(data);
        }).catch(function() {
            $("#containerShop").empty();
            $('<div></div>').appendTo('#containerShop')
                .html('<h1>No hay coches con estos filtros</h1>');
         });
}


function cars_related(loadeds = 0, type_car, total_items) {
    console.log('hola_cars_related_js');
    let items = 3;
    let loaded = loadeds;
    let type = type_car;
    let total_item = total_items;
    $('.title_content').empty();
  
    ajaxPromise(friendlyURL('?module=shop&op=cars_related'), 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items })
        .then(function(data) {
            console.log(data);
            if (loaded == 0) {
                $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.results')
                    .html(
                        '<h2 class="cat">Cars related</h2>'
                    )
                for (row in data) {
                    if (data[row].id_car != undefined) {
                        
                        $('<div></div>').attr({ 'id': data[row].id_car,'class': 'more_info_list'  }).appendTo('.title_content')
                        
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +

                                "<img src = http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_car + " alt='imagen car' </img> " +
                                "</div>" +
                                "<h5>" + data[row].id_brand + "  " + data[row].name_model +"</h5>" +
                               
                                "</div>" +
                                "</li>"
                            )
                            
                    }
                }
                $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                    .html(
                        '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                    )
            }
            if (loaded >= 3) {
                for (row in data) {
                    if (data[row].id_car != undefined) {
                        console.log(data);

                        $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'more_info_list'  }).appendTo('.title_content')
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +
                                "<img src= 'http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_car +'"></img>'+
                                "</div>" +
                                "<h5>" + data[row].id_brand + "  " + data[row].name_model + "</h5>" +
                                "</div>" +
                                "</li>"
                                
                            )       
                    }
                }
                var total_cars = total_item - 3;
                if (total_cars <= loaded) {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            "</br><button class='btn-notexist' id='btn-notexist'></button>"
                        )
                } else {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function() {
            console.log("error cars_related");
        });
}

function more_cars_related(type_car) {
    console.log('hola_more_cars_related_js');
    var type_car = type_car;
    var items = 0;
   
    ajaxPromise(friendlyURL('?module=shop&op=count_cars_related'), 'POST', 'JSON', { 'type_car': type_car})
        .then(function(data) {
            console.log(data);
            var total_items = data[0].n_prod;
            cars_related(0, type_car, total_items);
            $(document).on("click", '.load_more_button', function() {
                items = items + 3;
                $('.more_car__button').empty();
                cars_related(items, type_car, total_items);
              
            });
        }).catch(function() {
            console.log('error total_items');
        });
}





function pagination() {
    var filter = JSON.parse(localStorage.getItem('filter', filter));
    var brand_filter = JSON.parse(localStorage.getItem('brand_filter', brand_filter));
    var category_filter = JSON.parse(localStorage.getItem('category_filter', category_filter));
    var motor_filter = JSON.parse(localStorage.getItem('motor_filter', motor_filter));
    var filters_search = JSON.parse(localStorage.getItem('filters_search', filters_search));
    if (filter) {
        console.log('filter');
        var url = friendlyURL('?module=shop&op=count_filters');
    } else if (filters_search) {
        var url = friendlyURL('?module=shop&op=count_search');
   } 
    else if (brand_filter){
        
        var homee=brand_filter;
        var url = friendlyURL('?module=shop&op=count_home');
    } else if(category_filter){
        var homee=category_filter;
     
        var url =friendlyURL('?module=shop&op=count_home') ;
    } else if (motor_filter){
        var homee=motor_filter;

        var url =friendlyURL('?module=shop&op=count_home') ;
    } else {
        var url = friendlyURL('?module=shop&op=count');
    }
    ajaxPromise(url, 'POST', 'JSON', {'homee':homee,'filter': filter, 'filters_search': filters_search})
        .then(function(data) {
            
            console.log(data);
            var total_prod = data[0].contador;
            console.log(total_prod);
            if (total_prod >= 3) {
                total_pages = Math.ceil(total_prod / 3)
            } else {
                total_pages = 1;
            }
            console.log(total_pages);
            $('#pagination').bootpag({
                total: total_pages,
                page: localStorage.getItem('move') ? JSON.parse(localStorage.getItem('move'))[1] / 3 + 1 : 1,
                maxVisible: total_pages
            }).on('page', function(event, num) {
                
                total_prod = 3 * (num - 1);
                console.log(total_prod);
                localStorage.setItem('total_prod', total_prod);   
                items_page = 3;
                loadCars(total_prod, items_page) ;
                $('html, body').animate({ scrollTop: $(".wrap") });
            });

        })
}

function click_like(id_car, lugar) {
    console.log('click_like');
    var token = localStorage.getItem('token');
    if (token) {
       
        ajaxPromise(friendlyURL('?module=shop&op=control_likes'),'POST', 'JSON',{'id_car': id_car, 'token': token })
            .then(function(data) {
                console.log(data);
                console.log(id_car);
               
                $("#" + id_car + ".fa-heart").toggleClass('like_red');
                if (data=='likes'){
                    toastr.success('like');
                }
                if (data=='delete'){
                    toastr.success('delete');
                }
            }).catch(function() {
            });

    } else {
        const redirect_like = [];
        redirect_like.push(id_car, lugar);

        localStorage.setItem('redirect_like', redirect_like);
        localStorage.setItem('id_car',id_car);
       
        toastr.warning("Debes de iniciar session");
       
        setTimeout(function() {
            window.location.href =friendlyURL('index.php?module=login&op=view');
        }, 1000);

    }
}

function load_likes_user() {
    console.log('load_likes_user');
    var token = localStorage.getItem('token');
    if (token) {

        ajaxPromise(friendlyURL('?module=shop&op=load_likes_user'), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                console.log(data);
                for (row in data) {
                    $("#" + data[row].id_car + ".fa-heart").toggleClass('like_red');
                }
            }).catch(function() {
            });
    }
}

function redirect_login_like() {
    console.log('redirect_login_like');
    var id_car = localStorage.getItem('id_car');
    var id_car = localStorage.getItem('id_car');
    var token = localStorage.getItem('token');
    console.log(token);
    var redirect_like = localStorage.getItem('redirect_like');
    if (token) {
        console.log('redirect_login_like_1');

        ajaxPromise(friendlyURL('?module=shop&op=control_likes'), 'POST', 'JSON', {'id_car':id_car, 'token': token })
        .then(function(data) {
            console.log(data);
                $("#" + id_car + ".fa-heart").toggleClass('like_red');
                if (data=='likes'){
                    toastr.success('like');
                }
                if (data=='delete'){
                    toastr.success('delete');
                }
                if (redirect_like) {
                redirect_like = redirect_like.split(",");
                var id = redirect_like[0];
                var id_ = parseInt(id);
                console.log(id_);
                $("#" + id_car + ".fa-heart").toggleClass('like_red');
                loadDetails(id_);
                localStorage.removeItem('redirect_like');
                localStorage.removeItem('page');
                }
            }).catch(function() {
            });       
   }  
        

}
$(document).ready(function () {
    load_details();
    print_filters();
    filter_button();
    loadCars();
    clicks();
    remove_filter();
    pagination();
   
});
