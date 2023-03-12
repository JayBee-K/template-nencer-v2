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
						"id": "subMenu_" + index, "data-bs-parent": "#hasMenu"
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
				speed: 1500, slidesPerView: 1, preloadImages: false, effect: 'slide', loop: true, autoplay: {
					delay: 8000, disableOnInteraction: false,
				}, navigation: {
					nextEl: "#slider-hero .slider-button_next", prevEl: "#slider-hero .slider-button_prev",
				}, pagination: {
					el: "#slider-hero .slider-pagination", clickable: true, renderBullet: function (index, className) {
						return `<span class="${className}">0${index + 1}</span>`;
					},
				}
			});
		}
	}

	const handleSliderPartner = function () {
		if ($('#slider-partner').length) {
			new Swiper('#slider-partner .swiper', {
				speed: 400, slidesPerView: 6, spaceBetween: 20, preloadImages: false, loop: true, autoplay: {
					delay: 8000, disableOnInteraction: false,
				}, breakpoints: {
					320: {
						slidesPerView: 2,
					}, 600: {
						slidesPerView: 3,
					}, 991: {
						slidesPerView: 4,
					}, 1024: {
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
				loopAdditionalSlides: 0, spaceBetween: 10, slidesPerView: 4, breakpoints: {
					320: {
						slidesPerView: 3.5,
					}, 991: {
						slidesPerView: 4.5,
					},
				},
			});

			avatarPhoto = new Swiper('#detail-avatar_photo .swiper', {
				thumbs: {
					swiper: avatarThumb,
				}, slidesPerView: 1,
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
			touch: true, beforeShow: function (instance, current) {
				let index = $(`[data-fancybox='module-detail_avatar'][href='${current.src}']`).attr('data-index');
				avatarPhoto.slideTo(index - 1);
				if ($('#detail-thumb_photo').length > 0) {
					avatarThumb.slideTo(index - 1);
				}
			},
		});
	}

	const handleValidationForm = function () {
		if ($(".form-validation").length) {
			$(".form-validation").submit(function (event) {
				let form = $(this);
				if (!form[0].checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
					form.addClass('was-validated');
				}
			});
		}
	}
	const handleViewPass = function () {
		$(document).on('click', '.view-pass', function () {
			let elm = $(this), elm_target = elm.attr('data-target');
			if (elm.hasClass('is-show')) {
				elm.html('<i class="fas fa-eye">');
				elm.removeClass('is-show');
				$('.' + elm_target).attr('type', 'password');
			} else {
				elm.html('<i class="fas fa-eye-slash">');
				elm.addClass('is-show');
				$('.' + elm_target).attr('type', 'text');
			}
		});
	}
	let initClipboardCopy = function (value) {
		let createTextarea = document.createElement('textarea');
		createTextarea.style.cssText = 'position: absolute; left: -99999px';
		createTextarea.setAttribute("id", "textareaCopy");
		document.body.appendChild(createTextarea);
		let textareaElm = document.getElementById('textareaCopy');
		textareaElm.value = value;
		textareaElm.select();
		textareaElm.setSelectionRange(0, 99999);
		document.execCommand("copy");
		textareaElm.remove();
	}

	const handleCopyValue = function () {
		$(document).on('click', '.copy-value', function () {
			if ($(this).attr('data-value') != undefined) {
				initClipboardCopy($(this).attr('data-value'));
			} else {
				initClipboardCopy($(this).parent().find('input').val());
			}
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
		handleValidationForm();
		handleViewPass();
		handleCopyValue();
	});
})(jQuery);
