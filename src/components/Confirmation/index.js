import Swal from 'sweetalert2';

export const Confirmation = (target, message) => {
  return Swal.fire({
    target: document.getElementById(target),
    title: `<span style="font-size: 17px;">${message}</span>`,
    icon: 'question',
    iconColor: 'blue',
    confirmButtonColor: '#20c997',
    denyButtonColor: '#ffc107',
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: 'Não'
  });
};
