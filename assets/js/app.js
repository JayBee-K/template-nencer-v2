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
						"href": "#subMenu_" + index, "data-bs-toggle": "collapse"
					});
					$(this).attr({
						"id": "subMenu_" + index,
						"data-bs-parent": "#hasMenu"
					}).addClass('collapse list-unstyled mb-0');
				});
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
		} else {
			if ($("#header .header-navigation > ul > li > ul").length) {
				$("#header .header-navigation > ul > li > ul").each(function (index) {
					$(this).prev().attr({
						"href": "javascript:void(0);"
					});
				});
			}
		}
	}

	const handleSliderHero = function () {
		if ($('#slider-hero').length) {
			new Swiper('#slider-hero .swiper', {
				speed: 1500,
				slidesPerView: 1,
				preloadImages: false,
				effect: 'slide',
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: "#slider-hero .slider-button_next",
					prevEl: "#slider-hero .slider-button_prev",
				},
				pagination: {
					el: "#slider-hero .slider-pagination",
					clickable: true,
					renderBullet: function (index, className) {
						return `<span class="${className}">0${index + 1}</span>`;
					},
				}
			});
		}
	}

	const handleSliderPartner = function () {
		if ($('#slider-partner').length) {
			new Swiper('#slider-partner .swiper', {
				speed: 400,
				slidesPerView: 6,
				spaceBetween: 20,
				preloadImages: false,
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
					},
					600: {
						slidesPerView: 3,
					},
					991: {
						slidesPerView: 4,
					},
					1024: {
						slidesPerView: 5,
					},
				},
			});
		}
	}

	let [avatarThumb, avatarPhoto] = [];
	let handleSlideProduct = function () {
		if ($('#detail-thumb_photo').length > 0) {
			avatarThumb = new Swiper('#detail-thumb_photo .swiper', {
				loopAdditionalSlides: 0,
				spaceBetween: 10,
				slidesPerView: 4,
				breakpoints: {
					320: {
						slidesPerView: 3.5,
					},
					991: {
						slidesPerView: 4.5,
					},
				},
			});

			avatarPhoto = new Swiper('#detail-avatar_photo .swiper', {
				thumbs: {
					swiper: avatarThumb,
				},
				slidesPerView: 1,
			});

			avatarPhoto.on('slideChangeTransitionStart', function () {
				avatarThumb.slideTo(avatarPhoto.activeIndex);
			});
		} else {
			avatarPhoto = new Swiper('#detail-avatar_photo .swiper', {
				slidesPerView: 1,
			});
		}
		handleZoomImageProduct($('#detail-avatar_photo [data-fancybox=module-detail_avatar]'), avatarPhoto, avatarThumb);
	}

	const handleZoomImageProduct = function (elm, avatarPhoto, avatarThumb) {
		let i = 0;
		elm.click(function () {
			i = 0;
		});

		elm.fancybox({
			touch: true,
			beforeShow: function (instance, current) {
				let index = $(`[data-fancybox='module-detail_avatar'][href='${current.src}']`).attr('data-index');
				avatarPhoto.slideTo(index - 1);
				if ($('#detail-thumb_photo').length > 0) {
					avatarThumb.slideTo(index - 1);
				}
			},
		});
	}


	$(function () {
		handleStickyHeader();
		handleNavigationMobile();
		handleSliderHero();
		handleSliderPartner();
		handleSlideProduct();
		$(window).resize(() => {
			windowWidth = $(window).width();
			handleStickyHeader();
			handleNavigationMobile();
		});
	});
})(jQuery);
