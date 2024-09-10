# rbx-try

Exposes a constructor function `createTry` that creates a function that:

Calls the given function and returns the result.
If the function yields or throws an error, the thread is closed and an error is thrown.
Regardless of the outcome, the `finally` function is called to clean up any resources.