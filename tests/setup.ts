import { vi } from "vitest";
import { vscode } from "./mocks/vscode";

vi.mock("vscode", () => vscode);