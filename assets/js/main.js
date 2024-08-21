/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		//			<!-- Skript pro načítání dat z textoveho souboru -->
		document.addEventListener("DOMContentLoaded", function() {
			console.log("DOM fully loaded and parsed");
	
			const loadAndUpdateElement = (file, elementId) => {
					return fetch(file)
							.then(response => response.text())
							.then(text => {
									const editableElement = document.getElementById(elementId);
									if (editableElement) {
											editableElement.textContent = text;
											console.log(`Updated ${elementId} with text:`, text);
									} else {
											console.error(`Element with ID ${elementId} not found`);
									}
							})
							.catch(error => console.error(`Error loading ${file}:`, error));
			};
	
			Promise.all([
					loadAndUpdateElement('Editace_textu/logo.txt', 'logo'),
					loadAndUpdateElement('Editace_textu/logo-text.txt', 'logo-text'),
					loadAndUpdateElement('Editace_textu/menu-projekt1.txt', 'menu-projekt1')
					,loadAndUpdateElement('Editace_textu/menu-projekt2.txt', 'menu-projekt2')
					,loadAndUpdateElement('Editace_textu/menu-projekt3.txt', 'menu-projekt3')
					,loadAndUpdateElement('Editace_textu/menu-projekt4.txt', 'menu-projekt4')
					,loadAndUpdateElement('Editace_textu/nadpis.txt', 'nadpis')
					,loadAndUpdateElement('Editace_textu/text-nadpisu.txt', 'text-nadpisu')
					,loadAndUpdateElement('Editace_textu/Onas.txt', 'Onas')
					,loadAndUpdateElement('Editace_textu/Onas-slogan.txt', 'Onas-slogan')
					,loadAndUpdateElement('Editace_textu/Onas-clanek.txt', 'Onas-clanek')
					,loadAndUpdateElement('Editace_textu/Nadpis-odstavce1.txt', 'Nadpis-odstavce1')
					,loadAndUpdateElement('Editace_textu/text-odstavce1.txt', 'text-odstavce1')
			]).then(() => {
					console.log("All texts loaded, initializing plugins...");
	
	 // Dropdowns.
	 $('#nav > ul').dropotron({
				mode: 'fade',
				speed: 350,
				noOpenerFade: true,
				alignment: 'center'
			});
	
		// Scrolly.
			$('.scrolly').scrolly();
	
		// Nav.
	
			// Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);
	
			// Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						target: $body,
						visibleClass: 'navPanel-visible'
					});
					});
			});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

})(jQuery);