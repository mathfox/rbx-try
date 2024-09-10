import { expect, it } from "@rbxts/jest-globals";
import { createTry } from "index";

it("should not allow yielding in the callback", () => {
	expect(() => {
		const noyield = createTry({
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
