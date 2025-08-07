import { defineConfig } from 'eslint/config';
import config from 'llqm-eslint';
// @ts-expect-error - no types
export default defineConfig([...config]);
