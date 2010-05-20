//make sure this runs after the test framework is loaded
tester.register(function () {
	
	function should_do_foo() {
		//...
		//the "this" keyword gives access to the assert object
		this.areEqual(foo, "foo");
	}

	function should_do_fii() {
		//...
		this.areEqual(fii, "fii");
	}

	//make the name of the test fixture and the test methods public
	return {
		should_do_foo: should_do_foo,
		should_do_fii: should_do_fii,
		name: "Foo Tests" 
	};

});


//use the following code to actually start the testing
gui();
