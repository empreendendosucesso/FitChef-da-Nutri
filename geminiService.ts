import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "./types";
import { v4 as uuidv4 } from 'https://esm.sh/uuid@9.0.1';

export const generateFitRecipe = async (prompt: string): Promise<Recipe> => {
  // Cria uma nova instância do GoogleGenAI a cada chamada para garantir que a chave API mais recente seja usada.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const recipeSchema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'The name of the fit recipe.' },
      description: { type: Type.STRING, description: 'A short description of the recipe, highlighting its fit aspects.' },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of ingredients for the recipe.'
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Step-by-step instructions for preparing the recipe.'
      },
      macros: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.STRING, description: 'Total estimated calories (e.g., "350 kcal").' },
          protein: { type: Type.STRING, description: 'Total estimated protein (e.g., "30g").' },
          carbs: { type: Type.STRING, description: 'Total estimated carbohydrates (e.g., "35g").' },
          fat: { type: Type.STRING, description: 'Total estimated fat (e.g., "12g").' }
        },
        required: ['calories', 'protein', 'carbs', 'fat'],
        propertyOrdering: ['calories', 'protein', 'carbs', 'fat'],
      },
      tips: { type: Type.STRING, description: 'An expert tip or variation for the recipe from a nutritionist perspective.' },
    },
    required: ['name', 'description', 'ingredients', 'instructions', 'macros', 'tips'],
    propertyOrdering: ['name', 'description', 'ingredients', 'instructions', 'macros', 'tips'],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Modelo adequado para tarefas de texto
      contents: [{ parts: [{ text: `Crie uma receita fit e saudável para o seguinte prato: "${prompt}". A receita deve ser rica em detalhes e incluir macros. Foque em ingredientes frescos e preparo simples. ` }] }],
      config: {
        systemInstruction: `Você é um nutricionista experiente e chef de cozinha, especializado em criar receitas fit, saudáveis e saborosas. Suas receitas devem ser práticas, com foco em ingredientes frescos e equilíbrio nutricional. Forneça sempre informações detalhadas e dicas úteis para um estilo de vida saudável.`,
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonStr = response.text;
    const generatedRecipe: Omit<Recipe, 'id' | 'imageUrl'> = JSON.parse(jsonStr);

    return {
      id: uuidv4(), // Gera um ID único no cliente
      ...generatedRecipe,
      imageUrl: undefined, // Gemini Text não gera imagens diretamente
    };
  } catch (error) {
    console.error("Erro ao gerar receita com Gemini:", error);
    throw new Error("Não foi possível gerar a receita. Tente novamente mais tarde.");
  }
};