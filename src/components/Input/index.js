import Swal from 'sweetalert2';

export const InputDatabit = async (target, title, subtitle, valuedefault) => {
  const result = await Swal.fire({
    target: document.getElementById(target),
    title: title,
    input: 'text',
    inputLabel: subtitle,
    inputPlaceholder: 'Nome do Módulo',
    inputValue: valuedefault,
    confirmButtonColor: '#20c997',
    inputAttributes: {
      maxlength: 100,
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });
  let digitado = result.value;
  return digitado;
};
