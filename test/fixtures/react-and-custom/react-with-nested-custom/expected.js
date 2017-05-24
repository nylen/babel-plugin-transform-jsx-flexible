React.createElement(
	Component,
	{ prop: "foo" },
	React.createElement("div", null),
	createElement_CustomTag1(
		CustomTag1,
		null,
		createElement_CustomTag1(SomeSubElement, null),
		createElement_CustomTag1(AnotherSubElement, null),
		createElement_CustomTag2(
			CustomTag2,
			null,
			createElement_CustomTag2(SomeSubElement, null),
			createElement_CustomTag2(AnotherSubElement, null)
		)
	)
);
