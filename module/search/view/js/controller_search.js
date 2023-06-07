
function load_brands() {
    
    ajaxPromise(friendlyURL('?module=search&op=search_brand'), 'POST', 'JSON')
        .then(function (data) {
            console.log(data);
            
            $('<option>Brand</option>').attr('selected', true).attr('disabled', true).appendTo('.search_brand')
            for (row in data) {
                $('<option value="' + data[row].name_brand + '">' + data[row].name_brand + '</option>').appendTo('.search_brand')
            }
           
        }).catch(function () {
        });
}

function load_category(brand) {
    
    console.log('hola2');
    $('.search_category').empty();
    if (brand == undefined) {
        console.log('hola4');
        ajaxPromise(friendlyURL('?module=search&op=search_category_null'), 'POST', 'JSON')
            .then(function (data) {
                console.log(data);
                $('<option>Category</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
                for (row in data) {
                    $('<option value="' + data[row].name_cat + '">' + data[row].name_cat + '</option>').appendTo('.search_category')
                }
            }).catch(function () {
            });
    }
    else {
        console.log('hola3');
        console.log(brand);

        ajaxPromise(friendlyURL('?module=search&op=search_category'), 'POST', 'JSON', brand)
            .then(function (data) {
                console.log(data);
                $('<option>Category</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
                for (row in data) {
                    $('<option value="' + data[row].name_cat + '">' + data[row].name_cat + '</option>').appendTo('.search_category')
                }
            }).catch(function () {
            });
     }
 }

function launch_search() {
    load_brands();
    load_category();
    
     $(document).on('change', '.search_brand', function () {
        let brand = $(this).val();
        
        console.log(brand);
        
        if (brand === 0) {
            load_category();
        } else {
            load_category({ brand });
        }
       
    });
}

function autocomplete() {
   console.log('sdata');
    $("#autocom").on("keyup", function () {
        console.log('hola_auto');
         let sdata = { complete: $(this).val() };
        if (($('.search_brand').val() != 0)) {
            sdata.brand = $('.search_brand').val();
            if (($('.search_brand').val() != 0) && ($('.search_category').val() != 0)) {
                sdata.category = $('.search_category').val();
            }
        }
        if (($('.search_brand').val() == undefined) && ($('.search_category').val() != 0)) {
            sdata.category = $('.search_category').val();
        }
       
  
          ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', {'sdata':sdata})
             .then(function (data) {
                 console.log(data);
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({ 'class': 'searchElement', 'id': data[row].city });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
             }).catch(function () {
                 $('#search_auto').fadeOut(500);
             });
     });
}

function button_search() {

    $('#search-btn').on('click', function () {
     console.log('hola_salto_search');
        var filters_search = [];
        if ($('.search_brand').val() != undefined) {
            filters_search.push({ "brand": [$('.search_brand').val()] })
            if ($('.search_category').val() != undefined) {
                filters_search.push({ "category": [$('.search_category').val()] })
            }
            if ($('#autocom').val() != undefined) {
                filters_search.push({ "city": [$('#autocom').val()] })
            }
        } 
        else if ($('.search_brand').val() == undefined) {
            if ($('.search_category').val() != undefined) {
                filters_search.push({ "category": [$('.search_category').val()] })
            }
            if ($('#autocom').val() != undefined) {
                filters_search.push({ "city": [$('#autocom').val()] })
             }
        }
        localStorage.removeItem('filters_search');
        localStorage.removeItem('filter');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('category_filter');
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('motor_filter');
        localStorage.removeItem('detalle_coche');
        if (filters_search.length != 0) {
            localStorage.setItem('filters_search', JSON.stringify(filters_search));
        }       
            window.location.href =friendlyURL('index.php?module=shop&op=view');
        
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});

