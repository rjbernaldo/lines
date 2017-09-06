export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(form) {
  return {
    type: OPEN_MODAL,
    form,
  };
}

export function closeModal(data) {
  return {
    type: CLOSE_MODAL,
  };
}

