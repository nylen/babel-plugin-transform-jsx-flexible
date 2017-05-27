# babel-plugin-transform-jsx-flexible [![Build status](https://img.shields.io/travis/nylen/babel-plugin-transform-jsx-flexible.svg?style=flat)](https://travis-ci.org/nylen/babel-plugin-transform-jsx-flexible) [![npm package](http://img.shields.io/npm/v/babel-plugin-transform-jsx-flexible.svg?style=flat)](https://www.npmjs.org/package/babel-plugin-transform-jsx-flexible)

> Turn JSX into arbitrary function calls

This is a drop-in replacement for
[`babel-plugin-transform-react-jsx`](https://github.com/babel/babel/tree/v6.24.1/packages/babel-plugin-transform-react-jsx),
with the additional feature that multiple JSX handler functions can be used in
the same file.  The plugin passes all tests for the `transform-react-jsx`
plugin (included in this repo).

Changing the JSX handler within a file is accomplished by enclosing a JSX block
within a special tag that is defined in the plugin's configuration (see the
[`tags`](#tags)
option below).

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

#### Without options (no different from `transform-react-jsx`):

```json
{
  "plugins": ["transform-jsx-flexible"]
}
```

#### With options:

```json
{
  "plugins": [
    ["transform-jsx-flexible", {
      "tags": {
        "somelib.CustomTag1": "createElement_CustomTag1",
        "somelib.CustomTag2": "createElement_CustomTag2"
      }
    }]
  ]
}
```

**Code In**

```javascript
var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;

var somethingElse = <somelib.CustomTag1>
  <div />
</somelib.CustomTag1>;
```

**Code Out**

```javascript
var profile = React.createElement("div", null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);

var somethingElse = createElement_CustomTag1(somelib.CustomTag1, null,
  createElement_CustomTag1("div", null)
);
```

## Options

### `pragma`

_Inherited from `babel-plugin-transform-react-jsx`._

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

### `useBuiltIns`

_Inherited from `babel-plugin-transform-react-jsx`._

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

### `tags`

An object that maps custom JSX tag names (the keys) to custom functions (the
values) that should be used to render any JSX element enclosed inside the given
custom tag name.

For example:

```js
"plugins": [
  "transform-jsx-flexible",
  {
    "tags": {
      "somelib.CustomTag1": "createElement_CustomTag1",
      "somelib.CustomTag2": "createElement_CustomTag2"
    }
  }
]
```

Using this configuration, any `somelib.CustomTag1` element and any JSX elements
enclosed inside of it will be created using the function
`createElement_CustomTag1()` in the transpiled JS code, instead of
`React.createElement` (or the current default JSX function).

The same goes for `somelib.CustomTag2` and `createElement_CustomTag2`.  Also,
JSX handlers can be changed within the same block by nesting these custom tags
together.

For clarity and explicitness, it's recommended, but not required, to specify
any custom tags with a member expression (`somelib.CustomTag1` in the examples
above), rather than simply a tag name.
