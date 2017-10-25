import * as $ from 'jquery';

export class Activity {
    text: string
}

export class User {
    name: string = "billy";
    activities: Activity[] = [];
 

    drawActivities(){
        $("#activities").html(this.activities.map(x=> `<li class="list-group-item activity_static">${x.text}</li>`).join(""))
    }
}



export class Tracker {
 
    activities: Activity[] = [  ];

    drawActivities(){
        $("#activity_list").html(this.activities.map(x=> `<li class="btn-primary activity">${x.text}</li>`).join(""))
    }

    init(){
        return $.when(

        
        $.getJSON("/activity-tracker/activities").done( data =>{ 
            this.activities = data
            
        })
        
      );
        
    }
}

// Controller
const tracker = new Tracker();

const me = new User();



tracker.init().done(()=>{
    
    
    tracker.drawActivities();
    
    $('.activity').click(function(e){
        e.preventDefault();
       var activity_element = $(this).text();
     const newActivity = new Activity();
     newActivity.text = activity_element;
   me.activities.push(newActivity);
   me.drawActivities();
   
                  });
   

});





