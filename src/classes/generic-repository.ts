interface Entity {
  readonly id: string;
}

class Repository<T extends Entity> {
  #items = new Map<string, T>();

  public add(item: T): this {
    this.#items.set(item.id, item);
    return this;
  }

  public findById(id: string): T | undefined {
    return this.#items.get(id);
  }

  public getAll(): readonly T[] {
    return [...this.#items.values()];
  }
}

interface Customer extends Entity {
  name: string;
}

interface Product extends Entity {
  price: number;
}

const customers = new Repository<Customer>();
customers.add({ id: "customer-1", name: "Alice" }).add({ id: "customer-2", name: "Susan" });

const products = new Repository<Product>();
products.add({ id: "product-1", price: 49.9 });

console.log(customers.findById("customer-1"));
console.log(products.getAll());
