let swr= $('.content .container button');
/*search*/
let swrsearchingarr = [
    "ALFATIHA","ALBAQARAH","ALIMRAN","AnNisa’","AlMa’idah","AlAn’am"," AlA’raf","AlAnfal"," AtTaubah","Yunus","Hud","Yusuf","ArRa’d","Ibrahim"
    ,"AlHijr","AnNahl","AlIsra’","AlKahf","Maryam","Ta-Ha","AlAnbiya’","Al-Haj","AlMu’minun","AnNur","AlFurqan"," AshShu’ara","AnNaml","AlQasas"
    ,"AlAnkabut","ArRum","Luqman","AsSajdah","AlAhzab","Saba’","AlFatir","YaSin","AsSaffah","Sad","AzZumar","Ghafar","Fusilat","AshShura","AzZukhruf"
    ,"AdDukhan","AlJathiyah","AlAhqaf","Muhammad","AlFat’h","AlHujurat","Qaf","AdzDzariyah","AtTur","AnNajm","AlQamar","ArRahman ","AlWaqi’ah"
    ,"AlHadid","AlMujadilah ","AlHashr","AlMumtahanah","AsSaf","AlJum’ah","AlMunafiqun","AtTaghabun","AtTalaq","AtTahrim","AlMulk","AlQalam"
    ,"AlHaqqah","AlMa’arij","Nuh","Al-Jinn","AlMuzammil","AlMudaththir","AlQiyamah","AlInsan","AlMursalat","AnNaba’","AnNazi’at","Abasa","AtTakwir"
    ,"AlInfitar","AlMutaffifin","AlInshiqaq","AlBuruj","AtTariq","AlA’la","AlGhashiyah","AlFajr","AlBalad","AshShams"," AlLayl"
    ,"AdhDhuha ","AlInshirah","AtTin","Al‘Alaq","Al‘Alaq","AlBayinah","AzZalzalah","Al‘Adiyah "," AlQari’ah","AtTakathur","Al‘Asr"
    ,"AlHumazah","AlFil","Quraish","AlMa’un","AlKauthar","AlKafirun","AnNasr","AlMasad","AlIkhlas","AlFalaq","AnNas"
];
$('#search').on('change', function(){
    for(let i = 0; i < 144; i++){
        $(swr[i]).show(400);
    }
    function clearsearch(){
        document.getElementById("search").value='';
    }
    let val = $('#search').val().toLowerCase();
    for(let i = 0; i < 144; i++){
        if(!(swrsearchingarr[i].toLowerCase().includes(val)))
        {
                $(swr[i]).hide(500)
        }
}
}
);

/*search*/ 
let audio;
//onclick on swra
for(let i=0;i<144;i++){
    $(swr[i]).click(function () { 
        $('.content .container').addClass('position-absolute');
        $('.section2').removeClass('d-none');
        $('.container').animate({
            left:'-200%'
        },'slow')
        $('.section2').animate({

            right:'0%',
            transition:'translatex(-50%)'
        },'slow')
        $('.content').height('fit-content');
        $('.section2').width('100%');
        $('.content .container').hide(1000);
        $('.content').removeClass('overflow-hidden');       
        $('.section2').removeClass('position-absolute');
        setTimeout(() => {
            $('.content .container button').hide();
        }, 1000);
        $('.quran').show();
        quran(i+1);
        audio=i+1;
    });
}
//onclick on swra

/*audio function*/ 


/*audio function*/ 
async function quran(aya){
    let sura;//to be used in all quran functions
    await fetch(`https://quranenc.com/api/v1/translation/sura/english_saheeh/${aya}`)
    .then((response) => response.json()).then((result) =>{
        sura=result.result;
    });

    for(let i=0; i<sura.length;i++){
        fetch(`https://cdn.islamic.network/quran/images/high-resolution/${aya}_${i+1}.png`)
        .then(response => response.blob())
        .then(blob => {
            let img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            $('.quran').append(img); 
        });
    }
    /*audio call*/

    /*audio call     
           let ctx = new AudioContext();
            playback(ctx,aya);
            */
    /*translate*/
    let translate=false;
        $('.translate').click(function () { 
            if(!translate){
                for(let i=0;i<sura.length;i++){
                    $('.quran img').slideUp(1000);
                    $('.quran').append(`<p>${sura[i].translation}</p>`);
                    setTimeout(() => {
                        $('.quran').css('align-items', 'start')
                    }, 600);
                }
                translate=true;
            }
            else{
                translate=false;
                
                $('.quran p' ).remove();
                $('.quran p').slideUp(1000);
                setTimeout(() => {
                    $('.quran').css('align-items', 'end')
                }, 1000);
                $('.quran img').slideDown(1000);
            }
        });
    /*translate*/
}
function playback(ctx,aya) {
    let isPlaying= false;
if (!isPlaying) {
    isPlaying = true;
    let playSound = ctx.createBufferSource();
    fetch(`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${aya}.mp3`)
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
        playSound.buffer = decodedAudio;
        playSound.connect(ctx.destination);
        playSound.start(ctx.currentTime + 1);
        playSound.onended = () => {
        isPlaying = false;
        };
    });
}
}
$('.audio').click(function () {
    let ctx = new AudioContext();
    playback(ctx,audio);
});




////////quran//////////
$('.back').click(function () { 
    $('.quran').slideUp(1000);
    setTimeout(() => {
        $('.quran').hide();
        $('.quran img').remove();
        $('.quran p').remove();
        $('.section2').addClass('position-absolute');
        $('content').removeClass('d-flex');
        $('.section2').animate({
            right:'-100%',
            left:'auto !important'
        });
    }, 1000);
    setTimeout(() => {
        $('.content .container button').show();
        $('.content .container').addClass('position-absolute');
        $('.content .container').animate({
            left:'-5%',
            right:'0%',
            top:'-17px'
        },'slow')
        setTimeout(() => {
            $('.content .container').removeClass('position-absolute');
        }, 1000.1);
    }, 1000);

});