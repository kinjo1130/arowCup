import type { NextApiRequest, NextApiResponse } from 'next';

export default async function chatGPT(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return;
  console.log('inputText', req.body);
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
        content: `${req.body}観光コース 地名 リスト 6個 説明なし`,
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
  console.log('apiRouteに届いた');
  await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      console.log('response', response);
      const responseBody = await response.json();
      console.log('nodeでのレスポンス', await responseBody);
      // レスポンス結果をコンソールに出力する
      console.log(responseBody);
      const format = responseBody.choices[0].message.content.split(/\s*[1-6]\.\s*/).map((i: any) => i.replace(/[-:].*/, ''));
      console.log('format', format);
      res.status(200).json(format);
    })
    .catch((err) => {
      console.log('err', err);
    });
  // .finally(() => {
  //   console.log('finally');
  //   res.status(200).json('試しにapiから送ってみる');
  // });
}
