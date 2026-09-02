<?php
/**
 * Nexus Global Exim — Enquiry Form Handler
 * Upload this file to your Hostinger site root (same folder as index.html)
 * as: send-enquiry.php
 *
 * The website's JavaScript sends form data here via fetch(). This script
 * validates it, checks the honeypot spam field, and emails the enquiry to
 * your business inbox with a clear subject line.
 *
 * SETUP: Just change RECIPIENT_EMAIL below if needed. Nothing else to
 * configure — Hostinger's PHP mail() works out of the box using your
 * domain's mail server, so it sends as no-reply@nexusglobalexim.in and
 * lands in RECIPIENT_EMAIL.
 */

// ── CONFIG ──────────────────────────────────────────────
define('RECIPIENT_EMAIL', 'info@nexusglobalexim.in');
define('SITE_NAME', 'Nexus Global Exim');
define('FROM_EMAIL', 'no-reply@nexusglobalexim.in'); // must be a domain you control on this server

// ── CORS / METHOD CHECK ─────────────────────────────────
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ── COLLECT & SANITIZE INPUT ────────────────────────────
function clean($value) {
    return htmlspecialchars(strip_tags(trim($value ?? '')), ENT_QUOTES, 'UTF-8');
}

$productName   = clean($_POST['product_name'] ?? 'General Enquiry');
$honeypot      = trim($_POST['website_url'] ?? ''); // hidden field — real users leave this blank
$buyerEmail    = clean($_POST['Email'] ?? $_POST['email'] ?? '');
$formFieldsRaw = $_POST['fields'] ?? '{}';

// ── SPAM CHECK 1: Honeypot ──────────────────────────────
// Bots tend to auto-fill every input, including hidden ones. Real visitors
// never see or fill this field, so anything here means it's spam.
if ($honeypot !== '') {
    // Silently pretend success so bots don't learn the honeypot was tripped.
    echo json_encode(['success' => true]);
    exit;
}

// ── SPAM CHECK 2: Basic email format validation ─────────
if ($buyerEmail !== '' && !filter_var($buyerEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// ── SPAM CHECK 3: Simple rate limiting by IP (session-less, file-based) ─
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/nge_enquiry_' . md5($ip) . '.txt';
if (file_exists($rateLimitFile) && (time() - filemtime($rateLimitFile)) < 30) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait a moment before submitting again.']);
    exit;
}
@touch($rateLimitFile);

// ── DECODE FORM FIELDS (sent as a JSON string from the frontend) ───────
$fields = json_decode($formFieldsRaw, true);
if (!is_array($fields)) { $fields = []; }

// ── BUILD EMAIL BODY ────────────────────────────────────
$bodyLines = [];
$bodyLines[] = "New enquiry received on nexusglobalexim.in";
$bodyLines[] = "Product: " . $productName;
$bodyLines[] = str_repeat('-', 40);
foreach ($fields as $label => $value) {
    $bodyLines[] = clean($label) . ": " . clean($value);
}
$bodyLines[] = str_repeat('-', 40);
$bodyLines[] = "Submitted: " . date('Y-m-d H:i:s') . " (server time)";
$bodyLines[] = "Visitor IP: " . $ip;
$emailBody = implode("\n", $bodyLines);

$subject = "New Enquiry - " . $productName . " - " . SITE_NAME;

// ── HEADERS ──────────────────────────────────────────────
$headers = [];
$headers[] = "From: " . SITE_NAME . " Website <" . FROM_EMAIL . ">";
if ($buyerEmail !== '') {
    $headers[] = "Reply-To: " . $buyerEmail;
}
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: PHP/" . phpversion();

// ── SEND ─────────────────────────────────────────────────
$sent = @mail(RECIPIENT_EMAIL, $subject, $emailBody, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Could not send. Please try WhatsApp or email us directly.']);
}
