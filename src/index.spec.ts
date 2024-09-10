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
