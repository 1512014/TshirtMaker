$(document).ready(function(){
	$('#maxSize').on('change', function(){
		var minSize = $('#minSize').val();
		var maxSize = $(this).val();
		if (minSize > maxSize){
			$(this).val(minSize);
		}

	});
});
