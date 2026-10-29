import { Bounce, toast, ToastOptions } from 'react-toastify';

const DEFAULT_OPTS: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: false,
  progress: undefined,
  transition: Bounce,
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true
};

const DEFAULT_ERROR_TEXT = 'Щось пішло не так, спробуйте пізніше.';
const DEFAULT_INFO_TEXT = 'Ви успішно вийшли.';
const DEFAULT_SUCCESS_TEXT = 'Ви успішно пройшли автентифікацію!';

export default function useNotifyToast() {
  const showError = (errorMessage: string = DEFAULT_ERROR_TEXT) => toast.error(errorMessage, DEFAULT_OPTS);
  const showInfo = (infoMessage: string = DEFAULT_INFO_TEXT) => toast.info(infoMessage, DEFAULT_OPTS);
  const showSuccess = (successMessage: string = DEFAULT_SUCCESS_TEXT) => toast.success(successMessage, DEFAULT_OPTS);

  return { showError, showInfo, showSuccess };
}
