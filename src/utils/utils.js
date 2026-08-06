export function setListOrder(phrase, method, list) {
  if (!Array.isArray(list)) {
    return [];
  }

  if (phrase != "") {
    list = list.filter(
      (product) =>
        product.name.toLowerCase().includes(phrase.toLowerCase()) ||
        product.description.toLowerCase().includes(phrase.toLowerCase()),
    );
  }

  switch (method) {
    case "Price Low to High": {
      list.sort(
        (a, b) =>
          parseFloat(a.price) - parseFloat(b.price) ||
          a.name.localeCompare(b.name),
      );
      break;
    }
    case "Price High to Low": {
      list.sort(
        (a, b) =>
          parseFloat(b.price) - parseFloat(a.price) ||
          a.name.localeCompare(b.name),
      );
      break;
    }
    default: {
      list.sort(
        (a, b) => b.popularity - a.popularity || a.name.localeCompare(b.name),
      );
    }
  }

  return list;
}
