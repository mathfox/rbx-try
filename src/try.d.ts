interface TryProps {
	/**
	 * This function should throw an error.
	 */
	onYield: (callback: Callback) => void;

	/**
	 * This function should throw an error.
	 */
	onError: (callback: Callback) => void;
}

/**
 * Constructs a function that:
 *
 * Calls the given function and returns the result.
 * If the function yields or throws an error, the thread is closed and an error is thrown.
 * Regardless of the outcome, the `onFinally` function is called to clean up any resources.
 */
export function createTry(
	props: TryProps,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): <TInput extends ReadonlyArray<any>, TOutput>(
	callback: (...input: TInput) => TOutput,
	onFinally: Callback | undefined,
	...input: TInput
) => TOutput;
