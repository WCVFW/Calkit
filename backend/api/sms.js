function getProvider() {
  return {
    provider: process.env.SMS_PROVIDER || "mock",
    authToken: process.env.SMS_AUTH_TOKEN || "xxxxxyyyyy",
    sender: process.env.SMS_FROM || "TESTSMS",
  };
}

async function sendSms(to, message) {
  const { provider, authToken, sender } = getProvider();
  if (provider === "mock") {
    console.info(`[sms-mock] To: ${to} | From: ${sender} | Token: ${authToken} | Message: ${message}`);
    return { to, message, mocked: true };
  }
  // Future: integrate real providers (Twilio, MSG91, etc.) using env vars
  console.warn(`[sms] Unknown provider '${provider}', using mock.`);
  console.info(`[sms-mock] To: ${to} | From: ${sender} | Token: ${authToken} | Message: ${message}`);
  return { to, message, mocked: true };
}

module.exports = { sendSms };
