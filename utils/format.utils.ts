import slugify from "slugify";

export const gramsToKg = (grams: number, withUnit: boolean = true): string => {
	return withUnit
		? `${(grams / 1000).toFixed(2)} kg`
		: (grams / 1000).toFixed(2);
};

export const generateSlug = (text: string) => {
	return slugify(text, {
		lower: true,
		strict: true,
		trim: true,
	});
};
