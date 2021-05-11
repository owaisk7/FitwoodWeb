(function($, undefined){
	$(document).ready(function(){
		$('body').on('change', '.bmi-form input[name=unit]', function(){
			var el = $(this),
				form = el.closest('.bmi-form')
				val = form.find('input[name=unit]:checked').val();
			
			form.find('.bmi-section-metric,.bmi-section-imperial').hide();
			form.find('.bmi-section-metric,.bmi-section-imperial').find('input').attr('required', false);
			form.find('.bmi-section-'+val).show();
			form.find('.bmi-section-'+val).attr('required', true);
		});
		
		$('body').on('submit', '.bmi-form', function(e){
			e.preventDefault();
			
			var form = $(this)
				unit = 'metric'
				bmi = null,
				height = null,
				stat =null,
				weight = null,
				fields = form.serializeArray(),
				data = {},
				result = form.find('.bmi-result');
			
			fields.forEach(function(field){
				data[field.name] = field.value;
			});
			
			if (unit === 'metric') {
				height = parseFloat(data.heightCm) / 100;
				weight = parseFloat(data.weightKg);
			}
			else {
				height = parseFloat(data.heightIn) * 2.54 / 100;
				weight = parseFloat(data.weightLb) / 2.20462;
			}
			
			bmi = weight / height / height;
			stat="Stat"
			if (bmi < 18.5) { Stat="Status : Under Weight"; }
			if (bmi >18.5&&bmi<25) { Stat="Status : Normal"; }
			if (bmi >25.1&&bmi<30) { Stat="Status : Overweight"; }
			if (bmi >30) { Stat="Status : Obese"; }
			if (result.css('display') === 'none') {
				result.find('.bmi-number').text(bmi.toFixed(1));
				result.find('.bmi-stat').text(Stat);
				
				
				
				
				
				result.slideDown();
			}
			else {
				result.find('.bmi-result-text').fadeOut(200, function(){
					result.find('.bmi-number').text(bmi.toFixed(1));
					$(this).fadeIn(200);
					result.find('.bmi-stat').text(Stat);
					$(".bmi-stat").fadeIn(200);
					
					
				});
			}
		});
	});
})(jQuery);
