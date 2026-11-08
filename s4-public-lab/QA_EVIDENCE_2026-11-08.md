# GENIE Voice S4 — Public Safety Lab QA

**Date:** 2026-11-08 (Asia/Jerusalem)  
**Scope:** Public static JavaScript/DOM simulator only — **NOT** the S4 Worker, React/Lovable integration, Supabase, Cloudflare, ChatGPT Voice, or durable memory.  
**Repository:** `DETERMAai/determa-governed-execution-demo`  
**Branch:** `s4-public-lab-2026-11-08` — isolated from `main`  
**Reviewed source blob:** `d7e59bfea4b501bffb99669df36b88eda7cec805`  
**Public UI:** [Open the simulator](https://htmlpreview.github.io/?https://github.com/DETERMAai/determa-governed-execution-demo/blob/s4-public-lab-2026-11-08/s4-public-lab/index.html)

## Direct browser testing

Chrome headless (CDP `Runtime.evaluate`, real DOM and two paint frames), fresh isolated user-data directory; 375 × 820 and 1440 × 820 viewports. Controls were clicked and their rendered DOM state asserted.

| Check | 375px | 1440px |
|---|---|---|
| Eight embedded logic checks displayed | PASS | PASS |
| Initial disconnected state | PASS | PASS |
| Pairing enables simulated commands | PASS | PASS |
| Lead action updates real DOM | PASS | PASS |
| Lead creates **local-only** post-render receipt | PASS | PASS |
| Foreign user action rejected | PASS | PASS |
| Previous generation action rejected | PASS | PASS |
| Switching account disconnects | PASS | PASS |
| Account switch clears previous view | PASS | PASS |
| Second test account can pair | PASS | PASS |
| Second account's offer changes DOM | PASS | PASS |
| Second account's offer obtains local receipt | PASS | PASS |
| Disconnect disables commands | PASS | PASS |
| Disconnect clears demo pairing display | PASS | PASS |
| Stale event rejected after disconnect | PASS | PASS |
| In-flight local receipt rejected after disconnect | PASS | PASS |
| Hebrew RTL enabled | PASS | PASS |
| No horizontal overflow in tested viewport | PASS | PASS |

**18/18 applicable UI tests passed on the public HTML Preview URL at both viewports.**

The same source bytes, opened as a local HTML file (without the HTML Preview host), passed **19/19**, including a local-only assertion that the entire page loaded zero external resources.

## Why the public test count differs

The nineteenth local-only check, `performance.getEntriesByType('resource').length===0`, was not applicable on the hosted preview: the *HTML Preview hosting service itself* loads the public source and related resources. This is **not evidence** that the GENIE simulator sends data to a backend. The simulator source contains no network API calls and declares `connect-src 'none'` in its CSP. We therefore exclude that invalid hosting-specific assertion from the public-site score, rather than call it a product failure or pretend it passed.

## Limitations and release decision

- Local UI receipt `BROWSER_APPLIED_LOCAL` means the DOM was checked; **it is not a server ACK**.
- All user identities and events are synthetic and reset on refresh.
- No real OAuth tokens, customer data, payments, storage or access to S4 backend.
- Static simulator checks do not prove real browser-to-S4 network cancellation, ChatGPT Voice actions, Supabase Auth, persistent memory or Lovable React integration.
- Public preview can be opened without login, but uses a third-party HTML preview service; it is not the DETERMA production domain.
- **S4 RELEASE=HOLD** and `executionAuthority=false` remain unchanged.

## Manual smoke test

1. Select user A, pair, click “הצג ליד חדש”; expect updated lead and `BROWSER_APPLIED_LOCAL`.
2. Click “פקודה ממשתמש זר”; expect rejection.
3. Click “פקודה ישנה”; expect rejection.
4. Select user B; existing session must stop and view reset.
5. Pair as B, show offer; expect update and local-only receipt.
6. Click disconnect then stale event; expect rejection.
7. Check behavior on narrow mobile and desktop widths.

This report documents an isolated browser **simulation**, not an independent Work 2 review or a release authorization.
