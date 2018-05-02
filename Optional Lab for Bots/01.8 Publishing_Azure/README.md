# Publishing Bot Application on Microsoft Azure.


This module is for understanding how to publish bot application on Microsoft Azure and adding bot to different channels.

###Steps :

1.Open portal.azure.com and login with Microsoft Account Credential.

![skype_0](https://user-images.githubusercontent.com/31923904/39428124-eab6b682-4ca3-11e8-980d-85fdf27c10a4.png)

2.Click on “New” then select “AI+Cognitive Services” in “Azure Marketplace” section.

![skype_1](https://user-images.githubusercontent.com/31923904/39428187-22b6a466-4ca4-11e8-9c18-24b54a8181e5.jpg)

3.In “AI+Cognitive Services” click on “Web App Bot”.

![skype_2](https://user-images.githubusercontent.com/31923904/39428239-4f3db8a8-4ca4-11e8-8c0d-a3f1e151cf2b.jpg)

4.Enter all details in “Web App Bot” then click on “Create”.

![skype_5](https://user-images.githubusercontent.com/31923904/39428276-66d4664c-4ca4-11e8-9063-570c71c04c1b.jpg)

5.Go to the “BOT MANAGEMENT” section then click on “Build” option.

![skype_6](https://user-images.githubusercontent.com/31923904/39428318-8f25e396-4ca4-11e8-8bfb-28bac58fbdf4.jpg)

6.Inside “Build” go to “Online code editor” then click on “Open online code editor”.

![skype_7](https://user-images.githubusercontent.com/31923904/39428359-b7121f0a-4ca4-11e8-854d-544bc07cce77.jpg)

7.In “App Service Editor” go to “app.js”.

![skype_8](https://user-images.githubusercontent.com/31923904/39428411-dfc8531a-4ca4-11e8-9c50-f8ed8e28b6fc.jpg)

8.Delete default code which is in “app.js” file  then copy code your bot code and paste here in app.js.

![skype_9](https://user-images.githubusercontent.com/31923904/39428459-0a00da1c-4ca5-11e8-88ba-35d9527b1ff8.jpg)

9.Go to console.(To open console click on this icon![play_icon](https://user-images.githubusercontent.com/31923904/39428733-1e101c92-4ca6-11e8-9e67-c83c56aa7376.jpg) on left Side of App Service Editor)and install following packages:

     ```
    a) Botbuilder
    b) Restify
    c) botbuilder_azure

     ```
   Note: Install all packages which are necessary to run the your bot application.  

a)	To install botbuilder package give following command on console:

                                ```
                                 npm install botbuilder 
                              ```
![skype_10](https://user-images.githubusercontent.com/31923904/39428891-aafdc320-4ca6-11e8-96aa-a89dea93a14a.jpg)

Step 10 : After installation of packages to test your code, click on this icon   ![play_01](https://user-images.githubusercontent.com/31923904/39429049-43b01e4c-4ca7-11e8-9c5d-7feae0751447.jpg)on the left side of App Service Editor.

• If test is successful then new window will open in browser with  the    following message:   {"code":"ResourceNotFound","message":"/ does not exist"}

![skype_11](https://user-images.githubusercontent.com/31923904/39429109-7a1f5bdc-4ca7-11e8-845c-aa914fb9f994.jpg)

• If test is unsuccessful then new window will open in browser with the following error.

![skype_12](https://user-images.githubusercontent.com/31923904/39429172-b022c7fa-4ca7-11e8-89d3-1a5a7d8be64c.jpg)

•	If test is unsuccessful then click on this icon ![play_02](https://user-images.githubusercontent.com/31923904/39429286-0b79aa10-4ca8-11e8-84e9-5ea11996edb3.jpg)on the left side of “App Service Editor”and check error in output.

![skype_13](https://user-images.githubusercontent.com/31923904/39429326-260e1528-4ca8-11e8-9acd-56cd73f5718a.jpg)

Step 11 :  After testing your code, If your test is successful then go to Azure portal and open your application then click on “Test in Web Chat” option in “BOT MANAGEMENT” section to test working of your application .

![skype_14](https://user-images.githubusercontent.com/31923904/39429383-5ad29630-4ca8-11e8-9ff4-bd3ca5bc8bcf.jpg)

Step 12 : In BOT MANAGEMENT section go to Channels and select channels where you want publish your bot.For example-To publish on Skype go to Add a featured channel option and click on skype.

![skype_15](https://user-images.githubusercontent.com/31923904/39429434-8889d318-4ca8-11e8-9bf3-782dae31992f.jpg)

-Click on Get bot embed codes option and click on it.

![skype_16](https://user-images.githubusercontent.com/31923904/39429552-d1cff1c4-4ca8-11e8-887e-16a387a2d5da.jpg)

-Select Skype in Bot embed code and copy value of href and you can use this web Url to add the bot in your skype.

![skype_17](https://user-images.githubusercontent.com/31923904/39429581-eae33b30-4ca8-11e8-9a0c-627496c2a063.jpg)


