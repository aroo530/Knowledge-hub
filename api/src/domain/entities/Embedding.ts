export class Embedding {
    constructor(
      public id: number | null, // `null` when creating a new embedding
      public knowledgeId: number,
      public vector: number[] // Store the vector as an array
    ) {}
  }
  