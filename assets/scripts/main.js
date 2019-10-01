document.addEventListener( 'DOMContentLoaded', function() {

	/**
	 * Catalog Toggle 
	 * header.html
	 */
	$('#openCatalog').click( function(e) {
		e.preventDefault()

		$('div[data-catalog]').toggle()
	})

	/**
	 * Swiper Mainframe
	 * index.html карточка_кухни.html
	 */
	if ( $('.mainframe_slider').length ) {
		$('.mainframe_slider').each( function() {
			let elem = $(this).children('.swiper-container')

			let mainframeSwiper = new Swiper ( elem, {
				slidesPerView: 1,
				spaceBetween: 9,
				loop: true,
				watchOverflow: true,
				autoplay: {
					delay: 8000
				},
				on: {
					init() {
						if ( $(elem).parent('.mainframe_slider').has('.swiper-counter') ) {
							$(elem).siblings('.swiper-counter').children('.counter-max').text(`/${ this.slides.length - 2 }`)
							$(elem)
								.siblings('.swiper-counter')
								.children('.counter-curent')
								.text(`${ this.realIndex + 1 }`)
						}
					},
					slideChangeTransitionEnd() {
						if ( $(elem).parent('.mainframe_slider').has('.swiper-counter') ) {
							$(elem)
								.siblings('.swiper-counter')
								.children('.counter-curent')
								.text(`${ this.realIndex + 1 }`)
						}
					}
				}
			})
			elem.hover( function() {
				mainframeSwiper.autoplay.stop()
			}, function() {
				mainframeSwiper.autoplay.start()
			})
		})
	}
		

	/**
	 * Swiper Manufacturer
	 */
	if ( $('.manufacturer_slider').length ) {
		$('.manufacturer_slider').each( function() {
			let elem = $(this).children('.swiper-container')

			let swiper = new Swiper ( elem, {
				slidesPerView: 5,
				loop: true,
				spaceBetween: 44,
				autoHeight: true,
				navigation: {
					nextEl: $(this).children('.manufacturer_nav--next'),
					prevEl: $(this).children('.manufacturer_nav--prev')
				}
			})
		})
	}

	/**
	 * Swiper GoodSlider
	 * index.html карточка_кухни.html
	 */
	$('.good_slider').each( function() {
		let elem = $(this).children('.swiper-container'),
			self = $(this)

		let swiper = new Swiper ( elem, {
			slidesPerView: ( $(this).attr('data-slides') != undefined ) ? Number( $(this).attr('data-slides') ) : 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: self.children('.good_slider_nav--next'),
				prevEl: self.children('.good_slider_nav--prev')
			},
			breakpoints: {
				992: {
					slidesPerView: 2,
					spaceBetween: 10,
					loop: false,
					navigation: false,
					scrollbar: {
						el: self.find('.swiper-scrollbar')
					}
				},
				768: {
					slidesPerView: 1,
					spaceBetween: 0,
					scrollbar: {
						el: self.find('.swiper-scrollbar')
					}
				}
			}
		})
	})
		

	/**
	 * RadioBox KType
	 * index.html
	 */
	// Init
	if ( $('.buildform_filter_type_item').length ) {
		$('.buildform_filter_type_item')
			.children('input[type="radio"]')
			.each( function() {
				if ( $(this).is(':checked') )
					$(this)
						.parent('.buildform_filter_type_item')
						.addClass('active')
			})
	}

	// Init StepFor Parts
	if ( $('[data-change-part]').length ) {
		$('[data-change-part]').map( function() {
			if ( $(this).is(':checked') ) {
				let partName = $(this).attr('data-change-part')
				$(document).find('[data-part="' + partName + '"]').css('display', 'flex')
			}
		})
	}

	// Event
	$('.buildform_filter_type_item').click( function() {
		if ( $(this).children('input').is(':not(:checked)') ) {
			$(this)
				.closest('.buildform_filter_type_items')
				.children('.buildform_filter_type_item')
				.removeClass('active')
				.add()
				.find('input[type="radio"]')
				.prop('checked', false)

			$(this)
				.addClass('active')
				.add()
				.children('input')
				.prop('checked', true)
		}
		if ( $(this).children('input[data-change-part]') ) {
			let partName = $(this).children('input[data-change-part]').attr('data-change-part')

			$(document).find('[data-part]').hide().map( function() {
				if ( $(this).attr('data-part') == partName )
					$(this).css('display', 'flex')
			})
		}
	})

	/**
	 * NiceScroll ScrollBox
	 * index.html карточка_кухни.html
	 */
	if ( $('.scroll_box').length ) {
		$('.scroll_box').each( function() {
			let niceScroll = $(this).niceScroll({
				cursorcolor: '#006300',
				cursorwidth: '12px',
				cursorborder: 'none',
				cursorborderradius: '6px',
				autohidemode: false,
				background: 'transparent'
			})

			$(this).siblings('.scroll_nav--top').click( function() {
				niceScroll.doScrollBy(80)
			})
			$(this).siblings('.scroll_nav--bottom').click( function() {
				niceScroll.doScrollBy(-80)
			})
		})
	}

	/**
	 * Tab
	 * index.html
	 */
	// Init
	if ( $('.tab_box').length ) {
		$('.tab_box').each( function() {
			let first = $(this).children('.tab_links').children('a[data-tab-link]').first().attr('data-tab-link')
			
			$(this)
				.children('.tab_links')
				.children('a[data-tab-link]')
				.first()
				.addClass('active')
			$(this)
				.children('.tab_items')
				.children(`.tab_item[data-tab="${ first }"]`)
				.addClass('active')
		})
	}
	// Click Event
	$('.tab_links > a[data-tab-link]').click( function(e) {
		e.preventDefault()

		let linkName = $(this).attr('data-tab-link')

		$(this)
			.parent('.tab_links')
			.children('a[data-tab-link]')
			.removeClass('active')
		$(this)
			.addClass('active')
			.add()
			.closest('.tab_box')
			.find(`.tab_item[data-tab]`)
			.removeClass('active')
			.map( function() {
				if ( $(this).attr('data-tab') == linkName )
					$(this).addClass('active')
			})
	})

	/**
	 * Swiper Projects
	 * index.html
	 */
	if ( $('.project_slider').length ) {
		$('.project_slider').each( function() {
			let elem = $(this).children('.swiper-container')

			let projSwiper = new Swiper ( elem, {
				slidesPerView: 3,
				autoHeight: true,
				centeredSlides: true,
				loop: true,
				navigation: {
					nextEl: $(this).find('.project_nav--next'),
					prevEl: $(this).find('.project_nav--prev')
				},
				breakpoints: {
					992: {
						slidesPerView: 1
					}
				}
			})
		})
	}

	/**
	 * ReviewSlider Swiper
	 * index.html
	 */
	if ( $('.reviewslider_box').length ) {
		$('.reviewslider_box').each( function() {
			let elem = $(this).children('.swiper-container'),
				self = $(this)

			let reviewSwiper = new Swiper ( elem, {
				slidesPerView: 4,
				loop: true,
				spaceBetween: 33,
				navigation: {
					nextEl: $(this).find('.reviewslider_nav--next'),
					prevEl: $(this).find('.reviewslider_nav--prev')
				},
				breakpoints: {
					992: {
						slidesPerView: 3,
						scrollbar: {
							el: $(this).find('.swiper-scrollbar')
						}
					},
					768: { slidesPerView: 2 },
					540: { slidesPerView: 1 }
				}
			})
		})
	}

	/**
	 * Minislider Swiper
	 */
	if ( $('.minislider').length ) {
		$('.minislider_box').each( function() {
			let elem = $(this).children('.swiper-container')

			let miniSlider = new Swiper ( elem, {
				slidesPerView: 1,
				loop: true,
				navigation: {
					nextEl: $(this).find('.minislider_nav--next'),
					prevEl: $(this).find('.minislider_nav--prev')
				}
			})
		})
	}
		

	/**
	 * Cardy Swiper
	 * карточка_кухни.html карточка_стол.html
	 */
	if ( $('.cardy_photo:not(.cardy_photo--thumbs)').length ) {
		$('.cardy_photo:not(.cardy_photo--thumbs)').each( function() {
			let elem = $(this).children('.swiper-container'),
				self = $(this)

			let cardySwiper = new Swiper (elem, {
				slidesPerView: 1,
				autoHeight: true,
				loop: true,
				pagination: {
					el: elem.children('.swiper-pagination'),
					clickable: true
				}
			})
		})
	}

	if ( $('.cardy_photo--thumbs').length ) {
		$('.cardy_photo--thumbs').each( function() {
			let elem = $(this).children('.swiper-container'),
				self = $(this)

			let cardySwiper = new Swiper (elem, {
				slidesPerView: 1,
				autoHeight: true,
				on: {
					init() { elem.updateSize() }
				},
				thumbs: {
					swiper: {
						el: self.find('.cardy_thumbs').children('.swiper-container'),
						slidesPerView: 4,
						direction: 'vertical',
						spaceBetween: 6,
						mousewheel: true,
						scrollbar: {
							el: self.find('.cardy_thumbs')
								.find('.swiper-scrollbar')
						},
						breakpoints: {
							768: {
								freeMode: true,
								freeModeMomentumBounce: false,
								freeModeMomentum: false,
								direction: 'horizontal',
								spaceBetween: 24
							},
							540: { slidesPerView: 3 }
						}
					}
				}
			})
		})
	}

	/**
	 * Filter DropDown Select
	 */
	$('.filter_dropdown_link').click( function(e) {
		e.preventDefault()
		e.stopPropagation()

		$(this).closest('.filter_dropdown')
			.find('input[data-filter]')
			.val( $(this).attr('data-filter-val') )
	})

	/**
	 * Range Slider
	 */
	if ( $('.filter_range_input').length ) {
		$('.filter_range_input').each( function() {
			let self = this

			noUiSlider.create( self, {
				start: [20000, 150000],
				connect: true,
				range: {
					min: 20000,
					max: 150000
				},
				step: 1000,
				behaviour: 'tap-drag'
			})
			self.noUiSlider.on('slide', function() {
				let val = self.noUiSlider.get()

				$(self).siblings('.filter_range_vals').find('.filter_range_vals_min').text( val[0] )
				$(self).siblings('.filter_range_vals').find('.filter_range_vals_max').text( val[1] )
			})
		})
	}

	/**
	 * StepForm Component 
	 */
	$('.stepform_component').each( function() {
		let bullets 	= $(this).find('.stepform_bullets_item'),
			steps		= $(this).find('.stepform_box'),
			currentStep = 0,
			maxSteps	= $(this).find('.stepform_bullets_item').length,
			self		= $(this)

		steps.eq(currentStep).css('display', 'flex')
		bullets.eq(currentStep).addClass('active')

		$(this).find('.js-stepform-next').click( function(e) {
			e.preventDefault()
			if (currentStep != maxSteps) {
				currentStep++
				changeStep(steps, bullets, currentStep - 1)
			}
		})

		$(this).find('.stepform_bullets_item').click( function(e) {
			e.preventDefault()
			currentStep = Number( $(this).attr('data-step-bullet') )
			changeStep(steps, bullets, currentStep - 1)
		})
	})
	function changeStep(steps, bullets, currentStep) {
		steps.hide()
		steps.eq(currentStep).css('display', 'flex')
		bullets.removeClass('active')
		bullets.eq(currentStep).addClass('active')
	}

	/**
	 * Mobile Menu Opener
	 */
	$('#menuOpen').click( function() {
		$('body').css('overflow', 'hidden')
		$('.header_nav').css({
			'left': '0'
		})
	})
	$('#closeMenu').click( function() {
		$('body').css('overflow', 'auto')
		$('.header_nav').css({
			'left': '-100%'
		})
	})

	/**
	 * Mobile Swiper FeaturesMini
	 */
	$('.featuresmini').each( function() {
		if ( $(window).width() <= 992 ) {
			let clone = $(this).children('.row').addClass('swiper-wrapper').clone()
				clone.children('div[class^="col"]').removeAttr('class').addClass('swiper-slide')

			$(this).children('.row').remove()
			$('<div class="row"><div class="col-xs-12"><div class="swiper-container"><div class="swiper-scrollbar">').appendTo( $(this) )
			clone.prependTo( $(this).find('.swiper-container') )
			$(this).find('.row.swiper-wrapper').removeClass('row')

			let elem = $(this).find('.swiper-container')

			let swiper = new Swiper (elem, {
				slidesPerView: 4,
				autoHeight: true,
				scrollbar: {
					el: elem.children('.swiper-scrollbar')
				},
				breakpoints: {
					768: { slidesPerView: 3 },
					540: { slidesPerView: 1 }
				}
			})
		}
	})

	/**
	 * Mobile Swiper Countertops
	 */
	$('.countertop_items').each( function() {
		if ( $(window).width() <= 768 ) {
			let clone = $(this).clone()
				clone.removeClass('countertop_items').addClass('swiper-wrapper').children('.countertop_box').addClass('swiper-slide')

			$('<div class="swiper-container"><div class="swiper-scrollbar">').insertBefore( $(this) )
			clone.appendTo( $(this).siblings('.swiper-container') )

			let elem = $(this).siblings('.swiper-container')

			let swiper = new Swiper (elem, {
				slidesPerView: 1,
				scrollbar: {
					el: $(this).siblings('.swiper-container').children('.swiper-scrollbar')
				}
			})
			$(this).remove()
		}
	})

	/**
	 * Mobile Swiper Manufacturer
	 */
	$('.manufacturer_detector').each( function() {
		if ( $(window).width() <= 992 ) {
			let clone = $(this).children('.manufacturer_box').clone()
				clone.removeClass('manufacturer_box').addClass('swiper-wrapper').children('.manufacturer_item').addClass('swiper-slide')

			$(this).children('.manufacturer_box').remove()
			$('<div class="swiper-container"><div class="swiper-scrollbar">').appendTo( $(this) )
			clone.appendTo( $(this).find('.swiper-container') )

			let elem = $(this).find('.swiper-container')

			let swiper = new Swiper (elem, {
				slidesPerView: 4,
				spaceBetween: 34,
				scrollbar: {
					el: $(this).find('.swiper-scrollbar')
				},
				breakpoints: {
					768: { slidesPerView: 3 },
					540: { slidesPerView: 2 }
				}
			})
		}
	})
	
})