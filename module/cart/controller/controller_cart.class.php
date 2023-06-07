<?php
    class controller_cart {

        function view() {
            common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
        }
        function insert_cart() {
            echo json_encode(common::load_model('cart_model', 'get_insert_cart',[$_POST['token'],$_POST['codigo_producto']]));
        }
        function delete_cart() {
            echo json_encode(common::load_model('cart_model', 'get_delete_cart',[$_POST['token'],$_POST['codigo_producto']]));
        }
        function load_cart() {
            echo json_encode(common::load_model('cart_model', 'get_load_cart',$_POST['token']));
        }
        function update_qty() {
            echo json_encode(common::load_model('cart_model', 'get_update_qty',[$_POST['token'],$_POST['codigo_producto'],$_POST['qty']]));
        }
        function checkout() {
            echo json_encode(common::load_model('cart_model', 'get_checkout',$_POST['token']));
        }


    }
?>
