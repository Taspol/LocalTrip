/**
 * @swagger
 * /api/v1/trails:
 *   get:
 *     tags: [Trails]
 *     summary: Get all trails
 *     description: Retrieve a list of hiking trails with optional filtering and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of trails per page
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, moderate, hard, expert]
 *         description: Filter by difficulty level
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location/region
 *       - in: query
 *         name: minDistance
 *         schema:
 *           type: number
 *         description: Minimum trail distance in kilometers
 *       - in: query
 *         name: maxDistance
 *         schema:
 *           type: number
 *         description: Maximum trail distance in kilometers
 *       - in: query
 *         name: features
 *         schema:
 *           type: string
 *         description: Comma-separated list of desired features
 *     responses:
 *       200:
 *         description: List of trails retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trails:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trail'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 150
 *                     pages:
 *                       type: integer
 *                       example: 8
 *       400:
 *         description: Bad request (invalid parameters)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/trails/{trailId}:
 *   get:
 *     tags: [Trails]
 *     summary: Get trail by ID
 *     description: Retrieve detailed information about a specific trail
 *     parameters:
 *       - in: path
 *         name: trailId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique trail identifier
 *     responses:
 *       200:
 *         description: Trail information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trail'
 *       404:
 *         description: Trail not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/trails/search:
 *   get:
 *     tags: [Trails, Search]
 *     summary: Search trails
 *     description: Search for trails using text query and location-based filters
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (trail name, location, features)
 *         example: waterfall mountain view
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         description: Latitude for location-based search
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *         description: Longitude for location-based search
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *           default: 50
 *         description: Search radius in kilometers
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [easy, moderate, hard, expert]
 *         description: Filter by difficulty level
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trails:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trail'
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 query:
 *                   type: string
 *                   example: waterfall mountain view
 *       400:
 *         description: Bad request (invalid search parameters)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/trails/{trailId}/weather:
 *   get:
 *     tags: [Trails]
 *     summary: Get trail weather information
 *     description: Get current weather conditions and forecast for a specific trail
 *     parameters:
 *       - in: path
 *         name: trailId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique trail identifier
 *     responses:
 *       200:
 *         description: Weather information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current:
 *                   type: object
 *                   properties:
 *                     temperature:
 *                       type: number
 *                       example: 18.5
 *                     humidity:
 *                       type: number
 *                       example: 65
 *                     windSpeed:
 *                       type: number
 *                       example: 12.3
 *                     conditions:
 *                       type: string
 *                       example: "Partly Cloudy"
 *                     visibility:
 *                       type: number
 *                       example: 10
 *                 forecast:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       high:
 *                         type: number
 *                       low:
 *                         type: number
 *                       conditions:
 *                         type: string
 *                       precipitation:
 *                         type: number
 *       404:
 *         description: Trail not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
