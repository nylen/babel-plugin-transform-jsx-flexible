// Enable "transform-jsx-flexible" to work in options.json files
// TODO find a better way than this hack
import fs from 'fs';
import path from 'path';

const dirname = path.join(
	__dirname,
	'..',
	'node_modules',
	'babel-plugin-transform-jsx-flexible'
);
try {
	fs.mkdirSync( dirname );
} catch ( err ) { }
try {
	fs.unlinkSync( path.join( dirname, 'index.js' ) );
} catch ( err ) { }

fs.symlinkSync(
	'../../index.js',
	path.join( dirname, 'index.js' )
);

// Now run the regular babel testing logic

import runner from "babel-helper-plugin-test-runner";

runner(__dirname);
