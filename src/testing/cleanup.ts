import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Vitest does not enable globals by default in this project (vite.config.ts
// is locked by the slice plan and there is no vitest.config.ts). Without a
// global `afterEach`, @testing-library/react's auto-cleanup never registers
// and rendered DOM leaks between tests. Importing this module from any
// component test file registers the cleanup hook for that file.
afterEach(cleanup);
