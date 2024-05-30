export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}

export const formatNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatId = (x: string) => {
  return `..${x.substring(20, 24)}`;
};

export const formatPrice = (number: any) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
};
