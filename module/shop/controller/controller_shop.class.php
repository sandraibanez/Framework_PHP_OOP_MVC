<?php
    class controller_shop {

        function view() {
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function all_cars() {
            echo json_encode(common::load_model('shop_model', 'get_all_cars'));
        }
        function details_car() {
            echo json_encode(common::load_model('shop_model', 'get_details_car',$_POST['id']));
        }
        function countcar() {
            echo json_encode(common::load_model('shop_model', 'get_countcar',$_POST['id']));
        }
        function filter() {
            
            echo json_encode(common::load_model('shop_model', 'get_filter',$_POST['filter']));
        }
        
        function home_filter() {
            echo json_encode(common::load_model('shop_model', 'get_home_filter', $_POST['home']));

        }
                
        
        function detalle_coche() {
            echo json_encode(common::load_model('shop_model', 'get_detalle_coche'));
        }
        function search() {
            echo json_encode(common::load_model('shop_model', 'get_search',$_POST['filters_search']));
        }
        function count_cars_related() {
            echo json_encode(common::load_model('shop_model', 'get_count_cars_related',$_POST['type_car']));
        }
        function cars_related() {
            echo json_encode(common::load_model('shop_model', 'get_cars_related',[$_POST['type'], $_POST['loaded'], $_POST['items']]));
        }
        function count() {
            echo json_encode(common::load_model('shop_model', 'get_count'));
        }
        function count_filters() {
            echo json_encode(common::load_model('shop_model', 'get_count_filters',$_POST['filter']));
        }
        function count_home() {
            
            echo json_encode(common::load_model('shop_model', 'get_count_home',$_POST['homee']));
        }
        function count_search() {
            echo json_encode(common::load_model('shop_model', 'get_count_search',$_POST['filters_search']));
        }
        function control_likes() {
            echo json_encode(common::load_model('shop_model', 'get_control_likes',[$_POST['token'],$_POST['id_car']]));
        }
        function load_likes_user() {
           
            echo json_encode(common::load_model('shop_model', 'get_load_likes_user',$_POST['token']));
        }
        
       

    }
?>
