/**
 * RECAPTCHA BOT CONFIG
 * ===========================================
 * - EDIT THE ENV FILE TO CHANGE THESE VALUES
 * ===========================================
 * © 2023 - Tyler Hodgkin (TyDoesDev)
 */

module.exports = {
    ID: process.env.CLIENT_ID,
    Footer: process.env.EMBED_FOOTER,
    Token: process.env.CLIENT_TOKEN,
    Invite: process.env.CLIENT_INVITE,
    Support: process.env.SUPPORT_LINK,
    ClientLogo: process.env.CLIENT_LOGO,
    Recaptcha: process.env.RECAPTCHA_LOGO,
    CmdTimeout: process.env.CMD_TIMEOUT,
    LogChannel: process.env.LOG_CHANNEL,
    Mongoose: process.env.MONGO
}