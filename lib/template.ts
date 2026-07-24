export const emailTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Request Received</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background: #f5f7fb;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="background: #f5f7fb; padding: 30px 15px"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            style="
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            "
          >
            <!-- Header -->
            <tr>
              <td align="center" style="background: #111827; padding: 30px">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px">
                  SmartFlowAlgo
                </h1>
                <p style="margin: 10px 0 0; color: #d1d5db; font-size: 15px">
                  Indicator Access Request Confirmation
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 35px">
                <h2 style="margin-top: 0; color: #111827">Hi {{name}},</h2>

                <p style="font-size: 16px; line-height: 1.7; color: #4b5563">
                  Thank you for requesting access to our TradingView indicators.
                  <strong>We've successfully received your request.</strong>
                </p>

                <p style="font-size: 16px; line-height: 1.7; color: #4b5563">
                  Our team is reviewing your request and you will receive
                  indicator access shortly. Please verify that your TradingView
                  username below is correct.
                </p>

                <!-- Details -->
                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    margin: 30px 0;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                  "
                >
                  <tr>
                    <td style="padding: 18px">
                      <table width="100%" cellspacing="0" cellpadding="8">
                        <tr>
                          <td
                            style="
                              font-weight: bold;
                              color: #374151;
                              width: 180px;
                            "
                          >
                            TradingView ID
                          </td>
                          <td style="color: #111827">{{tradingViewId}}</td>
                        </tr>

                        <tr>
                          <td style="font-weight: bold; color: #374151">
                            Email
                          </td>
                          <td style="color: #111827">{{email}}</td>
                        </tr>

                        <tr>
                          <td style="font-weight: bold; color: #374151">
                            Request Date
                          </td>
                          <td style="color: #111827">{{requestDate}}</td>
                        </tr>

                        <tr>
                          <td style="font-weight: bold; color: #374151">
                            Status
                          </td>
                          <td style="color: #16a34a; font-weight: bold">
                            Request Received
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- SRN -->
                <div
                  style="
                    background: #fff7ed;
                    border: 2px solid #fb923c;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    margin: 30px 0;
                  "
                >
                  <p style="margin: 0; font-size: 15px; color: #7c2d12">
                    Your Support Reference Number
                  </p>

                  <h2
                    style="
                      margin: 12px 0;
                      color: #ea580c;
                      font-size: 32px;
                      letter-spacing: 2px;
                    "
                  >
                    {{srn}}
                  </h2>

                  <p style="margin: 0; color: #7c2d12; font-size: 14px">
                    <strong>Please save this SRN.</strong><br />
                    If you do not receive indicator access within the expected
                    time, contact us on Telegram and share this SRN so our team
                    can quickly locate your request.
                  </p>
                </div>

                <!-- Telegram Button -->
                <div style="text-align: center; margin: 35px 0">
                  <a
                    href="{{telegramLink}}"
                    style="
                      background: #229ed9;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 15px 32px;
                      display: inline-block;
                      border-radius: 8px;
                      font-weight: bold;
                      font-size: 16px;
                    "
                  >
                    Join Telegram Support
                  </a>
                </div>

                <p style="font-size: 15px; color: #6b7280; line-height: 1.7">
                  Once your request has been processed, access will be granted
                  to the TradingView ID mentioned above. No further action is
                  required from your side.
                </p>

                <hr
                  style="
                    border: none;
                    border-top: 1px solid #e5e7eb;
                    margin: 35px 0;
                  "
                />

                <p
                  style="
                    font-size: 13px;
                    color: #9ca3af;
                    text-align: center;
                    line-height: 1.7;
                  "
                >
                  This is an automated email from
                  <strong>SmartFlowAlgo</strong>.<br />
                  Please do not reply to this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="background: #111827; padding: 20px; text-align: center"
              >
                <p style="margin: 0; color: #9ca3af; font-size: 13px">
                  © {{year}} SmartFlowAlgo. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`