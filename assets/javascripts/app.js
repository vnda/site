$(document).ready(function(){
    $("[data-ancora]").on("click", function(event) {	
        event.preventDefault();	
        var id = $(this).attr('href');
        var offset = $(id).offset().top;
    
        $("html, body").animate({  
            scrollTop: offset
        }, 1000);
    })
    $(".aside a").on("click", function(e) {	
        e.preventDefault();	
        var id = $(this).attr('href');
        location.hash = id;
        $('.aside a').removeClass('active');
        $(this).addClass('active');
        $('.contrato').removeClass('active');
        $(id).addClass('active');
    })
    if(location.hash != null && location.hash != "") {
        var id = location.hash;	    
        $('.aside a').removeClass('active');
        $('[href="' + id + '"]').addClass('active');
        $('.contrato').removeClass('active');
        $(id).addClass('active');
    }
    $(window).on('hashchange', function(e){
        if(location.hash != null && location.hash != "") {
            var id = location.hash;	
            $('.aside a').removeClass('active');
            $('[href="' + id + '"]').addClass('active');
            $('.contrato').removeClass('active');
            $(id).addClass('active');
        }
    });
    $('[data-troca]').each(function(index, el){        
        var palavras = [];
        palavras.push($(el).data('palavra1'));
        palavras.push($(el).data('palavra2'));
        palavras.push($(el).data('palavra3'));

        var i = 1;

        setInterval(function(){ 
            if (i > 2){
                i = 0;
            }
            $(el).text(palavras[i]);
            i++;
        }, 3000);
    });     
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
                url: "https://vnda-73a877.pipedrive.com/v1/organizations?api_token=9fafcfdb813f588d78256ee1d7e105d0735c633c",
                data: 'name=' + $form.find('input[name=empresa]').val(), 
                type: 'post',
                beforeSend: function (){
                    $form.addClass('enviando');
                    $form.find('button').text('Enviando...');
                },
                success: function(result){
                    $.ajax({
                        url: "https://vnda-73a877.pipedrive.com/v1/persons?api_token=9fafcfdb813f588d78256ee1d7e105d0735c633c",
                        data: '&name=' + $form.find('input[name=name]').val() + '&email=' + $form.find('input[name=email]').val() + '&phone=' + $form.find('input[name=phone]').val() + '&org_id=' + result.data.id, 
                        type: 'post',
                        beforeSend: function (){
                            $form.find('button').text('Enviando...');
                        },
                        success: function(result){
                            $.ajax({
                                url: "https://vnda.pipedrive.com/v1/deals?api_token=9fafcfdb813f588d78256ee1d7e105d0735c633c",
                                data: 'title=' + result.data.name + '&person_id=' + result.data.id + '&org_id=' + result.data.org_id.value, 
                                type: 'post',
                                beforeSend: function (){
                                    $form.find('button').text('Enviando...');
                                },
                                success: function(result){
                                    $.ajax({
                                        url: "https://vnda.pipedrive.com/v1/notes?api_token=9fafcfdb813f588d78256ee1d7e105d0735c633c",
                                        data: 'content=' + $form.find('textarea[name=mensagem]').val() + ' ' + $form.find('input[name=site]').val() + '&deal_id=' + result.data.id, 
                                        type: 'post',
                                        beforeSend: function (){
                                            $form.find('button').text('Enviando...');
                                        },
                                        success: function(result){
                                            console.log('success');
                                            console.log(result);
                                            $form.find('button').text('Enviado!');
                                            $form.find('input[name=name]').val("");
                                            $form.find('input[name=phone]').val("");
                                            $form.find('input[name=email]').val("");
                                            $form.find('input[name=cd6b63656390d27b71205a07369a4040c6025732]').val("");
                                            $form.find('input[name=e06c1903d6581284343d0561afa2974260f638b3]').val("");
                                            $form.find('textarea[name=38ed3c827dccbf42ed7b1fe6ebddcaeed3df9c95]').val("");
                                            setTimeout(function(){
                                                $form.find('button').text('Enviar!');
                                            }, 3000);
                                            
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
                    $form.removeClass('enviando');
                }
            });
        }
    });
    var swiper = new Swiper($('.slider-cases'), {
        slidesPerView: 1,
        spaceBetween: 0,
        simulateTouch: true,
        effect: 'fade',
        navigation: {
            nextEl: $('.cases-carrossel').find('.swiper-button-next'),
            prevEl: $('.cases-carrossel').find('.swiper-button-prev'),
        },
    });

    var windowSel = $(window);
      // parallax
      function parallax(selector, speed) {
        var movement = -(windowSel.scrollTop() * (speed / 10));
        //console.info(movement);
        $(selector).css('transform', 'translate3d(0,' + movement + 'px, 0');
      }
      // parallax init
      function parallaxInit(selector) {
        //if ($(selector).length && window.innerWidth > 1024) {
          $(selector).each(function (i, el) {
            var speed = $(el).attr('data-speed');
            //init function on load
            parallax($(el), speed);
            // init function on scroll
            windowSel.on('scroll', function () {
              parallax($(el), speed);
            });
          });
        //}
      }
      var parallaxItem = '[data-parallax]';
      console.log(parallaxItem)
      parallaxInit(parallaxItem);
});