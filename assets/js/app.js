(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	const handleStickyHeader = () => {
		const header = $('#header');
		const headerPosition = header.offset().top;
		$(window).scroll(function () {
			const scrollValue = $(window).scrollTop();
			if (scrollValue > headerPosition) {
				header.addClass('is-sticky');
			} else {
				header.removeClass('is-sticky');
			}
		});
	}

	const handleNavigationMobile = () => {
		if (windowWidth < 992) {
			if ($("#header .header-navigation > ul > li > ul").length) {
				$("#header .header-navigation").attr('id', 'hasMenu');
				$("#header .header-navigation > ul > li > ul").each(function (index) {
					$(this).prev().attr({
						"href": "#subMenu" + index, "data-bs-toggle": "collapse"
					});
					$(this).attr({
						"id": "subMenu" + index, "class": "collapse list-unstyled mb-0 header-navigation_sub--list", "data-bs-parent": "#hasMenu"
					});
				})
			}

			$('#call-navigation').click(function () {
				if (!$('body').hasClass('is-navigation')) {
					$('body').addClass('is-navigation');
				} else {
					$("#header .header-navigation > ul > li > .navigation-sub").collapse('hide');
					$('body').removeClass('is-navigation');
				}
			});

			$('#close-navigation, #header-overlay').click(function () {
				$('body').removeClass('is-navigation');
			});
		}
	}

	$(function () {
		handleStickyHeader();
		handleNavigationMobile();
		$(window).resize(() => {
			windowWidth = $(window).width();
			handleStickyHeader();
			handleNavigationMobile();
		});
	});
})(jQuery);
