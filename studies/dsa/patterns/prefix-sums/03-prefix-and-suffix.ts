/** Use left and right accumulations when each index needs information from both sides. */

export function productsExceptSelf(values: readonly number[]): number[] {
  const products = Array<number>(values.length).fill(1);

  let prefixProduct = 1;

  for (let index = 0; index < values.length; index++) {
    // Save the product strictly before this index, excluding the value itself.
    products[index] = prefixProduct;
    // Include the current value only for the next index's left contribution.
    prefixProduct *= values[index];
  }

  let suffixProduct = 1;

  for (let index = values.length - 1; index >= 0; index--) {
    // Combine the saved left contribution with the product strictly to the right.
    products[index] *= suffixProduct;
    // Prepare the right contribution for the next index visited backward.
    suffixProduct *= values[index];
  }

  return products;
}
