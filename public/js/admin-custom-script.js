$(document).ready(function(){
	$('#maxSize').on('change', function(){
		var minSize = $('#minSize').val();
		var maxSize = $(this).val();
		if (minSize > maxSize){
			$(this).val(minSize);
		}

	});

	$('button.active-user').on('click', function(){
		var userId = $(this).data('user-id');
		var buttonActive = $(this);
		url = '/admin/users/' + userId;
        $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'PUT',
            data: JSON.stringify({
                isActive: true,
             }),
            success: function(response){
                $('#deactive-user-' + userId).css('display', 'block');
				$('#active-user-' + userId).css('display', 'none');
				$('#active-status-' + userId).html("Active");
            },
            error: function(error) {
                alert(error);
            }
        });
	});

	$('button.deactive-user').on('click', function(){
		var userId = $(this).data('user-id');
		var buttonActive = $(this);
		url = '/admin/users/' + userId;
        $.ajax({
            url: url,
            contentType: 'application/json',
            type: 'PUT',
            data: JSON.stringify({
                isActive: false,
             }),
            success: function(response){
                $('#deactive-user-' + userId).css('display', 'none');
				$('#active-user-' + userId).css('display', 'block');
				$('#active-status-' + userId).html("Not Active");
            },
            error: function(error) {
                alert(error);
            }
        });
	});
});
