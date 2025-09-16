/**
 * @swagger
 * /api/v1/trips:
 *   get:
 *     tags: [Trips]
 *     summary: Get user trips
 *     description: Retrieve all trips created by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [planned, active, completed, cancelled]
 *         description: Filter trips by status
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
 *           maximum: 50
 *           default: 10
 *         description: Number of trips per page
 *     responses:
 *       200:
 *         description: Trips retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trips:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Trip'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     tags: [Trips]
 *     summary: Create a new trip
 *     description: Create a new hiking trip plan
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - destination
 *               - startDate
 *               - endDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Weekend Hike in Yosemite"
 *               description:
 *                 type: string
 *                 example: "A relaxing weekend hike with friends"
 *               destination:
 *                 type: string
 *                 example: "Yosemite National Park"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-15"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-16"
 *               difficulty:
 *                 type: string
 *                 enum: [easy, moderate, hard, expert]
 *                 example: "moderate"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["hiking", "nature", "photography"]
 *               budget:
 *                 type: number
 *                 example: 500
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["friend1@email.com", "friend2@email.com"]
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trip created successfully"
 *                 trip:
 *                   $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad request (validation errors)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/trips/{tripId}:
 *   get:
 *     tags: [Trips]
 *     summary: Get trip by ID
 *     description: Retrieve detailed information about a specific trip
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique trip identifier
 *     responses:
 *       200:
 *         description: Trip information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     tags: [Trips]
 *     summary: Update trip
 *     description: Update an existing trip (only by trip creator)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique trip identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               destination:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               difficulty:
 *                 type: string
 *                 enum: [easy, moderate, hard, expert]
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               budget:
 *                 type: number
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trip updated successfully"
 *                 trip:
 *                   $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (not trip creator)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     tags: [Trips]
 *     summary: Delete trip
 *     description: Delete an existing trip (only by trip creator)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique trip identifier
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trip deleted successfully"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden (not trip creator)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
