/* ------------------------------------------------------------------------------
*
*  # Fullcalendar basic options
*
*  Specific JS code additions for extra_fullcalendar_views.html and 
*  extra_fullcalendar_styling.html pages
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */


       var eventColors = [
      {
            id: 999,
            title: 'Repeating Event',
            start: '2017-11-06T01:40:00'
        },
       
                         ];

function addoneday(Sttingx)
{   
    var dt = new Date(Sttingx);
    dt.setDate(dt.getDate() + 1);
    var returnstring=dt.toISOString().slice(0,10);
    return returnstring;
}


$(function() {

$(document).on('click','#eventaddbtn',function(){
            
           alert('clicked');
               $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['ADD_EVENT', {
            'color': $('#eventcolor').val(),
            'end':$('#eventend').val(),
            'hint': $('#eventhint').val(),
            'Service': $('#eventservice').val(),
            'start': $('#eventstart').val(),
            'title': $('#eventname').val()

             
        }])).fail(function(data) {
            console.log('fail');
            console.dir(data);
        }).done(function(data) {
            //console.log(data);
            alert('event added');
            
           /* $('#TAB_MIG').DataTable().ajax.reload();*/
        });
        
    });
    // Add events
    // ------------------------------

    // Default events
    var events = [];


    
  
    
 

    

  $.post('/limitless/layout_5/LTR/default/denatphpcontroller.php', JSON.stringify(['GET_EVENT'])).fail(function(data) {
        console.log('fail' + data);
        console.dir(data);
    }).done(function(data) {
        data.forEach(function(element) {
           
          console.dir(element);
          eventColors.push({ title: element.title,
                             start: element.start,
                             end: addoneday( element.end),
                             color: element.color});
                          });
        

    // Event background colors
    var eventBackgroundColors = [
        {
            title: 'All Day Event',
            start: '2017-11-01'
        },
        {
            title: 'Long Event',
            start: '2017-11-07',
            end: '2017-11-10',
            color: '#DC9000',
            rendering: 'background'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-11-06T16:00:00'
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: '2017-11-16T16:00:00'
        },
        {
            id:999,
            title: 'Conference',
            start: '2017-11-11',
            end: '2017-11-13'
        },
        {
            title: 'Meeting',
            start: '2017-11-12T10:30:00',
            end: '2017-11-12T12:30:00'
        },
        {
            title: 'Lunch',
            start: '2017-11-12T12:00:00'
        },
        {
            title: 'Happy Hour',
            start: '2017-11-12T17:30:00'
        },
        {
            title: 'Dinner',
            start: '2017-11-24T20:00:00'
        },
        {
            title: 'Meeting',
            start: '2017-11-03T10:00:00'
        },
        {
            title: 'Birthday Party',
            start: '2017-11-13T07:00:00'
        },
        {
            title: 'Vacation',
            start: '2017-11-27',
            end: '2017-11-30',
            color: 'blue',
            rendering: 'background'
        }
    ];



    // Initialization
    // ------------------------------

    // Basic view
    $('.fullcalendar-basic').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2017-11-12',
        editable: true,
        events: events
    });


    // Agenda view
    $('.fullcalendar-agenda').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2017-11-12',
        defaultView: 'agendaWeek',
        editable: true,
        businessHours: true,
        events: events
    });


    // List view
    $('.fullcalendar-list').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'listDay,listWeek,listMonth'
        },
        views: {
            listDay: { buttonText: 'Day' },
            listWeek: { buttonText: 'Week' },
            listMonth: { buttonText: 'Month' }
        },
        defaultView: 'listMonth',
        defaultDate: '2017-11-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: events
    });


    // Event colors
    $('.fullcalendar-event-colors').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2017-11-12',
        editable: true,
        events: eventColors
    });


    // Event background colors
    $('.fullcalendar-background-colors').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2017-11-12',
        editable: true,
        events: eventBackgroundColors
    });
    });

       







});