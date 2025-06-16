import Swal from 'sweetalert2';

export const Message = async (target, title, iconmessage, message) => {
  return await Swal.fire({
    target: document.getElementById(target),
    title: title,
    text: message,
    icon: iconmessage,
    iconColor: 'blue',
    confirmButtonColor: '#20c997',
    confirmButtonText: 'OK'
  });
};
