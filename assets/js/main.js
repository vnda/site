$(document).ready(function(){
  $('.por-que .tab').on('click', function(){
    $('.por-que .tab').removeClass('active')
    $(this).addClass('active');
    $('.por-que .img img').removeClass('active')
    $($(this).data('image')).addClass('active');
  })

  var generateRandomValues = function(words, actual,){
    var arr = [...Array(words.length).keys()].sort(() => Math.random() - 0.5)
    while (actual == words[arr[0]]){
      arr = arr.sort(() => Math.random() - 0.5)
    }
    return arr
  }

  $('[data-troca]').each(function(index, el){        
    var palavras = $(this).data('palavras');

    palavras = palavras.split(',')

    if(palavras.length > 1){
      var vetor = generateRandomValues(palavras, $(el).text().split('')),
          j;

      setTimeout(function(){
        setInterval(function(){ 
          if (vetor.length == 0){
            vetor = generateRandomValues(palavras, $(el).text().split(''))
          }
          
          j = vetor.pop()

          var sizeWord = $(el).text().length + 1;
          
          $.each($(el).text().split(''), function(x, letra){
            setTimeout(function(){
              $(el).text($(el).text().slice(0, -1));
            }, 75 * x)
          })  
          
          var letras = palavras[j].trim().split('');
          setTimeout(function(){
            $.each(letras, function(x, letra){
              setTimeout(function(){
                $(el).text($(el).text() + letra);
              }, 75 * x)
            })   
          }, 75 * sizeWord)   
        }, 4000);
      }, 2000 * index)
    }
  }); 


  $("#menu-mobile").mmenu({
    extensions: [
      "pagedim-black"
    ],
    navbar: {
      add: true
    }
  });

  mmenu = $("#menu-mobile").data('mmenu');
  $('[data-action="open-menu-mobile"]').on('click', function(event) {
    event.preventDefault();
    if ($("#menu-mobile").hasClass('mm-menu_opened')) {
      mmenu.close();
    } else {
      mmenu.open();
    }
  });

  var casesPrincipais = new Swiper($('.cases-principais').find('.swiper-container'), {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: $('.cases-principais').find('.swiper-pagination'),
      clickable: true,
    },
    navigation: {
      nextEl: $('.cases-principais').find('.swiper-button-next'),
      prevEl: $('.cases-principais').find('.swiper-button-prev'),
    },
  })

  var outrosCases = new Swiper($('.outros-cases').find('.swiper-container'), {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      nextEl: $('.outros-cases').find('.swiper-button-next'),
      prevEl: $('.outros-cases').find('.swiper-button-prev'),
    },
    breakpoints: {
      320: {
        spaceBetween: 15
      },
      480: {
        spaceBetween: 30
      },
      640: {
        spaceBetween: 30
      }
    }
  })

  var depoimentos = new Swiper($('.carrossel-depoimentos').find('.swiper-container'), {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: $('.carrossel-depoimentos').find('.swiper-button-next'),
      prevEl: $('.carrossel-depoimentos').find('.swiper-button-prev'),
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
    }
  })

  var visaoTime = new Swiper($('.visao-time').find('.swiper-container'), {
    slidesPerView: 1,
    spaceBetween: 100,
    effect: 'fade',
    navigation: {
      nextEl: $('.visao-time').find('.swiper-button-next'),
      prevEl: $('.visao-time').find('.swiper-button-prev'),
    },
  })

  $('[name="phone"]').mask('(00) 00000-0000');

  mixpanel.init("9dd057a151c2e45ac2cdfe78ef57cda8");
  mixpanel.track("Home");
  $('#_form_13_').submit(function(e){
    e.preventDefault();
    var $form = $(this);
    mixpanel.track(
      "Formulário",
      {'Nome': $form.find('input[name=name]').val(),
      'Email': $form.find('input[name=email]').val(),
      'Telefone': $form.find('input[name=phone]').val(),
      'Empresa': $form.find('input[name=empresa]').val(),
      'Site': $form.find('input[name=site]').val(),
      'Mensagem': $form.find('input[name=mensagem]').val()}
    );

    console.log('form enviado')

    gtag_report_conversion();
    uet_report_conversion();
  });

  $('[data-form-phone]').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://api.airtable.com/v0/appw5XAEUdvfP8zSU/Telefones?api_key=keyvd6spdHbHanaHb",
      dataType: 'json',
      data: {
        "fields": {
          "Telefone": $(this).find('[name="phone"]').val()
        }
      }
    }).done(function (resp) {
      console.info('success');
      $('[data-form-phone]').find('.msg-success').addClass('active')
      setTimeout(function () {
        $('[data-form-phone]').find('.msg-success').removeClass('active')
      }, 3500);
      $('[data-form-phone]')[0].reset()
    }).fail(function () {
      $('[data-form-phone]').find('.msg-error').addClass('active')
      setTimeout(function () {
        $('[data-form-phone]').find('.msg-error').removeClass('active')
      }, 3500);
    });

    console.log('form telefone enviado')

    uet_report_conversion2();
  })
  

  if($('body').hasClass('page-home')){
    var steamGrp = [steamLeft, steamRight, steamMid],
      steamLeft = $('svg #steam-left'),
      steamRight = $('#steam-right'),
      steamMid = $('#steam-mid'),
      svg = $('svg'),
      rotate = new TimelineMax({paused:false, repeat: -1}),
      pulse = new TimelineMax({paused:false, repeat: -1, yoyo:true}),
      rise = new TimelineMax({paused:false, repeat: -1});

    rotate.to([steamLeft, steamRight, steamMid], 2, {rotationY:"+=360deg", transformOrigin:"50% 50%", ease: Linear.easeOut});
    
    pulse.set([steamLeft, steamRight, steamMid], {opacity: "0", ease: Linear.easeInOut}).to([steamLeft, steamRight, steamMid], 1.5, {opacity: ".75", ease: Linear.easeInOut});
    
    rise.staggerTo([steamMid, steamLeft, steamRight], 2, {y: "-=50px", ease: Linear.easeOut}, .5);

    var hash_url = document.location.hash;
    console.log('oie')
    if (hash_url != '') {
      var scr = $(hash_url).offset().top - 50;    
      $('html').animate({
        scrollTop: scr
      }, 1000);
    }
  }

  $('.question h6').on('click', function(){
    if ($(this).closest('.question').find('.text').height() == 0){
      $(this).closest('.question').find('.text').height($(this).closest('.question').find('.text').find('div').height())
      $(this).addClass('open')
    } else{
      $(this).closest('.question').find('.text').height(0)
      $(this).removeClass('open')
    }
  })

  console.log('teste')

  $('a').on('click', function(e){
    e.preventDefault();
    
    const queryString = window.location.search;
    var href = $(this).attr('href') + queryString;
    console.log(href);

    if (href.includes('#') && $('.page-home').length > 0) {
      var hash_url = '#' + $(this).attr('href').split('#')[1].split('?')[0];
      console.log("hash_url", hash_url)
      if (hash_url != '') {
        var scr = $(hash_url).offset().top - 50;    
        $('html').animate({
          scrollTop: scr
        }, 1000);
      }
    } else {
      window.location.href = href;
    }
  })

  $(".faq .tab .title-tab").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).closest(".tab").find(".text").height(0);
    } else {
      $(this).addClass("active");
      $(this)
        .closest(".tab")
        .find(".text")
        .height(
          $(this)
            .closest(".tab")
            .find(".text")
            .find("> div")
            .height() + 20
        );
    }
  });
})

