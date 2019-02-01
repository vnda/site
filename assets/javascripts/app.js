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
        }, 1500);
    });
});