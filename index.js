const jsx    = require( 'babel-plugin-syntax-jsx' );
const helper = require( 'babel-helper-builder-react-jsx' );

module.exports = function( { types: t } ) {
	function stringToCallExpression( name ) {
		return name.split( '.' )
			.map( piece => t.identifier( piece ) )
			.reduce( ( object, property ) => t.memberExpression( object, property ) );
	}

	const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;

	const visitor = helper( {
		pre( state /* , file */ ) {
			const { tagName, args } = state;
			if ( t.react.isCompatTag( tagName ) ) {
				args.push( t.stringLiteral( tagName ) );
			} else {
				args.push( state.tagExpr );
			}
		},

		post( state, file ) {
			state.callee =
				file.get( 'jsxCurrentIdentifier' ) ||
				file.get( 'jsxIdentifier' );
		}
	} );

	const previousJSXElementExit = visitor.JSXElement.exit;

	visitor.JSXElement.exit = ( path, file ) => {
		// Before handing control off to the transformation logic, walk up the
		// current path in the AST and see if we're inside a JSX expression
		// that has a specially defined JSX handler function in our
		// configuration.
		const tagOptions = file.opts && file.opts.tags;
		let jsxCurrentIdentifier = null;

		if ( tagOptions ) {
			let currentPath = path;
			do {
				const openingElement = currentPath.get( 'openingElement' );
				if ( openingElement && openingElement.node ) {
					const nodeName = openingElement.node.name.name;
					if ( tagOptions[ nodeName ] ) {
						jsxCurrentIdentifier = stringToCallExpression(
							tagOptions[ nodeName ]
						);
						break;
					}
				}
				currentPath = currentPath.parentPath;
			} while ( currentPath );
		}

		file.set( 'jsxCurrentIdentifier', jsxCurrentIdentifier );

		return previousJSXElementExit( path, file );
	};

	visitor.Program = ( path, state ) => {
		const { file } = state;
		let id = state.opts.pragma || 'React.createElement';

		for ( const comment of file.ast.comments ) {
			const matches = JSX_ANNOTATION_REGEX.exec( comment.value );
			if ( matches ) {
				id = matches[ 1 ];
				if ( id === 'React.DOM' ) {
					throw file.buildCodeFrameError(
						comment,
						'The @jsx React.DOM pragma has been deprecated as of React 0.12'
					);
				} else {
					break;
				}
			}
		}

		state.set( 'jsxIdentifier', stringToCallExpression( id ) );
	};

	return {
		inherits: jsx,
		visitor,
	};
};
