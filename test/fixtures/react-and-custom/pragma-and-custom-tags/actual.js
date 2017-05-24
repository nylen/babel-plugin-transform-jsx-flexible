/** @jsx dom */

<Component prop="foo">
	<div />
	<CustomTag1>
		<SomeSubElement />
		<AnotherSubElement />
		<CustomTag2>
			<SomeSubElement />
			<AnotherSubElement />
		</CustomTag2>
	</CustomTag1>
</Component>;

<CustomTag2 />;

var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(" ")}</h3>
</div>;
