# cloner-js

## Description
Command Line Interface To Clone A Lot Of Repositories One Time With Json File Configuration You Can Save This File For All Developers That has Same Repos and If Anyone wants to Clone Same Repos (Just Run the Script and Will Download Everything For You)

The CLI Built with Javascript and It is Support Random Github Repositories and User Repositories (Private, Public) Via Access Token and Execute git Clone Command On All Repositories

## The Problem
Each Time I Get New Laptop, Format My PC i should Always Search About Each Repository whatever if they From My Github Account or Open Source Projects, SDK's i Use i should Always Clone Everything Manually and this Process Take Like 3 Hours Waiting Some Repos To Finish Cloning and 3 Hours Searching About them To Remember I want to Clone All of this Repositories so I Built this Script to execute Command and it will clone everything to me in my Working Directory

## Commands
```
1. [-c] Clone All Repos From Json Configuration File
2. [-k] Check And Validate If the Configuration File Exists In Working Directory or Not
3. [-g] Generate Empty Configutation File To Add Your Repos To it
4. [-h] Help To Print All Available Commands
```

## Installation
```
npm i -g cloner-js
```

## Usage
1. Go To Your Projects Directory
2. Open Terminal Their
3. Download The CLI From Installation Step
4. Execute This Command To Generate Empty Config File
```
cloner-js -g 
```
5. Execute This Command To Clone All Repositories
```
cloner-js -c
```

## Configuration File
This File Contains Your Account Information
1. If you want to Clone your Account Public Repositories Add Your Username inside User Field
2. If you want to Clone All Repos From Your Account (Public, Private) Add Username and Access Token
3. If you want to Clone Repos From Random Users, Orgs Add Them in Repos List Like This (Yazan98/cloner-js)

## Screenshot For Usage
![Screenshot 2021-06-25 105448](https://user-images.githubusercontent.com/29167110/123390635-ca93c700-d5a3-11eb-8842-b464c7793bb3.jpg)
