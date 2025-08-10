import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schemas/index.ts"; // importe apenas as tabelas necessárias

const { rooms, questions } = schema;

await reset(db, { rooms, questions });

await seed(db, { rooms, questions }).refine((f) => {
	return {
		rooms: {
			count: 5,
			columns: {
				name: f.companyName(),
				description: f.loremIpsum(),
			},
		},
		questions: {
			count: 20,
		},
	};
});

await sql.end();

console.log("Database seeded successfully.");
