var daemon = require('./daemon');
var fs = require('fs');
var http = require('http');
var sys = require('sys');

var config = {
	lockFile: '/tmp/testd.pid'	//Location of lockFile
};

var args = process.argv;
var dPID;

// Handle start stop commands
switch(args[2]) {
	case "stop":
		process.kill(parseInt(fs.readFileSync(config.lockFile)));
		process.exit(0);
		break;
		
	case "start":
		dPID = daemon.start();
		daemon.lock(config.lockFile);
		daemon.closeIO();
		break;
		
	default:
		sys.puts('Usage: [start|stop]');
		process.exit(0);
}

// Start HTTP Server
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Hello, World!</h1>');
	res.close();
}).listen(8000);

