$( ".img_data" ).on(
    "change",
    function()
    {
        if( $('.img_data').val() !== '' )
        {

        }
    }
);
var data_arr;
let chart_data_arr;
var data_arr_real;
let xlength;
let ylength;
let canvas;
let canvas2;
let whichAcsis = 'x';
let position_img;
let position_chart;
let img_generated = false;
let nearest_data_find = 0;
let chart2d_data = [];
// let div2 = new $($('div')[0]);
// div2.html('');

function readURL(e)
{
    $('.img-conteiner').removeClass('hidden');
    data_arr = Create2DArray(70);
    chart_data_arr = [];
    // $('.system-info-center').html('<h1>Обробка зображення, зачекайте </h1>');
    if (this.files && this.files[0])
    {
        var reader = new FileReader();
        $(reader).load(function (e)
        {
            $('#container').html(' ');
            $('#upload-img').attr('src', e.target.result);
            let img = new Image();
            img.src = e.target.result;
            img.onload =function ()
            {
                canvas = document.createElement('canvas');
                canvas2 = document.createElement('canvas');
                xlength = img.width;
                ylength = img.height;
                $('#line-img').css('height', ylength+'px');

                let temp_pos = $('#upload-img').offset();
                // console.info(position_img);
                canvas2.width = xlength;
                canvas2.height = ylength;
                canvas.width = img.width;
                canvas.height = img.height;
                data_arr_real = Create2DArray(xlength);
                //canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
                canvas2.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
                canvas.getContext('2d').drawImage(img, 0, 0, 70, 70);
                let time= +new Date();
                let outs = 0;
                for( let y = 0; y < ylength; y++ )
                {
                    for( let x = 0; x < xlength; x++ )
                    {
                        data_arr_real[y][x] = canvas.getContext('2d').getImageData(x, y, 1, 1).data[0];
                       // console.info('data_arr_real[y,x]',  data_arr_real[y][x], 'x='+x, 'y='+y);
                    }

                     console.info(y+'/' +ylength);
                    // $('#text_loading_status').html(y+'/' +ylength);
                    if(outs > 4000){
                        outs = 0;
                        setTimeout(doWork, 1);
                    }
                    outs++;
                }
                console.info(  data_arr_real);
                console.info(  data_arr_real[50][21]);
                let time2= +new Date();
                console.info('loading_time', time-time2 );
                // get the pixel data and callback
                // for( let y = 0; y < 70; y++ )
                // {
                //     for( let x = 0; x < 70; x++ )
                //     {
                //         data_arr[y][x] = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                //         chart_data_arr.push([x, y, data_arr[y][x][0]]);
                //     }
                // }
                //console.info(chart_data_arr);

                console.info('done');
                $('.system-info-center').html(' ');
            };

        });
        reader.readAsDataURL(this.files[0]);
    }
}

function Create2DArray(rows) {
    let arr = [];

    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }

    return arr;
}
$("#file-input").change(readURL);

