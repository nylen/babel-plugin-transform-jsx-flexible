<Component prop="foo" />;

<CustomTag1>
	<SomeSubElement />
	<AnotherSubElement />
	<p data-attr="value">
		test <strong> stuff </strong>ok
		<span />
		{ true ? ( () => ( <div class="x">abc</div> ) )() : null }
	</p>
</CustomTag1>;

<CustomTag2>
	<SomeSubElement>
		<AnotherSubElement />
	</SomeSubElement>
</CustomTag2>;

<Component prop="bar" />;
