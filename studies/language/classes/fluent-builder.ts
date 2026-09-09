class QueryBuilder {
  protected clauses: string[] = [];

  public where(clause: string): this {
    this.clauses.push(clause);
    return this;
  }

  public build(): string {
    return this.clauses.length === 0 ? "SELECT *" : `SELECT * WHERE ${this.clauses.join(" AND ")}`;
  }
}

class PaginatedQueryBuilder extends QueryBuilder {
  #page = 1;

  public page(page: number): this {
    this.#page = page;
    return this;
  }

  public override build(): string {
    return `${super.build()} PAGE ${this.#page}`;
  }
}

const query = new PaginatedQueryBuilder()
  .where("active = true")
  .where("role = 'admin'")
  .page(2)
  .build();

console.log(query);
