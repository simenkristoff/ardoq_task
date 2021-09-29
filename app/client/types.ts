/* eslint-disable camelcase */
import { Method as ApiMethods } from 'axios';
import { PayloadAction, PayloadMetaAction, TypeConstant } from 'typesafe-actions';

import { StationState } from './store/ducks/stations/types';

/**
 * Generic response interface of data returned from api
 */
export type ApiSocketResponse<T> = {
  last_updated: number;
  ttl: number;
  version: string;
  data: T;
};

/**
 * @desc Type of state which allows for generic CRUD-actions.
 */
export type BaseState<T> = {
  readonly data: T[];
  readonly loading: boolean;
  readonly error: string | null;
};

/**
 * Interface for the application's store
 */
export interface ApplicationState {
  station: StationState;
}

/**
 * Data values returned from the station search form.
 */
export type StationFormValues = { address: string; radius: number };

/**
 * Type async actions has three states: START, SUCCESS, ERROR.
 */
export type AsyncActionType = {
  START: string;
  SUCCESS: string;
  ERROR: string;
};

/**
 * Meta data used in api calls
 */
export type MetaData = {
  method: ApiMethods;
  route: string;
};

/**
 * Meta action used for redux calls to the api
 */
export type ApiMetaAction = {
  type: TypeConstant;
  meta: MetaData;
};

/**
 * Payload action used for redux calls to the api
 */
export type ApiPayloadAction<TPayload> = PayloadAction<TypeConstant, TPayload>;

/**
 * Meta action with payload used for redux calls to the api
 */
export type ApiPayloadMetaAction<TPayload> = PayloadMetaAction<TypeConstant, TPayload, MetaData>;
