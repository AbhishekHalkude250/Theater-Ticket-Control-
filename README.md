
# Theater-Ticket-Control 

  

## Techonlogies Used
* NodeJs (10.19.x), JavaScript, Loopback 3.x (NodeJs Framework), Elastic-Search(7.13.x)


## Prerequisite 
1) Elastic-Search 
* should have elastic-search version above 7.13.x
* Link to download elastic-search https://www.elastic.co/downloads/elasticsearch
*  how to run elastic-search
* Go the main folder, then `cd /elasticsearch-7.13.2/elasticsearch-7.13.2/bin`
* then run using command `./elasticsearch`

## How to run the application?
1) First run elastic-search using above commands
2) then visit project main folder `Theater-Ticket-Control`using command `cd Theater-Ticket-Control` and then run below commands 
 2) Install node modules using command `npm install`
 3) then run the application using command`node .`
 4) once application is up, visit `http://localhost:4040/explorer`
 to explore apis swagger for ticket model
## How to execute unit test cases
i) use below command,
`npm run test`


##  Application
1)  Backend application hase been developed using `Loopback 3.x `framework, `Elastic-search` has been used as a database.
2) Application contains `CRUD` operation for ticket.
3) Application have 2 more apis, which has been used to analyse no of customer visited to our show per month also amount of money earned using ticket selling per month which have two more pattern to retrieve the infromation
* js algorithm
* aggregation
i) js algorithm contains custom logic to retrieve data
ii) aggregation contain `aggregation query`, to retrieve data
4)  Application has`middleware` which has been used to check valid token. follow below path to find out `authorization` validation
`main-folder/server/middleware/enforce-auth.js` 

5) Application contains `Unit-test cases` for crud operation. having success and failure coverage.
6) Follow below path to find `custom logic` for apis
`main-folder/server/boot/controllers/ticket.js`

7) Also have attached API swagger doc. follow `doc/ticket.html` to findout api documentation.
