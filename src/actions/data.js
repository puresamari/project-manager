export const PUSH_NAME = 'server:data';
export const SET_TICK = 'SET_TICK';
export const SET_DIRECTORIES = 'SET_DIRECTORIES';
export const setData = (name, value) => ({ type: `${PUSH_NAME}:${name}`, value });
