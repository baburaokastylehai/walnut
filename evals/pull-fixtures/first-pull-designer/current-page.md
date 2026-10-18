# Project Overview

Nightjar is a fictional telescope-booking project used only to demonstrate Walnut. Volunteers need a clear way to reserve shared observing slots. The prototype uses a slot calendar.

## Decisions

- D1 — Decided, not built — Each observing slot has six places.

## Requirements

- R1 — Show the number of available places before booking.

## Open Questions

- Q1 — Should a full slot offer a waiting list?

## Decisions continued

- D2 — Agreed in principle — The calendar shows full slots alongside available slots.

## Requirements continued

- R2 — A full slot displays a clear unavailable state.

## Architecture & Cross-Impact

- Availability changes affect both the calendar and booking confirmation.
