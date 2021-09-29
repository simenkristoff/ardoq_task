import { AsyncActionType } from '@/types';

/**
 * Generates async states for redux actions
 * @param name the name of the action
 * @returns {AsyncActionType} aync action states
 */
export const generateAsyncAction = (name: string): AsyncActionType => ({
  START: `${name}.START`,
  SUCCESS: `${name}.SUCCESS`,
  ERROR: `${name}.ERROR`,
});
