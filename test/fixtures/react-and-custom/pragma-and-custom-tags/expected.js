/** @jsx dom */

dom(
	Component,
	{ prop: "foo" },
	dom("div", null),
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

createElement_CustomTag2(CustomTag2, null);

var profile = dom(
	"div",
	null,
	dom("img", { src: "avatar.png", className: "profile" }),
	dom(
		"h3",
		null,
		[user.firstName, user.lastName].join(" ")
	)
);