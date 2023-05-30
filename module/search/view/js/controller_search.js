
function load_brands() {
    // console.log('hola_load_brands');
    
    // ajaxPromise('module/search/crtl/crtl_search.php?op=search_brand', 'POST', 'JSON')
    ajaxPromise(friendlyURL('?module=search&op=search_brand'), 'POST', 'JSON')
        .then(function (data) {
            console.log(data);
            
            $('<option>Brand</option>').attr('selected', true).attr('disabled', true).appendTo('.search_brand')
            for (row in data) {
                $('<option value="' + data[row].name_brand + '">' + data[row].name_brand + '</option>').appendTo('.search_brand')
            }
           
        }).catch(function () {
            // window.location.href = "index.php?page=exception&op=503&error=fail_load_brands&type=503";
        });
}

function load_category(brand) {
    // console.log(brand);
    
    console.log('hola2');
    $('.search_category').empty();
    if (brand == undefined) {
        console.log('hola4');
        // ajaxPromise('module/search/crtl/crtl_search.php?op=search_category_null', 'POST', 'JSON')
        ajaxPromise(friendlyURL('?module=search&op=search_category_null'), 'POST', 'JSON')
            .then(function (data) {
                console.log(data);
                $('<option>Category</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
                for (row in data) {
                    $('<option value="' + data[row].name_cat + '">' + data[row].name_cat + '</option>').appendTo('.search_category')
                }
            }).catch(function () {
                // window.location.href = "index.php?page=exception&op=503&error=fail_load_category&type=503";
            });
    }
    else {
        console.log('hola3');
        console.log(brand);

        // ajaxPromise('module/search/crtl/crtl_search.php?op=search_category', 'POST', 'JSON', brand)
        ajaxPromise(friendlyURL('?module=search&op=search_category'), 'POST', 'JSON', brand)
            .then(function (data) {
                console.log(data);
                $('<option>Category</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
                for (row in data) {
                    $('<option value="' + data[row].name_cat + '">' + data[row].name_cat + '</option>').appendTo('.search_category')
                }
            }).catch(function () {
                //  window.location.href = "index.php?module=exception&op=503&error=fail_loas_category_2&type=503";
            });
     }
 }

function launch_search() {
    // console.log('hola_change');
    load_brands();
    load_category();
    // // $('.search_category').change(function () {
    // //   console.log(this.value);
    // // });
     $(document).on('change', '.search_brand', function () {
        // console.log('hola_change');
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
        // console.log(category);
         let sdata = { complete: $(this).val() };
        // console.log(sdata);
        if (($('.search_brand').val() != 0)) {
            sdata.brand = $('.search_brand').val();
            if (($('.search_brand').val() != 0) && ($('.search_category').val() != 0)) {
                sdata.category = $('.search_category').val();
            }
        }
        if (($('.search_brand').val() == undefined) && ($('.search_category').val() != 0)) {
            sdata.category = $('.search_category').val();
        }
        // console.log(sdata.brand);
        // console.log(sdata);
  
          ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', {'sdata':sdata})
             .then(function (data) {
                // console.log({sdata});
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
        // console.log(search);
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
            // window.location.href = friendlyURL('index.php?module=shop&op=view');
            window.location.href =friendlyURL('index.php?module=shop&op=view');
        
    });
}

$(document).ready(function () {
    // console.log('hola_js');
    launch_search();
    autocomplete();
    button_search();
});




// function load_car_type(){
//     ajaxPromise(friendlyURL('?module=search&op=car_type'), 'POST', 'JSON')
//     .then(function(data) {
//         // console.log(data);
//         for (row in data) {
//             let content = data[row].type_name.replace(/_/g, " ");
//             $('#type_select').append('<option value = "' + data[row].type_name + '">' + content + '</option>');
//         }
//     }).catch(function() {
//         console.log('Error: load car type');
//     });
// }

// function load_car_brand(data = undefined){
//     ajaxPromise(friendlyURL('?module=search&op=car_brand'), 'POST', 'JSON', data)
//     .then(function(data) {
//         // console.log(data);
//         $('#brand_select').empty();
//         $('#brand_select').append('<option value = "0">Car brand...</option>');
//         for (row in data) {
//             let content = data[row].brand_name.replace(/_/g, " ");
//             $('#brand_select').append('<option value = "' + data[row].brand_name + '">' + content + '</option>');
//         }
//     }).catch(function() {
//         console.log('Error: load car brand');
//     }); 
// }

// function launch_search() {
//     load_car_type();
//     load_car_brand();
//     $('#type_select').on('change', function(){
//         let type_name = $(this).val();
//         if (type_name === 0) {
//             load_car_brand();
//         }else {
//             load_car_brand({car_type: type_name});
//         }
//     });
// }

// function autocomplete(){

//     $("#autocom").on("keyup", function () {
//         $('#search_auto').css('display', 'block');
//         let auto_complete_data = {complete: $(this).val()};
//         if (($('#type_select').val() != 0)){
//             auto_complete_data.car_type = $('#type_select').val();
//             if(($('#type_select').val() != 0) && ($('#brand_select').val() != 0)){
//                 auto_complete_data.car_brand = $('#brand_select').val();
//              }
//         }
//         if(($('#type_select').val() == 0) && ($('#brand_select').val() != 0)){ 
//             auto_complete_data.car_brand = $('#brand_select').val();
//         }
            
//         ajaxPromise(friendlyURL('?module=search&op=autocomplete'), 'POST', 'JSON', auto_complete_data)
//         .then(function(data) {
//             $('#search_auto').empty();
//             $('#search_auto').fadeIn(10000000);
//             console.log(data);
//                 for (row in data) {
//                     $('<div></div>').appendTo('#search_auto').html(data[row].city).attr({'class': 'search_element', 'id': data[row].city});
//                 }
//             $(document).on('click', '.search_element', function() {
//                 $('#autocom').val(this.getAttribute('id'));
//                 $('#search_auto').fadeOut(1000);
//             });
//             $(document).on('click scroll', function(event) {
//                 if (event.target.id !== 'autocom') {
//                     $('#search_auto').fadeOut(1000);
//                 }
//             });
//         }).catch(function() {
//             $('#search_auto').fadeOut(500);
//         });
//     });
// }

// function search_button() {
//     $('#search_button').on('click', function() {
           
//         var search = [];

//         if(($('#type_select').val() == 0) && ($('#brand_select').val() == 0)){
//             if($('#autocom').val() != ""){
//                 search.push({"city":[$('#autocom').val()]});
//             }
//         }else if(($('#type_select').val() != 0) && ($('#brand_select').val() == 0)){
//             if($('#autocom').val() != ""){
//                 search.push({"city":[$('#autocom').val()]});
//             }
//             search.push({"type_name":[$('#type_select').val()]});
//         }else if(($('#type_select').val() == 0) && ($('#brand_select').val() != 0)){
//             if($('#autocom').val() != ""){
//                 search.push({"city":[$('#autocom').val()]});
//             }
//             search.push({"brand_name":[$('#brand_select').val()]});
//         }else{
//             if($('#autocom').val() != ""){
//                 search.push({"city":[$('#autocom').val()]});
//             }
//             search.push({"type_name":[$('#type_select').val()]});
//             search.push({"brand_name":[$('#brand_select').val()]});
//         }
        
//         localStorage.removeItem('filters');
//         localStorage.setItem('currentPage', 'shop-list');

//         if(search.length != 0){
//             localStorage.setItem('filters', JSON.stringify(search));
//         }
//         window.location.href = friendlyURL('index.php?module=shop&op=view');

//     });
// }

// $(document).ready(function() {
//     launch_search();
//     autocomplete();
//     search_button();
// });