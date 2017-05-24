React.createElement(Component, { prop: "foo" });

createElement_CustomTag1(
	CustomTag1,
	null,
	createElement_CustomTag1(SomeSubElement, null),
	createElement_CustomTag1(AnotherSubElement, null),
	createElement_CustomTag1(
		"p",
		{ "data-attr": "value" },
		"test ",
		createElement_CustomTag1(
			"strong",
			null,
			" stuff "
		),
		"ok",
		createElement_CustomTag1("span", null),
		true ? (() => createElement_CustomTag1(
			"div",
			{ "class": "x" },
			"abc"
		))() : null
	)
);

createElement_CustomTag2(
	CustomTag2,
	null,
	createElement_CustomTag2(
		SomeSubElement,
		null,
		createElement_CustomTag2(AnotherSubElement, null)
	)
);

React.createElement(Component, { prop: "bar" });
