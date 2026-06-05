export interface LegislativeFileComponent {
  getName(): string;
  getHashPayload(): Record<string, unknown>;
}

export class LegislativeFileLeaf implements LegislativeFileComponent {
  constructor(
    private readonly name: string,
    private readonly payload: Record<string, unknown>
  ) {}

  getName(): string {
    return this.name;
  }

  getHashPayload(): Record<string, unknown> {
    return this.payload;
  }
}

export class LegislativeFileComposite implements LegislativeFileComponent {
  private readonly children: LegislativeFileComponent[] = [];

  constructor(private readonly name: string) {}

  add(component: LegislativeFileComponent): void {
    this.children.push(component);
  }

  getName(): string {
    return this.name;
  }

  getHashPayload(): Record<string, unknown> {
    return this.children.reduce<Record<string, unknown>>((payload, component) => {
      payload[component.getName()] = component.getHashPayload();
      return payload;
    }, {});
  }
}
