



$(document).ready(function() {
////get session user /////////////
$.post('/limitless/layout_5/LTR/default/sessioninfo.php', JSON.stringify(['username'])).fail(function(data) {
        
        console.dir(data);
    }).done(function(data) {
        console.dir(data);

    });

////get the number of notifications /////////////
$.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['NOTIF_NUM',])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
        var notifnum=data[0].notifnum;
        
        $('#notifnum').append('<p id="notifcount">'+notifnum+'</p>');

    });


////// changing the status of a notif grom unread to read
$(document).on('click','#readnotif',function()
{

     var classit= parseInt($(this).children("i").attr("class").split('f')[1]);
     var checkid=".check"+classit.toString();
     $(checkid).show();
 var notifcount=document.getElementById("notifcount").innerHTML;
 $('#notifnum').children("p").remove();
$('#notifnum').append('<p id="notifcount">'+(notifcount-1)+'</p>');

     $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['READ_NOTIF', {
            'N_STATUS': "READ"},classit])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
     }).done(function(data) {
       console.dir(data);  
         
        });
        
});



/////getting the notifications when clicking on the bell
    $(document).on('click','#notifopen',function(){


    
    $('#notifications').children("li").remove();
  

  $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['GET_NOTIF','UNREAD'])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
        data.forEach(function(element) {
          console.dir(element);
            $('#notifications').append('<li class="media" style="text-transform: uppercase;"><div class="media-left"><a href="#" class="btn bg-success-400 btn-rounded btn-icon btn-xs"><i class="icon-mention"></i></a></div><div class="media-body"><a href="#">'+element.N_SENDER+'</a> APROPS <a href="#" style="color: red;">'+element.N_TOPIC+'</a><a href="#" style="color: blue;float:right;" id="readnotif"><span><i style="Display:none;" class=" icon-checkmark-circle check'+element.N_ID+'"></i></span><i class="icon-thumbs-up3 notif'+element.N_ID+'"></i></a><div class="media-annotation">'+element.N_MESSAGE+'</div></div></li>');
            
            
        });
        
    });
});

///show the notification form
$(document).on('click','#Notifier',function(){

$('#notificationsubmitform').show();
});
  /////// hide the notification  form 
$(document).on('click','#close',function(){
$('#notificationsubmitform').hide();
});

/////saving notification in db
$(document).on('click','#notifsubmit',function(){
 $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['ADD_NOTIF', {
            'N_SENDER': $('#notif_nom').val(),
            'N_TOPIC':$('#notif_sujet').val(),
            'N_MESSAGE': $('#notif_msg').val(),
            'N_STATUS': ("UNREAD"),
            'N_RECEIVER': ("CDT")
            
             
        }])).fail(function(data) {
            console.log('fail');
            console.dir(data);
        }).done(function(data) {
            //console.log(data);
            $('#notificationsubmitform').hide();
            $('#notifcheck').show();

            setTimeout(function () {
            $('#notifcheck').hide();
            }, 6000);
            
           /* $('#TAB_MIG').DataTable().ajax.reload();*/
        });
    });



 if (window.location.pathname == '/limitless/layout_5/LTR/default/stat.html') {



///get statistiques from database 
 $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['SEARCH_STAT',])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
       console.dir(data);
       var totalnum=(data[0][0].totalnum);
       var offnum=(data[1][0].offnum);
       var sousoffnum=(data[2][0].sousoffnum);
       var hommedetroupnum=totalnum-offnum-sousoffnum;
       var malenum =(data[3][0].malenum);
       var femalenum=totalnum-malenum;
     
////// first bar chart effectif par nombre
           var bar_chart = c3.generate({
        bindto: '#c3-bar-chart',
        size: { height: 324 },
        data: {
            columns: [
                ['Officier', offnum],
                ['Sous Off', sousoffnum],
                ['homme de troupe', hommedetroupnum]
            ],
            type: 'bar'
        },
        color: {
            pattern: ['#2196F3', '#FF9800', '#4CAF50']
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        grid: {
            y: {
                show: true
            }
        }
    });



    // Pie chart
    // ------------------------------

    // Generate chart
    ///effectif par %
    var pie_chart = c3.generate({
        bindto: '#c3-pie-chart',
        size: { width: 350 },
        color: {
            pattern: ['#3F51B5', '#FF9800', '#4CAF50', '#00BCD4', '#F44336']
        },
        data: {
            columns: [
                 ['Officier', offnum],
                ['Sous Off', sousoffnum],
                ['homme de troupe', hommedetroupnum]
            ],
            type : 'pie'
        }
    });


 var bar_chart = c3.generate({
        bindto: '#piex',
        size: { height: 324 },
        data: {
            columns: [
                ['M', malenum],
                ['F', femalenum],
            ],
            type: 'bar'
        },
        color: {
            pattern: ['#3F51B5', '#fb00ff', '#4CAF50']
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        grid: {
            y: {
                show: true
            }
        }
    });



    // Pie chart
    // ------------------------------
/////////effectif par sex
    // Generate chart
    var pie_chart = c3.generate({
        bindto: '#effectifpercent',
        size: { width: 350 },
        color: {
            pattern: ['#3F51B5', '#fb00ff', '#4CAF50', '#00BCD4', '#F44336']
        },
        data: {
            columns: [
                ['M', malenum],
                ['F', femalenum],
            ],
            type : 'pie'
        }
    });
        });
    
}


//bootstrap-uploader
        $("#images").fileinput({
        uploadAsync: false,
        uploadUrl: "http://localhost/limitless/layout_5/LTR/default/upload.php", // your upload server url
        uploadExtraData: function() {
            return {
                username: $("#username").val()
            };
        }
    });
//bootstrap-uploader

       // Override defaults
    $.fn.selectpicker.defaults = {
        iconBase: '',
        tickIcon: 'icon-checkmark3'
    }
    // Basic setup
    // ------------------------------

    // Basic select
    $('.bootstrap-select').selectpicker();


//// Display all information of personnel
$(document).on('click','#voirpluspersonnel',function(){
   // alert($(this).attr('name')); 

    $('#infopopup').show();
    $('#popupimage').children("img").remove();
    $('#popupname').children("p").remove();
    $('#pupopbd').children("p").remove();
    $('#popuplocation').children("p").remove();
    $('#popupengagement').children("p").remove();

  $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['SEARCH_ONE_PERSONNEL',$(this).attr('name')])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
        data.forEach(function(element) {
          console.dir(element);
            $('#popupimage').append('<img style="margin-top:15px;height: 150px;" src="uploads/'+element.P_IMAGE+'.jpg" class="" alt="">');
            $('#popupname').append('<p style="text-transform: uppercase;">'+element.P_NAME+'</p>');
            $('#pupopbd').append('<p style="text-transform: uppercase;">'+element.P_BIRTHDATE+'</p>');
            $('#popuplocation').append('<p style="text-transform: uppercase;">'+element.P_LOCATION+'</p>');
            $('#popupengagement').append('<p style="text-transform: uppercase;">'+element.P_ENGAGEMENT+'</p>');
        });
        
    });
});


/////Perform search by service
    $(document).on('click','#BTN_SEARCHBYSERVICE',function(){
    //alert($(this).attr('name')); 
    

  $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['SEARCH_BY_SERVICE',$(this).attr('name')])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);

    }).done(function(data) {
        $('#effectif_list').children(".media").remove();
        data.forEach(function(element) {
          console.dir(element);
            $('#effectif_list').append('<li class="media"><div class="media-left"><a href="#"><img style="margin-top:15px;" src="uploads/'+element.P_IMAGE+'.jpg" class="img-circle img-md" alt=""></a></div><div class="media-body"><h3 class="media-heading">'+element.P_NAME+'</h3>' + element.P_POSITION + '</br>'+element.P_PHONE+'<button style="float: right;right: 100px;margin-top: -30px;" type="button" id="voirpluspersonnel" name="'+element.P_NAME+'" class="btn btn-primary btn-icon btn-rounded"><i class=" icon-arrow-right13"></i>Voir Plus</button> </div></li></p>');
        });
        
    });


});

  /////// hide the popup info  
$(document).on('click','#close',function(){
$('#infopopup').hide();
});

//search personnel
$('#BTN_PERSONNEL_SEARCH').on('click', function() {
 //alert('clicked');
        $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['SEARCH_PERSONNEL'])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
        $('#effectif_list').children(".media").remove();
        data.forEach(function(element) {
          console.dir(element);
            $('#effectif_list').append('<li class="media"><div class="media-left"><a href="#"><img style="margin-top:15px;" src="uploads/'+element.P_IMAGE+'.jpg" class="img-circle img-md" alt=""></a></div><div class="media-body"><h3 class="media-heading">'+element.P_NAME+'</h3>' + element.P_POSITION + '</br>'+element.P_PHONE+'<button style="float: right;right: 100px;margin-top: -30px;" type="button" id="voirpluspersonnel" name="'+element.P_NAME+'" class="btn btn-primary btn-icon btn-rounded"><i class=" icon-arrow-right13"></i>Voir Plus</button> </div></li></p>');
        });
        
    });
 });




   

       
 
    



});