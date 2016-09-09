Bhumi Plot/khatian :
http://banglarbhumi.gov.in:8080/LRWEB/

MEAN stack application:

1. https://www.youtube.com/watch?v=kHV7gOHvNdk [currently watching/developing]
2. https://www.youtube.com/watch?v=QseHOX-5nJQ

Steps for building this app:
===========================================

1. download GIT for windows
2. open git bash and work replacement of cmd
3. download node and install
4. install express
5. create server.js using express and test
6. setup static resource location in public folder
7. create index.htm;
8. setup angular js in index.html
9. setup bootstrap for styling
10. use angular route ..continueing..
Folder structure :

contactListApp
 ----server.js
 ----public        (static resource location)
      --index.html
      --controllers
         ---controler.js


Build skill on using
1. Git
2. Node
3. Angular
4. Express
5. Mongo DB
6. SPA
7. Routing
8. Bootstarp
9. REST API expose/access         

Mongo Data base:
======================================
mongod.exe  --dbpath  E:\Programing\data --storageEngine=mmapv1
>>show dbs
use contactList
db.contactList.insert({name:'sofikul',email:'xyz@gmail.com',contactNo:'9051299936'})
db.contactList.insert([{name:'sofikul',email:'xyz@gmail.com',contactNo:'9051299936'},{name:'sofikul',email:'xyz@gmail.com',contactNo:'9051299936'}])


>>db.contactList.find().pretty()


For SQL practice:
================================
http://www.vertabelo.com/blog/notes-from-the-lab/18-best-online-resources-for-learning-sql-and-database

Currently reading for advanced SQL:
=====================================
1. http://www.programmerinterview.com/
2. downloaded one pdf for how to write better sql in terms of performance


Select * from
(Select *
row_number() over(partition by salesperson_id order by amount desc) seq
from orders)
where seq = 1

Select * from orders o1
where
amount >= ALL (select amount from orders o2
where o1.salesperson_id  = o2.salesperson_id )



03-Junj-16
----------------
Links for reference:
====================================
http://codepen.io/brunoscopelliti/pen/Bepum/
http://blog.brunoscopelliti.com/use-cases-of-angularjs-directives/
https://docs.angularjs.org/guide/directive
http://stackoverflow.com/questions/15151116/angularjs-directives-attributes-access-from-the-controller
http://bguiz.github.io/js-standards/angularjs/iife/


AngularJS : What is the difference between '@' and '=' in directive scope
https://toddmotto.com/minimal-angular-module-syntax-approach-using-an-iife/


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript


docs for mongo db:
=============================
https://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs

register/deregister event in angular
localization
angular promisses
angular watch
create own module and use in another module
directive scope, controller, link, $compile, $digest, $apply, $watch


=====================================
=       Improvements:               =
=====================================
1. Modular structure
2. Controller As syntax
3. Angular UI Router
4. separate server from client
5. develop REST at later
6. decorate pages with css
7. Dynamic menu from db

*** separate directive in common
*** Entry screen modification
*** use constant & i18n [for label and validation messages]
*** Login authentiucation , need to learn promisses


Download sunday suspanse:

http://cyberindia.in/site_sunday-suspense-radio-mirchi-mp3-download.xhtml
http://sundaysuspense.in/


demo projects in git :

https://github.com/angular/angular.js/wiki/Projects-using-AngularJS
https://github.com/markwylde/Flickular-Demo
https://github.com/JohnnyTheTank/apiNG
https://github.com/angular-app/angular-app

https://github.com/johnpapa/angular-styleguide.git
https://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/

/////////////////////////////////////

1. Need to work on login module of Client Billing App
   As convienced, need to use some sort of UI Router multiple views concept
   |||||| Need to explore more on ui router |||||||


2. Then need to focus stylying of this project

3. Additionally, need to explore promisses, boardcast and on event

/////////////////////////////////////

http://blackrockdigital.github.io/startbootstrap-sb-admin-2/pages/index.html#
https://colorlib.com/polygon/gentelella/index.html


***** https://www.udacity.com ****


Pending work in App: (18-Jul-2016)
==========================================
1. Clean up - a) CSS
2. Standarization - Need to standarize all entry/query screen according to sample
3. Need to standarize angular grid
4. upgrade Dashboard page  - a) Add feed b) Add graph and statictics c) image gallery
5. Upload customer image
6. Develop modal
7. incorporate concept of session and logout
>>>> Login with facebook/gmail
>>>> Personalization
>>>> build angular app

imitation

prepare a abstract controller
save data based on collection


Github:
https://github.com/Sofiukl
sofikul.projects

https://github.com/Sofiukl/NewDevelopmentProcess.git

Git examples:
=========================================
git config --list
git init
gi add .
git diff
git pull
git commit -m "Initial Comment"
git remote add publicRepo https://github.com/kangralkar/publicRepo.git
git push -u origin master

--
git clone https://github.com/kangralkar/publicRepo.git

--
git status
git log
git show commitId
git reset
git checkout commitHash --filename
git commit -am "Added comments for task registration."
$ git branch testing
$ git checkout master
git branch -v
git origin -v
git fetch
git checkout -b b_name

Refer to : https://githowto.com/setup

create a fork
and sync fork to the origin

/////////////////////////////
Need to explore angular crud data grid
and inserting data from pop up 
////////////////////////////


Authentivcation: (Added on 09-Sep-16)
=====================================
https://gist.github.com/ThomasBurleson/7d8cb63302990e71e146
https://github.com/naorye/spa-auth
https://github.com/jaredhanson/passport-local
http://blog.modulus.io/nodejs-and-express-sessions
https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive
https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
https://glebbahmutov.com/blog/express-sessions/
http://stackoverflow.com/questions/10961963/how-to-access-cookies-in-angularjs