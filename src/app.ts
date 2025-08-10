import fastify from "fastify";

const app = fastify({
	logger: true,
});

app.get("/health", (req, res) => {
	res.send({ message: "Success" });
});

async function main() {
	app.listen({
		port: 3333,
		host: "0.0.0.0",
	});
}

// graceful shutdown
const listners = ["SIGINT", "SIGTERM"];
listners.forEach((signal) => {
	process.on(signal, async () => {
		await app.close();
		process.exit(0);
	});
});

main();
