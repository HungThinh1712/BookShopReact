import { toast } from 'react-toastify';

export const toastError = error => {

  
    toast(error);

};

export const toastSuccess = message => {
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.success(message);
  }
};