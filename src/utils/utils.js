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

  list.sort((a, b) => {
    switch (method) {
      case "Price Low to High":
        return (
          parseFloat(a.price) - parseFloat(b.price) ||
          a.name.localeCompare(b.name)
        );

      case "Price High to Low":
        return (
          parseFloat(b.price) - parseFloat(a.price) ||
          a.name.localeCompare(b.name)
        );

      default:
        return b.popularity - a.popularity || a.name.localeCompare(b.name);
    }
  });

  return list;
}
