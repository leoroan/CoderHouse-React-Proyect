
const misMeses = [
  {
    "id": 0,
    "mes": 9,
    "nombre": "Septiembre",
    "anio": 2023,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 1,
    "mes": 10,
    "nombre": "Octubre",
    "anio": 2023,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 2,
    "mes": 11,
    "nombre": "Noviembre",
    "anio": 2023,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 3,
    "mes": 12,
    "nombre": "Diciembre",
    "anio": 2023,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 4,
    "mes": 1,
    "nombre": "Enero",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 5,
    "mes": 2,
    "nombre": "Febrero",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 6,
    "mes": 3,
    "nombre": "Marzo",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 7,
    "mes": 4,
    "nombre": "Abril",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 8,
    "mes": 5,
    "nombre": "Mayo",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 9,
    "mes": 6,
    "nombre": "Junio",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 10,
    "mes": 7,
    "nombre": "Julio",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  },
  {
    "id": 11,
    "mes": 8,
    "nombre": "Agosto",
    "anio": 2024,
    "inversionTotal": 0,
    "retorno": 0,
    "factorRetorno": 1.1,
    "inversiones":[]
  }
];

export const getMeses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(misMeses);
    }, 1500); 
  });
};

export const getMesPorId = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(misMeses.find((mes) => mes.id === Number(id)));
    }, 1500); 
  });



};
