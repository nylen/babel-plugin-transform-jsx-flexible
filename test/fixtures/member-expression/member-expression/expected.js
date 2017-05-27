createElement_CustomTag1(CustomTag1, null);

React.createElement(CustomTag2, null);

createElement_CustomTag2(namespaced.CustomTag2, null);

somelib.createElement_CustomTag3(namespaced.rather.deeply.CustomTag3, null);

somelib.createElement_CustomTag3(
	namespaced.rather.deeply.CustomTag3,
	null,
	somelib.createElement_CustomTag3(WithSomeWhitespace, { because: "why not" })
);

React.createElement(Component, { prop: "foo" });
