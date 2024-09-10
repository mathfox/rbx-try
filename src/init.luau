--!strict
--!native
--!optimize 2

local packResult = require(script.Parent:WaitForChild("pack"):WaitForChild("out")).packResult

type Callback = (...any) -> ...any

type TryProps = {
	onYield: (callback: Callback) -> (),
	onError: (error: unknown, callback: Callback) -> (),
}

local function createTry(props: TryProps)
	--[=[
        Calls the given function and returns the result.
        If the function yields or throws an error, the thread is closed and an error is thrown.
        Regardless of the outcome, the `finally` function is called to clean up any resources.

        @param callback The function to run.
        @param finally Cleanup logic to run before error handling.
        @param ... Arguments to pass to the callback.
        @return ... The results of the callback.
    ]=]
	local function try<TOutput, TInput...>(callback: (TInput...) -> TOutput | nil, finally: Callback | nil, ...: TInput...): TOutput
		local thread = coroutine.create(callback)
		local success, resultCount, result = packResult(coroutine.resume(thread, ...))

		if finally then
			finally()
		end

		-- check whether the thread was yielded.
		if coroutine.status(thread) ~= "dead" then
			coroutine.close(thread)

			props.onYield(callback)
		elseif not success then
			props.onError(result[1], callback)
		end

		return unpack(result :: { any }, 1, resultCount)
	end

	return try
end

local exports = {
	createTry = createTry,
}

return exports
