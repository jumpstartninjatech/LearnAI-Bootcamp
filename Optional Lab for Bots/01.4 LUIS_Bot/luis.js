require('dotenv-extended').load();
var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
   
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);



var LuisModelUrl=process.env.LuisModelUrl;

 var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Book', [(session,args,results) => {
	if(args.entities.length>0)
	{ 

          var book=false;
	      var date=false;
	      var time=false;
	      var movie_name=false;
	      var movie=false;
	      var tickets=false;
          var tickets_quantity=false;
          var movie=false;
          session.userData.movie_name=null;
          session.userData.time=null;
          session.userData.date=null;
          session.userData.quantity=null;



          for(var i=0;i<args.entities.length;i++)
           {
           	   console.log("I am in for loop");
    	       if(args.entities[i].type=='Movie_Name'){
    	            movie_name=true;
    	            session.userData.movie_name=args.entities[i].entity;
    	            console.log("I am in",session.userData.movie_name);
    	       }else if(args.entities[i].type=='Book'){
    		          book=true;
    	       }else if(args.entities[i].type=='builtin.datetimeV2.time'){
    		          time=true;
                      session.userData.time=args.entities[i].entity;
    	       }else if(args.entities[i].type=='builtin.datetimeV2.date'){
                      date=true;
                      session.userData.date=args.entities[i].entity;
    	       }else if(args.entities[i].type=='Tickets'){
    		          tickets=true;
    	       }else if(args.entities[i].type=='Movie'){
                     movie=true;
    	       }

              if((args.compositeEntities.length>0)&&(i==0)){

        	         if(args.compositeEntities[i].children[i].type=='builtin.number'){
                          Tickets_quant=false;
                          session.userData.quantity=args.compositeEntities[i].children[i].value; 
		              }
                }
            }
            

            if((book=true)&&((movie==true)||(movie_name==true)))
            {
            	check_entities(session);
            }else{
              session.send("I can help you to book movie tickets only.");	
            }


	}else{
       
              session.send("I can help you to book movie tickets only.");   
   
	}
    
}]);

bot.dialog('/', intents);  


//This function is used for checking entities
function check_entities(session){

	if((session.userData.movie_name==null)||(session.userData.movie_name=="")||(session.userData.movie_name==undefined)){
		session.beginDialog("/get_movie_name");
	}else if((session.userData.time==null)||(session.userData.time=="")||(session.userData.time==undefined)){
        session.beginDialog("/get_show_time");
	}else if((session.userData.date==null)||(session.userData.date=="")||(session.userData.date==undefined)){
        session.beginDialog("/get_show_date");
	}else if((session.userData.quantity==null)||(session.userData.quantity=="")||(session.userData.quantity==undefined) ){
        session.beginDialog("/get_no_seats");
	}else{
		session.send("Tickets are booked.");
	}

}


//This dialog is used for getting movie name
bot.dialog("/get_movie_name",[
	function(session)
	{
     builder.Prompts.text(session,"Please enter name of movie.")
	},
	function(session,results)
	{
		session.message.text=results.response;
		builder.LuisRecognizer.recognize(session.message.text,LuisModelUrl,function (err, intents, entities) {
			if(err){
            console.log("error is :",err);
			}else{
                 var movie_name=false;
				if(entities.length>0)
				{
					for(var i=0;i<entities.length;i++)
					{
						if(entities[i].type=='Movie_Name'){
						   session.userData.movie_name=entities[i].entity;
						   movie_name=true;

						}
					}

					if(movie_name==true)
					{
						check_entities(session);
					}else{
                      session.beginDialog("/get_movie_name");
					}
                 
				}
				else{
				 session.beginDialog("/get_movie_name");
				}
			

			}

		})
	}
	]);

//This dialog is used for getting showtime
bot.dialog("/get_show_time",[
	function(session)
	{
     builder.Prompts.text(session,"Please enter show time of movie.")
	},
	function(session,results)
	{
		session.message.text=results.response;
		builder.LuisRecognizer.recognize(session.message.text,LuisModelUrl,function (err, intents, entities) {
			if(err){
            console.log("error is :",err);
			}else{
                 var time=false;
				if(entities.length>0)
				{
					for(var i=0;i<entities.length;i++)
					{
						if(entities[i].type=='builtin.datetimeV2.time'){

                         console.log("I came in airline section");
						   session.userData.time=entities[i].entity;
						   time=true;

						}
					}

					if(time==true)
					{
						check_entities(session);
					}else{
                      session.beginDialog("/get_show_time");
					}
                 
				}
				else{
				 session.beginDialog("/get_show_time");
				}
			

			}

		})
	}
	]);


//This dialog is used for getting show date
bot.dialog("/get_show_date",[
	function(session)
	{
     builder.Prompts.text(session,"Please enter show date of movie.")
	},
	function(session,results)
	{
		session.message.text=results.response;
		builder.LuisRecognizer.recognize(session.message.text,LuisModelUrl,function (err, intents, entities) {
			if(err){
            console.log("error is :",err);
			}else{
				console.log("what is there in intents",intents);
				console.log("what is there in entities",entities);
                 var date=false;
				if(entities.length>0)
				{
					for(var i=0;i<entities.length;i++)
					{
						if(entities[i].type=='builtin.datetimeV2.date'){

                         console.log("I came in airline section");
						   session.userData.date=entities[i].entity;
						   date=true;

						}
					}

					if(date==true)
					{
						check_entities(session);
					}else{
                      session.beginDialog("/get_show_date");
					}
                 
				}
				else{
				 session.beginDialog("/get_show_date");
				}
			

			}

		})
	}
	]);

//This dialog is used for getting number of seats.
bot.dialog("/get_no_seats",[
	function(session)
	{
     builder.Prompts.text(session,"Please enter number of seats you would like to book.")
	},
	function(session,results)
	{
		session.message.text=results.response;
		builder.LuisRecognizer.recognize(session.message.text,LuisModelUrl,function (err, intents, entities) {
			if(err){
            console.log("error is :",err);
			}else{
				console.log("what is there in intents",intents);
				console.log("what is there in entities",entities);
                 var number=false;
				if(entities.length>0)
				{
					for(var i=0;i<entities.length;i++)
					{
						if(entities[i].type=='builtin.number'){
                           console.log("I came in airline section");
						   session.userData.quantity=entities[i].entity;
						   number=true;

						}
					}

					if(number==true)
					{
						check_entities(session);
					}else{
                      session.beginDialog("/get_no_seats");
					}
                 
				}
				else{
				 session.beginDialog("/get_no_seats");
				}
			

			}

		})
	}
	]);





