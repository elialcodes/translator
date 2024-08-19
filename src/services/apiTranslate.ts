//tipado para todo el Response: es un objeto (interface) que tiene,
//entre otras,la propiedad responseData que a su vez es un objeto
//con la propiedad traslatedText, que será un string:
interface Response {
  responseData: { translatedText: string };
}

export async function translateText(
  fromLanguage: string,
  fromText: string,
  toLanguage: string,
): Promise<string> {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLanguage}|${toLanguage}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: Response = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}
