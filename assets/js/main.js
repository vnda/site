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
        spaceBetween: 30
      },
      480: {
        spaceBetween: 45
      },
      640: {
        spaceBetween: 60
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
  $('#form-contato').submit(function(e){
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
    if (!$form.hasClass('enviando')){
      $.ajax({
        url: "https://vnda-73a877.pipedrive.com/v1/organizations?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
        data: 'name=' + $form.find('input[name=empresa]').val(), 
        type: 'post',
        beforeSend: function (){
          $form.addClass('enviando');
          $form.find('button').text('Enviando...');
        },
        success: function(result){
          $.ajax({
            url: "https://vnda-73a877.pipedrive.com/v1/persons?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
            data: '&name=' + $form.find('input[name=name]').val() + '&email=' + $form.find('input[name=email]').val() + '&phone=' + $form.find('input[name=phone]').val() + '&org_id=' + result.data.id, 
            type: 'post',
            beforeSend: function (){
              $form.find('button').text('Enviando...');
            },
            success: function(result){
              $.ajax({
                url: "https://vnda.pipedrive.com/v1/deals?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
                data: 'title=' + result.data.name + '&person_id=' + result.data.id + '&org_id=' + result.data.org_id.value, 
                type: 'post',
                beforeSend: function (){
                  $form.find('button').text('Enviando...');
                },
                success: function(result){
                  $.ajax({
                    url: "https://vnda.pipedrive.com/v1/notes?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
                    data: 'content=' + $form.find('textarea[name=mensagem]').val() + ' ' + $form.find('input[name=site]').val() + '&deal_id=' + result.data.id, 
                    type: 'post',
                    beforeSend: function (){
                      $form.find('button').text('Enviando...');
                    },
                    success: function(result){
                      console.log('success');
                      console.log(result);
                      $form.find('button').text('Enviado!');
                      $form[0].reset();
                      setTimeout(function(){
                        $form.find('button').text('Enviar!');
                      }, 3000);           
                      $form.find('.msg-success').addClass('active')
                      setTimeout(function () {
                        $form.find('.msg-success').removeClass('active')
                      }, 3500);                     
                    }, 
                    error: function(error){
                      console.log('error');
                      console.log(error);
                      $form.find('button').text('Erro! Tente novamente.');
                    },
                    complete: function(){
                      console.log('Complete');
                    }
                  });
                }, 
                error: function(error){
                  console.log('error');
                  console.log(error);
                  $form.find('button').text('Erro! Tente novamente.');
                },
                complete: function(){
                  console.log('Complete');
                }
              });
            }, 
            error: function(error){
              console.log('error');
              console.log(error);
              $form.find('button').text('Erro! Tente novamente.');
              $form.find('.msg-error').addClass('active')
              setTimeout(function () {
                $form.find('.msg-error').removeClass('active')
              }, 3500);
            },
            complete: function(){
              console.log('Complete');
            }
          });
        }, 
        error: function(error){
          //console.log('error');
          //console.log(error);
          //$form.find('button').text('Erro! Tente novamente.');
          $.ajax({
            url: "https://vnda-73a877.pipedrive.com/v1/persons?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
            data: '&name=' + $form.find('input[name=name]').val() + '&email=' + $form.find('input[name=email]').val() + '&phone=' + $form.find('input[name=phone]').val(), 
            type: 'post',
            beforeSend: function (){
              $form.find('button').text('Enviando...');
            },
            success: function(result){
              $.ajax({
                url: "https://vnda.pipedrive.com/v1/deals?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
                data: 'title=' + result.data.name + '&person_id=' + result.data.id, 
                type: 'post',
                beforeSend: function (){
                  $form.find('button').text('Enviando...');
                },
                success: function(result){
                  console.log('content=' + $('#form-contato').find('textarea[name=mensagem]').val() + ' ' + $('#form-contato').find('input[name=site]').val() + '&deal_id=' + result.data.id)
                  $.ajax({
                    url: "https://vnda.pipedrive.com/v1/notes?api_token=28747d92b705fb8e0482aaa8a482b4557d1c2270",
                    data: 'content=' + $('#form-contato').find('textarea[name=mensagem]').val() + ' ' + $('#form-contato').find('input[name=site]').val() + '&deal_id=' + result.data.id, 
                    type: 'post',
                    beforeSend: function (){
                      $form.find('button').text('Enviando...');
                    },
                    success: function(result){
                      console.log('success');
                      console.log(result);
                      $form[0].reset()
                      setTimeout(function(){
                        $form.find('button').text('Enviar!');
                      }, 3000);    
                      $form.find('.msg-success').addClass('active')
                      setTimeout(function () {
                        $form.find('.msg-success').removeClass('active')
                      }, 3500);                             
                    }, 
                    error: function(error){
                      console.log('error');
                      console.log(error);
                      $form.find('button').text('Erro! Tente novamente.');
                    },
                    complete: function(){
                      console.log('Complete');
                    }
                  });
                }, 
                error: function(error){
                  console.log('error');
                  console.log(error);
                  $form.find('button').text('Erro! Tente novamente.');
                  $form.find('.msg-error').addClass('active')
                  setTimeout(function () {
                    $form.find('.msg-error').removeClass('active')
                  }, 3500);
                },
                complete: function(){
                  console.log('Complete');
                }
              });
            }, 
            error: function(error){
              console.log('error');
              console.log(error);
              $form.find('button').text('Erro! Tente novamente.');
              $form.find('.msg-error').addClass('active')
                  setTimeout(function () {
                    $form.find('.msg-error').removeClass('active')
                  }, 3500);
            },
            complete: function(){
              console.log('Complete');
            }
          });
        },
        complete: function(){
          console.log('Complete');
          $form.removeClass('enviando');
          //$form[0].reset();
        }
      });
    }
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

  $('.page-home a[href*="#"]').on('click', function(){
    var hash_url = '#' + $(this).attr('href').split('#')[1];

    console.log('oie')
    if (hash_url != '') {
      var scr = $(hash_url).offset().top - 50;    
      $('html').animate({
        scrollTop: scr
      }, 1000);
    }
  })

  $('.question h6').on('click', function(){
    if ($(this).closest('.question').find('.text').height() == 0){
      $(this).closest('.question').find('.text').height($(this).closest('.question').find('.text').find('div').height())
      $(this).addClass('open')
    } else{
      $(this).closest('.question').find('.text').height(0)
      $(this).removeClass('open')
    }
  })

})

