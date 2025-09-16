/**
 * @swagger
 * /api/v1/ai/chat:
 *   post:
 *     tags: [AI]
 *     summary: Chat with AI assistant
 *     description: Send a message to the AI hiking assistant for trip planning, trail recommendations, and hiking advice
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 example: "I want to plan a 3-day hiking trip in Colorado. What trails do you recommend?"
 *               context:
 *                 type: object
 *                 properties:
 *                   location:
 *                     type: string
 *                     example: "Denver, CO"
 *                   experience:
 *                     type: string
 *                     enum: [beginner, intermediate, advanced, expert]
 *                     example: "intermediate"
 *                   tripId:
 *                     type: string
 *                     description: "Related trip ID if this chat is about a specific trip"
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "Based on your location and experience level, I recommend these trails in Colorado..."
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "trail"
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                 conversationId:
 *                   type: string
 *                   example: "conv_123456789"
 *       400:
 *         description: Bad request (invalid message)
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
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/ai/speech-to-text:
 *   post:
 *     tags: [AI]
 *     summary: Convert speech to text
 *     description: Upload an audio file and convert it to text using Whisper AI
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - audio
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *                 description: Audio file (mp3, wav, m4a, etc.)
 *               language:
 *                 type: string
 *                 example: "en"
 *                 description: "Optional language hint for better transcription"
 *     responses:
 *       200:
 *         description: Speech converted to text successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: "I want to find a hiking trail near Yosemite with waterfalls"
 *                 confidence:
 *                   type: number
 *                   example: 0.95
 *                 duration:
 *                   type: number
 *                   example: 3.5
 *                   description: "Audio duration in seconds"
 *                 language:
 *                   type: string
 *                   example: "en"
 *       400:
 *         description: Bad request (invalid audio file)
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
 *       413:
 *         description: File too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/ai/recommendations:
 *   post:
 *     tags: [AI]
 *     summary: Get AI-powered trail recommendations
 *     description: Get personalized trail recommendations based on user preferences and past activities
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferences:
 *                 type: object
 *                 properties:
 *                   difficulty:
 *                     type: string
 *                     enum: [easy, moderate, hard, expert]
 *                   maxDistance:
 *                     type: number
 *                     example: 15
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["waterfall", "mountain_view", "wildlife"]
 *                   location:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                       longitude:
 *                         type: number
 *                       radius:
 *                         type: number
 *                         example: 50
 *               context:
 *                 type: object
 *                 properties:
 *                   season:
 *                     type: string
 *                     example: "summer"
 *                   groupSize:
 *                     type: integer
 *                     example: 4
 *                   duration:
 *                     type: string
 *                     example: "half_day"
 *     responses:
 *       200:
 *         description: Recommendations generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Trail'
 *                       - type: object
 *                         properties:
 *                           score:
 *                             type: number
 *                             example: 0.92
 *                           reasons:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["Matches difficulty preference", "Has waterfall feature", "Good for groups"]
 *                 totalRecommendations:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
