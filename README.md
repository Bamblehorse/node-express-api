###SOFT 338 - Plymouth University API

Use response codes
Don’t ignore caching
Hypermedia?
MIME types

Nouns not Verbs
Plural prefered?
Be concrete over abstract - 'courses' not 'items'
Be RESTful then add Virtualization layer, shortcuts for possible use
JSON follow JavaScript conventions - camelCase
Learn from leading APIs - twitter / facebook

GET 	/courses/ 			courses.index
GET 	/courses/new 		courses.new -> new view
POST 	/courses/			courses.create
GET 	/courses/:id 		courses.show
GET 	/courses/:id/edit	courses.edit -> edit view
PUT 	/courses/:id 		courses.update
DELETE 	/courses/:id 		courses.destroy
GET 	/courses/:id/users	courses.getUsers

GET 	/modules/ 			modules.index
GET 	/modules/new 		modules.new -> new view
POST 	/modules/			modules.create
GET 	/modules/:id 		modules.show
GET 	/modules/:id/edit	modules.edit -> edit view
PUT 	/modules/:id 		modules.update
DELETE 	/modules/:id 		modules.destroy
GET 	/modules/:id/users 	modules.getUsers

GET 	/users/ 			users.index
GET 	/users/new 			users.new -> new view
POST 	/users/				users.create
GET 	/users/:id 			users.show
GET 	/users/:id/edit		users.edit -> edit view
PUT 	/users/:id 			users.update
DELETE 	/users/:id 			users.destroy

# TO DO

api.domain.com/v1/courses

- API key based auth -modules
- OAUTH -users
- PUT to /courses/ could bulk update?
- Add way to select fields the user wants, /courses?fields=name,code,school
- Add limiting to limit records. /courses?limit=25
-> Add url field to error return, tie to documentation. 
	
	{
		name: 'NoContent',
		message: 'Lookup was successful however did not return any data.',
		code: 201
		url: 'http://soft338.heroku.com/v1/docs/errors/201',
	}

- Add version 1,2,3 not decimal. Could imply API is updating often which is bad
- Add creation date / other attributes to JSON return, created_at? 

API Key: 6403cc12ebaf45056ab3e924fce62064851de819

todo:
- update users new view with stage field
- add grid from excel to index
- fix /modules/ on deployment