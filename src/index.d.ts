interface TryProps<TOutput> {
	/**
	 * This function should throw an error.
	 */
	onYield: (callback: Callback) => TOutput;

	/**
	 * This function should throw an error.
	 */
	onError: (error: unknown, callback: Callback) => TOutput;
}

/**
 * Constructs a function that:
 *
 * Calls the given function and returns the result.
 * If the function yields or throws an error, the thread is closed and an error is thrown.
 * Regardless of the outcome, the `onFinally` function is called to clean up any resources.
 */
export function createTry<TOutput>(
	props: TryProps<TOutput>,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): <TInput extends ReadonlyArray<any>>(
	callback: (...input: TInput) => TOutput,
	onFinally?: Callback | undefined,
	...input: TInput
) => TOutput;
