/** Use left and right accumulations when each index needs information from both sides. */

export function productsExceptSelf(values: readonly number[]): number[] {
  const products = Array<number>(values.length).fill(1);

  let productToLeft = 1;

  for (let index = 0; index < values.length; index++) {
    // Save the product strictly before this index, excluding the value itself.
    products[index] = productToLeft;
    // Include the current value only for the next index's left contribution.
    productToLeft *= values[index];
  }

  let productToRight = 1;

  for (let index = values.length - 1; index >= 0; index--) {
    // Combine the saved left contribution with the product strictly to the right.
    products[index] *= productToRight;
    // Prepare the right contribution for the next index visited backward.
    productToRight *= values[index];
  }

  return products;
}
