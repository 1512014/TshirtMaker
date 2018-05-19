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
});
