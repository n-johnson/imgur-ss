/* Server.js
 * ABC data analysis.
 * Author: Nathan Johnson
 */

var express = require('express'),
	app = express(),
	path = require('path'),
	filePath = path.dirname(require.main.filename);

app.use(express.static(filePath));
app.listen(3001);