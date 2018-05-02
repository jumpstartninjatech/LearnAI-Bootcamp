# User Input Bot 

In this lab, you will build, a bot which collects information from user such as name,city name,company name and display back to user its response and ask for confirmation.

### Prerequisites
The following software environment is needed for running this bot :

```
1.Node.js
2.Microsoft BotFramework Emulator
3.SubLimeText Editor
```

### Collecting the keys

Over the course of this lab, we will collect various keys. It is recommended that you save all of them in a text file, so you can easily access them throughout the workshop:
```
-Bot Framework App ID
-Bot Framework App password
```

### Implementation

To check implementation of this lab please refer to the following file in UserInput_Bot folder:

```
                             UserInputBot.js
```

###Check implementation through following steps

1. Open UserInputBot.js file in SubLime Text Editor and provide Bot Framework App ID and Bot Framework App password in this section of code. (note : If you are working on local then there is no need to specify Bot Framework App ID and Bot Framework App password  ).

![userinputbot_0](https://user-images.githubusercontent.com/31923904/39425813-bdda1a9a-4c9a-11e8-8525-a132daf07564.jpg)

2.Open command prompt (cmd) and set path to UserInput_Bot folder then run UserInputBot.js file using command below:
```
                               node UserInputBot.js
```
3.Start the Bot Framework Emulator and connect your bot and type http://localhost:3978/api/messages into the address bar.(This is the default end point that your bot listens to when hosted locally).Click on “Connect” button.(note : If you are working on local then no need to specify Microsoft App ID and Microsoft App Password ).  

![userinputbot_1](https://user-images.githubusercontent.com/31923904/39425849-e53f4c72-4c9a-11e8-8afb-d2419c8d3164.jpg)

  -The following screenshot shows the results of this chatbot running in the Bot Framework Channel Emulator.

![userinputbot_2](https://user-images.githubusercontent.com/31923904/39425877-0fc8e21e-4c9b-11e8-8659-0170486d6bba.jpg)
