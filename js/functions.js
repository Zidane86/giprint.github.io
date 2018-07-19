/* begin Document Ready
 ***************************************************************************** */
$(function() {
  'use strict';

  /* -------------------------------------------------------------------------
     begin Magnific Popup
   * ------------------------------------------------------------------------- */

  var magnific = {
    magnificConfig: function(galleryCondition, titleId) {
      var title = titleId;

      var gallery = (function() {
        if (galleryCondition === 'gallery') return true;
        if (galleryCondition === 'single') return false;
      })();

      var config = {
        type: 'image',
        autoFocusLast: false,
        removalDelay: 500,
        tClose: 'Закрыть (Esc)',
        tLoading: 'Загрузка',
        gallery: {
          enabled: gallery,
          arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
          tPrev: 'Предыдущий слайд',
          tNext: 'Следующий слайд',
          tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
        },
        image: {
          titleSrc: function(item) {
            if (!title) return;

            if (title === 'text') {
              return item.el.attr('data-magnific-title');
            }

            if (title === 'seeMoreLink') {
              return '<a href="' + item.el.attr('data-modal-text') + '" class="magnific-popup__order-btn btn-dark-blue">Подробнее</a>';
            }

            if (title === 'postpressProcessingModal') {
              return '<button type="button" data-toggle="modal" data-target="#postpress-processing-modal" class="magnific-popup__order-btn btn-dark-blue">Заказать</button>';
            }

            if (title === 'writeToMailModal') {
              return '<button type="button" data-modal-text="' + item.el.attr('data-modal-text') + '" data-modal-text-id="similar-products" data-toggle="modal" data-target="#write-to-mail-modal" class="magnific-popup__order-btn btn-dark-blue">Заказать</button>';
            }

            if (title === 'orderDesignModal') {
              return '<button type="button" data-toggle="modal" data-target="#order-design-modal" class="magnific-popup__order-btn btn-dark-blue">Заказать</button>';
            }

            if (title === 'orderCupConfirmModal') {
              return '<button type="button" data-toggle="modal" data-target="#order-cup-confirm-modal" class="magnific-popup__order-btn btn-dark-blue">Заказать</button>';
            }
          },
          tError: '<a href="%url%">Изображение</a> не удалось загрузить'
        },
        callbacks: {
          beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
          },
          buildControls: function() {
            if (gallery) {
              this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
            }
          }
        }
      }
      return config;
    }
  };

  if (document.querySelector('.magnific')) {

    $('.contacts-section__gallery [data-effect]').magnificPopup(magnific.magnificConfig('gallery'));

    $('.production-photo__gallery [data-effect]').magnificPopup(magnific.magnificConfig('gallery', 'text'));
    $('.production-photo__gallery2 [data-effect]').magnificPopup(magnific.magnificConfig('single', 'text'));

    $('.individual-design__carousel [data-effect]').magnificPopup(magnific.magnificConfig('gallery', 'orderDesignModal'));

    $('#mix-container.mix-container_stock [data-mixitup-magnific]').magnificPopup(magnific.magnificConfig('gallery', 'seeMoreLink'));

    $('#mix-container.mix-container_inspiration [data-mixitup-magnific]').magnificPopup(magnific.magnificConfig('gallery', 'writeToMailModal'));

    $('#mix-container.mix-container_paper-cups [data-effect]').magnificPopup(magnific.magnificConfig('single', 'orderCupConfirmModal'));

    (function() {
      var postpressProcessingItems = ['.postpress-processing__items_folding', '.postpress-processing__items_rounding-corners', '.postpress-processing__items_perforation', '.postpress-processing__items_lamination'];

      for (var j = 0; j < postpressProcessingItems.length; j++) {
        $(postpressProcessingItems[j]).find('[data-effect]').magnificPopup(magnific.magnificConfig('gallery', 'postpressProcessingModal'));
      }
    })();
  }

  /* -------------------------------------------------------------------------
     end Magnific Popup
   * ------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------
      begin Modals
    * ------------------------------------------------------------------------- */

  function magnificClose() {
    $.magnificPopup.close();
    $(document).off('focusin');
  }

  $('#map-modal, #write-to-mail-modal, #order-cup-confirm-modal, #order-confirm-modal, #order-design-modal, #postpress-processing-modal').on('show.bs.modal', function(event) {
    var clickEventButton = event.relatedTarget;

    if (clickEventButton && clickEventButton.classList.contains('magnific-popup__order-btn')) {
      magnificClose();
    }

    if (clickEventButton && clickEventButton.getAttribute('data-modal-text')) {
      var inputValue;
      var dataId = event.relatedTarget.getAttribute('data-modal-text-id');
      var dataValue = event.relatedTarget.getAttribute('data-modal-text');

      switch (dataId) {
        case 'similar-products':
          inputValue = '«' + dataValue + '»' + '\n' + 'Хочу заказать эту продукцию с подобным стилем оформления.';
          break;
        default:
          inputValue = '«' + dataValue + '»';
          break;
      }

      $('.write-to-mail-modal').find('.textarea').val(inputValue);
    }

    if (clickEventButton && clickEventButton.classList.contains('product-slider__order-btn')) {
      productSlider.exitFullscreen();
    }

    if (clickEventButton && clickEventButton.getAttribute('data-target') === '#map-modal') {
      $('.yandex-map-modal').html('');
      ymaps.ready(yandexMapInit.bind(null, 'yandex-map-modal', 'modal'));
    }

  });


  /* -------------------------------------------------------------------------
      end Modals
    * ------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------
      begin Show More Buttons
    * ------------------------------------------------------------------------- */

  var showMore = {
    showMoreProducts: function(eventTarget) {
      $(eventTarget).parent().find('.row.hide').each(function(index, value) {
        $(this).removeClass('hide').addClass('show-more-elem');
      });
      $(eventTarget).addClass('show-more-btn_hide');
    }
  }

  $('[data-show-more]').click(function(event) {
    var self = this;
    event.preventDefault();
    showMore.showMoreProducts(self);
  });

  /* -------------------------------------------------------------------------
     end Show More Buttons
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
      begin Quantity-Box
    * ------------------------------------------------------------------------- */

  $('.quantity-box__pieces-btn').click(function(event) {
    var $target = $(event.target);
    var $quantityBlock = $target.parent('.quantity-box__pieces-nav').prev('.quantity-box__pieces-value-data');
    var quantityArray = ['5 000', '10 000', '15 000', '20 000', '25 000', '30 000', '40 000', '50 000', '70 000', '100 000'];
    var $quantityBoxValue = $quantityBlock.text();

    for (var i = 0; i < quantityArray.length; i++) {
      if (quantityArray[i] === $quantityBoxValue) {
        if ($target.hasClass('quantity-box__pieces-btn_plus')) {
          if (i == quantityArray.length - 1) return;
          $quantityBoxValue = quantityArray[i + 1];
          break;
        }
        if ($target.hasClass('quantity-box__pieces-btn_minus')) {
          if (i === 0) return;
          $quantityBoxValue = quantityArray[i - 1];
          break;
        }
      }
    }
    $quantityBlock.text($quantityBoxValue);
  });

  /* -------------------------------------------------------------------------
     end Quantity-Box
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
      begin Application delivery
    * ------------------------------------------------------------------------- */

  $('#application-delivery input[type=radio][name=parcel-weight]').change(function(event) {
    var $price = $(event.target).attr('data-price');
    $('#application-delivery .price .price__value').text($price);
  });

  $('#application-delivery input[type=radio][name=place-delivery]').change(function(event) {
    var $transportCompany = $(event.target).attr('data-transport-company');
    switch ($transportCompany) {
      case '0':
        $('#application-delivery .application-delivery__transport-company').addClass('hide');
        $('#application-delivery .price .price__help-info').addClass('hide');
        break;
      case '1':
        $('#application-delivery .application-delivery__transport-company').removeClass('hide');
        $('#application-delivery .price .price__help-info').removeClass('hide');
        break;
      default:
        // Do this
        break;
    }
  });

  /* -------------------------------------------------------------------------
     end Application delivery
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Icon-Box
   * ------------------------------------------------------------------------- */

  $('[data-scroll-id]').click(function(event) {
    event.preventDefault();
    var id = $(event.target).attr('data-scroll-id');
    var scrollLong = function() {
      if (window.innerWidth < 980) {
        return 30;
      } else {
        return 80;
      }
    };

    $('html, body').animate({
      scrollTop: $('#' + id).offset().top - scrollLong()
    }, 1000);
  });

  /* -------------------------------------------------------------------------
     begin Icon-Box
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Mixitup
   * ------------------------------------------------------------------------- */

  if (document.querySelector('#mix-container.mix-container_paper-cups')) {
    var mixCupConfig = {
      selectors: {
        control: '[data-mixitup-control]'
      },
      multifilter: {
        enable: true
      },
      load: {
        filter: '.single-layer'
      }
    };
    var containerCupEl = document.querySelector('.mix-container');
    var mixerCup = mixitup(containerCupEl, mixCupConfig);
  }


  if (document.querySelector('#mix-container.mix-container_stock') || document.querySelector('#mix-container.mix-container_inspiration')) {
    var mixConfig = {
      selectors: {
        control: '[data-mixitup-control]'
      },
      callbacks: {
        onMixEnd: function(state) {
          $('#mix-container .product-box__image-link').removeAttr('data-mixitup-magnific');

          var $visibleBlocks = $('#mix-container .mix:visible');

          $($visibleBlocks).find('[data-effect]').attr('data-mixitup-magnific', '');

          if ($visibleBlocks.length < 1) {
            return;
          }
          if ($visibleBlocks.length > 1) {
            $('#mix-container [data-mixitup-magnific]').magnificPopup(magnific.magnificConfig('gallery', document.querySelector('#mix-container.mix-container_stock') ? 'seeMoreLink' : 'writeToMailModal'));
          }
          if ($visibleBlocks.length == 1) {
            $('#mix-container [data-mixitup-magnific]').magnificPopup(magnific.magnificConfig('single', document.querySelector('#mix-container.mix-container_stock') ? 'seeMoreLink' : 'writeToMailModal'));
          }
        }
      }
    };

    var containerEl = document.querySelector('.mix-container');
    var checkboxGroup = document.querySelector('.filter-sort');
    var checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    var allCheckbox = checkboxGroup.querySelector('input[value="all"]');

    var mixer = mixitup(containerEl, mixConfig);

    checkboxGroup.addEventListener('change', function(e) {
      var selectors = [];
      var checkbox;
      var i;

      if (e.target === allCheckbox && e.target.checked) {
        for (i = 0; i < checkboxes.length; i++) {
          checkbox = checkboxes[i];

          if (checkbox !== allCheckbox) checkbox.checked = false;
        }
      } else {
        allCheckbox.checked = false;
      }

      for (i = 0; i < checkboxes.length; i++) {
        checkbox = checkboxes[i];

        if (checkbox.checked) selectors.push(checkbox.value);
      }

      var selectorString = selectors.length > 0 ?
        selectors.join(',') :
        'all';

      mixer.filter(selectorString);
    });

  }

  /* -------------------------------------------------------------------------
     begin Mixitup
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Dropdown Menu
   * ------------------------------------------------------------------------- */

  /* begin Calculate height on page load  */
  function checkDropdownsHeight(dropdownAttr) {
    var dropdown = dropdownAttr;
    var dropdownItems = dropdown.querySelectorAll('.dropdown-menu__item');

    if (dropdownItems.length > 12) {
      dropdown.classList.add('ct-dropdown-menu_regular-column');
    }
  }

  var regularDropdowns = document.querySelectorAll('.ct-dropdown-menu.ct-dropdown-menu_regular');

  for (var i = 0; i < regularDropdowns.length; i++) {
    checkDropdownsHeight(regularDropdowns[i]);
  }
  /* end Calculate height on page load  */


  /* begin Hover */
  function headerMenuMouseoverEvent(event) {
    var target = event.target;

    function showDropdown(arg) {
      arg.nextElementSibling.classList.remove('hide');
      arg.nextElementSibling.classList.add('show');
    }

    function headerMenuMouseoutEvent(arg) {
      arg.nextElementSibling.classList.add('hide');
      arg.nextElementSibling.classList.remove('show');
    }

    if (target.getAttribute('data-dropdown') === 'hover') {
      showDropdown(target);
      target.parentElement.addEventListener('mouseleave', function() {
        headerMenuMouseoutEvent(target);
      });
    }

    if (target.parentElement.getAttribute('data-dropdown') === 'hover') {
      showDropdown(target.parentElement);
      target.parentElement.parentElement.addEventListener('mouseleave', function() {
        headerMenuMouseoutEvent(target.parentElement);
      });
    }

  }

  var headerMenu = document.querySelector('.header');
  if (headerMenu) {
    headerMenu.addEventListener('mouseover', headerMenuMouseoverEvent);
  }
  /* end Hover */


  /* begin Click */
  $('[data-dropdown="click"]').click(function(event) {
    event.preventDefault();
    $(this).next().slideToggle();

    if (this.getAttribute('data-dropdown-icon') === 'angle-down-icon') {
      $(this).toggleClass('angle-down-icon_active');
    }
  });
  /* end Click */


  /* begin Click Catalog */

  $('.overlay-desktop').click(function(event) {
    if ($('.ct-dropdown-menu_catalog').css('display') === 'block') {
      $('.ct-dropdown-menu_catalog').toggle();
      $('.nav-second__item-link_catalog-toggle').removeClass('nav-second__item-link_catalog-toggle__active');
      $(this).removeClass('overlay-desktop__active');

      if (isTouchDevice() === false) {
        $('.nav-second__item-link_catalog-toggle').tooltip('enable');
      }
    }
  });

  document.addEventListener('keydown', function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ('key' in evt) {
      isEscape = (evt.key == 'Escape' || evt.key == 'Esc');
    } else {
      isEscape = (evt.keyCode == 27);
    }
    if (isEscape && document.querySelector('.overlay-desktop__active')) {
      $('.overlay-desktop').removeClass('overlay-desktop__active');
      $('.ct-dropdown-menu_catalog').toggle();
      $('.nav-second__item-link_catalog-toggle').removeClass('nav-second__item-link_catalog-toggle__active');
      if (isTouchDevice() === false) {
        $('.nav-second__item-link_catalog-toggle').tooltip('enable');
      }
    }
  });


  $('.nav-second__item-link_catalog-toggle').click(function(event) {
    if (window.innerWidth >= 980) {
      $(this).next().toggle();

      if ($(this).next().css('display') === 'block') {
        $(this).tooltip('hide');
        $(this).tooltip('disable');
        $('.overlay-desktop').addClass('overlay-desktop__active');
      }
      if ($(this).next().css('display') === 'none') {
        if (isTouchDevice() === false) {
          $(this).tooltip('enable');
        }
        $('.overlay-desktop').removeClass('overlay-desktop__active');
      }
    }
  });


  $('.ct-dropdown-menu__close').click(function(event) {
    $(this).parent().toggle();
    if (isTouchDevice() === false) {
      $(this).parent().prev().tooltip('enable');
    }
    $('.overlay-desktop').removeClass('overlay-desktop__active');
  });

  /* end Click Catalog */


  /* begin Catalog */

  var catalogNameNumber = 0;

  $('[data-catalog-name]').mouseenter(function() {
    var catalog = $('.ct-dropdown-menu_catalog');
    var catalogName = $(this).attr('data-catalog-name');

    if (catalogName === catalogNameNumber) {
      return;
    }

    $(catalog).find('[data-catalog-name]').removeClass('dropdown-menu__nav-item-link_active');
    $(catalog).find('[data-catalog-item]').removeClass('dropdown-menu__item-link_active');

    $(this).addClass('dropdown-menu__nav-item-link_active');
    $(catalog).find('[data-catalog-item-' + catalogName + ']').addClass('dropdown-menu__item-link_active');
    catalogNameNumber = catalogName;
  });

  $('.ct-dropdown-menu_catalog').mouseleave(function() {
    var catalog = $('.ct-dropdown-menu_catalog');

    $(catalog).find('[data-catalog-name]').removeClass('dropdown-menu__nav-item-link_active');
    $(catalog).find('[data-catalog-item]').removeClass('dropdown-menu__item-link_active');

    if (this.querySelector('.dropdown-menu__item-link_active-click')) {
      var activeItem = $(this).find('.dropdown-menu__item-link_active-click');
      catalogNameNumber = $(activeItem).attr('data-catalog-name');

      $(catalog).find('[data-catalog-name="' + catalogNameNumber + '"]').addClass('dropdown-menu__nav-item-link_active');
      $(catalog).find('[data-catalog-item-' + catalogNameNumber + ']').addClass('dropdown-menu__item-link_active');
      return;
    }
    catalogNameNumber = 0;
  });

  $('[data-catalog-name]').click(function(event) {
    event.preventDefault();
    $('.ct-dropdown-menu_catalog').find('.dropdown-menu__nav-item-link').removeClass('dropdown-menu__item-link_active-click');
    $(this).addClass('dropdown-menu__item-link_active-click');
  });

  /* end Catalog */

  /* -------------------------------------------------------------------------
     end Dropdown Menu
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Copy to clipboard
   * ------------------------------------------------------------------------- */

  function copyToClipboard(text) {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'успешно' : 'неуспешно';
      // console.log('Текст был скопирован ' + msg);
    } catch (err) {
      // console.log('К сожалению, невозможно скопировать');
    }
    document.body.removeChild(textArea);
  }

  $('[data-clipboard]').click(function(event) {
    copyToClipboard(event.target.getAttribute('data-clipboard'));

    var self = this;
    var title = $(this).attr('data-original-title');
    $(this).attr('data-original-title', 'Скопировано').tooltip('show');

    setTimeout(function() {
      $(self).tooltip('hide');
      $(self).attr('data-original-title', title);
    }, 400);
  });

  /* -------------------------------------------------------------------------
     end Copy to clipboard
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Postpress-processing block
   * ------------------------------------------------------------------------- */

  $('.postpress-processing__block')
    .mouseenter(function() {
      var blocks = document.querySelectorAll('.postpress-processing__block');

      if (this.classList.contains('postpress-processing__block_active') || window.innerWidth < 980) {
        return;
      }

      for (var i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove('postpress-processing__block_active');
        this.classList.add('postpress-processing__block_active');
      }

    })
    .mouseleave(function() {});

  /* -------------------------------------------------------------------------
     end Postpress-processing block
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Mobile menu
   * ------------------------------------------------------------------------- */

  $('.nav-top__buttons-item-btn-toggle').click(function(event) {
    if (this.classList.contains('nav-top__buttons-item-btn-toggle__active')) {
      $('.mobile-nav-right').removeClass('mobile-nav-right__open');
      $('.page-wrapper').removeClass('page-wrapper__mobile-right');
      $(this).removeClass('nav-top__buttons-item-btn-toggle__active');
      $('.overlay').removeClass('overlay__active');
      $('body').removeClass('no-scroll');
      $('html').removeClass('no-scroll');
      return;
    }

    $('.mobile-nav-right').addClass('mobile-nav-right__open');
    $('.page-wrapper').addClass('page-wrapper__mobile-right');
    $(this).addClass('nav-top__buttons-item-btn-toggle__active');
    $('.overlay').addClass('overlay__active');
    $('body').addClass('no-scroll');
    $('html').addClass('no-scroll');
  });

  $('.overlay').click(function(event) {
    if (document.querySelector('.mobile-nav-right__open')) {
      $('.mobile-nav-right').removeClass('mobile-nav-right__open');
      $('.page-wrapper').removeClass('page-wrapper__mobile-right');
      $('.nav-top__buttons-item-btn-toggle').removeClass('nav-top__buttons-item-btn-toggle__active');
    }

    if (document.querySelector('.mobile-nav-left__open')) {
      $('.mobile-nav-left').removeClass('mobile-nav-left__open');
      $('.page-wrapper').removeClass('page-wrapper__mobile-left');
      $('.nav-second__item-link_catalog-toggle').removeClass('nav-second__item-link_catalog-toggle__active');
    }

    $('.overlay').removeClass('overlay__active');
    $('.overlay').removeClass('overlay_catalog');
    $('body').removeClass('no-scroll');
    $('html').removeClass('no-scroll');
  });

  $('.nav-second__item-link_catalog-toggle').click(function(event) {
    if (window.innerWidth < 980) {
      if (this.classList.contains('nav-second__item-link_catalog-toggle__active')) {
        $('.mobile-nav-left').removeClass('mobile-nav-left__open');
        $('.page-wrapper').removeClass('page-wrapper__mobile-left');
        $(this).removeClass('nav-second__item-link_catalog-toggle__active');
        $('.overlay').removeClass('overlay__active');
        $('.overlay').removeClass('overlay_catalog');
        $('body').removeClass('no-scroll');
        $('html').removeClass('no-scroll');

        if (!$('.mobile-nav-left').hasClass('mobile-nav-left__open') && isTouchDevice() === false) {
          $(this).tooltip('enable');
        }
        return;
      }

      $('.mobile-nav-left').addClass('mobile-nav-left__open');
      $('.page-wrapper').addClass('page-wrapper__mobile-left');
      $(this).addClass('nav-second__item-link_catalog-toggle__active');
      $('.overlay').addClass('overlay__active');
      $('.overlay').addClass('overlay_catalog');
      $('body').addClass('no-scroll');
      $('html').addClass('no-scroll');

      if (document.querySelector('.mobile-nav-left').classList.contains('mobile-nav-left__open')) {
        $(this).tooltip('hide');
        $(this).tooltip('disable');
      }

    }

  });

  /* -------------------------------------------------------------------------
     end Mobile menu
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Form File
   * ------------------------------------------------------------------------- */

  $('.add-file__input').change(function(event) {
    var file = this.value;
    var fileName = file.split("\\");
    var inputLabel = this.parentNode.querySelector('.add-file__label');
    var resetBtn = this.parentNode.querySelector('.add-file__btn');

    inputLabel.innerHTML = fileName[fileName.length - 1];
    resetBtn.classList.add('add-file__btn_init');

    if (file === '') {
      inputLabel.innerHTML = 'Загрузить файл';
      resetBtn.classList.remove('add-file__btn_init');
    }
  });

  $('.add-file__btn').click(function(event) {
    if (this.classList.contains('add-file__btn_init')) {
      this.parentNode.querySelector('.add-file__input').value = '';
      this.parentNode.querySelector('.add-file__label').innerHTML = 'Загрузить файл';
      this.classList.remove('add-file__btn_init');
    }
  });

  /* -------------------------------------------------------------------------
     end Form File
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Nav Fixed
   * ------------------------------------------------------------------------- */

  if (window.innerWidth > 979 && document.querySelector('.nav-fixed')) {
    (function() {
      var navFixed = document.querySelector('.nav-fixed');
      var container = document.querySelector('.container');
      var length = container.getBoundingClientRect().right - 93;

      navFixed.style.left = length + 'px';
      navFixed.classList.remove('hide');
    })();
  }

  /* -------------------------------------------------------------------------
     end Nav Fixed
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Window Resize
   * ------------------------------------------------------------------------- */

  (function() {
    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;

    function resizeThrottler() {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function() {
          resizeTimeout = null;
          actualResizeHandler();
        }, 66);
      }
    }

    function actualResizeHandler() {

      /* begin Nav Fixed */
      if (window.innerWidth > 979 && document.querySelector('.nav-fixed')) {
        (function() {
          var navFixed = document.querySelector('.nav-fixed');
          var container = document.querySelector('.container');
          var length = container.getBoundingClientRect().right - 93;

          navFixed.style.left = length + 'px';

        })();
      }
      /* end Nav Fixed */


      /* begin Sticky Navbar */
      if (window.innerWidth < 980 && document.querySelector('.nav-top_active')) {
        var navTop = document.querySelector('.nav-top');
        var navTopFake = document.querySelector('.nav-top-fake');

        navTop.classList.remove('nav-top_active');
        navTopFake.classList.remove('nav-top-fake_active');
      }
      /* end Sticky Navbar */


      /* begin Mobile Menu */
      if (window.innerWidth > 809 && document.querySelector('.page-wrapper__mobile-right')) {
        $('.mobile-nav-right').removeClass('mobile-nav-right__open');
        $('.page-wrapper').removeClass('page-wrapper__mobile-right');
        $('.nav-top__buttons-item-btn-toggle').removeClass('nav-top__buttons-item-btn-toggle__active');
        $('.overlay').removeClass('overlay__active');
        $('.overlay').removeClass('overlay_catalog');
        $('body').removeClass('no-scroll');
        $('html').removeClass('no-scroll');
      }

      if (window.innerWidth >= 980 && document.querySelector('.page-wrapper__mobile-left')) {
        $('.mobile-nav-left').removeClass('mobile-nav-left__open');
        $('.page-wrapper').removeClass('page-wrapper__mobile-left');
        $('.nav-second__item-link_catalog-toggle').removeClass('nav-second__item-link_catalog-toggle__active');
        $('.overlay').removeClass('overlay__active');
        $('.overlay').removeClass('overlay_catalog');
        $('body').removeClass('no-scroll');
        $('html').removeClass('no-scroll');
      }
      /* end Mobile Menu */


      /* begin Individual Design Carousel */
      if (document.querySelector('.individual-design-carosel-3row')) {
        individualDesignCarouselNavsResize();
      }
      /* end Individual Design Carousel */


      /* begin Product Slider */
      if (isTouchDevice() === false && document.querySelector('#product-slider') && document.querySelector('#product-slider').classList.contains('rsFullscreen')) {
        $('#product-slider-custom-nav-next').removeClass('product-slider-custom-nav_active');
        $('#product-slider-custom-nav-prev').removeClass('product-slider-custom-nav_active');
        $('#product-slider-custom-close').removeClass('product-slider-custom-close_active');
        setTimeout(function(event) {
          $('.product-slider-custom-nav-prev').css('left', $('#product-slider .rsActiveSlide .rsImg').css('margin-left')).addClass('product-slider-custom-nav_active');
          $('.product-slider-custom-nav-next').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 60 + 'px').addClass('product-slider-custom-nav_active');

          $('#product-slider-custom-close').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 28 + 'px').css('top', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-top'), 10) - 13 + 'px').addClass('product-slider-custom-close_active');
        }, 100);
      }
      /* end Product Slider */


      /* begin Filter-result Height */
      if (document.querySelector('.filter-result') && !document.querySelector('.filter-result').classList.contains('filter-result_hide')) {
        setHeight();
      }
      /* end Filter-result Height */
    }

  })();

  /* -------------------------------------------------------------------------
     end Window Resize
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Table
   * ------------------------------------------------------------------------- */

  /**
   * @version 2.0.0
   * @link https://github.com/gajus/wholly for the canonical source repository
   * @license https://github.com/gajus/wholly/blob/master/LICENSE BSD 3-Clause
   */


  (function($) {
    var debug = false,
      globalTableIndex = [],
      wholly = {},
      defaultOptions;

    defaultOptions = {
      highlightHorizontal: null,
      highlightVertical: null
    };

    wholly.calcTableMaxCellLength = function(table) {
      var maxWidth = 0;

      table.find('tr').each(function() {
        var rowWidth = wholly.calcRowCellLength($(this));

        if (rowWidth > maxWidth) {
          maxWidth = rowWidth;
        }
      });

      return maxWidth;
    };

    wholly.calcRowCellLength = function(row) {
      var width = 0;

      row.find('td, th').each(function() {
        var colspan = parseInt($(this).attr('colspan'), 10) || 1;

        width += colspan;
      });

      return width;
    };

    wholly.generateTableMatrix = function(table) {
      var width = wholly.calcTableMaxCellLength(table),
        height = table.find('tr').length;

      if (debug) {
        console.log('generateTableMatrix', 'width:', width, 'height:', height);
      }

      return wholly.generateMatrix(width, height);
    };

    wholly.generateMatrix = function(width, height) {
      var matrix = [];

      while (height--) {
        matrix.push(new Array(width));
      }

      return matrix;
    };

    wholly.indexTable = function(table) {
      var tableIndex = wholly.generateTableMatrix(table),
        rows = table.find('tr');

      $.each(tableIndex, function(y) {
        var row = rows.eq(y),

          columns = row.children(),
          cellIndex = 0;

        if (debug) {
          console.groupCollapsed('Table row.', 'y:', y, 'columns.length:', columns.length);
        }

        $.each(tableIndex[y], function(x) {
          var cell = tableIndex[y][x],
            colspan,
            rowspan,
            i,
            j;

          if (cell) {
            if (debug) {
              console.log('x:', cellIndex, 'cell:', cell[0], 'state: already indexed');
            }
          } else {
            cell = columns.eq(cellIndex++);

            colspan = parseInt(cell.attr('colspan'), 10) || 1;
            rowspan = parseInt(cell.attr('rowspan'), 10) || 1;

            if (debug) {
              if (colspan > 1 || rowspan > 1) {
                console.group('x:', x, 'colspan:', colspan, 'rowspan:', rowspan, 'cell:', cell[0]);
              } else {
                console.log('x:', x, 'colspan:', colspan, 'rowspan:', rowspan, 'cell:', cell[0]);
              }
            }

            for (i = 0; i < rowspan; i++) {
              for (j = 0; j < colspan; j++) {
                if (debug) {
                  console.log('relative row:', i, 'relative cell:', j, 'absolute row:', y + i, 'absolute cell:', x + j);
                }

                tableIndex[y + i][x + j] = cell[0];
              }
            }

            if (colspan > 1 || rowspan > 1) {
              console.groupEnd();
            }
          }

          if (cell.data && cell.data('wholly.offsetInMatrix') === undefined) {
            cell.data('wholly.offsetInMatrix', [x, y]);
          }
        });

        if (debug) {
          console.groupEnd();
        }
      });

      return tableIndex;
    };

    $.fn.wholly = function(_options) {
      this.each(function() {
        var table,
          tableIndex,
          horizontal,
          vertical,
          mouseleave,
          options = $.extend({}, defaultOptions, _options);

        if ($.inArray(this, globalTableIndex) !== -1) {
          if (debug) {
            console.warn('Wholly has been applied twice on the same table.');
          }

          return;
        }

        globalTableIndex.push(this);

        table = $(this);

        if (!table.is('table')) {
          throw new Error('Wholly works only with tables.');
        }

        tableIndex = wholly.indexTable(table);

        table.on('mouseenter', '.tg-s6z2', function() {
          var target = $(this),
            rowspan = parseInt(target.attr('rowspan'), 10) || 1,
            colspan = parseInt(target.attr('colspan'), 10) || 1,
            offsetInMatrix = target.data('wholly.offsetInMatrix');

          mouseleave();

          horizontal = $([]);
          vertical = $([]);

          $.each(tableIndex.slice(offsetInMatrix[1], offsetInMatrix[1] + rowspan), function(n, cell) {
            horizontal = horizontal.add(cell);
          });

          $.each(tableIndex, function(n, rowIndex) {
            vertical = vertical.add(rowIndex.slice(offsetInMatrix[0], offsetInMatrix[0] + colspan));
          });

          if (debug) {
            console.log('mouseenter', 'horizontal:', horizontal.length, 'vertical:', vertical.length);
          }

          horizontal.trigger('wholly.mouseenter-horizontal');
          vertical.trigger('wholly.mouseenter-vertical');

          if (options.highlightHorizontal) {
            horizontal.addClass(options.highlightHorizontal);
          }

          if (options.highlightVertical) {
            vertical.addClass(options.highlightVertical);
          }

          table.trigger('wholly.mouseenter', {
            horizontal: horizontal,
            vertical: vertical
          });
        });

        mouseleave = function() {
          if (!horizontal && !vertical) {
            return;
          }

          horizontal.trigger('wholly.mouseleave-horizontal');
          vertical.trigger('wholly.mouseleave-vertical');

          if (options.highlightHorizontal) {
            horizontal.removeClass(options.highlightHorizontal);
          }

          if (options.highlightVertical) {
            vertical.removeClass(options.highlightVertical);
          }

          table.trigger('wholly.mouseleave', {
            horizontal: horizontal,
            vertical: vertical
          });

          horizontal = vertical = undefined;
        };

        table.on('mouseleave', 'td, th', mouseleave);
      });
    };
  }(jQuery));


  /* begin Start Highlight Table */
  $('.table-highlight').wholly({
    highlightHorizontal: 'table-horizontal-highlight',
    highlightVertical: 'table-vertical-highlight'
  });
  /* end Start Highlight Table */


  /* begin Click TD Event */
  $('.tg-s6z2').click(function(event) {
    $('.filter-result').removeClass('filter-result_hide');

    $('.tg-s6z2').removeClass('tg-s6z2_active');
    $(this).addClass('tg-s6z2_active');

    if (window.innerWidth < 810) {
      $('html, body').animate({
        scrollTop: $('.filter-result').offset().top - 15
      }, 1000);
      return;
    }

    setHeight();

  });
  /* end Click TD Event */



  /* begin Hover Table Size Box */

  function showSizeSchema(size) {
    var boxSize = $('.size-box');

    switch (size) {
      case 'a3':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-a3.png)');
        boxSizeValue = 'a3';
        break;
      case 'a4':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-a4.png)');
        boxSizeValue = 'a4';
        break;
      case 'a5':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-a5.png)');
        boxSizeValue = 'a5';
        break;
      case 'a6':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-a6.png)');
        boxSizeValue = 'a6';
        break;
      case '120x120':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-120x120.png)');
        boxSizeValue = '120x120';
        break;
      case '98x210':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-98x210.png)');
        boxSizeValue = '98x210';
        break;
      case '70x150':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-70x150.png)');
        boxSizeValue = '70x150';
        break;
      case '70x100':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-70x100.png)');
        boxSizeValue = '70x100';
        break;
      case '90x50':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-90x50.png)');
        boxSizeValue = '90x50';
        break;
      case 'cup-100':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-100.png)');
        boxSizeValue = 'cup-100';
        break;
      case 'cup-180':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-180.png)');
        boxSizeValue = 'cup-180';
        break;
      case 'cup-200':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-200.png)');
        boxSizeValue = 'cup-200';
        break;
      case 'cup-250':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-250.png)');
        boxSizeValue = 'cup-250';
        break;
      case 'cup-350':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-350.png)');
        boxSizeValue = 'cup-350';
        break;
      case 'cup-400':
        $(boxSize).css('background-image', 'url(img/backgrounds/size-box/size-box-cup-400.png)');
        boxSizeValue = 'cup-400';
        break;

      default:
        // Do this
        break;
    }
  }

  var boxSizeValue = 'a3';

  $('.price-table tr:not(:nth-child(-n+2))').hover(function() {
    if (document.querySelector('.price-table_cup')) {
      $('.size-box').addClass('size-box_cup');
    }
    if (!document.querySelector('.size-box').classList.contains('size-box_active')) {
      $('.size-box').addClass('size-box_active');
    }
    var sizePaper = $(this).attr('data-box-size');
    if (sizePaper === boxSizeValue) {
      return;
    }
    showSizeSchema(sizePaper);
  }, function() {

  });

  $('.price-table-wrapper')
    .mouseenter(function() {})
    .mouseleave(function() {
      if (this.querySelector('.tg-s6z2_active')) {
        var sizePaper = $(this).find('.tg-s6z2_active').parent('tr').attr('data-box-size');
        showSizeSchema(sizePaper);
      } else {
        $('.size-box').removeClass('size-box_active');
      }

    });

  /* end Hover Table Size Box */

  /* -------------------------------------------------------------------------
     end Table
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin filter-result
   * ------------------------------------------------------------------------- */

  function setHeight() {
    if (window.innerWidth <= 810) return;
    var heightContentLeft;
    var setHeight;
    var filter = $('#selection-tabs__content .filter');
    var sizeBox = $('#selection-tabs__content .size-box');

    if (document.querySelector('#selection-tabs__content .selection-tabs__content_inner')) {
      heightContentLeft = $('#selection-tabs__content .selection-tabs__content_inner').height() + parseInt($('#selection-tabs__content .selection-tabs__content_inner').css('padding-top'), 10) + $('#selection-tabs__content .selection-tab__items_inner').height();
      setHeight = heightContentLeft - sizeBox.height() - parseInt(sizeBox.css('margin-bottom'), 10);

    }
    if (!document.querySelector('#selection-tabs__content .selection-tabs__content_inner')) {
      heightContentLeft = $(filter).height() + parseInt(filter.css('margin-bottom'), 10) + $('#selection-tabs__content .selection-tabs__content-orice-table').height();
      setHeight = heightContentLeft - sizeBox.height() - parseInt(sizeBox.css('margin-bottom'), 10);
    }
    $('#selection-tabs__content .filter-result').css('min-height', setHeight);
  }

  setHeight();

  /* -------------------------------------------------------------------------
     end filter-result
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Window Scroll Event
   * ------------------------------------------------------------------------- */

  window.addEventListener('scroll', function() {

    /* begin Sticky Navbar */
    if (window.innerWidth > 979) {
      var navTop = document.querySelector('.nav-top');
      var navTopFake = document.querySelector('.nav-top-fake');

      if (window.pageYOffset > 200 && !navTop.classList.contains('nav-top_active')) {
        navTop.classList.add('nav-top_active');
        $('.nav-top_active').slideDown();
        navTopFake.classList.add('nav-top-fake_active');
      }
      if (window.pageYOffset < 200 && navTop.classList.contains('nav-top_active')) {
        navTop.classList.remove('nav-top_active');
        navTopFake.classList.remove('nav-top-fake_active');
      }
    }
    /* end Sticky Navbar */


    /* begin Nav Fixed */
    if (document.querySelector('.nav-fixed')) {
      var navFixed = document.querySelector('.nav-fixed');
      var navFixedItems = document.querySelector('.nav-fixed__items');
      var navFixedWrapper = document.querySelector('.scroll-wrapper');

      if (window.innerWidth > 979 && window.pageYOffset > 280 && !navFixed.classList.contains('nav-fixed_active')) {
        navFixed.classList.add('nav-fixed_active');

      }
      if (window.innerWidth > 979 && window.pageYOffset < 280 && navFixed.classList.contains('nav-fixed_active')) {
        navFixed.classList.remove('nav-fixed_active');
      }

      if (window.innerWidth > 979 && navFixedWrapper.getBoundingClientRect().bottom - 640 < 0) {
        navFixed.classList.remove('nav-fixed_active');
        navFixed.classList.add('nav-fixed_active-bottom');
      }
      if (window.innerWidth > 979 && navFixedWrapper.getBoundingClientRect().bottom - 640 > 0 && navFixed.classList.contains('nav-fixed_active-bottom')) {
        navFixed.classList.remove('nav-fixed_active-bottom');
        navFixed.classList.add('nav-fixed_active');
      }
    }
    /* end Nav Fixed */

  });

  /* -------------------------------------------------------------------------
     end Window Scroll Event
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Swiper Slider
   * ------------------------------------------------------------------------- */

  /* begin Individual Design Carousel */

  var individualDesignCarousel = new Swiper('.individual-design-carosel-3row', {
    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    slidesPerColumn: 3,
    navigation: {
      nextEl: '.individual-design__carousel-nav-next',
      prevEl: '.individual-design__carousel-nav-prev',
    },
    breakpoints: {
      480: {
        slidesPerView: 2
      },
      720: {
        slidesPerView: 3,
      },
    }
  });

  function individualDesignCarouselNavsResize() {
    var individualDesignNavs = $('.individual-design .individual-design__carousel-nav');
    var individualDesignBox = $('.individual-design .picture-box_large');

    $(individualDesignNavs).height(individualDesignBox.height() + 7);
    $(individualDesignNavs).width(individualDesignBox.width() + 7);
  }

  individualDesignCarouselNavsResize();

  /* end Individual Design Carousel */


  /* begin Add related Products Carousel */

  var addRelatedProductsCarousel = new Swiper('.add-related-products-carosel', {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: '.add-related-products-carosel-nav-next',
      prevEl: '.add-related-products-carosel-nav-prev',
    },
    breakpoints: {
      580: {
        slidesPerView: 1
      },
      979: {
        slidesPerView: 2,
      },
    }
  });

  /* end Add related Products Carousel */


  /* begin About Equipment Carousel */

  var aboutEquipmentCarousel = new Swiper('.about-equipment-carosel', {
    slidesPerView: 2,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
      nextEl: '.about-equipment-carosel-nav-next',
      prevEl: '.about-equipment-carosel-nav-prev',
    },
    breakpoints: {
      580: {
        slidesPerView: 1,
        autoHeight: true
      }
    }
  });



  /* end About Equipment Carousel */


  /* begin Slider Welcome */

  var sliderWelcome = new Swiper('.slider-welcome', {
    autoHeight: true,
    loop: true,
    speed: 1000,
    pagination: {
      el: '.slider-welcome-pagination',
      clickable: true
    }
  });

  /* end Slider Welcome */

  /* -------------------------------------------------------------------------
     end Swiper Slider
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Custom Scroll - NiceScroll
   * ------------------------------------------------------------------------- */

  $('.editing-layout__editable-wrapper').niceScroll({
    autohidemode: false,
    background: '#E8E9F2',
    cursorcolor: '#B8B9D0',
    cursorborder: '0px solid #B8B9D0',
    cursorwidth: '6px',
    cursorborderradius: '8px',
    horizrailenabled: false,
    railoffset: {
      top: 0,
      left: 4
    }
  });

  $('.selection-tabs_editing-layout .selection-tab__item-link').on('shown.bs.tab', function(event) {
    $('.editing-layout__editable-wrapper').getNiceScroll().resize();
  });

  /* -------------------------------------------------------------------------
     begin Custom Scroll - NiceScroll
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Filter
   * ------------------------------------------------------------------------- */

  $('.select-custom__dropdown-toggle').click(function(event) {
    event.preventDefault();
    $(this).next('.select-custom__dropdown').fadeToggle('fast');
    $(this).toggleClass('select-custom__dropdown-toggle_active');
  });

  $('.select-custom__dropdown-item-link').click(function(event) {
    event.preventDefault();
    var selectValue = $(this).html();

    $(this).parent('.select-custom__dropdown-item').parent('.select-custom__dropdown-items').find('.select-custom__dropdown-item-link_active').removeClass('select-custom__dropdown-item-link_active');
    $(this).toggleClass('select-custom__dropdown-item-link_active');
    $(this).parent('.select-custom__dropdown-item').parent('.select-custom__dropdown-items').parent('.select-custom__dropdown').prev('.select-custom__dropdown-toggle').html(selectValue).toggleClass('select-custom__dropdown-toggle_active').next('.select-custom__dropdown').fadeToggle('fast');
  });

  /* -------------------------------------------------------------------------
     end Filter
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Print
   * ------------------------------------------------------------------------- */

  $('.contacts-section__nav-item-button_print').click(function(event) {
    var prtContent = document.querySelector('#print-contacts');
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  });

  /* -------------------------------------------------------------------------
     end Print
  * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Tooltips & Popovers
   * ------------------------------------------------------------------------- */

  $('[data-toggle="tooltip"]').tooltip({
    placement: 'bottom',
    trigger: 'hover'
  });

  $('[data-toggle="tooltip-big"]').tooltip({
    template: '<div class="tooltip tooltip-big" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  });

  $('#header .header-middle__contacts-item-icon_phone').click(function(event) {
    $(this).tooltip('hide');
  });

  /* -------------------------------------------------------------------------
     end Tooltips & Popovers
  * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Radio Inline Tab
   * ------------------------------------------------------------------------- */

  $('.radio-inline_tabs input').click(function(event) {
    $(this).parent().tab('show');
    $('.filter-result').addClass('filter-result_hide');
    $('.size-box').removeClass('size-box_active');
  });

  /* -------------------------------------------------------------------------
     end Radio Inline Tab
  * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Check Touch Device
   * ------------------------------------------------------------------------- */

  function isTouchDevice() {
    return true === ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
  }

  if (isTouchDevice() === true) {
    $('[data-toggle="tooltip"]').tooltip('disable');
    $('.picture-box__overlay').addClass('picture-box__overlay_hide');
  }

  /* -------------------------------------------------------------------------
     end Check Touch Device
  * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Grid Hover Effects
   * ------------------------------------------------------------------------- */

  $('.postpress-processing .picture-box').hoverdir();
  $('.individual-design .picture-box').hoverdir();

  /* -------------------------------------------------------------------------
     end Grid Hover Effects
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Questions request
   * ------------------------------------------------------------------------- */

  $('.form-questions-request').submit(function(event) {
    event.preventDefault();

    var target = $(event.target);
    var inputValue = target.find('.form-questions-request__input').val();
    if (inputValue === '') return;

    $('#write-to-mail-modal').modal('show');

    $('#write-to-mail-modal').on('shown.bs.modal', function(event) {
      $('.write-to-mail-modal').find('.textarea').val(inputValue);
    });
  });

  /* -------------------------------------------------------------------------
     end Questions request
   * ------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------
     begin Product royalSlider
   * ------------------------------------------------------------------------- */

  if (document.querySelector('#product-slider')) {
    $('#product-slider').addClass('product-slider_active');

    if (isTouchDevice() === false) {
      $('#product-slider').addClass('product-slider_active-desktop');
    }

    var productSlider = $('#product-slider').royalSlider({
      fullscreen: {
        enabled: true,
      },
      imageScalePadding: 0,
      controlNavigation: 'thumbnails',
      loop: true,
      keyboardNavEnabled: true,
      fadeinLoadedSlide: true,
      globalCaption: true,
      globalCaptionInside: true,
      imageScaleMode: 'fill',
      addActiveClass: true,
      navigateByClick: false,
      thumbs: {
        arrowLeft: $('#product-slider-left-arrow'),
        arrowRight: $('#product-slider-right-arrow'),
        appendSpan: true,
        firstMargin: true,
        fitInViewport: false,
        spacing: 10,
      },
      autoPlay: {
        enabled: true,
        stopAtAction: false
      }
    }).data('royalSlider');

    productSlider.ev.on('rsEnterFullscreen', function() {
      productSlider.stopAutoPlay();
      productSlider.st.imageScaleMode = 'fit-if-smaller';
      productSlider.updateSliderSize(true);

      $('#product-slider-left-arrow').appendTo('#product-slider .rsNav');
      $('#product-slider-right-arrow').appendTo('#product-slider .rsNav');

      if (isTouchDevice() === false) {
        setTimeout(function() {
          $('#product-slider-custom-nav-prev').appendTo('#product-slider .rsOverflow').css('left', $('#product-slider .rsActiveSlide .rsImg').css('margin-left')).addClass('product-slider-custom-nav_active');
          $('#product-slider-custom-nav-next').appendTo('#product-slider .rsOverflow').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 60 + 'px').addClass('product-slider-custom-nav_active');

          $('#product-slider-custom-close').appendTo('#product-slider .rsOverflow').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 28 + 'px').css('top', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-top'), 10) - 13 + 'px').addClass('product-slider-custom-close_active');
        }, 275);
      }

    });


    productSlider.ev.on('rsExitFullscreen', function() {
      productSlider.startAutoPlay();
      productSlider.st.imageScaleMode = 'fill';
      productSlider.updateSliderSize(true);
      setTimeout(function() {
        productSlider.updateSliderSize(true);
      }, 200);

      $('#product-slider-left-arrow').appendTo('.product .product__slider-wrapper');
      $('#product-slider-right-arrow').appendTo('.product .product__slider-wrapper');
    });


    productSlider.ev.on('rsBeforeAnimStart', function(event) {
      if (isTouchDevice() === false) {
        $('#product-slider-custom-nav-next').removeClass('product-slider-custom-nav_active');
        $('#product-slider-custom-nav-prev').removeClass('product-slider-custom-nav_active');
        $('#product-slider-custom-close').removeClass('product-slider-custom-close_active');
      }
    });


    productSlider.ev.on('rsAfterSlideChange', function(event) {
      if (isTouchDevice() === false && document.querySelector('#product-slider').classList.contains('rsFullscreen')) {
        $('.product-slider-custom-nav-prev').css('left', $('#product-slider .rsActiveSlide .rsImg').css('margin-left')).addClass('product-slider-custom-nav_active');
        $('.product-slider-custom-nav-next').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 60 + 'px').addClass('product-slider-custom-nav_active');
        $('#product-slider-custom-close').css('left', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-left'), 10) + parseInt($('#product-slider .rsActiveSlide .rsImg').css('width'), 10) - 28 + 'px').css('top', parseInt($('#product-slider .rsActiveSlide .rsImg').css('margin-top'), 10) - 13 + 'px').addClass('product-slider-custom-close_active');
      }
    });

  }

  $('#product-slider-custom-nav-prev').click(function(event) {
    productSlider.prev();
  });

  $('#product-slider-custom-nav-next').click(function(event) {
    productSlider.next();
  });

  $('#product-slider-custom-close').click(function(event) {
    $(this).removeClass('product-slider-custom-close_active');
    productSlider.exitFullscreen();
  });

  /* -------------------------------------------------------------------------
     end Product royalSlider
   * ------------------------------------------------------------------------- */


});
/* end Document Ready
 ***************************************************************************** */



/* -------------------------------------------------------------------------
   begin Yandex Map
 * ------------------------------------------------------------------------- */

function yandexMapInit(mapId, data) {
  var mapOurAddresses = new ymaps.Map(mapId, {
    center: [55.768690, 37.59345],
    zoom: 17,
    controls: ['zoomControl'],
  }, {
    searchControlProvider: 'yandex#search'
  });

  var listOurAddresses = [
    new ymaps.control.ListBoxItem({
      data: {
        content: 'Офис',
        center: [55.768690, 37.59345],
        zoom: 17
      }
    }),
    new ymaps.control.ListBoxItem({
      data: {
        content: 'Производство',
        center: [55.833967, 37.501240],
        zoom: 17
      }
    })
  ];

  var officeButton = new ymaps.control.Button({
    data: {
      content: 'Офис'
    },
    options: {
      floatIndex: 1,
      selectOnClick: false
    },
    state: {
      selected: true
    }
  });
  var productionButton = new ymaps.control.Button({
    data: {
      content: 'Производство'
    },
    options: {
      maxWidth: 150,
      selectOnClick: false
    }
  });

  if (data === 'modal') {
    mapOurAddresses.controls.add(officeButton);
    mapOurAddresses.controls.add(productionButton);
  }

  officeButton.events.add('press', function(event) {
    var target = event.get('target');
    if (target.state.get('selected')) {
      return;
    }

    productionButton.deselect();
    target.state.set('selected', true);

    mapOurAddresses.setCenter(
      listOurAddresses[0].data.get('center'), listOurAddresses[0].data.get('zoom')
    );
  });

  productionButton.events.add('press', function(event) {
    var target = event.get('target');
    if (target.state.get('selected')) {
      return;
    }

    officeButton.deselect();
    target.state.set('selected', true);

    mapOurAddresses.setCenter(
      listOurAddresses[1].data.get('center'), listOurAddresses[1].data.get('zoom')
    );
  });

  var mapOurAddressesOfficeMark = new ymaps.Placemark([55.768690, 37.59345], {
    balloonContent: 'Москва, 123001, ул. Большая Садовая, д. 5, метро Маяковская',
  }, {
    preset: 'islands#blueDotIcon',
  });
  mapOurAddresses.geoObjects.add(mapOurAddressesOfficeMark);

  var mapOurAddressesProductionMark = new ymaps.Placemark([55.833967, 37.501240], {
    balloonContent: 'Москва, ул. Нарвская 15А',
  }, {
    preset: 'islands#blueDotIcon',
  });
  mapOurAddresses.geoObjects.add(mapOurAddressesProductionMark);

  mapOurAddresses.behaviors.disable('scrollZoom');

  $('#office-tab').on('show.bs.tab', function(event) {
    if (event.target.getAttribute('aria-selected') === true) {
      return;
    }
    mapOurAddresses.setCenter(
      listOurAddresses[0].data.get('center'), listOurAddresses[0].data.get('zoom')
    );
  });

  $('#production-tab').on('show.bs.tab', function(event) {
    if (event.target.getAttribute('aria-selected') === true) {
      return;
    }
    mapOurAddresses.setCenter(
      listOurAddresses[1].data.get('center'), listOurAddresses[1].data.get('zoom')
    );
  });

}

if (document.querySelector('#yandex-map')) {
  ymaps.ready(yandexMapInit.bind(null, 'yandex-map'));
}

/* -------------------------------------------------------------------------
   end Yandex Map
 * ------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------
   begin Video Youtube
 * ------------------------------------------------------------------------- */

function onYouTubePlayerReady(event) {
  // https://developers.google.com/youtube/iframe_api_reference#Events
  var targetYoutubeVideo = event.target;
  var videoDomElem = document.getElementById(
    event.target.getIframe().getAttribute('id')
  );
  var newPlayBtn = videoDomElem.nextElementSibling;

  newPlayBtn.addEventListener('click', function(event) {
    targetYoutubeVideo.playVideo();
    this.classList.add('video-youtube__new-play-btn_hide');
    newPlayBtn.nextElementSibling.classList.add('video-youtube_overlay__hide');
  });
}

function onYouTubePlayerAPIReady() {
  var playerYoutube;
  var idVideo = 'neCoTZn5hdI';

  playerYoutube = new YT.Player('video-youtube__content', {
    videoId: idVideo,
    playerVars: {
      'controls': 0,
      'showinfo': 0
    },
    events: {
      onReady: onYouTubePlayerReady
    }
  });

  var youtubeOverlay = document.querySelector('.video-youtube_overlay');
  youtubeOverlay.src = 'https://img.youtube.com/vi/' + idVideo + '/sddefault.jpg';
}

if (document.querySelector('.video-youtube')) {
  var tag = document.createElement('script');

  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

/* -------------------------------------------------------------------------
   end Video Youtube
 * ------------------------------------------------------------------------- */