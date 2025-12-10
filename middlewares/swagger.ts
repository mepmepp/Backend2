import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: { openapi: "3.0.3", info: { title: "Demo", version: "1.0.0" },
  servers: [{ url: "http://localhost:3000" }] },
  apis: ["./**/*.ts"],
});

/**
 * @openapi
 * /random-challenge:
 *   get:
 *     summary: Start a random challenge between the specified dresseur and its opponent
 *     description: "Picks a random Pokemon for both the requesting dresseur and their enemy, runs the fight logic on the server and returns a confirmation HTML response (detailed logs are written to the server console)."
 *     parameters:
 *       - in: query
 *         name: dresseur
 *         required: true
 *         description: ID of the dresseur initiating the random challenge (integer, typically 1 or 2 in fixtures)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Valid request — the challenge was started and a confirmation HTML message is returned
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h1>Valid request. See logs for the rest of the game.</h1>"
 *       400:
 *         description: Bad request — missing or invalid `dresseur` query parameter or dresseur not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h1>You need to add a dresseur query parameter to the request.</h1>"
 *       404:
 *         description: Not found — the requested resource was not found
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h1>Invalid dresseur ID. This dresseur doesn't exist.</h1>"
 */