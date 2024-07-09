export async function translateText(
  fromLanguage: string,
  fromText: string,
  toLanguage: string,
) {
  const sourceLanguage = fromLanguage;
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${sourceLanguage}|${toLanguage}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}
