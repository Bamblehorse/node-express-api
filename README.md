###SOFT 338 - Plymouth University API

Use response codes
Don’t ignore caching
Hypermedia?
MIME types

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