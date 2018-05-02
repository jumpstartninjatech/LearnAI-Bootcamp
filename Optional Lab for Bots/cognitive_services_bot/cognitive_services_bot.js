require('dotenv-extended').load();
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices=require('botbuilder-cognitiveservices');
var request = require('request');
needle = require('needle');
var speechService = require('ms-bing-speech-service');
var fs = require('fs');


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



//Root Dialog execute when user give any input
bot.dialog("/",[
	function(session)
	{
		builder.Prompts.choice(session, "Please choose any of the services. ", "Image Analytics|Face Description|Custom Vision|OCR|Text Analytics|Speech to Text", { listStyle: builder.ListStyle.button });
	},
	function(session,results)
	{
		if(results.response.entity=='Image Analytics'){
			  session.beginDialog("/Image_Analytics");
		}else if(results.response.entity=='Face Description'){
              session.beginDialog("/Face_Description");
		}else if(results.response.entity=='Custom Vision'){
              session.beginDialog("/Custom_Vision");
		}else if(results.response.entity=='OCR'){
		      session.beginDialog("/OCR");
		}else if(results.response.entity=='Text Analytics'){
              session.beginDialog("/Text_Analytics");
		}else if(results.response.entity=='Speech to Text'){
              session.beginDialog("/speech_to_text");
	  }
  }  

	]);


//Text_Analytics dialog execute when user click on Image Analytics button.
bot.dialog("/Text_Analytics",[
	function (session)
	{
    builder.Prompts.text(session,"Please enter Text for Analytics.");
	},
	function(session,results)
	{
	session.userData.text=results.response;
	txt_analytics1(session);
	      setTimeout(function(){
        session.beginDialog("/display_result");
       }, 5000);



	}

	]);



//txt_analytics1 function is used for calling text analytics api.
function txt_analytics1(session){


 var k={
  "documents": [
    {
      "language": "en",
      "id": "1",
      "text":session.userData.text
    }
  ]
}


var w={
  "documents": [
    {
      "language": "en",
      "id": "1",
      "text": session.userData.text
    }
   ]
}
request({
  headers:{
    'Content-Type': 'text/json',
    'Ocp-Apim-Subscription-Key':process.env.Text_Analytics_API_Key
  },
  uri:'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
  body:JSON.stringify (w),
  method: 'POST'
}, function (err, res, body) {
  if (err) {
    console.log(err);
  }
  else {
    var k="";
    var p=",";
    var m=JSON.parse(body);
    var s;
     for(var h=0;h<m.documents[0].keyPhrases.length;h++){
     	var s=m.documents[0].keyPhrases[h];
     	if(h==m.documents[0].keyPhrases.length-1){
          p=".";
        }
     	k=k+s+p;
     }
     session.userData.keyPhrases=k;
  }
});



request({
  headers:{
    'Content-Type': 'text/json',
    'Ocp-Apim-Subscription-Key': process.env.Text_Analytics_API_Key
  },
  uri:'https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
  body:JSON.stringify (w),
  method: 'POST'
}, function (err, res, body) {
  if (err) {
    console.log(err);
  }
  else {
   var q=JSON.parse(body);
   if(q.documents[0].score<=0.4){
   	   session.userData.sentiment='Positive';
   }else if(q.documents[0].score==0.5){
       session.userData.sentiment='Neutral';
   }else if(q.documents[0].score<=1){
       session.userData.sentiment='Negative';
   }
   
  }
});

}


//This dialog is used for displaying results of text analytics.
bot.dialog("/display_result",[
	function(session)
	{
     session.send("KEY PHRASES : "+session.userData.keyPhrases);
     session.send("SENTIMENT : "+session.userData.sentiment);
	}
	])


//custom_vision dialog executes when user click on custom vision button in root dialog. 
bot.dialog("/Custom_Vision",[
	function(session)
	{
		builder.Prompts.attachment(session, "Please upload image for custom vision.");
	},
	function(session,results)
	{
		session.userData.custom_attachment=session.message.attachments[0].contentUrl;
		custom_vision(session);
	}

	]);

//custom_vision function is used for calling custom vision api. 
function custom_vision(session)
{
    if (hasImageAttachment(session)) {
        var stream = getImageStreamFromMessage(session.message);


        var apiUrl =process.env.Custom_Vision_Url;
   
       
            var requestData = {
                url: apiUrl,
                headers: {
                    'Prediction-Key':process.env.Custom_Vision_Prediction_Key,
                     'Content-Type':'application/octet-stream'
                }
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
               
               var m=JSON.parse(body); 
                for(var i=0;i<m.Predictions.length;i++)
                {	
                   var c=m.Predictions[i].Tag;
                   var e=m.Predictions[i].Probability;
                   session.send("Tag:"+c+"\n\nProbability:"+e);
               }

            }));
 
   
    }else{
    	session.send("Please upload an Image for testing.");
    } 

}


//hasImageAttachment function is used for checking attachment content type.
function hasImageAttachment(session) {
    return session.message.attachments.length > 0 &&
        session.message.attachments[0].contentType.indexOf('image') !== -1;
}




// getImageStreamFromMessage function is used for getting images staream from the message.
function getImageStreamFromMessage(message) {
    var headers = {};
    var attachment = message.attachments[0];
    if (checkRequiresToken(message)) {
   
        connector.getAccessToken(function (error, token) {
            var tok = token;
            headers['Authorization'] = 'Bearer ' + token;
            headers['Content-Type'] = 'application/octet-stream';
              
            return needle.get(attachment.contentUrl, { headers: headers });
        });
    }

    headers['Content-Type'] = attachment.contentType;
    return needle.get(attachment.contentUrl, { headers: headers });
}

//checkRequiresToken function is used for checking the source of message.
function checkRequiresToken(message) {
    return message.source === 'skype' || message.source === 'msteams';
}



//Face_Description dialog execute when user click on face description button in root dialog.
bot.dialog("/Face_Description",[
	function(session)
	{
	builder.Prompts.attachment(session, "Please upload image for Face Description.");
	},
	function(session,results)
	{
	session.userData.face_attachment=session.message.attachments[0].contentUrl;	
     face_description(session);
	}

	]);

//face description function is used for calling face api.
function face_description(session)
{
 if (hasImageAttachment(session)) {
        var stream = getImageStreamFromMessage(session.message);


        var apiUrl ='https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=true&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
   
       
            var requestData = {
                url: apiUrl,
                headers: {
                     'Content-Type':'application/octet-stream',
                     'Ocp-Apim-Subscription-Key':process.env.Face_API_Key

                }
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
               
              var m=JSON.parse(body);

               session.userData.smile=m[0].faceAttributes.smile;
               session.userData.gender=m[0].faceAttributes.gender;          
               session.userData.age=m[0].faceAttributes.age;
               session.userData.facialHair_moustache=m[0].faceAttributes.facialHair.moustache;
               session.userData.facialHair_beard=m[0].faceAttributes.facialHair.beard;
               session.userData.sideburns=m[0].faceAttributes.facialHair.sideburns;
               session.userData.emotion_anger=m[0].faceAttributes.emotion.anger;
               session.userData.emotion_con=m[0].faceAttributes.emotion.contempt;
               session.userData.emotion_disgust=m[0].faceAttributes.emotion.disgust;
               session.userData.emotion_fear=m[0].faceAttributes.emotion.fear;
               session.userData.emotion_happiness=m[0].faceAttributes.emotion.happiness;
               session.userData.emotion_neutral=m[0].faceAttributes.emotion.neutral;
               session.userData.emotion_sadness=m[0].faceAttributes.emotion.sadness;
               session.userData.emotion_surprise=m[0].faceAttributes.emotion.surprise;
               session.userData.glasses=m[0].faceAttributes.glasses;
               session.userData.blur=m[0].faceAttributes.blur.blurLevel;
               session.userData.exposure=m[0].faceAttributes.exposure.exposureLevel;
               session.userData.noiseLevel=m[0].faceAttributes.noise.noiseLevel;
               session.userData.makeup_eyemkeup=m[0].faceAttributes.makeup.eyeMakeup;
               session.userData.makeup_lipmkeup=m[0].faceAttributes.makeup.lipMakeup;
   
             session.send("Smile :"+session.userData.smile+"\n\nAge :"+session.userData.age+"\n\nGender :"+ session.userData.gender+"\n\nGlasses :"+session.userData.glasses+"\n\nMakeup-Eye Makeup"+session.userData.makeup_eyemkeup+"\n\nMakeup-Lip Makeup"+session.userData.makeup_lipmkeup+"\n\nFacial Hair-Moustache :"+session.userData.facialHair_moustache+"\n\nFacial Hair-Beared :"+session.userData.facialHair_beard+"\n\nEmotion-Anger :"+session.userData.emotion_anger+"\n\nEmotion-Contempt :"+session.userData.emotion_con+"\n\nEmotion-Disgust :"+session.userData.emotion_disgust+"\n\nEmotion-Fear :"+session.userData.emotion_fear+"\n\nEmotion-Happiness"+session.userData.emotion_happiness+"\n\nEmotion-neutral :"+session.userData.emotion_neutral+"\n\nEmotion-sadness :"+session.userData.emotion_sadness+"\n\n Emotion-surprise :"+session.userData.emotion_surprise);

            }));
 
   +"\n\n"
    }else{
    	session.send("Please upload an Image for testing.");
    } 

}


//OCR dialog execute when user click on OCR button in root dialog.
bot.dialog("/OCR",[
	function(session)
	{
	builder.Prompts.attachment(session, "Please upload image for OCR.");	
	},
	function(session,results)
	{
     session.userData.OCR=session.message.attachments[0].contentUrl;
     ocr(session);
	}

	]);



//ocr function is used for computer vision api for OCR.
function ocr(session){

if (hasImageAttachment(session)) {
        var stream = getImageStreamFromMessage(session.message);


        var apiUrl ='https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation =true'
   
       
            var requestData = {
                url: apiUrl,
                headers: {
                     'Content-Type':'application/octet-stream',
                     'Ocp-Apim-Subscription-Key':process.env.Computer_Vision_API_Key

                }
            };

            stream.pipe(request.post(requestData, function (error, response, body) {
            	if(error){
                console.log("error in OCR :",error)
            	}else{
              var m=JSON.parse(body);
              var w=" ";
              var y=" ";
              for(var q=0;q<m.regions[0].lines.length;q++){
              	for(var f=0;f<m.regions[0].lines[q].words.length;f++){
                 w=w+m.regions[0].lines[q].words[f].text+y;
              	}
              }
              session.send("Detected Text :"+w);

            	}
            

            }));
 
   
    }else{
    	session.send("Please upload an Image for testing.");
    } 




}


//Image_Analytics dialog is execute when user click on Image Analytics button. 
bot.dialog("/Image_Analytics",[
	function(session)
	{
    builder.Prompts.attachment(session, "Please upload image for Image Analytics.");
	},
	function(session,results)
	{
      session.userData.analytics=session.message.attachments[0].contentUrl;
      analytics(session);
	}

	]);




//analytics function is used for computer vision api for image analytics . 
function analytics(session)
{
 if(hasImageAttachment(session)) {
        var stream = getImageStreamFromMessage(session.message);


        var apiUrl ='https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Tags,Description&details=Landmarks&language=en'
   
       
            var requestData = {
                url: apiUrl,
                headers: {
                     'Content-Type':'application/octet-stream',
                     'Ocp-Apim-Subscription-Key':process.env.Computer_Vision_API_Key

                }
            };

            stream.pipe(request.post(requestData, function (error, response, body) { 
             var m=JSON.parse(body);
              var w="";
              var f=",";
              var g=m.tags.length;
              for(var e=0;e<m.tags.length;e++)
              {
                
                if(e==(g-1)){
                f =".";	
                }
                w=w+m.tags[e].name+f;

              }
              var f=m.description.captions[0].text;
              session.send("Tags :"+w+"\n\nCaptions :"+f);

            }));

 
   
    }else{
    	session.send("Please upload an Image for testing.");
    } 




}

//This dialog execute when user click on Speech to text.
bot.dialog("/speech_to_text",[
  function(session)
  {
  builder.Prompts.attachment(session, "Please upload Voice Sample for Speech to Text.");  
  },
  function(session,results)
  {
     session.userData.speech=session.message.attachments[0].contentUrl;
     speech_to_text(session);
  }
  ]);



//This dialog is used for calling bing speech api.
function speech_to_text(session){

    request.get(session.message.attachments[0].contentUrl).pipe(fs.createWriteStream('file1.wav'));
  var options = {
  language: 'en-US',
  subscriptionKey:process.env.Bing_Speech_Api_Key
};
 
const recognizer = new speechService(options);
 
recognizer
  .start()
  .then(_ => {
    recognizer.on('recognition', (e) => {
      if (e.RecognitionStatus === 'Success') session.send("Text Detected :"+e.DisplayText);
    });
 
    recognizer.sendFile('file1.wav')
      .then(_ => console.log('file sent.'))
      .catch(console.error);
  
}).catch(console.error)

}


