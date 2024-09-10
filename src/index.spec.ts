import { expect, it } from "@rbxts/jest-globals";
import { createTry } from "index";

it("should return a proper value", () => {
	const safe = createTry<number>({
		onError: () => {
			error("onError");
		},
		onYield: () => {
			error("onYield");
		},
	});

	expect(
		safe(() => {
			return 3;
		}),
	).toBe(3);

	expect(
		safe(() => {
			return -3;
		}),
	).toBe(-3);
});

it("should not allow yielding in the callback", () => {
	expect(() => {
		const noyield = createTry<void>({
			onError: () => {
				error("");
			},
			onYield: () => {
				error("yielded");
			},
		});

		noyield(() => {
			task.wait();
		});
	}).toThrow("yielded");
});

it("should not allow errors in the callback", () => {
	expect(() => {
		const noerror = createTry({
			onError: () => {
				error("an error happened");
			},
			onYield: (errorValue) => {
				expect(errorValue).toContain("custom err");

				error("");
			},
		});

		noerror(() => {
			error("custom err");
		});
	}).toThrow("an error happened");
});

it("should support a fallback on yield", () => {
	const safe = createTry<number>({
		onError: () => {
			error("");
		},
		onYield: () => {
			return 100;
		},
	});

	expect(
		safe(() => {
			task.wait();

			return 1;
		}),
	).toBe(100);
});

it("should support a fallback on error", () => {
	const safe = createTry<number>({
		onError: (errorValue) => {
			expect(errorValue).toContain("some error");

			return 200;
		},
		onYield: () => {
			error("");
		},
	});

	expect(
		safe(() => {
			error("some error");
		}),
	).toBe(200);
});
