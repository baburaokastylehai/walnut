I’m reading this through QA for now, based on your work testing the booking flow.

Nightjar is a telescope-booking prototype for volunteers. The calendar is intended to show observing slots, remaining places and each slot’s local start time before someone books.

The pilot decisions are settled but not built: each slot has eight places, and full slots have no waiting list. The earlier six-place limit has been superseded. The booking-flow document also says a full slot is marked unavailable.

For testing, that makes the capacity boundary, remaining-place display, local start time and full-slot state useful checks. Those are QA implications of the agreed behavior, not newly assigned tasks. The record does not specify a separate error-message design or timezone conversion rules, so I would not assume either is settled.

The waiting-list question is resolved. No open project question is recorded on this page.
