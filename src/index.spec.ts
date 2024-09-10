import { describe, expect, it } from "@rbxts/jest-globals";
import { pack, packResult } from "./index";

describe("pack", () => {
	it("should pack the values", () => {
		const [length, values] = pack(1, 2, 3);

		expect(length).toBe(3);
		expect(values).toEqual([1, 2, 3]);
	});

	it("should support empty arguments when packing the values", () => {
		const [length, values] = pack();

		expect(length).toBe(0);
		expect(values).toEqual([]);
	});

	it("should support nils in between or after the arguments provided", () => {
		const [length, values] = pack(1, undefined, 2);

		expect(length).toBe(3);
		expect(values).toEqual([1, undefined, 2]);

		const [length_1, values_1] = pack(undefined, 1, undefined, 2, undefined);

		expect(length_1).toBe(5);
		expect(values_1).toEqual([undefined, 1, undefined, 2, undefined]);
	});
});

describe("packResult", () => {
	it("should pack the values", () => {
		const [success, length, values] = packResult(true, 1, 2, 3);

		expect(success).toBe(true);
		expect(length).toBe(3);
		expect(values).toEqual([1, 2, 3]);
	});

	it("should silently ignore the empty arguments", () => {
		const patchedPackResult = packResult as () => ReturnType<typeof packResult>;
		const [success, length, values] = patchedPackResult();

		expect(success).toBe(undefined);
		expect(length).toBe(0);
		expect(values).toEqual([]);
	});

	it("should support empty arguments when packing the values", () => {
		const [success, length, values] = packResult(true);

		expect(success).toBe(true);
		expect(length).toBe(0);
		expect(values).toEqual([]);
	});

	it("should support nils in between or after the arguments provided", () => {
		const [success, length, values] = packResult(true, 1, undefined, 2);

		expect(success).toBe(true);
		expect(length).toBe(3);
		expect(values).toEqual([1, undefined, 2]);

		const [success_1, length_1, values_1] = packResult(true, undefined, 1, undefined, 2, undefined);

		expect(success_1).toBe(true);
		expect(length_1).toBe(5);
		expect(values_1).toEqual([undefined, 1, undefined, 2, undefined]);
	});
});
