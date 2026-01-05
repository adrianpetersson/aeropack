/** biome-ignore-all lint/correctness/noUnusedVariables: might be used later */
import { db } from "./db";
import { listItems, packingLists } from "./schema";

async function main() {
	console.log("Emptying library...");
	// Clear existing to avoid unique constraint errors during dev
	// await db.delete(weightLibrary);

	console.log("Seeding weight library...");

	const items = [
		// --- CLOTHING ---
		{
			searchTerm: "T-Shirt (Cotton)",
			category: "clothing",
			suggestedWeightG: 150,
			isVerified: true,
		},
		{
			searchTerm: "Jeans (Denim)",
			category: "clothing",
			suggestedWeightG: 650,
			isVerified: true,
		},
		{
			searchTerm: "Hoodie",
			category: "clothing",
			suggestedWeightG: 550,
			isVerified: true,
		},
		{
			searchTerm: "Underwear",
			category: "clothing",
			suggestedWeightG: 50,
			isVerified: true,
		},
		{
			searchTerm: "Socks (Pair)",
			category: "clothing",
			suggestedWeightG: 60,
			isVerified: true,
		},
		{
			searchTerm: "Light Jacket/Windbreaker",
			category: "clothing",
			suggestedWeightG: 300,
			isVerified: true,
		},
		{
			searchTerm: "Swim Shorts",
			category: "clothing",
			suggestedWeightG: 150,
			isVerified: true,
		},
		{
			searchTerm: "Puffer Jacket (Down)",
			category: "clothing",
			suggestedWeightG: 450,
			isVerified: true,
		},

		// --- TECH ---
		{
			searchTerm: "Laptop (MacBook Pro 14)",
			category: "tech",
			suggestedWeightG: 1600,
			isVerified: true,
		},
		{
			searchTerm: "Laptop (MacBook Air)",
			category: "tech",
			suggestedWeightG: 1240,
			isVerified: true,
		},
		{
			searchTerm: "iPhone / Smartphone",
			category: "tech",
			suggestedWeightG: 200,
			isVerified: true,
		},
		{
			searchTerm: "Laptop Charger (GaN)",
			category: "tech",
			suggestedWeightG: 250,
			isVerified: true,
		},
		{
			searchTerm: "Power Bank (10,000mAh)",
			category: "tech",
			suggestedWeightG: 220,
			isVerified: true,
		},
		{
			searchTerm: "Kindle / E-Reader",
			category: "tech",
			suggestedWeightG: 205,
			isVerified: true,
		},
		{
			searchTerm: "Headphones (Over-ear)",
			category: "tech",
			suggestedWeightG: 250,
			isVerified: true,
		},
		{
			searchTerm: "AirPods / Earbuds",
			category: "tech",
			suggestedWeightG: 50,
			isVerified: true,
		},
		{
			searchTerm: "Universal Travel Adapter",
			category: "tech",
			suggestedWeightG: 150,
			isVerified: true,
		},

		// --- TOILETRIES ---
		{
			searchTerm: "Toiletry Bag (Empty)",
			category: "toiletries",
			suggestedWeightG: 100,
			isVerified: true,
		},
		{
			searchTerm: "Electric Toothbrush",
			category: "toiletries",
			suggestedWeightG: 120,
			isVerified: true,
		},
		{
			searchTerm: "Liquid Pouch (Filled 1L)",
			category: "toiletries",
			suggestedWeightG: 450,
			isVerified: true,
		},
		{
			searchTerm: "Solid Deodorant",
			category: "toiletries",
			suggestedWeightG: 80,
			isVerified: true,
		},
		{
			searchTerm: "Microfiber Towel",
			category: "toiletries",
			suggestedWeightG: 200,
			isVerified: true,
		},

		// --- BAGS (FOR THE BASE WEIGHT FEATURE) ---
		{
			searchTerm: "Hard-shell Carry-on (Empty)",
			category: "bags",
			suggestedWeightG: 2800,
			isVerified: true,
		},
		{
			searchTerm: "Travel Backpack (40L)",
			category: "bags",
			suggestedWeightG: 1400,
			isVerified: true,
		},
		{
			searchTerm: "Daypack (20L)",
			category: "bags",
			suggestedWeightG: 500,
			isVerified: true,
		},
		{
			searchTerm: "Packable Tote/Duffel",
			category: "bags",
			suggestedWeightG: 150,
			isVerified: true,
		},

		// --- MISC ---
		{
			searchTerm: "Passport",
			category: "misc",
			suggestedWeightG: 35,
			isVerified: true,
		},
		{
			searchTerm: "Sunglasses + Case",
			category: "misc",
			suggestedWeightG: 120,
			isVerified: true,
		},
		{
			searchTerm: "Water Bottle (Stainless 750ml)",
			category: "misc",
			suggestedWeightG: 300,
			isVerified: true,
		},
	];

	//  await db.insert(weightLibrary).values(items);

	const [newTrip] = await db
		.insert(packingLists)
		.values({
			id: "00000000-0000-0000-0000-000000000000", // Fixed ID for testing
			title: "Tokyo Trip",
			maxWeightG: 7000,
			bagWeightG: 1200,
		})
		.returning();

	await db.insert(listItems).values({
		listId: newTrip.id,
		name: "Testing Laptop",
		weightG: 1400,
		quantity: 1,
		isWorn: false,
	});

	console.log("Seeding complete! ✈️");
}

main().catch((err) => {
	console.error("Seed failed!");
	console.error(err);
	process.exit(1);
});
