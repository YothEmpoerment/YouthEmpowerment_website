// Disposable / temporary email domain block list
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.info",
  "yopmail.com", "yopmail.fr", "cool.fr.nf", "jetable.fr.nf", "nospam.ze.tc",
  "nomail.xl.cx", "mega.zik.dj", "speed.1s.fr", "courriel.fr.nf", "moncourrier.fr.nf",
  "monemail.fr.nf", "monmail.fr.nf",
  "tempmail.com", "tempmail.net", "tempmail.org", "tempmail.de",
  "temp-mail.org", "temp-mail.io", "temp-mail.ru",
  "throwam.com", "throwam.net", "throwam.org",
  "10minutemail.com", "10minutemail.net", "10minutemail.org", "10minutemail.de",
  "10minutemail.co.uk", "10minutemail.info", "10minutemail.us",
  "20minutemail.com", "20minutemail.it",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "guerrillamail.info",
  "spam4.me", "trashmail.at", "trashmail.com", "trashmail.me", "trashmail.net",
  "trashmail.org", "trashmail.io", "trashmail.xyz",
  "dispostable.com", "disposemail.com", "disposableemailaddresses.com",
  "mailnull.com", "spamgourmet.com", "spamgourmet.net", "spamgourmet.org",
  "maildrop.cc", "mailnesia.com", "mailnull.com",
  "sogetthis.com", "spamhere.eu", "spamthisplease.com",
  "fakeinbox.com", "fakeinbox.net",
  "getnada.com", "trbvm.com", "cfl.fr", "klzlk.com",
  "spamobox.com", "spamoff.de", "spamfree.eu",
  "getairmail.com", "filzmail.com",
  "throwam.com", "discardmail.com", "discardmail.de",
  "spamex.com", "spamfree24.org", "spamgap.com",
  "deadaddress.com", "deadletter.ga",
  "binkmail.com", "bobmail.info", "chammy.info", "devnullmail.com",
  "letthemeatspam.com", "mailinater.com", "samerica.com",
  "tempe-mail.com", "temporaryemail.net", "temporaryemail.us", "temporaryinbox.com",
  "thanksnospam.info", "throwam.com",
  "pookmail.com", "mailseal.de", "chogmail.com",
  "owlpic.com", "tempr.email", "discard.email",
  "spamgourmet.com", "spamgourmet.net",
  "anonbox.net", "anonymbox.com",
  "hmamail.com", "spamevader.com",
  "zetmail.com", "spamfighter.cf",
  "spaml.com", "spaml.de",
  "inoutmail.eu", "inoutmail.info", "inoutmail.de", "inoutmail.net",
  "cuvox.de", "dayrep.com", "einrot.com", "fleckens.hu",
  "guam.net", "haqed.com", "jourrapide.com", "objectmail.com",
  "obobbo.com", "odnorazovoe.ru", "peterdethier.com", "proxymail.eu",
  "rcpt.at", "rhyta.com", "rtrtr.com", "s0ny.net",
  "shoot.net.pl", "shortmail.net", "supergreatmail.com",
  "suremail.info", "techemail.com", "thecloudindex.com",
  "thetimezone.com", "thisisnotmyrealemail.com",
  "trashdevil.com", "trashdevil.de",
  "typ3.net", "usenet.net.pl", "veryrealemail.com",
  "wetrainbayarea.com", "wetrainbayarea.org",
  "wilemail.com", "willhackforfood.biz",
  "xoxy.net", "yep.it", "yogamaven.com",
  "zaktouni.fr", "zoemail.net",
  "moakt.com", "mohmal.com",
  "nnot.net", "nospamfor.us",
  "notmailinator.com", "notrnail.com",
  "nwytg.net",
]);

/**
 * Validate an email address:
 * 1. Check basic RFC 5322 email format
 * 2. Block disposable/temporary domains
 */
export function validateEmail(email: string): { valid: boolean; reason?: string } {
  const trimmed = email.trim().toLowerCase();

  // Basic format check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, reason: "Please enter a valid email address." };
  }

  const domain = trimmed.split("@")[1];

  // Check against disposable domain list
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: "Temporary or disposable email addresses are not allowed. Please use your real email.",
    };
  }

  // Block obvious temporary patterns
  const tempPatterns = [
    /^temp/i, /temp$/i, /^trash/i, /trash$/i,
    /^spam/i, /spam$/i, /^throw/i, /^fake/i,
    /^disposable/i, /^noreply/i, /^mailinator/i,
  ];
  for (const pattern of tempPatterns) {
    if (pattern.test(domain)) {
      return {
        valid: false,
        reason: "Temporary or disposable email addresses are not allowed. Please use your real email.",
      };
    }
  }

  return { valid: true };
}
