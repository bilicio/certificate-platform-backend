// For more information about this file see https://dove.feathersjs.com/guides/cli/hook.html
import type { HookContext } from '../declarations'

export const testHook = async (context: HookContext) => {
  console.log(`Running hook test-hook on ${context.path}.${context.method}`)
  console.log('Test hook executed successfully!', context.params);
}
