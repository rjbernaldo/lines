export const OPEN_MODAL = 'OPEN_MODAL';
export const SUBMIT_MODAL = 'SUBMIT_MODAL';

export function openModal(form) {
  console.log(form);
  return {
    type: OPEN_MODAL,
    form,
  };
}

export function submitModal(data) {
  return {
    type: SUBMIT_MODAL,
    data,
  };
}

