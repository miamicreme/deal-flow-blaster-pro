
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyData, analysisType } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    switch (analysisType) {
      case 'deal-analysis':
        systemPrompt = `You are a real estate investment expert. Analyze the property deal and provide a comprehensive assessment including deal score (0-100), key factors, and investment recommendation.`;
        userPrompt = `Analyze this property deal:
Address: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
Asking Price: $${propertyData.price}
ARV: $${propertyData.arv}
MAO: $${propertyData.mao}
Bedrooms: ${propertyData.bedrooms}
Bathrooms: ${propertyData.bathrooms}
Square Feet: ${propertyData.sqft}
Year Built: ${propertyData.yearBuilt}

Provide analysis in JSON format with: score (0-100), rating (Excellent/Good/Fair/Poor), confidence (0-100), factors array with {factor, impact: positive/negative/neutral, description}, and recommendation.`;
        break;

      case 'property-description':
        systemPrompt = `You are a professional real estate copywriter. Create compelling property descriptions for marketing materials.`;
        userPrompt = `Create a professional property description for:
Address: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
Bedrooms: ${propertyData.bedrooms}
Bathrooms: ${propertyData.bathrooms}
Square Feet: ${propertyData.sqft}
Year Built: ${propertyData.yearBuilt}
Lot Size: ${propertyData.lotSize} acres
Current Description: ${propertyData.description}

Create an engaging description highlighting investment potential and key features.`;
        break;

      case 'market-insights':
        systemPrompt = `You are a real estate market analyst. Provide insights about the local market conditions and investment opportunities.`;
        userPrompt = `Provide market insights for ${propertyData.city}, ${propertyData.state}. Include market trends, investment potential, and area highlights.`;
        break;

      default:
        throw new Error('Invalid analysis type');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Try to parse as JSON for deal-analysis, otherwise return as text
    let parsedResult;
    if (analysisType === 'deal-analysis') {
      try {
        parsedResult = JSON.parse(result);
      } catch {
        // If JSON parsing fails, create a fallback structure
        parsedResult = {
          score: 50,
          rating: 'Fair',
          confidence: 60,
          factors: [
            {
              factor: 'AI Analysis',
              impact: 'neutral',
              description: 'Analysis completed but formatting issues occurred'
            }
          ],
          recommendation: result
        };
      }
    } else {
      parsedResult = { content: result };
    }

    return new Response(JSON.stringify(parsedResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openai-property-analysis function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
