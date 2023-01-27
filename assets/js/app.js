(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	$(function () {
		$(window).resize(() => windowWidth = $(window).width());
	});
})(jQuery);
