var restify = require('restify');
var builder = require('botbuilder');


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


//Root Dialog execute when user gives any input
bot.dialog("/",[
	function(session)
	{
		builder.Prompts.text(session,"Please enter your name.");
	},
	function(session,results)
	{
		session.userData.name=results.response;
		builder.Prompts.text(session,"Please enter city.");
	},
	function(session,results)
	{
		session.userData.city=results.response;
		builder.Prompts.text(session,"Please enter company name.");
	},
	function(session,results)
	{
		session.userData.company=results.response;
	    session.beginDialog("/summary");
	}
	]);

bot.dialog("/summary",[
function(session){
	if(session.message && session.message.value) {
     
        processSubmitAction(session, session.message.value);
        return ;   
    }

	var card={
		'contentType': 'application/vnd.microsoft.card.adaptive',
        'content':{
	"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
	"type": "AdaptiveCard",
	"version": "1.0",
	"body": [
		{
			"type": "ColumnSet",
			"columns": [
				{
					"type": "Column",
					"width": 2,
					"items": [
						{
							"type": "TextBlock",
							"text": "Summary",
							"weight": "bolder",
							"size": "medium"
						},
						{
							"type": "TextBlock",
							"text": "Please confirm the following information entered by you.",
							"isSubtle": true,
							"wrap": true
						},
                        {
                        "type": "FactSet",
                         "facts": [
                         {
                         "title": "Name :",
                         "value": session.userData.name
                          },
                        {
                   "title": "City :",
              "value":session.userData.city
            },
            {
              "title": "Company:",
              "value": session.userData.company
            }
           
          ]
        }
			
		 ]
		}
				
			]
		}
	],
	"actions": [
		{
			"type": "Action.Submit",
			"title": "Confirm",
			'data': {
               'type': 'first'
               }
		}
	]
}


	}


	 var msg = new builder.Message(session)
        .addAttachment(card);
        session.send(msg);
	}]);


function processSubmitAction(session,value){
	if(value.type=='first'){
		session.beginDialog('/Thanks');
	}
}




bot.dialog("/Thanks",[
	function(session)
	{
		session.send("Thank you for your response.");
	}
	]);