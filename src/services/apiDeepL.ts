const authKey = import.meta.env.VITE_DEEPL_API_KEY;
const apiUrl = 'https://api-free.deepl.com/v2/translate';

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${authKey}`,
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLang,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};
