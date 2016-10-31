janus-admin is an admin demo base on marmelab/ng-admin https://github.com/marmelab/ng-admin

First step to follow if you want to install janus-admin

1. Mongodb must be installed and runnig (mongodb server must be listening connection)

2. Once mongodb is installed, import the database "janus" (from the repository janus-admin/janus.database of this project) into your newly created Mongodb system.

3. Finally, clone and install all the dependencies of the project in your server/cpu by following those commands:

git clone https://github.com/Fotso/janus-admin.git
cd janus-admin
npm install
npm install ng-admin
npm start