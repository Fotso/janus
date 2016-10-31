var express = require('express')
, apiRoutes = express.Router();

apiRoutes.use(require('./users-ctrl'));
apiRoutes.use(require('./companies-ctrl'));
apiRoutes.use(require('./categories-ctrl'));
apiRoutes.use(require('./events-ctrl'));	
apiRoutes.use(require('./albums-ctrl'));	
apiRoutes.use(require('./venues-ctrl'));	


module.exports = apiRoutes;