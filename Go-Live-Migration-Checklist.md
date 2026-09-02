# Nexus Global Exim — Go-Live Migration Checklist
### Domain: nexusglobalexim.in | Hosting: Hostinger | Prepared for: Deep Patel

---

## ⚠️ READ FIRST — Your Situation Is Simpler Than It Looks

Since your **existing email (info@nexusglobalexim.in) is on Hostinger/cPanel** AND your **new website hosting is also Hostinger**, there's a good chance both are under the **same Hostinger account**. This is good news:

- If old site + new site + email are all in the **same Hostinger hPanel account**: you likely do NOT need to touch DNS/MX records at all. You just point the domain to a different folder/app inside the same account.
- If the new site is a **separate, new Hostinger account**: you will need to carefully move only the website hosting (A record / nameservers) while explicitly preserving MX, SPF, DKIM, DMARC records.

**First step: log into Hostinger hPanel and check — is nexusglobalexim.in's email hosting and the new website hosting under the SAME account or DIFFERENT accounts?** This determines which path below you follow.

---

## STEP 1 — Backup Everything First (Do Not Skip)

Before touching anything:

1. **Full WordPress backup**: In Hostinger hPanel → Websites → nexusglobalexim.in → Backups. Download a full backup (files + database). Also install/use a plugin like **UpdraftPlus** or **All-in-One WP Migration** for a portable backup copy stored outside Hostinger (e.g., Google Drive).
2. **Export current DNS records**: hPanel → Domains → nexusglobalexim.in → DNS/Nameservers. Screenshot or copy every single record — especially:
   - MX records (mail routing)
   - TXT records for SPF (`v=spf1 ...`)
   - TXT/CNAME records for DKIM (often named like `default._domainkey`)
   - TXT record for DMARC (`_dmarc.nexusglobalexim.in`)
   - Any other CNAME/A records (subdomains like mail., ftp., etc.)
3. **Keep the old WordPress site live and untouched** until Step 6 (final confirmation) — do not delete or deactivate it yet.

---

## STEP 2 — Deploy the New Website to Hostinger

1. Upload the new website file(s) to a **staging location first** — e.g., a subdomain like `new.nexusglobalexim.in` or a temporary Hostinger preview URL. Do NOT point the main domain here yet.
2. Test the staging site thoroughly:
   - All pages load
   - All enquiry forms work (see Step 4)
   - WhatsApp buttons work
   - Mobile responsiveness
3. Only proceed to Step 3 once staging is fully verified.

---

## STEP 3 — Point the Domain to the New Site (The Actual "Switch")

**If new site is in the SAME Hostinger account as email:**
- Go to hPanel → Websites → change the document root / primary domain assignment so nexusglobalexim.in points to the new site's folder instead of the WordPress folder.
- Email (MX records) will be unaffected since they're account-level, not folder-level — verify this in hPanel → Emails after the switch.

**If new site is on a DIFFERENT Hostinger account (or different host entirely):**
- You will change the domain's **A record** (and possibly nameservers) to point to the new hosting's IP.
- **Critical:** when changing DNS, only update the A record for `@` (root domain) and `www`. Do **NOT** change or delete:
  - MX records (these tell the internet where to deliver email — usually pointing to Hostinger's mail servers)
  - The SPF TXT record
  - The DKIM TXT/CNAME record
  - The DMARC TXT record
- If your DNS is moving to a new nameserver entirely (rare for same-registrar hosting), you must manually re-create ALL the records from your Step 1 export on the new DNS host, not just the website ones.

**DNS propagation** can take anywhere from a few minutes to 24–48 hours globally. Don't panic if it's not instant everywhere.

---

## STEP 4 — Enquiry Form: Email Delivery (PHP Script — Already Built)

The website now uses a PHP script (`send-enquiry.php`) to email every enquiry directly — no third-party account needed, since Hostinger supports PHP out of the box.

**To activate:**
1. Upload `send-enquiry.php` to the **same folder** as your website's `index.html` (site root) on Hostinger.
2. Open the file and confirm `RECIPIENT_EMAIL` is set to `info@nexusglobalexim.in` (already set — change only if you want enquiries to a different inbox).
3. That's it — no account signup, no API keys. The website's JavaScript automatically posts form data to this script.

**Built-in spam protection:**
- A honeypot field (invisible to real visitors, but bots often auto-fill it) — anything submitted there is silently discarded.
- Basic email format validation.
- Simple per-IP rate limiting (30 seconds between submissions) to block rapid-fire spam bots.

**Testing after upload:** submit a test enquiry from any product page and confirm it arrives at info@nexusglobalexim.in within a minute or two. If it doesn't arrive, check Hostinger's mail logs (hPanel → Emails → Email Deliverability) — most failures are due to the `FROM_EMAIL` domain not matching a domain actually hosted on that account; if so, change `FROM_EMAIL` in the script to match your domain exactly.

**Note:** PHP's built-in `mail()` function can occasionally land in spam folders depending on server reputation. If you notice enquiries going to spam, the next-level fix is SMTP-based sending (via PHPMailer + your domain's actual mailbox credentials) — let me know if you'd like this upgraded version once the basic script is confirmed working.


---

## STEP 5 — WhatsApp Enquiry Button

This part needs **no backend at all** — it's pure link-based and already partially built into your site (the floating WhatsApp button). What's needed now: make it pull the buyer's typed-in form details into the pre-filled WhatsApp message automatically before opening WhatsApp, per product page. This is a JavaScript enhancement I can add directly to the file — no external account needed.

---

## STEP 6 — SEO Technical Setup

| Item | Where it happens |
|---|---|
| robots.txt | Upload to site root — I'll prepare the content |
| sitemap.xml | Upload to site root — I'll prepare the content; also submit URL in Search Console |
| Google Search Console | You verify domain ownership (via DNS TXT record or HTML file) — needs your Google account |
| Google Analytics (GA4) | Create property in your Google account, get Measurement ID, I'll wire the tracking code into the site |
| Product/FAQ/Organization/Breadcrumb Schema | I write this directly into each page's HTML — no external account needed |
| Canonical URLs | Set in each page's `<head>` — I'll add these once final URLs are confirmed |

**301 redirects** (old WordPress URL → new URL): once you confirm the new site's final URL structure, share your current WordPress sitemap or a list of your top-ranking old URLs (Google "site:nexusglobalexim.in" or check Search Console if you have it) and I'll map out the redirect rules for your hosting `.htaccess` file.

---

## STEP 7 — Final Cutover & Confirmation Period

1. Once DNS has propagated and you've confirmed (from multiple devices/networks) that nexusglobalexim.in shows the new site
2. Send a test enquiry from each form (spice, packaging, chemical, contact page) and confirm the email arrives
3. Send a test WhatsApp enquiry click and confirm the message pre-fills correctly
4. Confirm your business email (info@nexusglobalexim.in) can still send and receive normally — send yourself a test email from a different address
5. **Keep the old WordPress backup for at least 30 days** before considering full deletion, even after everything looks stable

---

## What I Need From You To Proceed

1. Confirm: same Hostinger account for old email + new site, or different accounts?
2. EmailJS or PHP script for the enquiry form backend?
3. Once you have EmailJS account (or want the PHP route), share the details/confirm and I'll wire the working code into the site file directly.
4. Your current WordPress top URLs (for redirect mapping) — can share a list or Search Console export whenever ready.

Nothing above requires code changes I can't make — the DNS/backup/account-creation steps are the only parts that need you (or Digital Exim) with direct Hostinger/Google account access.
