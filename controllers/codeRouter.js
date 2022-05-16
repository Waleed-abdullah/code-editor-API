import { Router } from "express";
import axios from 'axios'
import { getLang } from "../utils/langSelect.js";

const codeRouter = Router()

codeRouter.post('/run', async (req, res) => {
    const data = {
      "stdin": req.body.stdin,
      "files": [
        {
          "name": `Snippet.${req.body.language}`,
          "content": req.body.code
        }
      ]
    }

    let lang = getLang(req.body.language)

    const resData = await axios.post(`https://run.glot.io/languages/${lang}/latest`, data, {
      headers: {
        Authorization: `Token 07016bea-5df6-4613-b545-33d9f557657f`,
        'Content-type': `application/json`
      }
    })
    console.log(resData)
    return res.status(200).json({stdout: resData.data.stdout, stderr: resData.data.stderr, error: resData.data.error})
})

export {codeRouter}
  