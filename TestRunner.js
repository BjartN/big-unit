var tester = (function () {
  //array helper
  function array(base) {
    var a = base !== undefined ? base : [];

    a.contains = function (item) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === item) { return true; }
      }
      return false;
    };

    return a;
  }

  //the context object of a test (e.g. "this")
  function assertionContext() {
    var callback;
    var name;

    function areEqual(expected, actual) {
      callback(expected == actual, expected, actual);
    }

    function areSame(expected, actual) {
      callback(expected === actual, expected, actual);
    }

    function that(expr) {
      callback(expr, true, expr);
    }

    function setTestResult(c) {
      callback = c;
    }

    return {
      areEqual: areEqual,
      that: that,
      setTestResult: setTestResult
    };
  }

  //run single test fixture (e.g. test methods on single object)
  var testId = 0;
  function runFixture(tests) {
    var tests = tests();

    var reserved = array(["setup", "teardown", "name"]);
    var asserter = assertionContext();
    var result = array();
    
    for (var i in tests) {
      if (reserved.contains(i)) {
        continue;
      }

      asserter.setTestResult(function (r,expected,actual) { result.push({ name: i, result: r, fixture: tests.name, testId: testId, expected:expected,actual:actual }); });

      try {
        if (tests.setup !== undefined) tests.setup();
        tests[i].call(asserter);
        if (tests.teardown !== undefined) tests.teardown();
      }
      catch (ex) {
        result.push({ name: i, result: false, error: ex.description, fixture: tests.name, testId: testId });
      }
      testId++;
    }

    return result;
  }

  //register a single test fixture
  var testFixtures = [];
  function register(f) {
    testFixtures.push(f);
  }

  //run all tests
  function run(callbacks) {
    var fixtures = testFixtures;
    for (var i = 0; i < fixtures.length; i++) {
      callbacks.onFixtureRun(runFixture(fixtures[i]));
    }
  }

  //make public
  return {
    register: register,   //register a testfixture
    run: run              //run all test fixtures
  }
})();