export const OPEN_MODAL = 'OPEN_MODAL';
export const SUBMIT_MODAL = 'SUBMIT_MODAL';

export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function submitModal(data) {
  return {
    type: SUBMIT_MODAL,
    data,
  };
}

