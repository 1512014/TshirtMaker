$(document).ready(function () {

    //Declare variables
    var totalWidth = 0;
    var positions = [];

    $('#slides').find('.slide').each(function (i) {
        //Get slider widths
        positions[i] = totalWidth;
        totalWidth += $(this).width();

        //Check widths
        if(!$(this).width()){
            alert('Please add a width to your images');
            return false;
        }
    });

    //Set width
    $('#slides').width(totalWidth);

    //Menu item click handler
    $('#menu').find('ul li a').click(function (e, keepScroll) {
        //Remove active class and add inactive class
        $('li.product').removeClass('active').addClass('inactive');
        //Add active class to parent
        $(this).parent().addClass('active');

        var pos = $(this).parent().prevAll('.product').length;

        $("#slides").stop().animate({marginLeft: -positions[pos] + 'px'}, 450);

        //Prevent Default
        e.preventDefault();

        //Stop auto scroll
        if(!autoScroll) clearInterval(itvl);
    });

    //Make first image active
    $('#menu').find('ul li.product:first').addClass('active').siblings().addClass('inactive');

    //Auto scroll
    var current=1;
    function autoScroll(){
        if(current == -1) return false;

        $('#menu').find('ul li a').eq(current%$('#menu').find('ul li a').length).trigger('click', [true]);
        current++;
    }

    //Duration for auto scroll
    var duration = 2;
    var itvl = setInterval(function () {
        autoScroll()
    }, duration*1000);


    $("#submit-address-delivery").on('click', function(){
        location.href = "checkout-step3.html";
    });

    $('.image-preview img').on('click', function() {
        currentPath = $(this).attr('src');
        $('.large-image img').attr('src', currentPath);
    })

    $('button.delete-order').on('click', function(){
        var orderId = $(this).data('id');
        url = '/orders/' + orderId;
        var result = confirm("Are your sure want to delete?");
        if (result) {
            $.ajax({
                url: url,
                contentType: 'application/json',
                type: 'DELETE',
                success: function(response){
                    location.reload();
                },
                error: function(error) {
                    alert(error);
                }
           });
        }

    });

    $('.bootstrap-touchspin-up').on('click', function(){
        $('.bootstrap-touchspin-up').attr('disabled','disabled');
        $('.bootstrap-touchspin-down').attr('disabled','disabled');
        productPrice = parseFloat($(this).parents().find('input.product-price').val());
        productTotalPrice = parseFloat($(this).parents().find('input.product-total-price').val());
        productTotalPrice += productPrice;
        console.log(productTotalPrice);
        orderId = $(this).data('id');
        qty = $('.js-quantity-product-' + orderId).val();
        qty++;
        $('.js-quantity-product-' + orderId).val(qty);

        url = '/orders/' + orderId;
        $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                product_qty: qty,

             }),
            success: function(response){
                $('.bootstrap-touchspin-up').removeAttr('disabled');
                $('.bootstrap-touchspin-down').removeAttr('disabled');
                location.reload();
            },
            error: function(error) {
                alert(error);
            }
        });

    });

    minQty = 1;

    $('.bootstrap-touchspin-down').on('click', function(){
        $('.bootstrap-touchspin-up').attr('disabled','disabled');
        $('.bootstrap-touchspin-down').attr('disabled','disabled');
        orderId = $(this).data('id');
        qty = $('.js-quantity-product-' + orderId).val();
        if (qty > minQty){
            qty--;
        }
        $('.js-quantity-product-' + orderId).val(qty);

        url = '/orders/' + orderId;
        $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                product_qty: qty
             }),
            success: function(response){
                $('.bootstrap-touchspin-up').removeAttr('disabled');
                $('.bootstrap-touchspin-down').removeAttr('disabled');
                location.reload();
            },
            error: function(error) {
                alert(error);
            }
        });

    });

    $('.edit-extras').on('click', function(e){
        orderId = $(this).data('id');
        $('.extras-' + orderId).hide();
        $('.choose-extras-' + orderId).css('display','');
    });

    $('.cancel-extras').on('click',function(){
        orderId = $(this).data('id');
        $('.choose-extras-' + orderId).hide();
        $('.extras-' + orderId).show();
    })

    $('.submit-extras').on('click', function(){
        orderId = $(this).data('id');
        url = '/orders/' + orderId;
        extrasId = [];

        $('.choose-extras-' + orderId).find('input[name="extras"]:checked').each(function() {
            extrasId.push(parseInt(this.value));
        });
        extras_id = JSON.stringify(extrasId);
        $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                extras_id: extras_id
             }),
            success: function(response){
                location.reload();
            },
            error: function(error) {
                alert(error);
            }
        });
    });
});
