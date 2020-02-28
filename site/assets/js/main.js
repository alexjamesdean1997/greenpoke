$(function() {
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({ scrollTop: $($.attr(this, 'href')).offset().top-50}, 800);
		$('#main-menu').removeClass('main-menu-selected');
	});
})