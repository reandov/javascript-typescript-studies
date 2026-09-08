class BaseProfile {
  protected status = "base fields initialized";

  constructor() {
    console.log("Base constructor:", this.status);
    this.describe();
  }

  protected describe(): void {
    console.log("Base description");
  }
}

class DetailedProfile extends BaseProfile {
  private detail = "derived fields initialized";

  constructor() {
    super();
    console.log("Derived constructor:", this.detail);
  }

  protected override describe(): void {
    console.log("Derived description:", this.detail ?? "detail is not initialized yet");
  }
}

new DetailedProfile();
