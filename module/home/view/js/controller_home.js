function loadCategories() {
  // console.log('hola');
  ajaxPromise(friendlyURL('?module=home&op=category'),'GET', 'JSON')
        .then(function(data) {
          console.log(data);
  //     console.log(data);
      for (row in data) {
          // console.log(data);
          $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].name_cat }).appendTo('#cards-list')
              .html(
                  "<li class='card'>" +
                  "<div class='card_title'>" +
                  "<div class='card_image'>" +
                  "<img src = http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_cat + " alt='foto'> </img> " +
                  "</div>" +
                  "<h5>" + data[row].name_cat + "</h5>" +
                  "</div>" +
                  "</li>"
              ) 
      }
  }).catch(function() {
      window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
  });
}

function carousel_Brands() {
  // console.log('hola');
  ajaxPromise(friendlyURL('?module=home&op=carrusel'),'GET', 'JSON')
  // ajaxPromise('module/home/ctrl/ctrl_home.php?op=Carrousel_Brand','GET', 'JSON')
  .then(function(data) {
      console.log(data);
      for (row in data) {
                       $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].name_brand).appendTo(".carousel__list").html(
                           "<img class='carousel__img' src='http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_brand + "' alt='' >"
                       )
                   }
                  new Glider(document.querySelector('.carousel__list'), {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      draggable: true,
                      dots: '.dots',
                      arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next'
                      }
                    });    
       })
      
  
      .catch(function() {
          //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
      });
       
}
function loadCatTypes() {
  ajaxPromise(friendlyURL('?module=home&op=type'),'GET', 'JSON')
  // ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageType','GET', 'JSON')
  .then(function(data) {
      console.log(data);
      for (row in data) {
                   $('<div></div>').attr('class', "div_motor").attr({ 'id': data[row].name_tmotor }).appendTo('#cards-list2')
                       .html(
                           "<li class='card2'>" +
                           "<div class='card_title2'>" +
                           "<div class='card_image2'>" +
                           "<img src = http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_tmotor + " alt='foto'" +
                           "</div>" +
                           "<h5>" + data[row].name_tmotor + "</h5>" +
                           "</div>" +
                           "</li>"
                       )
       
               }
 
  }).catch(function() {
    //  window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
  });
}
function masvisitados(){
  // console.log('hola');
  // ajaxPromise('module/home/ctrl/ctrl_home.php?op=visitas','GET', 'JSON')
  // console.log('masisitados');
  ajaxPromise(friendlyURL('?module=home&op=visitas'),'GET', 'JSON')
  // ajaxPromise('module/home/ctrl/ctrl_home.php?op=visitas','GET', 'JSON')
  
  .then(function(data) {
      console.log(data);
      for (row in data) {
                       $('<div></div>').attr('class', "coches_visitados").attr('id', data[row].id_car).appendTo(".coches_mas_visitados").html(
                           "<img class='img_car' src='http://localhost/MVC_CRUD_conccesionario3/Framework_PHP_OOP_MVC/" + data[row].img_car + "' alt='' >"
                       )
                   }
                  new Glider(document.querySelector('.coches_mas_visitados'), {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      draggable: true,
                      // dots: '.dots',
                      // arrows: {
                      //   prev: '.glider-prev',
                      //   next: '.glider-next'
                      // }
                    });   
                   
      })
      
  
      .catch(function() {
          // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=visitas HOME";
      });
}
function getSuggestions() {
  limit = 2;
  ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=car', 'GET', 'JSON')
  .then(function(data) {
      var DatosJson = JSON.parse(JSON.stringify(data));
      DatosJson.items.length = limit;

      for (i = 0; i < DatosJson.items.length; i++) {
          $('<div id="prueba"></div>').appendTo('#featured').html(
              "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div>" +
              '<textarea rows="10">' + data['items'][i]['volumeInfo']['description'] + '</textarea>' +
              '<br>' +
              '<br>' +
              '<br>' +
              '<a target="_blank" href="' + data['items'][i]['accessInfo']['webReaderLink'] + '" class="cta_search">' +
              '<span>Show info</span>' +
              '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
              '<path d="M1,5 L11,5"></path>' +
              '<polyline points="8 1 12 5 8 9"></polyline>' +
              '</svg>' +
              '</a>');
      }
    
      $("#featured").append(
          '<br>' +
          '<br>' +
          '<br>' +
          '<button class="cta">' +
          '<span>Show 2 more</span>' +
          '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
          '<path d="M1,5 L11,5"></path>' +
          '<polyline points="8 1 12 5 8 9"></polyline>' +
          '</svg>' +
          '</button>'
      );

  
  });
  loadsuggestions();
}

function loadsuggestions() {
  var limit = 2;
  
  $(document).on("click", '.cta', function() {
      $('#featured').empty();
      $('#btnfeatured').empty();
      limit = limit + 2;

      ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=car', 'GET', 'JSON')
      .then(function(data) {
          var DatosJson = JSON.parse(JSON.stringify(data));
          DatosJson.items.length = limit;

          for (i = 0; i < DatosJson.items.length; i++) {
              $('<div id="prueba"></div>').appendTo('#featured').html(
                  "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div>" +
                  '<textarea rows="10">' + data['items'][i]['volumeInfo']['description'] + '</textarea>' +
                  '<br>' +
                  '<br>' +
                  '<br>' +
                  '<a target="_blank" href="' + data['items'][i]['accessInfo']['webReaderLink'] + '" class="cta_search">' +
                  '<span>Show info</span>' +
                  '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
                  '<path d="M1,5 L11,5"></path>' +
                  '<polyline points="8 1 12 5 8 9"></polyline>' +
                  '</svg>' +
                  '</a>');
          }
          $("#btnfeatured").append(
              '<button class="cta">' +
              '<span>Show 2 more</span>' +
              '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
              '<path d="M1,5 L11,5"></path>' +
              '<polyline points="8 1 12 5 8 9"></polyline>' +
              '</svg>' +
              '</button>'
          );
          if (limit === 10) {
              $('#btnfeatured').empty();
              $("#nomore").append(
                  '<div id="loadsugest"><a>NO HAY MAS LIBROS</a></div>'
              );
          }
      });
  })
}
function clicks() {
    
    // localStorage.removeItem('filter_type');
    // localStorage.removeItem('filter_category');
    // localStorage.removeItem('filter_model');
        localStorage.removeItem('filter');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('filters_search');
        // localStorage.removeItem('motor_filter');
    $(document).on("click", '.carousel__elements', function() {
        var brand_filter = [];
        brand_filter.push({ "name_brand": [this.getAttribute('id')] });
        localStorage.removeItem('category_home');
        localStorage.removeItem('type_motor_filter');
        localStorage.setItem('brand_filter', JSON.stringify(brand_filter));
        console.log('carousel__elements');
        setTimeout(function() {
            window.location.href = friendlyURL('index.php?module=shop&op=view');
        }, 300);
    });
    $(document).on("click", '.div_cate', function() {
        var category_filter = [];
        category_filter.push({ "category_home": [this.getAttribute('id')] });
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('motor_filter');
        localStorage.setItem('category_filter', JSON.stringify(category_filter));
        console.log('div_cate');
        setTimeout(function() {
            window.location.href = friendlyURL('index.php?module=shop&op=view');
        },  300);
    });

    $(document).on("click", '.div_motor', function() {
        var motor_filter = [];
        motor_filter.push({ "name_tmotor": [this.getAttribute('id')] });
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('category_filter');
        localStorage.setItem('motor_filter', JSON.stringify(motor_filter));
        console.log('div_motor');
        setTimeout(function() {
            window.location.href =friendlyURL('index.php?module=shop&op=view');
        }, 300);
    });
    
    $(document).on("click", '.coches_visitados', function() {
        var detalle_coche = [];
        detalle_coche.push({ "id_car": [this.getAttribute('id')] });
        
        localStorage.setItem('detalle_coche', JSON.stringify(detalle_coche));
        localStorage.removeItem('category_filter');
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('motor_filter');
        console.log('detalle_coche');
        setTimeout(function() {
            window.location.href = friendlyURL('index.php?module=shop&op=view');
        }, 300); 
    });
}



$(document).ready(function() {
  // console.log('hola');
  loadCategories();
  carousel_Brands();
  loadCatTypes();
  getSuggestions();
  masvisitados();
  clicks();
});