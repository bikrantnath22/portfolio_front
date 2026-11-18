const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

function getEnv(key) {
  if (process.env[key]) return process.env[key];
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "client/.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, "../../../.env"),
    path.resolve(__dirname, "../.env"),
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const lines = fs.readFileSync(envPath, "utf8").split("\n");
        for (const line of lines) {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match && match[1] === key) {
            let val = match[2] || "";
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            return val.trim();
          }
        }
      } catch {
        // continue
      }
    }
  }
  return undefined;
}

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed. Use POST." }),
    };
  }

  try {
    const { name, email, description } = JSON.parse(event.body || "{}");

    if (!name || !email || !description) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name, email, and message description are required." }),
      };
    }

    const GMAIL_USER =
      getEnv("GMAIL_USER") ||
      getEnv("GMAIL_EMAIL") ||
      "bikrantnath4@gmail.com";

    const GMAIL_PASS =
      getEnv("GMAIL_PASS") ||
      getEnv("GMAIL_APP_PASSWORD") ||
      getEnv("GMAIL_PASSWORD") ||
      getEnv("pass") ||
      getEnv("PASS") ||
      "jpgeysqtwebtguui";

    if (!GMAIL_PASS) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "GMAIL_PASS is not configured in Netlify environment variables.",
          tip: "Add GMAIL_PASS in Netlify Site Configuration -> Environment Variables.",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${GMAIL_USER}>`,
      replyTo: email,
      to: GMAIL_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${description}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0891b2; margin-top: 0;">New Portfolio Contact Message</h2>
          <p style="font-size: 15px; margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="font-size: 15px; margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0891b2;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 14px; font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</p>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${description}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Nodemailer execution error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send email via Nodemailer.",
        details: error.message,
      }),
    };
  }
};
