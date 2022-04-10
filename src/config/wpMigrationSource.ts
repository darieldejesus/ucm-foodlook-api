class WpMigrationSource {
  migrationContext: __WebpackModuleApi.RequireContext;

  constructor(migrationContext: __WebpackModuleApi.RequireContext) {
    this.migrationContext = migrationContext;
  }

  getMigrations(): Promise<string[]> {
    return Promise.resolve(
      this.migrationContext.keys().filter((key: string) => key.endsWith(".ts"))
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getMigrationName(migration: string): string {
    return migration.replace("./", "");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMigration(migration: string): any {
    return this.migrationContext(migration);
  }
}

export default WpMigrationSource;
