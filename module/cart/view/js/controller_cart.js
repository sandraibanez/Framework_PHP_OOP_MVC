function add_cart(id_car){
    console.log('cart_add_cart');
    var id_car3 = localStorage.getItem('id_car');
    var token = localStorage.getItem('token');
    var codigo_producto = id_car3 ;
    localStorage.removeItem('redirect_cart');
    console.log(codigo_producto);
    console.log(token);

    const redirect_cart = [];
        redirect_cart.push();
        
    if(localStorage.getItem('token') == null){
        localStorage.setItem('redirect_cart', redirect_cart);
        toastr.warning("Debes de iniciar session");
        setTimeout(function() {
            window.location.href =friendlyURL('index.php?module=login&op=view');
        }, 1000);
        
    }else{
        localStorage.removeItem('redirect_cart');
        ajaxPromise(friendlyURL('?module=cart&op=insert_cart'),'POST', 'JSON',{'token':token,'codigo_producto':codigo_producto})
        .then(function(data) { 
            console.log(data);
            toastr.success('producto añadido al carrito');
        }).catch(function() {
        });   
    }
}

function load_cart(){
    console.log('cart_load_cart');
    var token = localStorage.getItem('token');
    console.log(token);

    if(localStorage.getItem('token') == null){
        
    }else{
        localStorage.removeItem('redirect_cart2');

        ajaxPromise(friendlyURL('?module=cart&op=load_cart'),'POST', 'JSON',{'token':token})
        .then(function(data) { 
            console.log(data);
            var total_price = 0;
            if(data=='lista_vacia'){
                $('<div></div>').appendTo('.cart__products')
                .html(
                    '<h1>LISTA VACIA</h1>'
                )
            }else{
            for (row in data) {
                console.log(data);
                
                $('<div></div>').appendTo('.cart__products')
                        .html(
               
                '<table>'+
                '<tr><div class="basket-product" id="'+ data[row].codigo_producto+'"><div class="item">'+
                   ' <td class="image">'+ '<img src="'+data[row].img_car+'" alt="Placholder Image 2" class="product-frame">' +'</td>'+
                   '<td class="name">'+ "<table>"+
                   '<tr>'+"brand "+
                   '<td>'+data[row].name_brand  +'</td>'+ '<td>'+ data[row].name_model  +'</td>'+ '<td>'+  data[row].gear_shift  +'</td>'+
                   '</tr>'+
                   '<tr>'+"modelo "+
                   '</tr>'+
                   '<tr>'+"type car"+'</tr>'+
            "</table>"+'</td>'+

            '<td class="price">' + data[row].price + "€"+'</td>'+
            '<td class="amount">'+'<p>'+"cantidad"+'</p>'+'<input class="quantity-field" id="'+ data[row].codigo_producto +'" type="number" value="' + data[row].qty + '" min="1" max="' + data[row].qty_max + '"></td>'+
            '<td id="'+ data[row].codigo_producto +'" class="pricesubtotal">'+'<strong>precio total : ' + (data[row].price)*(data[row].qty) +  "€"+'</strong>'+'</td>'+
            '<td class="remove">'+'<button class="button__remove" id="'+ data[row].codigo_producto +'">Remove</button>'+'</td>'+
               ' </tr></div></div></div>'+
             '  </table>'+

             '<button class="checkout-cta" id="'+ data[row].codigo_producto +'">checkout</button>'
                )  
             }
                var total_price = total_price + (data[row].precio)*(data[row].qty);
            }    
            $(".subtotal-value").append(total_price);
            $(".total-value").append(total_price);
        }).catch(function() {
        });   
    }   

}

function remove_cart(){
    console.log('cart_remove_cart');
    $(document).on('click','.button__remove',function () {
        var id_car3 = localStorage.getItem('id_car');
        var token = localStorage.getItem('token');
        var codigo_producto = this.getAttribute('id');
        console.log(codigo_producto);
        if(localStorage.getItem('token') == null){
        }else{
            
            ajaxPromise(friendlyURL('?module=cart&op=delete_cart'),'POST', 'JSON',{'token':token,'codigo_producto':codigo_producto})
            .then(function(data) { 
                console.log(data);
                location.reload();
                $('div.basket-product#'+ codigo_producto).empty();

            }).catch(function() {
            });   
        }
    });
}

function change_qty(){
    console.log('cart_change_qty');
    $(document).on('input','.quantity-field',function () {
        var id_car3 = localStorage.getItem('id_car');
        var token = localStorage.getItem('token');
        var codigo_producto = this.getAttribute('id') ;
        
        
        var qty = $("#"+codigo_producto+".quantity-field" ).val();
        console.log(qty);
        console.log(codigo_producto);
        if(localStorage.getItem('token') == null){
        }else{
            ajaxPromise(friendlyURL('?module=cart&op=update_qty'),'POST', 'JSON',{'token':token,'codigo_producto':codigo_producto,'qty':qty})
            .then(function(data) { 
                console.log(data);
                $('div.basket-product#'+ codigo_producto).empty();
                
                location.reload();
            }).catch(function() {
            });   
        }
    });
}

function checkout(){
    console.log('cart_checkout');
    var token = localStorage.getItem('token');
    $(document).on('click','.checkout-cta',function () {
        if(localStorage.getItem('token') == null){
        }else{
            ajaxPromise(friendlyURL('?module=cart&op=checkout'),'POST', 'JSON',{'token':token})
            .then(function(data) { 
                console.log(data);
                $('div.basket-product#'+ codigo_producto).empty();
               
                    window.location.href =friendlyURL('index.php?module=shop&op=view');
              
            }).catch(function() {
            });   
        }
        location.reload();
    });
    
}

$(document).ready(function(){
    load_cart();
    remove_cart();
    change_qty();
    checkout();
});

