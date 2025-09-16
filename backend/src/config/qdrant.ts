import { QdrantClient } from '@qdrant/js-client-rest';
import { vectorDbConfig } from './environment';
import { logger } from '../utils/logger';

let qdrantClient: QdrantClient | null = null;

export const initializeQdrant = async (): Promise<void> => {
  try {
    if (!vectorDbConfig.qdrantUrl) {
      logger.warn('Qdrant URL not provided, vector search will be disabled');
      return;
    }

    // Initialize Qdrant client
    qdrantClient = new QdrantClient({
      url: vectorDbConfig.qdrantUrl,
      apiKey: vectorDbConfig.qdrantApiKey,
    });

    // Test connection
    const collections = await qdrantClient.getCollections();
    logger.info(`Connected to Qdrant: ${collections.collections?.length || 0} collections found`);

    // Check if our collection exists, create if not
    await ensureCollection();

    logger.info('Qdrant vector database initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Qdrant:', error);
    throw error;
  }
};

export const ensureCollection = async (): Promise<void> => {
  if (!qdrantClient) {
    throw new Error('Qdrant client not initialized');
  }

  try {
    const collectionName = vectorDbConfig.collectionName;
    
    // Check if collection exists
    const collections = await qdrantClient.getCollections();
    const collectionExists = collections.collections?.some(
      (collection) => collection.name === collectionName
    );

    if (!collectionExists) {
      // Create collection with appropriate vector configuration
      await qdrantClient.createCollection(collectionName, {
        vectors: {
          size: 1536, // OpenAI ada-002 embedding size
          distance: 'Cosine', // Cosine similarity for text embeddings
        },
        optimizers_config: {
          default_segment_number: 2,
        },
        replication_factor: 1,
      });

      logger.info(`Created Qdrant collection: ${collectionName}`);
    } else {
      logger.info(`Qdrant collection already exists: ${collectionName}`);
    }
  } catch (error) {
    logger.error('Failed to ensure Qdrant collection:', error);
    throw error;
  }
};

export const getQdrantClient = (): QdrantClient => {
  if (!qdrantClient) {
    throw new Error('Qdrant client not initialized. Call initializeQdrant() first.');
  }
  return qdrantClient;
};

// Vector search operations
export const searchVectors = async (
  vector: number[],
  limit: number = 10,
  filter?: any
) => {
  const client = getQdrantClient();
  const collectionName = vectorDbConfig.collectionName;

  try {
    const searchResult = await client.search(collectionName, {
      vector,
      limit,
      filter,
      with_payload: true,
      with_vector: false,
    });

    return searchResult;
  } catch (error) {
    logger.error('Vector search failed:', error);
    throw error;
  }
};

export const insertVector = async (
  id: string,
  vector: number[],
  payload: Record<string, any>
) => {
  const client = getQdrantClient();
  const collectionName = vectorDbConfig.collectionName;

  try {
    await client.upsert(collectionName, {
      wait: true,
      points: [
        {
          id,
          vector,
          payload,
        },
      ],
    });

    logger.debug(`Vector inserted: ${id}`);
  } catch (error) {
    logger.error('Vector insertion failed:', error);
    throw error;
  }
};

export const deleteVector = async (id: string) => {
  const client = getQdrantClient();
  const collectionName = vectorDbConfig.collectionName;

  try {
    await client.delete(collectionName, {
      wait: true,
      points: [id],
    });

    logger.debug(`Vector deleted: ${id}`);
  } catch (error) {
    logger.error('Vector deletion failed:', error);
    throw error;
  }
};

export const getCollectionInfo = async () => {
  const client = getQdrantClient();
  const collectionName = vectorDbConfig.collectionName;

  try {
    const info = await client.getCollection(collectionName);
    return info;
  } catch (error) {
    logger.error('Failed to get collection info:', error);
    throw error;
  }
};
