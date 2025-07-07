import sortPackage, { SORT_STACKS } from "robo-sort";

describe("Testing Edge Cases - sortPackage()", () => {
	const cases = [
		{
			name: "STANDARD -> Below all thresholds",
			pkg: { height: 40, width: 50, length: 30, mass: 10 },
			want: SORT_STACKS.STANDARD,
		},
		{
			name: "SPECIAL -> Heavy ONLY (>= 20kg)",
			pkg: { height: 15, width: 15, length: 15, mass: 20 },
			want: SORT_STACKS.SPECIAL,
		},
		{
			name: "SPECIAL -> Bulky by Volume (exactly 1_000_000cm³)",
			pkg: { height: 100, width: 100, length: 100, mass: 10 },
			want: SORT_STACKS.SPECIAL,
		},
		{
			name: "SPECIAL -> Bulky by Dimension (one dimensions exactly 150cm)",
			pkg: { height: 50, width: 150, length: 50, mass: 10 },
			want: SORT_STACKS.SPECIAL,
		},
		{
			name: "REJECTED -> BOTH Heavy AND Bulky",
			pkg: { height: 50, width: 151, length: 50, mass: 21 },
			want: SORT_STACKS.REJECTED,
		},
		{
			name: "STANDARD -> Boundary: All Dimensions < 150cm AND Mass < 20kg",
			pkg: { height: 149.999, width: 149.999, length: 1, mass: 19.999 },
			want: SORT_STACKS.STANDARD,
		},
		{
			name: "STANDARD -> Boundary: At least 1 Dimension < 150cm",
			pkg: { height: 100, width: 149.999, length: 50, mass: 15 },
			want: SORT_STACKS.STANDARD,
		},
		{
			name: "SPECIAL -> Boundary: At least 1 Dimension >= 150cm",
			pkg: { height: 100, width: 150, length: 50, mass: 15 },
			want: SORT_STACKS.SPECIAL,
		},
		{
			name: "SPECIAL -> Extreme Dimension (length)",
			pkg: { height: 100, width: 100, length: 1_000_000, mass: 10 },
			want: SORT_STACKS.SPECIAL,
		},
		{
			name: "SPECIAL -> Extreme Volume",
			pkg: { height: 1000, width: 1000, length: 1000, mass: 10 },
			want: SORT_STACKS.SPECIAL,
		},
	];

	test.each(cases)("$name", ({ pkg, want }) => {
		expect(sortPackage(pkg)).toBe(want);
	});
});

describe("Package Input Validation - sortPackage()", () => {
	const invalidPackages = [
		{ case: "Negative Dimension", pkg: { width: -1, height: 10, length: 10, mass: 10 } },
		{ case: "Zero Mass", pkg: { width: 10, height: 10, length: 10, mass: 0 } },
		{ case: "Infinite Mass", pkg: { width: 10, height: 10, length: 10, mass: Infinity } },
		{ case: "NaN Dimension", pkg: { width: NaN, height: 10, length: 10, mass: 10 } },
		{ case: "Invalid Type Dimension", pkg: { width: "150", height: 10, length: 10, mass: 10 } },
		{ case: "Missing Field (mass)", pkg: { width: 10, height: 10, length: 10 /* mass */ } },
	];

	test.each(invalidPackages)("Throws on $case", ({ pkg }) => {
		expect(() => sortPackage(pkg)).toThrow(TypeError);
	});
});
