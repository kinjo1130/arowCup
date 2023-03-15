/* eslint-disable quote-props */
/* eslint-disable max-len */
import * as functions from 'firebase-functions';

// const cors = require('cors')({
//   origin: true,
// });

export const chatGPT = functions.region('asia-northeast2').https.onRequest(async (req, res) => {
  if (req.method !== 'POST') return;
  res.set('Access-Control-Allow-Origin', '*');
  functions.logger.info('firebase functionsに届いたよ!', {
    structuredData: true,
  });
  const apiKey = process.env.CHATGPT_API_KEY;

  // APIエンドポイントを設定する
  const endpoint = process.env.ENDPOINT ?? '';

  // APIリクエストボディを設定する
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        // todo: ここにユーザーの入力を入れる
        content: `${req.body}観光コース 地名 リスト 7個 説明なし`,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    n: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseBody = await response.json();
      // レスポンス結果をコンソールに出力する
      const format = responseBody.choices[0].message.content.split(/\s*[1-9]\.\s*/).map((i: any) => i.replace(/[-:].*/, ''));
      res.status(200).json(format);
    })
    .catch((err) => {
      console.log('err', err);
    });
});
