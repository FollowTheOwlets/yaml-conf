# @followtheowlets/yaml-conf

## Description

`@followtheowlets/yaml-conf` is a configuration module for NestJS applications that loads settings from a single YAML configuration file with EJS templating. It automatically populates variables based on the `NODE_ENV` profile and `.env` files, following best practices for environment variable management.

## Installation

Install the package using npm:

```sh
npm install @followtheowlets/yaml-conf
```

Or using yarn:

```sh
yarn add @followtheowlets/yaml-conf
```

## Usage

### Importing the Module in a NestJS Application

```typescript
import { Global, Module } from '@nestjs/common';
import { YamlConfigModule } from '@followtheowlets/yaml-conf';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
   imports: [YamlConfigModule.forRoot({ filePath: 'config' })],
   providers: [ConfigService],
   exports: [ConfigService],
})
export class AppModule {}
```

## How It Works

1. **One single YAML configuration file** – `app.config.yaml`.
2. **Environment variables are injected dynamically** using `EJS` templates.
3. **`NODE_ENV` determines which `.env` files are loaded**, following best practices:
    - `.env.{NODE_ENV}.local`
    - `.env.{NODE_ENV}`
    - `.env.local`
    - `.env`
4. **Configuration files can be placed in a custom directory**, specified via `filePath`.

## Core Components

### `YamlConfigModule`

This module provides access to configuration.

- `forRoot(options?: ConfigOptions): DynamicModule` — Loads the configuration from the specified directory or defaults to the root directory.
- `forRootAsync(optionsPromise?: Promise<ConfigOptions>): Promise<DynamicModule>` — Asynchronously loads configuration.
- If `filePath` is provided, it will load `app.config.yaml` and `.env` files from that directory.

## Configuration File Examples

### `.env`
```env
PORT=443
HOST=127.0.0.1
DATABASE_URL=postgres://user:password@localhost:5432/mydb
```

### `.env.production`
```env
PORT=443
HOST=192.168.1.1
DATABASE_URL=postgres://user:password@prod-db:5432/prod_db
```

### `app.config.yaml`
```yaml
http:
  port: <%= process.env.PORT || 3000 %>
  host: <%= process.env.HOST %>
database:
  url: <%= process.env.DATABASE_URL %>
property:
  name: custom-property
  example-list:
    - first
    - second
```

## Environment Variables Handling

- **The main configuration file is always `app.config.yaml`.**
- **Environment variables are loaded based on `NODE_ENV`.**
- **If `filePath` is specified, all configuration files will be loaded from that directory.**

## Best Practices & Naming Conventions

- `.env.{NODE_ENV}.local` – Local overrides for a specific environment.
- `.env.{NODE_ENV}` – Environment-specific variables.
- `.env.local` – General local overrides.
- `.env` – Default environment file.
- `app.config.yaml` – Single source of configuration with templating support.

## License

This project is licensed under ISC.

## Author

Developed by [Fedorichev Lev](https://github.com/followtheowlets).

