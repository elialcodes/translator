// const authKey = import.meta.env.VITE_OPENAI_API_KEY;
// //const apiUrl = 'https://api-free.deepl.com/v2/translate';
// const apiUrl = 'https://api.openai.com/v1/chat/completions';

// export const translateText = (text: string, targetLang: string) => {
//   const prompt = `Translate the following text from Spanish to ${targetLang}:\n\n${text}`;

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${authKey}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }],
//     }),
//   };

//   return fetch(apiUrl, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Translation request failed');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.choices[0].message.content.trim());
//       return data.choices[0].message.content.trim();
//     })
//     .catch((error) => {
//       console.error('Error translating text:', error);
//       throw error;
//     });
// };

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
