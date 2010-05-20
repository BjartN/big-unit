
function gui() {
  tester.run({ onFixtureRun: printFixtureResult });

  function print(s,isError) {
    enviroment.print(s, isError);
  }

  function printFixtureResult(testResult) {
    //testresult {testId:, name:, result:, expected:, actual:, error:}

    var err = false;
    for (var i = 0; i < testResult.length; i++) {
      var result = testResult[i];
      printTest(result);
      if (result.error !== undefined) {
        printError(result);
      }

      if (result.error !== undefined || !result.result) {
        err = true;
      }
    }

    if (err) {
      print("************ FAILURE ************", true);
      enviroment.quitWithError();
   }
  }

  function printTest(result) {
    print(result.testId + ": " + result.fixture + ": " + result.name + "\t (" + (result.result ? "ok" : "failed") + ")");
    if (!result.result) {
      print(" Expected: " + result.expected + " Actual: " + result.actual);
    }
  }

  function printError(result) {
    print("\t Error:" + (result.error ? result.error : "-"));
  }
}

var enviroment = {

  quitWithError: function () {
    WScript.Application.Quit(1);
  },

  print: function(s, isError) {
    if (!isError) {
      WScript.Echo(s); 
    }
    else {
      WScript.StdErr.WriteLine(s);
    }
  }

}
