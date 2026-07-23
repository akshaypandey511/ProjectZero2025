# SyntroMind · Brain Vision — Clickable Prototype

A single-file, high-fidelity clickable prototype of the **Brain Vision MVP** — the near-term
*wedge* product in the SyntroMind portfolio (industrial edge computer vision for defect
inspection on German Mittelstand production lines).

It exists to do exactly what the build plan's Discovery phase calls for:

> *"clickable Figma prototype validated with a real quality engineer and a real operator"*
> — Brain Vision MVP Build Plan, §5 Timeline

…except it's real HTML you can click through in a browser, hand to a design partner, or run on a
panel PC — no Figma account, no build step, no network.

## Open it

Just open `index.html` in any modern browser (double-click, or serve the folder). Everything —
imagery, telemetry, training run, live feed — is generated in the browser. No server, no data
leaves the machine (which is the product's sovereignty promise, honoured even by the prototype).

## What to click

| Persona | How to enter | What it shows |
|---|---|---|
| **Quality Engineer** (default) | — | Full left rail, all seven screens, setup → train → review flywheel |
| **Line Operator** | top-right persona chip | Collapses to *one screen, three buttons* — the shop-floor reality |

Toggle **DE / EN** top-right (German-first, English second, per the design constraint).

### The two moments worth demoing first

1. **Training & Validierung** → *Training starten.* The architecture's efficiency made visible:
   the loss curve converges in **9 epochs**, energy per run is counted live in **Wh**, and the
   **Re-Entry hierarchy** (Metron → Syntrom → Metroplex I → Metroplex II) fills as the run
   progresses. Validation speaks in plain language — *Fangrate* / *Fehlalarme*, never an F1 score
   — and the threshold slider trades one against the other in real time.
2. **Live-Prüfung** (switch to Operator). A part streams in every ~2.4 s, PASS/FAIL as
   colour **+ icon + text**, confidence as *"sehr sicher" / "bitte prüfen"*, a **Heatmap** toggle
   that shows *why* a part was flagged, and the three large touch targets:
   **Ausschuss bestätigen · Übersteuern · Ingenieur rufen.**

## The seven MVP screens (build plan §4)

| # | Screen (DE) | Build-plan feature it realises |
|---|---|---|
| 1 | **Inbetriebnahme** | Guided camera + line setup; GigE-Vision discovery; lighting calibration; reference-image capture |
| 2 | **Datensatz & Labeln** | Labeling workspace, OK/defect classes, bounding boxes, dataset-health indicator |
| 3 | **Training & Validierung** | One-click training (progress + energy/epoch), plain-language validation, threshold slider, deploy-to-edge |
| 4 | **Live-Prüfung** | Operator feed, PASS/FAIL, heatmap "why", latency indicator, three actions |
| 5 | **Prüfliste** | Review queue of overrides & edge cases; "add to dataset" = the data flywheel |
| 6 | **Berichte & Audit** | Shift/day/week KPIs, ISO-9001-friendly decision log, PDF/CSV export |
| 7 | **Gerätezustand** | Edge box + camera status, offline-tolerant buffer, deployed model version, OTA update |

## Design principles honoured (build plan §4)

- **Shop-floor reality** — dark, high-contrast control-room look; large touch targets (≥48 px on
  the operator buttons); works on a rugged panel PC.
- **Colour-blind safe** — red/green is *always* paired with an icon and text, never colour alone.
- **German-first**, English second.
- **Operator = one screen, three buttons** — no training required.
- **Trust through transparency** — every flag shows the heatmap and confidence in plain terms,
  never a bare probability.
- **Works-council (Betriebsrat) safe** — the system inspects *parts, never people*. Stated in the
  onboarding wizard and on the report page; no operator-performance analytics anywhere.
- **Governance as a feature** — the audit log is built in, not bolted on.

## How the "efficiency made visible" story ties to the IP

Brain Vision is the wedge; the **Koch Structural-AI architecture** (portfolio strategy "Line A")
is the ingredient underneath it — presented here as *engineering credibility that feeds the
product*, not as product news. The training screen surfaces the architecture's real telemetry
vocabulary — the **Metron → Syntrom → Metroplex** re-entry hierarchy and energy-per-run — so the
"retrain a line in an afternoon, not a week" promise becomes a number the customer can watch,
which is the load-bearing claim of the whole build plan.

## Scope & honesty

This is a **prototype for design-partner validation**, not the product. All imagery, inference
results, telemetry, and metrics are generated in-browser to illustrate the workflow and
interaction model. Real detection rates, energy figures, and latency must be established in a
controlled pilot — exactly the KPIs the build plan says to instrument from pilot day one.

---
*Files:* `index.html` — the entire prototype (self-contained). *Companion docs:* Portfolio
Strategy v0.1, Operating Model v0.1, Brain Vision MVP Build Plan v0.1.
