import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const url = "https://chat.openai.com/backend-api/conversation"
const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJuYXJlc2gubml0aW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItcjd4eTBFbDZtMjM1Ukh1TVJDajh1cGpnIn0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2M2E3NjQwYTk3N2U0M2QyMmU5MTUzY2IiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjgxNTgyNzk0LCJleHAiOjE2ODI3OTIzOTQsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.kI3hLCEBCZz3mKMf24N1PLJXGpVvlpm6TvQOV-v4yo6fvFRM6_orAr-cSZuHqWF3fABbnGX44zN9rBP4d-0INLILm30rHgDkhOWi9EJkbfnK_XKyA_xI-bJp8hBktI2Jz82jDGR68dMjPCFdmkA5woiXO-kQ5Yc8CpsVYSG5AdJ2onk9g7EAj0I6D5iAVzVQU5R9lgwHUAQ6m2a8KcIwCy1C1UqpW3FqMdPLMzXVlBF-axMvMOmbQqVQdi6oAhTsNYHpz3zclBxTTATSZk5g1k0NFTM1gRKzS-0XmIfPj9xdZHZiCldIe-yMkpA-fIFxFyVx2Xgr4JI_ixLMnSxa2g"

const cookie = "intercom-device-id-dgkjq2bp=a17aed61-9fab-44e6-8f93-93f899bb0c2e; _ga_GLYMMY7CH1=GS1.1.1674198561.1.1.1674198631.0.0.0; __Host-next-auth.csrf-token=b9eb1c3c4e00525effd503d5788e86295de4721f51cc8aefbc5677c34bd48287%7Cf504f7f9157fa385b213740d4f8e570f2511650a1acda66f8e714438bf32b6d7; cf_clearance=W8iNSMkSlFd7Tqka1R7Ww_ZRanTejdX.4wOvuBmAqbo-1680117202-0-1-e9828976.a281998b.8c0c5b-160; _ga=GA1.1.490908716.1673417682; _ga_9YTZJE58M9=GS1.1.1680121015.5.0.1680121015.0.0.0; cf_clearance=03K_tb_7MhSolFvHIXfOcfn3Kb_f46thS3spq9LlHzI-1681582617-0-1-2c5c6699.92f1b88d.70dbbce6-160; _cfuvid=NzTBhgK7SWWlQw6FD.tyfRkKRsyaIvPSErDEiWZKTj4-1681582619979-0-604800000; __cf_bm=H2lTMYJf6Zhhy.vyuNJdN.ZIciJhoHWT3Pid9iEbylY-1681582620-0-AU32iNdZb/jmWUUcZxsnxSAB/3G1Qi9ODczC12SJOxIKqOMwD38K8wgGF6/WnnHp3mYW6gnA8u/NgK0PVmjGCUWX2ymspgbxFcbA7uYI/dv7A9fufSzsV3ux+8Sc2HJQ62WRveK/jhqHS2YobXoK3uQCRQMo0m7y+uAs2BRbCEds; __Secure-next-auth.callback-url=https%3A%2F%2Fchat.openai.com%2F; cf_chl_rc_m=1; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..adDqKhsMixojdIhM._EyOP47fOsp1U8IbCpDO8bQqK7v5Lf_l-h72t0RG5dFsmvih0moyK8XECk-FkRXgC2NsfnqS2hUodQz25hWfoBhbg07jU3bbxxVXTdRhNXVxFGCZYDClaej7bM7BbJcUGqVjRPIyHwWaRigQ9Ywgr23euo7bf7De67Wk9HaS7MuX9MI5leSWEgJE6Vt0kKWTvicxJZVXe1amurKYbAvbA_tdrryD8MyAWU3hmWx9pR4OKihHA-nK7WU7LvRVtQhdouAo6zmja-NZA-n3RoJwQM5uAlTU7CwyiMD7I39H6KXzC7rVpacDFxzKA5iGhgbYPWdEmWx4y8v8L-mkMc5a02sEyenX4mKddBR8e6A8-IT4S-Oi2tnnCvHwIw-LdTfZUsReqTzSjs4whtLSD3u7RDj6btbiwcmEXvNrBgqS0leU8ObM0s3Dkg_WvmDJjlJp45AH7iAo7nQ2ZiSaKzGU594DdLzuoqK8za5mI_4OotZicN_jKPQrdBGET4dwx0LlKAqVvo8SL9ey1bzEE0hL_UfzSPZiZ2xBVWvFcoDcxpKjkhV3Idy5-7PPQdfA_OybrxBQFybosxKd5XgDhz4WK74-Ndy9PvRCNDRnO04bZxcc0XnT6j5QH4s48EXgdSDk6nAYSrlnUK9LCw8klOZPEz0tB5_b3iDqhmn_x1FAbXOgQ1Q_AioBLlF_EPdmopQzuVHNlQ4nwMwrBYfRtsfUoFTZe-G8Bx8ULNn-w65vjurFBTv7uZqGJPs_6FB6cM-KRpe5YvSUtqgo1TN1hlzp74kxuZfgT6DpeF34DaK4CR79bzKsjywjyKx7jya6R58zqTRoogABG9Iq4poBQfijx7ly2acClTxiMYMfu4Pc_g3nq4igbkytWX8JKWvJrbopRdAdeZmBjAq4dNpYVup9wrkjCHP_f9CeOSeaZkGr_TUf_UqvWiIzWHYtlQaYn5dSr7qCkkJs54VCU3eC47W6AbTu1On4YoxA1_SRo9ZGI_1agTWxkp3qXQKHHWo0WKXKaGCBV-J2wEQ2HLd4RAJICEXEH0dxMDQjGiCmf8MM8x2arupeaXYPPdl36vwfRg1zZEhvC_ASY71udD7nxt3hndYeKx0p2jQ-ZL4lTjB-p_yFVm3RIx6tSXGyo8GLObbLInm8fqUmH4SUrPRWoYgPxLUKxeg9r9nxuhR4PLjIX6qAYbdLF4wmSurlY5aITj0IWeRWJOG4E2ZQfOIMIXKZPkBEOMLtnzyOhngDEi-6ytEWnLbCftUiQvImO8Yj6RJfuO6FVe46gAdnCiEFYXpC2wTPmEA-rtzu8X4Tj3NGX9zrbXIFN6uskryMV6ZDiC6cch7VhJaLdDms4RX-j5zzn_SP4qU2Ko51_epJJXHxCuWrhMtnsES5p8bFMaBMcz95evaNyBDCVxpZDM-qUgt0VoIgdUEC_u16XobmYmESivcJjBiCMumfB91OF5rjADk0Qn3_v3-fgHdh5sFHIieGvVbXA4latLsLVNiWjsXsn-tx6OT0OHHoJx95EVODofSCdbSxgOYYRP7KigU5DuOFk2sWPgUxl9itXhfVPyuzGs3XFyRNs_YRiWQJwZZZd8459qpsoKlU3ghIfRPo3XSvE2JkxK45bnZxAkqjfUDpLvyPyaMtucbg1zRv0icYtaZk1_Cx3wDvgxvcFklsEHyDvGugjduIMqOx1qAZmtRm5hFINBo59vTrK1zV00etPh97qPWTRfi1SD2Mowsmf5U4UNXOhr3mbDKTJBs0E9LW_9EpZj2NjEVbdRQae75Dp6jusULBO-s8wC6ANkautp5CA13SgG5MRED2mTRfAvThAjUnLIAxLdkjJrONxCz6ERuh0PebO-PqAjHrUQA5U_v0Wacn4pR7WcG-lc1n5r8ORYUCN7jWxbVR9WcDUZY9DG-HmXSwAvv7-vuXVnaOZX5LTzDmsgK8vlnMXkYfKfx4sMmZRMXYgKX3dRJgq1UwpOzD9nmOQUUqM-6KmTfQ_PrXJT5uIFwpG0MGNyFdmOMVOiwu6G-91vCi6t-l9Srziy2LZSQ9SXcNptHmtfpmk6SwOX4FxBGnNoDNLXoD0FhZSLkCo6WaN7m8pJCzuaNHvBJkM3TU4Ia45ZMR1dSK-nq8O0OqubL7gnypWW0EutrZEUurd9UdD0RFELOr2RVTe5DtN-O3sGQSeZABVRfbGEH1wEaYI_vkzJkPtVX0oKdPM0Evp-bnUAW_bpnrlI0_1PBMYCOmMYr1uBmkd5BhBD-dVE-eicUKDifYYoqNMQvaOsVF6-JV9sm49mucRwz39PzUnWRT9DslVFi1uje_XJd1oJ5o7LQnlTo97fYL9J0ia6UMuBCsTgmyUbf60dRG9hRoz9KvX7xx44bsP-cOf8qbhYfgUTY6HyFTwVjDnT5A8TNnwa1RWXo_6InEggdWEg69CR7RZbsTtdZrVEaPpHnzZ-8KnC9-ZxH7DRuPnqAG2cYi0UdKoqokTKq35WWCZ-qVHbARJu0YawPNAqg-zWMIoyIM_3H_DN0l1FVHh5r_d6iA7f80GSagjre2FzfQp7MNkT8j98bV8KOXm5tJsyehN2vbFhYv53CK_IE60W7gemHn0bZSkLfGq8UHSdrsnSko125Kfe5xQGml9PXHOSjIZxyFfbQZanGTKXc5uxSRzbM-gW7OFDs0adU1vV-38U-rCwjgy5N80m_aU8xZ-apfVr6Lb-EXk-Hpe3I4Du4-ANYdFDdNeFkxJg7cTNej18_sGK5tnqUK-Rc-d54qyhLI6cuLj6p364oijJ5BfPmWYQmw.-7EMC6PHrPEUkCcXswCY0g; _puid=user-r7xy0El6m235RHuMRCj8upjg:1681582796-c402RzXPONyMEPjL3dJdhlN0dTP2FURRkh%2BhQ6wj%2FCY%3D; intercom-session-dgkjq2bp=VnhSTkR3VFFzT0hOckZSSFdNRWZ2RWp5NjR6eGxucXlNRE1Ddk5YdUh5cTdVSTBtNXp5dzFGdU4vaDlRdnJ5Qy0teVU1b2g5QitaeDhYbEo1TW1SNGMwdz09--9964d247d4e5b59da27dd85e1b3c98357f08eb56";

export default {
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
        "parent_message_id": uuidv4(),
        // "model": "gpt-4",
        "model": "text-davinci-002-render-sha",
        // "timezone_offset_min": -330
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