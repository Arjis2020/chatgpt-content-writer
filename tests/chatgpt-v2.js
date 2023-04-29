import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const url = "https://chat.openai.com/backend-api/conversation"
const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhcmppcy5jaGFrcmFib3J0eUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci1DbnBmdmhnZTkyd0pmT0xIUEpyUTAyazUifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAzNDMxNDcyOTYzODU4NzMwNjA5IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4MjE5NDM1MSwiZXhwIjoxNjgzNDAzOTUxLCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.FQcF5uBby0sK13BMuxPdR63UDthLpbvEemB8ejpG-OWEcyyds_TQa7gaGS3DRhZk3j1bIwqZDfH2vLCvBdgR67svUeTPEpSJeDxZ179KtQx4LtU-VdTQu_Mwl56sY6l_gGzvaCLVnyWjAjpcyx2FCYPCf2PrhaqNUKqbTIRtsZlFVc2DUXUp9aNa-G3gOFQYAACTH7cMfX3fsfC-rmaG2FI8wzRRJr2Hw5P_QkR4hzMjg6gg3rA-Jf8O3kOryX33XhG1x9guT0ltz7Ea0RqThClI6c9cvxHMeeC2fm541FJ3AU9_5UMmQo_Fo5YE8TywctYF47hFU9_WNhZThC97FQ"

const cookie = "cf_clearance=.siv9_hSCiF2L0NW5Ppk8VSTUMrxhYkE6dZKFvfZ4lM-1682194331-0-1-16b145a4.caa319bf.cc51c4ee-160; __Host-next-auth.csrf-token=a656367d3b4caba4ac0388cd97f0c9ff23e256c8aca95220466bb9b7f1d0d6d9%7C3d84bcf1ed0e550e6ed4795b8d13c26fd5e181e4ecbe6541304cbe8c4d6f377a; _cfuvid=0xbbi7AyHs3qXIXo6cthTZyqcPM5t2Vcg8lHYirTXC8-1682194333222-0-604800000; __cf_bm=4Zzs5F9dJIOMdCKiHdLyB0HQvuJGAiykXTaH7Fdiiq0-1682194334-0-AexADayu0xCfTnCxO3xoTsnp1Y9JNp3/EA8EC+6HK6cioQ+sE4ukXj1T9+Cg9SUIEtJVY6HF8sHsliim4YDA0yWW+/2DAsv1ROcY/Cyowj0kCTtT+ORLO+efj31i1YUwkEuMOGrfKTK1pycoooR5pxA=; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com%2F; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..moFrsejUrzFftEkG.3RxZDjJZ9qclUKz1d66h6n3EzbOUEiDjSWfnoJvkxbLQy6qXwJdTywr5VqRYq8R-UtQHe4_5Wey1pqS9WxY6UK4RybGv6rStwsujo3FZKI0oNbleOQZqLG0D_-zY1lJjMevWDD6ySxd7RMWjP9PDDxg7HLf3jjyTNfAlPdoevZhiUcVkeK29N4c4cHLduYNx3mENOy3MyWIEV0UAvp7ms8D_ogBNlJ1L-iEJ1Mxm0t6dwx_Yv1HNFI93HQRGj7W5F_5nG2nPcLZofQCAzB6PDY00eQ6cdPsElskuv5iXpN_SWJn0QE5cCWuZbZBJ_AKdct1jlHMOvmO_0qfTbCnKe_kuF-u8K0KU0nF-UPpqnG7QBD8C6ZhoQfsnLGy_0CykoZHWIFsVSJdkU6ka0o491ofjL43mQdFdL3aooz95tOy8JaxXUOHCJXQZFnb4z-NrQyWQX-8K1pQzlBrvjHn4BDGxgjk1_r777M9Eg-QkNM3EAgtPFGEkVowhmdq9ZkofYfW6qKmoKPKKg_15dt54afFFwVo-i04MO4QJyswsm_112JCB4G8_2HpCMC-CGF6zz6pNByJpxRDz4rhHHGNXiwZVd2av1vd7E0l_qpa8O-QuIdBwjNsFn82NMRdLIu5l38IvSgXBmzv6ic2GKyTZwyZZOGK3WEwUAAzgP9FgCU5iNZ3JvIxlTf6FA2G6NIdjhELtyWyczZ7FezwOWlk8JjH8FKwwFvI9eJC6Rc9BC64vLdQ34tD_86kkgUaWok-N__BTCR3BT7To0wCukfq375kJG55rcIz8Kj1fyC1nyI-V6mZ5MSlGpwZGjlVLcuGiojjB1xN-RkJ9CAE8e72IRxFUogsVgvpnuwwd5dCfjL2JKJWuwic3L2lqZrnRWPiBGOrRDD0wGftpLBnaBgNgbckwQfLxXznfG94_1J9BkQPsdNI-2ZlJQgJOtPrb7q9tvBQXP2SIdG_EurdEbHjem0jImNHpp6lX1nGgfohHs3Nzp6KYRlkO8u_spKoZKDHkwmoMQaXZrcXNq_3X5EEhaTbm1ARy5Bpu3pJhqiyqeW56WJP08gHG3ARWhbcj5iU1urAsmiB_yzTTNsYOAnkEvBPgOmKreAEdjr6lHbx2ogQVxeL3_zkSG2eD7Tahq73pRMpIWezrpcOuukejtaP7yoGvPg1-TposSmn78N6qbWXsGqcGHshATDiFry9RSrYlx64JNJeD19ad7GV0MyNMoxu085VMHX7SoDPtGhDzdhUKtcWM0T6VAs69caN2wYxhZPzh1GQj9MhqZdciuKXjWXBwh4inWRaX860z144iVilEA-MhV3qmSDIzUYAeOX9Qx5YTPQhobN91c9mV_n5j6uDSKhCf1u8WyU3M2wUWBA4F0VIKm03xTOuyj128nL6gg-Gxl76lLJC8cOkoDNWmXccaW5U4oCbIMnDiSG7DYerIuFct68JjhE21AfulKQ4YD5Cw9k9SRfnh9d8Iiz8aFhKvYEee4SVylp1uAnhR0HHF9Dr0TAGOHitzAcmDiCZ9LOkQ6eHO2vsVhnrzCqHAtsC-VWWPoh6jk7dIe3OnA7wZdsFurY7jJi5pUxmRlKkHaiVxYDNH8uGXnFkxsUaFv_CS3_txc9sFN-TXs8YZZ_0BgJy4d1PR0-36aHcYHQtkV3NY8M8jyJDLuG-vW7Vhtvrm6YrNvs-Xn2NXp3cTQdxwthlGA4WVbiSvUF-3uYnWupNFd36eulRMyyyiyV8XVd_yTbTXkK0t4HB8rxs9lV7uqtWfkCFzLo23Wm_miRRxmAeKsJgDFG_2x8m2dAtdf644jlVgEMqMYGd5FI670D7QI-DBwLxMN7Arbl1XQ016omZ2BJJctcwB3j2H9kOYwtMNhFqRngB-nDpmAH0VoXt83Zo_m30u3o8nz5aD55Sqvr3oThStHAewdL5E_cI9-XgvkcLOLeDc5rAzHzI5nqTaolKcmKU6u495nZQQRD-VJoWxEBpS_pdgNnPNRgl3b3f53AWzrI7XoNw34PCzC5ISo0qXUdUth1qLkIMvAOoMR01kPUt_4OO7mfpmCiWOaC2npDcXQE-wIx04zbbxD130YUMXJ6pH_mP-cmhhjx9gmSpoWozKlV0hf19M0ZeL5U2b8FxFInWCnH3K87SZSkzbPsXjrJZpM1IN5gCLPwC2KKC8VX5uL91Tle0C-vcp8RL1HhwxHgXnkEFTDzLt17lCFkuwYsOri6jg_Eb04ETDPyTT0t0BoyX2_LeUX4Jf_VetTzAjAVdoRmVMilQcg-2-vSJ15H_lYOVOSxr_W3snxOQMm-v7DCP70KGD-zs_PCrDi9BOzmSQHv67fldjY6prD3wP_s3_FSEtYTO1aRhYyFaS0nvQotEoepV5HNayfcZyOINCiFG0o7FofvUpa9YExb2MzBOPcx34u_5t5EPhkaL4lSyun8QoNfMFiX5peG26C-TSmc8Cdcw3VzSIsCfIgmLH4AUMguURrdA08IlbdOtBRjPdyPxtm0u5qLsK04meBF2avkFlwRWiRHBbsy80GOpv6eghDzOcHGtIKxZ1u5VGo-qk2Pu5QCPS3YjgI7uP8iNSqNhjxLpBhjR-LPesVXDtilRq1FIonQYjmQuS8X1xE7slRekvM2gM1W8oKQD5MkZl4M30WZsPuuDVL9IgnJUv58uz6w.qxpDiOABpgvNsNfhPUVpag; intercom-session-dgkjq2bp=RmdrZ0UyTVg1Yy9oaVk2QWI5NE5NUGFGZXRtTGZLTnZuem16Wm10RnNGQmhIRlVRS0FRZlpMMEdLek1WcHZVOC0tRE5EMTVaT1lwV0hQMmdwWm5GS2s4dz09--03726a9132edf743ef3c0bb0b924cb797b5aed2a; intercom-device-id-dgkjq2bp=7e770416-16a8-4cae-89bb-db82b8e1da88";

const opts = {
  sendMessage: (message) => new Promise(async (resolve, reject) => {
    try {
      const payload = {
        "action": "next",
        "messages": [
          {
            "id": uuidv4(),
            "author": {
              "role": "user"
            },
            "content": {
              "content_type": "text",
              "parts": [message]
            }
          }
        ],
        // "parent_message_id": uuidv4(),
        "parent_message_id": "9843f431-1067-4a50-99e0-66b99a6b12ad",
        "variant_purpose": "none",
        // "model": "gpt-4",
        "model": "text-davinci-002-render-sha",
        "timezone_offset_min": -330
      };
      const { data } = await axios.post(url, payload, {
        responseType: "stream",
        headers: {
          cookie,
          Authorization: token,
          Accept: "text/event-stream"
        }
      });

      let response = [];

      data.on('data', (chunk) => {
        response.push(chunk);
      })

      data.on('close', () => {
        const stringified = Buffer.concat(response).toString('utf-8');
        const sanitizedJSON = stringified.replace(/(data: )/g, "").split("\n\n");
        const json = JSON.parse(sanitizedJSON.reverse()[2].trim());
        resolve({ text: json.message.content.parts[0].trim() });
      })
    }
    catch (err) {
      console.log(err.toString());
      reject(err)
    }
  })
}

const text = opts.sendMessage("Top movies in usa");
console.log(text);