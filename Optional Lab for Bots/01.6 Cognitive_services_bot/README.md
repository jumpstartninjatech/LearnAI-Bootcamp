# Cognitive Services Bot

In this lab, you will build, a cognitive services bot which is used for testing cognitive services.

### Prerequisites
The following software environment is needed for running this bot :

```
1.Node.js
2.Microsoft BotFramework Emulator.
3.SubLimeText Editor.
```

### Collecting the keys

Over the course of this lab, we will collect various keys. It is recommended that you save all of them in a text file, so you can easily access them throughout the workshop.keys:

```
1.Bot Framework App ID
2.Bot Framework App password
3.Text Analytics API Key
4.Computer Vision API Key
5.Custom Vision-Url 
6.Custom Vision-Prediction-Key
7.Face API Key
8.Bing Speech API Key

``` 


### Implementation

To check implementation of this lab please refer to the following file in cognitive_services_bot folder:

```
                             cognitive_services_bot.js
```

###Check implementation through following steps

1. Open cognitive_services_bot.js file in SubLime Text Editor and provide Bot Framework App ID and Bot Framework App password in this section of code. (note : If you are working on local then there is no need to specify Bot Framework App ID and Bot Framework App password  ).

![cognitive_services _bot_0](https://user-images.githubusercontent.com/31923904/39426647-41cb4736-4c9e-11e8-887d-a82dc00fcce8.jpg)

2.open .env file in cognitive_services_bot folder and paste all keys which you already collected and save.

3.Open command prompt (cmd) and set path to cognitive_services_bot folder then run cognitive_services_bot.js file using command below:

                               node cognitive_services_bot.js.

4.Start the Bot Framework Emulator and connect your bot and type http://localhost:3978/api/messages into the address bar.(This is the default end point that your bot listens to when hosted locally).Click on “Connect” button.(note : If you are working on local then no need to specify Microsoft App ID and Microsoft App Password ).  

![cognitive_services _bot_1](https://user-images.githubusercontent.com/31923904/39426665-5b8c4be8-4c9e-11e8-9421-5efd3a1ce87d.jpg)

  -The following screenshot shows the results of this chatbot running in the Bot     Framework Channel Emulator.
   -Menu Output.
  ![menu](https://user-images.githubusercontent.com/31923904/39466205-5be0d0ee-4d45-11e8-83fa-1f4a090eb023.jpg)

   -OCR Output.
![cognitive_services_bot_2](https://user-images.githubusercontent.com/31923904/39426735-9d415e02-4c9e-11e8-9918-d03a027761b2.jpg)  
 
   -Custom Vision Output
.
  ![cognitive_services_bot_3](https://user-images.githubusercontent.com/31923904/39426767-b7a89cf6-4c9e-11e8-9889-1d4225b11d70.jpg)

   -Face Description Output.
![cognitive_services_bot_4](https://user-images.githubusercontent.com/31923904/39426808-e035d8f0-4c9e-11e8-9088-ed0df4770342.jpg)

   -Image Analytics Output.

![cognitive_services_bot_5](https://user-images.githubusercontent.com/31923904/39426824-f671cea8-4c9e-11e8-9dfb-b00a1dd16a64.jpg)
   -Text Analytics Output.

![cognitive_services_bot_6](https://user-images.githubusercontent.com/31923904/39426848-1225c1c2-4c9f-11e8-8919-317940926af4.jpg)

-Speech to Text Output.

![s t](https://user-images.githubusercontent.com/31923904/39466234-831378ba-4d45-11e8-87b6-f25f3345c749.jpg)


                                    





